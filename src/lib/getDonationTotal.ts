import Stripe from 'stripe';

export async function getDonationTotal(): Promise<number> {
  if (!process.env.STRIPE_SECRET_KEY) return 0;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let total = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const intents = await stripe.paymentIntents.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      for (const intent of intents.data) {
        if (
          intent.status === 'succeeded' &&
          intent.metadata?.event === 'Race Against Cancer 2026'
        ) {
          total += intent.amount;
        }
      }

      hasMore = intents.has_more;
      if (intents.data.length > 0) {
        startingAfter = intents.data[intents.data.length - 1].id;
      }
    }

    return Math.floor(total / 100); // convert cents to dollars
  } catch {
    return 0;
  }
}
