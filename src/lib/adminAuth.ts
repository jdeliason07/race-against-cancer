// Server-only. Password gate for /admin.
//
// The admin page can email the entire waitlist, so it must not be reachable by
// anyone who guesses the URL. Auth is a single shared password in
// ADMIN_PASSWORD; a correct login sets an HMAC-signed, httpOnly cookie.
//
// This is deliberately small: one organizer, one password, no user accounts.
// If more than a couple of people ever need access, replace it with real auth
// rather than sharing the password further.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'rac_admin';
const SESSION_HOURS = 12;

export const MIN_PASSWORD_LENGTH = 12;

function secret(): string | null {
  const password = process.env.ADMIN_PASSWORD?.trim();
  // A short password would make both the login and the cookie signature weak.
  return password && password.length >= MIN_PASSWORD_LENGTH ? password : null;
}

export type AdminConfigStatus = 'ok' | 'missing' | 'too-short';

/**
 * Distinguishes "no variable" from "variable present but rejected" — otherwise
 * a too-short password looks identical to having set nothing at all, and the
 * obvious conclusion is that the deploy didn't pick the variable up.
 */
export function adminConfigStatus(): AdminConfigStatus {
  const raw = process.env.ADMIN_PASSWORD?.trim();
  if (!raw) return 'missing';
  if (raw.length < MIN_PASSWORD_LENGTH) return 'too-short';
  return 'ok';
}

export function isAdminConfigured(): boolean {
  return secret() !== null;
}

function sign(expiresAt: number, key: string): string {
  return createHmac('sha256', key).update(String(expiresAt)).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function checkPassword(candidate: string): boolean {
  const key = secret();
  if (!key) return false;
  return safeEqual(candidate, key);
}

export async function startSession(): Promise<void> {
  const key = secret();
  if (!key) throw new Error('ADMIN_PASSWORD is not set.');

  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const store = await cookies();
  store.set(COOKIE_NAME, `${expiresAt}.${sign(expiresAt, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isSignedIn(): Promise<boolean> {
  const key = secret();
  if (!key) return false;

  const raw = (await cookies()).get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const [expiresRaw, signature] = raw.split('.');
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || !signature) return false;
  if (Date.now() > expiresAt) return false;

  return safeEqual(signature, sign(expiresAt, key));
}

/** What the composer shows when the session has lapsed under it. */
export const SESSION_EXPIRED = 'Your session has expired. Reload the page and sign in again.';

/**
 * Refuses the caller unless they hold a valid session. Every admin server
 * action calls this first — the page-level check doesn't protect the actions,
 * which are reachable by direct POST.
 *
 * It returns the refusal instead of throwing: a thrown server action rejects
 * the client promise, and in production Next.js replaces the message with an
 * opaque digest, so the composer had no way to tell "session expired" from
 * "nothing happened" and its buttons simply went dead. Returning it makes the
 * refusal a normal result the UI can show.
 */
export async function denyUnlessAdmin(): Promise<{ error: string } | null> {
  return (await isSignedIn()) ? null : { error: SESSION_EXPIRED };
}
