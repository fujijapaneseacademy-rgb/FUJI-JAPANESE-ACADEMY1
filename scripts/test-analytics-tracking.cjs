const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Analytics & Tracking Verification Test Suite...\n');

const repos = [
  { name: 'fuji-japanese-institute', root: path.resolve(__dirname, '../fuji-japanese-institute') },
  { name: 'fuji-japanese-in', root: path.resolve(__dirname, '../fuji-japanese-in') },
];

let totalTests = 0;
let passedTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${description}`);
    console.error(`     Error: ${err.message}`);
  }
}

repos.forEach(({ name, root }) => {
  console.log(`\n--- Testing ${name} ---`);

  // Test 1: index.html contains GTM Head script
  test('index.html contains GTM head script with GTM-T99X7DCV', () => {
    const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert(indexHtml.includes('https://www.googletagmanager.com/gtm.js?id=GTM-T99X7DCV'), 'Missing GTM head script');
    assert(indexHtml.includes('gtm.start'), 'Missing gtm.start initialization');
    assert(indexHtml.includes('gtag'), 'Missing gtag helper initialization');
  });

  // Test 2: index.html contains GTM Body noscript iframe
  test('index.html contains GTM noscript iframe in body', () => {
    const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert(indexHtml.includes('https://www.googletagmanager.com/ns.html?id=GTM-T99X7DCV'), 'Missing GTM noscript iframe');
  });

  // Test 3: analytics.ts exports all required tracking functions
  test('analytics.ts exports trackPageView, trackFormSubmission, trackTelephoneClick, trackWhatsAppClick, trackGoogleAdsConversion', () => {
    const analyticsTs = fs.readFileSync(path.join(root, 'src/lib/analytics.ts'), 'utf8');
    assert(analyticsTs.includes('export const trackPageView'), 'Missing trackPageView');
    assert(analyticsTs.includes('export const trackFormSubmission'), 'Missing trackFormSubmission');
    assert(analyticsTs.includes('export const trackTelephoneClick'), 'Missing trackTelephoneClick');
    assert(analyticsTs.includes('export const trackWhatsAppClick'), 'Missing trackWhatsAppClick');
    assert(analyticsTs.includes('export const trackGoogleAdsConversion'), 'Missing trackGoogleAdsConversion');
    assert(analyticsTs.includes('export const initGlobalClickTracking'), 'Missing initGlobalClickTracking');
  });

  // Test 4: App.tsx mounts AnalyticsTracker
  test('App.tsx mounts AnalyticsTracker to track SPA page views', () => {
    const appTsx = fs.readFileSync(path.join(root, 'App.tsx'), 'utf8');
    assert(appTsx.includes('AnalyticsTracker'), 'Missing AnalyticsTracker component');
    assert(appTsx.includes('trackPageView'), 'Missing trackPageView in App.tsx');
    assert(appTsx.includes('initGlobalClickTracking'), 'Missing initGlobalClickTracking in App.tsx');
  });

  // Test 5: formService.ts dispatches tracking
  test('formService.ts calls trackFormSubmission on submit', () => {
    const formService = fs.readFileSync(path.join(root, 'services/formService.ts'), 'utf8');
    assert(formService.includes('trackFormSubmission'), 'Missing trackFormSubmission call in formService.ts');
  });

  // Test 6: CookieBanner integrates with Google Consent Mode
  test('CookieBanner.tsx calls updateGoogleConsent', () => {
    const cookieBanner = fs.readFileSync(path.join(root, 'components/CookieBanner.tsx'), 'utf8');
    assert(cookieBanner.includes('updateGoogleConsent'), 'Missing updateGoogleConsent in CookieBanner.tsx');
  });
});

console.log(`\n========================================`);
console.log(`Analytics Verification: ${passedTests}/${totalTests} Passed`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
