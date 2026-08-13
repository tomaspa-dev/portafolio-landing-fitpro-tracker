# FitPro Tracker — Landing Page

Landing de producto premium para smartwatch + app de entrenamiento: diseño tech premium (dark mode, acento verde neón), hero 2.5D con GSAP, renders del producto, planes con toggle, testimonios y waitlist con Serverless Function de Netlify.

## Estado: P2 ✅ / P3 ✅

- **P0 — Base:** scaffold Astro, 9 secciones, SEO (canonical, sitemap, JSON-LD SoftwareApplication), waitlist con Netlify Function.
- **P1 — Interactividad:** Lenis smooth scroll + GSAP ScrollTrigger, hero 2.5D (tilt con pointer + parallax scrub + float), reveals en cascada, contadores animados, tabs del demo con métricas animadas, toggle de planes (Mensual/Anual −20 %), FAQ acordeón (exclusivo por defecto), navbar hamburguesa responsive, barra de progreso de scroll.
- **P2 — Contenido real:** render SVG del watch en el hero (correa, caja metálica, UI con anillos KM/pulso/calorías y EKG animado), og-image real 1200×630 (`npm run og-image`), copy final (testimonios individualizados + microcopy CTA).
- **P3 — CI + performance:** Lighthouse CI (GitHub Actions + aserción de categorías ≥0.95) y auditoría local automatizada.

## Lighthouse (mobile, localhost)

| Categoría           | Score |
| ------------------- | ----- |
| Performance         | 96    |
| Accessibility       | 93    |
| Best Practices      | 100   |
| SEO                 | 100   |

| Métrica | Valor   |
| ------- | ------- |
| FCP     | 2.0 s   |
| LCP     | 2.4 s   |
| TBT     | 90 ms   |
| CLS     | 0       |

## Stack

Astro 5 · React 19 · TailwindCSS 3 · GSAP 3 · Lenis · lucide-react · Netlify Functions · Sharp (og-image) · Lighthouse CI

## Comandos

```bash
npm run dev        # dev server
npm run build      # build producción
npm run preview    # vista previa del build
npm run og-image   # regenera public/og-image.png
npm run lh:local   # auditoría Lighthouse (requiere preview en :4323)
npx lhci autorun   # Lighthouse CI completo
```

## Despliegue

- Hosting: Netlify (`netlify.toml`; funciona también con Netlify Functions para el waitlist).
- CI: GitHub Actions (`.github/workflows/lighthouse-ci.yml`) — build + Lighthouse CI con umbrales: categorías ≥0.95 (warn), accesibilidad de enlaces/imagen/lang/viewport obligatoria (error).

## Notas

- El waitlist form llama a `/.netlify/functions/waitlist` — solo funciona desplegado en Netlify (en local muestra error, esperado).
- El hero del producto actualmente usa el render SVG (P2); se sustituirá por renders reales del watch (prompts en `analisis/03-fitpro-tracker-analisis.md` §10).
- GA4 opcional: `PUBLIC_GA_ID` como env var.
- `npx lhci autorun` en Windows puede fallar al limpiar el perfil temporal de Chrome (EPERM); usar `npm run lh:local` contra `astro preview` para métricas locales.

**Decisiones de planificación:** ver `analisis/03-fitpro-tracker-analisis.md` en la raíz del portfolio.