import React, { useState, useEffect } from 'react';
import { Volume2, Square, Maximize2, X, BookOpen, Layers } from 'lucide-react';
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
    <div className="flex flex-col items-center">
      {/* View Switcher Controls */}
      <div className="flex items-center gap-1 p-1 mb-4 rounded-lg bg-slate-100 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/15">
        <button
          type="button"
          onClick={() => setViewMode('hardcover')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
            viewMode === 'hardcover'
              ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white shadow-xs'
              : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>3D Hardcover</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('jacket')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
            viewMode === 'jacket'
              ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white shadow-xs'
              : 'text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Full Panoramic Jacket</span>
        </button>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0"
          title="Inspect high-resolution cover artwork"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Enlarge</span>
        </button>
      </div>

      {/* Main Artwork Stage */}
      <div className="relative group w-full flex justify-center">
        <div
          className="absolute -inset-4 rounded-2xl opacity-20 dark:opacity-35 blur-2xl pointer-events-none transition-opacity group-hover:opacity-40 dark:group-hover:opacity-55"
          style={{
            background:
              'radial-gradient(circle at 35% 40%, rgba(37, 99, 235, 0.38), rgba(220, 38, 38, 0.2), transparent 70%)',
          }}
        />

        {viewMode === 'hardcover' ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className={`relative block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-400/20 bg-white dark:bg-[#101F34] shadow-xl dark:shadow-2xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#0284C7] dark:focus-visible:outline-[#37D5F5] ${
              compact ? 'max-w-[290px]' : 'max-w-[380px]'
            } w-full`}
          >
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
            <div className="px-4 py-2.5 bg-white dark:bg-[#0B1628]/95 border-t border-slate-200 dark:border-slate-400/15 flex items-center justify-between text-xs text-slate-600 dark:text-[#AAB8CC]">
              <span>Official 3D Hardcover Mockup</span>
              <span className="text-[#0284C7] dark:text-[#37D5F5] font-mono font-medium">Click to inspect</span>
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative block w-full max-w-[520px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-400/20 bg-white dark:bg-[#101F34] shadow-xl dark:shadow-2xl transition-transform duration-200 hover:-translate-y-1"
          >
            <img
              src={BOOK_METADATA.fullJacketImage}
              alt="AI vs. AI Full Panoramic Dust Jacket Wrap (Back Cover, Spine, and Front Cover)"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain bg-[#07111F]"
            />
            <div className="px-4 py-2.5 bg-white dark:bg-[#0B1628]/95 border-t border-slate-200 dark:border-slate-400/15 flex items-center justify-between text-xs text-slate-600 dark:text-[#AAB8CC]">
              <span>Full Jacket Wrap (Back + Spine + Front)</span>
              <span className="text-[#0284C7] dark:text-[#37D5F5] font-mono font-medium">Click to enlarge</span>
            </div>
          </button>
        )}
      </div>

      {/* Embedded Cyber-Warfare Audio Teaser & Author Voice Overview */}
      {showAudioTeaser && (
        <div className="w-full max-w-[380px] mt-4 rounded-xl bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/15 p-3.5 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleAudioOverview}
                className="w-9 h-9 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition-colors shrink-0"
                aria-label={isPlayingAudio ? 'Stop Cyber Warfare Audio Teaser' : 'Play Cyber Warfare Audio Teaser'}
              >
                {isPlayingAudio ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-[#F5F8FF]">
                  Cyber-Warfare Teaser &amp; Voice Overview
                </div>
                <div className="text-[11px] text-slate-600 dark:text-[#AAB8CC]">
                  {isPlayingAudio ? 'Playing executive audio synthesis...' : 'Listen to book thesis overview'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] hover:underline whitespace-nowrap shrink-0 font-medium"
            >
              {showTranscript ? 'Hide Text' : 'Transcript'}
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
          className="fixed inset-0 z-50 bg-slate-900/80 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book Cover Artwork Inspector"
        >
          <div className="relative max-w-4xl w-full bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-400/15">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-[#F5F8FF]">
                  {BOOK_METADATA.fullTitle}
                </div>
                <div className="text-xs text-slate-600 dark:text-[#AAB8CC]">
                  Original Cover &amp; Full Jacket Artwork · Author: {BOOK_METADATA.author}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('hardcover')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'hardcover'
                      ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white'
                      : 'bg-slate-100 dark:bg-[#101F34] text-slate-700 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  3D Hardcover
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('jacket')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'jacket'
                      ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white'
                      : 'bg-slate-100 dark:bg-[#101F34] text-slate-700 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Full Jacket Wrap
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
            <div className="p-6 flex justify-center bg-slate-50 dark:bg-[#07111F] max-h-[78vh] overflow-auto">
              <img
                src={
                  viewMode === 'hardcover'
                    ? BOOK_METADATA.coverImage
                    : BOOK_METADATA.fullJacketImage
                }
                alt={BOOK_METADATA.fullTitle}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
