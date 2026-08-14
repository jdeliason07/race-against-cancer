// ============================================================
// RACE AGAINST CANCERS — SITE CONFIGURATION
// ============================================================
// This is the ONE file to edit for content updates.
// Non-developers: only touch this file and src/data/*.ts
// ============================================================

// --- CHARITY ------------------------------------------------
export const CHARITY_NAME = "Intermountain Cancer Center Utah Valley";
export const CHARITY_URL  = "https://intermountainhealthcare.org/locations/utah-valley-clinic/cancer-center-utah-valley";

// --- EVENT --------------------------------------------------
export const ORG_NAME            = "Race Against Cancers Inc.";
export const EVENT_NAME          = "Race Against Cancers 2026";
export const EVENT_DATE_ISO      = "2026-11-07T08:00:00-07:00"; // 10K & Fun Run start 8:00 AM MST
export const EVENT_DATE_DISPLAY  = "Saturday, November 7, 2026";
export const TEN_K_START_TIME    = "8:00 AM";
export const FUN_RUN_START_TIME  = "8:00 AM";
export const EVENT_YEAR          = "2026";

// --- LOCATION -----------------------------------------------
// 10K: point-to-point — start near mouth of Provo Canyon, finish downtown Provo
export const EVENT_LOCATION_NAME     = "Canyon Crest Elementary School";   // 10K start
export const EVENT_LOCATION_ADDRESS  = "4664 N Canyon Rd, Provo, UT 84604";
export const FINISH_LOCATION_NAME    = "University Ave & Center St";   // shared finish
export const FINISH_LOCATION_ADDRESS = "University Ave & Center St, Provo, UT 84601";
// Fun Run: point-to-point ~2 mi — starts at LaVell Edwards Stadium, shares finish with 10K
export const FUN_RUN_LOCATION_NAME    = "LaVell Edwards Stadium";
export const FUN_RUN_LOCATION_ADDRESS = "LaVell Edwards Stadium, Provo, UT 84602";
// Set to "" until an official GPS recording of the 10K course exists —
// the race-details page automatically shows "GPX Coming Soon" when empty.
export const COURSE_GPX_URL          = "";

// --- REGISTRATION GATE --------------------------------------
// Flip REGISTRATION_OPEN to true when registration goes live — every nav link,
// button, and page on the site switches over automatically.
// REGISTRATION_OPENS_DATE controls the copy on the waitlist page. Leave it ""
// while the date is undecided and the page reads "Registration opens soon";
// set it (e.g. 'October 1, 2026') to announce a date.
export const REGISTRATION_OPEN       = false;
export const REGISTRATION_OPENS_DATE = '';
// Reads "opens soon" until a date is set, then the date itself.
export const REGISTRATION_OPENS_LABEL = REGISTRATION_OPENS_DATE || 'soon';

// --- REGISTRATION -------------------------------------------
// The race has no attendance cap — registration stays open regardless of
// how many people sign up.
export const MIN_DONATION_AMOUNT   = 99; // 10K minimum — canonical number, per athlete
export const MIN_DONATION_FUN_RUN  = 49;  // Fun Run minimum, per athlete
// One person can register and pay for a group (a company, a team, a family).
// The donation minimum is the per-athlete minimum times this count.
export const MAX_PARTICIPANTS_PER_REGISTRATION = 100;
export const TEN_K_LABEL           = "10K (6.2 mi)";
export const FUN_RUN_LABEL         = "Fun Run (~2 mi)";

// --- REFERRAL INCENTIVE -------------------------------------
// Registrants name whoever referred them in a box on the form. Each named
// person earns the reward below — unlimited times. A report of who referred
// how many is emailed weekly by /api/referral-report.
// Set REFERRAL_REWARD to "" to switch the whole program off site-wide.
export const REFERRAL_REWARD: string = "$10 In-N-Out gift card";
export const REFERRAL_ENABLED = REFERRAL_REWARD !== "";

// --- CHECK-IN -----------------------------------------------
// Each race checks in at its own start line on race morning. Both sets are
// here so there's nothing to edit anywhere else — the race-details page reads
// all of it from below.
export const CHECK_IN_DATE = "Saturday, November 7, 2026";

export const TEN_K_CHECK_IN_TIME     = "7:00 AM (1 hour before race start)";
export const TEN_K_CHECK_IN_LOCATION = "Canyon Crest Elementary School parking lot, 4664 N Canyon Rd, Provo";

export const FUN_RUN_CHECK_IN_TIME     = "7:00 AM (1 hour before race start)";
export const FUN_RUN_CHECK_IN_LOCATION = "LaVell Edwards Stadium, Provo, UT 84602";

// --- CONTACT ------------------------------------------------
export const CONTACT_EMAIL = "events@raceagainstcancers.org";
export const CONTACT_PHONE = "858-774-2699";
export const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScX-3U-iBEHY7YoIp1Htsdfz-NnOafxxGssKFWVrKnv7hDumQ/viewform";

// Social links are deliberately absent. The funnel runs the other way —
// people find the race on social and come here — so the footer doesn't send
// anyone back out.

// --- SEO ----------------------------------------------------
// Used by sitemap, robots.txt, metadataBase, and JSON-LD schema.
export const SITE_URL         = "https://raceagainstcancers.org";
export const META_DESCRIPTION =
  `Run for a reason. ${EVENT_NAME} — a 10K & Fun Run on ${EVENT_DATE_DISPLAY}, benefiting ${CHARITY_NAME}. 10K from $${MIN_DONATION_AMOUNT}, or the family-friendly Fun Run from $${MIN_DONATION_FUN_RUN}.`;
