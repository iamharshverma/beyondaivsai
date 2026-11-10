import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, Shield, Layers, CheckCircle2 } from 'lucide-react';
import { BOOK_METADATA, BOOK_FORMATS } from '../data/bookConfig';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { TRIAD_PILLARS, FOUR_SECURITY_PATTERNS } from '../data/frameworkData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { AUTHOR_DATA } from '../data/authorData';
import { BookMockup3D } from '../components/BookMockup3D';
import {
  CounteroffensiveHeroGraphic,
  PillarTechnicalIllustration,
} from '../components/CounteroffensiveDiagram';
import { LeadCaptureModule } from '../components/LeadCaptureModule';
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
    <div>
      {/* 6.1 HERO SECTION — Pearl Alabaster & Cobalt Glass in Light Mode, Cyber Command in Dark Mode */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#D5E0F0] dark:border-slate-400/15 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-80 dark:opacity-35"
          style={{
            background:
              'radial-gradient(circle at 14% 20%, rgba(29, 78, 216, 0.14), transparent 46%), radial-gradient(circle at 84% 24%, rgba(2, 132, 199, 0.12), transparent 46%), radial-gradient(circle at 50% 85%, rgba(220, 38, 38, 0.06), transparent 48%)',
          }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                <span>OFFICIAL BOOK &amp; ARCHITECTURE PLATFORM</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600 dark:text-[#AAB8CC] font-normal">
                  {BOOK_METADATA.releaseWindow}
                </span>
              </div>

              <div>
                <h1
                  className="font-extrabold font-display text-[#091122] dark:text-[#F5F8FF] tracking-tight text-balance"
                  style={{ fontSize: 'clamp(2.6rem, 4.6vw, 4.1rem)', lineHeight: 1.05 }}
                >
                  {BOOK_METADATA.title}
                </h1>
                <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold font-display bg-gradient-to-r from-[#1D4ED8] via-[#0284C7] to-[#0F172A] dark:from-[#37D5F5] dark:via-[#60A5FA] dark:to-[#F5F8FF] bg-clip-text text-transparent text-balance">
                  {BOOK_METADATA.subtitle}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#334155] dark:text-[#AAB8CC] leading-relaxed max-w-2xl">
                {BOOK_METADATA.shortDescription}
              </p>

              <div className="pt-1 text-sm text-[#091122] dark:text-[#F5F8FF]">
                <span className="text-slate-600 dark:text-[#AAB8CC]">By </span>
                <Link
                  to="/author"
                  className="font-semibold text-[#1D4ED8] dark:text-[#F5F8FF] hover:text-[#0284C7] dark:hover:text-[#37D5F5] underline underline-offset-4"
                >
                  {BOOK_METADATA.author}
                </Link>
                <span className="mx-2 text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-600 dark:text-[#AAB8CC]">
                  {BOOK_METADATA.authorRole}
                </span>
              </div>

              {/* Primary, Secondary, and Optional Third CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/order"
                  onClick={() => trackEvent('order_cta_clicked', { source: 'hero_primary' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] dark:from-[#3478F6] dark:to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1] text-sm font-semibold text-white shadow-[0_8px_24px_-4px_rgba(29,78,216,0.42)] transition-all whitespace-nowrap shrink-0"
                >
                  <span>ORDER THE BOOK</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/95 dark:bg-[#101F34] hover:bg-white dark:hover:bg-[#162944] border border-[#CBD5E1] dark:border-slate-400/20 text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] shadow-xs transition-all whitespace-nowrap shrink-0"
                >
                  <span>EXPLORE THE BOOK</span>
                </Link>
                <Link
                  to="/excerpt"
                  onClick={() => trackEvent('sample_chapter_opened', { source: 'hero_cta' })}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:text-[#091122] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>READ CHAPTER 1</span>
                </Link>
              </div>

              {/* Opposing AI Systems Visual Architecture Module */}
              <div className="pt-4">
                <CounteroffensiveHeroGraphic />
              </div>
            </div>

            {/* 3D Book Showcase Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <BookMockup3D showAudioTeaser={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 6.2 COMPACT PURCHASE STRIP */}
      <section className="bg-[#EAF0F8]/90 dark:bg-[#0B1628] border-b border-[#D5E0F0] dark:border-slate-400/15 py-6">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                AVAILABLE EDITION FORMATS &amp; ORDERING PATHWAYS
              </div>
              <div className="text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] mt-1">
                {BOOK_METADATA.coreMessage}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-[#AAB8CC]">
              {BOOK_FORMATS.map((fmt, index) => (
                <React.Fragment key={fmt.id}>
                  {index > 0 && (
                    <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">·</span>
                  )}
                  <div>
                    <span className="font-semibold text-[#091122] dark:text-[#F5F8FF]">
                      {fmt.name}
                    </span>
                    <span className="ml-2 text-slate-600 dark:text-[#AAB8CC]">({fmt.status})</span>
                  </div>
                </React.Fragment>
              ))}
              <Link
                to="/order"
                className="px-4 py-2 rounded-lg bg-white dark:bg-[#101F34] hover:bg-[#1D4ED8] hover:text-white dark:hover:bg-[#3478F6] text-[#091122] dark:text-[#F5F8FF] border border-[#CBD5E1] dark:border-slate-400/20 font-semibold transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              >
                Configure Order / Bulk Enquiry →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6.3 THREE CENTRAL PILLARS */}
      <section className="py-20 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
              THE CENTRAL PROPOSITION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              AI Is the Weapon. AI Is the Target. AI Is the Shield.
            </h2>
            <p className="mt-3 text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
              Artificial intelligence is changing the capabilities available to both attackers and defenders—while introducing a complex new attack surface across models, prompts, retrieval systems, agents, APIs, and connected tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {TRIAD_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 flex flex-col justify-between transition-all hover:border-[#1D4ED8]/40"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-semibold mb-3">
                    <span
                      className={
                        pillar.id === 'weapon'
                          ? 'text-red-600 dark:text-[#F05252]'
                          : pillar.id === 'target'
                          ? 'text-[#0284C7] dark:text-[#37D5F5]'
                          : 'text-[#1D4ED8] dark:text-[#3478F6]'
                      }
                    >
                      {pillar.label}
                    </span>
                    <span className="text-slate-500 dark:text-[#AAB8CC] font-normal">
                      Core Dimension
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#334155] dark:text-[#AAB8CC] leading-relaxed mb-5">
                    {pillar.summary}
                  </p>

                  <div className="mb-5">
                    <PillarTechnicalIllustration
                      type={pillar.id as 'weapon' | 'target' | 'shield'}
                    />
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#091122] dark:text-[#F5F8FF]">
                    {pillar.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: pillar.accentColor }}
                        />
                        <span className="text-[#334155] dark:text-[#AAB8CC]">{cap}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* 6.4 THE CHANGING CYBER BATTLEFIELD */}
      <section className="py-20 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0B1628] border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
              ARCHITECTURAL SHIFT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              The Changing Cyber Battlefield: Conventional Security vs. Agentic AI Systems
            </h2>
            <p className="mt-3 text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
              Traditional security controls remain essential foundations, yet autonomous agents, natural-language instruction streams, RAG pipelines, and delegated tool calling require dedicated AI-native controls.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#D5E0F0] dark:border-slate-400/15 bg-white dark:bg-[#101F34]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#D5E0F0] dark:border-slate-400/15 bg-[#F4F7FC] dark:bg-[#07111F]/60 text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
                  <th className="py-4 px-5">Architectural Dimension</th>
                  <th className="py-4 px-5">Conventional Deterministic Software</th>
                  <th className="py-4 px-5 text-red-600 dark:text-[#F05252]">
                    AI-Enabled &amp; Agentic Exposure
                  </th>
                  <th className="py-4 px-5 text-[#1D4ED8] dark:text-[#37D5F5]">
                    AI Counteroffensive Control
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-400/10 text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Instruction vs. Data Boundary
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Strict separation (compiled code vs. parameterized SQL/JSON inputs)
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Shared token stream; untrusted documents can inject instructions
                  </td>
                  <td className="py-4 px-5 text-[#091122] dark:text-[#F5F8FF] font-medium">
                    Retrieval Gatekeeper + spotlighted provenance delimiters
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Knowledge Retrieval (RAG)
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Deterministic row-level SQL queries with explicit schema joins
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Vector similarity search across multi-source embeddings
                  </td>
                  <td className="py-4 px-5 text-[#091122] dark:text-[#F5F8FF] font-medium">
                    Pre-retrieval ACL enforcement &amp; chunk poisoning scanners
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Tool &amp; API Execution
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Hard-coded service logic invoking fixed downstream endpoints
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Dynamic model-selected function calls &amp; confused deputy risk
                  </td>
                  <td className="py-4 px-5 text-[#091122] dark:text-[#F5F8FF] font-medium">
                    Sandboxed Tool Broker + short-lived On-Behalf-Of (OBO) tokens
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Multi-Step Delegation
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Predictable DAG workflows and finite state machines
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Autonomous multi-agent planning &amp; recursive reasoning loops
                  </td>
                  <td className="py-4 px-5 text-[#091122] dark:text-[#F5F8FF] font-medium">
                    Inline Circuit Breaker + out-of-band Shadow Evaluator
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-[#091122] dark:text-[#F5F8FF]">
                    Incident Recovery
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Container restart, patch deployment, and firewall blocklists
                  </td>
                  <td className="py-4 px-5 text-[#334155] dark:text-[#AAB8CC]">
                    Poisoned episodic memory and contaminated retrieval context
                  </td>
                  <td className="py-4 px-5 text-[#091122] dark:text-[#F5F8FF] font-medium">
                    Episodic state rollback, semantic honeytokens &amp; human gates
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6.5 EXPLORE THE BOOK — ALL 11 CHAPTERS */}
      <section className="py-20 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
                APPROVED 11-CHAPTER MANUSCRIPT ARCHITECTURE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                Explore the 11 Chapters of AI vs. AI
              </h2>
              <p className="mt-2 text-base text-[#334155] dark:text-[#AAB8CC] max-w-2xl">
                Every chapter builds progressively—from the machine-speed cyber arms race and attack-surface mapping to AI-native design patterns, high-consequence industries, and the 30/60/90-day counteroffensive playbook.
              </p>
            </div>
            <Link
              to="/chapters"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline whitespace-nowrap shrink-0"
            >
              <span>View Full Syllabus &amp; Outcomes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTERS_DATA.map((ch) => (
              <Link
                key={ch.slug}
                to={`/chapters/${ch.slug}`}
                className="group rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:border-[#37D5F5]/50 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#AAB8CC] mb-2.5">
                    <span className="text-[#1D4ED8] dark:text-[#37D5F5] font-semibold">
                      Chapter {String(ch.number).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ch.partLabel}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#37D5F5] transition-colors">
                    {ch.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed line-clamp-3">
                    {ch.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-400/10 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-[#AAB8CC] font-mono">
                    {ch.technicalConcepts[0]?.name}
                  </span>
                  <span className="text-[#1D4ED8] dark:text-[#37D5F5] font-semibold inline-flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 TECHNICAL ENGINEERING HIGHLIGHTS — 4 DESIGN PATTERNS */}
      <section className="py-20 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0B1628] border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
                CHAPTER 4 ARCHITECTURAL CORE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                Four AI-Native Security Design Patterns
              </h2>
              <p className="mt-2 text-base text-[#334155] dark:text-[#AAB8CC] max-w-2xl">
                Deterministic security wrappers engineered to mediate untrusted context, evaluate semantic intent, halt runaway execution, and sandbox tool calls.
              </p>
            </div>
            <Link
              to="/framework"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Open Full Interactive Framework</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Pattern Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-[#07111F] border border-[#D5E0F0] dark:border-slate-400/15 mb-8">
            {FOUR_SECURITY_PATTERNS.map((pat, index) => (
              <button
                key={pat.id}
                type="button"
                onClick={() => setSelectedPatternId(pat.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedPatternId === pat.id
                    ? 'bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] dark:from-[#3478F6] dark:to-[#0284C7] text-white shadow-xs'
                    : 'text-slate-600 dark:text-[#AAB8CC] hover:text-[#091122] dark:hover:text-[#F5F8FF]'
                }`}
              >
                0{index + 1}. {pat.name}
              </button>
            ))}
          </div>

          {/* Selected Pattern Deep-Dive Panel */}
          <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                  {activePattern.architecturalPlacement}
                </div>
                <h3 className="text-2xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                  {activePattern.name} — {activePattern.tagline}
                </h3>
                <p className="text-sm text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
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
                        className="bg-[#F4F7FC] dark:bg-[#0B1628] border border-[#D5E0F0] dark:border-slate-400/10 rounded-lg px-3.5 py-2.5 font-mono text-[#091122] dark:text-[#F5F8FF]"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between bg-[#F4F7FC] dark:bg-[#0B1628] rounded-xl border border-[#D5E0F0] dark:border-slate-400/15 p-5 space-y-4">
                <div>
                  <div className="text-xs font-mono font-semibold text-red-600 dark:text-[#F05252] mb-1">
                    THREAT MITIGATED
                  </div>
                  <p className="text-xs text-[#091122] dark:text-[#F5F8FF] leading-relaxed">
                    {activePattern.threatMitigated}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                  <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-1">
                    LATENCY &amp; RUNTIME PROFILE
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] font-mono">
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline"
                  >
                    <span>Read Chapter 4 Architectural Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.7 BOOK RESOURCES */}
      <section className="py-20 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
                PRACTITIONER TOOLKIT &amp; COMPANION LIBRARY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                Book Frameworks, Assessments &amp; Roadmaps
              </h2>
              <p className="mt-2 text-base text-[#334155] dark:text-[#AAB8CC] max-w-2xl">
                Interactive reference modules and companion specifications included in the AI vs. AI ecosystem.
              </p>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Browse Searchable Resource Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESOURCES_DATA.map((res) => (
              <Link
                key={res.id}
                to="/resources"
                className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:border-[#37D5F5]/40 p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
                    {res.type} · {res.chapterReference}
                  </div>
                  <h3 className="text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                    {res.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                    {res.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-400/10 flex items-center justify-between text-xs text-slate-600 dark:text-[#AAB8CC]">
                  <span>{res.availability}</span>
                  <span className="text-[#1D4ED8] dark:text-[#37D5F5] font-semibold">Inspect →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6.8 AUTHOR SECTION */}
      <section className="py-20 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0B1628] border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-[#D5E0F0] dark:border-slate-400/20 bg-white dark:bg-[#101F34] shadow-xl max-w-sm mx-auto">
                <img
                  src={AUTHOR_DATA.portraitUrl}
                  alt={`${AUTHOR_DATA.name} — ${AUTHOR_DATA.currentTitle} at ${AUTHOR_DATA.currentOrganization}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-white dark:bg-[#07111F] border-t border-slate-200 dark:border-slate-400/15">
                  <div className="text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                    {AUTHOR_DATA.name}
                  </div>
                  <div className="text-xs font-medium text-[#1D4ED8] dark:text-[#37D5F5] mt-0.5">
                    {AUTHOR_DATA.currentTitle} at {AUTHOR_DATA.currentOrganization}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                THE ENGINEER BEHIND THE COUNTEROFFENSIVE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
                {AUTHOR_DATA.name}
              </h2>
              <p className="text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                {AUTHOR_DATA.executiveBio}
              </p>
              <p className="text-sm text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                {AUTHOR_DATA.engineerBehindBook.paragraphs[1]}
              </p>

              {/* Selected Credentials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {AUTHOR_DATA.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-3.5"
                  >
                    <div className="text-base font-bold font-mono text-[#091122] dark:text-[#F5F8FF] tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-[#AAB8CC]">
                <span>Fellow of BCS (FBCS)</span>
                <span aria-hidden="true">·</span>
                <span>IEEE Senior Member</span>
                <span aria-hidden="true">·</span>
                <span>Official Forbes Technology Council Member</span>
                <span aria-hidden="true">·</span>
                <span>UC Berkeley SkyDeck Advisor &amp; Mentor</span>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/author"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1] text-xs font-semibold text-white transition-all shadow-sm"
                >
                  <span>Read Full Author Profile &amp; Career Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={AUTHOR_DATA.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline"
                >
                  <span>Visit harshverma.me</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.9 REVIEWS AND CREDIBILITY */}
      <section className="py-20 md:py-24 border-b border-[#D5E0F0] dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
              EDITORIAL INTEGRITY &amp; PEER CREDIBILITY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              Reviews, Manuscript Feedback &amp; Technical Credibility
            </h2>
            <p className="mt-3 text-base text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
              We maintain strict editorial transparency: early technical manuscript evaluations are distinguished from post-publication reader reviews, and no unverified or fabricated ratings ever appear on this platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6">
              <Shield className="w-5 h-5 text-[#1D4ED8] dark:text-[#37D5F5] mb-3" />
              <h3 className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                Peer-Reviewed Research Foundation
              </h3>
              <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                Grounded in the author’s 27+ published papers across IEEE, Springer, and the 2026 Raptors Conference proceedings on <em>Trusted AI in the Age of Autonomous Agents</em>, plus six patent filings.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6">
              <Layers className="w-5 h-5 text-[#0284C7] dark:text-[#3478F6] mb-3" />
              <h3 className="text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                Independent Manuscript Review Policy
              </h3>
              <p className="mt-2 text-xs text-[#334155] dark:text-[#AAB8CC] leading-relaxed">
                The manuscript has undergone technical review for architectural rigor. Individual reviewer quotations and institutional affiliations are published only with explicit written permission.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 flex flex-col justify-between">
              <div>
                <CheckCircle2 className="w-5 h-5 text-[#1D4ED8] dark:text-[#37D5F5] mb-3" />
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline"
                >
                  <span>Visit Reviews &amp; Submission Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.10 FINAL CONVERSION SECTION & LEAD CAPTURE */}
      <section className="py-20 md:py-24 bg-[#EAF0F8]/75 dark:bg-[#0B1628]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          <div className="rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#101F34] dark:to-[#07111F] border border-[#D5E0F0] dark:border-slate-400/20 p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-3">
              {BOOK_METADATA.signatureMessage}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] text-balance">
              The Next Era of Cybersecurity Will Be Engineered.
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#334155] dark:text-[#AAB8CC] max-w-2xl mx-auto leading-relaxed">
              Explore the ideas, architectures, and engineering principles shaping the future of AI security.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/order"
                onClick={() => trackEvent('order_cta_clicked', { source: 'home_footer_cta' })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1] text-sm font-semibold text-white shadow-md transition-all"
              >
                <span>ORDER AI vs. AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/excerpt"
                onClick={() => trackEvent('sample_chapter_opened', { source: 'home_footer_cta' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F4F7FC] dark:bg-[#101F34] hover:bg-slate-200/80 dark:hover:bg-[#162944] border border-[#CBD5E1] dark:border-slate-400/20 text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#37D5F5]" />
                <span>GET THE FIRST CHAPTER</span>
              </Link>
            </div>
          </div>

          <LeadCaptureModule />
        </div>
      </section>
    </div>
  );
};
