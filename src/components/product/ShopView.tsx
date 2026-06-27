import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { Product, Category } from '@/data/products';

const FILTERS: { href: string; label: string; key: Category | 'all' }[] = [
  { href: '/shop', label: 'All', key: 'all' },
  { href: '/shop/totes', label: 'Totes', key: 'totes' },
  { href: '/shop/jewelry', label: 'Jewelry', key: 'jewelry' },
];

export function ShopView({
  products,
  active,
  title,
  blurb,
}: {
  products: Product[];
  active: Category | 'all';
  title: string;
  blurb: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="border-b border-line pb-8">
        <p className="section-label">Shop</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-xl text-ash">{blurb}</p>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filter by category">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.href}
            aria-current={active === f.key ? 'page' : undefined}
            className={`rounded-pill border px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
              active === f.key
                ? 'border-ink bg-ink text-paper'
                : 'border-line bg-white text-ash hover:border-ash'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
