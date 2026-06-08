import Link from 'next/link';
import { CHARITY_NAME, CHARITY_URL } from '@/config/site';
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
            Cancer touches everyone. Race Against Cancer 2026 was built to turn that grief, that
            anger, and that love into something that moves — literally. Every person who lines up
            at the start is running for someone.
          </p>
          <p className="font-body text-base leading-relaxed text-ash">
            This isn&apos;t a race with a charity attached. The race is the donation. Every registration,
            every dollar, goes directly to the cause. More details about our story coming soon.
          </p>
        </section>

        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">
            The charity
          </h2>
          <p className="mb-4 font-body text-base leading-relaxed text-ash">
            100% of proceeds benefit a charity dedicated to fighting cancer. The specific
            organization will be announced soon. What we can tell you now: every dollar raised
            goes directly to them — no event overhead, no middleman.
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
              Event operations are covered separately so that your registration goes entirely to
              the cause. Sponsors help make that possible — which is why their support matters
              beyond just a logo placement.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Our goal</h2>
          <div className="rounded-card border-2 border-pink bg-blush p-8 text-center">
            <p className="font-display text-[clamp(56px,10vw,96px)] uppercase leading-none text-ink">
              $100,000
            </p>
            <p className="mt-4 font-body text-base text-ash">
              That&rsquo;s what we&rsquo;re raising for the cause. Every registration is a
              direct donation — no overhead, no middleman. Every dollar goes straight to the fight.
            </p>
          </div>
        </section>

        <div className="pt-4">
          <Link href="/register" className="btn-primary">
            Register to Run
          </Link>
        </div>
      </div>
    </div>
  );
}
