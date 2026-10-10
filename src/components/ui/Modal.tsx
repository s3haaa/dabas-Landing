import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

export function Modal({ open, onClose, title, children, className = '' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string }) {
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); document.addEventListener('keydown', close); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', close); document.body.style.overflow = ''; }; }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className={`max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-white shadow-float ${className || 'max-w-xl'}`}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-6 py-4"><h2 className="text-xl font-bold">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Zatvori"><X /></button></div>
      {children}
    </div>
  </div>;
}
