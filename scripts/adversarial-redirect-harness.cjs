#!/usr/bin/env node
/**
 * scripts/adversarial-redirect-harness.cjs
 *
 * Empirical Challenger Test Harness for Milestone 1
 * Simulates Netlify Edge redirect resolution against real dist/ filesystem
 * across both codebases: fuji-japanese-in and fuji-japanese-institute.
 */

const fs = require('fs');
const path = require('path');

const REPOS = {
  in: {
    name: 'fuji-japanese-in',
    root: path.resolve(__dirname, '..', 'fuji-japanese-in'),
    redirectsPath: path.resolve(__dirname, '..', 'fuji-japanese-in', 'public', '_redirects'),
    distRedirectsPath: path.resolve(__dirname, '..', 'fuji-japanese-in', 'dist', '_redirects'),
    tomlPath: path.resolve(__dirname, '..', 'fuji-japanese-in', 'netlify.toml'),
    distDir: path.resolve(__dirname, '..', 'fuji-japanese-in', 'dist'),
    sitemapPath: path.resolve(__dirname, '..', 'fuji-japanese-in', 'dist', 'sitemap.xml')
  },
  com: {
    name: 'fuji-japanese-institute',
    root: path.resolve(__dirname, '..', 'fuji-japanese-institute'),
    redirectsPath: path.resolve(__dirname, '..', 'fuji-japanese-institute', 'public', '_redirects'),
    distRedirectsPath: path.resolve(__dirname, '..', 'fuji-japanese-institute', 'dist', '_redirects'),
    tomlPath: path.resolve(__dirname, '..', 'fuji-japanese-institute', 'netlify.toml'),
    distDir: path.resolve(__dirname, '..', 'fuji-japanese-institute', 'dist'),
    sitemapPath: path.resolve(__dirname, '..', 'fuji-japanese-institute', 'dist', 'sitemap.xml')
  }
};

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

    // Tokens split by whitespace
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;

    let from = parts[0];
    let to = parts[1];
    let status = 301;
    let force = false;
    let queryParams = {};

    let statusIndex = -1;
    // Check if parts[1] is a query parameter e.g. "q=:param"
    if (parts[1] && parts[1].includes('=')) {
      const qTokens = parts[1].split('=');
      queryParams[qTokens[0]] = qTokens[1];
      to = parts[2];
      statusIndex = 3;
    } else {
      statusIndex = 2;
    }

    if (parts[statusIndex]) {
      const rawStatus = parts[statusIndex];
      if (rawStatus.endsWith('!')) {
        force = true;
        status = parseInt(rawStatus.slice(0, -1), 10);
      } else {
        status = parseInt(rawStatus, 10);
      }
    }

    rules.push({
      raw: line,
      from,
      to,
      status: status || 301,
      force,
      queryParams
    });
  }
  return rules;
}

/**
 * Check if a route matches a Netlify pattern
 */
function matchesPattern(fromPattern, requestPath) {
  if (fromPattern === requestPath) return true;

  // Wildcard splat e.g. /locations/* or /*
  if (fromPattern.endsWith('/*')) {
    const prefix = fromPattern.slice(0, -2);
    if (requestPath.startsWith(prefix + '/')) return true;
    if (prefix === '' && requestPath.startsWith('/')) return true;
  }

  // Trailing star wildcard e.g. /.env*
  if (fromPattern.endsWith('*')) {
    const prefix = fromPattern.slice(0, -1);
    if (requestPath.startsWith(prefix)) return true;
  }

  return false;
}

/**
 * Simulate Netlify Edge request resolution
 */
