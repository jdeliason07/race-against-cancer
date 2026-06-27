// ============================================================
// SUNNY TIDES — PRODUCT CATALOG
// One hue per tote, dyed by hand. No two bags match exactly —
// that variation is a feature, not a defect.
// Prices in cents. Add or edit products here.
// ============================================================

export type Category = 'totes' | 'jewelry';

export interface Variant {
  name: string;       // e.g. "Color"
  options: string[];  // e.g. ["Blue", "Pink"]
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  priceCents: number;
  /** Spectrum hue used for accents on the product. */
  hue: string;
  images: string[];
  /** One-liner for cards. Plain, sensory, specific. */
  blurb: string;
  /** Full description, brand voice. */
  description: string;
  details: string[];
  variant?: Variant;
  badge?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // --- SIGNATURE TOTE SPECTRUM ---------------------------------
  {
    slug: 'wave-blue-tote',
    name: 'Wave Blue Tote',
    category: 'totes',
    priceCents: 3400,
    hue: '#6FAED9',
    images: ['/images/products/tote-wave.svg', '/images/lifestyle/beach-tote.jpg'],
    blurb: 'Cold-water blue, bled into white.',
    description:
      'The one that started the run. Each Wave Blue tote is hand-dyed one bag at a time, so the bloom lands a little differently every time. Made for water you’ll actually get in.',
    details: ['100% cotton canvas', 'Hand-dyed in small batches', 'Block-print sun stamp', '15" × 16" with long shoulder straps', 'Made in CA'],
    badge: 'Signature run',
    featured: true,
  },
  {
    slug: 'sea-lime-tote',
    name: 'Sea Lime Tote',
    category: 'totes',
    priceCents: 3400,
    hue: '#7FC44E',
    images: ['/images/products/tote-lime.svg'],
    blurb: 'Green like light through a wave.',
    description:
      'Sea Lime is the loud one. Bright dye pulled down into a bleached center, finished with the sun stamp. No two are the same.',
    details: ['100% cotton canvas', 'Hand-dyed in small batches', 'Block-print sun stamp', '15" × 16" with long shoulder straps', 'Made in CA'],
    badge: 'Signature run',
  },
  {
    slug: 'sunset-orange-tote',
    name: 'Sunset Orange Tote',
    category: 'totes',
    priceCents: 3400,
    hue: '#E98A33',
    images: ['/images/products/tote-sunset.svg'],
    blurb: 'The last hour of light.',
    description:
      'Warm orange dye, hand-pulled into white. Carries a towel, a book, and a coconut without complaining. Dawn patrol approved — stays out till sunset.',
    details: ['100% cotton canvas', 'Hand-dyed in small batches', 'Block-print sun stamp', '15" × 16" with long shoulder straps', 'Made in CA'],
    badge: 'Signature run',
    featured: true,
  },
  {
    slug: 'shell-pink-tote',
    name: 'Shell Pink Tote',
    category: 'totes',
    priceCents: 3400,
    hue: '#EF87A2',
    images: ['/images/products/tote-shell.svg'],
    blurb: 'Soft pink, washed up at dawn.',
    description:
      'Shell Pink is the quiet favorite. Gentle dye, generous bloom, the sun stamp pressed on by hand. Goes with everything you own.',
    details: ['100% cotton canvas', 'Hand-dyed in small batches', 'Block-print sun stamp', '15" × 16" with long shoulder straps', 'Made in CA'],
    badge: 'Signature run',
  },
  {
    slug: 'orchid-tote',
    name: 'Orchid Tote',
    category: 'totes',
    priceCents: 3400,
    hue: '#B05CB0',
    images: ['/images/products/tote-orchid.svg'],
    blurb: 'Deep purple, like dusk on the water.',
    description:
      'Orchid runs the deepest in the spectrum. Rich dye bled into white, one stamp, one of a kind. The whole day ahead.',
    details: ['100% cotton canvas', 'Hand-dyed in small batches', 'Block-print sun stamp', '15" × 16" with long shoulder straps', 'Made in CA'],
    badge: 'Signature run',
  },
  {
    slug: 'sunnytote-smiley',
    name: 'Sunnytote — Smiley',
    category: 'totes',
    priceCents: 3600,
    hue: '#F0E6A8',
    images: ['/images/products/tote-smiley.svg', '/images/lifestyle/paint-party.jpg'],
    blurb: 'Butter canvas. Hand-drawn smiles.',
    description:
      'Born from the paint-party side of Sunny Tides. Undyed butter canvas, smiles drawn on loose by hand — no two land the same. Roomy enough for the whole beach day.',
    details: ['100% cotton canvas, undyed', 'Hand-drawn smileys in ink', 'Oversized everyday carry', '16" × 17" with long shoulder straps', 'Made in CA'],
    badge: 'Paint-party drop',
    featured: true,
  },

  // --- BEADED JEWELRY ------------------------------------------
  {
    slug: 'capri-necklace',
    name: 'Capri Necklace',
    category: 'jewelry',
    priceCents: 2400,
    hue: '#B05CB0',
    images: ['/images/products/necklace-capri.jpg'],
    blurb: 'Blue, pink, and a little purple.',
    description:
      'Hand-strung glass seed beads in the colors of a Capri afternoon. Light enough to forget you’re wearing it. Wear it solo or stack a few.',
    details: ['Hand-strung glass seed beads', 'Adjustable cord', 'Water-safe — wear it in', 'Each strand strung by hand'],
    variant: { name: 'Color', options: ['Blue', 'Pink'] },
    featured: true,
  },
  {
    slug: 'santorini-necklace',
    name: 'Santorini Necklace',
    category: 'jewelry',
    priceCents: 2400,
    hue: '#3D96E0',
    images: ['/images/products/necklace-santorini.jpg'],
    blurb: 'Teal and sea-glass multi.',
    description:
      'A multi-tone strand pulled from the water off Santorini — teal, green, and deep blue glass beads. Made for water you’ll actually get in.',
    details: ['Hand-strung glass seed beads', 'Adjustable cord', 'Water-safe — wear it in', 'Each strand strung by hand'],
    variant: { name: 'Color', options: ['Teal Multi', 'Dark Blue Multi'] },
    featured: true,
  },
];

export const formatPrice = (cents: number) =>
  `$${(cents / 100).toFixed(2).replace(/\.00$/, '')}`;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const productsByCategory = (cat: Category) =>
  PRODUCTS.filter((p) => p.category === cat);

export const featuredProducts = () => PRODUCTS.filter((p) => p.featured);

export const CATEGORY_LABELS: Record<Category, string> = {
  totes: 'Totes',
  jewelry: 'Jewelry',
};
