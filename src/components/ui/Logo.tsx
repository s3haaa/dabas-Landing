import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';

export function Logo({ light = false }: { light?: boolean }) {
  return <Link to="/" className="inline-flex items-center gap-2.5 focus-ring" aria-label="DABAS početna">
    <img src={assets.logoMark} alt="" className="h-10 w-10 rounded-full object-cover" />
    <span className={`text-2xl font-extrabold tracking-[-0.05em] ${light ? 'text-white' : 'text-ink'}`}>dabas<span className="text-brand-700">.</span></span>
  </Link>;
}
