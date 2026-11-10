import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Eye,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  CHAPTERS_DATA,
  MASTER_BLUEPRINT_INFOGRAPHIC,
  ChapterDetail,
} from '../data/chaptersData';
import { SequenceMinimalIcon, SequenceIconKey } from './SequenceMinimalIcons';

export interface LightboxSlide {
  id: string;
  iconKey: SequenceIconKey;
  badge: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  keyTakeaway: string;
  chapterSlug?: string;
  chapterNumber?: number;
  offensiveVector?: string;
  defensiveCountermeasure?: string;
  humanOversightGate?: string;
  highlights?: string[];
}

const galleryContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.04,
    },
  },
};

const galleryItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function buildAllInfographicSlides(): LightboxSlide[] {
  const masterSlide: LightboxSlide = {
    id: MASTER_BLUEPRINT_INFOGRAPHIC.id,
    iconKey: 'master-blueprint',
    badge: 'MASTER BLUEPRINT · COMPLETE 11-SEQUENCE ARCHITECTURE',
    shortLabel: 'Master Blueprint',
    title: MASTER_BLUEPRINT_INFOGRAPHIC.title,
    subtitle: MASTER_BLUEPRINT_INFOGRAPHIC.subtitle,
    imageUrl: MASTER_BLUEPRINT_INFOGRAPHIC.imageUrl,
    keyTakeaway: MASTER_BLUEPRINT_INFOGRAPHIC.keyTakeaway,
    highlights: MASTER_BLUEPRINT_INFOGRAPHIC.highlights,
  };

  const chapterSlides: LightboxSlide[] = CHAPTERS_DATA.map((ch) => ({
    id: `ch-${ch.number}`,
    iconKey: ch.number as SequenceIconKey,
    badge: `SEQUENCE ${String(ch.number).padStart(2, '0')} · ${ch.partLabel.toUpperCase()}`,
    shortLabel: `Seq ${String(ch.number).padStart(2, '0')}`,
    title: `Sequence ${String(ch.number).padStart(2, '0')}: ${ch.title}`,
    subtitle: ch.subtitle,
    imageUrl: ch.infographicUrl,
    secondaryImageUrl: ch.secondaryInfographicUrl,
    keyTakeaway: ch.infographicKeyTakeaway,
    chapterSlug: ch.slug,
    chapterNumber: ch.number,
    offensiveVector: ch.visualSpec.offensiveVector,
    defensiveCountermeasure: ch.visualSpec.defensiveCountermeasure,
    humanOversightGate: ch.visualSpec.humanOversightGate,
    highlights: ch.learningOutcomes,
  }));

  // 12th Dedicated Infographic Module: Multi-Agent AI Swarm Architecture (Companion to Sequence 07/09)
  const multiAgentCompanionSlide: LightboxSlide = {
    id: 'ch-12',
    iconKey: 12,
    badge: 'SEQUENCE 12 · MULTI-AGENT SWARM ARCHITECTURE',
    shortLabel: 'Seq 12 · Multi-Agent',
    title: 'Sequence 12: Securing Multi-Agent AI Ecosystems',
    subtitle: 'Orchestrator Trust Boundaries, Sub-Agent Attestation & Swarm Blast-Radius Containment',
    imageUrl: '/assets/aistudio/Securing_Multi-Agent_AI_Infographic_6cde3f65.png',
    keyTakeaway:
      'Multi-agent ecosystems require cryptographic inter-agent message signing, capability attenuation across delegation hops, and swarm-level circuit breakers.',
    chapterSlug: 'enterprise-ai-and-secure-deployment-at-scale',
    chapterNumber: 7,
    offensiveVector: 'Compromised sub-agent injecting malicious instructions into peer agents across the swarm',
    defensiveCountermeasure: 'Signed inter-agent envelopes, progressive privilege attenuation & isolated execution sandboxes',
    humanOversightGate: 'Human-in-the-loop step-up approval before cross-domain swarm actuation',
    highlights: [
      'Enforce zero-trust attestation between orchestrator and sub-agents',
      'Attenuate token scopes at every delegation hop',
      'Isolate sub-agent memory stores to prevent lateral context poisoning',
    ],
  };

  return [masterSlide, ...chapterSlides, multiAgentCompanionSlide];
}

interface InfographicLightboxModalProps {
  isOpen: boolean;
  initialSlideId?: string;
  onClose: () => void;
}

