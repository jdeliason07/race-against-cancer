'use server';
import Stripe from 'stripe';
import { EVENT_NAME, MIN_DONATION_AMOUNT, MIN_DONATION_5K } from '@/config/site';

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
}): Promise<{ clientSecret: string } | { error: string }> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Payment is not configured yet. Please contact the race organizer.' };
  }

  // Enforce minimum on the server — UI minimum can be bypassed
  const minCents =
    (registrationData.raceType === '5k' ? MIN_DONATION_5K : MIN_DONATION_AMOUNT) * 100;
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
        waiverVersion: '2026-v1',
      },
    });

    return { clientSecret: intent.client_secret! };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error creating payment.';
    return { error: message };
  }
}
