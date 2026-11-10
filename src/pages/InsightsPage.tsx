import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Share2,
  Check,
  BookOpen,
} from 'lucide-react';
import { INSIGHTS_ARTICLES, INSIGHTS_CATEGORIES } from '../data/insightsData';
import { BOOK_METADATA } from '../data/bookConfig';
import { usePageSEO } from '../utils/analytics';

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  usePageSEO({
    title: 'Insights & Knowledge Hub — AI Cybersecurity & Agentic Architecture | Harsh Verma',
    description:
      'Technical monographs and peer-reviewed research synthesis on AI Cybersecurity, Agentic AI Security, LLM Security, AI Attack Surface, and Security Architecture by Harsh Verma.',
    canonicalPath: '/insights',
  });

  const filteredArticles = INSIGHTS_ARTICLES.filter((art) => {
    const matchesCat =
      selectedCategory === 'All Categories' || art.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
            EDITORIAL PUBLICATION &amp; ARCHITECTURAL MONOGRAPHS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            Insights &amp; Knowledge Hub
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Deep-dive architectural analyses, research syntheses, and engineering perspectives by {BOOK_METADATA.author} exploring AI cybersecurity, autonomous agent risk, and defensive system design.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/15 p-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 dark:text-[#AAB8CC] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic, pattern, or keyword (e.g., Agentic AI, OBO, Circuit Breaker)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] dark:focus:border-[#37D5F5]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {INSIGHTS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white'
                    : 'bg-white dark:bg-[#101F34] text-slate-600 dark:text-[#AAB8CC] border border-slate-200 dark:border-transparent hover:text-slate-900 dark:hover:text-[#F5F8FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-10 text-center space-y-3 shadow-xs">
            <div className="text-base font-bold text-slate-900 dark:text-[#F5F8FF]">
              No articles matched that category or search term.
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Categories');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] text-xs font-semibold text-white"
            >
              Show All Monographs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.slug}
                className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 hover:border-[#0284C7]/50 dark:hover:border-[#37D5F5]/40 p-6 flex flex-col justify-between transition-colors shadow-xs"
              >
                <div className="space-y-3">
                  {/* Unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
                    <span className="text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                      {art.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                    <Link
                      to={`/insights/${art.slug}`}
                      className="hover:text-[#0284C7] dark:hover:text-[#37D5F5] transition-colors"
                    >
                      {art.title}
                    </Link>
                  </h2>

                  <p className="text-xs font-medium text-[#0284C7] dark:text-[#37D5F5]">
                    {art.publicationNote}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-400/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-600 dark:text-[#AAB8CC]">By {art.author}</span>
                  <Link
                    to={`/insights/${art.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                  >
                    <span>Read Full Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === slug);

  usePageSEO({
    title: article ? `${article.title} | Insights — Harsh Verma` : 'Insights | AI vs. AI',
    description: article ? article.summary : BOOK_METADATA.shortDescription,
    canonicalPath: article ? `/insights/${article.slug}` : '/insights',
    ogType: 'article',
    jsonLd: article
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.summary,
          author: {
            '@type': 'Person',
            name: article.author,
            jobTitle: article.authorTitle,
          },
          publisher: {
            '@type': 'Organization',
            name: BOOK_METADATA.brandName,
          },
        }
      : undefined,
  });

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const relatedArticles = INSIGHTS_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[920px] mx-auto px-6 space-y-10">
        <div className="flex items-center justify-between">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Insights Hub</span>
          </Link>
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 text-xs text-slate-900 dark:text-[#F5F8FF] hover:border-[#0284C7] dark:hover:border-[#37D5F5] shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        <article className="rounded-2xl bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6 sm:p-10 space-y-8 shadow-sm">
          <header className="space-y-4 border-b border-slate-200 dark:border-slate-400/15 pb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
              <span className="text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publicationNote}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] text-balance">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              {article.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-[#AAB8CC]">
              <div>
                By{' '}
                <Link
                  to="/author"
                  className="text-slate-900 dark:text-[#F5F8FF] font-semibold hover:text-[#0284C7] dark:hover:text-[#37D5F5]"
                >
                  {article.author}
                </Link>{' '}
                · {article.authorTitle}
              </div>
              {article.externalVerificationUrl && (
                <a
                  href={article.externalVerificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0284C7] dark:text-[#37D5F5] font-semibold hover:underline"
                >
                  <span>Verify Conference Proceedings / DOI</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </header>

          {/* Key Takeaways Box */}
          <div className="rounded-xl bg-slate-50 dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2.5">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold">
              KEY ARCHITECTURAL TAKEAWAYS
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-900 dark:text-[#F5F8FF]">
              {article.keyTakeaways.map((kt) => (
                <li key={kt} className="text-slate-600 dark:text-[#AAB8CC]">
                  • {kt}
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Sections */}
          <div className="space-y-8 max-w-[68ch]">
            {article.sections.map((sec) => (
              <section key={sec.heading} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {sec.heading}
                </h2>
                {sec.body.map((p, idx) => (
                  <p key={idx} className="text-base text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Internal Link to Associated Book Chapter */}
          <footer className="pt-8 border-t border-slate-200 dark:border-slate-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                ASSOCIATED BOOK CHAPTER
              </div>
              <Link
                to={`/chapters/${article.relatedChapterSlug}`}
                className="text-sm font-bold text-slate-900 dark:text-[#F5F8FF] hover:text-[#0284C7] dark:hover:text-[#37D5F5] inline-flex items-center gap-1.5 mt-1"
              >
                <BookOpen className="w-4 h-4 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>{article.relatedChapterTitle}</span>
              </Link>
            </div>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white whitespace-nowrap shrink-0"
            >
              <span>Order AI vs. AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </footer>
        </article>

        {/* Related Articles */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-slate-500 dark:text-[#AAB8CC]">
            RELATED ARCHITECTURAL MONOGRAPHS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/insights/${rel.slug}`}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 hover:border-[#0284C7]/50 dark:hover:border-[#37D5F5]/40 p-5 transition-colors shadow-xs"
              >
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  {rel.category}
                </div>
                <div className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                  {rel.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-2 line-clamp-2">
                  {rel.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
