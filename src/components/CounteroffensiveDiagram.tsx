import React, { useState } from 'react';
import { useSvgTheme } from '../utils/svgTheme';

export const CounteroffensiveHeroGraphic: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'offensive' | 'defensive' | 'oversight'>('all');
  const svgTheme = useSvgTheme();
  const {
    isLight,
    svgRootClass,
    inkLineClass,
    signalLineClass,
    deepInkStroke,
    mutedInkStroke,
    gridStroke,
    canvasFill,
    frameFill,
    nodeFill,
    primaryTextFill,
    secondaryTextFill,
    defensiveAccent,
    offensiveAccent,
  } = svgTheme;

  const defBlue = isLight ? '#1D4ED8' : '#3478F6';
  const defCyan = isLight ? '#0284C7' : '#37D5F5';
  const gateAmber = isLight ? '#B45309' : '#F59E0B';
  const gateTextAmber = isLight ? '#92400E' : '#FCD34D';

  return (
    <div className="relative rounded-2xl bg-white/90 dark:bg-[#0B1628] backdrop-blur-md border border-[#D8E2F0] dark:border-slate-400/15 p-5 shadow-[0_14px_34px_-12px_rgba(15,23,42,0.08)] dark:shadow-2xl overflow-hidden transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200/90 dark:border-slate-400/10">
        <div className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
          <span>Interactive System Topology</span>
          <span className="mx-2 text-slate-400 dark:text-slate-600">·</span>
          <span className="text-[#091122] dark:text-[#F5F8FF] font-semibold">
            Contested Digital Environment
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#EDF2F9] dark:bg-[#07111F] p-1 rounded-lg border border-slate-200/90 dark:border-slate-400/15">
          <button
            type="button"
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
              activeLayer === 'all'
                ? 'bg-white dark:bg-[#101F34] text-[#091122] dark:text-[#F5F8FF] shadow-xs border border-slate-300/80 dark:border-slate-400/20'
                : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
            }`}
          >
            All Systems
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('offensive')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
              activeLayer === 'offensive'
                ? 'bg-red-50 dark:bg-[#F05252]/20 text-red-700 dark:text-[#F05252] border border-red-200 dark:border-[#F05252]/40'
                : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
            }`}
          >
            Offensive AI
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('defensive')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
              activeLayer === 'defensive'
                ? 'bg-blue-50 dark:bg-[#3478F6]/20 text-[#1D4ED8] dark:text-[#37D5F5] border border-blue-200 dark:border-[#37D5F5]/40'
                : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
            }`}
          >
            Defensive AI
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('oversight')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
              activeLayer === 'oversight'
                ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-400/40'
                : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
            }`}
          >
            Human Gate
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 760 300"
        className={`w-full h-auto select-none rounded-xl border border-slate-300/80 dark:border-slate-400/15 ${svgRootClass}`}
        role="img"
        aria-label="Architectural diagram showing Offensive AI opposing Defensive AI across a contested environment with a central Human Oversight Gate."
      >
        <defs>
          <linearGradient id="offGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={offensiveAccent} stopOpacity="0.95" />
            <stop offset="100%" stopColor={deepInkStroke} stopOpacity={isLight ? '0.65' : '0.3'} />
          </linearGradient>
          <linearGradient id="defGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={defensiveAccent} stopOpacity="0.95" />
            <stop offset="100%" stopColor={deepInkStroke} stopOpacity={isLight ? '0.7' : '0.35'} />
          </linearGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={defBlue} stopOpacity={isLight ? '0.09' : '0.22'} />
            <stop offset="100%" stopColor={canvasFill} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Contested Environment Canvas */}
        <rect x="0" y="0" width="760" height="300" fill={canvasFill} rx="8" />
        <circle cx="380" cy="150" r="145" fill="url(#centerGlow)" />

        {/* Architectural Blueprint Grid — Deep Ink Hairlines in Light Mode */}
        <g
          stroke={isLight ? '#94A3B8' : gridStroke}
          strokeWidth="1"
          opacity={isLight ? '0.45' : '0.35'}
        >
          <line x1="0" y1="60" x2="760" y2="60" />
          <line x1="0" y1="150" x2="760" y2="150" />
          <line x1="0" y1="240" x2="760" y2="240" />
          <line x1="190" y1="0" x2="190" y2="300" />
          <line
            x1="380"
            y1="0"
            x2="380"
            y2="300"
            stroke={deepInkStroke}
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <line x1="570" y1="0" x2="570" y2="300" />
        </g>

        {/* LEFT: OFFENSIVE AI SWARM */}
        <g opacity={activeLayer === 'all' || activeLayer === 'offensive' ? 1 : 0.22}>
          <text
            x="28"
            y="34"
            fill={offensiveAccent}
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
          >
            OFFENSIVE AI SYSTEM
          </text>
          <text
            x="28"
            y="50"
            fill={secondaryTextFill}
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            Autonomous Recon · Deception · Adaptive Payloads
          </text>

          {/* Primary Vector Trajectories with Deep Ink Under-Stroke in Alabaster Mode */}
          <path
            d="M 70 95 L 175 75 L 285 110 L 340 150"
            stroke="url(#offGrad)"
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M 55 150 L 160 150 L 270 150 L 340 150"
            stroke="url(#offGrad)"
            strokeWidth="2.6"
            fill="none"
          />
          <path
            d="M 70 205 L 175 225 L 285 190 L 340 150"
            stroke="url(#offGrad)"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Deep Ink / High-Contrast Structural Mesh Lines */}
          <line
            x1="70"
            y1="95"
            x2="55"
            y2="150"
            className={inkLineClass}
            stroke={deepInkStroke}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.65' : '0.45'}
          />
          <line
            x1="55"
            y1="150"
            x2="70"
            y2="205"
            className={inkLineClass}
            stroke={deepInkStroke}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.65' : '0.45'}
          />
          <line
            x1="175"
            y1="75"
            x2="160"
            y2="150"
            className={inkLineClass}
            stroke={deepInkStroke}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.65' : '0.45'}
          />
          <line
            x1="160"
            y1="150"
            x2="175"
            y2="225"
            className={inkLineClass}
            stroke={deepInkStroke}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.65' : '0.45'}
          />
          <line
            x1="285"
            y1="110"
            x2="270"
            y2="150"
            stroke={offensiveAccent}
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <line
            x1="270"
            y1="150"
            x2="285"
            y2="190"
            stroke={offensiveAccent}
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />

          <circle cx="70" cy="95" r="6" fill={nodeFill} stroke={deepInkStroke} strokeWidth="2" />
          <circle cx="55" cy="150" r="7" fill={offensiveAccent} stroke={deepInkStroke} strokeWidth="1.5" />
          <circle cx="70" cy="205" r="6" fill={nodeFill} stroke={deepInkStroke} strokeWidth="2" />
          <circle cx="175" cy="75" r="6" fill={offensiveAccent} stroke={deepInkStroke} strokeWidth="1.2" />
          <circle cx="160" cy="150" r="8" fill={nodeFill} stroke={offensiveAccent} strokeWidth="2.5" />
          <circle cx="175" cy="225" r="6" fill={offensiveAccent} stroke={deepInkStroke} strokeWidth="1.2" />
          <circle cx="285" cy="110" r="5.5" fill={offensiveAccent} />
          <circle cx="270" cy="150" r="6.5" fill={offensiveAccent} stroke={deepInkStroke} strokeWidth="1.5" />
          <circle cx="285" cy="190" r="5.5" fill={offensiveAccent} />

          <rect
            x="108"
            y="250"
            width="178"
            height="30"
            rx="6"
            fill={frameFill}
            stroke={isLight ? deepInkStroke : offensiveAccent}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.85' : '0.55'}
          />
          <text
            x="197"
            y="269"
            fill={primaryTextFill}
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            textAnchor="middle"
          >
            Indirect Injection &amp; Probing
          </text>
        </g>

        {/* RIGHT: DEFENSIVE AI MESH */}
        <g opacity={activeLayer === 'all' || activeLayer === 'defensive' ? 1 : 0.22}>
          <text
            x="732"
            y="34"
            fill={defensiveAccent}
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="end"
          >
            DEFENSIVE AI ARCHITECTURE
          </text>
          <text
            x="732"
            y="50"
            fill={secondaryTextFill}
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            textAnchor="end"
          >
            Circuit Breakers · Shadow Evaluators · Tool Brokers
          </text>

          <path
            d="M 690 95 L 585 75 L 475 110 L 420 150"
            stroke="url(#defGrad)"
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M 705 150 L 600 150 L 490 150 L 420 150"
            stroke="url(#defGrad)"
            strokeWidth="2.6"
            fill="none"
          />
          <path
            d="M 690 205 L 585 225 L 475 190 L 420 150"
            stroke="url(#defGrad)"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Deep Ink / High-Contrast Defensive Structural Lines */}
          <line
            x1="690"
            y1="95"
            x2="705"
            y2="150"
            className={inkLineClass}
            stroke={deepInkStroke}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.65' : '0.5'}
          />
          <line
            x1="705"
            y1="150"
            x2="690"
            y2="205"
            className={inkLineClass}
            stroke={deepInkStroke}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.65' : '0.5'}
          />
          <line
            x1="585"
            y1="75"
            x2="600"
            y2="150"
            className={signalLineClass}
            stroke={defBlue}
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <line
            x1="600"
            y1="150"
            x2="585"
            y2="225"
            className={signalLineClass}
            stroke={defBlue}
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <line
            x1="475"
            y1="110"
            x2="490"
            y2="150"
            stroke={defCyan}
            strokeWidth="1.6"
            strokeOpacity="0.8"
          />
          <line
            x1="490"
            y1="150"
            x2="475"
            y2="190"
            stroke={defCyan}
            strokeWidth="1.6"
            strokeOpacity="0.8"
          />

          <circle cx="690" cy="95" r="6" fill={nodeFill} stroke={deepInkStroke} strokeWidth="2" />
          <circle cx="705" cy="150" r="7" fill={defCyan} stroke={deepInkStroke} strokeWidth="1.5" />
          <circle cx="690" cy="205" r="6" fill={nodeFill} stroke={deepInkStroke} strokeWidth="2" />
          <circle cx="585" cy="75" r="6" fill={defBlue} stroke={deepInkStroke} strokeWidth="1.2" />
          <circle cx="600" cy="150" r="8" fill={nodeFill} stroke={defBlue} strokeWidth="2.5" />
          <circle cx="585" cy="225" r="6" fill={defBlue} stroke={deepInkStroke} strokeWidth="1.2" />
          <circle cx="475" cy="110" r="5.5" fill={defCyan} />
          <circle cx="490" cy="150" r="6.5" fill={defBlue} stroke={deepInkStroke} strokeWidth="1.5" />
          <circle cx="475" cy="190" r="5.5" fill={defCyan} />

          <rect
            x="472"
            y="250"
            width="192"
            height="30"
            rx="6"
            fill={frameFill}
            stroke={isLight ? deepInkStroke : defCyan}
            strokeWidth="1.25"
            strokeOpacity={isLight ? '0.85' : '0.6'}
          />
          <text
            x="568"
            y="269"
            fill={primaryTextFill}
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            textAnchor="middle"
          >
            Deterministic Boundary Mediation
          </text>
        </g>

        {/* CENTER: TRUST BOUNDARY & HUMAN OVERSIGHT GATE */}
        <g opacity={activeLayer === 'all' || activeLayer === 'oversight' ? 1 : 0.35}>
          <rect
            x="334"
            y="72"
            width="92"
            height="156"
            rx="10"
            fill={frameFill}
            stroke={isLight ? deepInkStroke : gateAmber}
            strokeWidth="2"
          />
          <line
            x1="380"
            y1="26"
            x2="380"
            y2="72"
            stroke={deepInkStroke}
            strokeWidth="1.75"
            strokeDasharray="3 3"
          />
          <line
            x1="380"
            y1="228"
            x2="380"
            y2="278"
            stroke={deepInkStroke}
            strokeWidth="1.75"
            strokeDasharray="3 3"
          />

          <circle
            cx="380"
            cy="120"
            r="18"
            fill={canvasFill}
            stroke={deepInkStroke}
            strokeWidth="1.75"
          />
          <path
            d="M 373 120 L 378 125 L 388 115"
            stroke={defBlue}
            strokeWidth="2.25"
            fill="none"
            strokeLinecap="round"
          />

          <text
            x="380"
            y="156"
            fill={primaryTextFill}
            fontSize="9.5"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            TRUST GATE
          </text>
          <text
            x="380"
            y="173"
            fill={gateTextAmber}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            HUMAN
          </text>
          <text
            x="380"
            y="186"
            fill={gateTextAmber}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            OVERSIGHT
          </text>
          <text
            x="380"
            y="206"
            fill={mutedInkStroke}
            fontSize="8.5"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            textAnchor="middle"
          >
            Policy &amp; OBO Auth
          </text>
        </g>
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-200/90 dark:border-slate-400/10 text-xs">
        <div className="flex items-start gap-2.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626] dark:bg-[#F05252] shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-[#091122] dark:text-[#F5F8FF]">
              Offensive AI (Red)
            </div>
            <div className="text-slate-600 dark:text-[#AAB8CC]">
              Automated reconnaissance, contextual lures, and adaptive probing.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#1D4ED8] dark:bg-[#37D5F5] shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-[#091122] dark:text-[#F5F8FF]">
              Defensive AI (Cobalt/Cyan)
            </div>
            <div className="text-slate-600 dark:text-[#AAB8CC]">
              Retrieval Gatekeeper, Shadow Evaluator, Circuit Breaker &amp; Tool Broker.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 dark:bg-amber-400 shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-[#091122] dark:text-[#F5F8FF]">
              Human Oversight Gate
            </div>
            <div className="text-slate-600 dark:text-[#AAB8CC]">
              Verifiable authority, policy governance, and high-consequence approval.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PillarTechnicalIllustration: React.FC<{ type: 'weapon' | 'target' | 'shield' }> = ({
  type,
}) => {
  const {
    isLight,
    svgRootClass,
    inkLineClass,
    deepInkStroke,
    nodeFill,
    frameFill,
    primaryTextFill,
    secondaryTextFill,
    offensiveAccent,
    defensiveAccent,
  } = useSvgTheme();

  const defBlue = isLight ? '#1D4ED8' : '#3478F6';
  const gateTextAmber = isLight ? '#92400E' : '#FCD34D';

  if (type === 'weapon') {
    return (
      <svg
        viewBox="0 0 320 120"
        className={`w-full h-28 bg-[#F4F7FC] dark:bg-[#07111F] rounded-lg border border-slate-300/80 dark:border-slate-400/10 p-2 ${svgRootClass}`}
      >
        <g stroke={isLight ? deepInkStroke : offensiveAccent} strokeWidth="1.6" fill="none">
          <path d="M 24 60 L 95 28 L 185 28 L 255 60" strokeOpacity="0.8" />
          <path d="M 24 60 L 95 60 L 185 60 L 285 60" stroke={offensiveAccent} strokeWidth="2" />
          <path d="M 24 60 L 95 92 L 185 92 L 255 60" strokeOpacity="0.8" />
        </g>
        <circle cx="24" cy="60" r="6" fill={offensiveAccent} stroke={deepInkStroke} strokeWidth="1.5" />
        <circle cx="95" cy="28" r="4.5" fill={nodeFill} stroke={deepInkStroke} strokeWidth="2" />
        <circle cx="95" cy="60" r="5" fill={offensiveAccent} />
        <circle cx="95" cy="92" r="4.5" fill={nodeFill} stroke={deepInkStroke} strokeWidth="2" />
        <rect
          x="154"
          y="16"
          width="64"
          height="88"
          rx="6"
          fill={frameFill}
          stroke={deepInkStroke}
          strokeWidth="1.5"
        />
        <text
          x="186"
          y="55"
          fill={primaryTextFill}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          TASK
        </text>
        <text
          x="186"
          y="69"
          fill={offensiveAccent}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
          textAnchor="middle"
        >
          AUTOMATION
        </text>
        <circle cx="285" cy="60" r="7" fill={nodeFill} stroke={offensiveAccent} strokeWidth="2.2" />
      </svg>
    );
  }

  if (type === 'target') {
    return (
      <svg
        viewBox="0 0 320 120"
        className={`w-full h-28 bg-[#F4F7FC] dark:bg-[#07111F] rounded-lg border border-slate-300/80 dark:border-slate-400/10 p-2 ${svgRootClass}`}
      >
        <line
          x1="18"
          y1="60"
          x2="302"
          y2="60"
          className={inkLineClass}
          stroke={deepInkStroke}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <rect
          x="18"
          y="18"
          width="52"
          height="84"
          rx="5"
          fill={frameFill}
          stroke={deepInkStroke}
          strokeWidth="1.5"
        />
        <text
          x="44"
          y="63"
          fill={primaryTextFill}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          PROMPT
        </text>
        <rect
          x="86"
          y="18"
          width="52"
          height="84"
          rx="5"
          fill={frameFill}
          stroke={defensiveAccent}
          strokeWidth="1.6"
        />
        <text
          x="112"
          y="58"
          fill={defensiveAccent}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
          textAnchor="middle"
        >
          RAG &amp;
        </text>
        <text
          x="112"
          y="70"
          fill={defensiveAccent}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
          textAnchor="middle"
        >
          DATA
        </text>
        <rect
          x="154"
          y="18"
          width="64"
          height="84"
          rx="5"
          fill={frameFill}
          stroke={deepInkStroke}
          strokeWidth="1.75"
        />
        <text
          x="186"
          y="58"
          fill={primaryTextFill}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          MODEL &amp;
        </text>
        <text
          x="186"
          y="70"
          fill={primaryTextFill}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          AGENT
        </text>
        <rect
          x="234"
          y="18"
          width="68"
          height="84"
          rx="5"
          fill={frameFill}
          stroke={offensiveAccent}
          strokeWidth="1.6"
        />
        <text
          x="268"
          y="58"
          fill={primaryTextFill}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          TOOLS &amp;
        </text>
        <text
          x="268"
          y="70"
          fill={offensiveAccent}
          fontSize="8.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
          textAnchor="middle"
        >
          APIs
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 120"
      className={`w-full h-28 bg-[#F4F7FC] dark:bg-[#07111F] rounded-lg border border-slate-300/80 dark:border-slate-400/10 p-2 ${svgRootClass}`}
    >
      <line x1="20" y1="60" x2="295" y2="60" stroke={deepInkStroke} strokeWidth="2.2" />
      <rect
        x="35"
        y="28"
        width="68"
        height="64"
        rx="6"
        fill={frameFill}
        stroke={deepInkStroke}
        strokeWidth="1.6"
      />
      <text
        x="69"
        y="56"
        fill={defensiveAccent}
        fontSize="8.5"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
        textAnchor="middle"
      >
        GATEKEEPER
      </text>
      <text
        x="69"
        y="69"
        fill={secondaryTextFill}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        textAnchor="middle"
      >
        ACL + Scan
      </text>

      <rect
        x="126"
        y="28"
        width="68"
        height="64"
        rx="6"
        fill={frameFill}
        stroke={defBlue}
        strokeWidth="1.75"
      />
      <text
        x="160"
        y="56"
        fill={primaryTextFill}
        fontSize="8.5"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
        textAnchor="middle"
      >
        BREAKER
      </text>
      <text
        x="160"
        y="69"
        fill={secondaryTextFill}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        textAnchor="middle"
      >
        Drift Guard
      </text>

      <rect
        x="217"
        y="28"
        width="72"
        height="64"
        rx="6"
        fill={frameFill}
        stroke={deepInkStroke}
        strokeWidth="1.6"
      />
      <text
        x="253"
        y="56"
        fill={gateTextAmber}
        fontSize="8.5"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
        textAnchor="middle"
      >
        TOOL BROKER
      </text>
      <text
        x="253"
        y="69"
        fill={secondaryTextFill}
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        textAnchor="middle"
      >
        Sandbox + OBO
      </text>
    </svg>
  );
};
