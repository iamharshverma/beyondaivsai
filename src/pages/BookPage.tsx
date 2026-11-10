import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, HelpCircle, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BOOK_METADATA, BOOK_FORMATS } from '../data/bookConfig';
import { CHAPTERS_DATA, CHAPTER_ONE_EXCERPT } from '../data/chaptersData';
import { FOUR_SECURITY_PATTERNS } from '../data/frameworkData';
import { BookMockup3D } from '../components/BookMockup3D';
import {
  ChapterInfographicAtlas,
  InfographicLightboxModal,
} from '../components/ChapterInfographicAtlas';
import { FadeInUp, fadeInUpVariants, staggerGridVariants } from '../components/FadeInUp';
import { usePageSEO, trackEvent } from '../utils/analytics';

const AUDIENCE_PROFILES = [
  {
    id: 'all',
    label: 'All Perspectives',
    takeaways: [
      'Understand how AI acts simultaneously as an offensive weapon, a vulnerable target, and a defensive shield.',
      'Master the 5-layer AI Attack Surface taxonomy and 4 AI-Native Security Design Patterns.',
      'Operationalize the 30/60/90-Day Counteroffensive Playbook across engineering and security teams.',
    ],
  },
  {
    id: 'ciso',
    label: 'CISOs & SecOps Leaders',
    takeaways: [
      'Address the latency asymmetry between automated adversary swarms and human SOC triage.',
      'Benchmark organizational readiness with the 5-Stage AI Security Maturity Model and 100-Question Assessment.',
      'Establish governance for Non-Human Identities (NHIs), Shadow AI, and incident rollback runbooks.',
    ],
  },
  {
    id: 'architect',
    label: 'AI & Cloud Security Architects',
    takeaways: [
      'Architect inline Circuit Breakers, parallel Shadow Evaluators, Retrieval Gatekeepers, and Sandboxed Tool Brokers.',
      'Enforce On-Behalf-Of (OBO) cryptographic token delegation and per-chunk RAG access control.',
      'Design tamper-evident telemetry lineage graphs from user prompt to downstream API execution.',
    ],
  },
  {
    id: 'builder',
    label: 'Founders & Product Engineers',
    takeaways: [
      'Embed the Minimum Viable AI Security (MVAS) stack from Day One without slowing product velocity.',
      'Prevent cross-tenant RAG data leakage and denial-of-wallet token exhaustion in multi-tenant SaaS.',
      'Pass enterprise customer security due diligence with transparent, verifiable security boundaries.',
    ],
  },
  {
    id: 'academic',
    label: 'Educators & Researchers',
    takeaways: [
      'Adopt a structured 11-chapter curriculum bridging adversarial machine learning and systems security.',
      'Integrate hands-on lab specifications covering indirect prompt injection and sandboxed tool mediation.',
      'Prepare graduate and undergraduate students for emerging AI Cybersecurity engineering careers.',
    ],
  },
];

const BOOK_FAQS = [
  {
    q: 'How does AI vs. AI differ from general books on artificial intelligence or high-level AI policy?',
    a: 'AI vs. AI: Engineering the Cybersecurity Counteroffensive is written from a systems and security engineering perspective. Rather than offering abstract policy commentary, it provides concrete threat models across a 5-layer AI attack surface, four composable security design patterns (Circuit Breaker, Shadow Evaluator, Retrieval Gatekeeper, and Sandboxed Tool Broker), and a 30/60/90-day implementation playbook.',
  },
  {
    q: 'Is this book related to "Beyond AI Engineering"?',
    a: 'Both books are authored by Harsh Verma as part of his broader technology publishing portfolio, but they address distinct domains. AI vs. AI: Engineering the Cybersecurity Counteroffensive is a dedicated 11-chapter technical work focused specifically on AI cybersecurity, adversarial threat dynamics, attack-surface mapping, and defensive security architecture.',
  },
  {
    q: 'Does the book claim AI can autonomously eliminate all cyberattacks?',
    a: 'No. A core thesis of the book is that probabilistic AI models cannot be trusted as unchecked black boxes. Effective defense combines AI-assisted speed with deterministic architectural boundaries, least-privilege identity delegation, and human oversight gates.',
  },
  {
    q: 'Can I read an excerpt before ordering?',
    a: 'Yes. An interactive preview of Chapter 1 ("The New Cyber Arms Race") is available directly on this page and in the dedicated /excerpt reading environment with adjustable font size and reading themes.',
  },
  {
    q: 'How can universities or enterprise security teams arrange bulk orders or workshops?',
    a: 'Visit the /order page (Bulk & Institutional section) or the /educators page to submit a volume enquiry for university courses, corporate security teams, or executive briefings.',
  },
];

