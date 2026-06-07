'use server';
import Stripe from 'stripe';

export async function createPaymentIntent(registrationData: {
  raceType: string;
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

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const intent = await stripe.paymentIntents.create({
      amount: registrationData.amount,
      currency: 'usd',
      receipt_email: registrationData.email,
      description: `Race Against Cancer 2026 — ${registrationData.raceType}`,
      metadata: {
        event: 'Race Against Cancer 2026',
        raceType: registrationData.raceType,
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
