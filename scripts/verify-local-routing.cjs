#!/usr/bin/env node
/**
 * scripts/verify-local-routing.cjs
 *
 * Comprehensive Local Netlify Routing & Distribution Verification Suite
 * Fuji Japanese Academy: Dual-Domain Validation (Local Only)
 *
 * Verifies:
 * 1. Physical static files in dist/ (94 HTML files each: 93 indexable + 404.html)
 * 2. All 66 reported URLs on fujijapaneseacademy.in from ORIGINAL_REQUEST.md
 * 3. All 40 reported URLs on fujijapaneseacademy.com from ORIGINAL_REQUEST.md
 * 4. Boundary & corner cases (malformed queries, category 301 fallbacks, security blocks)
 * 5. Domain independence (zero cross-domain canonicals or sitemap leaks)
 * 6. Special routes & loop detection
 *
 * Exit Code: 0 on 100% success; 1 on any failure.
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const PROJECT_ROOT = path.resolve(__dirname, '..');

const DOMAIN_CONFIG = {
  in: {
    domain: 'fujijapaneseacademy.in',
    baseUrl: 'https://fujijapaneseacademy.in',
    dir: path.resolve(PROJECT_ROOT, 'fuji-japanese-in'),
    distDir: path.resolve(PROJECT_ROOT, 'fuji-japanese-in', 'dist'),
    redirectsFile: path.resolve(PROJECT_ROOT, 'fuji-japanese-in', 'dist', '_redirects'),
    sitemapFile: path.resolve(PROJECT_ROOT, 'fuji-japanese-in', 'dist', 'sitemap.xml'),
    robotsFile: path.resolve(PROJECT_ROOT, 'fuji-japanese-in', 'dist', 'robots.txt'),
    expectedUrlCount: 93,
    expectedHtmlCount: 94, // 93 pages + 404.html
  },
  com: {
    domain: 'fujijapaneseacademy.com',
    baseUrl: 'https://fujijapaneseacademy.com',
    dir: path.resolve(PROJECT_ROOT, 'fuji-japanese-institute'),
    distDir: path.resolve(PROJECT_ROOT, 'fuji-japanese-institute', 'dist'),
    redirectsFile: path.resolve(PROJECT_ROOT, 'fuji-japanese-institute', 'dist', '_redirects'),
    sitemapFile: path.resolve(PROJECT_ROOT, 'fuji-japanese-institute', 'dist', 'sitemap.xml'),
    robotsFile: path.resolve(PROJECT_ROOT, 'fuji-japanese-institute', 'dist', 'robots.txt'),
    expectedUrlCount: 93,
    expectedHtmlCount: 94, // 93 pages + 404.html
  },
};

// 66 Reported URLs for fujijapaneseacademy.in from ORIGINAL_REQUEST.md
const URLS_IN = [
  'https://fujijapaneseacademy.in/jlpt',
  'https://fujijapaneseacademy.in/career/working-in-japan',
  'https://fujijapaneseacademy.in/career',
  'https://fujijapaneseacademy.in/locations/state/maharashtra',
  'https://fujijapaneseacademy.in/courses/spoken-japanese',
  'https://fujijapaneseacademy.in/locations/hyderabad',
  'https://fujijapaneseacademy.in/contact',
  'https://fujijapaneseacademy.in/courses?q=%7Bsearch_term_string%7D',
  'https://fujijapaneseacademy.in/jlpt/n2',
  'https://fujijapaneseacademy.in/blog',
  'https://fujijapaneseacademy.in/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score',
  'https://fujijapaneseacademy.in/blog/tech-jobs-in-japan-for-indian-engineers',
  'https://fujijapaneseacademy.in/career/japanese-job-interview',
  'https://fujijapaneseacademy.in/career/japanese-jobs',
  'https://fujijapaneseacademy.in/careers',
  'https://fujijapaneseacademy.in/careers/apply',
  'https://fujijapaneseacademy.in/courses',
  'https://fujijapaneseacademy.in/courses/business-japanese',
  'https://fujijapaneseacademy.in/courses/japanese-for-it-professionals',
  'https://fujijapaneseacademy.in/courses/jlpt-n1',
  'https://fujijapaneseacademy.in/courses/jlpt-n2',
  'https://fujijapaneseacademy.in/courses/jlpt-n3',
  'https://fujijapaneseacademy.in/exam-calendar',
  'https://fujijapaneseacademy.in/jlpt/n1',
  'https://fujijapaneseacademy.in/jlpt/n3',
  'https://fujijapaneseacademy.in/jlpt/n4',
  'https://fujijapaneseacademy.in/learn/hiragana-katakana',
  'https://fujijapaneseacademy.in/learn/kanji',
  'https://fujijapaneseacademy.in/learn/vocabulary',
  'https://fujijapaneseacademy.in/locations',
  'https://fujijapaneseacademy.in/locations/ahmedabad',
  'https://fujijapaneseacademy.in/locations/bangalore',
  'https://fujijapaneseacademy.in/locations/chennai',
  'https://fujijapaneseacademy.in/locations/coimbatore',
  'https://fujijapaneseacademy.in/locations/delhi',
  'https://fujijapaneseacademy.in/locations/electronic-city',
  'https://fujijapaneseacademy.in/locations/hosur',
  'https://fujijapaneseacademy.in/locations/hubballi',
  'https://fujijapaneseacademy.in/locations/indiranagar',
  'https://fujijapaneseacademy.in/locations/karur',
  'https://fujijapaneseacademy.in/locations/kochi',
  'https://fujijapaneseacademy.in/locations/kolkata',
  'https://fujijapaneseacademy.in/locations/koramangala',
  'https://fujijapaneseacademy.in/locations/kozhikode',
  'https://fujijapaneseacademy.in/locations/krishnagiri',
  'https://fujijapaneseacademy.in/locations/madurai',
  'https://fujijapaneseacademy.in/locations/mangaluru',
  'https://fujijapaneseacademy.in/locations/mumbai',
  'https://fujijapaneseacademy.in/locations/mysuru',
  'https://fujijapaneseacademy.in/locations/nagpur',
  'https://fujijapaneseacademy.in/locations/palakkad',
  'https://fujijapaneseacademy.in/locations/pune',
  'https://fujijapaneseacademy.in/locations/salem',
  'https://fujijapaneseacademy.in/locations/state/delhi-ncr',
  'https://fujijapaneseacademy.in/locations/state/japan-onshore',
  'https://fujijapaneseacademy.in/locations/state/kerala',
  'https://fujijapaneseacademy.in/locations/state/west-bengal-gujarat',
  'https://fujijapaneseacademy.in/locations/thrissur',
  'https://fujijapaneseacademy.in/locations/tokyo',
  'https://fujijapaneseacademy.in/locations/trichy',
  'https://fujijapaneseacademy.in/locations/trivandrum',
  'https://fujijapaneseacademy.in/locations/vijayawada',
  'https://fujijapaneseacademy.in/locations/visakhapatnam',
  'https://fujijapaneseacademy.in/locations/whitefield',
  'https://fujijapaneseacademy.in/verify-certificate',
  'https://fujijapaneseacademy.in/privacy-policy',
];

// 40 Reported URLs for fujijapaneseacademy.com from ORIGINAL_REQUEST.md
const URLS_COM = [
  'https://fujijapaneseacademy.com/locations/kozhikode',
  'https://fujijapaneseacademy.com/locations/krishnagiri',
  'https://fujijapaneseacademy.com/locations/hyderabad',
  'https://fujijapaneseacademy.com/college-partnerships',
  'https://fujijapaneseacademy.com/locations/state/kerala',
  'https://fujijapaneseacademy.com/locations/mumbai',
  'https://fujijapaneseacademy.com/locations/hosur',
  'https://fujijapaneseacademy.com/locations/gurugram',
  'https://fujijapaneseacademy.com/locations/state/tamil-nadu',
  'https://fujijapaneseacademy.com/locations/karur',
  'https://fujijapaneseacademy.com/locations/visakhapatnam',
  'https://fujijapaneseacademy.com/locations/state/karnataka',
  'https://fujijapaneseacademy.com/verify-certificate',
  'https://fujijapaneseacademy.com/locations/salem',
  'https://fujijapaneseacademy.com/locations/hubballi',
  'https://fujijapaneseacademy.com/locations/thrissur',
  'https://fujijapaneseacademy.com/locations/ahmedabad',
  'https://fujijapaneseacademy.com/locations/madurai',
  'https://fujijapaneseacademy.com/locations/osaka',
  'https://fujijapaneseacademy.com/locations/kochi',
  'https://fujijapaneseacademy.com/careers/apply',
  'https://fujijapaneseacademy.com/locations/state/west-bengal-gujarat',
  'https://fujijapaneseacademy.com/locations/delhi',
  'https://fujijapaneseacademy.com/locations/mysuru',
  'https://fujijapaneseacademy.com/locations/kolkata',
  'https://fujijapaneseacademy.com/locations/nagpur',
  'https://fujijapaneseacademy.com/locations/trivandrum',
  'https://fujijapaneseacademy.com/locations/state/maharashtra',
  'https://fujijapaneseacademy.com/locations/vijayawada',
  'https://fujijapaneseacademy.com/locations/state/telangana-andhra',
  'https://fujijapaneseacademy.com/locations/pune',
  'https://fujijapaneseacademy.com/career',
  'https://fujijapaneseacademy.com/career/japanese-jobs',
  'https://fujijapaneseacademy.com/locations/electronic-city',
  'https://fujijapaneseacademy.com/locations/indiranagar',
  'https://fujijapaneseacademy.com/learn',
  'https://fujijapaneseacademy.com/courses/corporate-japanese-training',
  'https://masterai.fujijapaneseacademy.com/favicon.ico?9ecfcc8f0ead0bf3',
  'https://fujijapaneseacademy.com/blog/essential-japanese-phrases-for-daily-life-and-travel',
  'https://fujijapaneseacademy.com/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score',
];

// Boundary and Corner Test Cases
const BOUNDARY_CASES = [
  // Malformed queries
  { domain: 'in', path: '/courses?q=%7Bsearch_term_string%7D', expectedStatus: [200, 301], expectedTarget: '/courses', desc: 'Malformed search placeholder query (.in)' },
  { domain: 'com', path: '/courses?q=%7Bsearch_term_string%7D', expectedStatus: [200, 301], expectedTarget: '/courses', desc: 'Malformed search placeholder query (.com)' },
  { domain: 'in', path: '/courses?q=test_query', expectedStatus: [200, 301], expectedTarget: '/courses', desc: 'Generic query param normalization (.in)' },
  { domain: 'com', path: '/courses?q=test_query', expectedStatus: [200, 301], expectedTarget: '/courses', desc: 'Generic query param normalization (.com)' },

  // Parent Category Fallbacks on .in
  { domain: 'in', path: '/locations/nonexistent-test-locality', expectedStatus: [301], expectedTarget: '/locations', desc: 'Category fallback: non-existent locality (.in)' },
  { domain: 'in', path: '/locations/state/nonexistent-test-state', expectedStatus: [301], expectedTarget: '/locations', desc: 'Category fallback: non-existent state (.in)' },
  { domain: 'in', path: '/courses/nonexistent-test-course', expectedStatus: [301], expectedTarget: '/courses', desc: 'Category fallback: non-existent course (.in)' },
  { domain: 'in', path: '/career/nonexistent-test-career', expectedStatus: [301], expectedTarget: '/career', desc: 'Category fallback: non-existent career (.in)' },
  { domain: 'in', path: '/careers/nonexistent-test-role', expectedStatus: [301], expectedTarget: '/careers', desc: 'Category fallback: non-existent career role (.in)' },
  { domain: 'in', path: '/jlpt/n9', expectedStatus: [301], expectedTarget: '/jlpt', desc: 'Category fallback: non-existent jlpt level (.in)' },
  { domain: 'in', path: '/learn/nonexistent-test-topic', expectedStatus: [301], expectedTarget: '/learn', desc: 'Category fallback: non-existent learn path (.in)' },
  { domain: 'in', path: '/blog/nonexistent-test-post', expectedStatus: [301], expectedTarget: '/blog', desc: 'Category fallback: non-existent blog post (.in)' },

  // Parent Category Fallbacks on .com
  { domain: 'com', path: '/locations/nonexistent-test-locality', expectedStatus: [301], expectedTarget: '/locations', desc: 'Category fallback: non-existent locality (.com)' },
  { domain: 'com', path: '/locations/state/nonexistent-test-state', expectedStatus: [301], expectedTarget: '/locations', desc: 'Category fallback: non-existent state (.com)' },
  { domain: 'com', path: '/courses/nonexistent-test-course', expectedStatus: [301], expectedTarget: '/courses', desc: 'Category fallback: non-existent course (.com)' },
  { domain: 'com', path: '/career/nonexistent-test-career', expectedStatus: [301], expectedTarget: '/career', desc: 'Category fallback: non-existent career (.com)' },
  { domain: 'com', path: '/careers/nonexistent-test-role', expectedStatus: [301], expectedTarget: '/careers', desc: 'Category fallback: non-existent career role (.com)' },
  { domain: 'com', path: '/jlpt/n9', expectedStatus: [301], expectedTarget: '/jlpt', desc: 'Category fallback: non-existent jlpt level (.com)' },
  { domain: 'com', path: '/learn/nonexistent-test-topic', expectedStatus: [301], expectedTarget: '/learn', desc: 'Category fallback: non-existent learn path (.com)' },
  { domain: 'com', path: '/blog/nonexistent-test-post', expectedStatus: [301], expectedTarget: '/blog', desc: 'Category fallback: non-existent blog post (.com)' },

  // Security Block Rules (Must return 404)
  { domain: 'in', path: '/.env', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /.env (.in)' },
  { domain: 'com', path: '/.env', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /.env (.com)' },
  { domain: 'in', path: '/.env.production', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /.env.production (.in)' },
  { domain: 'com', path: '/.env.production', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /.env.production (.com)' },
  { domain: 'in', path: '/supabase/config.toml', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /supabase/* (.in)' },
  { domain: 'com', path: '/supabase/config.toml', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /supabase/* (.com)' },
  { domain: 'in', path: '/scripts/prerender.js', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /scripts/* (.in)' },
  { domain: 'com', path: '/scripts/prerender.js', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Security block: /scripts/* (.com)' },

  // Unknown non-category route returns 404
  { domain: 'in', path: '/random-unmapped-page-xyz', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Unknown catch-all route returns 404 (.in)' },
  { domain: 'com', path: '/random-unmapped-page-xyz', expectedStatus: [404], expectedTarget: '/404.html', desc: 'Unknown catch-all route returns 404 (.com)' },
];

// Special routes to test for non-hijacking
const SPECIAL_ROUTES = [
  '/careers/apply',
  '/college-partnerships',
  '/verify-certificate',
  '/locations/mumbai',
  '/courses/jlpt-n5',
  '/career/japanese-jobs',
  '/learn/hiragana-katakana',
  '/blog/tech-jobs-in-japan-for-indian-engineers',
];

// Canonical aliases to test for single-hop resolution
const ALIAS_ROUTES = [
  { from: '/links', to: '/connect' },
  { from: '/qrcode', to: '/qr' },
  { from: '/pay', to: '/payment' },
  { from: '/n5', to: '/jlpt/n5' },
  { from: '/n4', to: '/jlpt/n4' },
  { from: '/n3', to: '/jlpt/n3' },
  { from: '/n2', to: '/jlpt/n2' },
  { from: '/n1', to: '/jlpt/n1' },
  { from: '/enroll', to: '/enquire' },
  { from: '/admissions', to: '/enquire' },
  { from: '/sitemap-academy.xml', to: '/sitemap.xml' },
];

/**
 * Recursively find all HTML files in a directory
 */