function simulateNetlifyResolution(repoConfig, requestUrl) {
  const parsed = new URL(requestUrl, 'https://example.com');
  const pathname = parsed.pathname;
  const searchParams = parsed.searchParams;

  // 1. Check if static HTML file exists in dist
  const distDir = repoConfig.distDir;
  let staticFileExists = false;
  let staticFilePath = null;

  if (pathname === '/') {
    staticFilePath = path.join(distDir, 'index.html');
  } else {
    // Try pathname + '.html'
    const cleanPath = pathname.replace(/^\/+/, '');
    const directHtml = path.join(distDir, cleanPath + '.html');
    const indexHtml = path.join(distDir, cleanPath, 'index.html');
    if (fs.existsSync(directHtml)) {
      staticFilePath = directHtml;
    } else if (fs.existsSync(indexHtml)) {
      staticFilePath = indexHtml;
    }
  }

  if (staticFilePath && fs.existsSync(staticFilePath)) {
    staticFileExists = true;
  }

  // 2. Load redirect rules from public/_redirects
  const rules = parseRedirectsFile(repoConfig.redirectsPath);

  // 3. Evaluate rules top to bottom
  for (const rule of rules) {
    // Check query params condition if rule specifies any
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
      // If static file exists, does this rule force override?
      if (staticFileExists && !rule.force) {
        // Unforced redirect rule DOES NOT shadow existing static file!
        // Netlify continues checking or serves static file
        continue;
      }

      // Rule fires!
      return {
        matchedRule: rule,
        action: rule.status === 200 ? 'REWRITE_200' : (rule.status === 404 ? 'CUSTOM_404' : `REDIRECT_${rule.status}`),
        status: rule.status,
        target: rule.to,
        forced: rule.force,
        fileServed: rule.status === 200 ? rule.to : null,
        staticFileExisted: staticFileExists
      };
    }
  }

  // If no forced rule fired, and static file exists:
  if (staticFileExists) {
    return {
      matchedRule: null,
      action: 'SERVE_STATIC_FILE',
      status: 200,
      target: pathname,
      forced: false,
      fileServed: staticFilePath,
      staticFileExisted: true
    };
  }

  // Default fallback if no file and no rule: 404
  return {
    matchedRule: null,
    action: 'NOT_FOUND_DEFAULT',
    status: 404,
    target: '/404.html',
    forced: false,
    fileServed: null,
    staticFileExisted: false
  };
}

// ==========================================
// RUN ADVERSARIAL TEST SUITE
// ==========================================

console.log('================================================================');
console.log('  EMPIRICAL CHALLENGER ADVERSARIAL TEST SUITE (MILESTONE 1)     ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function assertTest(name, condition, details) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } else {
    failedTests++;
    console.log(`  [FAIL] ${name}`);
    console.log(`         Details: ${details}`);
    findings.push({ name, details });
  }
}

