'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { REGISTRATION_URL } from '@/config/site';

const navLinks = [
  { href: '/stories', label: 'The Stories' },
  { href: '/register', label: 'Register' },
  { href: '/race-details', label: 'Race Details' },
  { href: '/donate', label: 'Donate' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/86 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg uppercase tracking-wide text-ink hover:text-pink transition-colors" aria-label="Race Against Cancer — Home">
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
            className="btn-primary text-xs py-3 px-5"
          >
            Register
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-ink"
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
                  className="font-body text-sm font-semibold uppercase tracking-widest text-ash hover:text-pink transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
                onClick={() => setOpen(false)}
              >
                Register — $100+ Donation
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