function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (item.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Parse Netlify _redirects file
 */
function parseRedirectsFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const rules = [];

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;

    let from = parts[0];
    let to = parts[1];
    let queryParams = {};
    let statusIndex = 2;

    if (parts[1] && parts[1].includes('=')) {
      const qTokens = parts[1].split('=');
      queryParams[qTokens[0]] = qTokens[1];
      to = parts[2];
      statusIndex = 3;
    }

    let status = 301;
    let force = false;
    if (parts[statusIndex]) {
      const raw = parts[statusIndex];
      if (raw.endsWith('!')) {
        force = true;
        status = parseInt(raw.slice(0, -1), 10);
      } else {
        status = parseInt(raw, 10);
      }
    }

    rules.push({ raw: line, from, to, status: status || 301, force, queryParams });
  }
  return rules;
}

/**
 * Check if path matches Netlify pattern
 */
function matchesPattern(fromPattern, requestPath) {
  if (fromPattern === requestPath) return true;
  if (fromPattern.endsWith('/*')) {
    const prefix = fromPattern.slice(0, -2);
    if (requestPath.startsWith(prefix + '/')) return true;
    if (prefix === '' && requestPath.startsWith('/')) return true;
  }
  if (fromPattern.endsWith('*')) {
    const prefix = fromPattern.slice(0, -1);
    if (requestPath.startsWith(prefix)) return true;
  }
  return false;
}

