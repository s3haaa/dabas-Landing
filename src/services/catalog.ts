import { products } from '../data/products';
import type { Product } from '../types';

export interface CatalogService { search(query: string): Promise<Product[]>; getAll(): Promise<Product[]>; }

export const localCatalogService: CatalogService = {
  async search(query) {
    const normalized = query.trim().toLocaleLowerCase('hr');
    if (!normalized) return [];
    return products.filter((product) => `${product.title} ${product.category}`.toLocaleLowerCase('hr').includes(normalized)).slice(0, 6);
  },
  async getAll() { return products; }
};
