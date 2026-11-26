#!/usr/bin/env node
/**
 * verify-urls-e2e.cjs
 *
 * Automated Dual-Domain E2E Verification Test Runner for Fuji Japanese Academy
 * Domains: https://fujijapaneseacademy.in and https://fujijapaneseacademy.com
 *
 * Tiers:
 *  - Tier 1: 106 Core Production Reference URLs (66 on .in, 40 on .com)
 *            Acceptance: 100% resolve with status 200 or 301/302; 0 return 404.
 *  - Tier 2: Boundary & Corner Cases (Malformed queries, Category 301 fallbacks, Security blocks)
 *  - Tier 3: Dual-Domain Independence (Independent 200s, no wholesale cross-redirection, self-referencing canonicals)
 *
 * Usage:
 *  node scripts/verify-urls-e2e.cjs
 *  node scripts/verify-urls-e2e.cjs --tier=1
 *  node scripts/verify-urls-e2e.cjs --tier=2
 *  node scripts/verify-urls-e2e.cjs --tier=3
 *  node scripts/verify-urls-e2e.cjs --verbose
 *  node scripts/verify-urls-e2e.cjs --save-report=e2e-report.json
 */

const fs = require('fs');
const path = require('path');

// ==========================================
// CONFIGURATION & CLI ARGUMENT PARSING
// ==========================================

const args = process.argv.slice(2);
const options = {
  tier: 'all',
  concurrency: 6,
  timeout: 10000,
  verbose: false,
  json: false,
  saveReport: null,
  retries: 1,
  domainIn: 'https://fujijapaneseacademy.in',
  domainCom: 'https://fujijapaneseacademy.com',
};

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    options.tier = arg.split('=')[1].toLowerCase();
  } else if (arg.startsWith('--concurrency=')) {
    options.concurrency = parseInt(arg.split('=')[1], 10) || 6;
  } else if (arg.startsWith('--timeout=')) {
    options.timeout = parseInt(arg.split('=')[1], 10) || 10000;
  } else if (arg.startsWith('--domain-in=')) {
    options.domainIn = arg.split('=')[1].replace(/\/+$/, '');
  } else if (arg.startsWith('--domain-com=')) {
    options.domainCom = arg.split('=')[1].replace(/\/+$/, '');
  } else if (arg.startsWith('--save-report=')) {
    options.saveReport = arg.split('=')[1];
  } else if (arg === '--verbose' || arg === '-v') {
    options.verbose = true;
  } else if (arg === '--json') {
    options.json = true;
  } else if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
Fuji Japanese Academy — Dual-Domain E2E Verification Runner

Usage: node scripts/verify-urls-e2e.cjs [options]

