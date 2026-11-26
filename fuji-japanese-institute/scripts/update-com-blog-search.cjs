const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/CSC/Documents/Fuji japanese/fuji-japanese-institute';

// 1. Update BlogPostPage.tsx
const blogPostPath = path.join(baseDir, 'pages/BlogPostPage.tsx');
let blogPostCode = fs.readFileSync(blogPostPath, 'utf8');

if (!blogPostCode.includes('DETAILED_BLOG_ARTICLES')) {
  blogPostCode = blogPostCode.replace(
    /import \{ BLOG_POSTS as MOCK_POSTS \} from '\.\.\/constants';/,
    "import { BLOG_POSTS as MOCK_POSTS } from '../constants';\nimport { DETAILED_BLOG_ARTICLES } from '../data/blogArticlesData';"
  );

  const oldFetch = `            try {
                // Try searching by slug first, then by id
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .or(\`slug.eq.\${slug},id.eq.\${slug}\`)
                    .single();

                if (!error && data) {
                    setPost(data);
                } else {
                    // Fallback to local mock posts
                    const found = MOCK_POSTS.find(p => p.slug === slug || p.id === slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
                    if (found) {
                        setPost(found);
                    }
                }`;

  const newFetch = `            try {
                // First check local rich detailed articles
                const foundLocal = DETAILED_BLOG_ARTICLES.find(p => p.slug === slug || p.id === slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
                if (foundLocal && foundLocal.content && foundLocal.content.length > 200) {
                    setPost(foundLocal);
                } else {
                    const { data, error } = await supabase
                        .from('blogs')
                        .select('*')
                        .or(\`slug.eq.\${slug},id.eq.\${slug}\`)
                        .single();

                    if (!error && data && data.content) {
                        setPost(data);
                    } else if (foundLocal) {
                        setPost(foundLocal);
                    } else {
                        const found = MOCK_POSTS.find(p => p.slug === slug || p.id === slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
                        if (found) setPost(found);
                    }
                }`;

  blogPostCode = blogPostCode.replace(oldFetch, newFetch);
  blogPostCode = blogPostCode.replace(
    /setRelatedPosts\(MOCK_POSTS\.filter\(p => p\.id !== slug\)\.slice\(0, 3\)\);/,
    "setRelatedPosts(DETAILED_BLOG_ARTICLES.filter(p => p.slug !== slug).slice(0, 3));"
  );

  fs.writeFileSync(blogPostPath, blogPostCode, 'utf8');
  console.log('✓ BlogPostPage.tsx in .com updated to use rich detailed articles.');
}

// 2. Update Blog.tsx in .com
const blogListPath = path.join(baseDir, 'pages/Blog.tsx');
let blogListCode = fs.readFileSync(blogListPath, 'utf8');

if (!blogListCode.includes('DETAILED_BLOG_ARTICLES')) {
  blogListCode = blogListCode.replace(
    /import \{ BLOG_POSTS as MOCK_POSTS \} from '\.\.\/constants';/,
    "import { BLOG_POSTS as MOCK_POSTS } from '../constants';\nimport { DETAILED_BLOG_ARTICLES } from '../data/blogArticlesData';"
  );

  blogListCode = blogListCode.replace(
    /const \[posts, setPosts\] = useState<BlogPost\[\]>\(MOCK_POSTS\);/,
    "const [posts, setPosts] = useState<BlogPost[]>(DETAILED_BLOG_ARTICLES);"
  );

  blogListCode = blogListCode.replace(
    /setPosts\(MOCK_POSTS\);/g,
    "setPosts(DETAILED_BLOG_ARTICLES);"
  );

  fs.writeFileSync(blogListPath, blogListCode, 'utf8');
  console.log('✓ Blog.tsx in .com updated to display all detailed articles.');
}

// 3. Update Footer.tsx in .com
const footerPath = path.join(baseDir, 'components/Footer.tsx');
let footerCode = fs.readFileSync(footerPath, 'utf8');

if (!footerCode.includes('UniversalSiteSearchModal')) {
  footerCode = footerCode.replace(
    /import \{ submitToGoogleSheet \} from '\.\.\/services\/formService';/,
    "import { submitToGoogleSheet } from '../services/formService';\nimport UniversalSiteSearchModal, { TOP_SEARCH_KEYWORDS } from './UniversalSiteSearchModal';\nimport { Search, Globe } from 'lucide-react';"
  );

  footerCode = footerCode.replace(
    /const \[isSuccess, setIsSuccess\] = useState\(false\);/,
    "const [isSuccess, setIsSuccess] = useState(false);\n  const [isSearchOpen, setIsSearchOpen] = useState(false);\n  const [searchInitialQuery, setSearchInitialQuery] = useState('');"
  );

  const searchSection = `        {/* UNIVERSAL SITE SEARCH & TOP KEYWORDS BAR */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-md text-center lg:text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                <Search className="w-3.5 h-3.5 text-amber-400" /> Universal Section &amp; Course Search
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Find Any Course, Enterprise Solution or Topic
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Type any relative word: Nursing, N5 Fees, Corporate Training, Tokyo IT Jobs, or Exam Dates.
              </p>
            </div>

            <div className="w-full lg:max-w-xl">
              <div 
                onClick={() => {
                  setSearchInitialQuery('');
                  setIsSearchOpen(true);
                }}
                className="cursor-pointer flex items-center justify-between bg-black/40 hover:bg-black/60 border border-white/20 hover:border-amber-400/60 rounded-2xl p-3 sm:p-4 text-white/70 transition-all shadow-inner group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-white/80">Search relative keywords (e.g., Nursing, Fees, N5, Jobs)...</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-xs font-bold text-white shadow-md">
                  Search All ↗
                </span>
              </div>

              {/* Relative Keywords Top Pills */}
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-amber-300 font-bold uppercase flex-shrink-0 mr-1">Top:</span>
                {TOP_SEARCH_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      setSearchInitialQuery(kw);
                      setIsSearchOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-amber-400 hover:text-gray-950 text-white/90 whitespace-nowrap transition-all flex-shrink-0 active:scale-95 border border-white/10"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DOMAIN DIRECTORY SWITCHER: .COM (MAIN WORLD) VS .IN (INDIA) */}
        <div className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-950/60 to-red-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <span className="font-bold text-white text-sm block">Fuji Japanese Academy Global Portal (.com)</span>
              <span className="text-white/60">Dedicated to international corporate training, overseas recruitment, and enterprise clients.</span>
            </div>
          </div>
          <a
            href="https://fujijapaneseacademy.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all border border-amber-400/40 whitespace-nowrap"
          >
            <span className="text-sm">🇮🇳</span>
            <span>Visit India Academy &amp; College Portal (.in) ↗</span>
          </a>
        </div>
`;

  footerCode = footerCode.replace(
    /(<div className="container mx-auto px-4 md:px-6 relative z-10">\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5)/,
    '<div className="container mx-auto px-4 md:px-6 relative z-10">\n' + searchSection + '        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
  );

  footerCode = footerCode.replace(
    /(<\/footer>)/,
    '  <UniversalSiteSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} initialQuery={searchInitialQuery} />\n    $1'
  );

  fs.writeFileSync(footerPath, footerCode, 'utf8');
  console.log('✓ Footer.tsx in .com updated with Universal Search and Domain Switcher.');
}