for (const [key, repo] of Object.entries(REPOS)) {
  console.log(`\n--- Testing Codebase: ${repo.name} (${key.toUpperCase()}) ---`);

  // Challenge 1: Valid static routes under category prefixes must return 200 (NOT redirect)
  const categoryRoutes = [
    '/locations/mumbai',
    '/locations/delhi',
    '/locations/bangalore',
    '/locations/chennai',
    '/locations/hyderabad',
    '/courses/jlpt-n5',
    '/courses/jlpt-n4',
    '/courses/jlpt-n3',
    '/courses/spoken-japanese',
    '/courses/business-japanese',
    '/career/working-in-japan',
    '/career/japanese-jobs',
    '/learn/hiragana-katakana',
    '/learn/kanji',
    '/learn/vocabulary',
    '/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score'
  ];

  console.log('\n  [Group 1] Static routes under category prefixes:');
  for (const route of categoryRoutes) {
    const res = simulateNetlifyResolution(repo, route);
    assertTest(
      `${repo.name}: ${route} serves static file (200 OK)`,
      res.status === 200 && res.action === 'SERVE_STATIC_FILE',
      `Expected SERVE_STATIC_FILE 200, got ${res.action} status ${res.status} target ${res.target}`
    );
  }

  // Challenge 2: Non-existent subpaths must trigger 301 fallback to category parent
  console.log('\n  [Group 2] Non-existent subpaths trigger 301 category fallback:');
  const nonExistentCases = [
    { path: '/locations/fake-city-test-123', expectedTarget: '/locations' },
    { path: '/locations/state/fake-state-456', expectedTarget: '/locations' },
    { path: '/courses/fake-course-test-789', expectedTarget: '/courses' },
    { path: '/career/fake-career-test-abc', expectedTarget: '/career' },
    { path: '/careers/fake-career-test-def', expectedTarget: '/careers' },
    { path: '/jlpt/fake-jlpt-level-ghi', expectedTarget: '/jlpt' },
    { path: '/learn/fake-lesson-test-jkl', expectedTarget: '/learn' },
    { path: '/blog/fake-article-test-mno', expectedTarget: '/blog' }
  ];

  for (const tc of nonExistentCases) {
    const res = simulateNetlifyResolution(repo, tc.path);
    assertTest(
      `${repo.name}: ${tc.path} redirects 301 to ${tc.expectedTarget}`,
      res.status === 301 && res.target === tc.expectedTarget,
      `Expected 301 to ${tc.expectedTarget}, got status ${res.status} target ${res.target} (action: ${res.action})`
    );
  }

  // Challenge 3: Security blocks must hit 404 security rules (not wildcard or leak)
  console.log('\n  [Group 3] Security rules block dotfiles and sensitive paths:');
  const securityPaths = [
    '/.env',
    '/.env.local',
    '/.env.production',
    '/.env.backup',
    '/supabase/config.toml',
    '/scripts/prerender.js'
  ];

  for (const secPath of securityPaths) {
    const res = simulateNetlifyResolution(repo, secPath);
    assertTest(
      `${repo.name}: ${secPath} returns 404 security block`,
      res.status === 404 && res.target === '/404.html',
      `Expected 404 to /404.html, got status ${res.status} target ${res.target}`
    );
  }

  // Challenge 4: Query parameter normalization
  console.log('\n  [Group 4] Query parameter normalization:');
  const queryUrl = '/courses?q=%7Bsearch_term_string%7D';
  const queryRes = simulateNetlifyResolution(repo, queryUrl);
  console.log(`    Result for ${queryUrl}: action=${queryRes.action}, status=${queryRes.status}, target=${queryRes.target}`);

  // Challenge 5: Prerendered Special Routes (/careers/apply, /college-partnerships, /verify-certificate)
  console.log('\n  [Group 5] Prerendered Special Routes Integrity:');
  const specialRoutes = [
    { path: '/careers/apply', sitemapExpected: true },
    { path: '/college-partnerships', sitemapExpected: true },
    { path: '/verify-certificate', sitemapExpected: true }
  ];

  for (const sp of specialRoutes) {
    const res = simulateNetlifyResolution(repo, sp.path);
    // Check if file exists in dist
    const directHtml = path.join(repo.distDir, sp.path.replace(/^\/+/, '') + '.html');
    const fileExists = fs.existsSync(directHtml);

    // Check if present in sitemap
    let inSitemap = false;
    if (fs.existsSync(repo.sitemapPath)) {
      const sitemap = fs.readFileSync(repo.sitemapPath, 'utf8');
      inSitemap = sitemap.includes(sp.path);
    }

    console.log(`    ${repo.name} ${sp.path}: HTML exists=${fileExists}, in sitemap=${inSitemap}, netlify action=${res.action}, status=${res.status}, target=${res.target}`);

    if (fileExists && inSitemap) {
      assertTest(
        `${repo.name}: ${sp.path} has static HTML + in sitemap -> should NOT be hijacked by 301!`,
        res.status === 200,
        `Page exists in dist and sitemap, but Netlify forces 301 redirect to '${res.target}' because of rule '${res.matchedRule?.raw}'`
      );
    }
  }
}

console.log('\n================================================================');
console.log(`  EXECUTION SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: ${totalTests})`);
console.log('================================================================');

if (findings.length > 0) {
  console.log('\nCONFIRMED DEFECTS / ADVERSARIAL FINDINGS:');
  for (const f of findings) {
    console.log(`  - ${f.name}: ${f.details}`);
  }
}
