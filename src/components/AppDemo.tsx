import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type TabId = 'dashboard' | 'sleep' | 'zones';

interface Metric {
  label: string;
  value: number;
  decimals?: number;
  suffix: string;
  unit?: string;
}

interface TabData {
  id: TabId;
  label: string;
  metrics: Metric[];
  bars: { label: string; width: number }[];
}

const TABS: TabData[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    metrics: [
      { label: 'Pulso', value: 124, suffix: ' bpm' },
      { label: 'Calorías', value: 860, suffix: ' kcal' },
      { label: 'Distancia', value: 9.2, suffix: ' km', decimals: 1 },
    ],
    bars: [
      { label: 'Cardio', width: 95 },
      { label: 'Fuerza', width: 70 },
      { label: 'Movilidad', width: 45 },
    ],
  },
  {
    id: 'sleep',
    label: 'Sueño',
    metrics: [
      { label: 'Score', value: 92, suffix: ' /100' },
      { label: 'Duración', value: 462, suffix: ' min' },
      { label: 'Ciclos REM', value: 5, suffix: '' },
    ],
    bars: [
      { label: 'Profundo', width: 80 },
      { label: 'REM', width: 60 },
      { label: 'Ligero', width: 35 },
    ],
  },
  {
    id: 'zones',
    label: 'Zonas',
    metrics: [
      { label: 'Zona activa', value: 3, suffix: '' },
      { label: 'Máxima', value: 62, suffix: ' %' },
      { label: 'En zona', value: 38, suffix: ' min' },
    ],
    bars: [
      { label: 'Z1 RECUP', width: 20 },
      { label: 'Z3 AERÓB', width: 65 },
      { label: 'Z5 MÁX', width: 90 },
    ],
  },
];

function format(v: number, decimals = 0) {
  return v.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Demo interactiva de la app (P1):
 * Tabs accesibles (ARIA tablist/tab/tabpanel + teclado) y datos que
 * se animan con GSAP al cambiar de pantalla.
 */
export default function AppDemo() {
  const [activeId, setActiveId] = useState<TabId>('dashboard');
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    dashboard: null,
    sleep: null,
    zones: null,
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const active = TABS.find((t) => t.id === activeId)!;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      panel.querySelectorAll<HTMLElement>('[data-count]').forEach((el, i) => {
        const to = parseFloat(el.dataset.count || '0');
        const decimals = parseInt(el.dataset.countDecimals || '0', 10);
        const suffix = el.dataset.countSuffix || '';
        const state = { v: 0 };
        gsap.to(state, {
          v: to,
          duration: 0.9,
          delay: i * 0.08,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(state.v, decimals) + suffix;
          },
        });
      });
      panel.querySelectorAll<HTMLElement>('[data-bar]').forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { width: '12%' },
          {
            width: bar.dataset.bar + '%',
            duration: 0.8,
            delay: 0.25 + i * 0.1,
            ease: 'power2.out',
          },
        );
      });
    });

    return () => ctx.revert();
  }, [activeId]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const nextIndex = e.key === 'ArrowRight' ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
    const next = TABS[nextIndex];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-surface p-4 shadow-[0_30px_60px_rgba(0,0,0,.5)]">
      <div role="tablist" aria-label="Pantallas de la app" className="flex gap-1 pb-3">
        {TABS.map((tab, i) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls="demo-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                selected ? 'bg-accent/15 text-accent' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-2" ref={panelRef} role="tabpanel" id="demo-panel" aria-labelledby={`tab-${active.id}`}>
        <div className="flex h-4 items-end gap-1 rounded-lg bg-bg-dark p-2">
          {active.bars.map((b) => (
            <div
              key={b.label}
              data-bar={b.width}
              className="h-3 w-full rounded-sm bg-accent/50"
              style={{ width: '12%' }}
              aria-hidden="true"
            ></div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {active.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-white/5 bg-bg-dark px-2 py-3 text-center">
              <p
                data-count={m.value}
                data-count-decimals={m.decimals ?? 0}
                data-count-suffix={m.suffix}
                className="font-display text-sm font-bold text-accent"
              >
                {format(m.value, m.decimals) + m.suffix}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}