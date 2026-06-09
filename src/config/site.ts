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
export const ORG_NAME            = "Race Against Cancers Inc.";
export const EVENT_NAME          = "Race Against Cancers 2026";
export const EVENT_DATE_ISO      = "2026-11-07T08:00:00-07:00"; // 10K & 5K start 8:00 AM MST
export const EVENT_DATE_DISPLAY  = "Saturday, November 7, 2026";
export const TEN_K_START_TIME    = "8:00 AM";
export const FIVE_K_START_TIME   = "8:00 AM";
export const EVENT_YEAR          = "2026";

// --- LOCATION -----------------------------------------------
// 10K: point-to-point — start near mouth of Provo Canyon, finish downtown Provo
export const EVENT_LOCATION_NAME     = "N Canyon Road, Provo";        // 10K start
export const EVENT_LOCATION_ADDRESS  = "4664 N Canyon Rd, Provo, UT 84604"; // in front of Canyon Crest Elementary
export const FINISH_LOCATION_NAME    = "University Ave & Center St";   // 10K finish
export const FINISH_LOCATION_ADDRESS = "University Ave & Center St, Provo, UT 84601";
// 5K: loop — starts and finishes at Riverwoods
export const FIVE_K_LOCATION_NAME    = "Riverwoods Shopping Center";
export const FIVE_K_LOCATION_ADDRESS = "4931 N 300 W, Provo, UT 84604";
// Set to "" until an official GPS recording of the 10K course exists —
// the race-details page automatically shows "GPX Coming Soon" when empty.
export const COURSE_GPX_URL          = "";

// --- PLATFORM LINKS -----------------------------------------
// Paste RunSignup or GiveButter URLs here — every button on the site points here
export const REGISTRATION_URL = "[[REPLACE: registration platform URL (RunSignup/GiveButter)]]";
export const DONATION_URL     = "[[REPLACE: donation platform URL (RunSignup/GiveButter)]]";

// --- REGISTRATION -------------------------------------------
export const MIN_DONATION_AMOUNT   = 99; // 10K minimum — canonical number
export const MIN_DONATION_5K       = 49;  // 5K minimum
export const TEN_K_LABEL           = "10K (6.2 mi)";
export const FIVE_K_LABEL          = "5K (3.1 mi)";

// --- CHECK-IN -----------------------------------------------
export const CHECK_IN_DATE     = "Saturday, November 7, 2026";
export const CHECK_IN_TIME     = "7:00 AM (1 hour before race start)";
export const CHECK_IN_LOCATION = "Downtown Provo — exact venue to be announced";

// --- CONTACT ------------------------------------------------
export const CONTACT_EMAIL = "[[info@raceagainstcancers.org]]";
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
  `Run for a reason. ${EVENT_NAME} — a 10K & 5K on ${EVENT_DATE_DISPLAY}, benefiting ${CHARITY_NAME}. Register with a $${MIN_DONATION_AMOUNT} minimum donation.`;
// Replace with a proper 1200×630 OG image before any public sharing
export const OG_IMAGE_PATH    = "/images/huntsman-logo.jpg";
