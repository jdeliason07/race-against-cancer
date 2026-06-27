'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCart, itemKey } from '@/components/cart/CartProvider';
import { formatPrice } from '@/data/products';
import { FREE_SHIPPING_OVER_CENTS, SHIPPING_FLAT_CENTS } from '@/config/site';

export default function CartPage() {
  const { items, subtotalCents, setQty, removeItem } = useCart();

  const shipping =
    items.length === 0 || subtotalCents >= FREE_SHIPPING_OVER_CENTS ? 0 : SHIPPING_FLAT_CENTS;
  const total = subtotalCents + shipping;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl text-ink sm:text-5xl">Your bag</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-card bg-seaglass px-6 py-16 text-center">
          <p className="font-display text-2xl text-ink">Nothing in here yet.</p>
          <p className="mt-2 text-ash">Go find something for the water.</p>
          <Link href="/shop" className="btn-primary mt-6">Shop the spectrum</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((i) => {
              const key = itemKey(i);
              return (
                <li key={key} className="flex gap-5 py-6">
                  <Link href={`/product/${i.slug}`} className="relative h-28 w-28 shrink-0 overflow-hidden rounded-chip bg-seaglass">
                    <Image src={i.image} alt={i.name} fill className="object-cover" sizes="112px" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${i.slug}`} className="font-display text-lg text-ink hover:text-deep-tide">{i.name}</Link>
                        {i.variant && <p className="label mt-0.5">{i.variant}</p>}
                      </div>
                      <button onClick={() => removeItem(key)} aria-label={`Remove ${i.name}`} className="text-ash hover:text-ink">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-4 rounded-pill border border-line px-3 py-2">
                        <button onClick={() => setQty(key, i.qty - 1)} aria-label="Decrease quantity" className="text-ash hover:text-ink"><Minus size={15} /></button>
                        <span className="w-5 text-center font-mono text-sm">{i.qty}</span>
                        <button onClick={() => setQty(key, i.qty + 1)} aria-label="Increase quantity" className="text-ash hover:text-ink"><Plus size={15} /></button>
                      </div>
                      <span className="pricetag">{formatPrice(i.priceCents * i.qty)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit rounded-card bg-seaglass p-6">
            <h2 className="font-display text-xl text-ink">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ash">Subtotal</dt>
                <dd className="font-mono text-ink">{formatPrice(subtotalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ash">Shipping</dt>
                <dd className="font-mono text-ink">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              {shipping > 0 && (
                <p className="label">
                  {formatPrice(FREE_SHIPPING_OVER_CENTS - subtotalCents)} away from free shipping.
                </p>
              )}
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="font-display text-lg text-ink">Total</dt>
                <dd className="font-display text-lg text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Checkout</Link>
            <Link href="/shop" className="mt-2 block py-2 text-center font-mono text-sm uppercase tracking-[0.12em] text-ash hover:text-ink">Keep shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
