import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import { localCatalogService } from '../../services/catalog';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Logo } from '../ui/Logo';

const money = (value: number) => new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(value);

function SearchBox({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [query, setQuery] = useState(''); const [results, setResults] = useState<Product[]>([]); const [open, setOpen] = useState(false);
  const navigate = useNavigate(); const root = useRef<HTMLDivElement>(null);
  useEffect(() => { localCatalogService.search(query).then(setResults); setOpen(Boolean(query.trim())); }, [query]);
  useEffect(() => { const close = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false); document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, []);
  const submit = () => { if (!query.trim()) return; navigate(`/shop?q=${encodeURIComponent(query.trim())}`); setOpen(false); onNavigate?.(); };
  return <div ref={root} className={`relative ${mobile ? 'w-full' : 'hidden min-w-0 flex-1 lg:block'}`}>
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => query && setOpen(true)} className="h-12 w-full rounded-xl border border-line bg-soft pl-12 pr-20 text-sm outline-none transition focus:border-brand-700 focus:bg-white focus:ring-4 focus:ring-brand-100" placeholder="Pretraži proizvode, mange, figure..." aria-label="Pretraži proizvode" />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-brand-700 px-3 py-2 text-xs font-bold text-white">Traži</button>
    </form>
    {open && <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-line bg-white shadow-float">
      <div className="border-b border-line px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">Rezultati pretrage</div>
      {results.length ? results.map((product) => <button key={product.id} onClick={() => { navigate(`/proizvod/${product.slug}`); setOpen(false); onNavigate?.(); }} className="flex w-full items-center gap-3 border-b border-line/70 px-4 py-3 text-left last:border-0 hover:bg-soft">
        <img src={product.image} alt="" className="h-14 w-14 rounded-lg bg-soft object-contain p-1" /><span className="min-w-0 flex-1"><span className="line-clamp-2 text-sm font-semibold">{product.title}</span><span className="mt-1 block text-xs text-muted">{product.category}</span></span><span className="text-sm font-bold">{money(product.price)}</span>
      </button>) : <div className="px-4 py-8 text-center text-sm text-muted">Nema rezultata za „{query}”.</div>}
    </div>}
  </div>;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false); const { wishlist, cartCount, cartTotal, setCartOpen, setWishlistOpen } = useShop();
  return <>
    <div className="bg-brand-700 px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">Besplatna dostava za narudžbe iznad 70 € unutar Hrvatske</div>
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="page flex h-[72px] items-center gap-4 lg:gap-8">
        <button className="icon-button lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Otvori izbornik"><Menu /></button>
        <Logo /><SearchBox />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link to="/racun" className="header-action hidden md:flex"><UserRound /><span>Račun</span></Link>
          <button onClick={() => setWishlistOpen(true)} className="header-action relative"><Heart /><span className="hidden xl:inline">Želje</span>{wishlist.length > 0 && <span className="counter">{wishlist.length}</span>}</button>
          <button onClick={() => setCartOpen(true)} className="header-action relative"><ShoppingBag /><span className="hidden xl:inline">{money(cartTotal)}</span>{cartCount > 0 && <span className="counter">{cartCount}</span>}</button>
        </div>
      </div>
      <nav className="hidden border-t border-line lg:block" aria-label="Glavna navigacija">
        <div className="page flex h-12 items-center gap-6">
          {navigation.map((item) => <div className="group relative h-full" key={item.label}><Link to={item.href} className="flex h-full items-center gap-1 text-sm font-semibold hover:text-brand-700">{item.label}{item.children && <ChevronDown className="h-3.5 w-3.5" />}</Link>
            {item.children && <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-xl border border-line bg-white p-2 opacity-0 shadow-float transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{item.children.map((child) => <Link className="block rounded-lg px-3 py-2.5 text-sm hover:bg-soft hover:text-brand-700" to={`${item.href}/${child.toLowerCase().replaceAll(' ', '-')}`} key={child}>{child}</Link>)}</div>}
          </div>)}
          <Link to="/akcije" className="ml-auto rounded-full bg-red-50 px-3 py-1.5 text-sm font-bold text-red-600">Akcije</Link>
        </div>
      </nav>
    </header>
    <div className="border-b border-line bg-white px-4 py-3 lg:hidden"><SearchBox mobile /></div>
    {mobileOpen && <div className="fixed inset-0 z-[80] bg-ink/40" onMouseDown={(e) => e.target === e.currentTarget && setMobileOpen(false)}><div className="h-full w-[min(88vw,380px)] overflow-y-auto bg-white p-5 shadow-float"><div className="mb-5 flex items-center justify-between"><Logo /><button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Zatvori izbornik"><X /></button></div><SearchBox mobile onNavigate={() => setMobileOpen(false)} /><nav className="mt-5 divide-y divide-line">{navigation.map((item) => <div key={item.label}><Link onClick={() => setMobileOpen(false)} to={item.href} className="flex min-h-12 items-center justify-between py-3 font-semibold">{item.label}<ChevronDown className="h-4 w-4 text-muted" /></Link>{item.children && <div className="mb-3 grid grid-cols-2 gap-1">{item.children.map((child) => <Link onClick={() => setMobileOpen(false)} to={item.href} className="rounded-lg bg-soft px-3 py-2 text-xs text-muted" key={child}>{child}</Link>)}</div>}</div>)}</nav></div></div>}
  </>;
}
