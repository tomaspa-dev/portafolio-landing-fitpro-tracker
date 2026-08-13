import { useEffect, useRef } from 'react';
import { Activity, BatteryFull, Satellite } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroWatch from '../assets/hero-watch.webp';
import heroWatchMobile from '../assets/hero-watch-mobile.webp';
import heroWatchPng from '../assets/hero-watch.png';
import heroWatchMobilePng from '../assets/hero-watch-mobile.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero 2.5D del producto (P1):
 * - Tilt con el mouse (solo pointer fino): rotateX/rotateY siguen al cursor
 * - Parallax scrub al hacer scroll (giro rotateY + desplazamiento)
 * - Flotación y chips orbitantes
 * Desactivado con prefers-reduced-motion (se queda estático).
 */
export default function HeroProduct() {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    const core = coreRef.current;
    if (!root || !inner || !core) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(core, { y: -14, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      gsap.fromTo(
        inner,
        { rotateY: -12, y: 40 },
        { rotateY: 12, y: -40, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } },
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
          <picture className="hidden sm:block">
            <source srcSet={heroWatch.src} type="image/webp" />
            <img
              src={heroWatchPng.src}
              alt="Reloj FitPro Sense mostrando entrenamiento en curso"
              className="w-[32rem] max-w-full drop-shadow-[0_40px_80px_rgba(0,0,0,.6)]"
              draggable={false}
            />
          </picture>
          <picture className="sm:hidden">
            <source srcSet={heroWatchMobile.src} type="image/webp" />
            <img
              src={heroWatchMobilePng.src}
              alt="Reloj FitPro Sense mostrando entrenamiento en curso"
              className="h-[24rem] w-auto max-w-full drop-shadow-[0_40px_80px_rgba(0,0,0,.6)]"
              draggable={false}
            />
          </picture>
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