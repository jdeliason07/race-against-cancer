'use client';
// Error boundaries must be Client Components.
import { useEffect } from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/config/site';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        <p className="section-label mb-6">Something went wrong</p>

        <h1 className="font-display text-4xl uppercase leading-[0.95] text-ink md:text-5xl">
          We hit a<br />
          <em className="not-italic text-pink">technical snag.</em>
        </h1>

        <p className="mx-auto mt-6 max-w-md font-body text-base text-ash">
          This one is on us, not you. Trying again usually clears it.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => unstable_retry()} className="btn-primary px-10 py-5 text-base">
            Try Again
          </button>
          <Link
            href="/"
            className="font-body text-sm text-pink underline underline-offset-2 hover:text-raspberry"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-10 font-body text-sm text-ash/70">
          If it keeps happening, email{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-pink underline underline-offset-2 hover:text-raspberry"
          >
            {CONTACT_EMAIL}
          </a>
          {error.digest ? (
            <>
              {' '}and quote reference{' '}
              <code className="font-mono text-xs text-ash">{error.digest}</code>
            </>
          ) : null}
          .
        </p>
      </div>
    </div>
  );
}
