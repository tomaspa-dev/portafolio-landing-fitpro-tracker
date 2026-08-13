import { useEffect, useRef } from 'react';
import { Activity, BatteryFull, Satellite } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero 2.5D del producto (P1):
 * - Tilt con el mouse (solo pointer fino): rotateX/rotateY siguen al cursor
 * - Parallax scrub al hacer scroll (giro rotateY + desplazamiento)
 * - Flotación, línea EKG animada y chips orbitantes
 * Desactivado con prefers-reduced-motion (se queda estático).
 */
export default function HeroProduct() {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ekgRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    const core = coreRef.current;
    const ekg = ekgRef.current;
    if (!root || !inner || !core || !ekg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(core, { y: -14, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      gsap.fromTo(
        inner,
        { rotateY: -12, y: 40 },
        { rotateY: 12, y: -40, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } },
      );

      gsap.fromTo(
        ekg,
        { strokeDashoffset: 220 },
        { strokeDashoffset: 0, duration: 3.2, ease: 'none', repeat: -1 },
      );

      const quickRotateX = gsap.quickTo(inner, 'rotationX', { duration: 0.6, ease: 'power2.out' });
      const quickRotateY = gsap.quickTo(inner, 'rotationY', { duration: 0.6, ease: 'power2.out' });

      if (window.matchMedia('(pointer: fine)').matches) {
        root.addEventListener('mousemove', (e) => {
          const rect = root.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotateY(ny * -16);
          quickRotateX(nx * 16);
        });
        root.addEventListener('mouseleave', () => {
          quickRotateX(0);
          quickRotateY(0);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto flex items-center justify-center py-8" id="hero-product">
      <div
        className="absolute h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow motion-reduce:animate-none"
        aria-hidden="true"
      ></div>
      <div
        className="absolute h-[30rem] w-[30rem] rounded-full border border-dashed border-accent/25 animate-spin [animation-duration:40s] motion-reduce:animate-none"
        aria-hidden="true"
      ></div>
      <div ref={innerRef} className="relative" style={{ perspective: '1100px' }}>
        <div ref={coreRef} className="relative">
          <svg
            viewBox="0 0 300 520"
            className="h-[24rem] w-auto drop-shadow-[0_40px_80px_rgba(0,0,0,.6)] sm:h-[28rem]"
            role="img"
            aria-label="Reloj FitPro Sense mostrando entrenamiento en curso"
          >
            <defs>
              <linearGradient id="caseGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2A3A4F" />
                <stop offset="50%" stopColor="#141C28" />
                <stop offset="100%" stopColor="#0E1420" />
              </linearGradient>
              <linearGradient id="strapGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1C2735" />
                <stop offset="50%" stopColor="#263448" />
                <stop offset="100%" stopColor="#1C2735" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B111B" />
                <stop offset="100%" stopColor="#0A0E14" />
              </linearGradient>
            </defs>
            <rect x="116" y="0" width="68" height="110" rx="20" fill="url(#strapGrad)" />
            <rect x="116" y="0" width="68" height="110" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.05" />
            <rect x="116" y="410" width="68" height="110" rx="20" fill="url(#strapGrad)" />
            <rect x="116" y="410" width="68" height="110" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.05" />
            <rect x="70" y="100" width="160" height="320" rx="44" fill="url(#caseGrad)" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="2" />
            <rect x="230" y="238" width="12" height="46" rx="6" fill="#2A3A4F" stroke="#FFFFFF" strokeOpacity="0.1" />
            <rect x="80" y="110" width="140" height="300" rx="36" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
            <rect x="88" y="118" width="124" height="284" rx="30" fill="url(#screenGrad)" />
            <rect x="88" y="118" width="124" height="284" rx="30" fill="none" stroke="#4ADE80" strokeOpacity="0.25" />
            <text x="150" y="152" textAnchor="middle" fontFamily="Space Grotesk, Inter, sans-serif" fontSize="26" fontWeight="700" fill="#FFFFFF">
              08:30
            </text>
            <text x="150" y="170" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="3" fill="#4ADE80" fontWeight="600">
              LUN · 12 AGO
            </text>
            <circle cx="150" cy="240" r="52" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="10" />
            <circle cx="150" cy="240" r="52" fill="none" stroke="#4ADE80" strokeWidth="10" strokeDasharray="272 55" strokeLinecap="round" transform="rotate(-90 150 240)" />
            <circle cx="150" cy="240" r="36" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="8" />
            <circle cx="150" cy="240" r="36" fill="none" stroke="#A3E635" strokeWidth="8" strokeDasharray="176 60" strokeLinecap="round" transform="rotate(-90 150 240)" />
            <text x="150" y="236" textAnchor="middle" fontFamily="Space Grotesk, Inter, sans-serif" fontSize="22" fontWeight="700" fill="#FFFFFF">
              7,6
            </text>
            <text x="150" y="252" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="2" fill="#94A3B8">
              KM HOY
            </text>
            <text x="98" y="338" fontFamily="Inter, sans-serif" fontSize="9" fill="#94A3B8">
              PULSO
            </text>
            <text x="98" y="356" fontFamily="Space Grotesk, Inter, sans-serif" fontSize="18" fontWeight="700" fill="#FFFFFF">
              124
            </text>
            <text x="128" y="356" fontFamily="Inter, sans-serif" fontSize="8" fill="#4ADE80">
              BPM
            </text>
            <text x="186" y="338" fontFamily="Inter, sans-serif" fontSize="9" fill="#94A3B8">
              KCAL
            </text>
            <text x="186" y="356" fontFamily="Space Grotesk, Inter, sans-serif" fontSize="18" fontWeight="700" fill="#FFFFFF">
              860
            </text>
            <polyline
              ref={ekgRef}
              points="98,392 110,392 118,392 122,384 128,400 134,392 144,392 150,392 154,387 160,397 166,392 178,392 182,392 186,388 190,396 194,392 202,392"
              fill="none"
              stroke="#4ADE80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="220"
              strokeDashoffset="220"
            />
          </svg>
        </div>
      </div>

      <div className="absolute -left-6 top-6 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/90 px-3 py-2 backdrop-blur sm:flex animate-float motion-reduce:animate-none" style={{ animationDelay: '0.8s' }}>
        <BatteryFull className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="text-xs font-semibold text-white">14 días</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500">batería</span>
      </div>
      <div className="absolute -right-8 bottom-10 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/90 px-3 py-2 backdrop-blur sm:flex animate-float motion-reduce:animate-none" style={{ animationDelay: '1.6s' }}>
        <Satellite className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="text-xs font-semibold text-white">GPS</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500">outdoor</span>
      </div>
      <div className="absolute -bottom-2 left-4 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/90 px-3 py-2 backdrop-blur sm:flex animate-float motion-reduce:animate-none" style={{ animationDelay: '2.4s' }}>
        <Activity className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="text-xs font-semibold text-white">+100</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500">entrenos</span>
      </div>
    </div>
  );
}