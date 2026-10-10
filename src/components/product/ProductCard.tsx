import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import type { Product } from '../../types';

export const money = (value: number) => new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(value);

export function ProductCard({ product, manga = false }: { product: Product; manga?: boolean }) {
  const { wishlist, toggleWishlist, addToCart, setQuickView } = useShop(); const liked = wishlist.includes(product.id); const sold = product.availability === 'sold-out';
  return <article className="product-card group">
    <div className="relative aspect-[4/4.7] overflow-hidden rounded-xl bg-soft">
      <img src={product.image} alt={product.title} loading="lazy" className={`h-full w-full p-4 transition duration-500 group-hover:scale-[1.04] ${manga ? 'object-contain' : 'object-contain'}`} />
      <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">{product.isNew && <span className="badge bg-ink text-white">Novo</span>}{product.originalPrice && <span className="badge bg-red-600 text-white">Akcija</span>}</div>
      <button onClick={() => toggleWishlist(product.id)} className={`absolute right-2.5 top-2.5 rounded-full border border-line bg-white p-2 shadow-sm transition ${liked ? 'text-brand-700' : 'text-muted hover:text-brand-700'}`} aria-label={liked ? 'Ukloni iz liste želja' : 'Dodaj u listu želja'}><Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} /></button>
      <button onClick={() => setQuickView(product)} className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-bold shadow-card transition sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus:translate-y-0 sm:focus:opacity-100"><Eye className="h-4 w-4" />Brzi pregled</button>
    </div>
    <div className="flex flex-1 flex-col pt-4"><div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">{product.category}</div><h3 className="mt-1.5 line-clamp-2 min-h-11 text-sm font-semibold leading-snug text-ink">{product.title}</h3><div className={`mt-2 text-xs font-medium ${sold ? 'text-muted' : product.availability === 'low-stock' ? 'text-amber-700' : 'text-emerald-700'}`}>{sold ? 'Trenutno nedostupno' : product.availability === 'low-stock' ? 'Ograničena dostupnost' : 'Dostupno za narudžbu'}</div>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3"><div><span className="text-base font-extrabold">{money(product.price)}</span>{product.originalPrice && <span className="ml-2 text-xs text-muted line-through">{money(product.originalPrice)}</span>}</div><button onClick={() => !sold && addToCart(product)} disabled={sold} className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-700 text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-gray-300" aria-label={`Dodaj ${product.title} u košaricu`}><ShoppingBag className="h-4.5 w-4.5" /></button></div>
    </div>
  </article>;
}
