import { ArrowRight, CalendarDays, CreditCard, Headphones, MapPin, PackageCheck, RotateCcw, Send, ShieldCheck, Sparkles, Store, Swords } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { heroBanners, seasonalBanner } from '../../data/banners';
import { categories } from '../../data/categories';
import { collectibleProducts, mangaProducts, newArrivals, popularProducts } from '../../data/products';
import { ProductGrid } from '../../components/product/ProductGrid';
import { PromotionalBanner } from '../../components/promotional/PromotionalBanner';
import { Modal } from '../../components/ui/Modal';

const benefits = [
  { icon: PackageCheck, title: 'Besplatna dostava iznad 70 €', text: 'Za narudžbe unutar Hrvatske' },
  { icon: ShieldCheck, title: 'Sigurno plaćanje', text: 'Više sigurnih načina plaćanja' },
  { icon: RotateCcw, title: 'Povrat unutar 14 dana', text: 'Jednostavan postupak povrata' },
  { icon: Headphones, title: 'Podrška kupcima', text: 'Tu smo kada nas trebaš' }
];

const tcg = [
  ['Pokémon TCG', '#FFF4D6'], ['Yu-Gi-Oh! TCG', '#EEE9FF'], ['One Piece TCG', '#FFE8EA'],
  ['Magic: The Gathering', '#F1ECE7'], ['Riftbound', '#E6F5F2'], ['Pribor za karte', '#E9F1FF']
];

function SectionHeading({ eyebrow, title, subtitle, href }: { eyebrow?: string; title: string; subtitle?: string; href?: string }) {
  return <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2 className="section-title">{title}</h2>{subtitle && <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{subtitle}</p>}</div>{href && <Link className="hidden items-center gap-2 text-sm font-bold text-brand-700 sm:flex" to={href}>Pogledaj sve<ArrowRight className="h-4 w-4" /></Link>}</div>;
}

function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false); const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const data = new FormData(e.currentTarget); const next: Record<string, string> = {}; if (!String(data.get('name') || '').trim()) next.name = 'Unesi naziv proizvoda.'; if (!/^\S+@\S+\.\S+$/.test(String(data.get('email') || ''))) next.email = 'Unesi ispravnu e-mail adresu.'; setErrors(next); if (!Object.keys(next).length) setSubmitted(true); };
  return <Modal open={open} onClose={onClose} title="Zatraži proizvod">{submitted ? <div className="p-8 text-center"><div className="mx-auto mb-4 w-fit rounded-full bg-brand-50 p-4 text-brand-700"><Send /></div><h3 className="text-xl font-bold">Zahtjev je zabilježen u demo prikazu</h3><p className="mt-3 text-sm leading-relaxed text-muted">Ovo je demonstracijski prototip pa poruka nije stvarno poslana. U produkciji će se obrazac povezati sa sustavom podrške.</p><button className="button-primary mt-6" onClick={onClose}>U redu</button></div> : <form className="space-y-4 p-6" onSubmit={submit} noValidate><label className="field"><span>Naziv proizvoda *</span><input name="name" placeholder="Npr. One Piece figura" />{errors.name && <small>{errors.name}</small>}</label><label className="field"><span>Poveznica na proizvod <em>(nije obavezno)</em></span><input name="link" type="url" placeholder="https://" /></label><label className="field"><span>E-mail adresa *</span><input name="email" type="email" placeholder="ime@primjer.hr" />{errors.email && <small>{errors.email}</small>}</label><label className="field"><span>Poruka</span><textarea name="message" rows={4} placeholder="Napiši nam detalje..." /></label><div className="rounded-lg bg-soft p-3 text-xs leading-relaxed text-muted">Demo obrazac — podaci se ne šalju niti spremaju.</div><button className="button-primary w-full">Pošalji demo zahtjev</button></form>}</Modal>;
}

