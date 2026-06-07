'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { REGISTRATION_URL, DONATION_URL, MIN_DONATION_AMOUNT } from '@/config/site';

const navLinks = [
  { href: '/register', label: 'Register' },
  { href: '/race-details', label: 'Race Details' },
  { href: '/donate', label: 'Donate' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Announcement bar — always visible, drives the two key actions */}
      <div className="bg-pink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2.5 md:justify-center md:gap-8">
          <p className="font-body text-xs font-bold uppercase tracking-widest">
            November 7, 2026 · Half Marathon & 5K
          </p>
          <div className="flex items-center gap-3">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill bg-white px-4 py-1.5 font-body text-xs font-bold uppercase tracking-widest text-pink transition-colors hover:bg-blush"
            >
              Register — ${MIN_DONATION_AMOUNT}+
            </a>
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border border-white/50 px-4 py-1.5 font-body text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raspberry"
            >
              Donate
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-lg uppercase tracking-wide text-ink transition-colors hover:text-pink"
            aria-label="Race Against Cancer — Home"
          >
            RACE<span className="text-pink">AGAINST</span>CANCER
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs font-semibold uppercase tracking-widest text-ash transition-colors hover:text-pink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-3 px-5 text-xs"
            >
              Register
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="text-ink lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav
            id="mobile-nav"
            className="border-t border-line bg-paper px-6 py-6 lg:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm font-semibold uppercase tracking-widest text-ash transition-colors hover:text-pink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex flex-col gap-3 pt-2">
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                  onClick={() => setOpen(false)}
                >
                  Register — ${MIN_DONATION_AMOUNT}+ Donation
                </a>
                <a
                  href={DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-donate text-center"
                  onClick={() => setOpen(false)}
                >
                  Donate
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
