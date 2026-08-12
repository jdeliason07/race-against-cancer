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

#### Test mode vs live mode — read before switching
Stripe keeps two completely separate sets of data. A `sk_test_` key writes to test mode; a
`sk_live_` key writes to live mode. **Records do not cross between them.**

That matters most for the waitlist. If signups were collected on test keys and you later swap in
live keys, those people vanish from the live Dashboard — they still exist in test mode, but the
site is now pointed elsewhere. Before switching, export the waitlist to CSV from the mode it was
collected in, or you'll lose the list you spent months building.

To check which mode you're in: look at whether `STRIPE_SECRET_KEY` in Vercel starts with
`sk_test_` or `sk_live_`, or flip the **Test mode** toggle in the Stripe Dashboard and see which
view your customers appear in.

Each mode also has its own webhook endpoint and its own signing secret, so adding a live-mode
endpoint (and updating `STRIPE_WEBHOOK_SECRET`) is a required part of going live.

---

## Opening registration

1. Add live Stripe keys in Vercel (above).
2. Add the webhook endpoint in the Stripe Dashboard → Developers → Webhooks:
   URL `https://<your-domain>/api/stripe/webhook`, event `payment_intent.succeeded`.
   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. Flip `REGISTRATION_OPEN` to `true` in `src/config/site.ts`. Every nav link, button, and page
   switches from "Join the Waitlist" to "Register" automatically.
4. Email the waitlist. They're Stripe Customers with `metadata.source = pre-signup-form`; export
   them from the Customers page (name, email, and phone are all on the record).

### How a registration is recorded
Checkout creates a Stripe **Customer** (reusing the waitlist one if that email already joined) and a
**PaymentIntent** carrying the athlete's details and waiver acceptance. When payment succeeds, Stripe
calls the webhook, which copies those details onto the customer and flags it `registered = true`.
That flag — not the browser — is what makes a registration official.

### Group registrations
One person can register and pay for several athletes: the form asks how many, and the donation
minimum becomes the per-athlete minimum × that count (enforced server-side, not just in the UI).
`MAX_PARTICIPANTS_PER_REGISTRATION` in `src/config/site.ts` caps it; above that the form points
people at `CONTACT_EMAIL`.

When the count is more than 1, the person is treated as an **organizer** rather than an athlete:
date of birth, emergency contact, and the under-18 guardian field are not collected, because they
describe an individual athlete and we don't have those people yet. The waiver checkbox changes to
an undertaking that every athlete (or their guardian) will accept it before race day.

**This means a group registration arrives with a headcount and no roster.** The count lands on the
Stripe customer record as `participantCount` — that's how many bibs are owed — but you still need
each athlete's name and signed waiver at check-in. Worth deciding how you'll run that table before
a 40-person group shows up on race morning.

### Referral rewards
Registrants type their referrer's full name into a "Who referred you?" box. The name is written
to the referred person's Stripe customer record (`referredByName`) **by the webhook**, so a
referral only counts once their payment succeeds.

`/api/referral-report` emails a tally every Monday (the cron lives in `vercel.json`): each
referrer, how many they brought that week, their all-time total, and who they referred. Counts are
derived from the records each run rather than kept as a running tally, so a repeated webhook
delivery can't inflate anyone's total. Names typed by registrants aren't verified — the report
lists who each person referred so you can skim before sending gift cards.

Needs `CRON_SECRET`, `RESEND_API_KEY`, `REPORT_EMAIL_TO`, and `REPORT_EMAIL_FROM` (see
`src/env.example`). Resend is called over plain `fetch`, so swapping in another email provider
means changing one function in the route. To run it on demand:
```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://<your-domain>/api/referral-report
```

Set `REFERRAL_REWARD` to `""` in `src/config/site.ts` to switch the program off everywhere — the
form field, the FAQ entry, the waitlist copy, and the weekly email all stop.

The race has **no attendance cap** — there is no spots-remaining counter and nothing turns
registration off once a number is hit.

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
- The donation total on the home page (`src/lib/getDonationTotal.ts`) reads live from Stripe and
  is cached by the `revalidate` export on that page.
- All external CTAs read from `site.ts` — change a URL once, it updates everywhere.
