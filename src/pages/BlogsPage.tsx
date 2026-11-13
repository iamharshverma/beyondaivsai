import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Headphones,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AUTHOR_BLOG_ARTICLES } from '../data/blogsData';
import { AUTHOR_DATA } from '../data/authorData';
import { BOOK_METADATA } from '../data/bookConfig';
import { FadeInUp } from '../components/FadeInUp';
import { usePageSEO, trackEvent } from '../utils/analytics';

const CATEGORIES = ['All', 'Cybersecurity', 'AI Research', 'Engineering', 'Interviews'] as const;

const PLATFORMS = [
  'All Publications',
  'Forbes Technology Council',
  'RSA Conference',
  'HackerNoon',
  'The AI Journal',
  'Founders Creative',
  'Medium',
] as const;

const getPlatformBadgeStyle = (platform: string) => {
  if (platform.includes('Forbes')) {
    return 'bg-slate-900 text-white border-slate-700';
  }
  if (platform.includes('RSA')) {
    return 'bg-[#991B1B] text-red-100 border-red-400/40';
  }
  if (platform.includes('HackerNoon')) {
    return 'bg-[#064E3B] text-[#6EE7B7] border-[#10B981]/40';
  }
  if (platform.includes('AI Journal')) {
    return 'bg-[#1E3A8A] text-sky-200 border-sky-400/40';
  }
  if (platform.includes('Founders')) {
    return 'bg-amber-900 text-amber-100 border-amber-400/40';
  }
  return 'bg-slate-800 text-slate-100 border-slate-600';
};

