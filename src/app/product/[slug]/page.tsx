import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCart } from '@/components/product/AddToCart';
import { ProductCard } from '@/components/product/ProductCard';
import {
  PRODUCTS, getProduct, formatPrice, productsByCategory, CATEGORY_LABELS,
} from '@/data/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.blurb,
    openGraph: {
      title: product.name,
      description: product.blurb,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href={`/shop/${product.category}`}
        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ash hover:text-deep-tide"
      >
        <ArrowLeft size={14} /> {CATEGORY_LABELS[product.category]}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:py-4">
          {product.badge && (
            <span
              className="inline-block rounded-pill px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink"
              style={{ backgroundColor: product.hue }}
            >
              {product.badge}
            </span>
          )}
          <h1 className="mt-4 text-4xl text-ink sm:text-5xl">{product.name}</h1>
          <p className="mt-3 font-mono text-2xl font-bold text-ink">{formatPrice(product.priceCents)}</p>
          <p className="mt-6 max-w-md text-lead leading-relaxed text-ash">{product.description}</p>

          <div className="mt-8 max-w-md">
            <AddToCart product={product} />
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <h2 className="label mb-3">The details</h2>
            <ul className="space-y-2 text-sm text-ash">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-deep-tide">—</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl text-ink sm:text-3xl">You might also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
