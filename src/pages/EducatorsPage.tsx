import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  CheckCircle2,
  BookOpen,
  Users,
  ArrowRight,
} from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { BOOK_METADATA } from '../data/bookConfig';
import { usePageSEO, trackEvent } from '../utils/analytics';
import { triggerBookingConfetti } from '../utils/confetti';

const CLASSROOM_MODULES = [
  {
    weeks: 'Weeks 1–3 (Foundations & Threat Landscape)',
    chapters: 'Chapters 1, 2 & 3',
    focus:
      'Machine-speed cyber arms race, AI-augmented offensive playbooks, and end-to-end threat modeling across the 5-layer AI Attack Surface.',
    deliverable: 'Student / Team Threat Model of a Production RAG + Tool-Using Agent Architecture.',
  },
  {
    weeks: 'Weeks 4–6 (Defensive Engineering & Resilience)',
    chapters: 'Chapters 4, 5 & 6',
    focus:
      'Implementing Retrieval Gatekeepers, Shadow Evaluators, Circuit Breakers, Sandboxed Tool Brokers, automated red-teaming, and episodic state rollback.',
    deliverable: 'Hands-on Lab: Building a Schema-Validated Tool Broker & Canary Honeytoken Trigger.',
  },
  {
    weeks: 'Weeks 7–9 (Enterprise Scale & High-Consequence Sectors)',
    chapters: 'Chapters 7, 8 & 9',
    focus:
      'Enterprise AI Gateways, On-Behalf-Of (OBO) identity delegation, healthcare/financial/critical infrastructure safety interlocks, and Day-One startup security.',
    deliverable: 'Architecture Design Review & 100-Question Security Assessment Audit.',
  },
  {
    weeks: 'Weeks 10–12 (Careers, Governance & Counteroffensive Execution)',
    chapters: 'Chapters 10 & 11',
    focus:
      'AI cybersecurity competency matrix, AI incident containment tabletop exercises, and the 30/60/90-day counteroffensive implementation roadmap.',
    deliverable: 'Capstone 30/60/90-Day Enterprise Counteroffensive Transformation Plan.',
  },
];

