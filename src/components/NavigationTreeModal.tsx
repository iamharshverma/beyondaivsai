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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { BOOK_METADATA } from '../data/bookConfig';

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
  items: NavTreeItem[];
}

const NAVIGATION_TREE_SECTIONS: NavTreeSection[] = [
  {
    id: 'book-core',
    code: '01',
    title: 'Book & Reading Experience',
    subtitle: 'Official monograph overview, editions, sample chapter & reviews',
    items: [
      {
        to: '/',
        label: 'Platform Home & Executive Overview',
        sublabel: 'Live AI vs. AI topology, triad pillars & architecture summary',
        icon: <Compass className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />,
      },
      {
        to: '/book',
        label: 'The Book & Chapter Details',
        sublabel: 'Full 11-chapter breakdown, audience matcher, FAQs & formats',
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
        label: 'Read Chapter 1 Sample Excerpt',
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
    title: 'Architecture & Practitioner Toolkit',
    subtitle: 'Interactive security design patterns, assessments & academic resources',
    items: [
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
        sublabel: '100-Question Assessment, 5-Stage Maturity Model & 30/60/90-Day Playbook',
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
    accentClass: 'text-[#E11D48] dark:text-[#FB7185] border-[#E11D48]/30 bg-[#E11D48]/[0.04]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 1 && c.number <= 3),
  },
  {
    id: 'part-2',
    label: 'Part II · Defensive Patterns & Self-Healing Resilience (Blue AI)',
    accentClass: 'text-[#1D4ED8] dark:text-[#38BDF8] border-[#1D4ED8]/30 bg-[#1D4ED8]/[0.04]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 4 && c.number <= 6),
  },
  {
    id: 'part-3',
    label: 'Part III · Enterprise Scale, Regulated Sectors & Startups',
    accentClass: 'text-indigo-600 dark:text-indigo-300 border-indigo-500/30 bg-indigo-500/[0.04]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 7 && c.number <= 9),
  },
  {
    id: 'part-4',
    label: 'Part IV · Careers & The 30/60/90-Day Counteroffensive Playbook',
    accentClass: 'text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/[0.04]',
    chapters: CHAPTERS_DATA.filter((c) => c.number >= 10 && c.number <= 11),
  },
];

interface NavigationTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationTreeModal: React.FC<NavigationTreeModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sections' | 'chapters'>('all');
  const location = useLocation();

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
          `chapter ${ch.number}`.includes(normalizedQuery)
      ),
    })).filter((part) => part.chapters.length > 0);
  }, [normalizedQuery]);

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
        aria-label="Platform Navigation Tree & Chapter Directory"
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

          {/* Modal Header with Search & View Filter Tabs */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-400/15 bg-[#F8FAFE] dark:bg-[#0A162B]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] flex items-center justify-center text-white shadow-sm shrink-0">
                  <FolderTree className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
                      INTERACTIVE ARCHITECTURE DIRECTORY
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-[#AAB8CC]">
                      ESC to close
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                    {BOOK_METADATA.brandName} — Complete Navigation Tree
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter pages or chapters..."
                    aria-label="Filter navigation tree"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#0F1D33] border border-[#CBD5E1] dark:border-slate-400/20 text-xs text-[#091122] dark:text-[#F5F8FF] placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                {/* View Mode Filter Pills */}
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-200/75 dark:bg-[#060D1A] border border-slate-300/60 dark:border-slate-400/15 text-xs font-semibold">
                  {(
                    [
                      { id: 'all', label: 'Full Tree' },
                      { id: 'sections', label: 'Pages' },
                      { id: 'chapters', label: '11 Chapters' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-2xs'
                          : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

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
          </div>

          {/* Main Tree Body */}
          <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-8">
            {/* PART A: Platform Sections & Pages Tree (3 Columns) */}
            {(activeTab === 'all' || activeTab === 'sections') && filteredSections.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {filteredSections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-2xl bg-[#F8FAFE] dark:bg-[#0B172A] border border-[#DCE5F4] dark:border-slate-400/15 p-4 sm:p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Tree Branch Header */}
                      <div className="flex items-center gap-2 pb-3 mb-3.5 border-b border-slate-200/90 dark:border-slate-400/15">
                        <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-[10px] font-mono font-bold text-white">
                          BRANCH {section.code}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                          {section.title}
                        </h3>
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
                ))}
              </div>
            )}

            {/* PART B: Complete 11-Chapter Architectural Syllabus Tree */}
            {(activeTab === 'all' || activeTab === 'chapters') && filteredChapterParts.length > 0 && (
              <div className="rounded-2xl bg-[#F8FAFE] dark:bg-[#0B172A] border border-[#DCE5F4] dark:border-slate-400/15 p-4 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-400/15">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-[10px] font-mono font-bold text-white">
                      BRANCH 04
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                        11-Chapter Manuscript &amp; Infographic Tree
                      </h3>
                    </div>
                  </div>
                  <Link
                    to="/chapters"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline"
                  >
                    <span>Open Full 11-Chapter Visual Atlas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

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
                                <img
                                  src={ch.infographicUrl}
                                  alt={`Ch ${ch.number}`}
                                  loading="lazy"
                                  className="w-11 h-8 rounded object-cover object-top border border-slate-200 dark:border-slate-700 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="text-[10px] font-mono font-bold text-[#E11D48] dark:text-[#38BDF8]">
                                    CHAPTER {String(ch.number).padStart(2, '0')} · {ch.readingTime}
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
                11 Chapters &amp; Infographics
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-white font-semibold shadow-2xs hover:opacity-95 transition-opacity"
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
