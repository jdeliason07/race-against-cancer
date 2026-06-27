import type { Metadata } from 'next';
import { Mail, Camera } from 'lucide-react';
import { SunStamp } from '@/components/brand/SunStamp';
import { CONTACT_EMAIL, SOCIAL_INSTAGRAM, BRAND_NAME } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${BRAND_NAME}.`,
};

const FAQ = [
  ['How long until it ships?', 'Everything is made by hand, so orders go out within 3–5 days. You’ll get tracking by email the moment it does.'],
  ['Will my tote match the photo exactly?', 'Close, but not exactly. Each one is hand-dyed, so the bloom and color land a little differently every time. That variation is the point.'],
  ['How do I care for it?', 'Cold wash, hang dry, out of direct sun for long stretches. The beaded jewelry is water-safe — wear it in.'],
  ['Do you do custom or wholesale?', 'Sometimes. Send a note and tell us what you have in mind.'],
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <SunStamp className="mx-auto h-14 w-14 text-ink" />
        <p className="section-label mt-5">Say hi</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Talk to us</h1>
        <p className="mt-4 text-lead text-ash">
          Questions about an order, a color, or a custom run? We&apos;re a small shop and we read everything.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="card flex items-center gap-4 p-6 transition-colors hover:ring-deep-tide"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seaglass text-deep-tide">
            <Mail size={22} />
          </span>
          <span>
            <span className="label block">Email</span>
            <span className="font-display text-lg text-ink">{CONTACT_EMAIL}</span>
          </span>
        </a>

        {SOCIAL_INSTAGRAM && (
          <a
            href={SOCIAL_INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="card flex items-center gap-4 p-6 transition-colors hover:ring-deep-tide"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seaglass text-deep-tide">
              <Camera size={22} />
            </span>
            <span>
              <span className="label block">Instagram</span>
              <span className="font-display text-lg text-ink">@sunnytides.co</span>
            </span>
          </a>
        )}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl text-ink sm:text-3xl">Quick answers</h2>
        <dl className="mt-6 divide-y divide-line border-t border-line">
          {FAQ.map(([q, a]) => (
            <div key={q} className="py-5">
              <dt className="font-display text-lg text-ink">{q}</dt>
              <dd className="mt-1.5 text-ash">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
