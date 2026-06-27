'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SunStamp } from '@/components/brand/SunStamp';
import { BRAND_NAME } from '@/config/site';

const navLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop/totes', label: 'Totes' },
  { href: '/shop/jewelry', label: 'Jewelry' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Announcement bar — Sun Gold pop */}
      <div className="bg-sun py-2 text-center font-mono text-xs uppercase tracking-[0.18em] text-ink">
        Hand-dyed in small batches · Free shipping over $75
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${BRAND_NAME} — Home`}>
            <SunStamp className="h-9 w-9 text-ink" />
            <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Sunny Tides
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-ash transition-colors hover:text-deep-tide"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-1">
            <button
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              className="relative rounded-full p-2 text-ink transition-colors hover:text-deep-tide"
            >
              <ShoppingBag size={22} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-deep-tide px-1 font-mono text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <div ref={menuRef} className="relative md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="rounded-full p-2 text-ink hover:text-deep-tide"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
              {open && (
                <nav
                  className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-card border border-line bg-paper shadow-xl"
                  aria-label="Mobile navigation"
                >
                  <ul className="flex flex-col py-2">
                    {navLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ash transition-colors hover:bg-seaglass hover:text-deep-tide"
                        >
                          {l.label}
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

      <CartDrawer />
    </>
  );
}
