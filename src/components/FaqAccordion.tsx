import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ en acordeón exclusivo (P1): solo una pregunta abierta a la vez,
 * con animación de altura vía CSS grid-template-rows.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className="mt-12 space-y-3">
      {items.map((f, i) => {
        const open = openId === i;
        return (
          <div key={i} className={`card group transition-colors ${open ? 'border-accent/40' : ''}`}>
            <h3>
              <button
                type="button"
                id={`faq-${i}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenId(open ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left font-medium text-white"
              >
                {f.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-4 text-sm leading-relaxed text-slate-300">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}