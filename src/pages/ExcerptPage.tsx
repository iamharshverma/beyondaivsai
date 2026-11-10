import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ArrowRight, CheckCircle2, Maximize2 } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookConfig';
import { CHAPTER_ONE_EXCERPT, CHAPTERS_DATA } from '../data/chaptersData';
import { InfographicLightboxModal } from '../components/ChapterInfographicAtlas';
import { LeadCaptureModule } from '../components/LeadCaptureModule';
import { useTheme } from '../context/ThemeContext';
import { usePageSEO, trackEvent } from '../utils/analytics';

export const ExcerptPage: React.FC = () => {
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readerTheme, setReaderTheme] = useState<'dark' | 'light'>(theme);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [markedComplete, setMarkedComplete] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const chapterOne = CHAPTERS_DATA[0];

  useEffect(() => {
    setReaderTheme(theme);
  }, [theme]);

  usePageSEO({
    title: 'Read Chapter 1 Sample Excerpt — AI vs. AI | Harsh Verma',
    description:
      'Read the official Chapter 1 preview ("The New Cyber Arms Race") of AI vs. AI: Engineering the Cybersecurity Counteroffensive by Harsh Verma.',
    canonicalPath: '/excerpt',
    ogType: 'book',
  });

  useEffect(() => {
    trackEvent('sample_chapter_opened', { page: '/excerpt' });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setScrollProgress(pct);
        if (pct > 80 && !markedComplete) {
          setMarkedComplete(true);
          trackEvent('sample_chapter_completed', { progress: pct });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [markedComplete]);

  const fontSizeClass =
    fontSize === 'sm'
      ? 'text-sm leading-relaxed'
      : fontSize === 'lg'
      ? 'text-lg leading-relaxed'
      : fontSize === 'xl'
      ? 'text-xl leading-relaxed'
      : 'text-base leading-relaxed';

  return (
    <div className="py-10 md:py-14">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200 dark:bg-[#0B1628]">
        <div
          className="h-full bg-[#0284C7] dark:bg-[#37D5F5] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[960px] mx-auto px-6 space-y-10">
        {/* Reader Toolbar & Book Header */}
        <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-center gap-4">
            <img
              src={BOOK_METADATA.coverImage}
              alt={BOOK_METADATA.fullTitle}
              referrerPolicy="no-referrer"
              className="w-14 h-20 object-cover rounded-lg border border-slate-200 dark:border-slate-400/20 shrink-0"
            />
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                OFFICIAL CHAPTER 1 READING ENVIRONMENT · {scrollProgress}% READ
              </div>
              <h1 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {BOOK_METADATA.fullTitle}
              </h1>
              <div className="text-xs text-slate-600 dark:text-[#AAB8CC]">
                By {BOOK_METADATA.author} · No email required to read this preview
              </div>
            </div>
          </div>

          {/* Font Size & Light/Dark Reader Mode Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#07111F] p-1 rounded-lg border border-slate-200 dark:border-slate-400/15">
              {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFontSize(sz)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    fontSize === sz
                      ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white'
                      : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setReaderTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#07111F] border border-slate-200 dark:border-slate-400/15 text-xs font-medium text-slate-900 dark:text-[#F5F8FF] hover:border-[#0284C7] dark:hover:border-[#37D5F5]"
            >
              {readerTheme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Paper Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Cyber Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Reading Canvas (Supports Both Dark and Light Reading Modes with Proper Surface/Text Pairing) */}
        <article
          className={`rounded-2xl border p-6 sm:p-12 transition-colors ${
            readerTheme === 'light'
              ? 'bg-white text-[#0F172A] border-slate-200 shadow-md'
              : 'bg-[#0B1628] text-[#F5F8FF] border-slate-400/20 shadow-2xl'
          }`}
        >
          <header
            className={`pb-8 mb-8 border-b ${
              readerTheme === 'light' ? 'border-slate-200' : 'border-slate-400/15'
            }`}
          >
            <div
              className={`text-xs font-mono mb-2 ${
                readerTheme === 'light' ? 'text-[#0284C7]' : 'text-[#37D5F5]'
              }`}
            >
              CHAPTER 01 EXCERPT · {CHAPTER_ONE_EXCERPT.estimatedReadTime}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight">
              {CHAPTER_ONE_EXCERPT.title}
            </h2>
            <p
              className={`mt-2 text-base sm:text-lg font-medium ${
                readerTheme === 'light' ? 'text-slate-600' : 'text-[#AAB8CC]'
              }`}
            >
              {CHAPTER_ONE_EXCERPT.alternateSubtitle}
            </p>

            {/* Official Chapter 1 Infographic Visual Overview */}
            {chapterOne && (
              <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-400/20 bg-slate-50 dark:bg-[#07111F] p-3">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="relative group block w-full cursor-zoom-in focus:outline-none"
                  aria-label="Inspect Chapter 1 Infographic in full screen"
                >
                  <img
                    src={chapterOne.infographicUrl}
                    alt={chapterOne.infographicTitle}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/85 text-white text-xs font-mono font-semibold backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom Chapter 1 Infographic</span>
                  </span>
                </button>
              </div>
            )}
          </header>

          <div className="space-y-10 max-w-[68ch] mx-auto">
            {CHAPTER_ONE_EXCERPT.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold font-display pt-2">
                  {section.heading}
                </h3>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className={`${fontSizeClass} ${
                      readerTheme === 'light' ? 'text-slate-700' : 'text-[#AAB8CC]'
                    }`}
                  >
                    {para}
                  </p>
                ))}
                {section.callout && (
                  <div
                    className={`rounded-xl p-6 my-6 border ${
                      readerTheme === 'light'
                        ? 'bg-sky-50 border-sky-200 text-slate-900'
                        : 'bg-[#101F34] border-[#37D5F5]/35 text-[#F5F8FF]'
                    }`}
                  >
                    <div
                      className={`text-xs font-mono font-semibold mb-1.5 ${
                        readerTheme === 'light' ? 'text-sky-700' : 'text-[#37D5F5]'
                      }`}
                    >
                      {section.callout.title}
                    </div>
                    <p className="text-sm sm:text-base italic leading-relaxed">
                      “{section.callout.quote}”
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          <footer
            className={`mt-12 pt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              readerTheme === 'light' ? 'border-slate-200' : 'border-slate-400/15'
            }`}
          >
            <div
              className={`text-xs flex items-center gap-2 ${
                readerTheme === 'light' ? 'text-slate-600' : 'text-[#AAB8CC]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#37D5F5] shrink-0" />
              <span>End of Chapter 1 Public Excerpt · Full book contains 11 chapters.</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/chapters"
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  readerTheme === 'light'
                    ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    : 'bg-[#101F34] text-[#F5F8FF] hover:bg-[#162944]'
                }`}
              >
                Explore All 11 Chapters
              </Link>
              <Link
                to="/order"
                onClick={() => trackEvent('order_cta_clicked', { source: 'excerpt_footer' })}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white"
              >
                <span>Order Full Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </footer>
        </article>

        {/* Optional Explicit Opt-In Module */}
        <LeadCaptureModule />
      </div>

      <InfographicLightboxModal
        isOpen={lightboxOpen}
        initialSlideId="ch-1"
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
