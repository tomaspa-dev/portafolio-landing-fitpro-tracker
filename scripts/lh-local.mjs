// Auditoría Lighthouse local (Windows-safe): usa la API de lighthouse con
// limpieza tolerante a EPERM. Uso: node scripts/lh-local.mjs
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { writeFileSync, mkdirSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, '.lighthouseci');
mkdirSync(outDir, { recursive: true });

const chromePath =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url = process.argv[2] || 'http://localhost:4323/';

const chrome = await launch({
  chromePath,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2 },
  });

  if (!result || !result.lhr) throw new Error('Lighthouse no devolvió resultado');

  const lhr = result.lhr;
  writeFileSync(join(outDir, 'result.json'), JSON.stringify(lhr, null, 2));

  const cat = (id) => lhr.categories[id].score;
  const audit = (id) => lhr.audits[id]?.displayValue || lhr.audits[id]?.numericValue;

  console.log('URL:', lhr.finalDisplayedUrl || url);
  console.log('Performance:', Math.round(cat('performance') * 100));
  console.log('Accessibility:', Math.round(cat('accessibility') * 100));
  console.log('Best Practices:', Math.round(cat('best-practices') * 100));
  console.log('SEO:', Math.round(cat('seo') * 100));
  console.log('FCP:', audit('first-contentful-paint'));
  console.log('LCP:', audit('largest-contentful-paint'));
  console.log('TBT:', audit('total-blocking-time'));
  console.log('CLS:', audit('cumulative-layout-shift'));
} finally {
  try {
    chrome.kill();
  } catch {
    // EPERM esperado en Windows al borrar el perfil temporal
  }
  for (let i = 0; i < 3; i++) {
    try {
      await rm(chrome.userDataDir, { recursive: true, force: true });
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 1200));
    }
  }
}