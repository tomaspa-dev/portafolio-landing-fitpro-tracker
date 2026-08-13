// Genera public/og-image.png (1200x630) — og-image real del portfolio.
// Uso: node scripts/og-image.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0A0E14" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="green" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="100%" stop-color="#A3E635"/>
    </linearGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#94A3B8" stroke-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0A0E14"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="60" y="60" width="1080" height="510" rx="28" fill="none" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <circle cx="980" cy="240" r="150" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="18"/>
  <circle cx="980" cy="240" r="150" fill="none" stroke="#4ADE80" stroke-opacity="0.85" stroke-width="18" stroke-dasharray="700 240" stroke-linecap="round" transform="rotate(-90 980 240)"/>
  <circle cx="980" cy="240" r="100" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="14"/>
  <circle cx="980" cy="240" r="100" fill="none" stroke="#A3E635" stroke-opacity="0.85" stroke-width="14" stroke-dasharray="470 160" stroke-linecap="round" transform="rotate(-90 980 240)"/>
  <circle cx="980" cy="240" r="70" fill="#0F1622"/>
  <circle cx="980" cy="240" r="70" fill="none" stroke="#4ADE80" stroke-opacity="0.35"/>
  <text x="980" y="248" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF">124</text>
  <text x="980" y="278" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="6" fill="#4ADE80" font-weight="bold">BPM</text>
  <text x="980" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" letter-spacing="4" fill="#94A3B8">FITNESS · SMARTWATCH · 2026</text>
  <text x="90" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#FFFFFF">FitPro</text>
  <text x="90" y="330" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="url(#green)">Tracker</text>
  <text x="90" y="395" font-family="Arial, sans-serif" font-size="30" fill="#E2E8F0">Tu entrenador en cada paso</text>
  <text x="90" y="460" font-family="Arial, sans-serif" font-size="18" fill="#94A3B8">Sueño · Ritmo cardiaco · +100 entrenamientos · 14 días de batería</text>
  <rect x="90" y="505" width="300" height="46" rx="23" fill="#4ADE80"/>
  <text x="240" y="535" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" font-weight="bold" fill="#0A0E14">EMPIEZA GRATIS</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, 'public', 'og-image.png'));
console.log('og-image.png generado en public/');