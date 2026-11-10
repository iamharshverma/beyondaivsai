import React from 'react';

export type SequenceIconKey =
  | 'master-blueprint'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

interface SequenceMinimalIconProps {
  id: SequenceIconKey | string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function normalizeSequenceIconKey(input: SequenceIconKey | string | number): SequenceIconKey {
  if (input === 'master-blueprint' || input === 'master') return 'master-blueprint';
  if (typeof input === 'number') {
    const clamped = Math.max(1, Math.min(12, input)) as SequenceIconKey;
    return clamped;
  }
  const match = String(input).match(/(\d+)/);
  if (match) {
    const num = Math.max(1, Math.min(12, parseInt(match[1], 10))) as SequenceIconKey;
    return num;
  }
  return 'master-blueprint';
}

/**
 * Distinct, minimalist geometric SVG icon set for the Master Blueprint and all 12 Sequence modules.
 * Uses crisp vector geometry with Red (#E11D48 / #FB7185) vs. Blue (#1D4ED8 / #38BDF8) counteroffensive accents.
 */
export const SequenceMinimalIcon: React.FC<SequenceMinimalIconProps> = ({
  id,
  size = 'md',
  className = '',
}) => {
  const key = normalizeSequenceIconKey(id);
  const dimClass = SIZE_CLASSES[size];

  switch (key) {
    case 'master-blueprint':
      // Master Blueprint: Interlocking Red-vs-Blue 4-Quadrant Command Matrix with Center Core
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1.75"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.8"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1.75"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1.75"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1.75"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.8"
          />
          <path
            d="M10 6.5H14M6.5 10V14M17.5 10V14M10 17.5H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.2" className="fill-[#E11D48] dark:fill-[#38BDF8]" />
        </svg>
      );

    case 1:
      // Sequence 01: The New Cyber Arms Race — Opposing Red Spear vs. Blue Shield Clash
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M4 19L11.5 11.5M11.5 11.5H6.5M11.5 11.5V16.5"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 4.5L19.5 6.5V11.5C19.5 15.2 17.1 18.2 14.5 19.5C11.9 18.2 9.5 15.2 9.5 11.5V6.5L14.5 4.5Z"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 2:
      // Sequence 02: Attacker's Playbook — Autonomous Target Reticle & Exploit Pulse
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <circle
            cx="12"
            cy="12"
            r="7.5"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.75"
            strokeDasharray="3.5 2.5"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            className="fill-[#E11D48]/20 stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.75"
          />
          <path
            d="M12 2.5V5.5M12 18.5V21.5M2.5 12H5.5M18.5 12H21.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );

    case 3:
      // Sequence 03: The AI Attack Surface — 3 Isometric Stack Layers + Injection Vector
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M12 3.5L20 7.5L12 11.5L4 7.5L12 3.5Z"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M4 12L12 16L20 12"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16.5L12 20.5L20 16.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 4:
      // Sequence 04: AI-Native Security Design Patterns — Deterministic Circuit Breaker Gate
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <rect
            x="3.5"
            y="5"
            width="17"
            height="14"
            rx="3"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.75"
          />
          <path
            d="M7 12H10.2L13.5 8.5M14.2 12H17"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10.2" cy="12" r="1.4" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
          <circle cx="14.2" cy="12" r="1.4" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
        </svg>
      );

    case 5:
      // Sequence 05: Building Safe AI Systems — Red-Teaming Adversarial Prism & Verification Check
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <polygon
            points="12,3 20.5,8 20.5,16 12,21 3.5,16 3.5,8"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 12.2L11 14.7L15.8 9.5"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 6:
      // Sequence 06: Resilient & Self-Healing AI — Regenerative Loop Around Core Node
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M19.5 10.5C18.8 6.8 15.7 4 12 4C8.9 4 6.2 5.8 5 8.5M4.5 5.5V8.8H7.8"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 13.5C5.2 17.2 8.3 20 12 20C15.1 20 17.8 18.2 19 15.5M19.5 18.5V15.2H16.2"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.2" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
        </svg>
      );

    case 7:
      // Sequence 07: Enterprise & Agentic AI at Scale — Central Orchestrator Hub & Scoped Satellite Nodes
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <circle
            cx="12"
            cy="12"
            r="3.2"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
          />
          <circle cx="5" cy="6" r="1.8" className="fill-[#E11D48] dark:fill-[#FB7185]" />
          <circle cx="19" cy="6" r="1.8" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
          <circle cx="5" cy="18" r="1.8" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
          <circle cx="19" cy="18" r="1.8" className="fill-[#E11D48] dark:fill-[#FB7185]" />
          <path
            d="M6.5 7.2L9.5 9.8M17.5 7.2L14.5 9.8M6.5 16.8L9.5 14.2M17.5 16.8L14.5 14.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 8:
      // Sequence 08: Agent Identity, Authorization & High-Consequence Policy — Cryptographic Key + OBO Badge
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <circle
            cx="8.5"
            cy="12"
            r="4.2"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
          />
          <circle cx="8.5" cy="12" r="1.3" className="fill-[#E11D48] dark:fill-[#FB7185]" />
          <path
            d="M12.7 12H20.5M17.5 12V15.5M20.2 12V14.5"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
        </svg>
      );

    case 9:
      // Sequence 09: Multi-Agent AI & Startup Day-One Architecture — Zero-Trust Triangle Mesh
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M12 5.5L18.5 17H5.5L12 5.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="5.5" r="2.2" className="fill-[#E11D48] dark:fill-[#FB7185]" />
          <circle cx="5.5" cy="17" r="2.2" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
          <circle cx="18.5" cy="17" r="2.2" className="fill-[#1D4ED8] dark:fill-[#38BDF8]" />
        </svg>
      );

    case 10:
      // Sequence 10: Careers & AI Engineer's Toolkit — Terminal Brackets + Rising Compass Vector
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M7.5 8L3.5 12L7.5 16M16.5 8L20.5 12L16.5 16"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 6.5L10.5 17.5"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
        </svg>
      );

    case 11:
      // Sequence 11: The Counteroffensive Playbook & Road Ahead — 30/60/90-Day Horizon Trajectory
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M4 18.5L9.5 13L13.5 15.5L20 7.5M20 7.5H15.2M20 7.5V12.3"
            className="stroke-[#E11D48] dark:stroke-[#FB7185]"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20.5H20"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );

    case 12:
    default:
      // Sequence 12 / Companion Module: Leadership & Ecosystem Mastery Beacon
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`${dimClass} shrink-0 ${className}`}
        >
          <path
            d="M12 3L14.6 8.5L20.5 9.3L16.2 13.4L17.3 19.3L12 16.5L6.7 19.3L7.8 13.4L3.5 9.3L9.4 8.5L12 3Z"
            className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2" className="fill-[#E11D48] dark:fill-[#FB7185]" />
        </svg>
      );
  }
};
