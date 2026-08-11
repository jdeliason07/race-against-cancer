// Server-only referral helpers. Do not import from a Client Component.
import { randomInt } from 'node:crypto';
import type Stripe from 'stripe';
import { canonicalEmail } from './stripeRegistration';

// No 0/O/1/I/L — codes get read aloud and typed by hand.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 6;
const MAX_CODE_ATTEMPTS = 5;

/** Strips anything that isn't a code character. Also makes the value safe to
 *  interpolate into a Stripe search query. */
export function sanitizeReferralCode(raw: string): string {
  return raw
    .toUpperCase()
    .split('')
    .filter((c) => CODE_ALPHABET.includes(c))
    .join('')
    .slice(0, CODE_LENGTH);
}

function randomCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

export async function findCustomerByReferralCode(
  stripe: Stripe,
  code: string,
): Promise<Stripe.Customer | null> {
  const clean = sanitizeReferralCode(code);
  if (clean.length !== CODE_LENGTH) return null;

  const { data } = await stripe.customers.search({
    query: `metadata['referralCode']:'${clean}'`,
    limit: 1,
  });
  return data[0] ?? null;
}

/** Returns the customer's referral code, generating and saving one if needed. */
export async function ensureReferralCode(
  stripe: Stripe,
  customer: Stripe.Customer,
): Promise<string> {
  const existing = sanitizeReferralCode(customer.metadata?.referralCode ?? '');
  if (existing.length === CODE_LENGTH) return existing;

  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
    const code = randomCode();
    if (await findCustomerByReferralCode(stripe, code)) continue;
    await stripe.customers.update(customer.id, { metadata: { referralCode: code } });
    return code;
  }

  // 31^6 is ~887 million combinations, so this is effectively unreachable.
  throw new Error('Could not generate a unique referral code.');
}

export interface ResolvedReferrer {
  customer: Stripe.Customer;
  code: string;
}

/**
 * Resolves whatever the registrant typed (or arrived with) into the person who
 * referred them — accepting either a referral code or the referrer's email.
 * Returns null when the input matches nobody, so the caller can tell the
 * registrant rather than silently dropping their friend's credit.
 */
export async function resolveReferrer(
  stripe: Stripe,
  input: string,
): Promise<ResolvedReferrer | null> {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.includes('@')) {
    // Parameterized filter, so the raw email never reaches a query string.
    const { data } = await stripe.customers.list({
      email: canonicalEmail(trimmed),
      limit: 1,
    });
    const customer = data[0];
    if (!customer) return null;
    return { customer, code: await ensureReferralCode(stripe, customer) };
  }

  const customer = await findCustomerByReferralCode(stripe, trimmed);
  if (!customer) return null;
  return { customer, code: sanitizeReferralCode(customer.metadata?.referralCode ?? '') };
}
