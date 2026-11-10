import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BrandLogoProps {
  size?: 'header' | 'footer';
}

/**
 * Creative architectural Brand Logo featuring:
 * 1. Counteroffensive geometric shield-prism emblem with offensive/defensive vector nodes
 * 2. Bold "BEYOND" typographic wordmark
 * 3. Vertical stacked "AI / VS. / AI" badge lockup after "BEYOND"
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'header' }) => {
  const isFooter = size === 'footer';

  return (
    <span className="inline-flex items-center gap-3 group select-none">
      {/* Architectural Counteroffensive Crest SVG */}
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0284C7] dark:from-[#0B1628] dark:via-[#1E3A8A] dark:to-[#37D5F5]/80 p-[1px] shadow-sm group-hover:shadow-md transition-all duration-200">
        <span className="w-full h-full rounded-[11px] bg-white dark:bg-[#07111F] flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 36 36"
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Shield / Prism Frame */}
            <path
              d="M18 3L31 9.5V18.5C31 25.8 25.4 31.4 18 33C10.6 31.4 5 25.8 5 18.5V9.5L18 3Z"
              className="stroke-[#0F172A] dark:stroke-[#37D5F5] transition-colors duration-300"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            {/* Diagonal Counteroffensive Clash Axis */}
            <path
              d="M10.5 23.5L25.5 12.5"
              className="stroke-[#1D4ED8] dark:stroke-[#37D5F5] transition-colors duration-300"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* Offensive Vector Node (Top Left Crimson) */}
            <circle
              cx="13"
              cy="13.5"
              r="2.4"
              className="fill-[#DC2626] dark:fill-[#F05252]"
            />
            {/* Defensive Shield Node (Bottom Right Cobalt/Cyan) */}
            <circle
              cx="23"
              cy="22.5"
              r="2.4"
              className="fill-[#1D4ED8] dark:fill-[#37D5F5]"
            />
            {/* Central Deterministic Gate Core */}
            <rect
              x="16"
              y="16"
              width="4"
              height="4"
              rx="1"
              transform="rotate(45 18 18)"
              className="fill-[#0F172A] dark:fill-[#F5F8FF]"
            />
          </svg>
        </span>
      </span>

      {/* Wordmark Lockup: BEYOND + Vertical Stacked AI / VS. / AI */}
      <span className="inline-flex items-center gap-2.5">
        <span className="flex flex-col">
          <span
            className={`${
              isFooter ? 'text-xl' : 'text-lg sm:text-[19px]'
            } font-extrabold tracking-[-0.03em] font-display leading-none text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#37D5F5] transition-colors`}
          >
            BEYOND
          </span>
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-slate-500 dark:text-[#AAB8CC] mt-0.5 leading-none">
            COUNTEROFFENSIVE
          </span>
        </span>

        {/* Luminous Vertical Divider Bar */}
        <span
          className="h-7 w-[2px] rounded-full bg-gradient-to-b from-[#DC2626] via-[#1D4ED8] to-[#0284C7] dark:from-[#F05252] dark:via-[#3478F6] dark:to-[#37D5F5]"
          aria-hidden="true"
        />

        {/* Vertical Stacked "AI / VS. / AI" Architectural Badge */}
        <span
          className="inline-flex flex-col items-center justify-center px-1.5 py-0.5 rounded-md bg-slate-900 dark:bg-[#101F34] border border-slate-800 dark:border-[#37D5F5]/40 shadow-2xs leading-none"
          aria-label="AI vs. AI"
        >
          <span className="text-[9px] font-mono font-extrabold tracking-widest text-[#38BDF8] dark:text-[#37D5F5] leading-[1.05]">
            AI
          </span>
          <span className="text-[7px] font-mono font-bold tracking-wider text-amber-300 dark:text-[#F05252] leading-[1.05] my-[0.5px]">
            VS.
          </span>
          <span className="text-[9px] font-mono font-extrabold tracking-widest text-white dark:text-[#F5F8FF] leading-[1.05]">
            AI
          </span>
        </span>
      </span>
    </span>
  );
};

/**
 * Floating Theme Switcher Component for the Header
 * Toggles between Light Mode and Dark Mode and persists user preference
 * in localStorage under 'beyond_ai_vs_ai_theme_v1'.
 */
export const FloatingThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isLight}
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 dark:bg-[#101F34]/95 backdrop-blur-md border border-slate-300/90 dark:border-[#37D5F5]/30 shadow-[0_2px_12px_-2px_rgba(29,78,216,0.14)] dark:shadow-[0_2px_12px_-2px_rgba(55,213,245,0.2)] hover:border-[#1D4ED8] dark:hover:border-[#37D5F5] hover:scale-105 transition-all duration-200 cursor-pointer shrink-0"
    >
      {isLight ? (
        <Sun className="w-4 h-4 text-[#1D4ED8]" />
      ) : (
        <Moon className="w-4 h-4 text-[#37D5F5]" />
      )}
    </button>
  );
};
