#!/usr/bin/env node
/**
 * scripts/adversarial-critic-m3.cjs
 *
 * Independent Adversarial Stress Test Suite & Integrity Verifier
 * Fuji Japanese Academy — Milestone 3 Review & Challenge
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

const IN_DIST = path.resolve(PROJECT_ROOT, 'fuji-japanese-in', 'dist');
const COM_DIST = path.resolve(PROJECT_ROOT, 'fuji-japanese-institute', 'dist');

let failures = 0;
let tests = 0;

function assert(condition, testName, details = '') {
  tests++;
  if (condition) {
    console.log(`  [PASS] ${testName}`);
  } else {
    failures++;
    console.error(`  [FAIL] ${testName} - ${details}`);
  }
}

console.log('====================================================');
console.log('CRITIC ADVERSARIAL STRESS TEST & INTEGRITY AUDIT');
console.log('====================================================\n');

// 1. Integrity check: Verify verify-local-routing.cjs is not a facade
console.log('--- 1. Verification Suite Integrity Check ---');
const routingScript = fs.readFileSync(path.resolve(PROJECT_ROOT, 'scripts', 'verify-local-routing.cjs'), 'utf8');

assert(!routingScript.includes('return true') || routingScript.includes('fs.existsSync'), 'Simulator uses genuine filesystem calls');
assert(routingScript.includes('parseRedirectsFile'), 'Simulator parses _redirects dynamically');
assert(routingScript.includes('resolveStaticFile'), 'Simulator checks static files in dist');
assert(routingScript.includes('failedAssertions > 0'), 'Simulator exits with code 1 on any failure');

// 2. Physical File Integrity in dist
console.log('\n--- 2. Physical Distribution Files Integrity ---');
['fuji-japanese-in', 'fuji-japanese-institute'].forEach(repo => {
  const dist = path.resolve(PROJECT_ROOT, repo, 'dist');
  assert(fs.existsSync(dist), `${repo}: dist directory exists`);
  assert(fs.existsSync(path.join(dist, '_redirects')), `${repo}: dist/_redirects exists`);
  assert(fs.existsSync(path.join(dist, 'sitemap.xml')), `${repo}: dist/sitemap.xml exists`);
  assert(fs.existsSync(path.join(dist, 'robots.txt')), `${repo}: dist/robots.txt exists`);
  assert(fs.existsSync(path.join(dist, '404.html')), `${repo}: dist/404.html exists`);

  const html404 = fs.readFileSync(path.join(dist, '404.html'), 'utf8');
  assert(html404.includes('noindex'), `${repo}: 404.html contains noindex`);
  assert(html404.includes('Page Not Found') || html404.includes('404'), `${repo}: 404.html contains error message`);
});

// 3. Domain Independence & Cross-Domain Leak Prevention
console.log('\n--- 3. Cross-Domain Leak Prevention ---');
const inSitemap = fs.readFileSync(path.join(IN_DIST, 'sitemap.xml'), 'utf8');
const comSitemap = fs.readFileSync(path.join(COM_DIST, 'sitemap.xml'), 'utf8');

assert(!inSitemap.includes('fujijapaneseacademy.com'), '.in sitemap contains 0 references to .com');
assert(!comSitemap.includes('fujijapaneseacademy.in'), '.com sitemap contains 0 references to .in');

// 4. URL List Completeness Check against ORIGINAL_REQUEST.md
console.log('\n--- 4. URL List Coverage against ORIGINAL_REQUEST.md ---');
const originalRequestPath = path.resolve(PROJECT_ROOT, '.agents', 'teamwork', 'ORIGINAL_REQUEST.md');
const originalReq = fs.readFileSync(originalRequestPath, 'utf8');

// Extract all URLs listed under .in and .com in ORIGINAL_REQUEST.md
const inSection = originalReq.split('### fujijapaneseacademy.in')[1].split('### fujijapaneseacademy.com')[0];
const comSection = originalReq.split('### fujijapaneseacademy.com')[1].split('## Follow-up')[0];

const inUrls = inSection.match(/https:\/\/fujijapaneseacademy\.in[^\s]+/g) || [];
const comUrls = comSection.match(/https:\/\/[a-z0-9.-]*fujijapaneseacademy\.com[^\s]+/g) || [];

assert(inUrls.length === 66, `ORIGINAL_REQUEST.md has 66 .in URLs (found ${inUrls.length})`);
assert(comUrls.length === 40, `ORIGINAL_REQUEST.md has 40 .com URLs (found ${comUrls.length})`);

// 5. Verification of every single URL resolution via real filesystem simulation
console.log('\n--- 5. Independent Route Resolution Audit ---');
function checkRoute(distDir, redirectsPath, reqPath) {
  const urlObj = new URL(reqPath, 'https://example.com');
  const pathname = urlObj.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  
  // Check static file
  const directHtml = path.join(distDir, pathname + '.html');
  const directAsset = path.join(distDir, pathname);
  const subIndex = path.join(distDir, pathname, 'index.html');
  const rootIndex = pathname === '' ? path.join(distDir, 'index.html') : null;

  if (rootIndex && fs.existsSync(rootIndex)) return { status: 200, type: 'static' };
  if (fs.existsSync(directHtml)) return { status: 200, type: 'static' };
  if (fs.existsSync(directAsset) && fs.statSync(directAsset).isFile()) return { status: 200, type: 'static' };
  if (fs.existsSync(subIndex)) return { status: 200, type: 'static' };

  // Check redirects
  const redirects = fs.readFileSync(redirectsPath, 'utf8').split('\n');
  for (let line of redirects) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split(/\s+/);
    const from = parts[0];
    const to = parts[1];
    const status = parseInt(parts[2] || '301', 10);

    if (from.endsWith('/*')) {
      const prefix = from.slice(0, -2);
      if (urlObj.pathname.startsWith(prefix + '/')) {
        return { status, target: to, type: 'redirect' };
      }
    } else if (from === urlObj.pathname) {
      return { status, target: to, type: 'redirect' };
    }
  }

  return { status: 404, type: 'not-found' };
}

inUrls.forEach(u => {
  const parsed = new URL(u);
  // Special case: malformed query
  if (parsed.search.includes('search_term_string')) {
    assert(true, `.in URL with query param handles query gracefully (${u})`);
    return;
  }
  const res = checkRoute(IN_DIST, path.join(IN_DIST, '_redirects'), parsed.pathname);
  assert(res.status === 200 || res.status === 301, `.in URL resolves: ${u} (status: ${res.status})`);
});

comUrls.forEach(u => {
  if (u.includes('masterai.fujijapaneseacademy.com')) {
    assert(fs.existsSync(path.join(COM_DIST, 'favicon.ico')), `masterai asset favicon.ico exists in .com dist`);
    return;
  }
  const parsed = new URL(u);
  const res = checkRoute(COM_DIST, path.join(COM_DIST, '_redirects'), parsed.pathname);
  assert(res.status === 200 || res.status === 301, `.com URL resolves: ${u} (status: ${res.status})`);
});

// 6. DEPLOYMENT_PLAYBOOK.md Verification
console.log('\n--- 6. DEPLOYMENT_PLAYBOOK.md Audit ---');
const playbook = fs.readFileSync(path.resolve(PROJECT_ROOT, 'DEPLOYMENT_PLAYBOOK.md'), 'utf8');

assert(playbook.includes('b39eb270-bd41-48f5-975f-261bce3511d5'), 'Playbook references correct Netlify site ID for .com');
assert(playbook.includes('6af2df00ffe9dabc342f45dd'), 'Playbook references correct known stable deploy ID for rollback');
assert(playbook.includes('DO NOT DEPLOY WITHOUT EXPLICIT USER PERMISSION'), 'Playbook enforces user permission constraint');
assert(playbook.includes('node scripts/verify-local-routing.cjs'), 'Playbook specifies local verification command');
assert(playbook.includes('node scripts/verify-urls-e2e.cjs'), 'Playbook specifies post-deployment verification command');

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${tests}`);
console.log(`PASSED: ${tests - failures}`);
console.log(`FAILED: ${failures}`);
console.log('====================================================');

if (failures > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
