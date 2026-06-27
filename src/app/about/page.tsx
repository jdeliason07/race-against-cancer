import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SunStamp } from '@/components/brand/SunStamp';
import { Smiley } from '@/components/brand/Smiley';
import { OWNER_NAME, FOUNDED_PLACE, BRAND_NAME } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description: `The story behind ${BRAND_NAME} — hand-dyed totes and beach-day goods made by ${OWNER_NAME}.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-seaglass">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <SunStamp className="mx-auto h-16 w-16 text-ink" />
          <p className="section-label mt-6">Our story</p>
          <h1 className="mt-3 text-4xl text-ink sm:text-5xl">
            Warm light on cold water.
          </h1>
          <p className="mt-5 text-lead text-ash">
            Sunny Tides is the feeling of sun on your shoulders after a cold morning swim.
            We make beach-day goods by hand — one bag, one strand, one stamp at a time.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card ring-1 ring-line">
            <Image
              src="/images/lifestyle/beach-tote.jpg"
              alt={`${OWNER_NAME} with a Sunny Tides tote at the shore`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="section-label">Made by hand</p>
            <h2 className="mt-3 text-3xl text-ink sm:text-4xl">Hi, I&apos;m {OWNER_NAME}.</h2>
            <div className="mt-5 space-y-4 text-lead leading-relaxed text-ash">
              <p>
                Sunny Tides started in {FOUNDED_PLACE} with a pot of dye and a stack of blank
                canvas. I wanted a bag that looked like the water I grew up near — never quite
                the same color twice.
              </p>
              <p>
                So I dye them by hand, in small batches. Every tote gets pulled from the dye,
                bled into white, dried in the sun, and stamped one at a time. The beaded pieces
                are strung the same way — slow, by hand, by me.
              </p>
              <p>
                No two come out exactly alike. That&apos;s not a flaw. That&apos;s the whole idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The process */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sun">How it&apos;s made</p>
          <h2 className="mt-3 text-3xl text-paper sm:text-4xl">Slow, sunny, by hand</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              ['01', 'Dyed', 'One hue per bag, bled into white. Mixed in small batches so the color lands a little differently every time.'],
              ['02', 'Stamped', 'The block-print sunrise, pressed on by hand. Imperfect edges over slick gradients — pressed, not rendered.'],
              ['03', 'Packed', 'Dried in the sun, checked over, and packed up. Then it ships to you for the next morning swell.'],
            ].map(([num, title, body]) => (
              <div key={num}>
                <p className="font-mono text-sm font-bold text-sun">{num}</p>
                <h3 className="mt-2 font-display text-2xl text-paper">{title}</h3>
                <p className="mt-2 text-seafoam">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paint party */}
      <section className="bg-canvas/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <Smiley className="h-12 w-12 text-ink" />
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">The smiley side</h2>
            <p className="mt-4 max-w-md text-lead text-ash">
              The hand-drawn smiley is how Sunny Tides doodles in the margins. It started at
              paint parties — friends, music, canvas on the grass — and it stuck. Loose, off-center,
              never a perfect circle.
            </p>
            <Link href="/shop/totes" className="btn-primary mt-7">Shop the totes</Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card ring-1 ring-line">
            <Image
              src="/images/lifestyle/paint-party.jpg"
              alt="Paint-party flat lay with paints and a butter-canvas Sunnytote"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
