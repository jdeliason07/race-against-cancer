'use server';

import Stripe from 'stripe';
import { getProduct } from '@/data/products';
import { CURRENCY, SHIPPING_FLAT_CENTS, FREE_SHIPPING_OVER_CENTS } from '@/config/site';

export interface CheckoutLine {
  slug: string;
  variant?: string;
  qty: number;
}

export type CheckoutResult =
  | { url: string }
  | { demo: true }
  | { error: string };

/**
 * Builds a Stripe Checkout Session from the cart. Prices are always
 * recomputed server-side from the catalog — the client price is never trusted.
 * If STRIPE_SECRET_KEY isn't set, returns { demo: true } so the storefront
 * still works end-to-end before payments are wired up.
 */
export async function createCheckout(
  lines: CheckoutLine[],
  origin: string,
): Promise<CheckoutResult> {
  const items = lines
    .map((l) => {
      const product = getProduct(l.slug);
      if (!product) return null;
      const qty = Math.max(1, Math.min(99, Math.floor(l.qty)));
      return { product, variant: l.variant, qty };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (items.length === 0) return { error: 'Your bag is empty.' };

  const subtotal = items.reduce((n, i) => n + i.product.priceCents * i.qty, 0);
  const shippingCents = subtotal >= FREE_SHIPPING_OVER_CENTS ? 0 : SHIPPING_FLAT_CENTS;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { demo: true };

  const stripe = new Stripe(secretKey);

  // Only forward raster images to Stripe (it doesn't render SVG previews).
  const imageFor = (path: string) =>
    /\.(png|jpe?g|webp)$/i.test(path) && origin.startsWith('http')
      ? [`${origin}${path}`]
      : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((i) => ({
      quantity: i.qty,
      price_data: {
        currency: CURRENCY,
        unit_amount: i.product.priceCents,
        product_data: {
          name: i.variant ? `${i.product.name} — ${i.variant}` : i.product.name,
          ...(imageFor(i.product.images[0]) ? { images: imageFor(i.product.images[0]) } : {}),
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU'] },
    shipping_options:
      shippingCents > 0
        ? [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: shippingCents, currency: CURRENCY },
                display_name: 'Standard shipping',
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: 0, currency: CURRENCY },
                display_name: 'Free shipping',
              },
            },
          ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  if (!session.url) return { error: 'Could not start checkout. Try again.' };
  return { url: session.url };
}
