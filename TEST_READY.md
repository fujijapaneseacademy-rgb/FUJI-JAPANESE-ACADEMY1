# TEST READY: Dual-Track Automated E2E Verification Suite

**Date**: 2026-11-10T08:35:00Z  
**Author**: Test Writer Subagent (`teamwork_test_writer_e2e`)  
**Test Runner**: `scripts/verify-urls-e2e.cjs`  
**Working Directory**: `c:\Users\CSC\Documents\Fuji japanese`  
**Suite Status**: READY & OPERATIONAL (41 Red Baseline Failures Detected)

---

## 1. Executive Summary

An automated, opaque-box E2E HTTP verification test runner has been created at `scripts/verify-urls-e2e.cjs`. It directly probes both live domains (`https://fujijapaneseacademy.in` and `https://fujijapaneseacademy.com`) and evaluates all 130 assertions across 3 verification tiers.

The test suite establishes the definitive, un-faked acceptance gate for **Milestone 1 (Permanent Redirect Rules)**, **Milestone 2 (Build Regeneration & Deployment Sync)**, and **Milestone 3 (Dual-Domain E2E Verification)**.

---

## 2. Test Execution Command

Run the complete test suite with:
```bash
node scripts/verify-urls-e2e.cjs
```

### Advanced Execution Options:
```bash
# Run specific tier only
node scripts/verify-urls-e2e.cjs --tier=1
node scripts/verify-urls-e2e.cjs --tier=2
node scripts/verify-urls-e2e.cjs --tier=3

# Run with per-request verbose console output
node scripts/verify-urls-e2e.cjs --verbose

# Save machine-readable structured JSON report
node scripts/verify-urls-e2e.cjs --save-report=scripts/e2e-report.json

# Probe preview deployments or local dev servers
node scripts/verify-urls-e2e.cjs --domain-in=http://localhost:3000 --domain-com=http://localhost:3005
```

---

## 3. Test Tier Coverage & Acceptance Criteria

| Tier | Category | Count | Acceptance Criteria | Current Status |
|:---:|---|:---:|---|:---:|
| **Tier 1** | **Core Reference URLs (.in)** | 66 | 100% return HTTP 200 or 301/302; 0 return 404 | **66 / 66 PASSED (100%)** |
| **Tier 1** | **Core Reference URLs (.com)** | 40 | 100% return HTTP 200 or 301/302; 0 return 404 | **9 / 40 PASSED (31 return 404)** |
| **Tier 2** | **Malformed Query Normalization** | 2 | `/courses?q=%7Bsearch_term_string%7D` returns 200 or 301 to `/courses` | **2 / 2 PASSED (100%)** |
| **Tier 2** | **Parent Category 301 Fallbacks** | 10 | Unmatched subpaths in `/locations/*`, `/courses/*`, `/career/*`, `/learn/*`, `/blog/*` return 301 to parent | **0 / 10 PASSED (10 return 404)** |
| **Tier 2** | **Security Block Protection** | 6 | `/.env`, `/.env.production`, `/supabase/*` return HTTP 404 | **6 / 6 PASSED (100%)** |
| **Tier 3** | **Dual-Domain Independence** | 6 | Independent HTTP 200 homepages, 0 cross-domain redirects, self-referencing canonicals | **6 / 6 PASSED (100%)** |
| **Total** | **All Verification Assertions** | **130** | **Clean exit code 0; 0 unexpected 404s** | **89 PASSED / 41 FAILED** |

---

## 4. Live Baseline Execution Results

Execution command run:
```bash
node scripts/verify-urls-e2e.cjs --save-report=scripts/e2e-report.json
```

**Observed Output**:
- **Total Assertions Executed**: 130
- **Passed Assertions**: 89
- **Failed Assertions**: 41
- **Execution Duration**: 10.22 seconds
- **Exit Code**: 1 (Strict Failure Gate)

### 4.1 Passed Features
1. **`fujijapaneseacademy.in` Live Pages**: All 66 reported URLs on `.in` resolve with HTTP 200 OK without a single 404 error.
2. **Malformed Query String Handling**: Both `https://fujijapaneseacademy.in/courses?q=%7Bsearch_term_string%7D` and `https://fujijapaneseacademy.com/courses?q=%7Bsearch_term_string%7D` successfully resolve with status 200 without throwing 404s.
3. **Security Blocking**: Direct access to `/.env`, `/.env.production`, and `/supabase/config.toml` is blocked and safely returns 404 on both domains.
4. **Domain Independence & Canonical Tags**: Both domains serve active homepages (HTTP 200), do not redirect to each other, and maintain self-referencing canonical tags (`https://fujijapaneseacademy.in/` and `https://fujijapaneseacademy.com/`).

---

## 5. Escalated Defects for Milestone Workers

The 41 failures represent two distinct implementation gaps that must be resolved by M1 and M2 workers:

