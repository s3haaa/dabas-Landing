import type { Banner } from '../types';
import { assets } from './assets';

export const heroBanners: Banner[] = [
  { id: 'main', eyebrow: 'NOVI DABAS DOŽIVLJAJ', title: 'Tvoj anime svijet počinje ovdje.', description: 'Figure, mange, TCG i kolekcionarski proizvodi na jednom mjestu.', cta: 'Istraži ponudu', href: '/shop', image: assets.hero, tone: 'purple', size: 'large' },
  { id: 'tcg', eyebrow: 'TCG ZONA', title: 'Sve za tvoj sljedeći TCG duel', cta: 'Složi svoj deck', href: '/kategorija/tcg', image: assets.tcg, tone: 'dark', size: 'small' },
  { id: 'funko', eyebrow: 'KOLEKCIJA', title: 'Otkrij Funko POP! kolekciju', cta: 'Pogledaj kolekciju', href: '/kategorija/funko-pop', image: assets.funko, tone: 'light', size: 'small' }
];

export const seasonalBanner: Banner = { id: 'seasonal', eyebrow: 'ODABRANO ZA KOLEKCIONARE', title: 'Likovi koje voliš. Kolekcije koje ostaju.', description: 'Otkrij odabrane figure, posebna izdanja i nove kolekcionarske favorite.', cta: 'Istraži kolekciju', href: '/kolekcije', image: assets.ghibli, tone: 'dark', size: 'wide' };
