# Sunny Tides

> Warm light on cold water.

The storefront for **Sunny Tides** — hand-dyed canvas totes and hand-strung beaded jewelry,
made by hand by Emma Stanford. Built with Next.js 16 (App Router), Tailwind CSS v4, and Stripe.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Payments

Checkout uses **Stripe Checkout**. The site works out of the box without keys:

- **No `STRIPE_SECRET_KEY`** → demo mode. Checkout completes and shows the confirmation
  page without charging a card. Good for previews and content work.
- **With `STRIPE_SECRET_KEY`** → real Stripe Checkout. The customer is redirected to
  Stripe to enter payment and shipping, then returned to `/checkout/success`.

To enable real payments, copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
# then set STRIPE_SECRET_KEY=sk_test_...
```

Prices are always recomputed server-side from the catalog — the client price is never trusted.

## Editing content

Everything lives in two files:

- **`src/config/site.ts`** — brand facts: name, tagline, contact email, social links,
  shipping rates, site URL.
- **`src/data/products.ts`** — the product catalog. Each product has a slug, name, category
  (`totes` or `jewelry`), price (in cents), images, copy, details, and optional variants.

### Adding a product

Add an entry to the `PRODUCTS` array in `src/data/products.ts`, then drop its image(s) in
`public/images/products/`. New products automatically appear in the shop, category pages,
sitemap, and get a static product page at `/product/<slug>`.

## Project structure

```
src/
  app/
    page.tsx                 Home
    shop/                    Shop all + /shop/[category]
    product/[slug]/          Product detail (static per product)
    cart/                    Cart page
    checkout/                Checkout + Stripe server action + success page
    about/  contact/         Brand pages
  components/
    layout/                  Header (with cart), Footer
    cart/                    Cart context (localStorage) + slide-in drawer
    product/                 Product card, gallery, add-to-cart, shop view
    brand/                   Sun stamp + hand-drawn smiley marks
  config/site.ts             Brand configuration
  data/products.ts           Product catalog
```

## Brand

- **Colors** — Tide Blue, Sun Gold, Seafoam, Sea Glass, Deep Water, plus the tie-dye product
  spectrum (Wave Blue, Sea Lime, Sunset Orange, Shell Pink, Orchid). Defined as Tailwind theme
  tokens in `src/app/globals.css`.
- **Type** — Fredoka (display), Hanken Grotesk (body), Space Mono (labels & prices).
- **Marks** — the block-print sun stamp (formal) and the hand-drawn smiley (informal).

## Deploy

Deploy to Vercel: connect the repo and click Deploy. Set `STRIPE_SECRET_KEY` in the project's
environment variables to turn on real payments.