function Newsletter() {
  const [email, setEmail] = useState(''); const [status, setStatus] = useState<'idle'|'error'|'done'>('idle');
  const submit = (e: FormEvent) => { e.preventDefault(); setStatus(/^\S+@\S+\.\S+$/.test(email) ? 'done' : 'error'); };
  return <section className="bg-brand-700"><div className="page grid items-center gap-8 py-12 text-white md:grid-cols-[1fr_1.1fr] md:py-16"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-brand-200">DABAS NEWSLETTER</div><h2 className="mt-2 text-3xl font-extrabold tracking-tight">Nove kolekcije. Bez spama.</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">Prvi saznaj za nove proizvode, povratak favorita i događanja u trgovini.</p></div><form onSubmit={submit}><div className="flex flex-col gap-3 sm:flex-row"><input value={email} onChange={(e) => setEmail(e.target.value)} className="h-13 flex-1 rounded-lg border border-white/30 bg-white px-4 text-sm text-ink outline-none focus:ring-4 focus:ring-white/20" placeholder="Tvoja e-mail adresa" aria-label="E-mail za newsletter"/><button className="h-13 rounded-lg bg-ink px-6 text-sm font-bold text-white hover:bg-black">Pretplati se</button></div><p className={`mt-3 text-xs ${status === 'error' ? 'text-red-200' : 'text-white/65'}`}>{status === 'done' ? 'Demo pretplata je potvrđena — podaci nisu poslani.' : status === 'error' ? 'Unesi ispravnu e-mail adresu.' : 'Pretplatom prihvaćaš obradu podataka prema pravilima privatnosti. Demo obrazac.'}</p></form></div></section>;
}

