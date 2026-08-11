// Server-only Stripe helpers shared by the registration action, the webhook,
// and the spots/donation counters. Do not import this from a Client Component.
import Stripe from 'stripe';
import { EVENT_NAME } from '@/config/site';

/** metadata.source on customers who joined the waitlist. */
export const WAITLIST_SOURCE = 'pre-signup-form';

/** Returns null when Stripe isn't configured, so callers can degrade gracefully. */
export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

/**
 * Emails are case-insensitive in practice but Stripe's `email` filter is not,
 * so store and look up one canonical form — otherwise "Jane@x.com" and
 * "jane@x.com" become two customers and the duplicate check misses.
 */
export function canonicalEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function findCustomerByEmail(
  stripe: Stripe,
  email: string,
): Promise<Stripe.Customer | null> {
  const { data } = await stripe.customers.list({ email: canonicalEmail(email), limit: 1 });
  return data[0] ?? null;
}

/** True once a successful registration has been recorded on the customer. */
export function isRegistered(customer: Stripe.Customer): boolean {
  return customer.metadata?.registered === 'true';
}

/**
 * A spot is taken once payment succeeds — or as soon as a Venmo payment is
 * submitted, since the UI promises the spot is held while we confirm it.
 * Venmo intents stay unconfirmed until an organizer captures them by hand.
 */
export function holdsSpot(intent: Stripe.PaymentIntent): boolean {
  if (intent.metadata?.event !== EVENT_NAME) return false;
  if (intent.status === 'succeeded') return true;
  return (
    intent.metadata?.venmoStatus === 'pending_manual_confirmation' &&
    intent.status !== 'canceled'
  );
}

/**
 * Walks every PaymentIntent belonging to this event.
 *
 * Uses search rather than listing the whole account so Stripe does the
 * filtering. The search index lags writes by up to a minute, which is within
 * the 60s revalidate window on the pages that call this.
 */
export async function eachEventIntent(
  stripe: Stripe,
  visit: (intent: Stripe.PaymentIntent) => void,
): Promise<void> {
  await stripe.paymentIntents
    .search({ query: `metadata['event']:'${EVENT_NAME}'`, limit: 100 })
    .autoPagingEach((intent) => {
      visit(intent);
    });
}
