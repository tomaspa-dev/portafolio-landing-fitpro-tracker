import { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#features', label: 'Funciones' },
  { href: '#demo', label: 'Demo' },
  { href: '#plans', label: 'Planes' },
  { href: '#faq', label: 'FAQ' },
];

/**
 * Navbar responsive (P1): enlaces + CTA en desktop, menú hamburguesa en móvil
 * (panel desplegable, cierra al navegar, aria-expanded).
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
      <nav className="container-md flex h-16 items-center justify-between" aria-label="Principal">
        <a href="#top" className="flex items-center gap-2" aria-label="FitPro Tracker — inicio" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            FitPro<span className="text-accent">Tracker</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#plans" className="btn-accent hidden !px-4 !py-2 md:inline-flex">
            Empieza gratis
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:text-accent md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-white/5 bg-bg-dark/95 backdrop-blur-md md:hidden">
          <ul className="container-md space-y-1 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#plans" onClick={() => setOpen(false)} className="btn-accent w-full">
                Empieza gratis
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}