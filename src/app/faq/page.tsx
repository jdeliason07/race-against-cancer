import { Accordion } from '@/components/ui/Accordion';
import { faqs } from '@/data/faq';
import { CONTACT_EMAIL, REGISTRATION_URL } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Race Against Cancer 2026.',
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
          <h2 className="font-display text-2xl uppercase text-ink mb-3">Still have a question?</h2>
          <p className="font-body text-sm text-ash mb-6">
            We&apos;re here. Reach out and we&apos;ll get back to you.
          </p>
          {CONTACT_EMAIL && !CONTACT_EMAIL.includes('[[') && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
              Email Us
            </a>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Ready to register?
          </a>
        </div>
      </div>
    </div>
  );
}
