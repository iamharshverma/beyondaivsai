import { useTheme } from '../context/ThemeContext';

export interface SvgThemeTokens {
  isLight: boolean;
  /** Wrapper SVG class that injects smooth transitions and theme variables */
  svgRootClass: string;
  /** Class applied to structural vector lines, borders, and connectors */
  inkLineClass: string;
  /** Class applied to active/highlighted vector signal paths */
  signalLineClass: string;
  /** Primary deep-ink stroke for light mode vs luminous slate/cyan stroke for dark mode */
  deepInkStroke: string;
  /** Secondary structural line stroke */
  mutedInkStroke: string;
  /** Background grid pattern line stroke */
  gridStroke: string;
  /** Primary SVG canvas fill */
  canvasFill: string;
  /** Secondary inner frame fill */
  frameFill: string;
  /** Outer frame stroke */
  frameStroke: string;
  /** Standard node fill */
  nodeFill: string;
  /** Active node fill */
  activeNodeFill: string;
  /** Standard node border stroke */
  nodeStroke: string;
  /** Primary typography ink inside SVG */
  primaryTextFill: string;
  /** Secondary typography ink inside SVG */
  secondaryTextFill: string;
  /** Muted label ink inside SVG */
  mutedTextFill: string;
  /** Defensive cobalt/cyan accent */
  defensiveAccent: string;
  /** Offensive crimson accent */
  offensiveAccent: string;
  /** Governance amber/emerald accent */
  governanceAccent: string;
}

/**
 * Utility function to generate theme-aware SVG classes and stroke/fill tokens.
 * Specifically ensures vector lines transition from a high-contrast dark state
 * to deep ink lines (#0F172A / #1E293B) for the Pearl Alabaster light theme.
 */
export function getSvgThemeTokens(theme: 'light' | 'dark'): SvgThemeTokens {
  const isLight = theme === 'light';

  return {
    isLight,
    svgRootClass: isLight
      ? 'svg-theme-alabaster transition-colors duration-300 ease-out'
      : 'svg-theme-cyberdark transition-colors duration-300 ease-out',
    inkLineClass: isLight
      ? 'stroke-[#0F172A] transition-[stroke,opacity] duration-300'
      : 'stroke-[#94A3B8] transition-[stroke,opacity] duration-300',
    signalLineClass: isLight
      ? 'stroke-[#1D4ED8] transition-[stroke,opacity] duration-300'
      : 'stroke-[#37D5F5] transition-[stroke,opacity] duration-300',
    deepInkStroke: isLight ? '#0F172A' : '#E2E8F0',
    mutedInkStroke: isLight ? '#334155' : '#64748B',
    gridStroke: isLight ? '#CBD5E1' : '#37D5F5',
    canvasFill: isLight ? '#F5F8FC' : '#07111F',
    frameFill: isLight ? '#FFFFFF' : '#0B1628',
    frameStroke: isLight ? '#1E293B' : '#1E3A5F',
    nodeFill: isLight ? '#FFFFFF' : '#101F34',
    activeNodeFill: isLight ? '#EFF6FF' : '#162B46',
    nodeStroke: isLight ? '#0F172A' : '#334155',
    primaryTextFill: isLight ? '#091122' : '#F5F8FF',
    secondaryTextFill: isLight ? '#1E293B' : '#CBD5E1',
    mutedTextFill: isLight ? '#475569' : '#94A3B8',
    defensiveAccent: isLight ? '#1D4ED8' : '#37D5F5',
    offensiveAccent: isLight ? '#DC2626' : '#F05252',
    governanceAccent: isLight ? '#047857' : '#34D399',
  };
}

/**
 * React hook that injects theme-aware classes and deep-ink stroke tokens into
 * SVG architectural diagrams, responding live to Light/Dark mode transitions.
 */
export function useSvgTheme(): SvgThemeTokens {
  const { theme } = useTheme();
  return getSvgThemeTokens(theme);
}
