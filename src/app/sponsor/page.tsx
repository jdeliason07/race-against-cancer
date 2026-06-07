import { CONTACT_EMAIL, CHARITY_NAME, EVENT_DATE_DISPLAY, EVENT_LOCATION_NAME } from '@/config/site';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Sponsor',
  description: `Sponsor Race Against Cancer 2026 and put your brand at every mile marker while supporting ${CHARITY_NAME}.`,
};

const tiers = [
  {
    name: 'Title Sponsor',
    description:
      'Your name in the event title across all materials. Logo on every mile marker, the starting line, and the finish arch. Featured placement on the website, bib, and shirt.',
    perks: [
      'Name in event title (e.g. "Race Against Cancer presented by [Your Company]")',
      'Logo on every mile marker — half marathon & 5K courses',
      'Starting line and finish arch signage',
      'Logo on participant race shirts',
      'Featured placement on race bibs',
      'Logo + link on the race website (primary position)',
      'Social media recognition leading up to race day',
      'Complimentary race registrations for your team',
    ],
    highlight: true,
  },
  {
    name: 'Mile Marker Sponsor',
    description:
      'Your logo lives at a dedicated mile marker along the course — seen by every runner and spectator at that point.',
    perks: [
      'Logo on one dedicated mile marker (half marathon course)',
      'Logo + link on the race website',
      'Social media recognition',
    ],
    highlight: false,
  },
  {
    name: 'Community Sponsor',
    description:
      'Show your community you care. Your support is recognized across race-day materials and the event website.',
    perks: [
      'Logo on race-day signage',
      'Logo + link on the race website',
      'Social media recognition',
    ],
    highlight: false,
  },
];

export default function SponsorPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Make a larger impact</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
            Become a Sponsor
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-ash">
            Sponsoring Race Against Cancer puts your brand alongside a movement — not just an event.
            Every mile marker, every bib, every finish-line photo carries your name forward.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-20">

        {/* Why sponsor */}
        <section className="mb-20">
          <div className="rule-line mb-10">
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="section-label">Why sponsor</span>
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                heading: 'Your logo at every mile',
                body: 'Mile markers are the heartbeat of a race — runners look to them, spectators gather at them, photographers capture them. Your brand is there for every one.',
              },
              {
                heading: 'Genuine cause alignment',
                body: `This isn't a corporate 5K. Every dollar raised goes to ${CHARITY_NAME}. Your sponsorship tells your customers, employees, and community what you stand for.`,
              },
              {
                heading: 'Real race-day visibility',
                body: `On ${EVENT_DATE_DISPLAY} in ${EVENT_LOCATION_NAME}, your brand is woven into one of the most emotional days on the calendar for hundreds of participants and their families.`,
              },
            ].map((item) => (
              <div key={item.heading} className="rounded-card border border-line bg-paper p-8">
                <h2 className="mb-3 font-display text-xl uppercase text-ink">{item.heading}</h2>
                <p className="font-body text-sm leading-relaxed text-ash">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsorship tiers */}
        <section className="mb-20">
          <div className="rule-line mb-10">
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="section-label">Sponsorship tiers</span>
            <div className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <div className="space-y-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-card border p-8 ${
                  tier.highlight
                    ? 'border-pink bg-blush'
                    : 'border-line bg-paper'
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  {tier.highlight && (
                    <span className="rounded-chip bg-pink px-3 py-1 font-body text-xs font-bold uppercase tracking-widest text-white">
                      Featured
                    </span>
                  )}
                  <h2 className="font-display text-2xl uppercase text-ink">{tier.name}</h2>
                </div>
                <p className="mb-6 font-body text-base leading-relaxed text-ash">
                  {tier.description}
                </p>
                <ul className="space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 font-body text-sm text-ash">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-xs text-ash">
            Custom packages available. Pricing and availability discussed directly — reach out below.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-card bg-ink p-12 text-center">
          <h2 className="mb-4 font-display text-3xl uppercase text-white">
            Ready to get involved?
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-body text-sm text-white/60">
            Reach out and we&apos;ll walk you through sponsorship options, pricing, and logistics.
            Spots are limited — especially mile markers.
          </p>
          {CONTACT_EMAIL && !CONTACT_EMAIL.includes('[[') ? (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship Inquiry — Race Against Cancer 2026`}
              className="btn-primary"
            >
              <Mail size={16} />
              Email Us About Sponsorship
            </a>
          ) : (
            <p className="font-body text-sm text-white/40">
              [[Set CONTACT_EMAIL in src/config/site.ts to enable this button]]
            </p>
          )}
        </section>

      </div>
    </div>
  );
}
