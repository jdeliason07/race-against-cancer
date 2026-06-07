import Link from 'next/link';
import { Countdown } from '@/components/ui/Countdown';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import {
  REGISTRATION_URL, DONATION_URL, EVENT_DATE_DISPLAY,
  CHARITY_NAME, MIN_DONATION_AMOUNT, HALF_MARATHON_LABEL,
  FIVE_K_LABEL, EVENT_LOCATION_NAME, DOCUMENTARY_TITLE,
  DOCUMENTARY_DESCRIPTION
} from '@/config/site';
import { episodes } from '@/data/episodes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Race Against Cancer 2026 — Half Marathon & 5K',
};

export default function HomePage() {
  const featuredEpisodes = episodes.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-paper pb-24 pt-20 md:pb-36 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Rule line */}
          <div className="rule-line mb-8">
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
            <span className="section-label">November 7, 2026</span>
            <div className="h-px flex-1 bg-petal" aria-hidden="true" />
          </div>

          <h1 className="font-display text-[clamp(56px,11vw,148px)] uppercase leading-[0.92] tracking-[0.01em] text-ink">
            SET THE PACE FOR EVERYONE WHO{' '}
            <em className="not-italic text-pink">COULDN&apos;T.</em>
          </h1>

          <p className="mt-8 max-w-2xl font-body text-lg text-ash md:text-xl">
            A half marathon & 5K on {EVENT_DATE_DISPLAY}. Your $100+ entry is a direct donation to {CHARITY_NAME}. No peer-to-peer fundraising. Just you, the miles, and the reason.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Register — ${MIN_DONATION_AMOUNT}+ Donation
            </a>
            <Link href="/stories" className="btn-ghost">
              Watch the Stories
            </Link>
            <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="btn-donate">
              Donate
            </a>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Countdown />
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
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { dt: 'Events', dd: `${HALF_MARATHON_LABEL} + ${FIVE_K_LABEL}` },
              { dt: 'Date', dd: EVENT_DATE_DISPLAY },
              { dt: 'Location', dd: EVENT_LOCATION_NAME },
              { dt: 'Entry', dd: `$${MIN_DONATION_AMOUNT}+ donation — all to ${CHARITY_NAME}` },
            ].map((fact) => (
              <div key={fact.dt} className="rounded-card border border-line bg-paper p-6">
                <dt className="section-label mb-2">{fact.dt}</dt>
                <dd className="font-display text-2xl uppercase text-ink">{fact.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* DOCUMENTARY TEASER */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="section-label mb-4 text-petal">The emotional heart</p>
            <h2 className="font-display text-5xl uppercase text-white md:text-7xl">
              {DOCUMENTARY_TITLE}
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base text-white/60">
              {DOCUMENTARY_DESCRIPTION}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredEpisodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/stories" className="btn-ghost border-petal text-petal hover:bg-petal hover:text-ink">
              View All 20 Stories
            </Link>
          </div>
        </div>
      </section>

      {/* WHERE MONEY GOES */}
      <section className="bg-blush py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-6">Where your money goes</p>
          <p className="font-display text-3xl uppercase text-ink md:text-5xl">
            Every dollar donated goes directly to {CHARITY_NAME}.
          </p>
          <p className="mt-6 font-body text-base text-ash">
            This event has no middleman and no overhead fund. Your $100+ registration is a donation, full stop.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="btn-donate">
              Make a Donation
            </a>
            <Link href="/about" className="btn-ghost">
              About the Cause
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
