import { EVENT_NAME, TOTAL_SPOTS } from '@/config/site';
import {
  WAITLIST_SOURCE,
  eachEventIntent,
  getStripe,
  holdsSpot,
  isRegistered,
} from '@/lib/stripeRegistration';

export async function getSpotsRemaining(): Promise<number> {
  const stripe = getStripe();
  if (!stripe) return TOTAL_SPOTS;

  try {
    let taken = 0;

    // Waitlist signups who haven't converted yet. Once someone registers, the
    // webhook flags their customer record — counting them here as well as
    // below would take two spots for one person.
    await stripe.customers
      .search({
        query: `metadata['source']:'${WAITLIST_SOURCE}' AND metadata['event']:'${EVENT_NAME}'`,
        limit: 100,
      })
      .autoPagingEach((customer) => {
        if (!isRegistered(customer)) taken++;
      });

    // Registrations: paid, plus Venmo payments awaiting manual confirmation.
    await eachEventIntent(stripe, (intent) => {
      if (holdsSpot(intent)) taken++;
    });

    return Math.max(0, TOTAL_SPOTS - taken);
  } catch {
    return TOTAL_SPOTS;
  }
}