export const EducatorsPage: React.FC = () => {
  const [organization, setOrganization] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(30);
  const [intendedUse, setIntendedUse] = useState('University Graduate / Undergraduate Course');
  const [country, setCountry] = useState('United States');
  const [requiredFormat, setRequiredFormat] = useState('Hardcover');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(
    null
  );

  usePageSEO({
    title: 'For Educators, Universities & Enterprises | AI vs. AI — Harsh Verma',
    description:
      'Curriculum mapping, learning outcomes, enterprise security team reading guides, workshop enquiries, and institutional bulk ordering for AI vs. AI.',
    canonicalPath: '/educators',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization,
          contactName,
          email,
          quantity,
          intendedUse,
          country,
          requiredFormat,
          message,
          honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Please check your institutional enquiry details.');
      } else {
        setSuccessData(data);
        triggerBookingConfetti();
        trackEvent('bulk_order_enquiry', { source: 'educators_page', quantity });
      }
    } catch {
      setErrorMsg('Network error submitting enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16 space-y-20">
      {/* Header */}
      <section className="max-w-[1280px] mx-auto px-6 space-y-6">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
            ACADEMIC CURRICULUM &amp; ENTERPRISE ENABLEMENT
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] text-balance">
            For Universities, Educators &amp; Enterprise Security Teams
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            <em>{BOOK_METADATA.fullTitle}</em> is structured to serve both as a graduate/advanced undergraduate textbook for computer science and cybersecurity programs and as an architectural field manual for enterprise CISO and AI engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-2 shadow-xs">
            <GraduationCap className="w-6 h-6 text-[#0284C7] dark:text-[#37D5F5]" />
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Universities &amp; Professors
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Ready-to-teach 12-week semester mapping across all 11 chapters with clear learning outcomes, discussion questions, and hands-on lab specifications.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-2 shadow-xs">
            <Building2 className="w-6 h-6 text-[#2563EB] dark:text-[#3478F6]" />
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Enterprise Security &amp; AI Teams
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Structured architecture reading groups for AppSec, Cloud Security, SOC analysts, and ML platform engineers building production RAG and agentic workflows.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-2 shadow-xs">
            <Users className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Executive Workshops &amp; Seminars
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Invite author Harsh Verma for university guest lectures, CISO roundtables, or architectural threat-modeling workshops tailored to your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Suggested 12-Week Classroom & Group Reading Structure */}
      <section className="bg-slate-100/80 dark:bg-[#0B1628] py-16 border-y border-slate-200 dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
              SUGGESTED SYLLABUS &amp; STUDY CADENCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              12-Week University Course &amp; Enterprise Guild Curriculum Map
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#AAB8CC]">
              Designed for a 12-week academic semester or a 4-sprint enterprise security architecture reading cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLASSROOM_MODULES.map((mod) => (
              <div
                key={mod.weeks}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                    {mod.weeks}
                  </span>
                  <span className="text-slate-600 dark:text-[#AAB8CC]">{mod.chapters}</span>
                </div>
                <p className="text-sm text-slate-900 dark:text-[#F5F8FF] leading-relaxed">
                  {mod.focus}
                </p>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10 text-xs text-slate-600 dark:text-[#AAB8CC]">
                  <strong className="text-[#0284C7] dark:text-[#37D5F5] font-mono">
                    Applied Deliverable:{' '}
                  </strong>
                  {mod.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter-by-Chapter Learning Outcomes Matrix */}
      <section className="max-w-[1280px] mx-auto px-6 space-y-8">
        <div>
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
            SYLLABUS OUTCOMES BY CHAPTER
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            11-Chapter Learning Outcomes &amp; Technical Concepts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHAPTERS_DATA.map((ch) => (
            <div
              key={ch.slug}
              className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div>
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  Chapter {String(ch.number).padStart(2, '0')}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                  {ch.title}
                </h3>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-[#AAB8CC]">
                  {ch.learningOutcomes.map((lo) => (
                    <li key={lo} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5] shrink-0 mt-0.5" />
                      <span>{lo}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/chapters/${ch.slug}`}
                className="text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline inline-flex items-center gap-1 pt-2 border-t border-slate-200 dark:border-slate-400/10"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Chapter Details</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional & Bulk Adoption Enquiry Form */}
      <section className="max-w-[960px] mx-auto px-6">
        <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 p-6 md:p-10 space-y-6 shadow-sm">
          <div>
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              INSTITUTIONAL ADOPTION, WORKSHOPS &amp; BULK ENQUIRIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
              Request Curriculum Review Copies, Team Bundles, or Workshops
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#AAB8CC]">
              Submit your institutional details below for desk copy consideration, bulk pricing for university courses or corporate security teams, or executive workshop scheduling.
            </p>
          </div>

          {successData ? (
            <div className="rounded-xl bg-sky-50 dark:bg-[#0B1628] border border-sky-200 dark:border-[#37D5F5]/40 p-6 space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-[#F5F8FF]">
                <CheckCircle2 className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Institutional Enquiry Recorded ({successData.referenceId})</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                {successData.message}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    University / Enterprise Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="UC Berkeley / Global Financial Security Team"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Faculty / Executive Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Prof. / Director Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Estimated Cohort Size (Min 5) *
                  </label>
                  <input
                    type="number"
                    min={5}
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF] font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Program / Intended Use *
                  </label>
                  <select
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  >
                    <option value="University Graduate / Undergraduate Course">
                      University Graduate / Undergraduate Course
                    </option>
                    <option value="Enterprise Security / AI Engineering Reading Group">
                      Enterprise Security / AI Engineering Reading Group
                    </option>
                    <option value="Executive CISO Workshop & Briefing">
                      Executive CISO Workshop &amp; Briefing
                    </option>
                    <option value="Academic Library / Department Acquisition">
                      Academic Library / Department Acquisition
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Preferred Edition Format
                  </label>
                  <select
                    value={requiredFormat}
                    onChange={(e) => setRequiredFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  >
                    <option value="Hardcover">Hardcover</option>
                    <option value="Digital / eBook">Digital / eBook</option>
                    <option value="Hybrid Cohort Package">Hybrid Cohort Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                  Course Title, Workshop Topic, or Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your course syllabus, security team objectives, or desired workshop dates..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-[#DC2626] dark:text-[#F05252] bg-red-50 dark:bg-[#F05252]/10 border border-red-200 dark:border-[#F05252]/30 rounded-lg px-3.5 py-2">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Institutional Enquiry'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
