'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart, itemKey } from './CartProvider';
import { formatPrice } from '@/data/products';

export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotalCents, count } = useCart();

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl">Your bag {count > 0 && <span className="text-deep-tide">({count})</span>}</h2>
          <button onClick={closeCart} aria-label="Close cart" className="rounded-full p-1 text-ash hover:text-ink">
            <X size={24} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-xl text-ink">Your bag&apos;s empty.</p>
            <p className="text-ash">Go find something for the water.</p>
            <Link href="/shop" onClick={closeCart} className="btn-tide mt-2">
              Shop the spectrum
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((i) => {
                const key = itemKey(i);
                return (
                  <li key={key} className="flex gap-4 py-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-chip bg-seaglass">
                      <Image src={i.image} alt={i.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-display text-base leading-tight">{i.name}</p>
                          {i.variant && <p className="label mt-0.5">{i.variant}</p>}
                        </div>
                        <p className="pricetag">{formatPrice(i.priceCents * i.qty)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3 rounded-pill border border-line px-2 py-1">
                          <button onClick={() => setQty(key, i.qty - 1)} aria-label="Decrease quantity" className="text-ash hover:text-ink">
                            <Minus size={15} />
                          </button>
                          <span className="w-5 text-center font-mono text-sm">{i.qty}</span>
                          <button onClick={() => setQty(key, i.qty + 1)} aria-label="Increase quantity" className="text-ash hover:text-ink">
                            <Plus size={15} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(key)} className="label hover:text-ink">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-line px-6 py-5">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-display text-lg">Subtotal</span>
                <span className="font-display text-lg">{formatPrice(subtotalCents)}</span>
              </div>
              <p className="label mb-4">Shipping &amp; taxes at checkout.</p>
              <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                Checkout
              </Link>
              <button onClick={closeCart} className="mt-2 w-full py-2 text-center font-mono text-sm uppercase tracking-[0.12em] text-ash hover:text-ink">
                Keep shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