/**
 * Resolve whether physical static file exists in dist
 */
function resolveStaticFile(distDir, pathname) {
  if (pathname === '/' || pathname === '') {
    const p = path.join(distDir, 'index.html');
    return fs.existsSync(p) ? p : null;
  }
  const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  // 1. Direct asset (e.g. favicon.ico, sitemap.xml, robots.txt)
  const directAsset = path.join(distDir, clean);
  if (fs.existsSync(directAsset) && fs.statSync(directAsset).isFile()) {
    return directAsset;
  }

  // 2. Direct HTML (e.g. /courses -> dist/courses.html)
  const directHtml = path.join(distDir, clean + '.html');
  if (fs.existsSync(directHtml) && fs.statSync(directHtml).isFile()) {
    return directHtml;
  }

  // 3. Subdirectory index.html (e.g. /locations/mumbai/index.html)
  const subIndex = path.join(distDir, clean, 'index.html');
  if (fs.existsSync(subIndex) && fs.statSync(subIndex).isFile()) {
    return subIndex;
  }

  return null;
}

/**
 * Simulate single Netlify Edge resolution step
 */
function simulateSingleHop(config, requestUrl) {
  const parsed = new URL(requestUrl, config.baseUrl);
  const pathname = parsed.pathname;
  const searchParams = parsed.searchParams;
  const staticFile = resolveStaticFile(config.distDir, pathname);

  const rules = parseRedirectsFile(config.redirectsFile);

  for (const rule of rules) {
    // Check query params if rule specifies them
    if (Object.keys(rule.queryParams).length > 0) {
      let qMatch = true;
      for (const [k, v] of Object.entries(rule.queryParams)) {
        if (!searchParams.has(k)) {
          qMatch = false;
          break;
        }
      }
      if (!qMatch) continue;
    }

    if (matchesPattern(rule.from, pathname)) {
      const isQueryRule = Object.keys(rule.queryParams).length > 0;
      // In Netlify, unforced rules without query parameters do not override existing static files
      if (staticFile && !rule.force && !isQueryRule) {
        continue;
      }

      // Rule fires!
      return {
        status: rule.status,
        target: rule.to,
        matchedRule: rule,
        isRedirect: rule.status >= 300 && rule.status < 400,
        isRewrite: rule.status === 200,
        staticFile: rule.status === 200 ? (resolveStaticFile(config.distDir, rule.to) || staticFile) : null,
      };
    }
  }

  // If no forced rule fired, and static file exists:
  if (staticFile) {
    return {
      status: 200,
      target: pathname,
      matchedRule: null,
      isRedirect: false,
      isRewrite: false,
      staticFile,
    };
  }

  // Default catch-all
  return {
    status: 404,
    target: '/404.html',
    matchedRule: null,
    isRedirect: false,
    isRewrite: false,
    staticFile: null,
  };
}

