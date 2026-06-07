import { CHARITY_NAME, CHARITY_URL, DONATION_URL, REGISTRATION_URL } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `Why Race Against Cancer exists, how it works, and where every dollar goes.`,
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="bg-mist py-20 border-b border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Our mission</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">About</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">
        <section>
          <h2 className="font-display text-3xl uppercase text-ink mb-6">Why this exists</h2>
          <p className="font-body text-base text-ash leading-relaxed mb-4">
            [[REPLACE: Tell the founding story. Who started this event and why? What personal connection to cancer motivated it?]]
          </p>
          <p className="font-body text-base text-ash leading-relaxed">
            [[REPLACE: Continue the story — what is the vision? What does a world where this event matters look like?]]
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl uppercase text-ink mb-6">The charity: {CHARITY_NAME}</h2>
          <p className="font-body text-base text-ash leading-relaxed mb-4">
            [[REPLACE: Describe {CHARITY_NAME} — what do they do, who do they serve, why this specific organization?]]
          </p>
          {CHARITY_URL && !CHARITY_URL.includes('[[') && (
            <a href={CHARITY_URL} target="_blank" rel="noopener noreferrer" className="font-body text-sm font-bold uppercase tracking-widest text-pink hover:text-raspberry transition-colors">
              Visit {CHARITY_NAME} →
            </a>
          )}
        </section>

        <section>
          <h2 className="font-display text-3xl uppercase text-ink mb-6">Where the money goes</h2>
          <div className="rounded-card border-2 border-pink bg-blush p-8">
            <p className="font-display text-2xl uppercase text-ink mb-4">
              100% of donations to {CHARITY_NAME}
            </p>
            <p className="font-body text-sm text-ash leading-relaxed">
              [[REPLACE: Be transparent and specific. How are funds used? Is there any event overhead? Who covers operational costs? If a sponsor covers costs, say so.]]
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 pt-4">
          <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Register to Run
          </a>
          <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" className="btn-donate">
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}
