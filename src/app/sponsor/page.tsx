import { CONTACT_EMAIL, CHARITY_NAME } from '@/config/site';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Sponsor',
  description: `Sponsor Race Against Cancers 2026 and help cover event costs so 100% of every runner's registration goes to ${CHARITY_NAME}.`,
};

export default function SponsorPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Partner with us</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
            Become a Sponsor
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-ash">
            When you sponsor us, your donation covers the cost of the race — so
            100% of every runner&apos;s registration goes straight to {CHARITY_NAME}.
          </p>
        </div>
      </section>

      {/* Reach out box */}
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="rounded-card bg-blush p-8 text-center border border-petal">
          <h2 className="font-display text-2xl uppercase text-ink mb-3">Reach out</h2>
          <p className="font-body text-sm text-ash mb-6">
            Interested in sponsoring? Send us your email and we&apos;ll be in touch.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship%20Inquiry`}
            className="inline-flex max-w-full items-center gap-2 font-body text-sm font-bold tracking-widest text-pink transition-colors hover:text-raspberry"
          >
            <Mail size={16} className="shrink-0" />
            <span className="tracking-normal">
              {CONTACT_EMAIL.split('@')[0]}@<wbr />{CONTACT_EMAIL.split('@')[1]}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
