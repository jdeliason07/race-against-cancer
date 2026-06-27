'use client';

import { useState } from 'react';
import { Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { Product } from '@/data/products';

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState(product.variant?.options[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        priceCents: product.priceCents,
        image: product.images[0],
        variant,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-6">
      {product.variant && (
        <div>
          <p className="label mb-2">{product.variant.name}</p>
          <div className="flex flex-wrap gap-2">
            {product.variant.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setVariant(opt)}
                className={`rounded-pill border px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                  variant === opt
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line bg-white text-ash hover:border-ash'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-4 rounded-pill border border-line px-3 py-2.5">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="text-ash hover:text-ink">
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-mono text-sm">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="text-ash hover:text-ink">
            <Plus size={16} />
          </button>
        </div>
        <button onClick={handleAdd} className="btn-primary flex-1">
          {added ? (
            <>
              <Check size={18} /> Added
            </>
          ) : (
            'Add to bag'
          )}
        </button>
      </div>
    </div>
  );
}
