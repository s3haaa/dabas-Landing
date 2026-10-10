export type Availability = 'in-stock' | 'low-stock' | 'sold-out';

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  availability: Availability;
  description: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  href: string;
  eyebrow: string;
}

export interface Banner {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  cta: string;
  href: string;
  image: string;
  tone: 'purple' | 'dark' | 'light';
  size: 'large' | 'small' | 'wide';
}
