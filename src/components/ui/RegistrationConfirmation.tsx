import Link from 'next/link';
import { EVENT_NAME } from '@/config/site';

export interface RegistrationSummary {
  name: string;
  raceLabel: string;
  participantCount: number;
  bandanaColor: string;
  /** Pre-formatted — "$120" for a paid entry, "Covered by a sponsor" for a comp. */
  donationLabel: string;
}

/**
 * The "you're registered" panel. Shared by two callers that reach it very
 * differently: the sponsor-covered flow, which never leaves the page, and the
 * /thank-you route, which rebuilds the summary from Stripe after a redirect.
 * Presentational only — it does no fetching, so it renders in either context.
 */
export function RegistrationConfirmation({
  summary,
  note,
}: {
  summary: RegistrationSummary;
  note: string;
}) {
  const { name, raceLabel, participantCount, bandanaColor, donationLabel } = summary;

  return (
    <div className="text-center">
      <div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blush"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-pink"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="font-display text-4xl uppercase text-ink mb-2">You&rsquo;re Registered!</h2>
      <p className="font-body text-base text-ash mb-8">
        Thank you for signing up for {EVENT_NAME}.
      </p>

      <div className="mb-8 rounded-card border border-line bg-mist p-6 text-left">
        <dl className="space-y-3 font-body text-sm">
          <div className="flex justify-between gap-4">
            <dt className="font-bold uppercase tracking-widest text-ash text-xs">Name</dt>
            <dd className="text-ink text-right">{name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-bold uppercase tracking-widest text-ash text-xs">Race</dt>
            <dd className="text-ink text-right">{raceLabel}</dd>
          </div>
          {participantCount > 1 && (
            <div className="flex justify-between gap-4">
              <dt className="font-bold uppercase tracking-widest text-ash text-xs">Athletes</dt>
              <dd className="text-ink text-right">{participantCount}</dd>
            </div>
          )}
          {bandanaColor && (
            <div className="flex justify-between gap-4">
              <dt className="font-bold uppercase tracking-widest text-ash text-xs">Bandana</dt>
              <dd className="text-ink text-right">{bandanaColor}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="font-bold uppercase tracking-widest text-ash text-xs">Donation</dt>
            <dd className="font-bold text-pink text-right">{donationLabel}</dd>
          </div>
        </dl>
      </div>

      <p className="mb-8 font-body text-sm text-ash">{note}</p>

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
  );
}
