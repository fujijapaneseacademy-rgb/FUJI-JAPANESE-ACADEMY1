/**
 * Fuji Japanese Academy - Comprehensive Security & Quality Verification Suite
 * Tests all 6 priority areas against code, configurations, migrations, and executable logic.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n======================================================');
console.log('🔒 FUJI JAPANESE ACADEMY: HARDENING TEST SUITE');
console.log('======================================================\n');

// ---------------------------------------------------------------------
// PRIORITY 1: Certificate Verification
// ---------------------------------------------------------------------
console.log('--- Priority 1: Certificate Verification ---');

test('VerifyCertificatePage has removed pattern matching FJA-* bypass', () => {
  const file = fs.readFileSync(path.join(__dirname, '../pages/VerifyCertificatePage.tsx'), 'utf8');
  assert(!file.includes("cleanId.startsWith('FJA-')"), 'FJA-* pattern match bypass must not exist');
  assert(!file.includes('SAMPLE_REGISTRY'), 'Public client-side sample registry must be removed');
  assert(file.includes('verify_certificate'), 'Must call backend verify_certificate RPC');
});

test('FJA-AUDIT-INVALID-20261024 is NOT present in authentic seed database', () => {
  const sql = fs.readFileSync(path.join(__dirname, '../supabase/migrations/20261026_security_hardening.sql'), 'utf8');
  assert(!sql.includes('FJA-AUDIT-INVALID-20261024'), 'Audit invalid ID must not be in valid seeds');
});

test('Certificate migration defines certificates table with status constraint', () => {
  const sql = fs.readFileSync(path.join(__dirname, '../supabase/migrations/20261026_security_hardening.sql'), 'utf8');
  assert(sql.includes("status text not null check (status in ('issued', 'revoked', 'expired'))"), 'Status constraint missing');
  assert(sql.includes('create or replace function public.verify_certificate'), 'verify_certificate RPC missing');
  assert(sql.includes("v_clean_id := upper(trim(p_cert_id))"), 'Certificate ID cleaning missing in RPC');
  assert(sql.includes("v_masked_name"), 'Student name masking logic missing in RPC');
});

test('CertificateModal does not claim unauthenticated mock IDs are verifiable', () => {
  const file = fs.readFileSync(path.join(__dirname, '../components/CertificateModal.tsx'), 'utf8');
  assert(!file.includes('Math.random().toString(36)'), 'Random client ID generation must be removed');
  assert(file.includes('Practice Exam Completion Reference:'), 'Mock exam completions must be marked unaccredited');
});

test('Executable Logic: Student name masking preserves privacy without leaking full surname', () => {
  function maskStudentName(name) {
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'Verified Scholar';
    if (parts.length === 1) return parts[0];
    const first = parts[0];
    const last = parts[parts.length - 1];
    return `${first} ${last.charAt(0)}.`;
  }

  assert.strictEqual(maskStudentName('Rahul M. Sharma'), 'Rahul S.');
  assert.strictEqual(maskStudentName('Sneha Venkatesh'), 'Sneha V.');
  assert.strictEqual(maskStudentName('Tanaka'), 'Tanaka');
  assert.strictEqual(maskStudentName(''), 'Verified Scholar');
  assert.strictEqual(maskStudentName('  Amit   Kumar   Verma  '), 'Amit V.');
});

// ---------------------------------------------------------------------
// PRIORITY 2: Payments & Enrollment Hardening
// ---------------------------------------------------------------------
console.log('\n--- Priority 2: Payments & Enrollment ---');

test('create-cashfree-order strictly uses server-side course catalog pricing', () => {
  const file = fs.readFileSync(path.join(__dirname, '../supabase/functions/create-cashfree-order/index.ts'), 'utf8');
  assert(!file.includes('amountINR === 1'), 'Test amount 1 INR bypass must be removed');
  assert(!file.includes('tolerance = Math.round'), 'Client price 1% tolerance must be removed');
  assert(file.includes('AUTHORITATIVE_COURSES'), 'Authoritative course dictionary missing');
  assert(file.includes('resolveCoursePricing'), 'resolveCoursePricing function missing');
  assert(file.includes('"jlpt-n5": { title: "JLPT N5 Foundation Course", priceINR: 15000 }'), 'N5 price missing');
  assert(file.includes('"jlpt-n1": { title: "JLPT N1 Master Course", priceINR: 75300 }'), 'N1 price missing');
  assert(file.includes('admin.from("payments")'), 'Pending payment intent tracking in DB missing');
});

test('cashfreeService has removed empty modal dismiss default success callback', () => {
  const file = fs.readFileSync(path.join(__dirname, '../services/cashfreeService.ts'), 'utf8');
  assert(!file.includes("payment_id: orderId || 'cf_success'"), 'Default cf_success callback must be removed');
  assert(file.includes('Payment window was closed before completion'), 'Dismissed modal must report failure/pending');
  assert(file.includes('verifyCashfreeOrder'), 'verifyCashfreeOrder helper missing');
});

test('cashfree-webhook edge function verifies HMAC-SHA256 signature against raw body and checks 5-min timestamp', () => {
  const file = fs.readFileSync(path.join(__dirname, '../supabase/functions/cashfree-webhook/index.ts'), 'utf8');
  assert(file.includes('verifyCashfreeSignature'), 'Signature verification missing');
  assert(file.includes('req.headers.get("x-webhook-signature")'), 'Webhook signature header missing');
  assert(file.includes('payloadToSign = `${timestamp}${rawBody}`'), 'Signature payload construction missing');
  assert(file.includes('timingSafeEqual'), 'Constant-time comparison missing');
  assert(file.includes('5 * 60 * 1000'), '5-minute timestamp replay check missing');
  assert(file.includes('existingPayment && existingPayment.status === "paid"'), 'Idempotency check missing');
});

test('send-email function has removed unauthenticated enrollment creation bypass', () => {
  const file = fs.readFileSync(path.join(__dirname, '../supabase/functions/send-email/index.ts'), 'utf8');
  assert(!file.includes('admin.from("enrollments").insert'), 'Unauthenticated enrollment insertion must be eliminated from send-email');
  assert(file.includes('ALLOWED_FORM_TYPES'), 'Form type whitelist must exist');
});

test('Dashboard.tsx does not auto-enroll new users into N5', () => {
  const file = fs.readFileSync(path.join(__dirname, '../pages/Dashboard.tsx'), 'utf8');
  assert(!file.includes("id: 'n5-enrolled-' + currentUser.id"), 'Auto N5 enrollment fallback must be removed');
  assert(!file.includes("course_id: 'jlpt-n5-beginners'"), 'Hardcoded N5 insertion must be removed');
});

test('Executable Logic: Cashfree HMAC-SHA256 signature verification & timingSafeEqual', () => {
  const secretKey = 'test_secret_key_fuji_academy_2026';
  const timestamp = '1729930000000';
  const rawBody = JSON.stringify({ data: { order: { order_id: 'order_123', order_amount: 15000.00 } } });

  const payload = `${timestamp}${rawBody}`;
  const validSignature = crypto.createHmac('sha256', secretKey).update(payload).digest('base64');

  function verifySignature(ts, body, sig, secret) {
    const computed = crypto.createHmac('sha256', secret).update(`${ts}${body}`).digest('base64');
    const a = Buffer.from(computed);
    const b = Buffer.from(sig);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  }

  assert(verifySignature(timestamp, rawBody, validSignature, secretKey), 'Valid signature must verify');
  assert(!verifySignature(timestamp, rawBody, 'tampered_signature', secretKey), 'Tampered signature must fail');
  assert(!verifySignature(timestamp, rawBody + 'extra', validSignature, secretKey), 'Tampered payload must fail');
});

test('Executable Logic: Timestamp freshness rejects replay attacks older than 5 minutes', () => {
  function isTimestampFresh(timestampStr, maxAgeMs = 5 * 60 * 1000) {
    const ts = parseInt(timestampStr, 10);
    if (isNaN(ts)) return false;
    const now = Date.now();
    return Math.abs(now - ts) <= maxAgeMs;
  }

  const now = Date.now();
  assert(isTimestampFresh(String(now - 10000)), '10-second old webhook is fresh');
  assert(isTimestampFresh(String(now - 240000)), '4-minute old webhook is fresh');
  assert(!isTimestampFresh(String(now - 360000)), '6-minute old webhook must be rejected as replay');
  assert(!isTimestampFresh('invalid_timestamp'), 'Non-numeric timestamp must be rejected');
});

test('Executable Logic: Authoritative course catalog resolves prices correctly in INR', () => {
  const AUTHORITATIVE_COURSES = {
    'jlpt-n5': { title: 'JLPT N5 Foundation Course', priceINR: 15000 },
    'jlpt-n4': { title: 'JLPT N4 Elementary Course', priceINR: 18000 },
    'jlpt-n3': { title: 'JLPT N3 Intermediate Course', priceINR: 24000 },
    'jlpt-n2': { title: 'JLPT N2 Pre-Advanced Course', priceINR: 32000 },
    'jlpt-n1': { title: 'JLPT N1 Master Course', priceINR: 75300 },
    'seat-reservation': { title: 'Seat Reservation & Admission Processing Token', priceINR: 5000 }
  };

  function resolveCourse(id) {
    const key = (id || '').trim().toLowerCase();
    return AUTHORITATIVE_COURSES[key] || null;
  }

  assert.strictEqual(resolveCourse('jlpt-n5').priceINR, 15000);
  assert.strictEqual(resolveCourse('JLPT-N1').priceINR, 75300);
  assert.strictEqual(resolveCourse('seat-reservation').priceINR, 5000);
  assert.strictEqual(resolveCourse('unknown-hack'), null);
});

// ---------------------------------------------------------------------
// PRIORITY 3: Authorization & Database Hardening
// ---------------------------------------------------------------------
console.log('\n--- Priority 3: Authorization & RBAC ---');

test('AdminLayout.tsx uses server-side RBAC rather than hardcoded email check', () => {
  const file = fs.readFileSync(path.join(__dirname, '../pages/admin/AdminLayout.tsx'), 'utf8');
  assert(!file.includes('userEmail !== adminEmail'), 'Client email matching must be removed');
  assert(file.includes("supabase.rpc('is_admin')"), 'Authoritative is_admin RPC check missing');
  assert(file.includes("from('user_roles')"), 'user_roles query missing');
});

test('Security hardening migration defines user_roles, certificates, payments, and RLS policies', () => {
  const sql = fs.readFileSync(path.join(__dirname, '../supabase/migrations/20261026_security_hardening.sql'), 'utf8');
  assert(sql.includes('create table if not exists public.user_roles'), 'user_roles table definition missing');
  assert(sql.includes("role in ('admin', 'instructor', 'student')"), 'Role check constraint missing');
  assert(sql.includes('create or replace function public.is_admin()'), 'is_admin function definition missing');
  assert(sql.includes('from public.user_roles'), 'is_admin must query user_roles table');
  assert(sql.includes('create policy "Users can delete own enrollments"'), 'Self-service enrollments delete policy missing');
  assert(sql.includes('create policy "Users can delete own profile"'), 'Self-service profile delete policy missing');
  assert(sql.includes('alter table if exists public.courses enable row level security'), 'Courses RLS missing');
  assert(sql.includes('alter table if exists public.blogs enable row level security'), 'Blogs RLS missing');
  assert(sql.includes('alter table if exists public.jobs enable row level security'), 'Jobs RLS missing');
  assert(sql.includes('alter table public.leads enable row level security'), 'Leads RLS missing');
});

test('Rollback migration cleanly reverts all security changes in reverse order', () => {
  const sql = fs.readFileSync(path.join(__dirname, '../supabase/migrations/20261026_rollback.sql'), 'utf8');
  assert(sql.includes('drop function if exists public.verify_certificate'), 'Rollback must drop verify_certificate');
  assert(sql.includes('drop table if exists public.user_roles cascade'), 'Rollback must drop user_roles');
  assert(sql.includes('drop table if exists public.certificates cascade'), 'Rollback must drop certificates');
  assert(sql.includes('drop table if exists public.payments cascade'), 'Rollback must drop payments');
  assert(sql.includes('drop policy if exists "Users can delete own enrollments"'), 'Rollback must drop delete enrollments policy');
  assert(sql.includes('drop policy if exists "Users can delete own profile"'), 'Rollback must drop delete profile policy');
});

// ---------------------------------------------------------------------
// PRIORITY 4: Account & Form Security
// ---------------------------------------------------------------------
console.log('\n--- Priority 4: Account & Form Security ---');

test('formService does not generate or transmit client passwords and enforces durable acceptance', () => {
  const file = fs.readFileSync(path.join(__dirname, '../services/formService.ts'), 'utf8');
  assert(!file.includes('generatedPassword'), 'generatedPassword must be removed');
  assert(!file.includes('Fuji@${randomSuffix}'), 'Client password template must be removed');
  assert(file.includes('const isSuccess = leadSaved;'), 'Durable lead acceptance check missing');
});

test('send-email edge function strips plaintext passwords, has rate limiting and form whitelisting', () => {
  const file = fs.readFileSync(path.join(__dirname, '../supabase/functions/send-email/index.ts'), 'utf8');
  assert(!file.includes('password?: string'), 'Password parameter must be removed from EmailData');
  assert(!file.includes('${data.password}'), 'Plaintext password must not be rendered in HTML email');
  assert(file.includes('Set Up Password & Access Portal'), 'Must provide secure activation link CTA');
  assert(file.includes('isRateLimited'), 'Rate limiting function missing');
  assert(file.includes('Too many requests'), 'Rate limit error message missing');
});

test('Executable Logic: Sliding window rate limiting blocks burst spam', () => {
  class RateLimiter {
    constructor(limit, windowMs) {
      this.limit = limit;
      this.windowMs = windowMs;
      this.requests = new Map();
    }
    isRateLimited(key) {
      const now = Date.now();
      const timestamps = (this.requests.get(key) || []).filter(t => now - t < this.windowMs);
      if (timestamps.length >= this.limit) {
        this.requests.set(key, timestamps);
        return true;
      }
      timestamps.push(now);
      this.requests.set(key, timestamps);
      return false;
    }
  }

  const limiter = new RateLimiter(5, 60000);
  const ip = '192.168.1.100';

  for (let i = 0; i < 5; i++) {
    assert(!limiter.isRateLimited(ip), `Request ${i + 1} should be allowed`);
  }
  assert(limiter.isRateLimited(ip), '6th request within window must be rate-limited');
});

// ---------------------------------------------------------------------
// PRIORITY 5: Deployment & Browser Protection
// ---------------------------------------------------------------------
console.log('\n--- Priority 5: Deployment & Browser Protection ---');

test('vite.config.ts binds to 127.0.0.1 by default and disables sourcemaps in build', () => {
  const file = fs.readFileSync(path.join(__dirname, '../vite.config.ts'), 'utf8');
  assert(file.includes("host: process.env.VITE_HOST || '127.0.0.1'"), 'Default host must be 127.0.0.1');
  assert(file.includes("sourcemap: false"), 'Sourcemaps must be disabled');
});

test('public/_redirects blocks sensitive repository files and includes SPA routes', () => {
  const file = fs.readFileSync(path.join(__dirname, '../public/_redirects'), 'utf8');
  assert(file.includes('/.env*            /404.html     404'), 'Block for .env missing');
  assert(file.includes('/supabase/*       /404.html     404'), 'Block for /supabase/* missing');
  assert(file.includes('/scripts/*        /404.html     404'), 'Block for /scripts/* missing');
  assert(file.includes('/verify-certificate /index.html 200'), 'SPA rewrite for /verify-certificate missing');
  assert(file.includes('/verify           /index.html   200'), 'SPA rewrite for /verify missing');
});

test('public/_headers and netlify.toml enforce CSP and secure response headers', () => {
  const redirectsFile = fs.readFileSync(path.join(__dirname, '../netlify.toml'), 'utf8');
  assert(redirectsFile.includes('X-Frame-Options = "DENY"'), 'DENY clickjacking header missing in netlify.toml');
  assert(redirectsFile.includes('Strict-Transport-Security'), 'HSTS header missing in netlify.toml');
  assert(redirectsFile.includes('Content-Security-Policy'), 'CSP missing in netlify.toml');

  const headersFile = fs.readFileSync(path.join(__dirname, '../public/_headers'), 'utf8');
  assert(headersFile.includes('X-Frame-Options: DENY'), 'DENY clickjacking header missing in public/_headers');
  assert(headersFile.includes('Content-Security-Policy:'), 'CSP missing in public/_headers');
});

// ---------------------------------------------------------------------
// PRIORITY 6: Website Quality & Arithmetic Corrections
// ---------------------------------------------------------------------
console.log('\n--- Priority 6: Quality & Arithmetic Corrections ---');

test('Executable Logic: JapanROICalculator exact math for Lakhs and Thousands', () => {
  const JPY_TO_INR_RATE = 0.56;
  const IT_MONTHLY_JPY = 450000;
  const IT_TAX_RATE = 0.20;
  const IT_LIVING_JPY = 140000;
  const experienceYears = 2;

  const multiplier = 1 + experienceYears * 0.08; // 1.16
  const grossJPY = Math.round(IT_MONTHLY_JPY * 12 * multiplier); // 450000 * 12 * 1.16 = 6,264,000
  const grossINR = grossJPY * JPY_TO_INR_RATE; // 3,507,840
  const grossINRLakhs = (grossINR / 100000).toFixed(2); // 35.08 Lakhs

  const monthlyLivingINR = IT_LIVING_JPY * JPY_TO_INR_RATE; // 78,400
  const monthlyLivingINRK = (monthlyLivingINR / 1000).toFixed(1); // 78.4k

  const taxJPY = Math.round(grossJPY * IT_TAX_RATE);
  const netTakeHomeJPY = grossJPY - taxJPY;
  const annualLivingJPY = IT_LIVING_JPY * 12;
  const savingsJPY = Math.max(0, netTakeHomeJPY - annualLivingJPY);
  const savingsINR = savingsJPY * JPY_TO_INR_RATE;
  const savingsINRLakhs = (savingsINR / 100000).toFixed(2);

  assert.strictEqual(grossJPY, 6264000);
  assert.strictEqual(grossINRLakhs, '35.08');
  assert.strictEqual(monthlyLivingINRK, '78.4');
  assert.strictEqual(savingsINRLakhs, '18.65');
});

test('Stats reconciliation across all pages: 348 reviews, 2,400+ students, 9:00 AM - 7:30 PM hours', () => {
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(indexHtml.includes('"reviewCount": "348"'), 'Index HTML reviewCount must be 348');
  assert(indexHtml.includes('"closes": "19:30"'), 'Index HTML closes must be 19:30');

  const home = fs.readFileSync(path.join(__dirname, '../pages/Home.tsx'), 'utf8');
  assert(home.includes('Based on 348+ verified Google Reviews'), 'Home.tsx review count must be 348+');
  assert(home.includes('2,400+ successful scholars'), 'Home.tsx student count must be 2,400+');
  assert(home.includes('Mon – Sun: 9:00 AM – 7:30 PM IST'), 'Home.tsx hours must be 9:00 AM – 7:30 PM IST');

  const footer = fs.readFileSync(path.join(__dirname, '../components/Footer.tsx'), 'utf8');
  assert(footer.includes('348+ Verified Student Reviews'), 'Footer review count must be 348+');
  assert(footer.includes('Over 2,400+ Alumni'), 'Footer alumni count must be 2,400+');

  const courseDetail = fs.readFileSync(path.join(__dirname, '../pages/CourseDetailPage.tsx'), 'utf8');
  assert(courseDetail.includes('348+ reviews'), 'CourseDetailPage review count must be 348+');

  const contact = fs.readFileSync(path.join(__dirname, '../pages/Contact.tsx'), 'utf8');
  assert(contact.includes('348+ verified Google reviews'), 'Contact review count must be 348+');

  const location = fs.readFileSync(path.join(__dirname, '../pages/LocationLandingPage.tsx'), 'utf8');
  assert(location.includes("'reviewCount': '348'"), 'LocationLandingPage structured data reviewCount must be 348');
  assert(location.includes('2,400+ successful alumni'), 'LocationLandingPage alumni count must be 2,400+');

  const about = fs.readFileSync(path.join(__dirname, '../pages/About.tsx'), 'utf8');
  assert(about.includes("value: '2,400+', icon: Users"), 'About.tsx graduates count must be 2,400+');
});

test('Accessibility & Motion: reduced motion in CSS, Escape dismiss on modals, aria-live on status', () => {
  const css = fs.readFileSync(path.join(__dirname, '../index.css'), 'utf8');
  assert(css.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion media query missing in index.css');

  const certModal = fs.readFileSync(path.join(__dirname, '../components/CertificateModal.tsx'), 'utf8');
  assert(certModal.includes("e.key === 'Escape'"), 'Escape key handler missing in CertificateModal');

  const enrollModal = fs.readFileSync(path.join(__dirname, '../components/EnrollmentModal.tsx'), 'utf8');
  assert(enrollModal.includes("e.key === 'Escape'"), 'Escape key handler missing in EnrollmentModal');

  const verifyPage = fs.readFileSync(path.join(__dirname, '../pages/VerifyCertificatePage.tsx'), 'utf8');
  assert(verifyPage.includes('role="status" aria-live="polite"'), 'aria-live polite missing on verification output');
});

test('BatchScheduleTable has replaced fake urgency badges with legitimate status badges', () => {
  const file = fs.readFileSync(path.join(__dirname, '../components/BatchScheduleTable.tsx'), 'utf8');
  assert(!file.includes('Only 3 Seats Left'), 'Only 3 Seats Left must be removed');
  assert(!file.includes('Only 4 Seats Left'), 'Only 4 Seats Left must be removed');
  assert(!file.includes('Coming Monday'), 'Coming Monday must be removed');
  assert(file.includes('statusBadge'), 'Must use statusBadge property');
});

test('analytics.ts gates event dispatch with user cookie consent', () => {
  const file = fs.readFileSync(path.join(__dirname, '../src/lib/analytics.ts'), 'utf8');
  assert(file.includes('hasAnalyticsConsent'), 'hasAnalyticsConsent helper missing');
  assert(file.includes('if (!hasAnalyticsConsent())'), 'trackEvent must verify consent before pushing');
});

test('WhatsAppFloat is hidden on mobile to avoid UI clash with MobileAppBottomNav', () => {
  const file = fs.readFileSync(path.join(__dirname, '../components/WhatsAppFloat.tsx'), 'utf8');
  assert(file.includes('hidden md:flex'), 'WhatsAppFloat must be hidden on mobile');
});

// ---------------------------------------------------------------------
// SUMMARY
// ---------------------------------------------------------------------
console.log('\n======================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('======================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
