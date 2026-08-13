import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const PRICES: Record<'monthly' | 'annual', { pro: number; premium: number }> = {
  monthly: { pro: 9.99, premium: 19.99 },
  annual: { pro: 7.99, premium: 15.99 },
};

function write(id: string, value: number) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

/**
 * Toggle Mensual/Anual (−20%) animado (P1):
 * Rol switch accesible + los precios de Pro/Premium cuentan con GSAP al cambiar.
 * El badge de ahorro tiene espacio reservado (no mueve el layout).
 */
export default function PricingToggle() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const switchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const { pro, premium } = PRICES[billing];
      write('plan-pro-price', pro);
      write('plan-premium-price', premium);
      const hint = document.getElementById('plan-billing-hint');
      if (hint) hint.textContent = billing === 'annual' ? 'facturado anualmente' : 'facturado mensualmente';
      return;
    }

    const isAnnual = billing === 'annual';
    const { pro, premium } = PRICES[billing];
    const ids: [string, number][] = [
      ['plan-pro-price', pro],
      ['plan-premium-price', premium],
    ];

    const ctx = gsap.context(() => {
      ids.forEach(([id, target], i) => {
        const state = {
          v: parseFloat(document.getElementById(id)?.textContent?.replace(',', '.') || '0'),
        };
        gsap.to(state, {
          v: target,
          duration: 0.5,
          delay: i * 0.06,
          ease: 'power2.out',
          onUpdate: () => write(id, state.v),
        });
      });
      const hint = document.getElementById('plan-billing-hint');
      if (hint) {
        hint.textContent = isAnnual ? 'facturado anualmente' : 'facturado mensualmente';
      }
    });

    return () => ctx.revert();
  }, [billing]);

  function toggle() {
    setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-semibold transition-colors ${billing === 'monthly' ? 'text-white' : 'text-slate-400'}`}>Mensual</span>
      <button
        ref={switchRef}
        type="button"
        role="switch"
        aria-checked={billing === 'annual'}
        aria-label="Cambiar a facturación anual con 20 % de descuento"
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={`relative h-8 w-14 shrink-0 rounded-full border transition-colors ${
          billing === 'annual' ? 'border-accent/60 bg-accent/25' : 'border-white/10 bg-surface'
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-accent transition-all duration-300 ${
            billing === 'annual' ? 'left-7' : 'left-1'
          }`}
        ></span>
      </button>
      <span className={`text-sm font-semibold transition-colors ${billing === 'annual' ? 'text-white' : 'text-slate-400'}`}>Anual</span>
      <span
        className={`inline-flex w-28 items-center justify-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent transition-opacity duration-300 ${
          billing === 'annual' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Check className="h-3 w-3" aria-hidden="true" />
        Ahorra 20 %
      </span>
    </div>
  );
}