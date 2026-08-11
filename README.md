# Race Against Cancer 2026 — Website

## Quick start
```bash
npm install
npm run dev
```

Deploy to Vercel: connect the repo and click Deploy.

### Environment variables (required)
Registration and the waitlist run on Stripe, so these must be set in Vercel — see `src/env.example`:

| Variable | What it is |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key. Without it the waitlist and checkout both fail closed. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key, used by the payment form in the browser. |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for `/api/stripe/webhook`. Without it, successful payments are never recorded server-side. |

Use test keys (`sk_test_` / `pk_test_`) until you're ready to take real money, then swap in live keys **and** create a live-mode webhook endpoint — test and live each have their own signing secret.

---

## Opening registration

1. Add live Stripe keys in Vercel (above).
2. Add the webhook endpoint in the Stripe Dashboard → Developers → Webhooks:
   URL `https://<your-domain>/api/stripe/webhook`, event `payment_intent.succeeded`.
   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. Set `VENMO_USERNAME` in `src/config/site.ts` if you want the Venmo option — leaving the
   placeholder hides that tab and registration is card/wallet only.
4. Flip `REGISTRATION_OPEN` to `true` in `src/config/site.ts`. Every nav link, button, and page
   switches from "Join the Waitlist" to "Register" automatically.
5. Email the waitlist. They're Stripe Customers with `metadata.source = pre-signup-form`; export
   them from the Customers page (name, email, and phone are all on the record).

### How a registration is recorded
Checkout creates a Stripe **Customer** (reusing the waitlist one if that email already joined) and a
**PaymentIntent** carrying the athlete's details and waiver acceptance. When payment succeeds, Stripe
calls the webhook, which copies those details onto the customer and flags it `registered = true`.
That flag — not the browser — is what makes a registration official, and it's what keeps the spots
counter from counting one person as both a waitlist signup and a registrant.

### Referral rewards
Every registrant gets a 6-character referral code and a link (`/register?ref=CODE`) on their
confirmation screen. A friend who registers through that link — or who types the code or the
referrer's email into "Who referred you?" — is credited to them, unlimited times.

Attribution is written to the referred person's Stripe customer record (`referredByCode`,
`referredByEmail`) **by the webhook**, so a referral only counts once the friend's payment
succeeds. Rewards are counted from those records rather than tracked as a running tally, so a
repeated webhook delivery can't inflate anyone's total.

To see who has earned what:
```bash
node --env-file=.env.local scripts/referral-report.mjs
```
Set `REFERRAL_REWARD` to `""` in `src/config/site.ts` to switch the program off everywhere —
the form field, the confirmation screen, the FAQ entry, and the waitlist copy all disappear.

Venmo payments are a manual step: the athlete pays in the app, the PaymentIntent is marked
`venmoStatus = pending_manual_confirmation`, and it holds a spot but isn't counted in the donation
total until an organizer confirms it in the Stripe Dashboard.

---

## Editing content

Content lives in two places:
- **`src/config/site.ts`** — event facts, links, contacts, social handles. The one file to edit
  for most changes; everything on the site reads from it.
- **`src/data/faq.ts`** — FAQ questions and answers.

### Still unfilled
Placeholders are written as `[[...]]`. Run `grep -rn '\[\[' src/` to list them; as of now:

| Constant | What to fill in | If left as-is |
|---|---|---|
| `CHARITY_EIN` | EIN / 501(c)(3) number | Not currently shown anywhere on the site |
| `VENMO_USERNAME` | Venmo handle, without the `@` | The Venmo checkout option is hidden entirely |
| `SOCIAL_INSTAGRAM` | Full profile URL | That icon is hidden in the footer |
| `SOCIAL_FACEBOOK` | Full page URL | That icon is hidden in the footer |
| `SOCIAL_TWITTER` | Full profile URL | That icon is hidden in the footer |
| `SOCIAL_YOUTUBE` | Full channel URL | That icon is hidden in the footer |

`COURSE_GPX_URL` is intentionally empty — the race-details page shows "GPX Coming Soon" until an
official GPS recording of the 10K course exists.

### Branding assets
- **Favicon:** `src/app/icon.svg`.
- **Social share image:** generated at build time by `src/app/opengraph-image.tsx` — it's code, not
  a JPG, so edit that file rather than dropping in an image.
- `public/images/` holds the Intermountain Health logo; `public/fonts/` holds the display typeface.

---

## Architecture notes
- Payments run through Stripe in-house: server actions in `src/app/register/` create the
  PaymentIntent, `src/app/api/stripe/webhook/` records the result. See "Opening registration" above.
- Otherwise static + server components, deployable to Vercel.
- The waitlist and registration counters (`src/lib/getSpotsRemaining.ts`,
  `src/lib/getDonationTotal.ts`) read live from Stripe and are cached for 60s by the
  `revalidate` export on the pages that use them.
- All external CTAs read from `site.ts` — change a URL once, it updates everywhere.
