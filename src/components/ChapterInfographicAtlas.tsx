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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CHAPTERS_DATA,
  MASTER_BLUEPRINT_INFOGRAPHIC,
  ChapterDetail,
} from '../data/chaptersData';

export interface LightboxSlide {
  id: string;
  badge: string;
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

export function buildAllInfographicSlides(): LightboxSlide[] {
  const masterSlide: LightboxSlide = {
    id: MASTER_BLUEPRINT_INFOGRAPHIC.id,
    badge: 'MASTER BLUEPRINT · ALL 11 CHAPTERS',
    title: MASTER_BLUEPRINT_INFOGRAPHIC.title,
    subtitle: MASTER_BLUEPRINT_INFOGRAPHIC.subtitle,
    imageUrl: MASTER_BLUEPRINT_INFOGRAPHIC.imageUrl,
    keyTakeaway: MASTER_BLUEPRINT_INFOGRAPHIC.keyTakeaway,
    highlights: MASTER_BLUEPRINT_INFOGRAPHIC.highlights,
  };

  const chapterSlides: LightboxSlide[] = CHAPTERS_DATA.map((ch) => ({
    id: `ch-${ch.number}`,
    badge: `CHAPTER ${String(ch.number).padStart(2, '0')} · ${ch.partLabel.toUpperCase()}`,
    title: `Chapter ${ch.number}: ${ch.title}`,
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

  return [masterSlide, ...chapterSlides];
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
          <div className="min-w-0 flex-1">
            <div className="text-[10px] sm:text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent truncate">
              {activeSlide.badge}
            </div>
            <div className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] truncate">
              {activeSlide.title}
            </div>
          </div>

          {/* Chapter Quick-Selector Dropdown + Zoom + Prev/Next + Close */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <select
              aria-label="Select Chapter Infographic"
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
                  {s.chapterNumber ? `Ch ${s.chapterNumber}: ${s.title.replace(/^Chapter \d+:\s*/, '')}` : 'Master Blueprint (All 11 Chapters)'}
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
                    {activeSlide.chapterNumber ? 'CHAPTER LEARNING OUTCOMES' : 'BLUEPRINT PILLARS'}
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
                  <span>Open Chapter {activeSlide.chapterNumber} Full Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  to="/chapters"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-all"
                >
                  <span>Explore All 11 Chapter Blueprints</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Thumbnail Filmstrip Switcher */}
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
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#101F34] text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.chapterNumber ? `Ch ${String(s.chapterNumber).padStart(2, '0')}` : 'Master Blueprint'}
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

  const activeSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];
  const currentImg =
    useSecondary && activeSlide.secondaryImageUrl
      ? activeSlide.secondaryImageUrl
      : activeSlide.imageUrl;

  return (
    <div className="space-y-6">
      {/* Interactive Chapter & Master Blueprint Pill Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
        {slides.map((slide) => {
          const isSelected = slide.id === selectedSlideId;
          const isMaster = slide.id === 'master-blueprint';
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                setSelectedSlideId(slide.id);
                setUseSecondary(false);
              }}
              className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-white border-transparent shadow-sm'
                  : isMaster
                  ? 'bg-white dark:bg-[#0F1D33] text-[#E11D48] dark:text-[#FB7185] border-[#E11D48]/30 hover:border-[#E11D48]'
                  : 'bg-white dark:bg-[#0F1D33] text-slate-700 dark:text-[#AAB8CC] border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8] dark:hover:text-white'
              }`}
            >
              {isMaster
                ? '★ Complete Book Blueprint (Ch 1–11)'
                : `Ch ${String(slide.chapterNumber).padStart(2, '0')}: ${slide.title
                    .replace(/^Chapter \d+:\s*/, '')
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')}…`}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Infographic Showcase Card */}
      <motion.div
        key={activeSlide.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
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
              <span className="font-mono font-semibold text-[#091122] dark:text-[#F5F8FF]">
                {activeSlide.badge}
              </span>
              <span>Click image to open interactive zoom &amp; chapter switcher</span>
            </div>
          </div>

          {/* Right Column: Chapter Takeaway & Red/Blue Breakdown */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E11D48] dark:text-[#38BDF8] mb-1">
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

              <div className="rounded-xl bg-[#F4F7FC] dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/15 p-4">
                <div className="text-[11px] font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent mb-1.5">
                  KEY CHAPTER TAKEAWAY
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
                  <span>Read Chapter {activeSlide.chapterNumber} Deep-Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <InfographicLightboxModal
        isOpen={lightboxOpen}
        initialSlideId={activeSlide.id}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
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
    <div className="rounded-2xl bg-white dark:bg-[#0F1D33] border border-[#D5E0F0] dark:border-slate-400/20 p-4 sm:p-6 md:p-8 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono font-bold bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent">
            OFFICIAL CHAPTER {chapter.number} VISUAL INFOGRAPHIC
          </div>
          <h2 className="text-lg sm:text-2xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mt-0.5">
            {chapter.infographicTitle}
          </h2>
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
                {chapter.number === 7 ? 'Agentic Topology View' : 'Chapter 11 Infographic'}
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
                {chapter.number === 7 ? 'Governance Architecture View' : 'Full Book Master Blueprint'}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] text-xs font-semibold text-white shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Zoom &amp; Switch Chapters</span>
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
            KEY CHAPTER TAKEAWAY
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
    </div>
  );
};
