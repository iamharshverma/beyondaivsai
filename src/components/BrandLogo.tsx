import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface BrandLogoProps {
  size?: 'header' | 'footer';
}

/**
 * Creative architectural Brand Logo featuring:
 * 1. Counteroffensive geometric shield-prism emblem with Red (Offensive AI) vs. Blue (Defensive AI) clash
 * 2. Bold "BEYOND" typographic wordmark
 * 3. Vertical stacked "AI / VS. / AI" Red-vs-Blue badge lockup
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'header' }) => {
  const isFooter = size === 'footer';

  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 group select-none">
      {/* Architectural Red vs. Blue Counteroffensive Crest SVG */}
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#E11D48] via-[#7C3AED] to-[#1D4ED8] p-[1.5px] shadow-[0_4px_14px_-3px_rgba(225,29,72,0.35),0_4px_14px_-3px_rgba(29,78,216,0.35)] group-hover:scale-105 transition-transform duration-200">
        <span className="w-full h-full rounded-[10.5px] bg-white dark:bg-[#07111F] flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 36 36"
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="shieldClashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
            {/* Outer Shield / Prism Frame */}
            <path
              d="M18 3L31 9.5V18.5C31 25.8 25.4 31.4 18 33C10.6 31.4 5 25.8 5 18.5V9.5L18 3Z"
              stroke="url(#shieldClashGrad)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Diagonal Counteroffensive Clash Axis */}
            <path
              d="M10.5 23.5L25.5 12.5"
              stroke="url(#shieldClashGrad)"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            {/* Offensive Vector Node (Top Left Crimson Red) */}
            <circle
              cx="13"
              cy="13.5"
              r="2.7"
              className="fill-[#E11D48] dark:fill-[#F43F5E]"
            />
            {/* Defensive Shield Node (Bottom Right Cobalt/Cyan Blue) */}
            <circle
              cx="23"
              cy="22.5"
              r="2.7"
              className="fill-[#1D4ED8] dark:fill-[#38BDF8]"
            />
            {/* Central Deterministic Gate Core */}
            <rect
              x="16"
              y="16"
              width="4"
              height="4"
              rx="1"
              transform="rotate(45 18 18)"
              className="fill-[#091122] dark:fill-[#F5F8FF]"
            />
          </svg>
        </span>
      </span>

      {/* Wordmark Lockup: BEYOND + Vertical Stacked AI / VS. / AI */}
      <span className="inline-flex items-center gap-2 sm:gap-2.5">
        <span className="flex flex-col">
          <span
            className={`${
              isFooter ? 'text-lg sm:text-xl' : 'text-base sm:text-[19px]'
            } font-extrabold tracking-[-0.03em] font-display leading-none text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] transition-colors`}
          >
            BEYOND
          </span>
          <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.16em] uppercase bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent font-bold mt-0.5 leading-none">
            COUNTEROFFENSIVE
          </span>
        </span>

        {/* Luminous Red-to-Blue Clash Divider Bar */}
        <span
          className="h-7 w-[2px] rounded-full bg-gradient-to-b from-[#E11D48] via-[#8B5CF6] to-[#1D4ED8] dark:from-[#F43F5E] dark:via-[#6366F1] dark:to-[#38BDF8]"
          aria-hidden="true"
        />

        {/* Vertical Stacked "AI / VS. / AI" Red vs. Blue Architectural Badge */}
        <span
          className="inline-flex flex-col items-center justify-center px-1.5 py-0.5 rounded-md bg-[#091122] dark:bg-[#0F1D33] border border-[#E11D48]/40 dark:border-[#38BDF8]/40 shadow-2xs leading-none"
          aria-label="AI vs. AI"
        >
          <span className="text-[9px] font-mono font-extrabold tracking-widest text-[#FB7185] leading-[1.05]">
            AI
          </span>
          <span className="text-[6.5px] font-mono font-bold tracking-wider text-amber-300 leading-[1.05] my-[0.5px]">
            VS.
          </span>
          <span className="text-[9px] font-mono font-extrabold tracking-widest text-[#38BDF8] leading-[1.05]">
            AI
          </span>
        </span>
      </span>
    </span>
  );
};

/**
 * Icon-Only Floating Theme Switcher Component for the Header
 * Features a Red-vs-Blue dual-glow ring and animated icon transition.
 */
export const FloatingThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      role="switch"
      aria-checked={!isLight}
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#E11D48] via-[#6366F1] to-[#1D4ED8] shadow-[0_2px_14px_-2px_rgba(225,29,72,0.28),0_2px_14px_-2px_rgba(29,78,216,0.28)] cursor-pointer shrink-0"
    >
      <span className="w-full h-full rounded-full bg-white/95 dark:bg-[#0A1426]/95 backdrop-blur-md flex items-center justify-center">
        <motion.span
          key={theme}
          initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isLight ? (
            <Sun className="w-4 h-4 text-[#E11D48]" />
          ) : (
            <Moon className="w-4 h-4 text-[#38BDF8]" />
          )}
        </motion.span>
      </span>
    </motion.button>
  );
};
