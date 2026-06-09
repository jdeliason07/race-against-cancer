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
export const EVENT_DATE_ISO      = "2026-11-07T08:00:00-07:00"; // MST = UTC-7
export const EVENT_DATE_DISPLAY  = "Saturday, November 7, 2026";
export const HALF_START_TIME     = "8:00 AM";
export const FIVE_K_START_TIME   = "To be announced";
export const EVENT_YEAR          = "2026";

// --- LOCATION -----------------------------------------------
export const EVENT_LOCATION_NAME    = "Utah Lake State Park";
export const EVENT_LOCATION_ADDRESS = "4400 W Center St, Provo, UT 84601";
export const EVENT_LOCATION_MAPS_URL = "[[GOOGLE MAPS LINK]]";
export const EVENT_COURSE_MAP_URL    = "[[COURSE MAP IMAGE OR LINK]]";
export const COURSE_GPX_URL          = "/course.gpx";

// --- PLATFORM LINKS -----------------------------------------
// Paste RunSignup or GiveButter URLs here — every button on the site points here
export const REGISTRATION_URL = "[[REPLACE: registration platform URL (RunSignup/GiveButter)]]";
export const DONATION_URL     = "[[REPLACE: donation platform URL (RunSignup/GiveButter)]]";

// --- REGISTRATION -------------------------------------------
export const MIN_DONATION_AMOUNT   = 100; // half marathon minimum — canonical number
export const MIN_DONATION_5K       = 49;  // 5K minimum
export const HALF_MARATHON_LABEL   = "Half Marathon (13.1 mi)";
export const FIVE_K_LABEL          = "5K (3.1 mi)";
export const REGISTRATION_INCLUDES = [
  "[[Event T-Shirt]]",
  "[[Race Bib with timing chip]]",
  "[[Finisher Medal]]",
  "[[Post-race refreshments]]",
];

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
  `Run for a reason. ${EVENT_NAME} — a half marathon & 5K on ${EVENT_DATE_DISPLAY}, benefiting ${CHARITY_NAME}. Register with a $${MIN_DONATION_AMOUNT} minimum donation.`;
// Replace with a proper 1200×630 OG image before any public sharing
export const OG_IMAGE_PATH    = "/images/huntsman-logo.jpg";
