'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { SunStamp } from '@/components/brand/SunStamp';
import { CONTACT_EMAIL } from '@/config/site';

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  // Order placed — empty the bag.
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <SunStamp className="h-20 w-20 text-ink" />
      <h1 className="mt-6 text-4xl text-ink sm:text-5xl">You&apos;re all set.</h1>
      <p className="mt-4 text-lead text-ash">
        Thanks for the order. Each piece is made and packed by hand, so give us a few days —
        we&apos;ll email tracking the moment it ships.
      </p>
      <p className="mt-2 text-sm text-ash">
        Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-deep-tide underline">{CONTACT_EMAIL}</a>
      </p>
      <Link href="/shop" className="btn-primary mt-8">Keep shopping</Link>
    </div>
  );
}
