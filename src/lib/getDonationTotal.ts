import { eachEventIntent, getStripe } from '@/lib/stripeRegistration';

export async function getDonationTotal(): Promise<number> {
  const stripe = getStripe();
  if (!stripe) return 0;

  try {
    let total = 0;

    // Only money actually received — Venmo payments hold a spot but don't
    // count here until an organizer confirms them in the Dashboard.
    await eachEventIntent(stripe, (intent) => {
      if (intent.status === 'succeeded') total += intent.amount_received || intent.amount;
    });

    return Math.floor(total / 100); // convert cents to dollars
  } catch {
    return 0;
  }
}
