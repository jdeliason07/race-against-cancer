import { CHARITY_NAME, CHARITY_URL, REGISTRATION_URL } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `Why Race Against Cancer exists, how it works, and where every dollar goes.`,
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Our mission</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">About</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-20">
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Why this exists</h2>
          <p className="mb-4 font-body text-base leading-relaxed text-ash">
            [[REPLACE: Tell the founding story. Who started this event and why? What personal connection to cancer motivated it?]]
          </p>
          <p className="font-body text-base leading-relaxed text-ash">
            [[REPLACE: Continue the story — what is the vision? What does a world where this event matters look like?]]
          </p>
        </section>

        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">
            The charity: {CHARITY_NAME}
          </h2>
          <p className="mb-4 font-body text-base leading-relaxed text-ash">
            [[REPLACE: Describe {CHARITY_NAME} — what do they do, who do they serve, why this specific organization?]]
          </p>
          {CHARITY_URL && !CHARITY_URL.includes('[[') && (
            <a
              href={CHARITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-bold uppercase tracking-widest text-pink transition-colors hover:text-raspberry"
            >
              Visit {CHARITY_NAME} →
            </a>
          )}
        </section>

        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Where the money goes</h2>
          <div className="rounded-card border-2 border-pink bg-blush p-8">
            <p className="mb-4 font-display text-2xl uppercase text-ink">
              100% of donations to {CHARITY_NAME}
            </p>
            <p className="font-body text-sm leading-relaxed text-ash">
              [[REPLACE: Be transparent and specific. How are funds used? Is there any event overhead? Who covers operational costs? If a sponsor covers costs, say so.]]
            </p>
          </div>
        </section>

        <div className="pt-4">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Register to Run
          </a>
        </div>
      </div>
    </div>
  );
}
