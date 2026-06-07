import { CONTACT_EMAIL, EVENT_DATE_DISPLAY } from '@/config/site';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Volunteer',
  description: `Volunteer at Race Against Cancer 2026 on ${EVENT_DATE_DISPLAY}. Help make race day happen.`,
};

export default function VolunteerPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Join the crew</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
            Become a Volunteer
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-ash">
            You don&apos;t have to run to make race day happen. Volunteers are the engine behind
            every aid station, every cheering section, and every medal placed around a
            finisher&apos;s neck.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-20">

        {/* What to expect */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">What to expect</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                heading: 'When',
                body: '[[REPLACE: Date(s) and times volunteers are needed — race morning, the day before for packet pickup, or both.]]',
              },
              {
                heading: 'Where',
                body: '[[REPLACE: General location and any satellite volunteer stations.]]',
              },
              {
                heading: 'What you get',
                body: '[[REPLACE: Volunteer perks — e.g. volunteer shirt, post-race food access, etc.]]',
              },
            ].map((item) => (
              <div key={item.heading} className="rounded-card border border-line bg-paper p-6">
                <h3 className="mb-3 font-display text-xl uppercase text-ink">{item.heading}</h3>
                <p className="font-body text-sm leading-relaxed text-ash">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sign-up CTA */}
        <section className="rounded-card bg-ink p-12 text-center">
          <h2 className="mb-4 font-display text-3xl uppercase text-white">
            Ready to volunteer?
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-body text-sm text-white/60">
            [[REPLACE: Describe how to sign up — link to a form, or keep the email button below.]]
          </p>
          {CONTACT_EMAIL && !CONTACT_EMAIL.includes('[[') ? (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Volunteer Interest — Race Against Cancer 2026`}
              className="btn-primary"
            >
              <Mail size={16} />
              Email Us to Volunteer
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
