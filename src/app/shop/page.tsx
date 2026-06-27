import type { Metadata } from 'next';
import { ShopView } from '@/components/product/ShopView';
import { PRODUCTS } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop All',
  description: 'Hand-dyed canvas totes and hand-strung beaded jewelry. Made by hand, one at a time.',
};

export default function ShopPage() {
  return (
    <ShopView
      products={PRODUCTS}
      active="all"
      title="Everything"
      blurb="Hand-dyed totes and hand-strung jewelry. Made for water you'll actually get in."
    />
  );
}
