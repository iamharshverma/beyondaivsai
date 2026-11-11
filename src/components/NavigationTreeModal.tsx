import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Search,
  BookOpen,
  Shield,
  Layers,
  FileText,
  User,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Compass,
  FolderTree,
  GraduationCap,
  Award,
  Newspaper,
  Mail,
  ShoppingBag,
  Terminal,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS_DATA, MASTER_BLUEPRINT_INFOGRAPHIC } from '../data/chaptersData';
import { BOOK_METADATA } from '../data/bookConfig';
import { useTheme } from '../context/ThemeContext';
import { SequenceMinimalIcon } from './SequenceMinimalIcons';
import { triggerReadinessTestConfetti } from '../utils/confetti';

interface NavTreeItem {
  to: string;
  label: string;
  sublabel: string;
  badge?: string;
  accent?: 'red' | 'blue' | 'purple';
  icon: React.ReactNode;
}

interface NavTreeSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  accentBar: string;
  items: NavTreeItem[];
}

const NAVIGATION_TREE_SECTIONS: NavTreeSection[] = [
  {
    id: 'book-core',
    code: '01',
    title: 'Book & Reading Experience',
    subtitle: 'Official monograph overview, editions, sample sequence & reviews',
    accentBar: 'from-[#E11D48] to-[#FB7185]',
    items: [
      {
        to: '/',
        label: 'Platform Home & Executive Overview',
        sublabel: 'Live AI vs. AI topology, triad pillars & architecture summary',
        icon: <Compass className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
      {
        to: '/book',
        label: 'The Book & Sequence Details',
        sublabel: 'Full 11-sequence breakdown, audience matcher, FAQs & formats',
        badge: 'Core',
        accent: 'blue',
        icon: <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
      {
        to: '/order',
        label: 'Order the Book & Bulk Allocation',
        sublabel: 'Direct author allocation, hardcover/eBook/audio & institutional orders',
        badge: 'Order',
        accent: 'red',
        icon: <ShoppingBag className="w-4 h-4 text-[#E11D48] dark:text-[#FB7185]" />,
      },
      {
        to: '/excerpt',
        label: 'Read Sequence 01 Sample Excerpt',
        sublabel: 'Interactive reader view for "The New Cyber Arms Race" + Infographic',
        badge: 'Free Preview',
        accent: 'blue',
        icon: <FileText className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
      {
        to: '/reviews',
        label: 'Reviews, Research & Credibility',
        sublabel: 'Peer-reviewed IEEE/Springer foundation, patents & manuscript policy',
        icon: <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      },
    ],
  },
  {
    id: 'architecture-toolkit',
    code: '02',
    title: 'Assessment, Architecture & Toolkit',
    subtitle: 'Interactive AI readiness diagnostic test, security design patterns & resources',
    accentBar: 'from-[#E11D48] via-[#6366F1] to-[#1D4ED8]',
    items: [
      {
        to: '/assessment',
        label: 'AI Counteroffensive Readiness Test',
        sublabel: 'Interactive scenario diagnostic + personalized Basic Framework Blueprint',
        badge: 'Take Test',
        accent: 'red',
        icon: <Sparkles className="w-4 h-4 text-[#E11D48] dark:text-[#FB7185]" />,
      },
      {
        to: '/framework',
        label: 'AI-Native Security Framework',
        sublabel: 'Interactive 5-layer attack surface & 4 core security design patterns',
        badge: 'Interactive',
        accent: 'blue',
        icon: <Shield className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
      {
        to: '/resources',
        label: 'Practitioner Resource Library',
        sublabel: '100-Question Checklist, 5-Stage Maturity Model & 30/60/90-Day Playbook',
        badge: 'Toolkit',
        accent: 'purple',
        icon: <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      },
      {
        to: '/educators',
        label: 'Educators, Universities & Enterprises',
        sublabel: '11-week graduate syllabus, lab specifications & executive workshops',
        icon: <GraduationCap className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
    ],
  },
  {
    id: 'author-media',
    code: '03',
    title: 'Author, Blogs & Thought Leadership',
    subtitle: 'Harsh Verma’s biography, 30+ published articles, insights & media kit',
    accentBar: 'from-[#1D4ED8] to-[#38BDF8]',
    items: [
      {
        to: '/author',
        label: 'About Harsh Verma',
        sublabel: 'Principal Software Engineer in AI · FBCS, IEEE Senior Member, 6 Patents',
        icon: <User className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
      {
        to: '/blogs',
        label: 'Author Blogs & Published Articles',
        sublabel: '30+ articles across Forbes Tech Council, RSA Conference & HackerNoon',
        badge: '30+ Articles',
        accent: 'red',
        icon: <Newspaper className="w-4 h-4 text-[#E11D48] dark:text-[#FB7185]" />,
      },
      {
        to: '/insights',
        label: 'Insights & Knowledge Hub',
        sublabel: 'Executive briefings on agentic AI security, OBO auth & RAG defense',
        icon: <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      },
      {
        to: '/media',
        label: 'Official Press & Media Kit',
        sublabel: 'Speaker bios, high-res book artwork, interview topics & press facts',
        icon: <Layers className="w-4 h-4 text-slate-600 dark:text-[#AAB8CC]" />,
      },
      {
        to: '/contact',
        label: 'Contact, Speaking & Advisory',
        sublabel: 'Direct enquiries for keynotes, enterprise briefings & media',
        icon: <Mail className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
    ],
  },
];

const CHAPTER_PARTS_TREE = [
  {
    id: 'part-1',
    label: 'Part I · Threat Landscape & Attack Surface (Red AI)',
    accentClass: 'text-[#E11D48] dark:text-[#FB7185] border-[#E11D48]/30 bg-[#E11D48]/[0.05]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 1 && c.number <= 3),
  },
  {
    id: 'part-2',
    label: 'Part II · Defensive Patterns & Self-Healing Resilience (Blue AI)',
    accentClass: 'text-[#1D4ED8] dark:text-[#38BDF8] border-[#1D4ED8]/30 bg-[#1D4ED8]/[0.05]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 4 && c.number <= 6),
  },
  {
    id: 'part-3',
    label: 'Part III · Enterprise Scale, Agent Identity & Multi-Agent Swarms',
    accentClass: 'text-indigo-600 dark:text-indigo-300 border-indigo-500/30 bg-indigo-500/[0.05]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 7 && c.number <= 9),
  },
  {
    id: 'part-4',
    label: 'Part IV · Engineer’s Toolkit, Careers & Next-Decade Horizon',
    accentClass: 'text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/[0.05]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 10 && c.number <= 11),
  },
];

interface NavigationTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationTreeModal: React.FC<NavigationTreeModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'pages' | 'sequence'>('pages');
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return NAVIGATION_TREE_SECTIONS;
    return NAVIGATION_TREE_SECTIONS.map((sec) => ({
      ...sec,
      items: sec.items.filter(
        (item) =>
          item.label.toLowerCase().includes(normalizedQuery) ||
          item.sublabel.toLowerCase().includes(normalizedQuery)
      ),
    })).filter((sec) => sec.items.length > 0);
  }, [normalizedQuery]);

  const filteredChapterParts = useMemo(() => {
    if (!normalizedQuery) return CHAPTER_PARTS_TREE;
    return CHAPTER_PARTS_TREE.map((part) => ({
      ...part,
      chapters: part.chapters.filter(
        (ch) =>
          ch.title.toLowerCase().includes(normalizedQuery) ||
          ch.subtitle.toLowerCase().includes(normalizedQuery) ||
          ch.partLabel.toLowerCase().includes(normalizedQuery) ||
          `sequence ${ch.number}`.includes(normalizedQuery) ||
          `chapter ${ch.number}`.includes(normalizedQuery)
      ),
    })).filter((part) => part.chapters.length > 0);
  }, [normalizedQuery]);

  const isSearching = normalizedQuery.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Platform Navigation Tree & Sequence Directory"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1220px] my-auto rounded-2xl bg-white dark:bg-[#081222] border border-[#D5E0F0] dark:border-slate-400/20 shadow-[0_25px_70px_-15px_rgba(9,17,34,0.45)] overflow-hidden"
        >
          {/* Top Accent Clash Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#E11D48] via-[#6366F1] to-[#1D4ED8]" />

          {/* Modal Header with Search & Clean 2-Mode Switcher (Pages vs. 11-Part Sequence) */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-400/15 bg-[#F8FAFE] dark:bg-[#0A162B] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] flex items-center justify-center text-white shadow-sm shrink-0">
                  <FolderTree className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent truncate">
                      INTERACTIVE ARCHITECTURE DIRECTORY
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-[#AAB8CC]">
                      ESC to close
                    </span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] truncate">
                    {BOOK_METADATA.brandName} — Navigation &amp; Sequence
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Theme Toggle inside Modal for quick mobile/desktop access */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/20 text-xs font-semibold text-slate-700 dark:text-[#AAB8CC] hover:text-[#1D4ED8] dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle color theme"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#1D4ED8]" />
                      <span className="hidden sm:inline">Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Light</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white dark:bg-[#0F1D33] border border-slate-200 dark:border-slate-400/20 text-slate-600 dark:text-[#AAB8CC] hover:text-[#E11D48] dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Navigation Tree"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Input + Distinct 2-Tab Switcher (Pages & Toolkit vs. 11-Part Sequence) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Two Distinct View Tabs (No duplicate Full Tree / Pages) */}
              <div className="grid grid-cols-2 sm:flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/75 dark:bg-[#060D1A] border border-slate-300/60 dark:border-slate-400/15 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('pages')}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === 'pages' && !isSearching
                      ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span>Pages &amp; Toolkit (14)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sequence')}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === 'sequence' && !isSearching
                      ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>Book Sequence (01–11)</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages, tools, or sequence..."
                  aria-label="Filter navigation tree"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#0F1D33] border border-[#CBD5E1] dark:border-slate-400/20 text-xs text-[#091122] dark:text-[#F5F8FF] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>
            </div>
          </div>

          {/* Main Tree Body */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Featured Top Highlight Banner inside Modal */}
            {!isSearching && activeTab === 'pages' && (
              <div className="rounded-2xl bg-gradient-to-r from-[#E11D48]/[0.07] via-[#F4F7FC] to-[#1D4ED8]/[0.09] dark:from-[#E11D48]/[0.14] dark:via-[#0F1E36] dark:to-[#1D4ED8]/[0.16] border border-[#D5E0F0] dark:border-slate-400/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#1D4ED8] text-white shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#E11D48] dark:text-[#FB7185]">
                      NEW INTERACTIVE DIAGNOSTIC
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                      Take the AI vs. AI Counteroffensive Readiness Assessment
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-[#AAB8CC]">
                      Benchmark your defense in 90 seconds and unlock a tailored Basic Framework Blueprint.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/assessment"
                    onClick={() => {
                      triggerReadinessTestConfetti();
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#091122] dark:bg-white text-white dark:text-[#091122] text-xs font-bold shadow-2xs hover:opacity-90 transition-opacity"
                  >
                    <span>Take Readiness Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveTab('sequence')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#081222] border border-[#CBD5E1] dark:border-slate-400/20 text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] cursor-pointer"
                  >
                    <span>View 11-Part Sequence</span>
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 1: Platform Pages & Toolkit Tree (3 Categorized Branches) */}
            {(activeTab === 'pages' || isSearching) && filteredSections.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {filteredSections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-2xl bg-[#F8FAFE] dark:bg-[#0B172A] border border-[#DCE5F4] dark:border-slate-400/15 overflow-hidden flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className={`h-1 w-full bg-gradient-to-r ${section.accentBar}`} />
                      <div className="p-4 sm:p-5">
                        {/* Tree Branch Header */}
                        <div className="pb-3 mb-3.5 border-b border-slate-200/90 dark:border-slate-400/15">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-[10px] font-mono font-bold text-white">
                              BRANCH {section.code}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                              {section.title}
                            </h3>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-[#AAB8CC] mt-1">
                            {section.subtitle}
                          </p>
                        </div>

                        {/* Tree Nodes with Vertical Connector Line */}
                        <div className="relative pl-3.5 border-l-2 border-slate-200 dark:border-slate-700/80 space-y-2.5">
                          {section.items.map((item) => {
                            const isCurrent = location.pathname === item.to;
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={onClose}
                                className={`group relative block rounded-xl p-3 transition-all border ${
                                  isCurrent
                                    ? 'bg-gradient-to-r from-[#E11D48]/[0.08] to-[#1D4ED8]/[0.1] border-[#1D4ED8]/40 dark:border-[#38BDF8]/40 shadow-2xs'
                                    : 'bg-white dark:bg-[#0F1E36] border-slate-200/80 dark:border-slate-400/10 hover:border-[#1D4ED8] dark:hover:border-[#38BDF8]/50 hover:shadow-xs'
                                }`}
                              >
                                {/* Horizontal Tree Branch Tick */}
                                <span className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-slate-300 dark:bg-slate-600 group-hover:bg-[#1D4ED8] dark:group-hover:bg-[#38BDF8] transition-colors" />

                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="mt-0.5 p-1.5 rounded-lg bg-[#F4F7FC] dark:bg-[#081222] border border-slate-200/70 dark:border-slate-400/15 shrink-0">
                                      {item.icon}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-xs sm:text-sm font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] transition-colors">
                                          {item.label}
                                        </span>
                                        {item.badge && (
                                          <span
                                            className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                                              item.accent === 'red'
                                                ? 'bg-[#E11D48]/10 text-[#E11D48] dark:text-[#FB7185]'
                                                : item.accent === 'purple'
                                                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300'
                                                : 'bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#38BDF8]'
                                            }`}
                                          >
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-slate-500 dark:text-[#AAB8CC] mt-0.5 leading-snug">
                                        {item.sublabel}
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW 2: Complete 11-Part Sequence + 12th Multi-Agent Module & Master Blueprint Tree */}
            {(activeTab === 'sequence' || isSearching) && filteredChapterParts.length > 0 && (
              <div className="rounded-2xl bg-[#F8FAFE] dark:bg-[#0B172A] border border-[#DCE5F4] dark:border-slate-400/15 p-4 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-400/15">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-[10px] font-mono font-bold text-white">
                      MASTER BLUEPRINT &amp; SEQUENCE 01–12
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                        Sequence Manuscript &amp; Visual Icon Tree
                      </h3>
                    </div>
                  </div>
                  <Link
                    to="/chapters"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                  >
                    <span>Open Full Sequence Visual Atlas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Master Blueprint Visual Anchor Card */}
                <Link
                  to="/chapters"
                  onClick={onClose}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-[#E11D48]/[0.06] via-white to-[#1D4ED8]/[0.08] dark:from-[#E11D48]/[0.14] dark:via-[#0F1E36] dark:to-[#1D4ED8]/[0.16] border border-[#1D4ED8]/30 dark:border-[#38BDF8]/30 p-3.5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#081222] border border-[#D5E0F0] dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                      <SequenceMinimalIcon id="master-blueprint" size="md" />
                    </div>
                    <img
                      src={MASTER_BLUEPRINT_INFOGRAPHIC.imageUrl}
                      alt={MASTER_BLUEPRINT_INFOGRAPHIC.title}
                      loading="lazy"
                      className="w-14 h-10 rounded-lg object-cover object-top border border-slate-200 dark:border-slate-700 shrink-0 hidden xs:block"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono font-bold text-[#E11D48] dark:text-[#FB7185]">
                        MASTER BLUEPRINT · ALL 11 SEQUENCES + MULTI-AGENT COMPANION
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] truncate">
                        {MASTER_BLUEPRINT_INFOGRAPHIC.title}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8] shrink-0">
                    <span>Inspect Atlas</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {filteredChapterParts.map((part) => (
                    <div
                      key={part.id}
                      className="rounded-xl bg-white dark:bg-[#0F1E36] border border-slate-200/90 dark:border-slate-400/15 p-4 space-y-3"
                    >
                      <div
                        className={`inline-block px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold ${part.accentClass}`}
                      >
                        {part.label}
                      </div>

                      <div className="relative pl-3.5 border-l-2 border-slate-200 dark:border-slate-700 space-y-2">
                        {part.chapters.map((ch) => {
                          const chUrl = `/chapters/${ch.slug}`;
                          const isCurrent = location.pathname === chUrl;
                          return (
                            <Link
                              key={ch.slug}
                              to={chUrl}
                              onClick={onClose}
                              className={`group relative flex items-center justify-between gap-3 rounded-lg p-2.5 transition-all border ${
                                isCurrent
                                  ? 'bg-blue-500/[0.08] border-[#1D4ED8]/40 dark:border-[#38BDF8]/40'
                                  : 'bg-[#F8FAFE] dark:bg-[#091426] border-slate-200/70 dark:border-slate-400/10 hover:border-[#1D4ED8] dark:hover:border-[#38BDF8]/40'
                              }`}
                            >
                              <span className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-slate-300 dark:bg-slate-600 group-hover:bg-[#1D4ED8]" />
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F1E36] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0">
                                  <SequenceMinimalIcon id={ch.number} size="sm" />
                                </div>
                                <img
                                  src={ch.infographicUrl}
                                  alt={`Seq ${ch.number}`}
                                  loading="lazy"
                                  className="w-11 h-8 rounded object-cover object-top border border-slate-200 dark:border-slate-700 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="text-[10px] font-mono font-bold text-[#E11D48] dark:text-[#38BDF8]">
                                    SEQUENCE {String(ch.number).padStart(2, '0')} · {ch.readingTime}
                                  </div>
                                  <div className="text-xs font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] truncate">
                                    {ch.title}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </Link>
                          );
                        })}

                        {/* Include the 12th Multi-Agent Swarm Infographic Anchor under Part III */}
                        {part.id === 'part-3' && (
                          <Link
                            to="/chapters/enterprise-ai-and-secure-deployment-at-scale"
                            onClick={onClose}
                            className="group relative flex items-center justify-between gap-3 rounded-lg p-2.5 transition-all border bg-[#F8FAFE] dark:bg-[#091426] border-slate-200/70 dark:border-slate-400/10 hover:border-[#1D4ED8] dark:hover:border-[#38BDF8]/40"
                          >
                            <span className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-slate-300 dark:bg-slate-600 group-hover:bg-[#1D4ED8]" />
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F1E36] border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0">
                                <SequenceMinimalIcon id={12} size="sm" />
                              </div>
                              <img
                                src="/assets/aistudio/Securing_Multi-Agent_AI_Infographic_6cde3f65.png"
                                alt="Seq 12 Multi-Agent AI"
                                loading="lazy"
                                className="w-11 h-8 rounded object-cover object-top border border-slate-200 dark:border-slate-700 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-[10px] font-mono font-bold text-[#E11D48] dark:text-[#38BDF8]">
                                  SEQUENCE 12 · MULTI-AGENT ARCHITECTURE
                                </div>
                                <div className="text-xs font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] truncate">
                                  Securing Multi-Agent AI Ecosystems
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Quick Action Footer */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#F4F7FC] dark:bg-[#060D1A] border-t border-slate-200 dark:border-slate-400/15 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-slate-600 dark:text-[#AAB8CC]">
              <span className="font-mono font-semibold text-[#091122] dark:text-[#F5F8FF]">
                Quick Jump:
              </span>
              <Link
                to="/book"
                onClick={onClose}
                className="hover:text-[#1D4ED8] dark:hover:text-[#38BDF8] underline underline-offset-4"
              >
                Book Overview
              </Link>
              <span>·</span>
              <Link
                to="/chapters"
                onClick={onClose}
                className="hover:text-[#1D4ED8] dark:hover:text-[#38BDF8] underline underline-offset-4"
              >
                Sequence &amp; Infographics
              </Link>
              <span>·</span>
              <Link
                to="/assessment"
                onClick={onClose}
                className="hover:text-[#E11D48] dark:hover:text-[#FB7185] font-semibold underline underline-offset-4"
              >
                AI Readiness Assessment
              </Link>
              <span>·</span>
              <Link
                to="/blogs"
                onClick={onClose}
                className="hover:text-[#1D4ED8] dark:hover:text-[#38BDF8] underline underline-offset-4"
              >
                30+ Author Blogs
              </Link>
            </div>

            <Link
              to="/order"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-white font-semibold shadow-2xs hover:opacity-95 transition-opacity"
            >
              <span>Order the Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
