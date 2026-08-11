'use server';
import Stripe from 'stripe';
import { revalidatePath } from 'next/cache';
import { EVENT_NAME } from '@/config/site';

export type PreSignupResult = { ok: true } | { error: string };

// Stripe stores `phone` as free text, so normalize to E.164 before saving —
// that's the format the Dashboard, SMS tools, and exports all expect.
// Bare 10-digit (or 1 + 10-digit) input is treated as US/Canada; anything else
// must be entered with a leading + and country code.
function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('+')) {
    // E.164 allows 8–15 digits including the country code
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

export async function submitPreSignup(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): Promise<PreSignupResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'Service temporarily unavailable. Please email us directly.' };
  }
  if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim() || !data.phone.trim()) {
    return { error: 'First name, last name, email, and phone number are required.' };
  }

  const phone = normalizePhone(data.phone);
  if (!phone) {
    return { error: 'Enter a valid phone number, e.g. (555) 123-4567.' };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Idempotent: avoid duplicate records for the same email
  const existing = await stripe.customers.list({ email: data.email.trim(), limit: 1 });
  if (existing.data.length > 0) {
    const customer = existing.data[0];
    // Someone who signed up before we collected phone numbers — or who is
    // correcting theirs — should still get it saved on their customer record.
    if (customer.phone !== phone) {
      await stripe.customers.update(customer.id, { phone });
    }
    return { ok: true };
  }

  await stripe.customers.create({
    email: data.email.trim(),
    name: `${data.firstName.trim()} ${data.lastName.trim()}`,
    phone,
    description: `Pre-signup — ${EVENT_NAME}`,
    metadata: {
      source: 'pre-signup-form',
      event: EVENT_NAME,
      submittedAt: new Date().toISOString(),
    },
  });

  revalidatePath('/register');
  return { ok: true };
}
