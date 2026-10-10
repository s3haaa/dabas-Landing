import type { Category } from '../types';
import { assets } from './assets';

export const categories: Category[] = [
  { id: 'figure', title: 'Kolekcionarske figure', eyebrow: 'Ikone na tvojoj polici', image: assets.figures, href: '/kategorija/figure' },
  { id: 'manga', title: 'Mange i manhwe', eyebrow: 'Priče koje ostaju', image: assets.manga, href: '/kategorija/mange' },
  { id: 'tcg', title: 'Trading Card Game', eyebrow: 'Složi svoj deck', image: assets.tcg, href: '/kategorija/tcg' },
  { id: 'funko', title: 'Funko POP!', eyebrow: 'POP kultura', image: assets.funko, href: '/kategorija/funko-pop' },
  { id: 'blind', title: 'Blind Box', eyebrow: 'Otvori iznenađenje', image: 'https://dabas.hr/wp-content/uploads/2026/09/0110068.jpg', href: '/kategorija/blind-box' },
  { id: 'plush', title: 'Plišane igračke', eyebrow: 'Mekani favoriti', image: assets.plush, href: '/kategorija/plisanci' }
];
