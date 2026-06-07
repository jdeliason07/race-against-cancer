# Race Against Cancer 2026 — Website

## Quick start
```bash
npm install
npm run dev
```

Deploy to Vercel: connect the repo and click Deploy. No environment variables needed — all config is in source files.

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
| `REGISTRATION_URL` | RunSignup/GiveButter registration link |
| `DONATION_URL` | RunSignup/GiveButter donation link |
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
- No payment processing — all transactions handled by RunSignup/GiveButter
- No backend — pure static + server components, deployable to Vercel
- Episode daily-drip logic: `isReleased()` in `src/lib/utils.ts` compares episode `releaseDate` against today's date. Episodes auto-unlock when their date arrives.
- All external CTAs read from `site.ts` — change a URL once, it updates everywhere