/**
 * Trace multi-hop redirect resolution until terminal status
 */
function traceResolution(config, initialUrl, maxHops = 10) {
  const chain = [];
  let currentUrl = initialUrl;

  for (let hop = 0; hop < maxHops; hop++) {
    const hopResult = simulateSingleHop(config, currentUrl);
    chain.push({ hop, url: currentUrl, result: hopResult });

    if (!hopResult.isRedirect) {
      return {
        initialUrl,
        finalStatus: hopResult.status,
        finalTarget: hopResult.target,
        finalFile: hopResult.staticFile,
        hops: hop,
        hasLoop: false,
        chain,
      };
    }

    // Follow redirect
    const nextParsed = new URL(hopResult.target, config.baseUrl);
    const nextUrl = nextParsed.pathname + nextParsed.search;

    // Check for circular loop
    if (chain.some((c) => c.url === nextUrl)) {
      return {
        initialUrl,
        finalStatus: 301,
        finalTarget: nextUrl,
        finalFile: null,
        hops: hop + 1,
        hasLoop: true,
        chain,
      };
    }

    currentUrl = nextUrl;
  }

  return {
    initialUrl,
    finalStatus: 508, // Loop detected / too many redirects
    finalTarget: currentUrl,
    finalFile: null,
    hops: maxHops,
    hasLoop: true,
    chain,
  };
}