export const BookPage: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [previewFontSize, setPreviewFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [lightboxSlideId, setLightboxSlideId] = useState<string | null>(null);

  usePageSEO({
    title: 'The Book — AI vs. AI: Engineering the Cybersecurity Counteroffensive',
    description:
      'Explore the full 11-chapter overview, technical design patterns, Chapter 1 reading preview, and edition formats for AI vs. AI by Harsh Verma.',
    canonicalPath: '/book',
    ogType: 'book',
  });

  useEffect(() => {
    trackEvent('book_page_viewed', { page: '/book' });
  }, []);

  const currentAudience =
    AUDIENCE_PROFILES.find((a) => a.id === selectedAudience) || AUDIENCE_PROFILES[0];

  return (
    <div className="pb-16 sm:pb-20 w-full overflow-x-hidden">
      {/* 1–6. Product Hero & Extended Overview */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 border-b border-slate-200 dark:border-slate-400/15 bg-slate-100/70 dark:bg-[#0A1426]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            <FadeInUp className="lg:col-span-5 lg:sticky lg:top-24 min-w-0">
              <BookMockup3D showAudioTeaser={true} />
            </FadeInUp>

            <FadeInUp delay={0.1} className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
                <span>OFFICIAL BOOK MONOGRAPH</span>
                <span aria-hidden="true">·</span>
                <span>11 CHAPTERS</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600 dark:text-[#AAB8CC] font-normal">{BOOK_METADATA.releaseWindow}</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] tracking-tight text-balance">
                  {BOOK_METADATA.title}
                </h1>
                <h2 className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold font-display bg-gradient-to-r from-[#1D4ED8] to-[#E11D48] dark:from-[#38BDF8] dark:to-[#FB7185] bg-clip-text text-transparent">
                  {BOOK_METADATA.subtitle}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm font-mono text-slate-600 dark:text-[#AAB8CC] break-words">
                  Supporting Tagline: “{BOOK_METADATA.supportingTagline}”
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-900 dark:text-[#F5F8FF]">
                <span>Author:</span>
                <Link to="/author" className="font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline">
                  {BOOK_METADATA.author}
                </Link>
                <span className="text-slate-600 dark:text-[#AAB8CC]">({BOOK_METADATA.authorRole})</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed break-words">
                <p className="text-slate-900 dark:text-[#F5F8FF] font-medium">{BOOK_METADATA.shortDescription}</p>
                <p>{BOOK_METADATA.extendedOverview}</p>
              </div>

              {/* 7 & 8. Why the Book Matters & What Readers Will Learn (Book Features Grid) */}
              <motion.div
                variants={staggerGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 sm:p-6 space-y-4 shadow-xs dark:shadow-none"
              >
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  What You Will Learn to Engineer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-[#AAB8CC]">
                  {[
                    'Analyze how offensive AI accelerates reconnaissance, deception, and adaptive probing',
                    'Map the 5-layer AI attack surface across models, prompts, RAG, agents, and tools',
                    'Implement Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers, and Tool Brokers',
                    'Build continuous automated red-teaming harnesses and evidence-grounded SOC workflows',
                    'Engineer resilient state rollback, semantic honeytokens, and tiered autonomy fallbacks',
                    'Execute a phased 30/60/90-day counteroffensive roadmap across enterprise environments',
                  ].map((item) => (
                    <motion.div key={item} variants={fadeInUpVariants} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                      <span className="break-words">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
                <Link
                  to="/order"
                  onClick={() => trackEvent('order_cta_clicked', { source: 'book_page_top' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] hover:opacity-95 text-xs sm:text-sm font-bold text-white transition-all shadow-md"
                >
                  <span>Order the Book</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#chapter-1-preview"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-[#0F1D33] hover:bg-slate-100 dark:hover:bg-[#162944] border border-slate-300 dark:border-slate-400/20 text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F5F8FF] transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />
                  <span>Jump to Chapter 1 Preview</span>
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 9. Intended Audience Interactive Matcher */}
      <section className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="max-w-3xl mb-6 sm:mb-8">
            <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
              WHO THIS BOOK IS FOR
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Tailored Engineering Takeaways by Role
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.05} className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-[#0A1426] border border-slate-200 dark:border-slate-400/15 mb-6">
            {AUDIENCE_PROFILES.map((aud) => (
              <button
                key={aud.id}
                type="button"
                onClick={() => setSelectedAudience(aud.id)}
                className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedAudience === aud.id
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-xs'
                    : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
                }`}
              >
                {aud.label}
              </button>
            ))}
          </FadeInUp>

          <motion.div
            key={currentAudience.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 sm:p-6 shadow-2xs dark:shadow-none"
          >
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] mb-4">
              Key Outcomes for {currentAudience.label}:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentAudience.takeaways.map((takeaway, i) => (
                <div
                  key={takeaway}
                  className="rounded-lg bg-slate-50 dark:bg-[#0A1426] border border-slate-200 dark:border-slate-400/10 p-4 text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed"
                >
                  <div className="font-mono text-[#E11D48] dark:text-[#38BDF8] font-semibold mb-1.5">
                    0{i + 1}. Priority Outcome
                  </div>
                  {takeaway}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10 & 11. 11-Chapter Overview, Visual Infographic Atlas & Technical Highlights */}
      <section className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-400/15 bg-slate-100/80 dark:bg-[#0A1426]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
                COMPLETE MANUSCRIPT STRUCTURE &amp; VISUAL BLUEPRINTS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                11 Chapters, Interactive Infographics &amp; Core Architectural Patterns
              </h2>
            </div>
            <Link
              to="/chapters"
              className="text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Detailed Chapter Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeInUp>

          {/* Interactive Master Blueprint & Chapter Infographic Gallery */}
          <FadeInUp delay={0.04}>
            <ChapterInfographicAtlas />
          </FadeInUp>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {CHAPTERS_DATA.map((ch) => (
              <motion.div key={ch.slug} variants={fadeInUpVariants} className="min-w-0">
                <div className="h-full rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:border-[#38BDF8]/40 p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 transition-all hover:-translate-y-0.5 shadow-2xs dark:shadow-none">
                  <button
                    type="button"
                    onClick={() => setLightboxSlideId(`ch-${ch.number}`)}
                    className="relative group w-full sm:w-36 h-28 sm:h-24 rounded-lg overflow-hidden bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-200 dark:border-slate-400/15 shrink-0 cursor-zoom-in"
                    aria-label={`Inspect Chapter ${ch.number} Infographic`}
                  >
                    <img
                      src={ch.infographicUrl}
                      alt={ch.infographicTitle}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900/85 text-white text-[9px] font-mono">
                      <Maximize2 className="w-2.5 h-2.5" />
                      <span>Zoom</span>
                    </span>
                  </button>

                  <div className="min-w-0 flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs font-mono font-semibold text-[#E11D48] dark:text-[#38BDF8]">
                        Chapter {String(ch.number).padStart(2, '0')} · {ch.partLabel}
                      </div>
                      <Link to={`/chapters/${ch.slug}`} className="block group">
                        <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] mt-0.5 transition-colors">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 line-clamp-2">
                          {ch.summary}
                        </p>
                      </Link>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setLightboxSlideId(`ch-${ch.number}`)}
                        className="font-mono text-[11px] text-[#E11D48] dark:text-[#38BDF8] hover:underline cursor-pointer"
                      >
                        View Infographic
                      </button>
                      <Link
                        to={`/chapters/${ch.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                      >
                        <span>Chapter Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {FOUR_SECURITY_PATTERNS.map((pat) => (
              <motion.div
                key={pat.id}
                variants={fadeInUpVariants}
                className="rounded-xl bg-white dark:bg-[#060D1A] border border-slate-200 dark:border-slate-400/15 p-5 shadow-2xs dark:shadow-none"
              >
                <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8]">Design Pattern</div>
                <h4 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                  {pat.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-2 leading-relaxed">
                  {pat.securityRole}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <InfographicLightboxModal
          isOpen={Boolean(lightboxSlideId)}
          initialSlideId={lightboxSlideId || 'master-blueprint'}
          onClose={() => setLightboxSlideId(null)}
        />
      </section>

      {/* 12. Embedded Sample Chapter Reading Preview */}
      <section id="chapter-1-preview" className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-400/15">
        <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6">
          <FadeInUp className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8]">EMBEDDED READING PREVIEW</div>
              <h2 className="text-xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {CHAPTER_ONE_EXCERPT.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-[#AAB8CC] mr-1">Text Size:</span>
              {(['sm', 'base', 'lg'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setPreviewFontSize(sz)}
                  className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors ${
                    previewFontSize === sz
                      ? 'bg-[#1D4ED8] dark:bg-[#3478F6] text-white border-[#1D4ED8] dark:border-[#3478F6]'
                      : 'bg-white dark:bg-[#0F1D33] text-slate-700 dark:text-[#AAB8CC] border-slate-300 dark:border-slate-400/20'
                  }`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
              <Link
                to="/excerpt"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0F1D33] border border-slate-300 dark:border-slate-400/20 text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Full Reader Mode →
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.08} className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/20 p-5 sm:p-8 md:p-10 space-y-6 shadow-sm dark:shadow-none">
            <div className="text-xs font-mono text-slate-500 dark:text-[#AAB8CC] pb-4 border-b border-slate-200 dark:border-slate-400/10">
              {CHAPTER_ONE_EXCERPT.notice}
            </div>

            {CHAPTER_ONE_EXCERPT.sections.slice(0, 2).map((sec) => (
              <div key={sec.heading} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">{sec.heading}</h3>
                {sec.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={`text-slate-700 dark:text-[#AAB8CC] leading-relaxed break-words ${
                      previewFontSize === 'sm'
                        ? 'text-sm'
                        : previewFontSize === 'lg'
                        ? 'text-base sm:text-lg'
                        : 'text-sm sm:text-base'
                    }`}
                  >
                    {p}
                  </p>
                ))}
                {sec.callout && (
                  <div className="rounded-xl bg-sky-50 dark:bg-[#0A1426] border border-sky-200 dark:border-[#38BDF8]/30 p-4 sm:p-5 my-4">
                    <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8] mb-1">
                      {sec.callout.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-900 dark:text-[#F5F8FF] italic leading-relaxed">
                      “{sec.callout.quote}”
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-slate-200 dark:border-slate-400/15 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/excerpt"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Continue Reading Full Chapter 1 Excerpt in Reader View</span>
              </Link>
              <Link
                to="/order"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-xs font-semibold text-white transition-all"
              >
                <span>Order Full 11-Chapter Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 16 & 17. Book Formats & Ordering Options */}
      <section className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-400/15 bg-slate-100/80 dark:bg-[#0A1426]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="max-w-3xl mb-8 sm:mb-10">
            <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
              EDITIONS &amp; ORDERING
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Available Formats &amp; Ordering Pathways
            </h2>
          </FadeInUp>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          >
            {BOOK_FORMATS.map((fmt) => (
              <motion.div
                key={fmt.id}
                variants={fadeInUpVariants}
                className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 sm:p-6 flex flex-col justify-between shadow-2xs dark:shadow-none"
              >
                <div>
                  <div className="text-xs font-mono font-semibold text-[#E11D48] dark:text-[#38BDF8] mb-2">{fmt.status}</div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">{fmt.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-[#AAB8CC] mt-1">{fmt.editionNote}</p>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-3 leading-relaxed">
                    {fmt.bindingDetails}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                    {fmt.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-400/10">
                  <div className="text-xs font-mono font-semibold text-slate-900 dark:text-[#F5F8FF] mb-3">{fmt.priceDisplay}</div>
                  <Link
                    to="/order"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] hover:opacity-95 text-xs font-semibold text-white transition-all"
                  >
                    <span>Select Format on Order Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 18 & 19. Frequently Asked Questions */}
      <section className="pt-12 sm:pt-16">
        <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6">
          <FadeInUp className="mb-8 sm:mb-10">
            <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] mb-2">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Questions About AI vs. AI
            </h2>
          </FadeInUp>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {BOOK_FAQS.map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeInUpVariants}
                className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 sm:p-6 shadow-2xs dark:shadow-none"
              >
                <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#E11D48] dark:text-[#38BDF8] shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
