import { eachEventIntent, getStripe } from '@/lib/stripeRegistration';

export async function getDonationTotal(): Promise<number> {
  const stripe = getStripe();
  if (!stripe) return 0;

  try {
    let total = 0;

    // Only money actually received — abandoned and failed checkouts leave
    // PaymentIntents behind that shouldn't count.
    await eachEventIntent(stripe, (intent) => {
      if (intent.status === 'succeeded') total += intent.amount_received || intent.amount;
    });

    return Math.floor(total / 100); // convert cents to dollars
  } catch {
    return 0;
  }
}
