// Stripe webhook — the authoritative record that a registration completed.
//
// The browser tells us a payment succeeded, but that signal is lost if the
// athlete closes the tab, loses signal, or pays with a method that redirects
// away and back. Stripe delivers this event server-to-server regardless, and
// retries until we return a 2xx, so this is what marks someone registered.
//
// Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
//   URL:    https://<your-domain>/api/stripe/webhook
//   Events: payment_intent.succeeded
// Then copy the signing secret into STRIPE_WEBHOOK_SECRET.
import type Stripe from 'stripe';
import { revalidatePath } from 'next/cache';
import { EVENT_NAME } from '@/config/site';
import { getStripe } from '@/lib/stripeRegistration';

/** Most recent PaymentIntent ids recorded against a customer. Kept as a list
 *  because one email may register more than once, and a retry of the *first*
 *  registration must not be mistaken for new work after the second landed.
 *  Capped so the value stays inside Stripe's 500-character metadata limit. */
const MAX_TRACKED_INTENTS = 12;

function recordedIntents(customer: Stripe.Customer): string[] {
  const raw = customer.metadata?.registeredPaymentIntents ?? '';
  const list = raw.split(',').map((id) => id.trim()).filter(Boolean);
  // Records written before this field existed carry only the single id.
  const legacy = customer.metadata?.registeredPaymentIntent;
  if (legacy && !list.includes(legacy)) list.push(legacy);
  return list;
}

/** Adds to a running total held in metadata, treating anything unparseable as 0. */
function addTo(existing: string | undefined, amount: number): string {
  const current = Number.parseInt(existing ?? '', 10);
  return String((Number.isFinite(current) ? current : 0) + amount);
}

/**
 * Copies the registration details onto the Stripe Customer and flags it as
 * registered, so the Customers page is a complete roster and the spots counter
 * stops counting this person as a waitlist signup as well as a registrant.
 *
 * The same email is allowed to register more than once — a group organizer
 * coming back for their own entry, a parent adding a child, or simply someone
 * choosing to donate twice. So this merges rather than replaces: a field the
 * new registration didn't collect keeps whatever the earlier one recorded,
 * and headcount and donation accumulate instead of overwriting.
 *
 * What it still can't express is two *different* answers to the same question —
 * register for the 10K and then the Fun Run and `raceType` shows the later one.
 * Representing that properly means one record per registration rather than one
 * per customer; the PaymentIntents already hold the full history.
 */
async function recordSuccessfulRegistration(
  stripe: Stripe,
  intent: Stripe.PaymentIntent,
): Promise<void> {
  if (intent.metadata?.event !== EVENT_NAME) return;

  const customerId =
    typeof intent.customer === 'string' ? intent.customer : intent.customer?.id;
  if (!customerId) return;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return;

  // Stripe retries and can deliver the same event more than once.
  const seen = recordedIntents(customer);
  if (seen.includes(intent.id)) return;

  const previous = customer.metadata ?? {};
  const isFirst = seen.length === 0;

  // Keep what the earlier registration recorded when this one has nothing to
  // say — a group registration collects no date of birth, and must not wipe
  // the one a solo registration already captured.
  const keep = (next: string | undefined, before: string | undefined): string =>
    (next?.trim() ? next : (before ?? ''));

  const newAthletes = Math.max(
    Number.parseInt(intent.metadata.participantCount ?? '1', 10) || 1,
    1,
  );

  await stripe.customers.update(customerId, {
    metadata: {
      registered: 'true',
      registeredAt: isFirst ? new Date().toISOString() : (previous.registeredAt ?? ''),
      lastRegisteredAt: new Date().toISOString(),
      registeredPaymentIntent: intent.id,
      registeredPaymentIntents: [...seen, intent.id].slice(-MAX_TRACKED_INTENTS).join(','),
      registrationCount: addTo(previous.registrationCount, 1),
      raceType: intent.metadata.raceType ?? '',
      bandanaColor: intent.metadata.bandanaColor ?? '',
      donationAmount: addTo(previous.donationAmount, intent.amount_received || intent.amount),
      // How many bibs this customer is owed at check-in, across every
      // registration they've paid for.
      participantCount: addTo(previous.participantCount, newAthletes),
      dob: keep(intent.metadata.dob, previous.dob),
      isMinor: keep(intent.metadata.isMinor, previous.isMinor),
      guardianName: keep(intent.metadata.guardianName, previous.guardianName),
      emergencyName: keep(intent.metadata.emergencyName, previous.emergencyName),
      emergencyPhone: keep(intent.metadata.emergencyPhone, previous.emergencyPhone),
      waiverAgreedBy: intent.metadata.waiverAgreedBy ?? '',
      waiverAgreedAt: intent.metadata.waiverAgreedAt ?? '',
      waiverVersion: intent.metadata.waiverVersion ?? '',
      // Writing the referral here — rather than when the intent was created —
      // is what makes it count only for a completed registration. The weekly
      // report counts these records, never a running tally, so a duplicate
      // webhook delivery can't inflate anyone's total.
      referredByName: keep(intent.metadata.referredByName, previous.referredByName),
    },
  });

  // Stripe emails the receipt via `receipt_email` on the PaymentIntent. This is
  // the place to add a custom confirmation email if you ever want one.

  revalidatePath('/register');
  revalidatePath('/');
}

export async function POST(request: Request): Promise<Response> {
  const stripe = getStripe();
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !signingSecret) {
    return new Response('Stripe webhook is not configured.', { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header.', { status: 400 });
  }

  // Signature verification needs the exact bytes Stripe signed, so read the
  // raw body — anyone can POST here, and only a valid signature proves it
  // came from Stripe.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, signingSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Signature verification failed: ${message}`, { status: 400 });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      await recordSuccessfulRegistration(stripe, event.data.object);
    }
  } catch (err) {
    // 5xx tells Stripe to retry — better than dropping a paid registration.
    console.error(`Stripe webhook handler failed for ${event.type} (${event.id}):`, err);
    return new Response('Webhook handler failed.', { status: 500 });
  }

  return Response.json({ received: true });
}
