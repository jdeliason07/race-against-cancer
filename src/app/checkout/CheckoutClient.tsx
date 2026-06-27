'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { useCart, itemKey } from '@/components/cart/CartProvider';
import { formatPrice } from '@/data/products';
import { FREE_SHIPPING_OVER_CENTS, SHIPPING_FLAT_CENTS } from '@/config/site';
import { createCheckout } from './actions';

export function CheckoutClient() {
  const { items, subtotalCents, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping =
    items.length === 0 || subtotalCents >= FREE_SHIPPING_OVER_CENTS ? 0 : SHIPPING_FLAT_CENTS;
  const total = subtotalCents + shipping;

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const lines = items.map((i) => ({ slug: i.slug, variant: i.variant, qty: i.qty }));
      const result = await createCheckout(lines, window.location.origin);
      if ('url' in result) {
        window.location.href = result.url;
      } else if ('demo' in result) {
        clear();
        router.push('/checkout/success?demo=1');
      } else {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-card bg-seaglass px-6 py-16 text-center">
        <p className="font-display text-2xl text-ink">Your bag&apos;s empty.</p>
        <p className="mt-2 text-ash">Add something before you check out.</p>
        <Link href="/shop" className="btn-primary mt-6">Shop the spectrum</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
      {/* Summary */}
      <div className="lg:order-2">
        <div className="rounded-card bg-seaglass p-6">
          <h2 className="font-display text-xl text-ink">Order summary</h2>
          <ul className="mt-5 divide-y divide-line">
            {items.map((i) => (
              <li key={itemKey(i)} className="flex items-center gap-4 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-chip bg-white">
                  <Image src={i.image} alt={i.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-base leading-tight text-ink">{i.name}</p>
                  <p className="label mt-0.5">
                    {i.variant ? `${i.variant} · ` : ''}Qty {i.qty}
                  </p>
                </div>
                <span className="pricetag">{formatPrice(i.priceCents * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ash">Subtotal</dt>
              <dd className="font-mono text-ink">{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Shipping</dt>
              <dd className="font-mono text-ink">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2">
              <dt className="font-display text-lg text-ink">Total</dt>
              <dd className="font-display text-lg text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Pay */}
      <div className="lg:order-1">
        <h2 className="font-display text-xl text-ink">Checkout</h2>
        <p className="mt-2 text-sm text-ash">
          You&apos;ll enter shipping and payment securely on the next step.
        </p>

        {error && (
          <p className="mt-4 rounded-chip bg-shell/20 px-4 py-3 text-sm text-ink">{error}</p>
        )}

        <button onClick={handlePay} disabled={loading} className="btn-primary mt-6 w-full">
          <Lock size={16} />
          {loading ? 'Starting checkout…' : `Pay ${formatPrice(total)}`}
        </button>
        <Link href="/cart" className="mt-3 block py-2 text-center font-mono text-sm uppercase tracking-[0.12em] text-ash hover:text-ink">
          Back to bag
        </Link>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.12em] text-ash/70">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}
