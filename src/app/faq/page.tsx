import { Accordion } from '@/components/ui/Accordion';
import { faqs } from '@/data/faq';
import { CONTACT_PHONE, CONTACT_EMAIL } from '@/config/site';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Race Against Cancers 2026.',
};

export default function FAQPage() {
  return (
    <div className="bg-paper">
      <section className="bg-mist py-20 border-b border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Got questions</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">FAQ</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <Accordion items={faqs} />

        <div className="mt-16 rounded-card bg-blush p-8 text-center border border-petal">
          <h2 className="font-display text-2xl uppercase text-ink mb-3">Please reach out</h2>
          <p className="font-body text-sm text-ash mb-6">
            We&apos;re here to help. Call, text, or email us.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Phone size={16} /> {CONTACT_PHONE}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-primary inline-flex max-w-full items-center gap-2"
            >
              <Mail size={16} className="shrink-0" />
              <span className="break-all normal-case">{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/register" className="btn-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
