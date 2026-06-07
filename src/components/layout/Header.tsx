'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/register',  label: 'Register' },
  { href: '/race-details', label: 'Race Details' },
  { href: '/sponsor',  label: 'Become a Sponsor' },
  { href: '/volunteer', label: 'Become a Volunteer' },
  { href: '/faq',      label: 'FAQ' },
  { href: '/about',    label: 'About' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thin decorative pink bar */}
      <div className="bg-pink py-1.5" aria-hidden="true" />

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
            <Link
              href="/register"
              className="btn-primary py-3 px-5 text-xs"
            >
              Register
            </Link>
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
              <li className="pt-2">
                <Link
                  href="/register"
                  className="btn-primary w-full text-center"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
