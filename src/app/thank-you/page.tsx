import type { Metadata } from 'next';
import Link from 'next/link';
import { getStripe } from '@/lib/stripeRegistration';
import {
  CONTACT_EMAIL,
  EVENT_NAME,
  FUN_RUN_LABEL,
  TEN_K_LABEL,
} from '@/config/site';
import {
  RegistrationConfirmation,
  type RegistrationSummary,
} from '@/components/ui/RegistrationConfirmation';
import { TrackEvent } from './TrackEvent';

export const metadata: Metadata = {
  title: 'Thank You',
  description: `Your registration for ${EVENT_NAME} is confirmed.`,
  // A personal confirmation page — keep it out of search results entirely.
  robots: { index: false, follow: false },
};

/**
 * Reads live Stripe state, so it must never be prerendered or cached.
 */
export const dynamic = 'force-dynamic';

type Outcome =
  | { kind: 'confirmed'; summary: RegistrationSummary }
  | { kind: 'processing' }
  | { kind: 'generic' };

/**
 * Rebuilds the confirmation from Stripe rather than from browser state, which
 * is what lets this page survive a redirect-based payment (3DS, bank redirect)
 * where the client-side form state is gone by the time the visitor returns.
 *
 * The client secret is required alongside the id: PaymentIntent ids appear in
 * URLs and logs, and without this check anyone holding one could read the
 * registrant's name off this page.
 */
async function resolve(
  paymentIntentId: string | undefined,
  clientSecret: string | undefined,
): Promise<Outcome> {
  if (!paymentIntentId) return { kind: 'generic' };

  const stripe = getStripe();
  if (!stripe) return { kind: 'generic' };

  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!clientSecret || intent.client_secret !== clientSecret) return { kind: 'generic' };
    if (intent.status !== 'succeeded') return { kind: 'processing' };

    const m = intent.metadata ?? {};
    const participantCount = Number(m.participantCount) || 1;

    return {
      kind: 'confirmed',
      summary: {
        name: [m.firstName, m.lastName].filter(Boolean).join(' ') || 'Registered athlete',
        raceLabel: m.raceType === '10k' ? TEN_K_LABEL : FUN_RUN_LABEL,
        participantCount,
        bandanaColor: m.bandanaColor ?? '',
        donationLabel: `$${(intent.amount / 100).toLocaleString()}`,
      },
    };
  } catch {
    // A bad or unknown id should read as an ordinary thank-you, not a stack trace.
    return { kind: 'generic' };
  }
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  const outcome = await resolve(
    first(params.payment_intent),
    first(params.payment_intent_client_secret),
  );

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-24">
        {outcome.kind === 'confirmed' && (
          <>
            <TrackEvent />
            <RegistrationConfirmation
              summary={outcome.summary}
              note="Check your email for a receipt from Stripe."
            />
          </>
        )}

        {outcome.kind === 'processing' && (
          <div className="text-center">
            <h1 className="font-display text-4xl uppercase text-ink mb-4">Payment Processing</h1>
            <p className="font-body text-base text-ash mb-8">
              Your payment hasn&rsquo;t finished clearing yet. This can take a moment with some
              banks. We&rsquo;ll email you a receipt as soon as it completes — there&rsquo;s no
              need to pay again.
            </p>
            <p className="font-body text-sm text-ash mb-8">
              If you don&rsquo;t hear from us within an hour, email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-pink underline underline-offset-2 hover:text-raspberry">
                {CONTACT_EMAIL}
              </a>.
            </p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        )}

        {outcome.kind === 'generic' && (
          <div className="text-center">
            <h1 className="font-display text-4xl uppercase text-ink mb-4">Thank You</h1>
            <p className="font-body text-base text-ash mb-8">
              Thanks for supporting {EVENT_NAME}. If you just registered, your confirmation is on
              its way by email.
            </p>
            <p className="font-body text-sm text-ash mb-8">
              Questions about a registration? Email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-pink underline underline-offset-2 hover:text-raspberry">
                {CONTACT_EMAIL}
              </a>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="btn-primary">Back to Home</Link>
              <Link
                href="/race-details"
                className="font-body text-sm text-pink underline underline-offset-2 hover:text-raspberry"
              >
                Race day details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
