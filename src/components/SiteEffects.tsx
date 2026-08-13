import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motor global de movimiento (P1):
 * - Lenis smooth scroll sincronizado con GSAP ScrollTrigger
 * - Reveals por scroll ([data-reveal], con grupos [data-reveal-group])
 * - CountUp en cifras ([data-count-to])
 * Todo desactivado con prefers-reduced-motion (el CSS deja todo visible vía .motion-reduce).
 */
export default function SiteEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const lenis = new Lenis({ autoRaf: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);

      const revealGroups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]');
      revealGroups.forEach((group) => {
        const items = group.querySelectorAll('[data-reveal]');
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 80%', once: true },
          },
        );
      });

      const singles = gsap.utils.toArray<HTMLElement>(
        '[data-reveal]:not([data-reveal-group] [data-reveal])',
      );
      singles.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
        const to = parseFloat(el.dataset.countTo || '0');
        const decimals = parseInt(el.dataset.countDecimals || '0', 10);
        const suffix = el.dataset.countSuffix || '';
        const state = { v: 0 };
        gsap.to(state, {
          v: to,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = state.v.toLocaleString('es-ES', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix;
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-hero-cascade]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.8 + i * 0.12 },
        );
      });

      const progress = document.getElementById('scroll-progress');
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
        );
      }

      window.addEventListener('load', () => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, []);

  return null;
}