export default function HomePage() {
  const [requestOpen, setRequestOpen] = useState(false);
  return <main>
    <section className="page py-4 sm:py-6"><div className="grid gap-4 lg:grid-cols-[1.72fr_1fr]"><PromotionalBanner banner={heroBanners[0]} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><PromotionalBanner banner={heroBanners[1]} /><PromotionalBanner banner={heroBanners[2]} /></div></div></section>

    <section className="page py-5"><div className="grid grid-cols-2 gap-y-5 rounded-2xl border border-line bg-white px-4 py-5 md:grid-cols-4 md:px-6">{benefits.map(({ icon: Icon, title, text }, index) => <div key={title} className={`flex items-center gap-3 px-2 md:px-5 ${index ? 'md:border-l md:border-line' : ''}`}><div className="shrink-0 rounded-lg bg-brand-50 p-2.5 text-brand-700"><Icon className="h-5 w-5" /></div><div><h3 className="text-xs font-bold sm:text-sm">{title}</h3><p className="mt-0.5 hidden text-xs text-muted sm:block">{text}</p></div></div>)}</div></section>

    <section className="section page"><SectionHeading eyebrow="KUPUJ PO INTERESU" title="Istraži kategorije" subtitle="Od nove mange do figure koja nedostaje tvojoj polici." /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">{categories.map((category) => <Link key={category.id} to={category.href} className="category-card group"><div className="aspect-[4/5] overflow-hidden bg-soft"><img src={category.image} alt={category.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted">{category.eyebrow}</div><h3 className="mt-1 text-sm font-bold leading-tight sm:text-base">{category.title}</h3></div></Link>)}</div></section>

    <section className="section bg-soft"><div className="page"><SectionHeading eyebrow="SVJEŽE STIGLO" title="Novo u ponudi" subtitle="Najnoviji proizvodi koji su stigli na DABAS." href="/shop?sort=novo"/><ProductGrid products={newArrivals}/><Link className="button-secondary mx-auto mt-8 flex w-fit sm:hidden" to="/shop?sort=novo">Pogledaj sve</Link></div></section>

    <section className="section page"><PromotionalBanner banner={seasonalBanner}/></section>

    <section className="section page"><SectionHeading eyebrow="DABAS ODABIR" title="Popularno na DABAS-u" subtitle="Odabrani proizvodi prikazani kao inspiracija — bez tvrdnje o prodajnom poretku." href="/shop"/><ProductGrid products={popularProducts}/></section>

    <section className="section bg-[#16121B]"><div className="page"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-700/25 px-3 py-1.5 text-xs font-bold text-brand-200"><Swords className="h-4 w-4" /> DABAS TCG ZONA</div><h2 className="max-w-lg text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Spreman za sljedeći duel?</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">Pronađi karte, boostere, deckove i opremu za svoju omiljenu igru.</p><div className="mt-7 flex flex-wrap gap-3"><Link className="button-light" to="/kategorija/tcg">Istraži TCG ponudu</Link><Link className="button-outline-light" to="/tcg-turniri"><CalendarDays className="h-4 w-4" /> TCG turniri</Link></div></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{tcg.map(([name, color]) => <Link key={name} to={`/kategorija/tcg/${name.toLowerCase().replaceAll(' ', '-')}`} className="group rounded-xl p-5 transition hover:-translate-y-1" style={{background: color}}><div className="mb-8 h-8 w-8 rounded-full bg-white/70 p-2 text-brand-700"><Sparkles className="h-4 w-4" /></div><div className="font-bold text-ink">{name}</div><div className="mt-2 flex items-center gap-1 text-xs font-semibold text-muted">Istraži <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></div></Link>)}</div></div></div></section>

    <section className="section page"><SectionHeading eyebrow="PRIČE NA POLICI" title="Mange i manhwe" subtitle="Kultni serijali, nova izdanja i naslovi koji čekaju da ih otkriješ." href="/kategorija/mange"/><ProductGrid products={mangaProducts} manga/></section>

    <section className="section bg-soft"><div className="page grid overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-2"><div className="relative min-h-[360px] lg:min-h-[510px]"><img src={assets.store} alt="DABAS trgovina u Westgate Shopping Centeru" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute bottom-5 left-5 rounded-xl bg-white px-4 py-3 shadow-card"><div className="flex items-center gap-2 text-sm font-bold"><MapPin className="h-4 w-4 text-brand-700"/> Westgate Shopping City</div><div className="mt-1 text-xs text-muted">Zaprešić, Hrvatska</div></div></div><div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16"><div className="eyebrow">DABAS UŽIVO</div><h2 className="section-title mt-2">Posjeti nas u Westgateu</h2><p className="mt-5 text-base leading-relaxed text-muted">DABAS nije samo webshop. Posjeti našu trgovinu u Westgate Shopping Centeru i istraži ponudu uživo.</p><div className="mt-7 flex flex-wrap gap-3"><a className="button-primary" href="https://www.google.com/maps/search/?api=1&query=DABAS+Westgate+Shopping+City" target="_blank" rel="noreferrer"><MapPin className="h-4 w-4"/> Kako do nas?</a><Link className="button-secondary" to="/westgate"><Store className="h-4 w-4"/> Saznaj više</Link></div><p className="mt-5 text-xs text-muted">Za aktualno radno vrijeme provjeri informacije lokacije prije dolaska.</p></div></div></section>

    <section className="section page"><div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div className="relative overflow-hidden rounded-2xl bg-[#F2E7FF] p-8 sm:p-10"><div className="relative z-10"><div className="eyebrow">FUNKO POP! & BLIND BOX</div><h2 className="mt-3 max-w-sm text-4xl font-extrabold tracking-tight">Mala kutija. Veliko iznenađenje.</h2><p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">Pronađi nove kolekcionarske favorite i upotpuni svoju policu.</p><Link className="button-primary mt-7" to="/kategorija/blind-box">Otvori kolekciju</Link></div><img src={assets.funko} alt="Funko POP kolekcija" loading="lazy" className="mt-8 aspect-video w-full rounded-xl object-cover lg:mt-12"/></div><ProductGrid products={collectibleProducts} compact/></div></section>

    <section className="page pb-16 pt-4 sm:pb-24"><div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-white sm:p-12"><div className="absolute -right-12 -top-24 h-72 w-72 rounded-full bg-brand-700/50 blur-3xl"/><div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-brand-200">DABAS POTRAGA</div><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Ne možeš pronaći ono što tražiš?</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">Javi nam se i pomoći ćemo ti pronaći željeni proizvod.</p></div><button className="button-light shrink-0" onClick={() => setRequestOpen(true)}>Zatraži proizvod <ArrowRight className="h-4 w-4"/></button></div></div></section>
    <Newsletter/><RequestModal open={requestOpen} onClose={() => setRequestOpen(false)}/>
  </main>;
}
