import {
  REGISTRATION_URL, MIN_DONATION_AMOUNT, HALF_MARATHON_LABEL,
  FIVE_K_LABEL, REGISTRATION_INCLUDES, EVENT_DATE_DISPLAY,
  EVENT_LOCATION_NAME, CHARITY_NAME
} from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: `Register for Race Against Cancer 2026. $${MIN_DONATION_AMOUNT} minimum donation. Half marathon & 5K on ${EVENT_DATE_DISPLAY}.`,
};

export default function RegisterPage() {
  return (
    <div className="bg-paper">
      <section className="bg-mist py-20 border-b border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Ready to run</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">Register</h1>
          <p className="mt-6 font-body text-lg text-ash">
            Entry requires a ${MIN_DONATION_AMOUNT} minimum donation to {CHARITY_NAME}. We encourage you to give as much as you can — every dollar beyond the minimum makes a larger impact.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Events */}
        <section className="mb-16">
          <h2 className="font-display text-3xl uppercase text-ink mb-8">Choose your distance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                label: HALF_MARATHON_LABEL,
                note: 'For those ready to go the distance. Time your miles, earn your medal.',
              },
              {
                label: FIVE_K_LABEL,
                note: 'Open to runners and walkers. All paces, all abilities. Just show up.',
              },
            ].map((race) => (
              <div key={race.label} className="rounded-card border border-line bg-paper p-8">
                <h3 className="font-display text-2xl uppercase text-ink mb-3">{race.label}</h3>
                <p className="font-body text-sm text-ash mb-6">{race.note}</p>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  Register — ${MIN_DONATION_AMOUNT}+ Donation
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Donation minimum callout */}
        <section className="mb-16 rounded-card bg-blush p-8 border border-petal">
          <h2 className="font-display text-2xl uppercase text-ink mb-4">The $100 minimum</h2>
          <p className="font-body text-base text-ink mb-3">
            There is no traditional entry fee. Registering means making a donation — minimum ${MIN_DONATION_AMOUNT} — directly to {CHARITY_NAME}.
          </p>
          <p className="font-body text-base text-ink">
            We warmly encourage you to give more if you&apos;re able. There is no peer-to-peer fundraising, no team goals, no awkward asks to your friends. Just your gift and your miles.
          </p>
        </section>

        {/* What's included */}
        <section className="mb-16">
          <h2 className="font-display text-3xl uppercase text-ink mb-8">What&apos;s included</h2>
          <ul className="space-y-4">
            {REGISTRATION_INCLUDES.map((item, i) => (
              <li key={i} className="flex items-center gap-4 font-body text-base text-ink">
                <span className="h-px w-8 bg-pink shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Big CTA */}
        <div className="text-center rounded-card bg-ink p-12">
          <h2 className="font-display text-4xl uppercase text-white mb-4">Ready to show up?</h2>
          <p className="font-body text-sm text-white/60 mb-8">
            {EVENT_DATE_DISPLAY} · {EVENT_LOCATION_NAME}
          </p>
          <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Register Now — ${MIN_DONATION_AMOUNT}+ Donation
          </a>
        </div>
      </div>
    </div>
  );
}
