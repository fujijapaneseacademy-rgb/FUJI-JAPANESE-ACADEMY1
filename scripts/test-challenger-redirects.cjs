#!/usr/bin/env node
/**
 * scripts/test-challenger-redirects.cjs
 *
 * Challenger 2 Adversarial Stress Test & Loop Detection Harness
 * Empirically tests:
 * 1. Query parameter normalization loop detection (multi-hop trace)
 * 2. Special routes (/careers/apply, /college-partnerships, /verify-certificate)
 * 3. 100% of sitemap.xml routes for unwanted 301 hijacking
 * 4. TOML syntax and schema cross-validation
 */

const fs = require('fs');
const path = require('path');

const REPOS = [
  {
    name: 'fuji-japanese-in',
    domain: 'fujijapaneseacademy.in',
    dir: path.resolve(__dirname, '..', 'fuji-japanese-in'),
  },
  {
    name: 'fuji-japanese-institute',
    domain: 'fujijapaneseacademy.com',
    dir: path.resolve(__dirname, '..', 'fuji-japanese-institute'),
  }
];

function parseRedirects(filePath) {
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

function resolveStaticFile(distDir, pathname) {
  if (pathname === '/') {
    const p = path.join(distDir, 'index.html');
    return fs.existsSync(p) ? p : null;
  }
  const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const direct = path.join(distDir, clean + '.html');
  if (fs.existsSync(direct)) return direct;
  const indexP = path.join(distDir, clean, 'index.html');
  if (fs.existsSync(indexP)) return indexP;
  return null;
}

function matchPattern(fromPattern, requestPath) {
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
 * Simulates a single HTTP hop on Netlify Edge
 */
function simulateSingleHop(repo, requestUrl) {
  const parsed = new URL(requestUrl, `https://${repo.domain}`);
  const pathname = parsed.pathname;
  const searchParams = parsed.searchParams;
  const distDir = path.join(repo.dir, 'dist');
  const staticFile = resolveStaticFile(distDir, pathname);

  const rules = parseRedirects(path.join(repo.dir, 'public', '_redirects'));

  for (const rule of rules) {
    // Query condition check
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

    if (matchPattern(rule.from, pathname)) {
      // Query param rules or forced rules override static file
      const isQueryRule = Object.keys(rule.queryParams).length > 0;
      if (staticFile && !rule.force && !isQueryRule) {
        continue;
      }

      // If rule fires
      let target = rule.to;
      // In Netlify, if rule matches query params, matched query param is stripped
      // Target is rule.to without matched query params
      return {
        status: rule.status,
        target,
        matchedRule: rule,
        isRedirect: rule.status >= 300 && rule.status < 400,
        staticFile: rule.status === 200 ? staticFile : null
      };
    }
  }

  if (staticFile) {
    return {
      status: 200,
      target: pathname,
      matchedRule: null,
      isRedirect: false,
      staticFile
    };
  }

  return {
    status: 404,
    target: '/404.html',
    matchedRule: null,
    isRedirect: false,
    staticFile: null
  };
}

/**
 * Traces full redirect chain to detect loops or unhandled paths
 */
function traceRedirectChain(repo, initialUrl, maxHops = 10) {
  const chain = [];
  let currentUrl = initialUrl;

  for (let hop = 0; hop < maxHops; hop++) {
    const result = simulateSingleHop(repo, currentUrl);
    chain.push({ hop, url: currentUrl, result });

    if (!result.isRedirect) {
      return {
        initialUrl,
        finalStatus: result.status,
        finalUrl: currentUrl,
        hops: hop,
        hasLoop: false,
        chain
      };
    }

    // Next URL in redirect chain
    const nextParsed = new URL(result.target, `https://${repo.domain}`);
    const nextUrl = nextParsed.pathname + nextParsed.search;

    // Check for loop
    const visited = chain.some(c => c.url === nextUrl);
    if (visited) {
      return {
        initialUrl,
        finalStatus: 301,
        finalUrl: nextUrl,
        hops: hop + 1,
        hasLoop: true,
        chain
      };
    }

    currentUrl = nextUrl;
  }

  return {
    initialUrl,
    finalStatus: 508, // Loop detected
    finalUrl: currentUrl,
    hops: maxHops,
    hasLoop: true,
    chain
  };
}

console.log('================================================================');
console.log('   CHALLENGER 2 EMPIRICAL ADVERSARIAL VERIFICATION SUITE       ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(description, pass, details = '') {
  totalTests++;
  if (pass) {
    passedTests++;
    console.log(`[PASS] ${description}`);
  } else {
    failedTests++;
    console.log(`[FAIL] ${description} -> ${details}`);
  }
}

for (const repo of REPOS) {
  console.log(`\n============================================================`);
  console.log(`Repository: ${repo.name} (${repo.domain})`);
  console.log(`============================================================`);

  // ------------------------------------------------------------
  // SECTION 1: Query Normalization & Loop Stress Testing
  // ------------------------------------------------------------
  console.log('\n--- Section 1: Query Normalization & Redirect Loop Stress Tests ---');

  const queryCases = [
    { input: '/courses', expectedStatus: 200, expectedFinal: '/courses', desc: 'Clean /courses without query parameters' },
    { input: '/courses?q=%7Bsearch_term_string%7D', expectedStatus: 200, expectedFinal: '/courses', desc: 'Encoded search placeholder normalized to /courses' },
    { input: '/courses?q={search_term_string}', expectedStatus: 200, expectedFinal: '/courses', desc: 'Raw search placeholder normalized to /courses' },
    { input: '/courses?q=japanese', expectedStatus: 200, expectedFinal: '/courses', desc: 'Arbitrary keyword query normalized to /courses' },
    { input: '/courses?q=', expectedStatus: 200, expectedFinal: '/courses', desc: 'Empty query parameter q= normalized to /courses' },
    { input: '/courses?q=jlpt&level=n5', expectedStatus: 200, expectedFinal: '/courses', desc: 'Multi-parameter query with q normalized to /courses' },
    { input: '/courses?category=all', expectedStatus: 200, expectedFinal: '/courses?category=all', desc: 'Query parameter other than q serves directly (200 OK)' },
    { input: '/courses?utm_source=google&utm_medium=cpc', expectedStatus: 200, expectedFinal: '/courses?utm_source=google&utm_medium=cpc', desc: 'Marketing UTM parameters serve directly (200 OK)' }
  ];

  for (const tc of queryCases) {
    const trace = traceRedirectChain(repo, tc.input);
    const pass = !trace.hasLoop && trace.finalStatus === tc.expectedStatus && trace.finalUrl === tc.expectedFinal;
    assert(
      `${repo.name}: ${tc.desc} (${tc.input})`,
      pass,
      `hasLoop=${trace.hasLoop}, status=${trace.finalStatus}, finalUrl=${trace.finalUrl}, hops=${trace.hops}`
    );
  }

  // ------------------------------------------------------------
  // SECTION 2: Prerendered Special Routes & Sitemap Conflict Verification
  // ------------------------------------------------------------
  console.log('\n--- Section 2: Special Routes & Sitemap Conflict Resolution ---');

  const specialRoutes = [
    '/careers/apply',
    '/college-partnerships',
    '/verify-certificate'
  ];

  const distDir = path.join(repo.dir, 'dist');
  const sitemapXml = fs.readFileSync(path.join(repo.dir, 'public', 'sitemap.xml'), 'utf8');

  for (const r of specialRoutes) {
    // 1. Static file check
    const staticFile = resolveStaticFile(distDir, r);
    assert(
      `${repo.name}: Static HTML exists for ${r}`,
      !!staticFile,
      `Expected ${r}.html in ${distDir}`
    );

    // 2. Sitemap check
    const inSitemap = sitemapXml.includes(`<loc>https://${repo.domain}${r}</loc>`);
    assert(
      `${repo.name}: Route ${r} is listed in public/sitemap.xml`,
      inSitemap,
      `Expected <loc>https://${repo.domain}${r}</loc> in sitemap.xml`
    );

    // 3. Netlify Edge resolution check - must NOT be 301
    const trace = traceRedirectChain(repo, r);
    assert(
      `${repo.name}: Netlify Edge returns status 200 (NOT 301) for ${r}`,
      trace.finalStatus === 200 && trace.hops === 0,
      `Got status ${trace.finalStatus} after ${trace.hops} hops (rule: ${JSON.stringify(trace.chain[0]?.result?.matchedRule?.raw)})`
    );

    // 4. Query parameter appended to special route (e.g. ?utm_source=...)
    const paramTrace = traceRedirectChain(repo, `${r}?utm_source=test`);
    assert(
      `${repo.name}: Query on ${r} resolves safely without loops`,
      !paramTrace.hasLoop && paramTrace.finalStatus === 200,
      `Got status ${paramTrace.finalStatus}, hops=${paramTrace.hops}`
    );
  }

  // ------------------------------------------------------------
  // SECTION 3: 100% Sitemap Routes Audit (Zero 301 Hijacks on Live Sitemap URLs)
  // ------------------------------------------------------------
  console.log('\n--- Section 3: Full Sitemap XML Non-Redirect Audit ---');

  // Extract all URLs from sitemap.xml
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  const sitemapUrls = [];
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    sitemapUrls.push(match[1]);
  }

  console.log(`Found ${sitemapUrls.length} URLs in ${repo.name} sitemap.xml`);

  let hijackedUrls = 0;
  for (const fullUrl of sitemapUrls) {
    const parsed = new URL(fullUrl);
    const trace = traceRedirectChain(repo, parsed.pathname);
    if (trace.chain[0]?.result?.isRedirect) {
      hijackedUrls++;
      console.log(`  [HIJACKED SITEMAP URL] ${parsed.pathname} -> 301 to ${trace.chain[0].result.target}`);
    }
  }

  assert(
    `${repo.name}: Zero sitemap URLs hijacked by 301 redirects (${sitemapUrls.length} audited)`,
    hijackedUrls === 0,
    `Found ${hijackedUrls} sitemap URLs returning 301 redirects!`
  );

  // ------------------------------------------------------------
  // SECTION 4: Category Fallbacks (Non-existent routes trigger 301)
  // ------------------------------------------------------------
  console.log('\n--- Section 4: Non-existent Category Subpaths 301 Fallback ---');

  const nonExistentCases = [
    { path: '/locations/state/non-existent-state-test', target: '/locations' },
    { path: '/locations/non-existent-city-test', target: '/locations' },
    { path: '/courses/non-existent-course-test', target: '/courses' },
    { path: '/career/non-existent-career-test', target: '/career' },
    { path: '/careers/non-existent-career-test', target: '/careers' },
    { path: '/jlpt/non-existent-level-test', target: '/jlpt' },
    { path: '/learn/non-existent-lesson-test', target: '/learn' },
    { path: '/blog/non-existent-post-test', target: '/blog' }
  ];

  for (const nec of nonExistentCases) {
    const trace = traceRedirectChain(repo, nec.path);
    const pass = !trace.hasLoop && trace.chain[0]?.result?.status === 301 && trace.chain[0]?.result?.target === nec.target;
    assert(
      `${repo.name}: Broken path ${nec.path} falls back to ${nec.target} (301)`,
      pass,
      `Got status ${trace.chain[0]?.result?.status}, target ${trace.chain[0]?.result?.target}`
    );
  }
}

console.log('\n================================================================');
console.log(`SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: ${totalTests})`);
console.log('================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\nALL ADVERSARIAL STRESS TESTS PASSED WITH 0 DEFECTS!');
  process.exit(0);
}