Options:
  --tier=1|2|3|all       Run specific tier (default: all)
  --domain-in=<url>      Override base URL for .in (default: https://fujijapaneseacademy.in)
  --domain-com=<url>     Override base URL for .com (default: https://fujijapaneseacademy.com)
  --concurrency=<num>    Concurrent HTTP requests (default: 6)
  --timeout=<ms>         Per-request timeout in milliseconds (default: 10000)
  --save-report=<path>   Save structured JSON test results to specified path
  --verbose, -v          Print per-URL detailed status during execution
  --json                 Output only JSON to stdout
  --help, -h             Display this help message
`);
}

// ANSI colors
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

// ==========================================
// TEST DATA DEFINITION
// ==========================================

// 66 Reported URLs for fujijapaneseacademy.in
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
  'https://fujijapaneseacademy.in/privacy-policy'
];

// 40 Reported URLs for fujijapaneseacademy.com
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
  'https://fujijapaneseacademy.com/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score'
];

// Tier 2: Boundary & Corner Cases
const TIER2_CASES = [
  // Malformed Queries
  {
    name: 'Malformed search placeholder query (.in)',
    url: 'https://fujijapaneseacademy.in/courses?q=%7Bsearch_term_string%7D',
    type: 'query-normalization',
    expectedStatus: [200, 301, 302],
    expectedTarget: '/courses', // if redirected
  },
  {
    name: 'Malformed search placeholder query (.com)',
    url: 'https://fujijapaneseacademy.com/courses?q=%7Bsearch_term_string%7D',
    type: 'query-normalization',
    expectedStatus: [200, 301, 302],
    expectedTarget: '/courses', // if redirected
  },
  // Parent Category Fallbacks on .in
  {
    name: 'Category fallback: non-existent locality subpath (.in)',
    url: 'https://fujijapaneseacademy.in/locations/nonexistent-test-locality',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/locations',
  },
  {
    name: 'Category fallback: non-existent course subpath (.in)',
    url: 'https://fujijapaneseacademy.in/courses/nonexistent-test-course',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/courses',
  },
  {
    name: 'Category fallback: non-existent career subpath (.in)',
    url: 'https://fujijapaneseacademy.in/career/nonexistent-test-career',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/career',
  },
  {
    name: 'Category fallback: non-existent learn subpath (.in)',
    url: 'https://fujijapaneseacademy.in/learn/nonexistent-test-path',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/learn',
  },
  {
    name: 'Category fallback: non-existent blog subpath (.in)',
    url: 'https://fujijapaneseacademy.in/blog/nonexistent-test-article',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/blog',
  },
  // Parent Category Fallbacks on .com
  {
    name: 'Category fallback: non-existent locality subpath (.com)',
    url: 'https://fujijapaneseacademy.com/locations/nonexistent-test-locality',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/locations',
  },
  {
    name: 'Category fallback: non-existent course subpath (.com)',
    url: 'https://fujijapaneseacademy.com/courses/nonexistent-test-course',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/courses',
  },
  {
    name: 'Category fallback: non-existent career subpath (.com)',
    url: 'https://fujijapaneseacademy.com/career/nonexistent-test-career',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/career',
  },
  {
    name: 'Category fallback: non-existent learn subpath (.com)',
    url: 'https://fujijapaneseacademy.com/learn/nonexistent-test-path',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/learn',
  },
  {
    name: 'Category fallback: non-existent blog subpath (.com)',
    url: 'https://fujijapaneseacademy.com/blog/nonexistent-test-article',
    type: 'category-fallback',
    expectedStatus: [301, 302],
    expectedTarget: '/blog',
  },
  // Security block protection (Should return 404)
  {
    name: 'Security block protection: .env (.in)',
    url: 'https://fujijapaneseacademy.in/.env',
    type: 'security-block',
    expectedStatus: [404],
  },
  {
    name: 'Security block protection: .env (.com)',
    url: 'https://fujijapaneseacademy.com/.env',
    type: 'security-block',
    expectedStatus: [404],
  },
  {
    name: 'Security block protection: .env.production (.in)',
    url: 'https://fujijapaneseacademy.in/.env.production',
    type: 'security-block',
    expectedStatus: [404],
  },
  {
    name: 'Security block protection: .env.production (.com)',
    url: 'https://fujijapaneseacademy.com/.env.production',
    type: 'security-block',
    expectedStatus: [404],
  },
  {
    name: 'Security block protection: /supabase/config.toml (.in)',
    url: 'https://fujijapaneseacademy.in/supabase/config.toml',
    type: 'security-block',
    expectedStatus: [404],
  },
  {
    name: 'Security block protection: /supabase/config.toml (.com)',
    url: 'https://fujijapaneseacademy.com/supabase/config.toml',
    type: 'security-block',
    expectedStatus: [404],
  },
];

// Tier 3: Dual-Domain Independence Cases
const TIER3_CASES = [
  {
    domain: 'https://fujijapaneseacademy.in',
    host: 'fujijapaneseacademy.in',
    otherHost: 'fujijapaneseacademy.com',
  },
  {
    domain: 'https://fujijapaneseacademy.com',
    host: 'fujijapaneseacademy.com',
    otherHost: 'fujijapaneseacademy.in',
  },
];

// ==========================================
// HTTP PROBE CORE ENGINE
// ==========================================

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

/**
 * Execute HTTP probe with direct inspection and redirect follow-through
 */
async function probeUrl(url, timeoutMs = options.timeout, retries = options.retries) {
  let attempt = 0;
  while (attempt <= retries) {
    const startTime = Date.now();
    try {
      // 1. Direct manual probe (inspect raw status & location)
      const directController = AbortSignal.timeout(timeoutMs);
      const directRes = await fetch(url, {
        method: 'GET',
        redirect: 'manual',
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: directController,
      });

      const directStatus = directRes.status;
      const directLocation = directRes.headers.get('location') || null;
      let finalStatus = directStatus;
      let finalUrl = url;
      let responseBodySnippet = '';

      // 2. If redirected, follow redirect to inspect final target resolution
      if ([301, 302, 307, 308].includes(directStatus)) {
        try {
          const followController = AbortSignal.timeout(timeoutMs);
          const followRes = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            headers: {
              'User-Agent': USER_AGENT,
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            signal: followController,
          });
          finalStatus = followRes.status;
          finalUrl = followRes.url;
          if (finalStatus === 200 && !url.includes('.ico')) {
            try {
              const text = await followRes.text();
              responseBodySnippet = text.slice(0, 20000);
            } catch (_) {}
          }
        } catch (followErr) {
          finalStatus = `FOLLOW_ERR: ${followErr.message}`;
        }
      } else if (directStatus === 200 && !url.includes('.ico')) {
        try {
          const text = await directRes.text();
          responseBodySnippet = text.slice(0, 20000);
        } catch (_) {}
      }

      return {
        url,
        directStatus,
        directLocation,
        finalStatus,
        finalUrl,
        responseBodySnippet,
        durationMs: Date.now() - startTime,
        error: null,
      };
    } catch (err) {
      if (attempt < retries) {
        attempt++;
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      return {
        url,
        directStatus: 0,
        directLocation: null,
        finalStatus: 0,
        finalUrl: url,
        responseBodySnippet: '',
        durationMs: Date.now() - startTime,
        error: err.name === 'TimeoutError' ? 'TIMEOUT' : err.message,
      };
    }
  }
}

/**
 * Concurrency worker pool runner
 */
async function runConcurrentPool(items, workerFn, concurrency) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const idx = nextIndex++;
      results[idx] = await workerFn(items[idx], idx);
    }
  }

  const workers = [];
  const limit = Math.min(concurrency, items.length);
  for (let i = 0; i < limit; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);
  return results;
}

function mapUrl(url) {
  if (url.startsWith('https://fujijapaneseacademy.in')) {
    return url.replace('https://fujijapaneseacademy.in', options.domainIn);
  }
  if (url.startsWith('https://fujijapaneseacademy.com')) {
    return url.replace('https://fujijapaneseacademy.com', options.domainCom);
  }
  return url;
}

async function executeTier1() {
  const tierResults = {
    name: 'Tier 1: Core Reference URLs Resolution (106 URLs)',
    total: 0,
    passed: 0,
    failed: 0,
    inDomain: { total: URLS_IN.length, passed: 0, failed: 0, 404: 0 },
    comDomain: { total: URLS_COM.length, passed: 0, failed: 0, 404: 0 },
    failures: [],
    details: [],
  };

  const allItems = [
    ...URLS_IN.map((u) => ({ url: mapUrl(u), originalUrl: u, domain: 'in' })),
    ...URLS_COM.map((u) => ({ url: mapUrl(u), originalUrl: u, domain: 'com' })),
  ];
  tierResults.total = allItems.length;

  if (!options.json) {
    console.log(`\n${colors.bright}${colors.blue}=== TIER 1: Probing 106 Core Reference URLs (${URLS_IN.length} on .in, ${URLS_COM.length} on .com) ===${colors.reset}`);
    console.log(`${colors.gray}Criteria: 100% resolve with status 200 or 301/302; 0 return 404.${colors.reset}\n`);
  }

  const probeResults = await runConcurrentPool(
    allItems,
    async (item, idx) => {
      const res = await probeUrl(item.url);
      res.domain = item.domain;
      res.testIndex = idx + 1;

      // Acceptance Criteria:
      // Must return direct 200 OR (direct 301/302 AND final 200)
      // Must NOT return 404 anywhere
      const is404 = res.directStatus === 404 || res.finalStatus === 404;
      const isOk =
        (res.directStatus === 200) ||
        ([301, 302, 307, 308].includes(res.directStatus) && res.finalStatus === 200);

      const passed = isOk && !is404 && !res.error;
      res.passed = passed;
      res.is404 = is404;

      if (!options.json && options.verbose) {
        const symbol = passed ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        const redir = res.directLocation ? `${colors.yellow} -> ${res.directLocation}${colors.reset}` : '';
        const dur = `${colors.gray}(${res.durationMs}ms)${colors.reset}`;
        console.log(` [${res.testIndex}/${allItems.length}] ${symbol} [${res.directStatus}] ${res.url}${redir} ${dur}`);
      }

      return res;
    },
    options.concurrency
  );

  for (const r of probeResults) {
    tierResults.details.push(r);
    const domainObj = r.domain === 'in' ? tierResults.inDomain : tierResults.comDomain;

    if (r.passed) {
      tierResults.passed++;
      domainObj.passed++;
    } else {
      tierResults.failed++;
      domainObj.failed++;
      if (r.is404) {
        domainObj[404]++;
      }
      tierResults.failures.push({
        url: r.url,
        domain: r.domain,
        directStatus: r.directStatus,
        directLocation: r.directLocation,
        finalStatus: r.finalStatus,
        error: r.error || (r.is404 ? 'HTTP 404 Not Found' : `Unexpected status ${r.directStatus}`),
      });
    }
  }

  return tierResults;
}

async function executeTier2() {
  const tierResults = {
    name: 'Tier 2: Boundary & Corner Cases',
    total: TIER2_CASES.length,
    passed: 0,
    failed: 0,
    failures: [],
    details: [],
  };

  if (!options.json) {
    console.log(`\n${colors.bright}${colors.blue}=== TIER 2: Boundary & Corner Cases (${TIER2_CASES.length} Tests) ===${colors.reset}`);
    console.log(`${colors.gray}Includes: Malformed queries, parent category 301 fallbacks, security block protection.${colors.reset}\n`);
  }

  const results = await runConcurrentPool(
    TIER2_CASES,
    async (testCase, idx) => {
      const targetUrl = mapUrl(testCase.url);
      const probeRes = await probeUrl(targetUrl);
      let passed = false;
      let failureReason = null;

      if (testCase.type === 'query-normalization') {
        // Must resolve with 200 or 301/302 to expectedTarget
        if (probeRes.directStatus === 200) {
          passed = true;
        } else if ([301, 302].includes(probeRes.directStatus)) {
          const loc = probeRes.directLocation || '';
          if (loc.startsWith(testCase.expectedTarget) && probeRes.finalStatus === 200) {
            passed = true;
          } else {
            failureReason = `Redirected to ${loc} with final status ${probeRes.finalStatus}, expected ${testCase.expectedTarget}`;
          }
        } else {
          failureReason = `Expected status 200 or 301, got direct status ${probeRes.directStatus}`;
        }
      } else if (testCase.type === 'category-fallback') {
        // Must return 301 or 302 redirecting to parent category, and finalStatus 200
        if ([301, 302].includes(probeRes.directStatus)) {
          const loc = probeRes.directLocation || '';
          if (loc === testCase.expectedTarget || loc.startsWith(testCase.expectedTarget)) {
            if (probeRes.finalStatus === 200) {
              passed = true;
            } else {
              failureReason = `Redirect target ${loc} resolved to ${probeRes.finalStatus}, expected 200`;
            }
          } else {
            failureReason = `Redirect location ${loc} does not match expected parent ${testCase.expectedTarget}`;
          }
        } else {
          failureReason = `Expected 301/302 fallback redirect to ${testCase.expectedTarget}, got status ${probeRes.directStatus}`;
        }
      } else if (testCase.type === 'security-block') {
        // Must return 404
        if (probeRes.directStatus === 404 || probeRes.finalStatus === 404) {
          passed = true;
        } else {
          failureReason = `Security test expected 404, got status ${probeRes.directStatus}`;
        }
      }

      const outcome = {
        name: testCase.name,
        url: testCase.url,
        type: testCase.type,
        passed,
        directStatus: probeRes.directStatus,
        directLocation: probeRes.directLocation,
        finalStatus: probeRes.finalStatus,
        finalUrl: probeRes.finalUrl,
        durationMs: probeRes.durationMs,
        failureReason,
      };

      if (!options.json && options.verbose) {
        const symbol = passed ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        console.log(` [T2-${idx + 1}] ${symbol} ${testCase.name} -> [${probeRes.directStatus}] ${failureReason ? `(${failureReason})` : 'OK'}`);
      }

      return outcome;
    },
    options.concurrency
  );

  for (const r of results) {
    tierResults.details.push(r);
    if (r.passed) {
      tierResults.passed++;
    } else {
      tierResults.failed++;
      tierResults.failures.push(r);
    }
  }

  return tierResults;
}

async function executeTier3() {
  const tierResults = {
    name: 'Tier 3: Dual-Domain Independence Verification',
    total: TIER3_CASES.length * 3, // Status check, Cross-redirect check, Canonical tag check
    passed: 0,
    failed: 0,
    failures: [],
    details: [],
  };

  if (!options.json) {
    console.log(`\n${colors.bright}${colors.blue}=== TIER 3: Dual-Domain Independence Verification ===${colors.reset}`);
    console.log(`${colors.gray}Ensuring both domains resolve active pages independently without wholesale redirection.${colors.reset}\n`);
  }

  for (const item of TIER3_CASES) {
    const activeDomainUrl = mapUrl(item.domain);
    const probeRes = await probeUrl(activeDomainUrl);
    const domainHost = new URL(activeDomainUrl).host;
    const otherDomainUrl = mapUrl(item.otherHost.includes('.com') ? 'https://fujijapaneseacademy.com' : 'https://fujijapaneseacademy.in');
    const otherHost = new URL(otherDomainUrl).host;

    // Test 1: Active 200 Response
    const activeTest = {
      name: `[${domainHost}] Serves active HTTP 200 homepage`,
      url: activeDomainUrl,
      passed: probeRes.directStatus === 200,
      actual: probeRes.directStatus,
      expected: 200,
    };
    tierResults.details.push(activeTest);
    if (activeTest.passed) tierResults.passed++;
    else {
      tierResults.failed++;
      tierResults.failures.push(activeTest);
    }

    // Test 2: No Cross-Domain Redirection
    let crossRedirect = false;
    if (probeRes.directLocation && probeRes.directLocation.includes(otherHost)) {
      crossRedirect = true;
    }
    if (probeRes.finalUrl && probeRes.finalUrl.includes(otherHost)) {
      crossRedirect = true;
    }
    const independenceTest = {
      name: `[${domainHost}] Domain does not redirect to ${otherHost}`,
      url: activeDomainUrl,
      passed: !crossRedirect,
      actual: crossRedirect ? `Redirects to ${otherHost}` : 'Independent domain',
      expected: 'No cross-domain redirection',
    };
    tierResults.details.push(independenceTest);
    if (independenceTest.passed) tierResults.passed++;
    else {
      tierResults.failed++;
      tierResults.failures.push(independenceTest);
    }

    // Test 3: Self-Referencing Canonical Tag
    const html = probeRes.responseBodySnippet || '';
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const canonicalHref = canonicalMatch ? canonicalMatch[1] : null;
    let canonicalValid = false;
    if (canonicalHref && canonicalHref.includes(domainHost) && !canonicalHref.includes(otherHost)) {
      canonicalValid = true;
    }
    const canonicalTest = {
      name: `[${domainHost}] Self-referencing canonical tag (${domainHost})`,
      url: activeDomainUrl,
      passed: canonicalValid,
      actual: canonicalHref || 'No canonical link found in initial markup',
      expected: `Canonical pointing to https://${domainHost}`,
    };
    tierResults.details.push(canonicalTest);
    if (canonicalTest.passed) tierResults.passed++;
    else {
      tierResults.failed++;
      tierResults.failures.push(canonicalTest);
    }

    if (!options.json && options.verbose) {
      console.log(` [T3] ${domainHost} -> Status 200: ${activeTest.passed ? '✓' : '✗'}, Independence: ${independenceTest.passed ? '✓' : '✗'}, Canonical: ${canonicalTest.passed ? '✓' : '✗'}`);
    }
  }

  return tierResults;
}

