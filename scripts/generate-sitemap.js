import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_ROUTES } from './routes-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function generateSitemapXml() {
  const urlsXml = INDEXABLE_ROUTES.map(route => {
    return `  <url>
    <loc>${route.canonical}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
}

export function writeSitemaps() {
  const xml = generateSitemapXml();
  const publicDir = path.join(rootDir, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Authoritative sitemap.xml
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`[Sitemap] Generated ${INDEXABLE_ROUTES.length} URLs in ${sitemapPath}`);

  // 2. Clean up legacy duplicate sitemap-academy.xml (handled via 301 redirect to /sitemap.xml)
  const legacySitemapPath = path.join(publicDir, 'sitemap-academy.xml');
  if (fs.existsSync(legacySitemapPath)) {
    fs.unlinkSync(legacySitemapPath);
    console.log(`[Sitemap] Removed duplicate ${legacySitemapPath} (301 redirected to /sitemap.xml)`);
  }

  // 3. Update robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard
Disallow: /reset-password

Sitemap: https://fujijapaneseacademy.com/sitemap.xml
`;
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log(`[Robots] Updated authoritative declaration in ${robotsPath}`);
}

// Run directly if invoked from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeSitemaps();
}
