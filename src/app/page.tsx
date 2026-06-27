import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { SunStamp } from '@/components/brand/SunStamp';
import { Smiley } from '@/components/brand/Smiley';
import { featuredProducts, productsByCategory, formatPrice } from '@/data/products';
import { BRAND_ESSENCE, OWNER_NAME, FOUNDED_PLACE } from '@/config/site';

const SPECTRUM = [
  { slug: 'wave-blue-tote', hue: '#6FAED9', name: 'Wave Blue', img: '/images/products/tote-wave.svg' },
  { slug: 'sea-lime-tote', hue: '#7FC44E', name: 'Sea Lime', img: '/images/products/tote-lime.svg' },
  { slug: 'sunset-orange-tote', hue: '#E98A33', name: 'Sunset Orange', img: '/images/products/tote-sunset.svg' },
  { slug: 'shell-pink-tote', hue: '#EF87A2', name: 'Shell Pink', img: '/images/products/tote-shell.svg' },
  { slug: 'orchid-tote', hue: '#B05CB0', name: 'Orchid', img: '/images/products/tote-orchid.svg' },
];

export default function Home() {
  const featured = featuredProducts();
  const totes = productsByCategory('totes');

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-seaglass">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="section-label">Hand-dyed · Made by hand</p>
            <h1 className="mt-4 text-4xl text-ink sm:text-5xl lg:text-6xl">
              Warm light on<br />cold water.
            </h1>
            <p className="mt-5 max-w-md text-lead text-ash">{BRAND_ESSENCE}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Shop the spectrum <ArrowRight size={18} />
              </Link>
              <Link href="/shop/jewelry" className="btn-ghost">Shop jewelry</Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card ring-1 ring-line">
              <Image
                src="/images/lifestyle/beach-tote.jpg"
                alt="A Sunny Tides tote at the water's edge at sunset"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <SunStamp className="absolute -left-4 -top-4 h-20 w-20 text-ink drop-shadow-sm sm:-left-6 sm:-top-6 sm:h-28 sm:w-28" />
          </div>
        </div>
      </section>

      {/* ---------- THE SPECTRUM ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <p className="section-label">The signature run</p>
          <h2 className="mt-3 text-3xl text-ink sm:text-4xl">Five hues, one stamp</h2>
          <p className="mt-3 max-w-xl text-ash">
            Each tote is dyed in one color, bled into white. No two bags match exactly —
            that variation is the whole point.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {SPECTRUM.map((t) => (
            <Link key={t.slug} href={`/product/${t.slug}`} className="group text-center">
              <div
                className="relative aspect-square overflow-hidden rounded-card ring-1 ring-line"
                style={{ backgroundColor: t.hue + '22' }}
              >
                <Image
                  src={t.img}
                  alt={`${t.name} tote`}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ash group-hover:text-deep-tide">
                {t.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/shop/totes" className="btn-tide">See all totes</Link>
        </div>
      </section>

      {/* ---------- MADE BY HAND STRIP ---------- */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sun">Made by hand</p>
            <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
              One bag at a time, by {OWNER_NAME}.
            </h2>
            <p className="mt-4 max-w-xl text-lead text-seafoam">
              Sunny Tides started in {FOUNDED_PLACE} with a pot of dye and a stack of blank canvas.
              Every tote is dyed, stamped, and packed by hand. The imperfect edges are the soul of it.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.12em] text-sun hover:text-low-sun">
              Read the story <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-1 md:gap-8">
            {[
              ['100%', 'cotton canvas'],
              ['1 of 1', 'no two alike'],
              ['Small', 'batch dye'],
            ].map(([big, small]) => (
              <div key={small} className="text-center md:text-left">
                <p className="font-display text-3xl text-sun sm:text-4xl">{big}</p>
                <p className="label text-seafoam/80">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-label">Fresh off the line</p>
            <h2 className="mt-3 text-3xl text-ink sm:text-4xl">Beach-day goods</h2>
          </div>
          <Link href="/shop" className="hidden font-mono text-xs font-bold uppercase tracking-[0.12em] text-deep-tide hover:text-tide sm:inline-flex sm:items-center sm:gap-1">
            Shop all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ---------- PAINT-PARTY / SMILEY ---------- */}
      <section className="bg-canvas/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-card ring-1 ring-line md:order-1">
            <Image
              src="/images/lifestyle/paint-party.jpg"
              alt="Paint-party flat lay with a butter-canvas Sunnytote"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <Smiley className="h-12 w-12 text-ink" />
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">The paint-party drop</h2>
            <p className="mt-4 max-w-md text-lead text-ash">
              Butter canvas, smiles drawn on loose by hand. Born from the messy, sunny side of
              Sunny Tides. Drawn one at a time — never a perfect circle.
            </p>
            <Link href="/product/sunnytote-smiley" className="btn-primary mt-7">
              Shop the Sunnytote — {formatPrice(totes.find((t) => t.slug === 'sunnytote-smiley')!.priceCents)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
