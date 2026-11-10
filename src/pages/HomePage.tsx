import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Shield,
  Layers,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BOOK_METADATA, BOOK_FORMATS } from '../data/bookConfig';
import { TRIAD_PILLARS, FOUR_SECURITY_PATTERNS } from '../data/frameworkData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { AUTHOR_DATA } from '../data/authorData';
import { BookMockup3D } from '../components/BookMockup3D';
import {
  CounteroffensiveHeroGraphic,
  PillarTechnicalIllustration,
} from '../components/CounteroffensiveDiagram';
import { ChapterInfographicAtlas } from '../components/ChapterInfographicAtlas';
import { CounteroffensiveAssessment } from '../components/CounteroffensiveAssessment';
import { LeadCaptureModule } from '../components/LeadCaptureModule';
import { FadeInUp, fadeInUpVariants, staggerGridVariants } from '../components/FadeInUp';
import { usePageSEO, trackEvent } from '../utils/analytics';

export const HomePage: React.FC = () => {
  const [selectedPatternId, setSelectedPatternId] = useState(FOUR_SECURITY_PATTERNS[0].id);

  usePageSEO({
    title: 'AI vs. AI: Engineering the Cybersecurity Counteroffensive | Harsh Verma',
    description:
      'The Future of Cybersecurity Is AI vs. AI. The Counteroffensive Must Be Engineered. Official book and technical architecture platform by Harsh Verma.',
    canonicalPath: '/',
    ogType: 'book',
  });

  const activePattern =
    FOUR_SECURITY_PATTERNS.find((p) => p.id === selectedPatternId) || FOUR_SECURITY_PATTERNS[0];

  return (
    <div className="w-full overflow-x-hidden">
      {/* 6.1 HERO SECTION — Refined Red (Offensive AI) vs. Blue (Defensive AI) Counteroffensive Stage */}
      <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-24 border-b border-[#D5E0F0] dark:border-slate-400/15 overflow-hidden">
        {/* Softened Red vs. Blue Radial Clash Spotlights */}
        <div
          className="absolute inset-0 pointer-events-none opacity-65 dark:opacity-45"
          style={{
            background:
              'radial-gradient(circle at 12% 22%, rgba(225, 29, 72, 0.065), transparent 46%), radial-gradient(circle at 88% 24%, rgba(29, 78, 216, 0.075), transparent 48%), radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.04), transparent 52%)',
          }}
        />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Hero Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-4 sm:space-y-6 min-w-0"
            >
              {/* Live Red vs. Blue AI Clash Telemetry Badge */}
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#0F1D33]/90 border border-[#D5E0F0] dark:border-slate-400/20 shadow-2xs text-[11px] sm:text-xs font-mono max-w-full">
                <span className="inline-flex items-center gap-1 font-bold text-[#E11D48] dark:text-[#FB7185]">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>OFFENSIVE AI</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-[10px]">
                  VS.
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#1D4ED8] dark:text-[#38BDF8]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>DEFENSIVE AI</span>
                </span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline text-slate-600 dark:text-[#AAB8CC]">
                  {BOOK_METADATA.releaseWindow}
                </span>
              </div>

              {/* Powerful Split Red-vs-Blue Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-balance leading-[1.06]">
                  <span className="bg-gradient-to-r from-[#E11D48] to-[#BE123C] dark:from-[#FB7185] dark:to-[#E11D48] bg-clip-text text-transparent">
                    AI
                  </span>{' '}
                  <span className="text-[#091122] dark:text-[#F5F8FF] font-mono text-[0.76em] mx-0.5">
                    vs.
                  </span>{' '}
                  <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] dark:from-[#38BDF8] dark:to-[#3478F6] bg-clip-text text-transparent">
                    AI
                  </span>
                </h1>
                <h2 className="mt-2 sm:mt-2.5 text-lg sm:text-2xl md:text-3xl font-bold font-display bg-gradient-to-r from-[#091122] via-[#1D4ED8] to-[#E11D48] dark:from-[#F5F8FF] dark:via-[#38BDF8] dark:to-[#FB7185] bg-clip-text text-transparent text-balance leading-snug">
                  {BOOK_METADATA.subtitle}
                </h2>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-[#334155] dark:text-[#AAB8CC] leading-relaxed max-w-2xl break-words">
                {BOOK_METADATA.shortDescription}
              </p>

              <div className="pt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-[#091122] dark:text-[#F5F8FF]">
                <span className="text-slate-600 dark:text-[#AAB8CC]">By</span>
                <Link
                  to="/author"
                  className="font-bold text-[#1D4ED8] dark:text-[#38BDF8] hover:text-[#E11D48] dark:hover:text-[#FB7185] underline underline-offset-4 transition-colors"
                >
                  {BOOK_METADATA.author}
                </Link>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-600 dark:text-[#AAB8CC]">
                  {BOOK_METADATA.authorRole}
                </span>
              </div>

              {/* Mobile-Optimized CTAs with flex-wrap */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <Link
                  to="/order"
                  onClick={() => trackEvent('order_cta_clicked', { source: 'hero_primary' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] hover:from-[#BE123C] hover:to-[#1E40AF] text-xs sm:text-sm font-bold text-white shadow-[0_10px_28px_-6px_rgba(225,29,72,0.4),0_10px_28px_-6px_rgba(29,78,216,0.45)] transition-all"
                >
                  <span>ORDER THE BOOK</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/95 dark:bg-[#0F1D33] hover:bg-white dark:hover:bg-[#162944] border border-[#CBD5E1] dark:border-slate-400/20 text-xs sm:text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] shadow-xs transition-all"
                >
                  <span>EXPLORE THE BOOK</span>
                </Link>
                <Link
                  to="/assessment"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#E11D48] dark:text-[#FB7185] hover:text-[#1D4ED8] dark:hover:text-[#38BDF8] transition-colors"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>TAKE AI READINESS TEST</span>
                </Link>
              </div>

              {/* Opposing AI Systems Visual Architecture Module */}
              <div className="pt-2 sm:pt-3 min-w-0">
                <CounteroffensiveHeroGraphic />
              </div>
            </motion.div>

            {/* 3D Book Showcase Column */}
            <FadeInUp delay={0.12} className="lg:col-span-5 flex flex-col items-center min-w-0">
              <BookMockup3D showAudioTeaser={true} />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 6.2 COMPACT RED-VS-BLUE EDITION STRIP */}
      <section className="bg-gradient-to-r from-[#E11D48]/[0.06] via-[#EAF0F8]/90 to-[#1D4ED8]/[0.08] dark:from-[#E11D48]/[0.09] dark:via-[#0A1426] dark:to-[#1D4ED8]/[0.12] border-b border-[#D5E0F0] dark:border-slate-400/15 py-5 sm:py-6">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="min-w-0">
              <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
                AVAILABLE EDITION FORMATS &amp; DIRECT AUTHOR ALLOCATION
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] mt-1 break-words">
                {BOOK_METADATA.coreMessage}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-600 dark:text-[#AAB8CC]">
              {BOOK_FORMATS.map((fmt, index) => (
                <React.Fragment key={fmt.id}>
                  {index > 0 && (
                    <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">·</span>
                  )}
                  <div>
                    <span className="font-semibold text-[#091122] dark:text-[#F5F8FF]">
                      {fmt.name}
                    </span>
                    <span className="ml-1.5 text-slate-600 dark:text-[#AAB8CC]">({fmt.status})</span>
                  </div>
                </React.Fragment>
              ))}
              <Link
                to="/order"
                className="w-full sm:w-auto text-center px-4 py-2 rounded-lg bg-white dark:bg-[#0F1D33] hover:bg-[#1D4ED8] hover:text-white dark:hover:bg-[#3478F6] text-[#091122] dark:text-[#F5F8FF] border border-[#CBD5E1] dark:border-slate-400/20 font-semibold transition-colors shadow-2xs"
              >
                Configure Order / Bulk Enquiry →
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 6.3 THREE CENTRAL PILLARS — BOOK FEATURES WITH SCROLL FADE-IN-UP */}
      <section className="py-12 sm:py-16 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
              <Zap className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
              <span>THE CENTRAL PROPOSITION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              <span className="text-[#E11D48] dark:text-[#FB7185]">AI Is the Weapon.</span>{' '}
              <span>AI Is the Target.</span>{' '}
              <span className="text-[#1D4ED8] dark:text-[#38BDF8]">AI Is the Shield.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
              Artificial intelligence is changing the capabilities available to both attackers and defenders—while introducing a complex new attack surface across models, prompts, retrieval systems, agents, APIs, and connected tools.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
          >
            {TRIAD_PILLARS.map((pillar, idx) => {
              const isWeapon = pillar.id === 'weapon';
              const isShield = pillar.id === 'shield';
              const topBarClass = isWeapon
                ? 'from-[#E11D48] to-[#FB7185]'
                : isShield
                ? 'from-[#1D4ED8] to-[#38BDF8]'
                : 'from-[#E11D48] via-[#7C3AED] to-[#0284C7]';

              return (
                <motion.div
                  key={pillar.id}
                  variants={fadeInUpVariants}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 overflow-hidden flex flex-col justify-between transition-all shadow-sm hover:shadow-xl min-w-0"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${topBarClass}`} />
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold mb-3">
                        <span
                          className={
                            isWeapon
                              ? 'text-[#E11D48] dark:text-[#FB7185]'
                              : isShield
                              ? 'text-[#1D4ED8] dark:text-[#38BDF8]'
                              : 'text-[#6366F1] dark:text-[#37D5F5]'
                          }
                        >
                          {pillar.label}
                        </span>
                        <span className="text-slate-500 dark:text-[#AAB8CC] font-normal">
                          0{idx + 1} / 03
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mb-2.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155] dark:text-[#AAB8CC] leading-relaxed mb-5">
                        {pillar.summary}
                      </p>

                      <div className="mb-5">
                        <PillarTechnicalIllustration
                          type={pillar.id as 'weapon' | 'target' | 'shield'}
                        />
                      </div>

                      <ul className="space-y-2 text-xs text-[#091122] dark:text-[#F5F8FF]">
                        {pillar.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: pillar.accentColor }}
                            />
                            <span className="text-[#334155] dark:text-[#AAB8CC] break-words">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-400/10 text-xs text-[#334155] dark:text-[#AAB8CC]">
                      <strong className="text-[#091122] dark:text-[#F5F8FF] block mb-1">
                        Engineering Implication:
                      </strong>
                      {pillar.engineeringReality}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 6.4 THE CHANGING CYBER BATTLEFIELD — RED EXPOSURE VS. BLUE COUNTEROFFENSIVE */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0A1426] border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="max-w-3xl mb-8 sm:mb-12">
            <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
              ARCHITECTURAL SHIFT · RED VS. BLUE MATRIX
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              The Changing Cyber Battlefield: Conventional Security vs. Agentic AI Systems
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
              Traditional security controls remain essential foundations, yet autonomous agents, natural-language instruction streams, RAG pipelines, and delegated tool calling require dedicated AI-native controls.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.08} className="overflow-x-auto rounded-2xl border border-[#D5E0F0] dark:border-slate-400/15 bg-white dark:bg-[#0F1D33] shadow-sm">
            <table className="w-full min-w-[640px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#D5E0F0] dark:border-slate-400/15 bg-[#F4F7FC] dark:bg-[#060D1A]/80 text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
                  <th className="py-3.5 px-4 sm:px-5">Architectural Dimension</th>
                  <th className="py-3.5 px-4 sm:px-5">Conventional Deterministic Software</th>
                  <th className="py-3.5 px-4 sm:px-5 text-[#E11D48] dark:text-[#FB7185] bg-red-500/[0.04]">
                    Red AI Exposure (Attack Surface)
                  </th>
                  <th className="py-3.5 px-4 sm:px-5 text-[#1D4ED8] dark:text-[#38BDF8] bg-blue-500/[0.04]">
                    Blue AI Counteroffensive Control
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-400/10 text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Instruction vs. Data Boundary
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Strict separation (compiled code vs. parameterized SQL/JSON inputs)
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC] bg-red-500/[0.02]">
                    Shared token stream; untrusted documents can inject instructions
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#091122] dark:text-[#F5F8FF] font-medium bg-blue-500/[0.02]">
                    Retrieval Gatekeeper + spotlighted provenance delimiters
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Knowledge Retrieval (RAG)
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Deterministic row-level SQL queries with explicit schema joins
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC] bg-red-500/[0.02]">
                    Vector similarity search across multi-source embeddings
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#091122] dark:text-[#F5F8FF] font-medium bg-blue-500/[0.02]">
                    Pre-retrieval ACL enforcement &amp; chunk poisoning scanners
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Tool &amp; API Execution
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Hard-coded service logic invoking fixed downstream endpoints
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC] bg-red-500/[0.02]">
                    Dynamic model-selected function calls &amp; confused deputy risk
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#091122] dark:text-[#F5F8FF] font-medium bg-blue-500/[0.02]">
                    Sandboxed Tool Broker + short-lived On-Behalf-Of (OBO) tokens
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Multi-Step Delegation
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Predictable DAG workflows and finite state machines
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC] bg-red-500/[0.02]">
                    Autonomous multi-agent planning &amp; recursive reasoning loops
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#091122] dark:text-[#F5F8FF] font-medium bg-blue-500/[0.02]">
                    Inline Circuit Breaker + out-of-band Shadow Evaluator
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Incident Recovery
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Container restart, patch deployment, and firewall blocklists
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#334155] dark:text-[#AAB8CC] bg-red-500/[0.02]">
                    Poisoned episodic memory and contaminated retrieval context
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-[#091122] dark:text-[#F5F8FF] font-medium bg-blue-500/[0.02]">
                    Episodic state rollback, semantic honeytokens &amp; human gates
                  </td>
                </tr>
              </tbody>
            </table>
          </FadeInUp>
        </div>
      </section>

      {/* 6.5 EXPLORE THE BOOK — INTERACTIVE INFOGRAPHIC ATLAS */}
      <section className="py-12 sm:py-16 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
                APPROVED 11-SEQUENCE MANUSCRIPT ARCHITECTURE &amp; VISUAL ATLAS
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                Interactive Blueprint &amp; Sequence Infographic Atlas
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] max-w-2xl">
                Inspect the official Master Cybersecurity Blueprint and interactive sequence infographics below, or head to The Book page for the complete sequence-by-sequence breakdown and technical takeaways.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 transition-opacity"
              >
                <BookOpen className="w-4 h-4" />
                <span>Sequence Details in The Book</span>
              </Link>
              <Link
                to="/chapters"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/20 text-xs sm:text-sm font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:border-[#1D4ED8] transition-colors"
              >
                <span>Explore Full Sequence</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInUp>

          {/* Interactive Master Blueprint & Chapter Infographic Explorer */}
          <FadeInUp delay={0.05}>
            <ChapterInfographicAtlas />
          </FadeInUp>
        </div>
      </section>

      {/* 6.55 INTERACTIVE AI COUNTEROFFENSIVE READINESS ASSESSMENT & DIAGNOSTIC */}
      <section
        id="assessment"
        className="py-12 sm:py-16 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15"
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp>
            <CounteroffensiveAssessment />
          </FadeInUp>
        </div>
      </section>

      {/* 6.6 TECHNICAL ENGINEERING HIGHLIGHTS — 4 DESIGN PATTERNS */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0A1426] border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div>
              <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
                CHAPTER 4 ARCHITECTURAL CORE
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                Four AI-Native Security Design Patterns
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] max-w-2xl">
                Deterministic security wrappers engineered to mediate untrusted context, evaluate semantic intent, halt runaway execution, and sandbox tool calls.
              </p>
            </div>
            <Link
              to="/framework"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Open Full Interactive Framework</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInUp>

          {/* Interactive Pattern Selector Tabs with flex-wrap on mobile/tablet */}
          <FadeInUp delay={0.05} className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-[#060D1A] border border-[#D5E0F0] dark:border-slate-400/15 mb-6 sm:mb-8">
            {FOUR_SECURITY_PATTERNS.map((pat, index) => (
              <button
                key={pat.id}
                type="button"
                onClick={() => setSelectedPatternId(pat.id)}
                className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedPatternId === pat.id
                    ? 'bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-white shadow-xs'
                    : 'text-slate-600 dark:text-[#AAB8CC] hover:text-[#091122] dark:hover:text-[#F5F8FF]'
                }`}
              >
                0{index + 1}. {pat.name}
              </button>
            ))}
          </FadeInUp>

          {/* Selected Pattern Deep-Dive Panel */}
          <motion.div
            key={activePattern.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-5 sm:p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              <div className="lg:col-span-7 space-y-4 min-w-0">
                <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8]">
                  {activePattern.architecturalPlacement}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                  {activePattern.name} — {activePattern.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                  {activePattern.securityRole}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-mono font-semibold text-[#091122] dark:text-[#F5F8FF] mb-2.5">
                    EXECUTION MEDIATION SEQUENCE:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-[#AAB8CC]">
                    {activePattern.mechanismSteps.map((step) => (
                      <li
                        key={step}
                        className="bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/10 rounded-lg px-3.5 py-2.5 font-mono text-[#091122] dark:text-[#F5F8FF] break-words"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between bg-[#F4F7FC] dark:bg-[#0A1426] rounded-xl border border-[#D5E0F0] dark:border-slate-400/15 p-5 space-y-4 min-w-0">
                <div>
                  <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#FB7185] mb-1">
                    RED AI THREAT MITIGATED
                  </div>
                  <p className="text-xs text-[#091122] dark:text-[#F5F8FF] leading-relaxed">
                    {activePattern.threatMitigated}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                  <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] mb-1">
                    BLUE AI RUNTIME PROFILE
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] font-mono break-words">
                    {activePattern.latencyProfile}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                  <div className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-300 mb-1">
                    HUMAN OVERSIGHT GATE
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                    {activePattern.humanApprovalTrigger}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                  <Link
                    to="/chapters/ai-native-security-design-patterns"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                  >
                    <span>Read Chapter 4 Architectural Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6.7 BOOK RESOURCES */}
      <section className="py-12 sm:py-16 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
                PRACTITIONER TOOLKIT &amp; COMPANION LIBRARY
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                Book Frameworks, Assessments &amp; Roadmaps
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] max-w-2xl">
                Interactive reference modules and companion specifications included in the AI vs. AI ecosystem.
              </p>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Browse Searchable Resource Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInUp>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {RESOURCES_DATA.map((res) => (
              <motion.div key={res.id} variants={fadeInUpVariants} className="min-w-0">
                <Link
                  to="/resources"
                  className="group h-full rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:border-[#38BDF8]/50 p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-2xs hover:shadow-md"
                >
                  <div>
                    <div className="text-xs font-mono font-semibold text-[#E11D48] dark:text-[#FB7185] mb-2">
                      {res.type} · {res.chapterReference}
                    </div>
                    <h3 className="text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] transition-colors">
                      {res.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                      {res.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-400/10 flex items-center justify-between text-xs text-slate-600 dark:text-[#AAB8CC]">
                    <span>{res.availability}</span>
                    <span className="text-[#1D4ED8] dark:text-[#38BDF8] font-semibold">Inspect →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6.8 AUTHOR SECTION — EXECUTIVE AUTHORITY & RESEARCH SHOWCASE */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#F2F6FC]/80 dark:bg-[#0A1426] border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <FadeInUp className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-[#E11D48]/80 via-[#6366F1]/75 to-[#1D4ED8]/80 shadow-md max-w-xs sm:max-w-sm mx-auto">
                <div className="rounded-[14.5px] overflow-hidden bg-white dark:bg-[#0F1D33]">
                  <img
                    src={AUTHOR_DATA.portraitUrl}
                    alt={`${AUTHOR_DATA.name} — ${AUTHOR_DATA.currentTitle} at ${AUTHOR_DATA.currentOrganization}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4 sm:p-5 bg-white dark:bg-[#060D1A] border-t border-slate-200 dark:border-slate-400/15 space-y-2.5">
                    <div>
                      <div className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                        {AUTHOR_DATA.name}
                      </div>
                      <div className="text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] mt-0.5">
                        {AUTHOR_DATA.currentTitle} · {AUTHOR_DATA.currentOrganization}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-400/10 flex flex-wrap gap-1.5">
                      {['FBCS Fellow', 'IEEE Senior Member', 'Forbes Tech Council', 'UC Berkeley SkyDeck'].map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-0.5 rounded-md bg-[#F4F7FC] dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 text-[10px] font-mono font-semibold text-slate-700 dark:text-[#AAB8CC]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1} className="lg:col-span-8 space-y-5 min-w-0">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/20 text-[11px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#E11D48] to-[#1D4ED8]" />
                  <span className="bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
                    THE ENGINEER BEHIND THE COUNTEROFFENSIVE
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                  {AUTHOR_DATA.name} — Architecting Trusted AI &amp; Enterprise Cyber Defense at Global Scale
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                {AUTHOR_DATA.executiveBio}
              </p>

              {/* Executive Domain Pillars (Enterprise Track Record & Research Authority) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="rounded-xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-4">
                  <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] mb-1.5">
                    FORTUNE 500 ARCHITECTURE LEADERSHIP
                  </div>
                  <p className="text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                    Principal &amp; Enterprise Security Leadership across{' '}
                    <strong className="text-[#091122] dark:text-[#F5F8FF]">
                      NortonLifeLock (Gen Digital), Wells Fargo, Western Union, and Oracle
                    </strong>
                    —securing mission-critical identity, cloud-native infrastructure, and millions of global consumers.
                  </p>
                </div>
                <div className="rounded-xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-4">
                  <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#FB7185] mb-1.5">
                    PUBLISHED RESEARCH &amp; INDUSTRY THOUGHT LEADERSHIP
                  </div>
                  <p className="text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                    Author of <strong className="text-[#091122] dark:text-[#F5F8FF]">27+ peer-reviewed papers</strong> (IEEE, Springer, Raptors 2026), <strong className="text-[#091122] dark:text-[#F5F8FF]">6 patent filings</strong>, and <strong className="text-[#091122] dark:text-[#F5F8FF]">30+ featured articles</strong> in Forbes Technology Council, RSA Conference, and HackerNoon.
                  </p>
                </div>
              </div>

              {/* Action Buttons including Direct Link to the New Blogs Page */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Link
                  to="/author"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] hover:opacity-95 text-xs font-semibold text-white transition-all shadow-sm"
                >
                  <span>Full Author Profile &amp; Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1D33] hover:bg-slate-50 dark:hover:bg-[#162944] border border-[#CBD5E1] dark:border-slate-400/20 text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] transition-all shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#38BDF8]" />
                  <span>Read 30+ Author Blogs</span>
                </Link>
                <a
                  href={AUTHOR_DATA.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                >
                  <span>harshverma.me</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 6.9 REVIEWS AND CREDIBILITY */}
      <section className="py-12 sm:py-16 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
          <FadeInUp className="max-w-3xl mb-8 sm:mb-10">
            <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
              EDITORIAL INTEGRITY &amp; PEER CREDIBILITY
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              Reviews, Manuscript Feedback &amp; Technical Credibility
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
              We maintain strict editorial transparency: early technical manuscript evaluations are distinguished from post-publication reader reviews, and no unverified or fabricated ratings ever appear on this platform.
            </p>
          </FadeInUp>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          >
            <motion.div variants={fadeInUpVariants} className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-5 sm:p-6">
              <Shield className="w-5 h-5 text-[#E11D48] dark:text-[#FB7185] mb-3" />
              <h3 className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                Peer-Reviewed Research Foundation
              </h3>
              <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                Grounded in the author’s 27+ published papers across IEEE, Springer, and the 2026 Raptors Conference proceedings on <em>Trusted AI in the Age of Autonomous Agents</em>, plus six patent filings.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-5 sm:p-6">
              <Layers className="w-5 h-5 text-[#1D4ED8] dark:text-[#38BDF8] mb-3" />
              <h3 className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                Independent Manuscript Review Policy
              </h3>
              <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                The manuscript has undergone technical review for architectural rigor. Individual reviewer quotations and institutional affiliations are published only with explicit written permission.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <CheckCircle2 className="w-5 h-5 text-[#1D4ED8] dark:text-[#38BDF8] mb-3" />
                <h3 className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                  Submit Reader &amp; Practitioner Feedback
                </h3>
                <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                  Read the Chapter 1 excerpt or full edition and submit your technical evaluation, errata notes, or classroom feedback via our verified review pathway.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-400/10">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                >
                  <span>Visit Reviews &amp; Submission Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6.10 FINAL CONVERSION SECTION & LEAD CAPTURE */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0A1426]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
          <FadeInUp className="relative rounded-2xl p-[1.5px] bg-gradient-to-r from-[#E11D48] via-[#6366F1] to-[#1D4ED8] max-w-4xl mx-auto shadow-xl">
            <div className="rounded-[14.5px] bg-white dark:bg-gradient-to-br dark:from-[#0F1D33] dark:to-[#060D1A] p-6 sm:p-10 md:p-12 text-center">
              <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-3">
                {BOOK_METADATA.signatureMessage}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                The Next Era of Cybersecurity Will Be Engineered.
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#334155] dark:text-[#AAB8CC] max-w-2xl mx-auto leading-relaxed">
                Explore the ideas, architectures, and engineering principles shaping the future of AI security.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3.5">
                <Link
                  to="/order"
                  onClick={() => trackEvent('order_cta_clicked', { source: 'home_footer_cta' })}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] hover:opacity-95 text-xs sm:text-sm font-bold text-white shadow-md transition-all"
                >
                  <span>ORDER AI vs. AI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/excerpt"
                  onClick={() => trackEvent('sample_chapter_opened', { source: 'home_footer_cta' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F4F7FC] dark:bg-[#0F1D33] hover:bg-slate-200/80 dark:hover:bg-[#162944] border border-[#CBD5E1] dark:border-slate-400/20 text-xs sm:text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />
                  <span>GET THE FIRST CHAPTER</span>
                </Link>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <LeadCaptureModule />
          </FadeInUp>
        </div>
      </section>
    </div>
  );
};
