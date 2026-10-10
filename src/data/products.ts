import type { Product } from '../types';

const p = (id: string, title: string, category: string, price: number, image: string, extras: Partial<Product> = {}): Product => ({
  id, slug: id, title, category, price, image, availability: 'in-stock',
  description: `Originalni ${category.toLowerCase()} proizvod iz DABAS asortimana. Detalji su prikazani u demonstracijskom brzom pregledu.`,
  ...extras
});

export const products: Product[] = [
  p('monokuma-nendoroid', 'Danganronpa Monokuma Nendoroid 10cm', 'Kolekcionarske figure', 74.95, 'https://dabas.hr/wp-content/uploads/2026/09/0110185.jpg', { isNew: true, featured: true }),
  p('heisenberg-funko', 'Funko POP Breaking Bad Heisenberg 9cm', 'Funko POP!', 17.95, 'https://dabas.hr/wp-content/uploads/2026/09/0110145.jpg', { isNew: true, featured: true }),
  p('chopper-fluffy', 'One Piece Fluffy Puffy Chopper Netflix figura 14cm', 'Kolekcionarske figure', 37.95, 'https://dabas.hr/wp-content/uploads/2026/10/0110233.jpg', { isNew: true }),
  p('ranma-figure', 'Ranma 1/2 Ranma Saotome figura 14cm', 'Kolekcionarske figure', 44.95, 'https://dabas.hr/wp-content/uploads/2026/10/0110231.jpg', { isNew: true }),
  p('ghody-cat', 'Ghody Behold My Cat Blind Box figura 5cm', 'Blind Box', 8.95, 'https://dabas.hr/wp-content/uploads/2026/10/0110211.jpg', { isNew: true }),
  p('smiski-exercising', 'SMISKI Exercising Series Blind Box (Glows in the Dark) 8cm', 'Blind Box', 14.95, 'https://dabas.hr/wp-content/uploads/2026/09/0110068.jpg', { featured: true }),
  p('sonny-summer', 'Sonny Angel Summer Vacation Series Blind Box 8cm', 'Blind Box', 17.95, 'https://dabas.hr/wp-content/uploads/2026/09/0109951.jpg', { availability: 'sold-out' }),
  p('berserk-14', 'Berserk Deluxe vol. 14', 'Manga', 60, 'https://dabas.hr/wp-content/uploads/2025/01/0301850W.jpg', { featured: true }),
  p('lovesickness', 'Lovesickness: Junji Ito Story Collection', 'Manga', 23, 'https://dabas.hr/wp-content/uploads/2026/02/0303354.jpg'),
  p('vagabond-5', 'Vagabond Definitive Edition vol. 5', 'Manga', 55, 'https://dabas.hr/wp-content/uploads/2026/07/0303961.jpg', { isNew: true }),
  p('hunter-1', 'Hunter x Hunter vol. 1', 'Manga', 12.5, 'https://dabas.hr/wp-content/uploads/2025/02/0301087W.jpg'),
  p('perfect-fit', 'Dragon Shield Standard Perfect Fit Inner Sleeves Clear (100pcs)', 'Pribor za karte', 3.95, 'https://dabas.hr/wp-content/uploads/2026/09/0110012.jpg', { featured: true }),
  p('funko-naruto', 'Funko POP Naruto Ino Yamanaka 9cm', 'Funko POP!', 14.95, 'https://dabas.hr/wp-content/uploads/2025/03/flat750x075f-pad750x1000f8f8f8.jpg'),
  p('funko-pokemon', 'Funko POP Pokemon Blaziken 9cm', 'Funko POP!', 17.95, 'https://dabas.hr/wp-content/uploads/2025/05/funko-pop-figure-hrvatska-dabas.jpeg', { availability: 'low-stock' }),
  p('diego-brando', 'Jojo’s Bizarre Adventure Steel Ball Run Diego Brando figura 25cm', 'Kolekcionarske figure', 79.95, 'https://dabas.hr/wp-content/uploads/2026/10/0110231.jpg', { availability: 'sold-out' })
];

export const newArrivals = products.slice(0, 5);
export const popularProducts = [products[7], products[0], products[11], products[5], products[1], products[8], products[2], products[12], products[3], products[6]];
export const mangaProducts = products.filter((product) => product.category === 'Manga').slice(0, 5);
export const collectibleProducts = products.filter((product) => ['Funko POP!', 'Blind Box'].includes(product.category)).slice(0, 4);
