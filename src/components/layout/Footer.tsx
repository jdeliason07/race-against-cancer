import Link from 'next/link';
import {
  CHARITY_NAME, EVENT_YEAR, CONTACT_PHONE, ORG_NAME,
  REGISTRATION_OPEN,
} from '@/config/site';
import { Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="font-display text-[clamp(28px,9vw,72px)] uppercase leading-none">
            RACE<span className="text-pink">AGAINST</span>CANCERS
          </p>
          <p className="mt-4 font-body text-sm text-white/55 tracking-widest uppercase">
            10K & Fun Run · November 7, 2026
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-10 md:flex-row md:justify-between md:items-start">
          <p className="font-body text-xs text-white/40 tracking-widest uppercase">
            Benefiting {CHARITY_NAME}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-5" aria-label="Footer navigation">
            <Link href="/register" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">{REGISTRATION_OPEN ? 'Register' : 'Join the Waitlist'}</Link>
            <Link href="/race-details" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">Race Details</Link>
<Link href="/volunteer" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">Volunteer</Link>
            <Link href="/sponsor" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">Sponsor</Link>
            <Link href="/faq" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">FAQ</Link>
            <Link href="/about" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">About</Link>
            <Link href="/privacy" className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest">Privacy</Link>
            <a href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`} className="font-body text-xs text-white/55 hover:text-pink transition-colors uppercase tracking-widest flex items-center gap-1">
              <Phone size={13} /> {CONTACT_PHONE}
            </a>
          </nav>
        </div>

        <p className="mt-8 text-center font-body text-xs text-white/25">
          © {EVENT_YEAR} {ORG_NAME} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
