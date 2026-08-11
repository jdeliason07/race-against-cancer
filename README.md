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

Venmo payments are a manual step: the athlete pays in the app, the PaymentIntent is marked
`venmoStatus = pending_manual_confirmation`, and it holds a spot but isn't counted in the donation
total until an organizer confirms it in the Stripe Dashboard.

---

## What you MUST fill in before launch

All content lives in two places:
- **`src/config/site.ts`** — event facts, links, contacts, social handles
- **`src/data/episodes.ts`** — the 20 documentary episodes
- **`src/data/faq.ts`** — FAQ answers

Search for `[[` to find every placeholder across the codebase.

### `src/config/site.ts`
| Constant | What to fill in |
|---|---|
| `CHARITY_NAME` | The charity's official name |
| `CHARITY_URL` | Charity website URL |
| `CHARITY_EIN` | EIN or 501(c)(3) number |
| `HALF_START_TIME` | e.g. "7:30 AM" |
| `FIVE_K_START_TIME` | e.g. "8:00 AM" |
| `EVENT_LOCATION_NAME` | Venue name |
| `EVENT_LOCATION_ADDRESS` | Full street address |
| `EVENT_LOCATION_MAPS_URL` | Google Maps link |
| `EVENT_COURSE_MAP_URL` | Course map image URL or link |
| `REGISTRATION_INCLUDES` | List of swag/perks in each array item |
| `PACKET_PICKUP_DATE` | e.g. "Friday, November 6, 2026" |
| `PACKET_PICKUP_TIME` | e.g. "12:00 PM – 7:00 PM" |
| `PACKET_PICKUP_LOCATION` | Full address |
| `CONTACT_EMAIL` | Your contact email |
| `SOCIAL_INSTAGRAM` | Full Instagram profile URL |
| `SOCIAL_FACEBOOK` | Full Facebook page URL |
| `SOCIAL_TWITTER` | Full Twitter/X profile URL |
| `SOCIAL_YOUTUBE` | Full YouTube channel URL |
| `EMAIL_SIGNUP_EMBED` | Paste Mailchimp/Beehiiv/ConvertKit embed HTML |
| `SITE_URL` | Your production domain, e.g. https://raceagainstcancer.org |

### `src/data/episodes.ts`
For each of the 20 episodes, fill in:
- `personName` — the person's name
- `title` — episode title
- `description` — 1–2 sentence summary of their story
- `videoId` — YouTube video ID (the part after `v=`) or Vimeo video ID
- `videoProvider` — `"youtube"` or `"vimeo"`
- `releaseDate` — pre-set Oct 18 through Nov 6, confirm or adjust

### `src/data/faq.ts`
Fill in the `answer` field for each FAQ item, especially:
- Refund policy
- Packet pickup details
- What to expect on race day
- Volunteering info
- Charity fund usage specifics

### Assets to add
| File | What it is |
|---|---|
| `public/logo.svg` | Brand logo SVG |
| `public/favicon.ico` | Favicon (generate from logo) |
| `public/images/og-image.jpg` | Social share image (1200×630px) |
| `public/images/hero-bg.jpg` | Optional hero background photo |
| `public/images/video-placeholder.jpg` | Fallback for Vimeo episode thumbnails |

### About page (`src/app/about/page.tsx`)
Fill in the `[[REPLACE: ...]]` blocks for:
- Founding story
- Charity description
- Fund transparency statement
- Documentary background

---

## Architecture notes
- Payments run through Stripe in-house: server actions in `src/app/register/` create the
  PaymentIntent, `src/app/api/stripe/webhook/` records the result. See "Opening registration" above.
- Otherwise static + server components, deployable to Vercel
- Episode daily-drip logic: `isReleased()` in `src/lib/utils.ts` compares episode `releaseDate` against today's date. Episodes auto-unlock when their date arrives.
- All external CTAs read from `site.ts` — change a URL once, it updates everywhere
