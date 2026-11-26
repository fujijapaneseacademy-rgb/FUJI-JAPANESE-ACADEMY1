const fs = require('fs');
const path = require('path');

/**
 * Escapes XML/SVG characters
 */
function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Breaks a long title into max 3 lines for clean SVG rendering
 */
function wrapTitle(text, maxCharsPerLine = 34) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
    if (lines.length === 2 && currentLine.length > maxCharsPerLine) {
      currentLine = currentLine.slice(0, maxCharsPerLine - 3) + '...';
      break;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3);
}

/**
 * Theme palettes according to blog category
 */
const CATEGORY_THEMES = {
  'JLPT Preparation': {
    primaryGradient: ['#12102e', '#1a184a', '#2d142c'],
    accentColor: '#e11d48', // rose-600
    accentLight: '#fda4af',
    badgeBg: '#e11d48',
    kanjiDefault: '合格',
    kanjiMeaning: 'GŌKAKU • JLPT PASS'
  },
  'Career & Culture': {
    primaryGradient: ['#0f172a', '#1e293b', '#1e1b4b'],
    accentColor: '#3b82f6', // blue-500
    accentLight: '#93c5fd',
    badgeBg: '#2563eb',
    kanjiDefault: '就職',
    kanjiMeaning: 'SHŪSHOKU • CAREER IN JAPAN'
  },
  'Learning Tips': {
    primaryGradient: ['#141724', '#1f2544', '#2c1e3d'],
    accentColor: '#f59e0b', // amber-500
    accentLight: '#fde68a',
    badgeBg: '#d97706',
    kanjiDefault: '上達',
    kanjiMeaning: 'JŌTATSU • MASTERY'
  }
};

/**
 * Generates an SVG string for a blog article
 */
function createBlogImageSvg({
  title,
  category = 'JLPT Preparation',
  kanji,
  badgeText = '2026 OFFICIAL GUIDE',
  statsText = 'Fuji Japanese Academy • Authoritative Educational Guide'
}) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES['JLPT Preparation'];
  const kanjiSeal = kanji || theme.kanjiDefault;
  const wrappedLines = wrapTitle(title);

  const titleSvgLines = wrappedLines.map((line, idx) => {
    const yPos = 270 + (idx * 54);
    return `<text x="90" y="${yPos}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.03em">${escapeXml(line)}</text>`;
  }).join('\n    ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.primaryGradient[0]}" />
      <stop offset="55%" stop-color="${theme.primaryGradient[1]}" />
      <stop offset="100%" stop-color="${theme.primaryGradient[2]}" />
    </linearGradient>

    <!-- Glowing Accent Orb -->
    <radialGradient id="glowRed" cx="85%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${theme.accentColor}" stop-opacity="0.35" />
      <stop offset="60%" stop-color="${theme.accentColor}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>

    <!-- Bottom Light Bar -->
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.accentColor}" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>

    <!-- Torii Gate Filter -->
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- 1. Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowRed)" />

  <!-- 2. Decorative Japanese Mount Fuji & Wave Contours -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1.5" fill="none">
    <!-- Traditional Concentric Wave / Seigaiha Arcs -->
    <circle cx="1050" cy="480" r="80" />
    <circle cx="1050" cy="480" r="120" />
    <circle cx="1050" cy="480" r="160" />
    <circle cx="1050" cy="480" r="200" />
    <circle cx="1050" cy="480" r="240" />
    <circle cx="1050" cy="480" r="280" />

    <!-- Mount Fuji Silhouette line -->
    <path d="M 680 630 L 930 290 L 980 320 L 1020 290 L 1200 520" stroke="#ffffff" stroke-width="2" />
  </g>

  <!-- 3. Giant Traditional Kanji Watermark Seal -->
  <text x="1050" y="440" font-family="'Noto Serif JP', 'Yu Mincho', 'Songti SC', serif" font-size="280" font-weight="900" fill="#ffffff" opacity="0.07" text-anchor="middle" dominant-baseline="central">
    ${escapeXml(kanjiSeal)}
  </text>

  <!-- 4. Top Branding Bar -->
  <g transform="translate(90, 75)">
    <!-- Fuji Logo Icon Symbol -->
    <circle cx="22" cy="22" r="22" fill="#e11d48" />
    <polygon points="22,10 32,30 12,30" fill="#ffffff" />
    <circle cx="22" cy="20" r="3" fill="#e11d48" />

    <!-- Academy Name -->
    <text x="56" y="19" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="0.08em">
      FUJI JAPANESE ACADEMY
    </text>
    <text x="56" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#cbd5e1" letter-spacing="0.12em">
      富士日本語アカデミー • KNOWLEDGE HUB
    </text>
  </g>

  <!-- 5. Category Pill & Kanji Seal Badge -->
  <g transform="translate(90, 165)">
    <!-- Category Pill -->
    <rect x="0" y="0" width="190" height="36" rx="18" fill="${theme.badgeBg}" />
    <text x="95" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.08em">
      ${escapeXml(category.toUpperCase())}
    </text>

    <!-- Kanji Sub-badge -->
    <rect x="205" y="0" width="140" height="36" rx="18" fill="#ffffff" fill-opacity="0.12" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1" />
    <text x="275" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="${theme.accentLight}" text-anchor="middle" letter-spacing="0.04em">
      ${escapeXml(theme.kanjiMeaning)}
    </text>
  </g>

  <!-- 6. Main Headline Title (Multi-line) -->
  <g filter="url(#softShadow)">
    ${titleSvgLines}
  </g>

  <!-- 7. Footer Feature Chips & Authority Verification Bar -->
  <g transform="translate(90, 485)">
    <!-- Badge Pill: 2026 Official Guide -->
    <rect x="0" y="0" width="220" height="34" rx="8" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1" />
    <circle cx="16" cy="17" r="4" fill="#10b981" />
    <text x="28" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#ffffff" letter-spacing="0.05em">
      ${escapeXml(badgeText)}
    </text>

    <!-- Verification text -->
    <text x="240" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
      ${escapeXml(statsText)}
    </text>
  </g>

  <!-- 8. Bottom Accent Strip -->
  <rect x="0" y="622" width="1200" height="8" fill="url(#barGrad)" />
</svg>`;
}

/**
 * Saves generated SVG to both projects
 */
function saveBlogImage(slug, options) {
  const svgContent = createBlogImageSvg(options);
  const fileName = `${slug}.svg`;

  const paths = [
    path.join(__dirname, '..', 'public', 'images', 'blog', fileName),
    path.join(__dirname, '..', '..', 'fuji-japanese-in', 'public', 'images', 'blog', fileName)
  ];

  paths.forEach(destPath => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(destPath, svgContent, 'utf8');
  });

  return `/images/blog/${fileName}`;
}

module.exports = {
  createBlogImageSvg,
  saveBlogImage,
  CATEGORY_THEMES
};
