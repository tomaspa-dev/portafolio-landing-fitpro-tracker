import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WORDS = [
  { text: 'Tu', className: '' },
  { text: 'entrenador', className: 'text-gradient-accent' },
  { text: 'en', className: '' },
  { text: 'cada', className: '' },
  { text: 'paso', className: 'text-accent' },
];

/**
 * Título del hero (P1): aparece palabra a palabra (fade + subida + blur).
 * Sin efecto por letra; se salta con reduced-motion.
 */
export default function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.hero-word'),
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.15,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={ref}
      className="mt-4 flex flex-wrap gap-x-3 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
    >
      {WORDS.map((word) => (
        <span key={word.text} className={`hero-word inline-block ${word.className}`}>
          {word.text}
        </span>
      ))}
    </h1>
  );
}