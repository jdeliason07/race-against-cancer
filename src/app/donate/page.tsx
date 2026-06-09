import { DONATION_URL, CHARITY_NAME, CHARITY_URL, EVENT_DATE_DISPLAY } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description: `Support ${CHARITY_NAME} with a direct donation. You don't have to run to make a difference.`,
};

export default function DonatePage() {
  return (
    <div className="bg-paper">
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4 text-petal">You don&apos;t have to run</p>
          <h1 className="font-display text-6xl uppercase text-white md:text-8xl">Donate</h1>
          <p className="mt-6 font-body text-lg text-white/60 max-w-2xl mx-auto">
            Can&apos;t make it to the start line? You can still make a difference. Every donation goes directly to {CHARITY_NAME}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <section className="mb-16 rounded-card bg-blush p-10 text-center border border-petal">
          <h2 className="font-display text-3xl uppercase text-ink mb-4">Make a direct donation</h2>
          <p className="font-body text-base text-ash mb-8 max-w-lg mx-auto">
            No registration, no miles, no minimum. Give what you can, and know it goes straight to {CHARITY_NAME}.
          </p>
          <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="btn-donate">
            Donate to {CHARITY_NAME}
          </a>
          {CHARITY_URL && !CHARITY_URL.includes('[[') && (
            <p className="mt-4 font-body text-xs text-ash">
              Learn more at{' '}
              <a href={CHARITY_URL} target="_blank" rel="noopener noreferrer" className="text-pink hover:text-raspberry underline underline-offset-2">
                {CHARITY_URL}
              </a>
            </p>
          )}
        </section>

        <section>
          <h2 className="font-display text-3xl uppercase text-ink mb-6">Other ways to help</h2>
          <ul className="space-y-4">
            {[
              `Tell a runner in your life about Race Against Cancers 2026 — ${EVENT_DATE_DISPLAY}.`,
              'Share the event on social media and help us spread the word.',
              'Volunteer on race day — every aid station and cheering section needs people.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 font-body text-sm text-ash">
                <span className="mt-1 h-px w-8 shrink-0 bg-pink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
