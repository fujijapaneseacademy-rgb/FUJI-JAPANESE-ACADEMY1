import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_ROUTES, UTILITY_NOINDEX_ROUTES, REDIRECTS_MAP } from './routes-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

let errors = [];
let warnings = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`❌ FAIL: ${message}`);
  } else {
    console.log(`✔ PASS: ${message}`);
  }
}

export function validateSeo() {
  console.log('\n========================================');
  console.log('   SEO & SITEMAP AUTOMATED TEST SUITE   ');
  console.log('========================================\n');

  // 1. Validate sitemap.xml exists
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), `sitemap.xml exists in dist/ at ${sitemapPath}`);

  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

  // 2. Validate XML syntax and encoding
  assert(sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'sitemap.xml has UTF-8 XML declaration');
  assert(sitemapXml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml uses official sitemaps.org 0.9 schema');
  assert(sitemapXml.trim().endsWith('</urlset>'), 'sitemap.xml terminates with valid </urlset>');

  // 3. Extract URLs and check for duplicates & formats
  const locMatches = [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(m => m[1].trim());
  assert(locMatches.length > 0, `sitemap.xml contains at least 1 URL (found ${locMatches.length})`);
  assert(locMatches.length === INDEXABLE_ROUTES.length, `sitemap.xml URL count (${locMatches.length}) matches expected indexable routes (${INDEXABLE_ROUTES.length})`);

  const uniqueLocs = new Set(locMatches);
  assert(uniqueLocs.size === locMatches.length, `No duplicate URLs found in sitemap.xml (${uniqueLocs.size} unique / ${locMatches.length} total)`);

  // 4. Verify no redirected or noindex routes in sitemap
  for (const redir of REDIRECTS_MAP) {
    const fullUrl = `https://fujijapaneseacademy.com${redir.from}`;
    assert(!uniqueLocs.has(fullUrl), `Redirect route ${redir.from} is NOT in sitemap.xml`);
  }

  for (const utility of UTILITY_NOINDEX_ROUTES) {
    assert(!uniqueLocs.has(utility.canonical), `Utility/Noindex route ${utility.path} is NOT in sitemap.xml`);
  }

  // 5. Inspect every sitemap URL's static HTML file
  const seenTitles = new Set();
  const seenDescriptions = new Set();

  for (const url of locMatches) {
    assert(url.startsWith('https://fujijapaneseacademy.com'), `URL ${url} is absolute HTTPS`);
    assert(!url.includes('?'), `URL ${url} contains no query parameters`);
    assert(!url.includes('#'), `URL ${url} contains no fragments`);

    // Verify trailing slash consistency: only homepage has trailing slash
    if (url === 'https://fujijapaneseacademy.com/') {
      assert(url.endsWith('/'), 'Homepage canonical correctly ends with trailing slash');
    } else {
      assert(!url.endsWith('/'), `Deep route ${url} has no trailing slash`);
    }

    // Resolve file on disk
    let relativePath = url.replace('https://fujijapaneseacademy.com', '');
    let filePath;
    if (relativePath === '' || relativePath === '/') {
      filePath = path.join(distDir, 'index.html');
    } else {
      filePath = path.join(distDir, `${relativePath.replace(/^\//, '')}.html`);
    }

    assert(fs.existsSync(filePath), `Static HTML file exists for ${url} at ${filePath.replace(distDir, '')}`);

    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, 'utf8');

      // Canonical tags count
      const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([\s\S]*?)"\s*\/?>/gi)];
      assert(canonicalMatches.length === 1, `${url} has EXACTLY ONE canonical tag (found ${canonicalMatches.length})`);

      if (canonicalMatches.length === 1) {
        assert(canonicalMatches[0][1] === url, `${url} canonical is self-referencing (found: ${canonicalMatches[0][1]})`);
      }

      // Title tag
      const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      assert(!!titleMatch && titleMatch[1].trim().length > 10, `${url} has non-empty <title>`);
      if (titleMatch) {
        const titleText = titleMatch[1].trim();
        seenTitles.add(titleText);
      }

      // Meta Description
      const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i);
      assert(!!descMatch && descMatch[1].trim().length > 20, `${url} has non-empty meta description`);
      if (descMatch) {
        seenDescriptions.add(descMatch[1].trim());
      }

      // Robots tag must NOT have noindex
      const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([\s\S]*?)"\s*\/?>/i);
      if (robotsMatch) {
        assert(!robotsMatch[1].toLowerCase().includes('noindex'), `${url} is NOT marked noindex`);
      }

      // Meaningful pre-rendered content inside root
      assert(html.includes('<div id="root">') && !html.includes('<div id="root"></div>'), `${url} has pre-rendered content in #root`);
      assert(html.includes('<h1') && html.includes('<a href='), `${url} contains pre-rendered <h1> and crawlable <a> links`);
      const bodySection = html.slice(html.indexOf('<div id="root">'));
      assert(bodySection.length > 500, `${url} has rich pre-rendered HTML body (> 500 chars)`);
    }
  }

  // 6. Check uniqueness of titles across indexable routes
  assert(seenTitles.size >= locMatches.length - 2, `Titles are unique across routes (${seenTitles.size} unique for ${locMatches.length} pages)`);
  assert(seenDescriptions.size >= locMatches.length - 2, `Meta descriptions are unique across routes (${seenDescriptions.size} unique for ${locMatches.length} pages)`);

  // 7. Check robots.txt
  const robotsPath = path.join(distDir, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'robots.txt exists in dist/');
  const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
  assert(robotsTxt.includes('Sitemap: https://fujijapaneseacademy.com/sitemap.xml'), 'robots.txt contains authoritative sitemap URL');
  assert(!robotsTxt.includes('sitemap-academy.xml'), 'robots.txt does NOT reference old sitemap-academy.xml');
  assert(!robotsTxt.includes('Disallow: /courses'), 'robots.txt does not block /courses');
  assert(!robotsTxt.includes('Disallow: /assets'), 'robots.txt does not block CSS/JS assets');

  // 8. Check 404.html
  const notFoundPath = path.join(distDir, '404.html');
  assert(fs.existsSync(notFoundPath), '404.html exists in dist/');
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
  assert(notFoundHtml.includes('noindex'), '404.html contains noindex');

  // 9. Check utility pages have noindex
  for (const utility of UTILITY_NOINDEX_ROUTES) {
    const uPath = path.join(distDir, utility.path.replace(/^\//, ''), 'index.html');
    if (fs.existsSync(uPath)) {
      const uHtml = fs.readFileSync(uPath, 'utf8');
      assert(uHtml.includes('noindex'), `Utility page ${utility.path} has noindex directive`);
    }
  }

  // 10. Summary
  console.log('\n========================================');
  if (errors.length === 0) {
    console.log(`🎉 ALL TESTS PASSED! (${locMatches.length} pages validated, 0 errors)`);
    console.log('========================================\n');
    return true;
  } else {
    console.error(`💥 VALIDATION FAILED with ${errors.length} error(s)!`);
    console.log('========================================\n');
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateSeo();
}
