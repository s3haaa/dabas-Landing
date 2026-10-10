import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';
import { products } from '../data/products';

export default function ShopResultsPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const [category, setCategory] = useState('Sve');
  const categories = ['Sve', ...Array.from(new Set(products.map((product) => product.category)))];
  const results = useMemo(() => {
    const normalized = query.toLocaleLowerCase('hr').trim();
    return products.filter((product) => (!normalized || `${product.title} ${product.category}`.toLocaleLowerCase('hr').includes(normalized)) && (category === 'Sve' || product.category === category));
  }, [query, category]);
  return <main className="page py-10 sm:py-14"><div className="mb-8"><div className="eyebrow">DEMO KATALOG</div><h1 className="section-title">{query ? `Rezultati za „${query}”` : 'Svi proizvodi'}</h1><p className="mt-2 text-sm text-muted">{results.length} {results.length === 1 ? 'proizvod' : 'proizvoda'} u lokalnom katalogu</p></div>
    <form onSubmit={(e) => { e.preventDefault(); const value = new FormData(e.currentTarget).get('q'); setParams(value ? { q: String(value) } : {}); }} className="mb-6 flex max-w-2xl gap-2"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"/><input name="q" defaultValue={query} className="h-12 w-full rounded-lg border border-line pl-12 pr-4 text-sm outline-none focus:border-brand-700 focus:ring-4 focus:ring-brand-100" placeholder="Pretraži katalog..."/></div><button className="button-primary">Pretraži</button></form>
    <div className="mb-9 flex items-center gap-2 overflow-x-auto pb-2"><SlidersHorizontal className="mr-1 h-4 w-4 shrink-0 text-muted"/>{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? 'bg-brand-700 text-white' : 'border border-line bg-white hover:border-brand-300'}`}>{item}</button>)}</div>
    {results.length ? <ProductGrid products={results}/> : <div className="rounded-2xl bg-soft px-6 py-20 text-center"><h2 className="text-xl font-bold">Nema odgovarajućih proizvoda</h2><p className="mt-2 text-sm text-muted">Pokušaj s kraćim pojmom ili drugom kategorijom.</p></div>}
  </main>;
}
