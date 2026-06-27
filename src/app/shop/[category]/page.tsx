import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopView } from '@/components/product/ShopView';
import { productsByCategory, Category, CATEGORY_LABELS } from '@/data/products';

const VALID: Category[] = ['totes', 'jewelry'];

const COPY: Record<Category, { title: string; blurb: string }> = {
  totes: {
    title: 'Totes',
    blurb: 'The signature run, dyed one hue at a time. Plus the butter-canvas Sunnytote. No two match exactly.',
  },
  jewelry: {
    title: 'Jewelry',
    blurb: 'Hand-strung glass seed beads in the colors of the water. Light, water-safe, wear it in.',
  },
};

export function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!VALID.includes(category as Category)) return {};
  return {
    title: CATEGORY_LABELS[category as Category],
    description: COPY[category as Category].blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID.includes(category as Category)) notFound();
  const cat = category as Category;

  return (
    <ShopView
      products={productsByCategory(cat)}
      active={cat}
      title={COPY[cat].title}
      blurb={COPY[cat].blurb}
    />
  );
}
