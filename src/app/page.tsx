import Link from 'next/link';
import {
  EVENT_NAME, EVENT_DATE_DISPLAY, EVENT_DATE_ISO,
  CHARITY_NAME, MIN_DONATION_AMOUNT,
  TEN_K_LABEL, FUN_RUN_LABEL,
  EVENT_LOCATION_NAME, FINISH_LOCATION_NAME,
  ORG_NAME, SITE_URL,
} from '@/config/site';
import { getDonationTotal } from '@/lib/getDonationTotal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Race Against Cancers 2026 — 10K & Fun Run',
};

export const revalidate = 300; // refresh every 5 minutes

const GOAL = 100000;

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: EVENT_NAME,
  description: `A 10K & Fun Run charity race benefiting ${CHARITY_NAME}. Run through Provo, Utah on ${EVENT_DATE_DISPLAY}.`,
  startDate: EVENT_DATE_ISO,
  endDate: '2026-11-07T14:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: EVENT_LOCATION_NAME,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4400 W Center St',
      addressLocality: 'Provo',
      addressRegion: 'UT',
      postalCode: '84601',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Race Against Cancers',
    url: SITE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: String(MIN_DONATION_AMOUNT),
    priceCurrency: 'USD',
    url: `${SITE_URL}/register`,
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
  },
};

export default async function HomePage() {
  const raised = await getDonationTotal();
  const pct = Math.min(Math.round((raised / GOAL) * 100), 100);
  return (
    <>
      {/* JSON-LD Event Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* HERO */}
      <section className="bg-paper pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rule-line mb-8">
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
            <span className="section-label">{EVENT_DATE_DISPLAY}</span>
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
          </div>

          <h1 className="font-display text-[clamp(52px,10vw,132px)] uppercase leading-[0.92] tracking-[0.01em] text-ink">
            RUN. GIVE.{' '}
            <em className="not-italic text-pink">CHANGE LIVES.</em>
          </h1>

          <p className="mt-8 max-w-xl font-body text-lg text-ash">
            A 10K & Fun Run benefiting {CHARITY_NAME}. Your registration
            is a direct donation — every dollar goes to the cause.
          </p>

          <div className="mt-10">
            <Link
              href="/register"
              className="btn-primary px-10 py-5 text-base"
            >
              Register
            </Link>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
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
                body: `Run the ${TEN_K_LABEL} through Provo, or join the ${FUN_RUN_LABEL} from LaVell Edwards Stadium to downtown — all paces and abilities welcome.`,
              },
              {
                step: '02',
                heading: 'Register to give',
                body: `Your registration fee is a direct donation to ${CHARITY_NAME}. Give as much as you're willing — every dollar goes straight to the cause.`,
              },
              {
                step: '03',
                heading: 'Show up November 7',
                body: `Race day is ${EVENT_DATE_DISPLAY}. Lace up, show up, and run for something real.`,
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
            <Link
              href="/register"
              className="btn-primary"
            >
              Register
            </Link>
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
              { dt: 'Events',   dd: `${TEN_K_LABEL} + ${FUN_RUN_LABEL}` },
              { dt: 'Date',     dd: EVENT_DATE_DISPLAY },
              { dt: 'Location', dd: EVENT_LOCATION_NAME },
              { dt: 'Entry',    dd: `$${MIN_DONATION_AMOUNT}+ — all to ${CHARITY_NAME}` },
            ].map((fact) => (
              <div key={fact.dt} className="rounded-card border border-line p-6">
                <dt className="section-label mb-2">{fact.dt}</dt>
                <dd className="font-display text-2xl uppercase text-ink">{fact.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* DOCUMENTARY SERIES */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-label mb-4 text-petal">Documentary Series</p>
              <h2 className="font-display text-[clamp(48px,8vw,96px)] uppercase leading-none text-white">
                20 Stories
              </h2>
              <p className="mt-6 font-body text-lg text-white/60 max-w-md">
                Twenty cancer survivors. Twenty films. One drops every day for the 20 days
                leading up to race day.
              </p>
              <p className="mt-4 font-body text-base text-white/40">
                These are the people we run for.
              </p>
              <div className="mt-8">
                <Link href="/documentary" className="btn-primary">
                  Watch the Series
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-card flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(240,48,122,0.12)', border: '1px solid rgba(240,48,122,0.2)' }}
                >
                  <span className="font-display text-lg uppercase text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOAL + PROGRESS */}
      <section className="bg-blush py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-6">Our goal</p>
          <p className="font-display text-[clamp(64px,12vw,120px)] uppercase leading-none text-ink">
            $100,000
          </p>
          <p className="mt-6 max-w-lg mx-auto font-body text-base text-ash">
            That&rsquo;s what we&rsquo;re raising for the cause. Every registration gets us closer.
            Every dollar counts. Every person who shows up matters.
          </p>

          {/* Progress bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="mb-3 flex items-end justify-between">
              <span className="font-display text-3xl uppercase text-ink">
                ${raised.toLocaleString()}
              </span>
              <span className="font-body text-sm text-ash">{pct}% of goal</span>
            </div>
            <div
              className="h-4 w-full rounded-pill bg-petal overflow-hidden"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${pct}% of $100,000 goal raised`}
            >
              <div
                className="h-full rounded-pill bg-pink transition-all duration-700"
                style={{ width: `${pct === 0 ? 1 : pct}%` }}
              />
            </div>
            <div className="mt-2 text-right">
              <span className="font-body text-xs text-ash">Goal: $100,000</span>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/register" className="btn-primary px-10 py-5 text-base">
              Register
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
