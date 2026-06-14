'use server';
import Stripe from 'stripe';
import { EVENT_NAME, MIN_DONATION_AMOUNT, MIN_DONATION_FUN_RUN } from '@/config/site';

export async function createPaymentIntent(registrationData: {
  raceType: string;
  bandanaColor: string;
  amount: number; // in cents, e.g. 9900 for $99
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  emergencyName: string;
  emergencyPhone: string;
}): Promise<{ clientSecret: string; paymentIntentId: string } | { error: string }> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Payment is not configured yet. Please contact the race organizer.' };
  }

  // Enforce minimum on the server — UI minimum can be bypassed
  const minCents =
    (registrationData.raceType === 'fun-run' ? MIN_DONATION_FUN_RUN : MIN_DONATION_AMOUNT) * 100;
  if (registrationData.amount < minCents) {
    return {
      error: `Minimum donation for this event is $${minCents / 100}. Please increase your donation amount.`,
    };
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const intent = await stripe.paymentIntents.create({
      amount: registrationData.amount,
      currency: 'usd',
      // Enables card + wallet methods (Google Pay / Apple Pay / Link) that are
      // turned on in the Stripe Dashboard, so the Express Checkout button works.
      automatic_payment_methods: { enabled: true },
      receipt_email: registrationData.email,
      description: `${EVENT_NAME} — ${registrationData.raceType}`,
      metadata: {
        event: EVENT_NAME,
        raceType: registrationData.raceType,
        bandanaColor: registrationData.bandanaColor,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        phone: registrationData.phone,
        dob: registrationData.dob,
        emergencyName: registrationData.emergencyName,
        emergencyPhone: registrationData.emergencyPhone,
        waiverAgreed: 'true',
        waiverAgreedAt: new Date().toISOString(),
        waiverVersion: '2026-v2',
      },
    });

    return { clientSecret: intent.client_secret!, paymentIntentId: intent.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error creating payment.';
    return { error: message };
  }
}

// Venmo can't be charged through Stripe, so the athlete pays out-of-band via
// the Venmo app. We flag the existing PaymentIntent as a pending Venmo payment
// so it shows up in the Stripe Dashboard (with all registration details) for
// the organizer to manually confirm once the Venmo transfer arrives.
export async function markVenmoPending(paymentIntentId: string): Promise<
  { ok: true } | { error: string }
> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Payment is not configured yet. Please contact the race organizer.' };
  }
  if (!paymentIntentId) {
    return { error: 'Missing registration reference. Please go back and try again.' };
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    await stripe.paymentIntents.update(paymentIntentId, {
      description: `${EVENT_NAME} — Venmo (pending manual confirmation)`,
      metadata: {
        paymentMethod: 'venmo',
        venmoStatus: 'pending_manual_confirmation',
        venmoSubmittedAt: new Date().toISOString(),
      },
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error recording Venmo payment.';
    return { error: message };
  }
}
