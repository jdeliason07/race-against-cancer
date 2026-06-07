'use server';
import Stripe from 'stripe';

export async function createPaymentIntent(registrationData: {
  raceType: string;
  shirtSize: string;
  amount: number; // in cents, e.g. 10000 for $100
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  emergencyName: string;
  emergencyPhone: string;
}) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY.');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const intent = await stripe.paymentIntents.create({
    amount: registrationData.amount,
    currency: 'usd',
    receipt_email: registrationData.email,
    description: `Race Against Cancer 2026 — ${registrationData.raceType}`,
    metadata: {
      event: 'Race Against Cancer 2026',
      raceType: registrationData.raceType,
      shirtSize: registrationData.shirtSize,
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
}
