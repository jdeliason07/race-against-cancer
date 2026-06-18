import Stripe from 'stripe';
import { EVENT_NAME, TOTAL_SPOTS } from '@/config/site';

export async function getSpotsRemaining(): Promise<number> {
  if (!process.env.STRIPE_SECRET_KEY) return TOTAL_SPOTS;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let taken = 0;

    // Count waitlist signups via metadata search
    await stripe.customers.search({
      query: `metadata['source']:'pre-signup-form' AND metadata['event']:'${EVENT_NAME}'`,
      limit: 100,
    }).autoPagingEach(() => { taken++; });

    // Count confirmed registrations (same approach as getDonationTotal)
    let hasMore = true;
    let startingAfter: string | undefined;
    while (hasMore) {
      const intents = await stripe.paymentIntents.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      for (const intent of intents.data) {
        if (intent.status === 'succeeded' && intent.metadata?.event === EVENT_NAME) {
          taken++;
        }
      }
      hasMore = intents.has_more;
      if (intents.data.length > 0) startingAfter = intents.data[intents.data.length - 1].id;
    }

    return Math.max(0, TOTAL_SPOTS - taken);
  } catch {
    return TOTAL_SPOTS;
  }
}
