// ============================================================
// RACE AGAINST CANCERS — SITE CONFIGURATION
// ============================================================
// This is the ONE file to edit for content updates.
// Non-developers: only touch this file and src/data/*.ts
// ============================================================

// --- CHARITY ------------------------------------------------
export const CHARITY_NAME = "Huntsman Cancer Institute";
export const CHARITY_URL  = "https://huntsmancancer.org";
export const CHARITY_EIN  = "[[EIN / 501(c)(3) number]]";

// --- EVENT --------------------------------------------------
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

// --- PLATFORM LINKS -----------------------------------------
// Paste RunSignup or GiveButter URLs here — every button on the site points here
export const REGISTRATION_URL = "[[REPLACE: registration platform URL (RunSignup/GiveButter)]]";
export const DONATION_URL     = "[[REPLACE: donation platform URL (RunSignup/GiveButter)]]";

// --- REGISTRATION -------------------------------------------
export const MIN_DONATION_AMOUNT   = 99; // 10K minimum — canonical number
export const MIN_DONATION_FUN_RUN  = 49;  // Fun Run minimum
export const TEN_K_LABEL           = "10K (6.2 mi)";
export const FUN_RUN_LABEL         = "Fun Run (~2 mi)";

// --- PACKET PICKUP ------------------------------------------
export const PACKET_PICKUP_DATE     = "Friday, November 6, 2026";
export const PACKET_PICKUP_TIME     = "3:00 – 5:00 PM";
export const PACKET_PICKUP_LOCATION = "LaVell Edwards Stadium, BYU Campus";

// --- CONTACT ------------------------------------------------
export const CONTACT_EMAIL = "[[info@raceagainstcancer.org]]";
export const CONTACT_PHONE = "858-774-2699";
export const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScX-3U-iBEHY7YoIp1Htsdfz-NnOafxxGssKFWVrKnv7hDumQ/viewform";

// --- SOCIAL LINKS -------------------------------------------
// Set to "" to hide that icon in the footer
export const SOCIAL_INSTAGRAM = "[[https://instagram.com/YOURHANDLE]]";
export const SOCIAL_FACEBOOK  = "[[https://facebook.com/YOURPAGE]]";
export const SOCIAL_TWITTER   = "[[https://twitter.com/YOURHANDLE]]";
export const SOCIAL_YOUTUBE   = "[[https://youtube.com/@YOURCHANNEL]]";

// --- SEO ----------------------------------------------------
// Used by sitemap, robots.txt, metadataBase, and JSON-LD schema.
export const SITE_URL         = "https://raceagainstcancers.org";
export const META_DESCRIPTION =
  `Run for a reason. ${EVENT_NAME} — a 10K & Fun Run on ${EVENT_DATE_DISPLAY}, benefiting ${CHARITY_NAME}. Register with a $${MIN_DONATION_AMOUNT} minimum donation.`;
