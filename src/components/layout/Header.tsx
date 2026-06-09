'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/register',      label: 'Register' },
  { href: '/race-details',  label: 'Race Details' },
  { href: '/volunteer',     label: 'Become a Volunteer' },
  { href: '/faq',           label: 'FAQ' },
  { href: '/about',         label: 'About' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Thin decorative pink bar */}
      <div className="bg-pink py-1.5" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-lg uppercase tracking-wide text-ink transition-colors hover:text-pink"
            aria-label="Race Against Cancers — Home"
          >
            RACE<span className="text-pink">AGAINST</span>CANCERS
          </Link>

          {/* Register button + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/register" className="btn-primary py-3 px-5 text-xs">
              Register
            </Link>

            {/* Hamburger */}
            <div ref={menuRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="main-nav"
              className="flex flex-col justify-center gap-[5px] p-2 text-ink transition-colors hover:text-pink"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown */}
            {open && (
              <nav
                id="main-nav"
                className="absolute right-0 top-full mt-2 w-56 rounded-card border border-line bg-paper shadow-lg"
                aria-label="Primary navigation"
              >
                <ul className="flex flex-col py-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block px-5 py-3 font-body text-xs font-semibold uppercase tracking-widest text-ash transition-colors hover:bg-blush hover:text-pink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          </div>
        </div>
      </header>
    </>
  );
}