### Defect Group A: 31 Production 404s on `fujijapaneseacademy.com` (Requires M2 Deployment)
The following 31 URLs currently return HTTP 404 Not Found on the live `.com` site because the active Netlify deploy is dated `2026-10-22` (52 pages) whereas all 93 static pages were generated on `2026-11-02` in `fuji-japanese-institute/dist/`:
- `https://fujijapaneseacademy.com/locations/kozhikode`
- `https://fujijapaneseacademy.com/locations/krishnagiri`
- `https://fujijapaneseacademy.com/locations/hyderabad`
- `https://fujijapaneseacademy.com/college-partnerships`
- `https://fujijapaneseacademy.com/locations/state/kerala`
- `https://fujijapaneseacademy.com/locations/mumbai`
- `https://fujijapaneseacademy.com/locations/hosur`
- `https://fujijapaneseacademy.com/locations/gurugram`
- `https://fujijapaneseacademy.com/locations/state/tamil-nadu`
- `https://fujijapaneseacademy.com/locations/karur`
- `https://fujijapaneseacademy.com/locations/visakhapatnam`
- `https://fujijapaneseacademy.com/locations/state/karnataka`
- `https://fujijapaneseacademy.com/verify-certificate`
- `https://fujijapaneseacademy.com/locations/salem`
- `https://fujijapaneseacademy.com/locations/hubballi`
- `https://fujijapaneseacademy.com/locations/thrissur`
- `https://fujijapaneseacademy.com/locations/ahmedabad`
- `https://fujijapaneseacademy.com/locations/madurai`
- `https://fujijapaneseacademy.com/locations/osaka`
- `https://fujijapaneseacademy.com/locations/kochi`
- `https://fujijapaneseacademy.com/careers/apply`
- `https://fujijapaneseacademy.com/locations/state/west-bengal-gujarat`
- `https://fujijapaneseacademy.com/locations/delhi`
- `https://fujijapaneseacademy.com/locations/mysuru`
- `https://fujijapaneseacademy.com/locations/kolkata`
- `https://fujijapaneseacademy.com/locations/nagpur`
- `https://fujijapaneseacademy.com/locations/trivandrum`
- `https://fujijapaneseacademy.com/locations/state/maharashtra`
- `https://fujijapaneseacademy.com/locations/vijayawada`
- `https://fujijapaneseacademy.com/locations/state/telangana-andhra`
- `https://fujijapaneseacademy.com/locations/pune`

**Action for M2 Worker**: Trigger a production build and deploy `fuji-japanese-institute/dist` to Netlify site `b39eb270-bd41-48f5-975f-261bce3511d5`.

### Defect Group B: 10 Missing Category 301 Fallbacks (Requires M1 Rules)
Non-existent subpaths currently fall through to the catch-all `/* /404.html 404` instead of redirecting 301 to their parent category:
- `https://fujijapaneseacademy.in/locations/nonexistent-test-locality` -> 404 (Expected: 301 to `/locations`)
- `https://fujijapaneseacademy.in/courses/nonexistent-test-course` -> 404 (Expected: 301 to `/courses`)
- `https://fujijapaneseacademy.in/career/nonexistent-test-career` -> 404 (Expected: 301 to `/career`)
- `https://fujijapaneseacademy.in/learn/nonexistent-test-path` -> 404 (Expected: 301 to `/learn`)
- `https://fujijapaneseacademy.in/blog/nonexistent-test-article` -> 404 (Expected: 301 to `/blog`)
- `https://fujijapaneseacademy.com/locations/nonexistent-test-locality` -> 404 (Expected: 301 to `/locations`)
- `https://fujijapaneseacademy.com/courses/nonexistent-test-course` -> 404 (Expected: 301 to `/courses`)
- `https://fujijapaneseacademy.com/career/nonexistent-test-career` -> 404 (Expected: 301 to `/career`)
- `https://fujijapaneseacademy.com/learn/nonexistent-test-path` -> 404 (Expected: 301 to `/learn`)
- `https://fujijapaneseacademy.com/blog/nonexistent-test-article` -> 404 (Expected: 301 to `/blog`)

**Action for M1 Worker**: Add the following redirect rules into `public/_redirects` and `netlify.toml` in both repositories (placed immediately before the `/* /404.html 404` catch-all):
```redirects
# Parent Category 301 Fallback Redirects
/locations/state/*   /locations   301
/locations/*         /locations   301
/courses/*           /courses     301
/career/*            /career      301
/careers/*           /careers     301
/jlpt/*              /jlpt        301
/learn/*             /learn       301
/blog/*              /blog        301
```

---

## 6. Verification Gate

The E2E test suite is fully wired to exit with code 0 **only** when:
1. Every URL in Tier 1 returns 200 or 301/302 (0 404s).
2. Every test in Tier 2 passes (0 404s on fallback paths, 404 only on security paths).
3. Every test in Tier 3 passes (both domains independent, no wholesale redirection).

Implementers and reviewers can run `node scripts/verify-urls-e2e.cjs` to confirm readiness for final sign-off.
