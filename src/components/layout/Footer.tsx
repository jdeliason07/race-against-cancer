import Link from 'next/link';
import { Camera } from 'lucide-react';
import { SunStamp } from '@/components/brand/SunStamp';
import {
  BRAND_NAME, BRAND_TAGLINE, CONTACT_EMAIL, SOCIAL_INSTAGRAM, OWNER_NAME,
} from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <SunStamp className="h-10 w-10 text-paper" />
            <span className="font-display text-2xl text-paper">Sunny Tides</span>
          </div>
          <p className="mt-4 max-w-xs text-lead text-seafoam">{BRAND_TAGLINE}</p>
          <p className="mt-2 max-w-xs text-sm text-seafoam/80">
            Hand-dyed totes and beach-day goods, made by hand by {OWNER_NAME}.
          </p>
        </div>

        <nav aria-label="Shop">
          <h3 className="label text-seafoam/70">Shop</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/shop" className="text-paper/90 hover:text-sun">Shop All</Link></li>
            <li><Link href="/shop/totes" className="text-paper/90 hover:text-sun">Totes</Link></li>
            <li><Link href="/shop/jewelry" className="text-paper/90 hover:text-sun">Jewelry</Link></li>
          </ul>
        </nav>

        <nav aria-label="More">
          <h3 className="label text-seafoam/70">More</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="text-paper/90 hover:text-sun">About</Link></li>
            <li><Link href="/contact" className="text-paper/90 hover:text-sun">Contact</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="text-paper/90 hover:text-sun">{CONTACT_EMAIL}</a></li>
            {SOCIAL_INSTAGRAM && (
              <li>
                <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-paper/90 hover:text-sun">
                  <Camera size={16} /> Instagram
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="label text-seafoam/60">© {year} {BRAND_NAME}. Made by hand.</p>
          <p className="label text-seafoam/60">No two bags match exactly. That&apos;s the point.</p>
        </div>
      </div>
    </footer>
  );
}
