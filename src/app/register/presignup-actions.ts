'use server';
import Stripe from 'stripe';
import { EVENT_NAME } from '@/config/site';

export type PreSignupResult = { ok: true } | { error: string };

export async function submitPreSignup(data: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<PreSignupResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Service temporarily unavailable. Please email us directly.' };
  }
  if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim()) {
    return { error: 'First name, last name, and email are required.' };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Idempotent: avoid duplicate records for the same email
  const existing = await stripe.customers.list({ email: data.email.trim(), limit: 1 });
  if (existing.data.length > 0) return { ok: true };

  await stripe.customers.create({
    email: data.email.trim(),
    name: `${data.firstName.trim()} ${data.lastName.trim()}`,
    description: `Pre-signup — ${EVENT_NAME}`,
    metadata: {
      source: 'pre-signup-form',
      event: EVENT_NAME,
      submittedAt: new Date().toISOString(),
    },
  });

  return { ok: true };
}