// ==========================================
// MAIN RUNNER & REPORT AGGREGATOR
// ==========================================

async function main() {
  const executionStartTime = Date.now();
  const report = {
    timestamp: new Date().toISOString(),
    runner: 'scripts/verify-urls-e2e.cjs',
    options,
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      status: 'PENDING',
      durationMs: 0,
    },
    tiers: {},
  };

  if (!options.json) {
    console.log(`${colors.bright}${colors.cyan}======================================================================${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}  FUJI JAPANESE ACADEMY — DUAL-TRACK AUTOMATED E2E TEST RUNNER        ${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}======================================================================${colors.reset}`);
    console.log(`Mode: Automated Network Probe | Concurrency: ${options.concurrency} | Timeout: ${options.timeout}ms`);
  }

  // Tier 1
  if (options.tier === 'all' || options.tier === '1') {
    report.tiers.tier1 = await executeTier1();
    report.summary.totalTests += report.tiers.tier1.total;
    report.summary.passed += report.tiers.tier1.passed;
    report.summary.failed += report.tiers.tier1.failed;
  }

  // Tier 2
  if (options.tier === 'all' || options.tier === '2') {
    report.tiers.tier2 = await executeTier2();
    report.summary.totalTests += report.tiers.tier2.total;
    report.summary.passed += report.tiers.tier2.passed;
    report.summary.failed += report.tiers.tier2.failed;
  }

  // Tier 3
  if (options.tier === 'all' || options.tier === '3') {
    report.tiers.tier3 = await executeTier3();
    report.summary.totalTests += report.tiers.tier3.total;
    report.summary.passed += report.tiers.tier3.passed;
    report.summary.failed += report.tiers.tier3.failed;
  }

  report.summary.durationMs = Date.now() - executionStartTime;
  report.summary.status = report.summary.failed === 0 ? 'PASSED' : 'FAILED';

  // Save report if requested
  if (options.saveReport) {
    const reportPath = path.resolve(process.cwd(), options.saveReport);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    if (!options.json) {
      console.log(`\n${colors.dim}Detailed test report written to: ${reportPath}${colors.reset}`);
    }
  }

  // JSON output mode
  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.summary.status === 'PASSED' ? 0 : 1);
  }

  // Console Summary Table
  console.log(`\n${colors.bright}${colors.cyan}======================================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}  FINAL E2E VERIFICATION TEST SUMMARY                                 ${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}======================================================================${colors.reset}`);
  console.log(`Total Assertions Executed : ${report.summary.totalTests}`);
  console.log(`Passed Assertions         : ${colors.green}${report.summary.passed}${colors.reset}`);
  console.log(`Failed Assertions         : ${report.summary.failed > 0 ? colors.red : colors.green}${report.summary.failed}${colors.reset}`);
  console.log(`Execution Duration        : ${(report.summary.durationMs / 1000).toFixed(2)}s`);

  if (report.tiers.tier1) {
    const t1 = report.tiers.tier1;
    console.log(`\n${colors.bright}--- Tier 1 Breakdown ---${colors.reset}`);
    console.log(`• fujijapaneseacademy.in  : ${t1.inDomain.passed}/${t1.inDomain.total} Passed (404 errors: ${t1.inDomain[404]})`);
    console.log(`• fujijapaneseacademy.com : ${t1.comDomain.passed}/${t1.comDomain.total} Passed (404 errors: ${t1.comDomain[404]})`);
  }

  if (report.tiers.tier2) {
    const t2 = report.tiers.tier2;
    console.log(`\n${colors.bright}--- Tier 2 Breakdown ---${colors.reset}`);
    console.log(`• Boundary & Corner Cases : ${t2.passed}/${t2.total} Passed (Failed: ${t2.failed})`);
  }

  if (report.tiers.tier3) {
    const t3 = report.tiers.tier3;
    console.log(`\n${colors.bright}--- Tier 3 Breakdown ---${colors.reset}`);
    console.log(`• Domain Independence     : ${t3.passed}/${t3.total} Passed (Failed: ${t3.failed})`);
  }

  // Failure Diagnostics
  if (report.summary.failed > 0) {
    console.log(`\n${colors.bright}${colors.red}======================================================================${colors.reset}`);
    console.log(`${colors.bright}${colors.red}  DEFECT IDENTIFICATION & FAILURE DIAGNOSTICS (${report.summary.failed} failures)         ${colors.reset}`);
    console.log(`${colors.bright}${colors.red}======================================================================${colors.reset}`);

    if (report.tiers.tier1 && report.tiers.tier1.failures.length > 0) {
      console.log(`\n${colors.red}${colors.bright}[Tier 1 URL Failures / 404s]${colors.reset}`);
      for (const fail of report.tiers.tier1.failures) {
        console.log(`  • [${fail.directStatus}] ${fail.url} — ${fail.error}`);
      }
    }

    if (report.tiers.tier2 && report.tiers.tier2.failures.length > 0) {
      console.log(`\n${colors.red}${colors.bright}[Tier 2 Boundary / Redirection Failures]${colors.reset}`);
      for (const fail of report.tiers.tier2.failures) {
        console.log(`  • ${fail.name} (${fail.url}) -> ${fail.failureReason}`);
      }
    }

    if (report.tiers.tier3 && report.tiers.tier3.failures.length > 0) {
      console.log(`\n${colors.red}${colors.bright}[Tier 3 Independence Failures]${colors.reset}`);
      for (const fail of report.tiers.tier3.failures) {
        console.log(`  • ${fail.name} -> Actual: ${fail.actual}, Expected: ${fail.expected}`);
      }
    }

    console.log(`\n${colors.red}Result: FAILED (Exit Code 1)${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.bright}${colors.green}Result: ALL CHECKS PASSED (Exit Code 0)${colors.reset}`);
    console.log(`100% of reported URLs resolve without 404s. Domain independence and redirects fully verified.\n`);
    process.exit(0);
  }
}

// Global execution
main().catch((err) => {
  console.error(`Fatal Test Runner Error: ${err.stack || err}`);
  process.exit(1);
});
