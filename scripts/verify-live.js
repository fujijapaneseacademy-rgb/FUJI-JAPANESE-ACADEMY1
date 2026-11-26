import https from 'node:https';

const testUrls = [
  'https://fujijapaneseacademy.com/',
  'https://fujijapaneseacademy.com/courses',
  'https://fujijapaneseacademy.com/courses/jlpt-n5',
  'https://fujijapaneseacademy.com/about',
  'https://fujijapaneseacademy.com/blog',
  'https://fujijapaneseacademy.com/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score',
  'https://fujijapaneseacademy.com/locations/bangalore'
];

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('\n--- LIVE PAGES VERIFICATION ---');
  for (const url of testUrls) {
    const res = await fetchUrl(url);
    const titleMatch = res.body.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'MISSING';
    const canonicalMatch = res.body.match(/<link\s+rel="canonical"\s+href="([\s\S]*?)"/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : 'MISSING';
    const canonicalCount = (res.body.match(/<link\s+rel="canonical"/gi) || []).length;
    const h1Match = res.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'MISSING';
    const hasPreRender = res.body.includes('<div id="root">') && !res.body.includes('<div id="root"></div>');

    console.log(`URL: ${url}`);
    console.log(`  HTTP Status:     ${res.status}`);
    console.log(`  Canonical Count: ${canonicalCount} (${canonical})`);
    console.log(`  Title:           ${title}`);
    console.log(`  H1:              ${h1}`);
    console.log(`  Pre-rendered:    ${hasPreRender ? 'YES' : 'NO'}`);
    console.log('');
  }

  console.log('\n--- LIVE REDIRECT & 404 VERIFICATION ---');
  // 1. Sitemap redirect
  const sitemapRes = await fetchUrl('https://fujijapaneseacademy.com/sitemap-academy.xml');
  console.log(`sitemap-academy.xml Status: ${sitemapRes.status} (Location: ${sitemapRes.headers.location})`);

  // 2. 404 page
  const notFoundRes = await fetchUrl('https://fujijapaneseacademy.com/non-existent-page-404-test');
  console.log(`unknown URL Status:         ${notFoundRes.status}`);

  // 3. /n5 redirect
  const n5Res = await fetchUrl('https://fujijapaneseacademy.com/n5');
  console.log(`/n5 redirect Status:        ${n5Res.status} (Location: ${n5Res.headers.location})`);
}

run();
