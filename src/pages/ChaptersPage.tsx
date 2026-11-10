import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, HelpCircle, Cpu } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { BOOK_METADATA } from '../data/bookConfig';
import { usePageSEO, trackEvent } from '../utils/analytics';

export const ChaptersPage: React.FC = () => {
  usePageSEO({
    title: 'All 11 Chapters — AI vs. AI: Engineering the Cybersecurity Counteroffensive',
    description:
      'Explore all 11 chapters of AI vs. AI by Harsh Verma: from The New Cyber Arms Race and Mapping the AI Attack Surface to AI Native Security Design Patterns and the Counter Offensive Playbook.',
    canonicalPath: '/chapters',
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        <div className="max-w-3xl">
          <div className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5] mb-2">
            OFFICIAL 11-CHAPTER MANUSCRIPT SYLLABUS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            Architecture of the Book: All 11 Chapters
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Every chapter in <em>{BOOK_METADATA.fullTitle}</em> is structured around concrete engineering questions, threat models, architectural patterns, and actionable learning outcomes. Select any chapter below to inspect its themes, technical concepts, and architectural diagram.
          </p>
        </div>

        <div className="space-y-6">
          {CHAPTERS_DATA.map((ch) => (
            <div
              key={ch.slug}
              className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 hover:border-[#0284C7] dark:hover:border-[#37D5F5]/40 p-6 md:p-8 transition-colors shadow-2xs dark:shadow-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#AAB8CC]">
                    <span className="text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                      Chapter {String(ch.number).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ch.partLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ch.readingTime}</span>
                  </div>

                  <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                    <Link to={`/chapters/${ch.slug}`} className="hover:text-[#0284C7] dark:hover:text-[#37D5F5] transition-colors">
                      {ch.number}. {ch.title}
                    </Link>
                  </h2>
                  <div className="text-sm font-medium text-[#0284C7] dark:text-[#37D5F5]">{ch.subtitle}</div>
                  <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">{ch.summary}</p>

                  <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-500 dark:text-[#AAB8CC]">
                    {ch.technicalConcepts.map((tc, i) => (
                      <React.Fragment key={tc.name}>
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <span className="text-slate-900 dark:text-[#F5F8FF] font-medium">{tc.name}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50 dark:bg-[#0B1628] rounded-xl border border-slate-200 dark:border-slate-400/15 p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5] mb-2">
                      KEY LEARNING OUTCOMES
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                      {ch.learningOutcomes.map((out) => (
                        <li key={out} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5] shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-400/10 flex items-center justify-between">
                    <Link
                      to={`/chapters/${ch.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                    >
                      <span>Open Chapter {ch.number} Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ChapterDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const chapter = CHAPTERS_DATA.find((c) => c.slug === slug);

  usePageSEO({
    title: chapter
      ? `Chapter ${chapter.number}: ${chapter.title} | AI vs. AI`
      : 'Chapter Overview | AI vs. AI',
    description: chapter ? chapter.summary : BOOK_METADATA.shortDescription,
    canonicalPath: chapter ? `/chapters/${chapter.slug}` : '/chapters',
  });

  if (!chapter) {
    return <Navigate to="/chapters" replace />;
  }

  const prevChapter = CHAPTERS_DATA.find((c) => c.number === chapter.number - 1);
  const nextChapter = CHAPTERS_DATA.find((c) => c.number === chapter.number + 1);
  const relatedChapterObjs = CHAPTERS_DATA.filter((c) =>
    chapter.relatedChapters.includes(c.number)
  );

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto px-6 space-y-12">
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 11 Chapters</span>
          </Link>
          <span className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5]">
            Chapter {String(chapter.number).padStart(2, '0')} of 11 · {chapter.partLabel}
          </span>
        </div>

        {/* Chapter Header & Introduction */}
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-400/15 pb-10">
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] text-balance">
            Chapter {chapter.number}: {chapter.title}
          </h1>
          <p className="text-lg sm:text-xl font-medium font-display text-[#0284C7] dark:text-[#37D5F5]">
            {chapter.subtitle}
          </p>
          <p className="text-base text-slate-900 dark:text-[#F5F8FF] leading-relaxed pt-2">
            {chapter.introduction}
          </p>
          <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">{chapter.summary}</p>
        </div>

        {/* Chapter Architectural Visual Diagram */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5]">
              CHAPTER {chapter.number} ARCHITECTURAL SCHEMATIC
            </div>
            <div className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">{chapter.visualSpec.title}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-red-200 dark:border-[#F05252]/40 p-5 shadow-2xs dark:shadow-none">
              <div className="text-xs font-mono text-red-600 dark:text-[#F05252] font-semibold mb-2">
                01. OFFENSIVE VECTOR / RISK
              </div>
              <p className="text-xs text-slate-800 dark:text-[#F5F8FF] leading-relaxed">
                {chapter.visualSpec.offensiveVector}
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-sky-200 dark:border-[#37D5F5]/40 p-5 shadow-2xs dark:shadow-none">
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold mb-2">
                02. DEFENSIVE COUNTERMEASURE
              </div>
              <p className="text-xs text-slate-800 dark:text-[#F5F8FF] leading-relaxed">
                {chapter.visualSpec.defensiveCountermeasure}
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-amber-200 dark:border-amber-400/40 p-5 shadow-2xs dark:shadow-none">
              <div className="text-xs font-mono text-amber-700 dark:text-amber-300 font-semibold mb-2">
                03. HUMAN OVERSIGHT GATE
              </div>
              <p className="text-xs text-slate-800 dark:text-[#F5F8FF] leading-relaxed">
                {chapter.visualSpec.humanOversightGate}
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC] pt-2 border-t border-slate-200 dark:border-slate-400/10">
            {chapter.visualSpec.caption}
          </div>
        </div>

        {/* Main Themes & Key Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-2xs dark:shadow-none">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">Main Themes</h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-[#AAB8CC]">
              {chapter.mainThemes.map((t, idx) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#0284C7] dark:text-[#37D5F5] font-semibold mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-2xs dark:shadow-none">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Key Engineering Questions Answered
            </h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-[#AAB8CC]">
              {chapter.keyQuestions.map((q) => (
                <li key={q} className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#0284C7] dark:text-[#37D5F5] shrink-0 mt-1" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Concepts & Learning Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-2xs dark:shadow-none">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
              <span>Core Technical Concepts</span>
            </h2>
            <div className="space-y-4">
              {chapter.technicalConcepts.map((tc) => (
                <div
                  key={tc.name}
                  className="rounded-lg bg-slate-50 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/10 p-4"
                >
                  <div className="text-sm font-bold font-mono text-[#0284C7] dark:text-[#37D5F5]">{tc.name}</div>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 leading-relaxed">{tc.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 flex flex-col justify-between shadow-2xs dark:shadow-none">
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Chapter Learning Outcomes
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC]">
                {chapter.learningOutcomes.map((lo) => (
                  <li key={lo} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#37D5F5] shrink-0 mt-0.5" />
                    <span>{lo}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter Conversion CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-400/15 space-y-3">
              <Link
                to="/order"
                onClick={() =>
                  trackEvent('order_cta_clicked', { source: `chapter_${chapter.number}` })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] text-xs font-semibold text-white transition-colors"
              >
                <span>Order the Full Book</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/excerpt"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0B1628] hover:bg-slate-100 dark:hover:bg-[#162944] border border-slate-300 dark:border-slate-400/20 text-xs font-semibold text-slate-900 dark:text-[#F5F8FF] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Read Chapter 1 Sample Excerpt</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Chapters */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-400/15">
          <h3 className="text-sm font-mono font-semibold text-slate-600 dark:text-[#AAB8CC] mb-4">
            RELATED CHAPTERS IN THE COUNTEROFFENSIVE ARCHITECTURE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedChapterObjs.map((rel) => (
              <Link
                key={rel.slug}
                to={`/chapters/${rel.slug}`}
                className="rounded-xl bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/15 hover:border-[#0284C7] dark:hover:border-[#37D5F5]/40 p-4 transition-colors shadow-2xs dark:shadow-none"
              >
                <div className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5]">Chapter {rel.number}</div>
                <div className="text-sm font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                  {rel.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Prev / Next Navigation */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-400/15 flex items-center justify-between gap-4">
          {prevChapter ? (
            <Link
              to={`/chapters/${prevChapter.slug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-[#AAB8CC] hover:text-[#0284C7] dark:hover:text-[#37D5F5]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                Ch {prevChapter.number}: {prevChapter.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextChapter && (
            <Link
              to={`/chapters/${nextChapter.slug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline"
            >
              <span>
                Ch {nextChapter.number}: {nextChapter.title}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
