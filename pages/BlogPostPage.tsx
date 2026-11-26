import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    ArrowLeft,
    Share2,
    Check,
    ChevronDown,
    ChevronUp,
    BookOpen,
    GraduationCap,
    Eye,
    EyeOff,
    MapPin,
    ExternalLink,
    Link2,
    Quote,
    Award,
    Sparkles,
    Compass,
    Copy,
    FileText,
    Bookmark,
    MessageCircle
} from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { BLOG_POSTS as MOCK_POSTS } from '../constants';
import { DETAILED_BLOG_ARTICLES } from '../data/blogArticlesData';
import { BlogPost, BlogFAQ, BlogSource, InternalCrossLink } from '../types';

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const [citationCopied, setCitationCopied] = useState<string | null>(null);
    const [citationFormat, setCitationFormat] = useState<'html' | 'apa' | 'mla'>('html');
    const [showCoverImage, setShowCoverImage] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [readingProgress, setReadingProgress] = useState(0);
    const [activeHeadingId, setActiveHeadingId] = useState<string>('');
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            setLoading(true);

            try {
                // First check local rich detailed articles
                const foundLocal = DETAILED_BLOG_ARTICLES.find(
                    p => p.slug === slug || p.id === slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
                );
                if (foundLocal && foundLocal.content && foundLocal.content.length > 200) {
                    setPost(foundLocal);
                } else {
                    const { data, error } = await supabase
                        .from('blogs')
                        .select('*')
                        .or(`slug.eq.${slug},id.eq.${slug}`)
                        .single();

                    if (!error && data && data.content) {
                        setPost(data);
                    } else if (foundLocal) {
                        setPost(foundLocal);
                    } else {
                        const found = MOCK_POSTS.find(
                            p => p.slug === slug || p.id === slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
                        );
                        if (found) setPost(found);
                    }
                }

                // Fetch other related posts
                const { data: others } = await supabase
                    .from('blogs')
                    .select('*')
                    .neq('slug', slug)
                    .limit(3);

                if (others && others.length > 0) {
                    setRelatedPosts(others);
                } else {
                    setRelatedPosts(DETAILED_BLOG_ARTICLES.filter(p => p.slug !== slug).slice(0, 3));
                }
            } catch (err) {
                if (import.meta.env.DEV) {
                    console.warn('Error fetching blog post:', err);
                }
                const found = MOCK_POSTS.find(
                    p => p.slug === slug || p.id === slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
                );
                if (found) setPost(found);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        window.scrollTo(0, 0);
    }, [slug]);

    // Reading progress bar tracker
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (windowHeight > 0) {
                const scrollPercentage = (totalScroll / windowHeight) * 100;
                setReadingProgress(Math.min(100, Math.max(0, scrollPercentage)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Extract table of contents headings
    const headings = useMemo(() => {
        if (!post?.content) return [];
        const lines = post.content.split('\n');
        const list: { id: string; text: string; level: number }[] = [];
        lines.forEach(line => {
            const trimmed = line.trim();
            if (
                trimmed.startsWith('## ') &&
                !trimmed.startsWith('## Summary:') &&
                !trimmed.startsWith('## Quick Answer:')
            ) {
                const text = trimmed.replace('## ', '').replace(/\*\*/g, '').trim();
                list.push({ id: slugify(text), text, level: 2 });
            } else if (trimmed.startsWith('### ')) {
                const text = trimmed.replace('### ', '').replace(/\*\*/g, '').trim();
                list.push({ id: slugify(text), text, level: 3 });
            }
        });
        return list;
    }, [post?.content]);

    // Heading scroll spy
    useEffect(() => {
        if (headings.length === 0) return;

        const handleSpy = () => {
            const scrollPos = window.scrollY + 180;
            const headingEls = headings
                .map(h => document.getElementById(h.id))
                .filter(Boolean) as HTMLElement[];

            for (let i = headingEls.length - 1; i >= 0; i--) {
                if (headingEls[i].offsetTop <= scrollPos) {
                    setActiveHeadingId(headingEls[i].id);
                    return;
                }
            }
            if (headingEls.length > 0 && window.scrollY < headingEls[0].offsetTop) {
                setActiveHeadingId('');
            }
        };

        window.addEventListener('scroll', handleSpy, { passive: true });
        return () => window.removeEventListener('scroll', handleSpy);
    }, [headings]);

    // Calculated stats
    const stats = useMemo(() => {
        if (!post?.content) return { words: 0, readTime: post?.read_time || '5 min read' };
        const words = post.content.split(/\s+/).filter(Boolean).length;
        const minutes = Math.ceil(words / 210);
        return {
            words,
            readTime: post.read_time || `${minutes} min read`
        };
    }, [post]);

    // Share URL
    const canonicalOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://fujijapaneseacademy.com';
    const shareUrl = `${canonicalOrigin}/blog/${post?.slug || post?.id || ''}`;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post?.title,
                url: shareUrl
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleCopyCitation = (format: 'html' | 'apa' | 'mla') => {
        if (!post) return;
        let citation = '';
        if (format === 'html') {
            citation = `<a href="${shareUrl}" target="_blank" rel="noopener">Fuji Japanese Academy: ${post.title}</a>`;
        } else if (format === 'apa') {
            citation = `Fuji Japanese Academy. (2026). ${post.title}. Retrieved from ${shareUrl}`;
        } else if (format === 'mla') {
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            citation = `"${post.title}." Fuji Japanese Academy, 2026, ${shareUrl}. Accessed ${today}.`;
        }

        if (navigator.clipboard) {
            navigator.clipboard.writeText(citation);
            setCitationCopied(format);
            setTimeout(() => setCitationCopied(null), 2500);
        }
    };

    // Inject dynamic JSON-LD Schema
    useEffect(() => {
        if (!post) return;

        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.meta_description || post.excerpt,
            "image": post.image,
            "datePublished": post.published_at || new Date().toISOString(),
            "dateModified": post.published_at || new Date().toISOString(),
            "wordCount": stats.words,
            "author": {
                "@type": "Person",
                "name": post.author || "Sensei Tanaka, Lead JLPT Instructor",
                "jobTitle": "Lead Japanese Instructor",
                "worksFor": {
                    "@type": "EducationalOrganization",
                    "name": "Fuji Japanese Academy",
                    "url": canonicalOrigin
                }
            },
            "publisher": {
                "@type": "EducationalOrganization",
                "name": "Fuji Japanese Academy",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${canonicalOrigin}/logo.png`
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": shareUrl
            }
        };

        let faqSchema = null;
        if (post.faqs && post.faqs.length > 0) {
            faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": post.faqs.map((f: BlogFAQ) => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                    }
                }))
            };
        }

        const scriptArticle = document.createElement('script');
        scriptArticle.type = 'application/ld+json';
        scriptArticle.id = 'json-ld-article';
        scriptArticle.text = JSON.stringify(articleSchema);
        document.head.appendChild(scriptArticle);

        let scriptFaq: HTMLScriptElement | null = null;
        if (faqSchema) {
            scriptFaq = document.createElement('script');
            scriptFaq.type = 'application/ld+json';
            scriptFaq.id = 'json-ld-faq';
            scriptFaq.text = JSON.stringify(faqSchema);
            document.head.appendChild(scriptFaq);
        }

        return () => {
            const elArticle = document.getElementById('json-ld-article');
            if (elArticle) elArticle.remove();
            const elFaq = document.getElementById('json-ld-faq');
            if (elFaq) elFaq.remove();
        };
    }, [post, shareUrl, stats.words, canonicalOrigin]);

    if (loading) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-fuji-light flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-fuji-red border-t-transparent mb-4"></div>
                <p className="text-sm font-medium text-fuji-slate/70">Loading curriculum guide...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-fuji-light text-center px-4">
                <h1 className="text-3xl font-bold font-display text-fuji-indigo mb-4">Article Not Found</h1>
                <p className="text-fuji-slate/70 mb-8 max-w-md mx-auto">
                    The educational article you are looking for does not exist or has been relocated to another curriculum hub.
                </p>
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-fuji-indigo text-white font-bold rounded-xl hover:bg-fuji-slate transition-all shadow-md"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
                </Link>
            </div>
        );
    }

    // Markdown inline formatter for bold, italic, and links
    const formatInline = (text: string): React.ReactNode => {
        // Regex splits text into bold, italic, inline code, and links
        const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);
        return parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={pIdx} className="italic text-gray-800">{part.slice(1, -1)}</em>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                return (
                    <code key={pIdx} className="px-1.5 py-0.5 rounded bg-gray-100 text-fuji-red font-mono text-xs">
                        {part.slice(1, -1)}
                    </code>
                );
            }
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
                const label = linkMatch[1];
                const href = linkMatch[2];
                if (href.startsWith('http')) {
                    return (
                        <a
                            key={pIdx}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-fuji-red hover:underline font-semibold inline-flex items-center gap-0.5"
                        >
                            <span>{label}</span>
                            <ExternalLink className="w-3 h-3 inline" />
                        </a>
                    );
                }
                return (
                    <Link key={pIdx} to={href} className="text-fuji-red hover:underline font-semibold">
                        {label}
                    </Link>
                );
            }
            return part;
        });
    };

    // Render formatted markdown
    const renderFormattedContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let inTable = false;
        let tableRows: string[][] = [];

        const flushTable = (key: number) => {
            if (tableRows.length === 0) return null;
            const header = tableRows[0];
            const body = tableRows.slice(2);
            const tableElement = (
                <div key={`table-${key}`} className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="bg-fuji-indigo text-white uppercase tracking-wider text-xs">
                            <tr>
                                {header.map((col, cIdx) => (
                                    <th key={cIdx} className="p-4 font-bold border-b border-fuji-indigo/20">
                                        {col.trim().replace(/\*\*/g, '')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {body.map((row, rIdx) => (
                                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                    {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="p-4 text-gray-700 leading-relaxed">
                                            {formatInline(cell.trim())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            tableRows = [];
            inTable = false;
            return tableElement;
        };

        lines.forEach((line, idx) => {
            const trimmed = line.trim();

            // Table detection
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                inTable = true;
                const cols = trimmed.slice(1, -1).split('|');
                tableRows.push(cols);
                return;
            } else if (inTable) {
                elements.push(flushTable(idx));
            }

            // Quick Answer / Executive Summary Box (AEO Callout)
            if (trimmed.startsWith('## Quick Answer:') || trimmed.startsWith('## Summary:')) {
                const title = trimmed.replace(/^##\s*/, '');
                elements.push(
                    <div
                        key={idx}
                        className="my-8 p-6 md:p-8 bg-gradient-to-br from-indigo-50/80 via-white to-red-50/50 rounded-3xl border-2 border-indigo-200/90 shadow-sm"
                    >
                        <div className="flex items-center gap-2.5 mb-3 text-fuji-indigo font-display font-bold text-lg">
                            <span className="w-3 h-3 rounded-full bg-fuji-red animate-pulse"></span>
                            <span>{title}</span>
                        </div>
                    </div>
                );
                return;
            }

            // H2 Heading with anchor ID for ToC
            if (trimmed.startsWith('## ')) {
                const text = trimmed.replace('## ', '').replace(/\*\*/g, '').trim();
                const headingId = slugify(text);
                elements.push(
                    <h2
                        key={idx}
                        id={headingId}
                        className="scroll-mt-28 text-2xl sm:text-3xl font-bold font-display text-fuji-indigo mt-12 mb-5 border-b border-gray-200 pb-3 tracking-tight flex items-center justify-between group"
                    >
                        <span>{text}</span>
                        <a
                            href={`#${headingId}`}
                            className="text-gray-300 group-hover:text-fuji-red opacity-0 group-hover:opacity-100 transition-opacity text-sm ml-2 font-normal"
                            title="Direct Anchor Link"
                        >
                            #
                        </a>
                    </h2>
                );
                return;
            }

            // H3 Heading with anchor ID for ToC
            if (trimmed.startsWith('### ')) {
                const text = trimmed.replace('### ', '').replace(/\*\*/g, '').trim();
                const headingId = slugify(text);
                elements.push(
                    <h3
                        key={idx}
                        id={headingId}
                        className="scroll-mt-28 text-xl sm:text-2xl font-bold font-display text-fuji-indigo mt-9 mb-4 tracking-tight"
                    >
                        {text}
                    </h3>
                );
                return;
            }

            // H4 Heading
            if (trimmed.startsWith('#### ')) {
                elements.push(
                    <h4 key={idx} className="text-lg font-bold text-gray-900 mt-7 mb-2.5">
                        {trimmed.replace('#### ', '')}
                    </h4>
                );
                return;
            }

            // Blockquote
            if (trimmed.startsWith('> ')) {
                elements.push(
                    <blockquote
                        key={idx}
                        className="my-6 pl-5 border-l-4 border-fuji-red bg-red-50/40 py-3.5 pr-4 rounded-r-2xl text-gray-700 italic text-sm leading-relaxed"
                    >
                        {formatInline(trimmed.replace('> ', ''))}
                    </blockquote>
                );
                return;
            }

            // Bullet list
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                elements.push(
                    <li key={idx} className="ml-6 list-disc text-gray-700 leading-relaxed my-1.5 text-base">
                        {formatInline(trimmed.replace(/^[-*]\s*/, ''))}
                    </li>
                );
                return;
            }

            // Numbered list
            if (/^\d+\.\s/.test(trimmed)) {
                elements.push(
                    <li key={idx} className="ml-6 list-decimal text-gray-700 leading-relaxed my-1.5 text-base">
                        {formatInline(trimmed.replace(/^\d+\.\s*/, ''))}
                    </li>
                );
                return;
            }

            // Horizontal Rule
            if (trimmed === '---') {
                elements.push(<hr key={idx} className="my-10 border-gray-200" />);
                return;
            }

            // Normal Paragraph
            if (trimmed.length > 0) {
                elements.push(
                    <p key={idx} className="text-gray-700 leading-relaxed text-base md:text-lg mb-5 font-normal">
                        {formatInline(trimmed)}
                    </p>
                );
            }
        });

        if (inTable) {
            elements.push(flushTable(9999));
        }

        return elements;
    };

    return (
        <article className="pt-20 min-h-screen bg-[#fafafc] text-fuji-slate relative">
            <Helmet>
                <title>{`${post.title} | Fuji Japanese Academy`}</title>
                <meta name="description" content={post.meta_description || post.excerpt} />
                <link rel="canonical" href={shareUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${post.title} | Fuji Japanese Academy`} />
                <meta property="og:description" content={post.meta_description || post.excerpt} />
                <meta property="og:url" content={shareUrl} />
                <meta
                    property="og:image"
                    content={
                        post.image
                            ? post.image.startsWith('http')
                                ? post.image
                                : `${canonicalOrigin}${post.image}`
                            : `${canonicalOrigin}/og-image.jpg`
                    }
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} | Fuji Japanese Academy`} />
                <meta name="twitter:description" content={post.meta_description || post.excerpt} />
            </Helmet>

            {/* Sticky Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-fuji-red via-amber-500 to-fuji-indigo transition-all duration-150"
                style={{ width: `${readingProgress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(readingProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
            />

            {/* Breadcrumb Navigation Trail */}
            <nav className="container mx-auto px-4 md:px-8 py-5" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-fuji-slate/60">
                    <li>
                        <Link to="/" className="hover:text-fuji-red transition-colors">Home</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to="/blog" className="hover:text-fuji-red transition-colors">Knowledge Hub</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <span className="text-fuji-indigo font-semibold">{post.category}</span>
                    </li>
                    <li className="hidden sm:inline">/</li>
                    <li className="hidden sm:inline text-gray-400 truncate max-w-xs">{post.title}</li>
                </ol>
            </nav>

            {/* Article Header */}
            <header className="container mx-auto px-4 md:px-8 max-w-5xl pt-2 pb-8">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3.5 py-1.5 bg-fuji-indigo text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                        {post.category}
                    </span>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" /> {post.date}
                    </span>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {stats.readTime}
                    </span>
                    {stats.words > 0 && (
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-gray-400" /> {stats.words.toLocaleString()} words
                        </span>
                    )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-fuji-indigo tracking-tight leading-[1.2] mb-6">
                    {post.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed mb-8 max-w-4xl">
                    {post.excerpt}
                </p>

                {/* Author Credentials & Fast Social Share Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-y border-gray-200">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuji-red to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-white">
                            {post.author ? post.author[0] : 'S'}
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                                <span>{post.author || 'Sensei Tanaka'}</span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Verified Native Sensei
                                </span>
                            </div>
                            <div className="text-xs text-gray-500">
                                Lead JLPT Curriculum Specialist • Fuji Japanese Academy
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {post.image && (
                            <button
                                type="button"
                                onClick={() => setShowCoverImage(!showCoverImage)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-fuji-indigo hover:text-fuji-indigo transition-all shadow-sm cursor-pointer"
                                title={showCoverImage ? "Switch to words-only reading mode" : "Show cover image"}
                            >
                                {showCoverImage ? (
                                    <>
                                        <EyeOff className="w-3.5 h-3.5 text-gray-400" /> Words Only
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-3.5 h-3.5 text-fuji-indigo" /> Show Image
                                    </>
                                )}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-fuji-red text-white rounded-xl text-xs font-bold hover:bg-fuji-darkRed transition-all shadow-sm shadow-fuji-red/20 cursor-pointer"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                            <span>{copied ? 'Link Copied!' : 'Share'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Featured Image - High Res */}
            {post.image && showCoverImage && (
                <div className="container mx-auto px-4 md:px-8 max-w-5xl mb-12">
                    <div className="relative h-72 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        <img
                            src={post.image}
                            alt={post.title}
                            width="1200"
                            height="480"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '/images/courses/jlpt-n5.jpg';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-6 text-white text-xs opacity-90 font-medium">
                            Fuji Japanese Academy • Authoritative Educational Guide
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Layout with 8-col Content & 4-col Sticky Sidebar */}
            <div className="container mx-auto px-4 md:px-8 max-w-7xl pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Primary Article Body: 8 Columns */}
                    <main className="lg:col-span-8">
                        <div className="bg-white p-6 sm:p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100">
                            {/* Rendered Markdown Body */}
                            {post.content ? (
                                renderFormattedContent(post.content)
                            ) : (
                                <p className="text-gray-700 leading-relaxed text-lg">{post.excerpt}</p>
                            )}

                            {/* "Cite This Article" / Organic Backlink Generator Widget */}
                            <section className="mt-14 p-6 sm:p-8 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-amber-50/20 rounded-3xl border border-indigo-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <Quote className="w-5 h-5 text-fuji-indigo" />
                                        <h3 className="font-display font-bold text-lg text-fuji-indigo">
                                            Cite This Educational Guide
                                        </h3>
                                    </div>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                                        Free Attribution
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                    Referencing this analysis in your blog post, academic report, or study-abroad guide? Use our 1-click verified citation snippets:
                                </p>

                                {/* Format Tabs */}
                                <div className="flex items-center gap-2 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setCitationFormat('html')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            citationFormat === 'html'
                                                ? 'bg-fuji-indigo text-white shadow-sm'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        HTML Embed (with Backlink)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCitationFormat('apa')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            citationFormat === 'apa'
                                                ? 'bg-fuji-indigo text-white shadow-sm'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        APA 7th
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCitationFormat('mla')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            citationFormat === 'mla'
                                                ? 'bg-fuji-indigo text-white shadow-sm'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        MLA 9th
                                    </button>
                                </div>

                                {/* Citation Snippet Box */}
                                <div className="p-3.5 bg-gray-900 text-gray-100 rounded-xl text-xs font-mono relative flex items-center justify-between gap-3 overflow-x-auto">
                                    <code className="text-[11px] leading-relaxed text-indigo-200">
                                        {citationFormat === 'html' && (
                                            `<a href="${shareUrl}" target="_blank" rel="noopener">Fuji Japanese Academy: ${post.title}</a>`
                                        )}
                                        {citationFormat === 'apa' && (
                                            `Fuji Japanese Academy. (2026). ${post.title}. Retrieved from ${shareUrl}`
                                        )}
                                        {citationFormat === 'mla' && (
                                            `"${post.title}." Fuji Japanese Academy, 2026, ${shareUrl}.`
                                        )}
                                    </code>
                                    <button
                                        type="button"
                                        onClick={() => handleCopyCitation(citationFormat)}
                                        className="shrink-0 px-3 py-1.5 bg-fuji-red hover:bg-fuji-darkRed text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow"
                                    >
                                        {citationCopied === citationFormat ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{citationCopied === citationFormat ? 'Copied!' : 'Copy'}</span>
                                    </button>
                                </div>
                            </section>

                            {/* Verified Outbound Authority Citations & Sources */}
                            {post.sources && post.sources.length > 0 && (
                                <section className="mt-12 p-6 rounded-3xl bg-gray-50/80 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Bookmark className="w-5 h-5 text-fuji-red" />
                                        <h3 className="font-display font-bold text-lg text-fuji-indigo">
                                            Verified Primary Sources & Government Directives
                                        </h3>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Data points and immigration frameworks cited in this guide are cross-verified against official Japanese statutory authorities:
                                    </p>
                                    <div className="space-y-2.5">
                                        {post.sources.map((src: BlogSource, sIdx: number) => (
                                            <a
                                                key={sIdx}
                                                href={src.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group p-3.5 bg-white rounded-xl border border-gray-200 hover:border-fuji-red/50 hover:shadow-sm transition-all flex items-start justify-between gap-3 text-xs"
                                            >
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-fuji-red transition-colors flex items-center gap-1.5">
                                                        <span>{src.title}</span>
                                                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-fuji-red transition-colors inline" />
                                                    </div>
                                                    <div className="text-gray-500 text-[11px] mt-0.5">
                                                        {src.publisher} {src.type && `• ${src.type}`}
                                                    </div>
                                                </div>
                                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                                                    Official .jp / .gov
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Internal Cross-Linking Pathways Matrix */}
                            {post.internalLinks && post.internalLinks.length > 0 && (
                                <section className="mt-12">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Compass className="w-5 h-5 text-fuji-indigo" />
                                        <h3 className="font-display font-bold text-xl text-fuji-indigo">
                                            Recommended Next Learning Pathways
                                        </h3>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {post.internalLinks.map((link: InternalCrossLink, lIdx: number) => (
                                            <Link
                                                key={lIdx}
                                                to={link.href}
                                                className="group p-4 bg-gradient-to-br from-white to-gray-50/60 rounded-2xl border border-gray-200 hover:border-fuji-indigo hover:shadow-md transition-all flex flex-col justify-between"
                                            >
                                                <div>
                                                    {link.badge && (
                                                        <span className="inline-block px-2 py-0.5 bg-fuji-indigo/10 text-fuji-indigo text-[10px] font-bold rounded-md uppercase tracking-wider mb-2">
                                                            {link.badge}
                                                        </span>
                                                    )}
                                                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-fuji-red transition-colors mb-1.5 line-clamp-2">
                                                        {link.title}
                                                    </h4>
                                                    {link.description && (
                                                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                                                            {link.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="mt-3 text-xs font-bold text-fuji-indigo group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                                    Explore Path →
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Interactive FAQ Section for AEO */}
                            {post.faqs && post.faqs.length > 0 && (
                                <section className="mt-16 pt-12 border-t-2 border-gray-100">
                                    <div className="flex items-center gap-2.5 mb-6">
                                        <BookOpen className="w-6 h-6 text-fuji-red" />
                                        <h2 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo">
                                            Frequently Asked Questions (FAQ)
                                        </h2>
                                    </div>

                                    <div className="space-y-3.5">
                                        {post.faqs.map((faq, idx) => {
                                            const isOpen = openFaqIndex === idx;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-[#fcfcfe]"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                        className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-900 hover:text-fuji-red transition-colors cursor-pointer"
                                                    >
                                                        <span className="text-base md:text-lg pr-4">{faq.question}</span>
                                                        {isOpen ? (
                                                            <ChevronUp className="w-5 h-5 text-fuji-red shrink-0" />
                                                        ) : (
                                                            <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                                                        )}
                                                    </button>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="px-5 pb-5 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-3"
                                                        >
                                                            {faq.answer}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Author Credentials Card */}
                            <section className="mt-16 p-6 sm:p-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-fuji-red to-amber-500 text-white font-bold text-2xl flex items-center justify-center shadow-lg shrink-0 ring-4 ring-white">
                                    {post.author ? post.author[0] : 'S'}
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                                        <h3 className="font-display font-bold text-lg text-gray-900">
                                            {post.author || 'Sensei Kenji Tanaka'}
                                        </h3>
                                        <span className="px-2 py-0.5 bg-fuji-red/10 text-fuji-red text-xs font-bold rounded-md">
                                            JLPT N1 Certified
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Curriculum Architect & Senior Instructor at Fuji Japanese Academy • Ex-Tokyo University International Language Fellow
                                    </p>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                        Specializes in JLPT examination strategies, medical Japanese protocols for healthcare professionals, and corporate bilingual immersion for Indian engineers.
                                    </p>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                        <Link
                                            to="/enquire"
                                            className="px-4 py-2 bg-fuji-indigo text-white text-xs font-bold rounded-xl hover:bg-fuji-slate transition-all shadow-sm"
                                        >
                                            Book 1-on-1 Academic Counseling
                                        </Link>
                                        <Link
                                            to="/courses"
                                            className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-all"
                                        >
                                            Explore Courses
                                        </Link>
                                    </div>
                                </div>
                            </section>

                            {/* High-Converting CTA Banner */}
                            <div className="mt-14 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-fuji-indigo via-[#2e2a72] to-fuji-indigo text-white shadow-xl text-center relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-fuji-red/30 rounded-full blur-2xl"></div>
                                <div className="relative z-10 max-w-2xl mx-auto">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-fuji-red uppercase tracking-wider mb-4">
                                        <GraduationCap className="w-3.5 h-3.5" /> Start Learning With Experts
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                                        Ready to Master Japanese with Native Senseis?
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                                        Join our upcoming JLPT batches. Attend weekend classroom sessions at our Electronic City, Bengaluru campus or join live interactive Zoom cohorts.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                                        <Link
                                            to="/courses"
                                            className="w-full sm:w-auto px-8 py-3.5 bg-fuji-red hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all text-center"
                                        >
                                            Explore All Courses
                                        </Link>
                                        <Link
                                            to="/locations/electronic-city"
                                            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-1.5"
                                        >
                                            <MapPin className="w-4 h-4 text-rose-300" /> Bengaluru Campus
                                        </Link>
                                    </div>
                                    <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
                                        <span className="text-amber-300 font-semibold">Popular Programs:</span>
                                        <Link to="/courses/jlpt-n5" className="hover:text-white underline">JLPT N5</Link>
                                        <span>•</span>
                                        <Link to="/courses/jlpt-n3" className="hover:text-white underline">JLPT N3 for IT</Link>
                                        <span>•</span>
                                        <Link to="/courses/japanese-for-it-professionals" className="hover:text-white underline">Japanese for Developers</Link>
                                        <span>•</span>
                                        <Link to="/locations/bangalore" className="hover:text-white underline">All Bengaluru Hubs</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>

                    {/* Sticky Sidebar: 4 Columns */}
                    <aside className="lg:col-span-4 sticky top-28 space-y-6">
                        
                        {/* Table of Contents Card */}
                        {headings.length > 0 && (
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-display font-bold text-sm text-fuji-indigo uppercase tracking-wider flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-fuji-red" />
                                        <span>Table of Contents</span>
                                    </h3>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                                        {headings.length} Sections
                                    </span>
                                </div>
                                <nav className="space-y-1 max-h-[380px] overflow-y-auto pr-1 text-xs">
                                    {headings.map((h, hIdx) => {
                                        const isActive = activeHeadingId === h.id;
                                        return (
                                            <a
                                                key={hIdx}
                                                href={`#${h.id}`}
                                                className={`block py-1.5 px-2.5 rounded-lg transition-all leading-snug ${
                                                    h.level === 3 ? 'ml-3 text-[11px]' : 'font-medium'
                                                } ${
                                                    isActive
                                                        ? 'bg-fuji-red/10 text-fuji-red font-bold'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-fuji-indigo'
                                                }`}
                                            >
                                                {h.text}
                                            </a>
                                        );
                                    })}
                                </nav>
                            </div>
                        )}

                        {/* Social Share & Backlink Spread Widget */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-display font-bold text-sm text-fuji-indigo mb-3 flex items-center gap-2">
                                <Share2 className="w-4 h-4 text-fuji-red" />
                                <span>Share & Reference Guide</span>
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">
                                Share this guide with fellow students, engineers, or nurses preparing for Japan:
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const text = encodeURIComponent(`${post.title}\n${shareUrl}`);
                                        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                                    }}
                                    className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-200"
                                >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>WhatsApp</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
                                    }}
                                    className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-blue-200"
                                >
                                    <Share2 className="w-3.5 h-3.5" />
                                    <span>LinkedIn</span>
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleShare}
                                className="w-full py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-fuji-indigo text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copied ? 'Direct Link Copied!' : 'Copy Permanent URL'}</span>
                            </button>
                        </div>

                        {/* Quick Demo Class Lead Magnet */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-fuji-indigo to-[#25215c] text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-fuji-red/20 rounded-full blur-xl"></div>
                            <span className="inline-block px-2.5 py-1 rounded bg-fuji-red text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                                Free Trial Class
                            </span>
                            <h4 className="font-display font-bold text-base mb-2">
                                Attend a Live Japanese Demo Session
                            </h4>
                            <p className="text-white/70 text-xs mb-4 leading-relaxed">
                                Experience how native senseis teach pronunciation, Kanji mnemonics, and real-time conversation.
                            </p>
                            <Link
                                to="/enquire"
                                className="block w-full py-2.5 bg-white text-fuji-indigo hover:bg-amber-400 hover:text-gray-900 text-center font-bold text-xs rounded-xl transition-all shadow"
                            >
                                Reserve Free Spot →
                            </Link>
                        </div>

                    </aside>

                </div>

                {/* Bottom Related Articles Grid */}
                {relatedPosts.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-fuji-indigo">
                                    Related Educational Guides
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Continue your research across our comprehensive curriculum archives
                                </p>
                            </div>
                            <Link
                                to="/blog"
                                className="text-xs font-bold text-fuji-red hover:underline inline-flex items-center gap-1"
                            >
                                All Articles →
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map(rel => (
                                <Link
                                    key={rel.id}
                                    to={`/blog/${rel.slug || rel.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
                                >
                                    <div className="h-44 overflow-hidden relative">
                                        <img
                                            src={rel.image || '/images/courses/jlpt-n5.jpg'}
                                            alt={rel.title}
                                            width="400"
                                            height="176"
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = '/images/courses/jlpt-n5.jpg';
                                            }}
                                        />
                                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 rounded-lg text-[10px] font-bold uppercase text-fuji-indigo">
                                            {rel.category}
                                        </span>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h4 className="font-bold text-gray-900 group-hover:text-fuji-red transition-colors line-clamp-2 mb-2 text-sm">
                                            {rel.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 line-clamp-2 mt-auto font-light">
                                            {rel.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </article>
    );
};

export default BlogPostPage;
