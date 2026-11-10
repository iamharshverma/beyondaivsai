import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Activity } from 'lucide-react';
import {
  TRIAD_PILLARS,
  ATTACK_SURFACE_LAYERS,
  FOUR_SECURITY_PATTERNS,
  RESILIENCE_PHASES,
} from '../data/frameworkData';
import { CounteroffensiveHeroGraphic } from '../components/CounteroffensiveDiagram';
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
    <div className="py-12 md:py-16 space-y-20">
      {/* Header & Interactive Topology */}
      <section className="max-w-[1280px] mx-auto px-6 space-y-8">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
            INTERACTIVE TECHNICAL ARCHITECTURE
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] text-balance">
            The AI Counteroffensive Engineering Framework
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Explore the architectural reference models introduced in <em>AI vs. AI: Engineering the Cybersecurity Counteroffensive</em>. Note: These architectures represent practitioner engineering frameworks and reference design patterns from the book, rather than formal statutory standards.
          </p>
        </div>

        <CounteroffensiveHeroGraphic />
      </section>

      {/* 1. AI as Weapon, Target, and Shield */}
      <section className="max-w-[1280px] mx-auto px-6 pt-8 border-t border-slate-200 dark:border-slate-400/15">
        <div className="mb-8">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
            01. FOUNDATIONAL TRIAD
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            AI as Weapon, Target, and Shield
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRIAD_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-xs"
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
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive 5-Layer AI Attack Surface */}
      <section className="bg-slate-100/80 dark:bg-[#0B1628] py-16 border-y border-slate-200 dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
              02. LAYERED THREAT TAXONOMY (CHAPTER 3)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Interactive Five-Layer AI Attack Surface
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#AAB8CC]">
              Select any layer in the stack to inspect its core components, offensive threat vectors, defensive engineering controls, and human governance gate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Layer Stack Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              {ATTACK_SURFACE_LAYERS.map((layer) => {
                const isSelected = layer.id === selectedLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`w-full text-left rounded-xl p-4 border transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-[#101F34] border-[#0284C7] dark:border-[#37D5F5] shadow-md'
                        : 'bg-slate-50 dark:bg-[#07111F] border-slate-200 dark:border-slate-400/15 hover:border-slate-300 dark:hover:border-slate-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#0284C7] dark:text-[#37D5F5] font-semibold">
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
            </div>

            {/* Active Layer Inspector */}
            <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-6 shadow-sm">
              <div>
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  {activeLayer.layerNumber} SPECIFICATION
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
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
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-900 dark:text-[#F5F8FF]">
                  {activeLayer.components.map((comp, idx) => (
                    <React.Fragment key={comp}>
                      {idx > 0 && <span className="text-slate-400 dark:text-slate-600">·</span>}
                      <span>{comp}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-red-50/70 dark:bg-[#07111F] border border-red-200 dark:border-[#F05252]/35 p-4 space-y-2">
                  <div className="text-xs font-mono text-[#DC2626] dark:text-[#F05252] font-semibold">
                    OFFENSIVE THREAT VECTORS
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-[#AAB8CC]">
                    {activeLayer.offensiveThreats.map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-sky-50/70 dark:bg-[#07111F] border border-sky-200 dark:border-[#37D5F5]/35 p-4 space-y-2">
                  <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                    DEFENSIVE ENGINEERING CONTROLS
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-[#AAB8CC]">
                    {activeLayer.defensiveControls.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50/80 dark:bg-[#0B1628] border border-amber-300 dark:border-amber-400/30 p-4 text-xs">
                <span className="font-mono text-amber-800 dark:text-amber-300 font-semibold block mb-1">
                  HUMAN OVERSIGHT &amp; GOVERNANCE BOUNDARY:
                </span>
                <span className="text-slate-900 dark:text-[#F5F8FF]">
                  {activeLayer.humanOversightRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI-Native Security Design Patterns */}
      <section id="patterns" className="max-w-[1280px] mx-auto px-6 space-y-8">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
            03. DETERMINISTIC MEDIATION PATTERNS (CHAPTER 4)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            AI-Native Security Design Patterns
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#AAB8CC]">
            Inspect the architectural placement and execution sequence of the four patterns that wrap probabilistic models in deterministic security boundaries.
          </p>
        </div>

        {/* Interactive Pipeline Map */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6">
          <div className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC] mb-4">
            CLICK ANY PATTERN NODE BELOW TO INSPECT ITS MEDIATION SPECIFICATION:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {FOUR_SECURITY_PATTERNS.map((pat, i) => {
              const active = pat.id === selectedPatternId;
              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => setSelectedPatternId(pat.id)}
                  className={`text-left rounded-xl p-4 border transition-all ${
                    active
                      ? 'bg-sky-50 dark:bg-[#3478F6]/20 border-[#0284C7] dark:border-[#37D5F5] text-slate-900 dark:text-[#F5F8FF] shadow-xs'
                      : 'bg-white dark:bg-[#101F34] border-slate-200 dark:border-slate-400/15 text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
                  }`}
                >
                  <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
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

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xs">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                PLACEMENT: {activePattern.architecturalPlacement}
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {activePattern.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                {activePattern.securityRole}
              </p>

              <div className="space-y-2 pt-2">
                {activePattern.mechanismSteps.map((step) => (
                  <div
                    key={step}
                    className="rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-200 dark:border-slate-400/10 px-4 py-2.5 text-xs font-mono text-slate-900 dark:text-[#F5F8FF]"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-[#07111F] rounded-xl border border-slate-200 dark:border-slate-400/15 p-5">
              <div>
                <div className="text-xs font-mono text-[#DC2626] dark:text-[#F05252] font-semibold">
                  THREAT MITIGATED
                </div>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1 leading-relaxed">
                  {activePattern.threatMitigated}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10">
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                  FAIL-SAFE BEHAVIOR
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
        </div>
      </section>

      {/* 4. Resilient AI Systems & 5. Enterprise AI Security */}
      <section className="max-w-[1280px] mx-auto px-6 pt-8 border-t border-slate-200 dark:border-slate-400/15 space-y-12">
        <div>
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
            04. SELF-HEALING &amp; RESILIENCE LIFECYCLE (CHAPTER 6)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mb-6">
            Detection, Containment, Recovery &amp; Adaptation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESILIENCE_PHASES.map((p) => (
              <div
                key={p.phase}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs"
              >
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                  {p.phase}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise AI Security Pillars */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-6">
          <div>
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              05. ENTERPRISE AI SECURITY AT SCALE (CHAPTER 7)
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
              Trust Boundaries, Identity Delegation, Observability &amp; Human Oversight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs">
              <Lock className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                On-Behalf-Of (OBO) Permissions
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Replace static service accounts with short-lived cryptographic tokens scoped strictly to the intersection of the invoking user’s role and the approved agent task.
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs">
              <Activity className="w-5 h-5 text-[#2563EB] dark:text-[#3478F6]" />
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Full-Stack Lineage Observability
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Record tamper-evident audit graphs connecting user identity, system prompt version, retrieved document chunk IDs, reasoning steps, and downstream API payloads.
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors"
            >
              <span>Order AI vs. AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