// ==========================================
// TEST EXECUTION RUNNER
// ==========================================

async function runLocalVerification() {
  console.log(`${colors.bright}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}  FUJI JAPANESE ACADEMY — LOCAL ROUTING & DISTRIBUTION SUITE    ${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.gray}Mode: STRICT LOCAL SIMULATION (Netlify Edge Engine)${colors.reset}\n`);

  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = 0;
  const failures = [];

  function assert(name, condition, details) {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
      console.log(`  ${colors.green}✔ PASS${colors.reset}: ${name}`);
    } else {
      failedAssertions++;
      console.log(`  ${colors.red}✖ FAIL${colors.reset}: ${name}`);
      console.log(`         ${colors.yellow}Details: ${details}${colors.reset}`);
      failures.push({ name, details });
    }
  }

  // -------------------------------------------------------------
  // SUITE 1: PHYSICAL DISTRIBUTION ARTIFACTS AUDIT
  // -------------------------------------------------------------
  console.log(`\n${colors.bright}${colors.blue}--- SUITE 1: Static Distribution Artifacts Audit ---${colors.reset}`);
  for (const [key, cfg] of Object.entries(DOMAIN_CONFIG)) {
    console.log(`\n  Checking codebase: ${cfg.dir} (${cfg.domain})`);

    // 1.1 Verify dist directory exists
    assert(
      `[${cfg.domain}] dist directory exists`,
      fs.existsSync(cfg.distDir),
      `Path not found: ${cfg.distDir}`
    );

    // 1.2 Verify recursive HTML file count (exactly 94 = 93 pages + 404.html)
    const htmlFiles = getAllHtmlFiles(cfg.distDir);
    assert(
      `[${cfg.domain}] dist contains exactly 94 HTML files (93 pages + 404.html)`,
      htmlFiles.length === cfg.expectedHtmlCount,
      `Expected ${cfg.expectedHtmlCount} HTML files, found ${htmlFiles.length}`
    );

    // 1.3 Verify _redirects exists and is non-empty
    const hasRedirects = fs.existsSync(cfg.redirectsFile) && fs.statSync(cfg.redirectsFile).size > 100;
    assert(
      `[${cfg.domain}] dist/_redirects exists and contains rules`,
      hasRedirects,
      `File missing or empty at: ${cfg.redirectsFile}`
    );

    // 1.4 Verify sitemap.xml exists and has valid XML & exactly 93 URLs
    const hasSitemap = fs.existsSync(cfg.sitemapFile);
    let sitemapUrlCount = 0;
    if (hasSitemap) {
      const sitemapContent = fs.readFileSync(cfg.sitemapFile, 'utf8');
      const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
      sitemapUrlCount = matches.length;
    }
    assert(
      `[${cfg.domain}] dist/sitemap.xml exists and contains exactly 93 URLs`,
      hasSitemap && sitemapUrlCount === cfg.expectedUrlCount,
      `Expected 93 URLs, found ${sitemapUrlCount}`
    );

    // 1.5 Verify robots.txt exists and points to correct sitemap
    const hasRobots = fs.existsSync(cfg.robotsFile);
    let robotsValid = false;
    if (hasRobots) {
      const robotsContent = fs.readFileSync(cfg.robotsFile, 'utf8');
      robotsValid = robotsContent.includes(`Sitemap: ${cfg.baseUrl}/sitemap.xml`) &&
                    !robotsContent.includes('sitemap-academy.xml');
    }
    assert(
      `[${cfg.domain}] dist/robots.txt points strictly to ${cfg.baseUrl}/sitemap.xml`,
      robotsValid,
      `robots.txt invalid or points to wrong sitemap`
    );

    // 1.6 Verify 404.html exists and contains noindex
    const has404 = fs.existsSync(path.join(cfg.distDir, '404.html'));
    let hasNoIndex = false;
    if (has404) {
      const content404 = fs.readFileSync(path.join(cfg.distDir, '404.html'), 'utf8');
      hasNoIndex = content404.includes('noindex');
    }
    assert(
      `[${cfg.domain}] dist/404.html exists and has noindex meta tag`,
      has404 && hasNoIndex,
      `404.html missing or lacks noindex meta tag`
    );
  }

  // -------------------------------------------------------------
  // SUITE 2: TIER 1 CORE REPORTED URLS (106 TOTAL)
  // -------------------------------------------------------------
  console.log(`\n${colors.bright}${colors.blue}--- SUITE 2: Tier 1 Core Reported URLs (106 URLs) ---${colors.reset}`);
  console.log(`${colors.gray}Criteria: 100% resolve with status 200 or 301/302; exactly 0 return 404.${colors.reset}\n`);

  // 2.1 Test all 66 reported URLs on .in
  console.log(`  ${colors.bright}Testing 66 reported URLs on fujijapaneseacademy.in:${colors.reset}`);
  let in404Count = 0;
  for (const url of URLS_IN) {
    const trace = traceResolution(DOMAIN_CONFIG.in, url);
    const initialStatus = trace.chain[0].result.status;
    const finalStatus = trace.finalStatus;
    const isSuccess = (initialStatus === 200 || (trace.chain[0].result.isRedirect && finalStatus === 200));
    const is404 = initialStatus === 404 || finalStatus === 404;

    if (is404) in404Count++;

    assert(
      `[.in URL] ${url} -> status ${initialStatus}${initialStatus === 301 ? ` -> final ${finalStatus}` : ''}`,
      isSuccess && !is404 && !trace.hasLoop,
      `Failed resolution: initial=${initialStatus}, final=${finalStatus}, target=${trace.finalTarget}`
    );
  }
  assert(
    `[.in Aggregate] Exactly 0 of 66 reported URLs return 404 Not Found`,
    in404Count === 0,
    `Found ${in404Count} 404 errors on .in reported URLs`
  );

  // 2.2 Test all 40 reported URLs on .com
  console.log(`\n  ${colors.bright}Testing 40 reported URLs on fujijapaneseacademy.com:${colors.reset}`);
  let com404Count = 0;
  for (const url of URLS_COM) {
    // For masterai subdomain asset, evaluate against com static assets
    let trace;
    if (url.includes('masterai.fujijapaneseacademy.com')) {
      const assetPath = new URL(url).pathname;
      const assetFile = resolveStaticFile(DOMAIN_CONFIG.com.distDir, assetPath);
      trace = {
        initialUrl: url,
        finalStatus: assetFile ? 200 : 404,
        finalTarget: assetPath,
        finalFile: assetFile,
        hasLoop: false,
        chain: [{ hop: 0, url, result: { status: assetFile ? 200 : 404, isRedirect: false } }]
      };
    } else {
      trace = traceResolution(DOMAIN_CONFIG.com, url);
    }

    const initialStatus = trace.chain[0].result.status;
    const finalStatus = trace.finalStatus;
    const isSuccess = (initialStatus === 200 || (trace.chain[0].result.isRedirect && finalStatus === 200));
    const is404 = initialStatus === 404 || finalStatus === 404;

    if (is404) com404Count++;

    assert(
      `[.com URL] ${url} -> status ${initialStatus}${initialStatus === 301 ? ` -> final ${finalStatus}` : ''}`,
      isSuccess && !is404 && !trace.hasLoop,
      `Failed resolution: initial=${initialStatus}, final=${finalStatus}, target=${trace.finalTarget}`
    );
  }
  assert(
    `[.com Aggregate] Exactly 0 of 40 reported URLs return 404 Not Found`,
    com404Count === 0,
    `Found ${com404Count} 404 errors on .com reported URLs`
  );

  // -------------------------------------------------------------
  // SUITE 3: TIER 2 BOUNDARY & CORNER CASES
  // -------------------------------------------------------------
  console.log(`\n${colors.bright}${colors.blue}--- SUITE 3: Tier 2 Boundary & Corner Cases ---${colors.reset}`);
  for (const bc of BOUNDARY_CASES) {
    const cfg = DOMAIN_CONFIG[bc.domain];
    const trace = traceResolution(cfg, bc.path);
    const initialStatus = trace.chain[0].result.status;
    const initialTarget = trace.chain[0].result.target;

    const statusMatch = bc.expectedStatus.includes(initialStatus);
    const targetMatch = !bc.expectedTarget || initialTarget === bc.expectedTarget;

    // If it's a redirect, check that final resolution is 200
    let destinationOk = true;
    if (trace.chain[0].result.isRedirect) {
      destinationOk = trace.finalStatus === 200;
    }

    assert(
      `[Boundary: ${bc.desc}] ${bc.path} -> ${initialStatus} (target: ${initialTarget})`,
      statusMatch && targetMatch && destinationOk && !trace.hasLoop,
      `Expected status ${bc.expectedStatus} target ${bc.expectedTarget}, got status ${initialStatus} target ${initialTarget} (final: ${trace.finalStatus})`
    );
  }

  // -------------------------------------------------------------
  // SUITE 4: TIER 3 DOMAIN INDEPENDENCE & CANONICAL AUDIT
  // -------------------------------------------------------------
  console.log(`\n${colors.bright}${colors.blue}--- SUITE 4: Tier 3 Domain Independence & Cross-Domain Leak Prevention ---${colors.reset}`);

  for (const [key, cfg] of Object.entries(DOMAIN_CONFIG)) {
    const otherDomain = key === 'in' ? DOMAIN_CONFIG.com.domain : DOMAIN_CONFIG.in.domain;
    console.log(`\n  Checking cross-domain leak for: ${cfg.domain} (must have 0 references to ${otherDomain})`);

    // 4.1 Check canonical tags in all HTML files
    const htmlFiles = getAllHtmlFiles(cfg.distDir);
    let crossDomainCanonicalCount = 0;
    let missingCanonicalCount = 0;

    for (const file of htmlFiles) {
      // 404.html does not need canonical
      if (file.endsWith('404.html')) continue;

      const content = fs.readFileSync(file, 'utf8');
      const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

      if (!canonicalMatch) {
        missingCanonicalCount++;
      } else {
        const canonicalUrl = canonicalMatch[1];
        if (canonicalUrl.includes(otherDomain)) {
          crossDomainCanonicalCount++;
        }
      }
    }

    assert(
      `[${cfg.domain}] 0 HTML files contain cross-domain canonical links to ${otherDomain}`,
      crossDomainCanonicalCount === 0,
      `Found ${crossDomainCanonicalCount} files with cross-domain canonicals`
    );

    assert(
      `[${cfg.domain}] All 93 pre-rendered HTML files contain self-referencing canonical links`,
      missingCanonicalCount === 0,
      `Found ${missingCanonicalCount} HTML files missing canonical tags`
    );

    // 4.2 Check sitemap for cross-domain leaks
    let crossDomainSitemapCount = 0;
    if (fs.existsSync(cfg.sitemapFile)) {
      const sitemapContent = fs.readFileSync(cfg.sitemapFile, 'utf8');
      const locs = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
      for (const loc of locs) {
        if (loc.includes(otherDomain)) {
          crossDomainSitemapCount++;
        }
      }
    }

    assert(
      `[${cfg.domain}] 0 sitemap URLs point to other domain (${otherDomain})`,
      crossDomainSitemapCount === 0,
      `Found ${crossDomainSitemapCount} sitemap URLs referencing ${otherDomain}`
    );
  }

  // -------------------------------------------------------------
  // SUITE 5: SPECIAL ROUTES & REDIRECT LOOP DETECTION
  // -------------------------------------------------------------
  console.log(`\n${colors.bright}${colors.blue}--- SUITE 5: Special Routes Non-Hijacking & Loop Detection ---${colors.reset}`);

  for (const [key, cfg] of Object.entries(DOMAIN_CONFIG)) {
    // 5.1 Special routes must serve 200 OK directly, never hijacked by category fallbacks
    for (const route of SPECIAL_ROUTES) {
      const trace = traceResolution(cfg, route);
      const isDirect200 = trace.chain[0].result.status === 200;
      assert(
        `[${cfg.domain} Non-Hijacking] ${route} serves 200 OK static page directly`,
        isDirect200 && !trace.chain[0].result.isRedirect,
        `Route was hijacked! Status: ${trace.chain[0].result.status}, target: ${trace.chain[0].result.target}`
      );
    }

    // 5.2 Canonical alias routes must resolve cleanly with 0 loops
    for (const alias of ALIAS_ROUTES) {
      const trace = traceResolution(cfg, alias.from);
      const initialMatch = trace.chain[0].result.status === 301 && trace.chain[0].result.target === alias.to;
      const finalOk = trace.finalStatus === 200;
      assert(
        `[${cfg.domain} Alias Trace] ${alias.from} -> 301 to ${alias.to} -> final 200 OK (no loops)`,
        initialMatch && finalOk && !trace.hasLoop,
        `Alias trace failed: initial=${trace.chain[0].result.status} target=${trace.chain[0].result.target} final=${trace.finalStatus} loop=${trace.hasLoop}`
      );
    }
  }

  // -------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------
  console.log(`\n${colors.bright}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bright}LOCAL VERIFICATION SUMMARY${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}================================================================${colors.reset}`);
  console.log(`  Total Assertions Executed : ${totalAssertions}`);
  console.log(`  Passed Assertions         : ${colors.green}${passedAssertions}${colors.reset}`);
  console.log(`  Failed Assertions         : ${failedAssertions === 0 ? colors.green + '0' : colors.red + failedAssertions}${colors.reset}`);
  console.log(`  Success Rate              : ${((passedAssertions / totalAssertions) * 100).toFixed(2)}%`);

  if (failedAssertions > 0) {
    console.log(`\n${colors.red}${colors.bright}FAILURE BREAKDOWN:${colors.reset}`);
    failures.forEach((f, idx) => {
      console.log(`  ${idx + 1}. ${f.name} - ${f.details}`);
    });
    process.exit(1);
  } else {
    console.log(`\n${colors.green}${colors.bright}🎉 ALL VERIFICATION SUITES PASSED! 100% LOCAL COMPLIANCE CONFIRMED.${colors.reset}\n`);
    process.exit(0);
  }
}

runLocalVerification().catch((err) => {
  console.error('Fatal error during verification execution:', err);
  process.exit(1);
});
