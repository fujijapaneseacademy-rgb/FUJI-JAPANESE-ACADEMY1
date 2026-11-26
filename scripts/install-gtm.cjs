const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.resolve(__dirname, '../fuji-japanese-institute/index.html'),
  path.resolve(__dirname, '../fuji-japanese-in/index.html'),
];

const gtmHeadSnippet = `  <!-- Google Tag Manager (GTM-T99X7DCV) & Google Tag (gtag.js) -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    gtag('js', new Date());
  </script>
  <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-T99X7DCV"></script>
  <!-- End Google Tag Manager -->`;

const gtmBodySnippet = `<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T99X7DCV"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div id="root"></div>`;

targetFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Check if GTM is already added
  if (content.includes('GTM-T99X7DCV')) {
    console.log(`GTM already installed in ${path.basename(path.dirname(file))}/index.html`);
    return;
  }

  // Replace dataLayer setup with full GTM snippet
  const headPattern = /<!-- Analytics & Conversion Tracking DataLayer Setup -->[\s\S]*?<\/script>/;
  if (headPattern.test(content)) {
    content = content.replace(headPattern, gtmHeadSnippet.trim());
  } else {
    content = content.replace('</head>', `${gtmHeadSnippet}\n</head>`);
  }

  // Insert noscript iframe right after <body>
  const bodyPattern = /<body>[\s\r\n]*<div id="root"><\/div>/;
  if (bodyPattern.test(content)) {
    content = content.replace(bodyPattern, gtmBodySnippet);
  } else {
    content = content.replace('<body>', `<body>\n  <!-- Google Tag Manager (noscript) -->\n  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T99X7DCV" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n  <!-- End Google Tag Manager (noscript) -->`);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully installed GTM in ${path.basename(path.dirname(file))}/index.html`);
});