export const BlogsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All Publications');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  usePageSEO({
    title: 'Author Blogs & Industry Articles | Harsh Verma — Beyond AI vs. AI',
    description:
      'Read 30+ published articles, research essays, and interviews by Harsh Verma across Forbes Technology Council, RSA Conference, HackerNoon, and The AI Journal on Agentic AI, Cybersecurity, and Deterministic Architecture.',
    canonicalPath: '/blogs',
  });

  const filteredBlogs = useMemo(() => {
    return AUTHOR_BLOG_ARTICLES.filter((article) => {
      const matchesCat =
        selectedCategory === 'All' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesPlat =
        selectedPlatform === 'All Publications' || article.platform === selectedPlatform;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.platform.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesPlat && matchesQuery;
    });
  }, [selectedCategory, selectedPlatform, searchQuery]);

  const featuredCount = useMemo(
    () => AUTHOR_BLOG_ARTICLES.filter((b) => b.featured).length,
    []
  );

  return (
    <div className="py-10 sm:py-14 md:py-18 w-full overflow-x-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Hero Header */}
        <FadeInUp className="rounded-2xl bg-white/95 dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-35"
            style={{
              background:
                'radial-gradient(circle at 10% 20%, rgba(225, 29, 72, 0.06), transparent 45%), radial-gradient(circle at 90% 25%, rgba(29, 78, 216, 0.07), transparent 48%)',
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2 text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
                <span>PUBLISHED THOUGHT LEADERSHIP BY HARSH VERMA</span>
                <span aria-hidden="true">·</span>
                <span>{AUTHOR_BLOG_ARTICLES.length} ARTICLES</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] tracking-tight text-balance">
                AI Architecture, Agentic Security &amp; Engineering Blogs
              </h1>
              <p className="text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed max-w-2xl">
                Explore {AUTHOR_DATA.name}’s published articles, executive columns, and feature interviews across{' '}
                <strong className="text-[#091122] dark:text-[#F5F8FF]">Forbes Technology Council</strong>,{' '}
                <strong className="text-[#091122] dark:text-[#F5F8FF]">RSA Conference</strong>,{' '}
                <strong className="text-[#091122] dark:text-[#F5F8FF]">HackerNoon</strong>, and{' '}
                <strong className="text-[#091122] dark:text-[#F5F8FF]">The AI Journal</strong>—directly expanding the themes of{' '}
                <em>{BOOK_METADATA.fullTitle}</em>.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                <a
                  href="https://www.harshverma.me/page-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/20 font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                >
                  <span>View on harshverma.me/page-blog</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  to="/order"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white font-semibold shadow-xs"
                >
                  <span>Order the Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Publication Stats Summary */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[
                { label: 'Published Articles', value: `${AUTHOR_BLOG_ARTICLES.length}` },
                { label: 'Featured Columns', value: `${featuredCount}` },
                { label: 'Forbes & RSAC', value: '10+ Essays' },
                { label: 'HackerNoon & AIJ', value: '18+ Features' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/15 p-4"
                >
                  <div className="text-lg sm:text-xl font-bold font-mono text-[#091122] dark:text-[#F5F8FF] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-600 dark:text-[#AAB8CC] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Search, Category & Publication Filter Bar */}
        <FadeInUp delay={0.05} className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-4 sm:p-5 space-y-4 shadow-2xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-xs'
                      : 'bg-[#F4F7FC] dark:bg-[#0A1426] text-slate-600 dark:text-[#AAB8CC] hover:text-[#091122] dark:hover:text-[#F5F8FF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, #tags..."
                className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/20 text-xs sm:text-sm text-[#091122] dark:text-[#F5F8FF] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>
          </div>

          {/* Publication Filter Row */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-400/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-[#AAB8CC] font-mono mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Publication:</span>
              </span>
              {PLATFORMS.map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => setSelectedPlatform(plat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedPlatform === plat
                      ? 'bg-[#1D4ED8] text-white font-semibold'
                      : 'text-slate-600 dark:text-[#AAB8CC] hover:bg-slate-100 dark:hover:bg-[#0A1426]'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-[#AAB8CC]">
              Showing <strong className="text-[#091122] dark:text-[#F5F8FF]">{filteredBlogs.length}</strong> of{' '}
              {AUTHOR_BLOG_ARTICLES.length} articles
            </div>
          </div>
        </FadeInUp>

        {/* Articles Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-10 text-center space-y-3">
            <div className="text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
              No matching blog articles found
            </div>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC]">
              Try clearing your search filter or selecting "All" categories and publications.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPlatform('All Publications');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBlogs.map((blog, idx) => {
              const isCyber = blog.category === 'Cybersecurity';
              const hasImg = blog.thumbnail && !failedImages[blog.id];

              return (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: Math.min(idx * 0.025, 0.35), ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:border-[#38BDF8]/50 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-200 min-w-0"
                >
                  <div>
                    {/* Thumbnail Header */}
                    <div className="relative h-44 w-full bg-[#EDF2F9] dark:bg-[#060D1A] overflow-hidden border-b border-slate-200/80 dark:border-slate-400/10">
                      {hasImg ? (
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [blog.id]: true }))
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-[#091122] via-[#1E3A8A] to-[#E11D48]/80 text-white">
                          <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">
                            {blog.platform}
                          </span>
                          <span className="text-sm font-bold font-display line-clamp-2">
                            {blog.title}
                          </span>
                        </div>
                      )}

                      {/* Publication Badge */}
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-sm ${getPlatformBadgeStyle(
                          blog.platform
                        )}`}
                      >
                        {blog.platform}
                      </span>

                      {/* Featured Ribbon */}
                      {blog.featured && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-mono font-bold uppercase shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-[#AAB8CC]">
                        <span
                          className={`font-bold ${
                            isCyber
                              ? 'text-[#E11D48] dark:text-[#FB7185]'
                              : 'text-[#1D4ED8] dark:text-[#38BDF8]'
                          }`}
                        >
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{blog.date}</span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </span>
                        </div>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                        <a
                          href={blog.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent('blog_article_clicked', {
                              title: blog.title,
                              platform: blog.platform,
                            })
                          }
                        >
                          {blog.title}
                        </a>
                      </h2>

                      <p className="text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>

                      {blog.tags.length > 0 && (
                        <div className="pt-1 flex flex-wrap gap-1.5">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/15 text-[10px] font-mono text-slate-600 dark:text-[#AAB8CC]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3.5 bg-[#F8FAFC] dark:bg-[#0A1426]/90 border-t border-slate-200/80 dark:border-slate-400/10 flex items-center justify-between gap-2 text-xs">
                    {blog.podcastUrl ? (
                      <a
                        href={blog.podcastUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>Spotify Podcast</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-500 dark:text-[#AAB8CC] truncate">
                        By {AUTHOR_DATA.name}
                      </span>
                    )}

                    <a
                      href={blog.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('blog_article_clicked', {
                          title: blog.title,
                          platform: blog.platform,
                        })
                      }
                      className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:text-[#E11D48] dark:hover:text-[#FB7185] transition-colors shrink-0"
                    >
                      <span>Read Article</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Bottom Book Conversion Banner */}
        <FadeInUp className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8]">
              GO DEEPER INTO THE ARCHITECTURE
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
              Read the Complete 11-Chapter Counteroffensive Blueprint
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] dark:text-[#AAB8CC]">
              Every article above connects to the engineering models, 5-layer AI attack surface, and 4 deterministic security design patterns in <em>{BOOK_METADATA.fullTitle}</em>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-xs sm:text-sm font-bold text-white shadow-sm"
            >
              <span>Order the Book</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/excerpt"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#CBD5E1] dark:border-slate-400/20 text-xs sm:text-sm font-semibold text-[#091122] dark:text-[#F5F8FF]"
            >
              <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />
              <span>Read Chapter 1</span>
            </Link>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};
