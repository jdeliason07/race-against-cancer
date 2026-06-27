import Link from 'next/link';
import Image from 'next/image';
import { Product, formatPrice } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-card bg-seaglass ring-1 ring-line">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className="absolute left-3 top-3 rounded-pill px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink"
            style={{ backgroundColor: product.hue }}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-tight text-ink group-hover:text-deep-tide">
            {product.name}
          </h3>
          <p className="mt-0.5 text-sm text-ash">{product.blurb}</p>
        </div>
        <span className="pricetag shrink-0">{formatPrice(product.priceCents)}</span>
      </div>
    </Link>
  );
}
