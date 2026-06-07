import Link from 'next/link';
import {
  REGISTRATION_URL, DONATION_URL, EVENT_DATE_DISPLAY,
  CHARITY_NAME, MIN_DONATION_AMOUNT, HALF_MARATHON_LABEL,
  FIVE_K_LABEL, EVENT_LOCATION_NAME,
} from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Race Against Cancer 2026 — Half Marathon & 5K',
};

export default function HomePage() {
  return (
    <>
      {/* HERO — CTAs above the fold, no scrolling required */}
      <section className="bg-paper pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rule-line mb-8">
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
            <span className="section-label">{EVENT_DATE_DISPLAY}</span>
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
          </div>

          <h1 className="font-display text-[clamp(52px,10vw,132px)] uppercase leading-[0.92] tracking-[0.01em] text-ink">
            RUN FOR THE{' '}
            <em className="not-italic text-pink">ONES WHO COULDN&apos;T.</em>
          </h1>

          <p className="mt-8 max-w-xl font-body text-lg text-ash">
            A half marathon & 5K benefiting {CHARITY_NAME}. Your ${MIN_DONATION_AMOUNT} registration
            is a direct donation — every dollar, to the cause.
          </p>

          {/* Primary CTAs — large, unmissable */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-10 py-5 text-base"
            >
              Register — ${MIN_DONATION_AMOUNT}+ Donation
            </a>
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-donate px-10 py-5 text-base"
            >
              Donate Without Running
            </a>
          </div>

          <p className="mt-5 font-body text-xs text-ash">
            No peer-to-peer fundraising. No fundraising goals. Just your miles and your gift.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS — fast clarity for ad traffic */}
      <section className="bg-blush py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rule-line mb-10">
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
            <span className="section-label">How it works</span>
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                heading: 'Choose your distance',
                body: `Run the ${HALF_MARATHON_LABEL} or the ${FIVE_K_LABEL} — walkers welcome in the 5K.`,
              },
              {
                step: '02',
                heading: `Donate $${MIN_DONATION_AMOUNT} or more`,
                body: `Your registration is a donation to ${CHARITY_NAME}. Give as much as you&apos;re willing — every dollar goes straight to the cause.`,
              },
              {
                step: '03',
                heading: 'Show up November 7',
                body: `Race day is ${EVENT_DATE_DISPLAY}. You&apos;ll get a shirt, bib, and finisher medal — and you&apos;ll have run for something real.`,
              },
            ].map((item) => (
              <div key={item.step} className="rounded-card border border-petal bg-paper p-8">
                <div className="mb-4 font-display text-4xl text-petal">{item.step}</div>
                <h2 className="mb-3 font-display text-xl uppercase text-ink">{item.heading}</h2>
                <p className="font-body text-sm leading-relaxed text-ash">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Register Now — ${MIN_DONATION_AMOUNT}+ Donation
            </a>
          </div>
        </div>
      </section>

      {/* EVENT FACTS */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rule-line mb-12">
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="section-label">The Race</span>
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { dt: 'Events',   dd: `${HALF_MARATHON_LABEL} + ${FIVE_K_LABEL}` },
              { dt: 'Date',     dd: EVENT_DATE_DISPLAY },
              { dt: 'Location', dd: EVENT_LOCATION_NAME },
              { dt: 'Entry',    dd: `$${MIN_DONATION_AMOUNT}+ donation — all to ${CHARITY_NAME}` },
            ].map((fact) => (
              <div key={fact.dt} className="rounded-card border border-line p-6">
                <dt className="section-label mb-2">{fact.dt}</dt>
                <dd className="font-display text-2xl uppercase text-ink">{fact.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WHERE THE MONEY GOES */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-6 text-petal">Where your money goes</p>
          <p className="font-display text-4xl uppercase text-white md:text-6xl">
            100% to {CHARITY_NAME}.
          </p>
          <p className="mt-6 max-w-lg mx-auto font-body text-base text-white/60">
            Every dollar from every registration goes directly to the cause. No overhead fund,
            no middleman — your donation is your entry.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Make a Donation
            </a>
            <Link href="/about" className="btn-ghost border-petal text-petal hover:bg-petal hover:text-ink">
              About the Cause
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="bg-pink py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl uppercase text-white md:text-6xl">
            Ready to show up?
          </h2>
          <p className="mt-4 font-body text-sm text-white/75">
            {EVENT_DATE_DISPLAY} · {EVENT_LOCATION_NAME}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill bg-white px-10 py-5 font-body text-base font-bold uppercase tracking-widest text-pink shadow-lg transition-colors hover:bg-blush"
            >
              Register — ${MIN_DONATION_AMOUNT}+ Donation
            </a>
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border-2 border-white px-10 py-5 font-body text-base font-bold uppercase tracking-widest text-white transition-colors hover:bg-raspberry"
            >
              Donate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
