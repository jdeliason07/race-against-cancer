import { SponsorForm } from './SponsorForm';
import { CHARITY_NAME } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Sponsor',
  description: `Sponsor Race Against Cancers so 100% of every runner's donation goes straight to ${CHARITY_NAME}.`,
};

export default function SponsorPage() {
  return (
    <div className="bg-paper">
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Partner with us</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
            Become a Sponsor
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="font-body text-lg leading-relaxed text-ash">
          Sponsor us and your donation covers the cost of putting on the race — so
          100% of every runner&apos;s money goes straight to {CHARITY_NAME}.
        </p>

        <div className="mt-12 rounded-card border border-line bg-mist p-8 text-left">
          <p className="mb-5 text-center font-body text-base text-ink">
            Interested? Reach out and we&apos;ll get in touch.
          </p>
          <SponsorForm />
        </div>
      </div>
    </div>
  );
}
