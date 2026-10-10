import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Banner } from '../../types';

export function PromotionalBanner({ banner }: { banner: Banner }) {
  const large = banner.size === 'large'; const wide = banner.size === 'wide';
  return <article className={`group relative isolate overflow-hidden rounded-2xl ${large ? 'min-h-[430px] lg:min-h-[540px]' : wide ? 'min-h-[390px]' : 'min-h-[255px] lg:min-h-[262px]'}`}>
    <img src={banner.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
    <div className={`absolute inset-0 ${banner.tone === 'light' ? 'bg-gradient-to-r from-white/95 via-white/65 to-transparent' : 'bg-gradient-to-r from-ink/90 via-ink/55 to-transparent'}`} />
    <div className={`relative z-10 flex h-full min-h-[inherit] max-w-2xl flex-col justify-end ${large || wide ? 'p-7 sm:p-10 lg:p-14' : 'p-6'}`}>
      {banner.eyebrow && <div className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${banner.tone === 'light' ? 'text-brand-700' : 'text-brand-200'}`}>{banner.eyebrow}</div>}
      <h2 className={`font-extrabold leading-[1.05] tracking-[-0.045em] ${large ? 'max-w-xl text-4xl sm:text-5xl lg:text-6xl' : wide ? 'text-4xl sm:text-5xl' : 'max-w-sm text-2xl'} ${banner.tone === 'light' ? 'text-ink' : 'text-white'}`}>{banner.title}</h2>
      {banner.description && <p className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${banner.tone === 'light' ? 'text-muted' : 'text-white/80'}`}>{banner.description}</p>}
      <Link to={banner.href} className={`mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${banner.tone === 'light' ? 'bg-brand-700 text-white hover:bg-brand-800' : 'bg-white text-ink hover:bg-brand-50'}`}>{banner.cta}<ArrowRight className="h-4 w-4" /></Link>
    </div>
  </article>;
}
