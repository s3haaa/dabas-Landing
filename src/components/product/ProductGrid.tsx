import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, manga = false, compact = false }: { products: Product[]; manga?: boolean; compact?: boolean }) {
  return <div className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-5 ${compact ? 'xl:grid-cols-4' : ''}`}>{products.map((product) => <ProductCard key={product.id} product={product} manga={manga} />)}</div>;
}