export const InfographicLightboxModal: React.FC<InfographicLightboxModalProps> = ({
  isOpen,
  initialSlideId = 'master-blueprint',
  onClose,
}) => {
  const slides = buildAllInfographicSlides();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.5 | 2>(1);
  const [useSecondaryVariant, setUseSecondaryVariant] = useState(false);

  useEffect(() => {
    if (isOpen && initialSlideId) {
      const idx = slides.findIndex((s) => s.id === initialSlideId);
      setCurrentIndex(idx >= 0 ? idx : 0);
      setZoomLevel(1);
      setUseSecondaryVariant(false);
    }
  }, [isOpen, initialSlideId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setZoomLevel(1);
        setUseSecondaryVariant(false);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setZoomLevel(1);
        setUseSecondaryVariant(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, slides.length]);

  if (!isOpen) return null;

  const activeSlide = slides[currentIndex] || slides[0];
  const displayImageUrl =
    useSecondaryVariant && activeSlide.secondaryImageUrl
      ? activeSlide.secondaryImageUrl
      : activeSlide.imageUrl;

  const cycleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={activeSlide.title}
      >
        {/* Top Modal Control Bar */}
        <div className="w-full max-w-[1440px] mx-auto bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 rounded-t-2xl px-3.5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="min-w-0 flex-1 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F4F7FC] dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/20 flex items-center justify-center shrink-0">
              <SequenceMinimalIcon id={activeSlide.iconKey} size="md" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent truncate">
                {activeSlide.badge}
              </div>
              <div className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] truncate">
                {activeSlide.title}
              </div>
            </div>
          </div>

          {/* Sequence Quick-Selector Dropdown + Zoom + Prev/Next + Close */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <select
              aria-label="Select Sequence Infographic"
              value={activeSlide.id}
              onChange={(e) => {
                const idx = slides.findIndex((s) => s.id === e.target.value);
                if (idx >= 0) {
                  setCurrentIndex(idx);
                  setZoomLevel(1);
                  setUseSecondaryVariant(false);
                }
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 text-xs font-medium text-slate-800 dark:text-[#F5F8FF] focus:outline-none cursor-pointer max-w-[170px] sm:max-w-[230px] truncate"
            >
              {slides.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shortLabel}: {s.title.replace(/^Sequence \d+:\s*/, '')}
                </option>
              ))}
            </select>

            {activeSlide.secondaryImageUrl && (
              <button
                type="button"
                onClick={() => setUseSecondaryVariant((prev) => !prev)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E11D48]/10 dark:bg-[#38BDF8]/15 border border-[#E11D48]/30 dark:border-[#38BDF8]/30 text-xs font-mono font-semibold text-[#E11D48] dark:text-[#38BDF8] hover:opacity-90 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">
                  {useSecondaryVariant ? 'View Primary Visual' : 'View Alternate Edition'}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={cycleZoom}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#101F34] hover:bg-slate-200 dark:hover:bg-[#172B47] text-xs font-mono font-semibold text-slate-800 dark:text-[#F5F8FF] transition-colors cursor-pointer"
              title="Toggle Zoom Level (1x, 1.5x, 2x)"
            >
              {zoomLevel > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span>{zoomLevel}x</span>
            </button>

            <div className="flex items-center rounded-lg bg-slate-100 dark:bg-[#101F34] p-0.5 border border-slate-200 dark:border-slate-400/15">
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
                  setZoomLevel(1);
                  setUseSecondaryVariant(false);
                }}
                className="p-1.5 rounded-md text-slate-700 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0B1628] transition-colors cursor-pointer"
                aria-label="Previous Infographic"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-[11px] font-mono text-slate-600 dark:text-[#AAB8CC] tabular-nums">
                {currentIndex + 1}/{slides.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % slides.length);
                  setZoomLevel(1);
                  setUseSecondaryVariant(false);
                }}
                className="p-1.5 rounded-md text-slate-700 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0B1628] transition-colors cursor-pointer"
                aria-label="Next Infographic"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#101F34] text-slate-700 dark:text-[#AAB8CC] hover:text-[#E11D48] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close Infographic Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center High-Resolution Zoomable Infographic Stage + Right Key Takeaways Drawer */}
        <div className="w-full max-w-[1440px] mx-auto flex-1 bg-slate-50 dark:bg-[#060D1A] border-x border-slate-200 dark:border-slate-400/20 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-0">
          {/* Image Canvas */}
          <div className="lg:col-span-8 xl:col-span-9 h-full overflow-auto flex items-center justify-center p-3 sm:p-6 bg-[#F1F5FB] dark:bg-[#050B16]">
            <img
              src={displayImageUrl}
              alt={activeSlide.title}
              onClick={cycleZoom}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
              }}
              className={`max-h-full w-auto object-contain rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-400/15 transition-transform duration-200 ${
                zoomLevel === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'
              }`}
            />
          </div>

          {/* Right Sidebar: Key Takeaways & Architectural Breakdown */}
          <div className="lg:col-span-4 xl:col-span-3 h-full overflow-y-auto bg-white dark:bg-[#0B1628] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-400/15 p-4 sm:p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-br from-[#E11D48]/[0.06] to-[#1D4ED8]/[0.08] dark:from-[#E11D48]/15 dark:to-[#1D4ED8]/15 border border-[#1D4ED8]/20 dark:border-[#38BDF8]/25 p-3.5">
                <div className="text-[11px] font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] mb-1">
                  KEY ARCHITECTURAL TAKEAWAY
                </div>
                <p className="text-xs text-slate-800 dark:text-[#F5F8FF] font-medium leading-relaxed">
                  {activeSlide.keyTakeaway}
                </p>
              </div>

              {activeSlide.offensiveVector && (
                <div className="space-y-2.5 text-xs">
                  <div className="rounded-lg bg-red-500/[0.04] dark:bg-red-500/[0.08] border border-red-200 dark:border-red-400/25 p-3">
                    <div className="font-mono font-bold text-[#E11D48] dark:text-[#FB7185] text-[10px] mb-1">
                      RED AI EXPOSURE / ATTACK VECTOR
                    </div>
                    <p className="text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                      {activeSlide.offensiveVector}
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-500/[0.04] dark:bg-blue-500/[0.08] border border-blue-200 dark:border-blue-400/25 p-3">
                    <div className="font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] text-[10px] mb-1">
                      BLUE AI COUNTERMEASURE
                    </div>
                    <p className="text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                      {activeSlide.defensiveCountermeasure}
                    </p>
                  </div>
                  <div className="rounded-lg bg-amber-500/[0.05] dark:bg-amber-500/[0.08] border border-amber-200 dark:border-amber-400/25 p-3">
                    <div className="font-mono font-bold text-amber-700 dark:text-amber-300 text-[10px] mb-1">
                      HUMAN OVERSIGHT GATE
                    </div>
                    <p className="text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                      {activeSlide.humanOversightGate}
                    </p>
                  </div>
                </div>
              )}

              {activeSlide.highlights && activeSlide.highlights.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-[#AAB8CC] mb-2">
                    {activeSlide.chapterNumber ? 'SEQUENCE LEARNING OUTCOMES' : 'BLUEPRINT PILLARS'}
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                    {activeSlide.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-400/15 space-y-2">
              {activeSlide.chapterSlug ? (
                <Link
                  to={`/chapters/${activeSlide.chapterSlug}`}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
                >
                  <span>Open Sequence {String(activeSlide.chapterNumber).padStart(2, '0')} Full Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  to="/chapters"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
                >
                  <span>Explore All Sequence Blueprints</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Thumbnail Filmstrip Switcher with Minimalist Icons */}
        <div className="w-full max-w-[1440px] mx-auto bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 rounded-b-2xl px-3 sm:px-5 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {slides.map((s, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setZoomLevel(1);
                  setUseSecondaryVariant(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#101F34] text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <SequenceMinimalIcon id={s.iconKey} size="xs" />
                <span>{s.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ChapterInfographicAtlasProps {
  compact?: boolean;
}

export const ChapterInfographicAtlas: React.FC<ChapterInfographicAtlasProps> = ({
  compact = false,
}) => {
  const slides = buildAllInfographicSlides();
  const [selectedSlideId, setSelectedSlideId] = useState<string>('master-blueprint');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [useSecondary, setUseSecondary] = useState(false);
  const [showGalleryGrid, setShowGalleryGrid] = useState(true);

  const activeSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];
  const currentImg =
    useSecondary && activeSlide.secondaryImageUrl
      ? activeSlide.secondaryImageUrl
      : activeSlide.imageUrl;

  return (
    <motion.div
      variants={galleryContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      className="space-y-6"
    >
      {/* Staggered Interactive Sequence & Master Blueprint Pill Bar with Minimalist Icons */}
      <motion.div
        variants={galleryContainerVariants}
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1.5"
      >
        {slides.map((slide) => {
          const isSelected = slide.id === selectedSlideId;
          const isMaster = slide.id === 'master-blueprint';
          return (
            <motion.button
              key={slide.id}
              variants={galleryItemVariants}
              type="button"
              onClick={() => {
                setSelectedSlideId(slide.id);
                setUseSecondary(false);
              }}
              className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-white border-transparent shadow-sm'
                  : isMaster
                  ? 'bg-white dark:bg-[#0F1D33] text-[#E11D48] dark:text-[#FB7185] border-[#E11D48]/30 hover:border-[#E11D48]'
                  : 'bg-white dark:bg-[#0F1D33] text-slate-700 dark:text-[#AAB8CC] border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:text-white'
              }`}
            >
              <SequenceMinimalIcon id={slide.iconKey} size="sm" />
              <span>
                {isMaster
                  ? 'Master Blueprint (Seq 01–11)'
                  : `${slide.shortLabel}: ${slide.title
                      .replace(/^Sequence \d+:\s*/, '')
                      .split(' ')
                      .slice(0, 3)
                      .join(' ')}…`}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main Interactive Infographic Showcase Stage */}
      <motion.div
        key={activeSlide.id}
        variants={galleryItemVariants}
        className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/15 p-4 sm:p-6 md:p-7 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left/Center High-Res Infographic Stage */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative group rounded-xl overflow-hidden bg-[#F4F7FC] dark:bg-[#07111F] border border-[#D5E0F0] dark:border-slate-400/15">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block w-full text-left cursor-zoom-in focus:outline-none"
                aria-label={`Enlarge ${activeSlide.title}`}
              >
                <img
                  src={currentImg}
                  alt={activeSlide.title}
                  className="w-full h-auto object-contain max-h-[540px] mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </button>

              {/* Floating Inspect Overlay Badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {activeSlide.secondaryImageUrl && (
                  <button
                    type="button"
                    onClick={() => setUseSecondary((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/85 text-white text-xs font-mono font-semibold backdrop-blur-xs hover:bg-[#1D4ED8] transition-colors cursor-pointer shadow-md"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{useSecondary ? 'Edition 1' : 'Edition 2'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900/85 hover:bg-[#E11D48] text-white text-xs font-mono font-semibold backdrop-blur-xs transition-colors cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full-Screen Zoom &amp; Inspect</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-[#AAB8CC] px-1">
              <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-[#091122] dark:text-[#F5F8FF]">
                <SequenceMinimalIcon id={activeSlide.iconKey} size="xs" />
                <span>{activeSlide.badge}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowGalleryGrid((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{showGalleryGrid ? 'Hide Visual Thumbnail Grid' : 'Show All 13 Visual Thumbnails'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sequence Takeaway & Red/Blue Breakdown */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/20 flex items-center justify-center shrink-0 mt-0.5">
                  <SequenceMinimalIcon id={activeSlide.iconKey} size="md" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8] mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>VISUAL ARCHITECTURE OVERVIEW</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">
                    {activeSlide.subtitle}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/15 p-4">
                <div className="text-[11px] font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-1.5">
                  KEY SEQUENCE TAKEAWAY
                </div>
                <p className="text-xs sm:text-sm text-[#091122] dark:text-[#F5F8FF] font-medium leading-relaxed">
                  {activeSlide.keyTakeaway}
                </p>
              </div>

              {activeSlide.offensiveVector ? (
                <div className="space-y-2.5 text-xs">
                  <div className="rounded-lg bg-red-500/[0.03] dark:bg-red-500/[0.07] border border-red-200/80 dark:border-red-400/20 p-3">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-[#E11D48] dark:text-[#FB7185] text-[11px] mb-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>RED AI THREAT VECTOR</span>
                    </div>
                    <p className="text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                      {activeSlide.offensiveVector}
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-500/[0.03] dark:bg-blue-500/[0.07] border border-blue-200/80 dark:border-blue-400/20 p-3">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8] text-[11px] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>BLUE AI COUNTEROFFENSIVE</span>
                    </div>
                    <p className="text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                      {activeSlide.defensiveCountermeasure}
                    </p>
                  </div>
                </div>
              ) : (
                activeSlide.highlights && (
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                    {activeSlide.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white shadow-xs hover:opacity-95 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Interactive Lightbox ({slides.length} Visuals)</span>
              </button>
              {activeSlide.chapterSlug && !compact && (
                <Link
                  to={`/chapters/${activeSlide.chapterSlug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] hover:bg-slate-200/70 dark:hover:bg-[#162944] border border-[#D5E0F0] dark:border-slate-400/20 text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] transition-colors"
                >
                  <span>Read Sequence {String(activeSlide.chapterNumber).padStart(2, '0')} Deep-Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Staggered Scroll-Triggered Infographic Gallery Grid (Master Blueprint + 12 Sequence Visuals) */}
      {showGalleryGrid && (
        <motion.div
          variants={galleryContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {slides.map((slide) => {
            const isSelected = slide.id === selectedSlideId;
            return (
              <motion.button
                key={slide.id}
                variants={galleryItemVariants}
                whileHover={{ y: -4, scale: 1.015 }}
                type="button"
                onClick={() => {
                  setSelectedSlideId(slide.id);
                  setUseSecondary(false);
                }}
                onDoubleClick={() => {
                  setSelectedSlideId(slide.id);
                  setLightboxOpen(true);
                }}
                className={`group text-left rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#E11D48]/[0.08] to-[#1D4ED8]/[0.10] border-[#1D4ED8] dark:border-[#38BDF8] ring-1 ring-[#1D4ED8]/30 shadow-md'
                    : 'bg-white dark:bg-[#0F1D33] border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8]/60 dark:hover:border-[#38BDF8]/50 shadow-2xs'
                }`}
              >
                <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-[#F4F7FC] dark:bg-[#07111F] border-b border-slate-200/70 dark:border-slate-400/10">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/92 dark:bg-[#091426]/90 border border-slate-200/80 dark:border-slate-700 text-[10px] font-mono font-bold text-[#091122] dark:text-[#F5F8FF] shadow-2xs">
                    <SequenceMinimalIcon id={slide.iconKey} size="xs" />
                    <span>{slide.shortLabel}</span>
                  </span>
                </div>
                <div className="p-2.5">
                  <div className="text-[11px] font-bold font-display text-[#091122] dark:text-[#F5F8FF] group-hover:text-[#1D4ED8] dark:group-hover:text-[#38BDF8] line-clamp-1">
                    {slide.title.replace(/^Sequence \d+:\s*/, '')}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      <InfographicLightboxModal
        isOpen={lightboxOpen}
        initialSlideId={activeSlide.id}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.div>
  );
};

export const ChapterDetailInfographicShowcase: React.FC<{ chapter: ChapterDetail }> = ({
  chapter,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  const activeImage =
    showSecondary && chapter.secondaryInfographicUrl
      ? chapter.secondaryInfographicUrl
      : chapter.infographicUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/20 p-4 sm:p-6 md:p-8 shadow-sm space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/20 flex items-center justify-center shrink-0">
            <SequenceMinimalIcon id={chapter.number} size="lg" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
              OFFICIAL SEQUENCE {String(chapter.number).padStart(2, '0')} VISUAL INFOGRAPHIC
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mt-0.5">
              {chapter.infographicTitle}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {chapter.secondaryInfographicUrl && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0A1426] border border-slate-200 dark:border-slate-400/15">
              <button
                type="button"
                onClick={() => setShowSecondary(false)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  !showSecondary
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white'
                    : 'text-slate-600 dark:text-[#AAB8CC]'
                }`}
              >
                {chapter.number === 7 ? 'Agentic Topology View' : 'Sequence 11 Infographic'}
              </button>
              <button
                type="button"
                onClick={() => setShowSecondary(true)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  showSecondary
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white'
                    : 'text-slate-600 dark:text-[#AAB8CC]'
                }`}
              >
                {chapter.number === 7 ? 'Multi-Agent Swarm View' : 'Full Book Master Blueprint'}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Zoom &amp; Switch Sequence</span>
          </button>
        </div>
      </div>

      {/* High-Resolution Infographic Image Container */}
      <div className="relative group rounded-xl overflow-hidden bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-200 dark:border-slate-400/15">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full cursor-zoom-in focus:outline-none"
          aria-label={`Inspect ${chapter.infographicTitle} in full-screen lightbox`}
        >
          <img
            src={activeImage}
            alt={chapter.infographicTitle}
            className="w-full h-auto object-contain max-h-[640px] mx-auto transition-transform duration-300 group-hover:scale-[1.008]"
          />
        </button>
      </div>

      {/* Key Takeaway Callout Strip */}
      <div className="rounded-xl bg-gradient-to-r from-[#E11D48]/[0.05] via-[#F4F7FC] to-[#1D4ED8]/[0.07] dark:from-[#E11D48]/10 dark:via-[#0A1426] dark:to-[#1D4ED8]/15 border border-[#D5E0F0] dark:border-slate-400/15 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold text-[#1D4ED8] dark:text-[#38BDF8]">
            KEY SEQUENCE TAKEAWAY
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#091122] dark:text-[#F5F8FF] leading-relaxed">
            {chapter.infographicKeyTakeaway}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full Screen (1x–2x Zoom) →</span>
        </button>
      </div>

      <InfographicLightboxModal
        isOpen={lightboxOpen}
        initialSlideId={`ch-${chapter.number}`}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.div>
  );
};
