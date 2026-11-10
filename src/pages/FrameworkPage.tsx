import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  TRIAD_PILLARS,
  ATTACK_SURFACE_LAYERS,
  FOUR_SECURITY_PATTERNS,
  RESILIENCE_PHASES,
} from '../data/frameworkData';
import { CounteroffensiveHeroGraphic } from '../components/CounteroffensiveDiagram';
import { FadeInUp, fadeInUpVariants, staggerGridVariants } from '../components/FadeInUp';
import { usePageSEO } from '../utils/analytics';

export const FrameworkPage: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState(ATTACK_SURFACE_LAYERS[0].id);
  const [selectedPatternId, setSelectedPatternId] = useState(FOUR_SECURITY_PATTERNS[0].id);

  usePageSEO({
    title: 'Interactive AI Security Architecture & Framework | AI vs. AI',
    description:
      'Explore the interactive AI vs. AI engineering framework: Weapon/Target/Shield triad, 5-layer AI Attack Surface, Circuit Breaker, Shadow Evaluator, Retrieval Gatekeeper, and Sandboxed Tool Broker.',
    canonicalPath: '/framework',
  });

  const activeLayer =
    ATTACK_SURFACE_LAYERS.find((l) => l.id === selectedLayerId) || ATTACK_SURFACE_LAYERS[0];
  const activePattern =
    FOUR_SECURITY_PATTERNS.find((p) => p.id === selectedPatternId) || FOUR_SECURITY_PATTERNS[0];

  return (
    <div className="py-10 sm:py-12 md:py-16 space-y-14 sm:space-y-20 w-full overflow-x-hidden">
      {/* Header & Interactive Topology */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        <FadeInUp className="max-w-3xl">
          <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-2">
            INTERACTIVE TECHNICAL ARCHITECTURE
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] text-balance">
            The AI Counteroffensive Engineering Framework
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Explore the architectural reference models introduced in <em>AI vs. AI: Engineering the Cybersecurity Counteroffensive</em>. Note: These architectures represent practitioner engineering frameworks and reference design patterns from the book, rather than formal statutory standards.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.08}>
          <CounteroffensiveHeroGraphic />
        </FadeInUp>
      </section>

      {/* 1. AI as Weapon, Target, and Shield */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 border-t border-slate-200 dark:border-slate-400/15">
        <FadeInUp className="mb-6 sm:mb-8">
          <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8] mb-1">
            01. FOUNDATIONAL TRIAD
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            AI as Weapon, Target, and Shield
          </h2>
        </FadeInUp>

        <motion.div
          variants={staggerGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {TRIAD_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={fadeInUpVariants}
              className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 sm:p-6 space-y-4 shadow-xs"
            >
              <div className="text-xs font-mono font-semibold" style={{ color: pillar.accentColor }}>
                {pillar.label}
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                {pillar.summary}
              </p>
              <ul className="space-y-2 text-xs text-slate-900 dark:text-[#F5F8FF] pt-2 border-t border-slate-200 dark:border-slate-400/10">
                {pillar.capabilities.map((c) => (
                  <li key={c} className="text-slate-600 dark:text-[#AAB8CC]">
                    • {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2. Interactive 5-Layer AI Attack Surface */}
      <section className="bg-slate-100/80 dark:bg-[#0A1426] py-12 sm:py-16 border-y border-slate-200 dark:border-slate-400/15">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          <FadeInUp className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#FB7185] mb-1">
              02. LAYERED THREAT TAXONOMY (CHAPTER 3)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Interactive Five-Layer AI Attack Surface
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC]">
              Select any layer in the stack to inspect its core components, offensive threat vectors, defensive engineering controls, and human governance gate.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Layer Stack Selector */}
            <FadeInUp className="lg:col-span-5 space-y-2.5 min-w-0">
              {ATTACK_SURFACE_LAYERS.map((layer) => {
                const isSelected = layer.id === selectedLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`w-full text-left rounded-xl p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#0F1D33] border-[#E11D48] dark:border-[#38BDF8] shadow-md'
                        : 'bg-slate-50 dark:bg-[#060D1A] border-slate-200 dark:border-slate-400/15 hover:border-slate-300 dark:hover:border-slate-400/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-[#E11D48] dark:text-[#38BDF8] font-bold">
                        {layer.layerNumber}
                      </span>
                      <span className="text-slate-600 dark:text-[#AAB8CC]">
                        {layer.components.length} Components
                      </span>
                    </div>
                    <div className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                      {layer.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-0.5 truncate">
                      {layer.subtitle}
                    </div>
                  </button>
                );
              })}
            </FadeInUp>

            {/* Active Layer Inspector */}
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/20 p-5 sm:p-6 md:p-8 space-y-6 shadow-sm min-w-0"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8]">
                  {activeLayer.layerNumber} SPECIFICATION
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                  {activeLayer.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">
                  {activeLayer.subtitle}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-500 dark:text-[#AAB8CC] mb-2">
                  ARCHITECTURAL SURFACES
                </div>
                <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 text-xs font-mono text-slate-900 dark:text-[#F5F8FF]">
                  {activeLayer.components.map((comp, idx) => (
                    <React.Fragment key={comp}>
                      {idx > 0 && <span className="text-slate-400 dark:text-slate-600">·</span>}
                      <span>{comp}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-red-50/70 dark:bg-[#060D1A] border border-red-200 dark:border-[#FB7185]/35 p-4 space-y-2">
                  <div className="text-xs font-mono text-[#E11D48] dark:text-[#FB7185] font-bold">
                    RED AI THREAT VECTORS
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-[#AAB8CC]">
                    {activeLayer.offensiveThreats.map((t) => (
                      <li key={t} className="break-words">• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-blue-50/70 dark:bg-[#060D1A] border border-blue-200 dark:border-[#38BDF8]/35 p-4 space-y-2">
                  <div className="text-xs font-mono text-[#1D4ED8] dark:text-[#38BDF8] font-bold">
                    BLUE AI ENGINEERING CONTROLS
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-[#AAB8CC]">
                    {activeLayer.defensiveControls.map((c) => (
                      <li key={c} className="break-words">• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50/80 dark:bg-[#0A1426] border border-amber-300 dark:border-amber-400/30 p-4 text-xs">
                <span className="font-mono text-amber-800 dark:text-amber-300 font-semibold block mb-1">
                  HUMAN OVERSIGHT &amp; GOVERNANCE BOUNDARY:
                </span>
                <span className="text-slate-900 dark:text-[#F5F8FF]">
                  {activeLayer.humanOversightRole}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. AI-Native Security Design Patterns */}
      <section id="patterns" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        <FadeInUp className="max-w-3xl">
          <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] mb-1">
            03. DETERMINISTIC MEDIATION PATTERNS (CHAPTER 4)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            AI-Native Security Design Patterns
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC]">
            Inspect the architectural placement and execution sequence of the four patterns that wrap probabilistic models in deterministic security boundaries.
          </p>
        </FadeInUp>

        {/* Interactive Pipeline Map */}
        <FadeInUp delay={0.06} className="rounded-2xl bg-slate-100/80 dark:bg-[#0A1426] border border-slate-200 dark:border-slate-400/20 p-4 sm:p-6">
          <div className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC] mb-4">
            CLICK ANY PATTERN NODE BELOW TO INSPECT ITS MEDIATION SPECIFICATION:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
            {FOUR_SECURITY_PATTERNS.map((pat, i) => {
              const active = pat.id === selectedPatternId;
              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => setSelectedPatternId(pat.id)}
                  className={`text-left rounded-xl p-4 border transition-all cursor-pointer ${
                    active
                      ? 'bg-white dark:bg-[#0F1D33] border-[#1D4ED8] dark:border-[#38BDF8] text-slate-900 dark:text-[#F5F8FF] shadow-md'
                      : 'bg-white/75 dark:bg-[#060D1A] border-slate-200 dark:border-slate-400/15 text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8]">
                    Pattern 0{i + 1}
                  </div>
                  <div className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                    {pat.name}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 line-clamp-2">
                    {pat.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 shadow-xs">
            <div className="lg:col-span-7 space-y-4 min-w-0">
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8]">
                PLACEMENT: {activePattern.architecturalPlacement}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {activePattern.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                {activePattern.securityRole}
              </p>

              <div className="space-y-2 pt-2">
                {activePattern.mechanismSteps.map((step) => (
                  <div
                    key={step}
                    className="rounded-lg bg-slate-50 dark:bg-[#060D1A] border border-slate-200 dark:border-slate-400/10 px-3.5 sm:px-4 py-2.5 text-xs font-mono text-slate-900 dark:text-[#F5F8FF] break-words"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-[#060D1A] rounded-xl border border-slate-200 dark:border-slate-400/15 p-5 min-w-0">
              <div>
                <div className="text-xs font-mono text-[#E11D48] dark:text-[#FB7185] font-bold">
                  RED AI THREAT MITIGATED
                </div>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 leading-relaxed">
                  {activePattern.threatMitigated}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                <div className="text-xs font-mono text-[#1D4ED8] dark:text-[#38BDF8] font-bold">
                  BLUE AI FAIL-SAFE BEHAVIOR
                </div>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 leading-relaxed">
                  {activePattern.failureModeHandling}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                <div className="text-xs font-mono text-amber-700 dark:text-amber-300 font-semibold">
                  HUMAN APPROVAL GATE
                </div>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 leading-relaxed">
                  {activePattern.humanApprovalTrigger}
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* 4. Resilient AI Systems & 5. Enterprise AI Security */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 border-t border-slate-200 dark:border-slate-400/15 space-y-12">
        <div>
          <FadeInUp>
            <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] mb-1">
              04. SELF-HEALING &amp; RESILIENCE LIFECYCLE (CHAPTER 6)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mb-6">
              Detection, Containment, Recovery &amp; Adaptation
            </h2>
          </FadeInUp>
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {RESILIENCE_PHASES.map((p) => (
              <motion.div
                key={p.phase}
                variants={fadeInUpVariants}
                className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs"
              >
                <div className="text-xs font-mono text-[#E11D48] dark:text-[#38BDF8] font-bold">
                  {p.phase}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enterprise AI Security Pillars */}
        <FadeInUp className="rounded-2xl bg-slate-100/80 dark:bg-[#0A1426] border border-slate-200 dark:border-slate-400/20 p-5 sm:p-6 md:p-8 space-y-6">
          <div>
            <div className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8]">
              05. ENTERPRISE AI SECURITY AT SCALE (CHAPTER 7)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
              Trust Boundaries, Identity Delegation, Observability &amp; Human Oversight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs">
              <Lock className="w-5 h-5 text-[#E11D48] dark:text-[#FB7185]" />
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                On-Behalf-Of (OBO) Permissions
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Replace static service accounts with short-lived cryptographic tokens scoped strictly to the intersection of the invoking user’s role and the approved agent task.
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs">
              <Activity className="w-5 h-5 text-[#1D4ED8] dark:text-[#38BDF8]" />
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Full-Stack Lineage Observability
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Record tamper-evident audit graphs connecting user identity, system prompt version, retrieved document chunk IDs, reasoning steps, and downstream API payloads.
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs">
              <Shield className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Verifiable Human Approval Gates
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Enforce cryptographic step-up confirmation before autonomous workflows execute destructive, financial, external-communication, or privilege-modifying actions.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-400/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-600 dark:text-[#AAB8CC]">
              Explore full deployment blueprints and assessment checklists in the book.
            </span>
            <Link
              to="/order"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white transition-all"
            >
              <span>Order AI vs. AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeInUp>
      </section>
    </div>
  );
};
