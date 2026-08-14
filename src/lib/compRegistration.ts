// Server-only. Comped ("covered") registrations: a sponsor pays for a block of
// entries, and each athlete claims one through a private link instead of paying.
//
// The code lives in COMP_REGISTRATION_CODE — an environment variable, never
// src/config/site.ts, because that file is imported by Client Components and
// would ship the code to every visitor's browser.
//
//   COMP_REGISTRATION_CODE   the secret in the link, e.g. a long random string
//   COMP_REGISTRATION_LIMIT  how many free entries it may create (default 0)
import type Stripe from 'stripe';
import { EVENT_NAME } from '@/config/site';

export const COMP_SOURCE = 'comp-registration';

export interface CompStatus {
  code: string;
  used: number;
  limit: number;
  remaining: number;
}

/** Timing-safe-ish comparison; codes are short so length leaks little. */
function matches(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function configuredLimit(): number {
  const parsed = Number.parseInt(process.env.COMP_REGISTRATION_LIMIT ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 0;
}

/**
 * How many free entries this code has already created.
 *
 * Stripe's search index lags writes by up to a minute, so two people claiming
 * the last entry within the same minute could both get through. Over-issuing
 * by one or two is an acceptable trade for not running a database; set the
 * limit to the number you actually sold and treat it as approximate.
 */
async function countUsed(stripe: Stripe, code: string): Promise<number | null> {
  try {
    let used = 0;
    await stripe.customers
      .search({ query: `metadata['compCode']:'${code}'`, limit: 100 })
      .autoPagingEach(() => {
        used++;
      });
    return used;
  } catch (err) {
    // Null means "couldn't tell". The caller refuses the link rather than
    // handing out free entries it can't count.
    console.error('Could not count covered registrations:', err);
    return null;
  }
}

/**
 * Validates a code from a link. Returns null when comped registration is
 * switched off, the code is wrong, or the block is used up — the caller
 * shouldn't distinguish those in what it shows a visitor.
 */
export async function checkCompCode(
  stripe: Stripe,
  candidate: string,
): Promise<CompStatus | null> {
  const expected = process.env.COMP_REGISTRATION_CODE?.trim();
  const limit = configuredLimit();
  if (!expected || limit === 0) return null;

  const supplied = candidate.trim();
  if (!supplied || !matches(supplied, expected)) return null;

  const used = await countUsed(stripe, expected);
  if (used === null || used >= limit) return null;

  return { code: expected, used, limit, remaining: limit - used };
}

/** Metadata stamped on a comped registration's customer record. */
export function compMetadata(code: string): Record<string, string> {
  return {
    source: COMP_SOURCE,
    event: EVENT_NAME,
    compCode: code,
    donationAmount: '0',
  };
}
