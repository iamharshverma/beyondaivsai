import React, { useState, useEffect } from 'react';
import { Volume2, Square, Maximize2, X, BookOpen, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { BOOK_METADATA } from '../data/bookConfig';

interface BookMockup3DProps {
  showAudioTeaser?: boolean;
  compact?: boolean;
}

export const BookMockup3D: React.FC<BookMockup3DProps> = ({
  showAudioTeaser = true,
  compact = false,
}) => {
  const [viewMode, setViewMode] = useState<'hardcover' | 'jacket'>('hardcover');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudioOverview = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setShowTranscript(true);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(BOOK_METADATA.audioTeaserTranscript);
    utterance.rate = 0.96;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* View Switcher Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1 p-1 mb-4 rounded-xl bg-white/90 dark:bg-[#0B1628] border border-[#D5E0F0] dark:border-slate-400/15 shadow-2xs">
        <button
          type="button"
          onClick={() => setViewMode('hardcover')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            viewMode === 'hardcover'
              ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-xs'
              : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>3D Hardcover</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('jacket')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            viewMode === 'jacket'
              ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white shadow-xs'
              : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Full Jacket</span>
        </button>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-[#AAB8CC] hover:text-[#E11D48] dark:hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          title="Inspect high-resolution cover artwork"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Enlarge</span>
        </button>
      </div>

      {/* Main Artwork Stage with Red vs. Blue Clash Aura */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative group w-full flex justify-center"
      >
        {/* Dual Red (Left) vs. Blue (Right) Ambient Clash Halo */}
        <div
          className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-45 dark:opacity-55 blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-75 animate-pulse-clash"
          style={{
            background:
              'linear-gradient(125deg, rgba(225, 29, 72, 0.42) 0%, rgba(124, 58, 237, 0.25) 50%, rgba(29, 78, 216, 0.45) 100%)',
          }}
        />

        {viewMode === 'hardcover' ? (
          <motion.button
            type="button"
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setLightboxOpen(true)}
            className={`relative block overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-br from-[#E11D48] via-[#6366F1] to-[#1D4ED8] shadow-[0_20px_45px_-12px_rgba(225,29,72,0.28),0_20px_45px_-12px_rgba(29,78,216,0.32)] cursor-pointer animate-float-slow ${
              compact ? 'max-w-[260px] sm:max-w-[290px]' : 'max-w-[290px] sm:max-w-[370px]'
            } w-full`}
          >
            <div className="rounded-[14.5px] overflow-hidden bg-white dark:bg-[#0F1D33]">
              {!imgError ? (
                <img
                  src={BOOK_METADATA.coverImage}
                  alt="AI vs. AI: Engineering the Cybersecurity Counteroffensive 3D Hardcover by Harsh Verma"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="aspect-[3/4] w-full flex flex-col justify-between p-8 bg-slate-100 dark:bg-[#0B1628] text-left">
                  <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">HARSH VERMA</div>
                  <div>
                    <div className="text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">AI vs. AI</div>
                    <div className="text-sm text-slate-600 dark:text-[#AAB8CC] mt-2">
                      Engineering the Cybersecurity Counteroffensive
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">Hardcover Edition</div>
                </div>
              )}
              <div className="px-3.5 py-2.5 bg-white dark:bg-[#0A1426] border-t border-slate-200 dark:border-slate-400/15 flex items-center justify-between text-[11px] sm:text-xs text-slate-600 dark:text-[#AAB8CC]">
                <span className="font-medium text-[#091122] dark:text-[#F5F8FF]">3D Hardcover Edition</span>
                <span className="bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] dark:from-[#FB7185] dark:to-[#38BDF8] bg-clip-text text-transparent font-mono font-bold">
                  Tap to Inspect →
                </span>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -5 }}
            onClick={() => setLightboxOpen(true)}
            className="relative block w-full max-w-[520px] overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-r from-[#E11D48] via-[#6366F1] to-[#1D4ED8] shadow-2xl cursor-pointer"
          >
            <div className="rounded-[14.5px] overflow-hidden bg-white dark:bg-[#0F1D33]">
              <img
                src={BOOK_METADATA.fullJacketImage}
                alt="AI vs. AI Full Panoramic Dust Jacket Wrap (Back Cover, Spine, and Front Cover)"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain bg-[#07111F]"
              />
              <div className="px-4 py-2.5 bg-white dark:bg-[#0A1426] border-t border-slate-200 dark:border-slate-400/15 flex items-center justify-between text-xs text-slate-600 dark:text-[#AAB8CC]">
                <span>Full Jacket Wrap (Back + Spine + Front)</span>
                <span className="text-[#E11D48] dark:text-[#38BDF8] font-mono font-semibold">Enlarge</span>
              </div>
            </div>
          </motion.button>
        )}
      </motion.div>

      {/* Embedded Cyber-Warfare Audio Teaser & Author Voice Overview */}
      {showAudioTeaser && (
        <div className="w-full max-w-[290px] sm:max-w-[370px] mt-4 rounded-xl bg-white/95 dark:bg-[#0A1426] border border-[#D5E0F0] dark:border-slate-400/15 p-3 sm:p-3.5 shadow-sm">
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={toggleAudioOverview}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E11D48] to-[#1D4ED8] hover:opacity-95 text-white flex items-center justify-center transition-all shrink-0 shadow-xs cursor-pointer"
                aria-label={isPlayingAudio ? 'Stop Cyber Warfare Audio Teaser' : 'Play Cyber Warfare Audio Teaser'}
              >
                {isPlayingAudio ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] truncate">
                  Audio Executive Overview
                </div>
                <div className="text-[11px] text-slate-600 dark:text-[#AAB8CC] truncate">
                  {isPlayingAudio ? 'Playing synthesis...' : 'Listen to book thesis'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className="text-xs font-mono text-[#E11D48] dark:text-[#38BDF8] hover:underline whitespace-nowrap shrink-0 font-semibold cursor-pointer"
            >
              {showTranscript ? 'Hide' : 'Transcript'}
            </button>
          </div>
          {showTranscript && (
            <p className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-400/10 text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              “{BOOK_METADATA.audioTeaserTranscript}”
            </p>
          )}
        </div>
      )}

      {/* High-Resolution Cover & Jacket Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/85 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book Cover Artwork Inspector"
        >
          <div className="relative max-w-4xl w-full bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-400/15">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F5F8FF] truncate">
                  {BOOK_METADATA.fullTitle}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-[#AAB8CC]">
                  Official Cover &amp; Jacket · {BOOK_METADATA.author}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewMode('hardcover')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'hardcover'
                      ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white'
                      : 'bg-slate-100 dark:bg-[#101F34] text-slate-700 dark:text-[#AAB8CC]'
                  }`}
                >
                  Hardcover
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('jacket')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'jacket'
                      ? 'bg-gradient-to-r from-[#E11D48] to-[#1D4ED8] text-white'
                      : 'bg-slate-100 dark:bg-[#101F34] text-slate-700 dark:text-[#AAB8CC]'
                  }`}
                >
                  Full Jacket
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#101F34]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex justify-center bg-slate-50 dark:bg-[#07111F] max-h-[75vh] overflow-auto">
              <img
                src={
                  viewMode === 'hardcover'
                    ? BOOK_METADATA.coverImage
                    : BOOK_METADATA.fullJacketImage
                }
                alt={BOOK_METADATA.fullTitle}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
