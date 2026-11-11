import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { triggerBookingConfetti } from '../utils/confetti';

const SUBSCRIBER_ROLES = [
  'AI Engineer',
  'Cybersecurity Professional',
  'Enterprise Leader / CISO',
  'Founder / Executive',
  'Educator / Academic Researcher',
  'Student',
];

interface LeadCaptureModuleProps {
  compact?: boolean;
}

export const LeadCaptureModule: React.FC<LeadCaptureModuleProps> = ({ compact = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('AI Engineer');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
    segmentRole: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid work or academic email address.');
      return;
    }
    if (!consent) {
      setErrorMsg('Explicit opt-in consent is required to receive Chapter 1 and technical updates.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/leads/chapter-one', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, consent, honeypot }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          setErrorMsg(data.error || 'Unable to process request. Please check your details.');
        } else {
          setSuccessData(data);
          triggerBookingConfetti();
          trackEvent('newsletter_signup', { role });
        }
        return;
      }
      throw new Error('Static hosting fallback');
    } catch {
      const referenceId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
      try {
        await fetch('https://formsubmit.co/ajax/harshverma59@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `[Beyond AI vs. AI — Chapter 1 Request ${referenceId}] ${name.trim()} (${role})`,
            _replyto: email.trim(),
            _template: 'table',
            reference_id: referenceId,
            name: name.trim(),
            email: email.trim(),
            role,
          }),
        });
      } catch {
        // Proceed with confirmation
      }
      setSuccessData({
        referenceId,
        segmentRole: role,
        message:
          'Your Chapter 1 preview access and technical architecture update subscription have been recorded. You can also read the full interactive Chapter 1 excerpt immediately online.',
      });
      triggerBookingConfetti();
      trackEvent('newsletter_signup', { role });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 md:p-8 shadow-sm dark:shadow-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className={compact ? 'lg:col-span-12' : 'lg:col-span-6'}>
          <div className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5] mb-2">
            CHAPTER 1 PREVIEW &amp; LAUNCH BRIEFINGS
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] text-balance">
            Get the First Chapter of AI vs. AI
          </h3>
          <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Explore the changing AI threat landscape and discover why the next generation of intelligent systems must be engineered for security.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-[#AAB8CC]">
            <span>Role-tailored technical updates</span>
            <span aria-hidden="true">·</span>
            <span>Explicit opt-in only</span>
            <span aria-hidden="true">·</span>
            <Link
              to="/excerpt"
              className="text-[#0284C7] dark:text-[#37D5F5] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Or read Chapter 1 online now without registering</span>
            </Link>
          </div>
        </div>

        <div className={compact ? 'lg:col-span-12' : 'lg:col-span-6'}>
          {successData ? (
            <div className="rounded-xl bg-slate-50 dark:bg-[#0B1628] border border-sky-300 dark:border-[#37D5F5]/30 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-[#F5F8FF]">
                    Opt-In Recorded ({successData.referenceId})
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                    {successData.message}
                  </p>
                  <div className="mt-2 text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
                    Segment: {successData.segmentRole}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to="/excerpt"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] text-xs font-semibold text-white transition-colors"
                    >
                      <span>Open Interactive Chapter 1 Reader</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/order"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#101F34] border border-slate-300 dark:border-slate-400/20 text-xs font-semibold text-slate-900 dark:text-[#F5F8FF] hover:border-slate-400 transition-colors"
                    >
                      <span>View Ordering Options</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Spam honeypot */}
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] dark:focus:border-[#37D5F5]"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Work or Academic Email *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@enterprise.io"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] dark:focus:border-[#37D5F5]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-role" className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                  Professional Role (Optional — for technical resource segmentation)
                </label>
                <select
                  id="lead-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF] focus:outline-none focus:border-[#0284C7] dark:focus:border-[#37D5F5]"
                >
                  {SUBSCRIBER_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-[#AAB8CC] cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 dark:border-slate-400/30 bg-white dark:bg-[#07111F] text-[#2563EB] dark:text-[#3478F6] focus:ring-[#2563EB]"
                />
                <span>
                  I explicitly consent to receive the Chapter 1 dispatch, new architecture diagrams, and launch notifications from Beyond AI vs. AI. You can unsubscribe at any time.
                </span>
              </label>

              {errorMsg && (
                <div className="text-xs text-red-700 dark:text-[#F05252] bg-red-50 dark:bg-[#F05252]/10 border border-red-200 dark:border-[#F05252]/30 rounded-lg px-3.5 py-2">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] disabled:opacity-50 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                <span>{submitting ? 'Validating...' : 'Get the First Chapter & Updates'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
