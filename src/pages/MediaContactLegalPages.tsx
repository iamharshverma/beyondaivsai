import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Download,
  Copy,
  Check,
  Mic,
  Mail,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookConfig';
import { AUTHOR_DATA } from '../data/authorData';
import { usePageSEO } from '../utils/analytics';

const INTERVIEW_TOPICS = [
  'Why the next era of cybersecurity is an AI vs. AI counteroffensive—and why static perimeter defenses fail against machine-speed automation.',
  'AI as Weapon, Target, and Shield: A practical mental model for CISOs, CTOs, and board directors.',
  'Inside the 5-Layer AI Attack Surface: How indirect prompt injection and RAG context poisoning turn documents into executable exploits.',
  'Wrapping probabilistic models in deterministic code: Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers, and Sandboxed Tool Brokers.',
  'Solving the Non-Human Identity (NHI) crisis in autonomous multi-agent enterprise deployments.',
  'High-consequence AI security: Why healthcare, financial markets, and critical infrastructure require deterministic safety interlocks.',
];

export const MediaPage: React.FC = () => {
  const [copiedBio, setCopiedBio] = useState<'short' | 'long' | 'summary' | null>(null);

  usePageSEO({
    title: 'Press & Media Kit — AI vs. AI: Engineering the Cybersecurity Counteroffensive | Harsh Verma',
    description:
      'Download official high-resolution book cover artwork, panoramic jacket wrap, author portrait, approved biographies, and interview topics for Harsh Verma.',
    canonicalPath: '/media',
  });

  const copyText = (type: 'short' | 'long' | 'summary', text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedBio(type);
    setTimeout(() => setCopiedBio(null), 2000);
  };

  return (
    <div className="py-12 md:py-16 space-y-16">
      <section className="max-w-[1280px] mx-auto px-6 space-y-10">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
            OFFICIAL PRESS, MEDIA &amp; SPEAKER KIT
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            Press &amp; Media Resources
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Official high-resolution visual assets, approved biographies, book summaries, and interview/keynote topics for journalists, conference organizers, podcast hosts, and academic institutions.
          </p>
        </div>

        {/* Downloadable Verified Media Assets */}
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mb-4">
            1. Approved High-Resolution Visual Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="bg-slate-100 dark:bg-[#07111F] rounded-xl p-4 flex justify-center h-64">
                <img
                  src={BOOK_METADATA.coverImage}
                  alt="AI vs. AI 3D Hardcover Artwork"
                  referrerPolicy="no-referrer"
                  className="h-full w-auto object-contain rounded"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-[#F5F8FF]">
                  Official 3D Hardcover Cover Artwork
                </div>
                <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">
                  High-Resolution JPG · Approved for editorial, review, and event promotion.
                </div>
                <a
                  href={BOOK_METADATA.coverImage}
                  download="AI_vs_AI_Hardcover_Harsh_Verma.jpg"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Hardcover Art (JPG)</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="bg-slate-100 dark:bg-[#07111F] rounded-xl p-4 flex items-center justify-center h-64">
                <img
                  src={BOOK_METADATA.fullJacketImage}
                  alt="AI vs. AI Full Panoramic Dust Jacket"
                  referrerPolicy="no-referrer"
                  className="max-h-full w-auto object-contain rounded"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-[#F5F8FF]">
                  Full Panoramic Jacket Artwork (Front + Spine + Back)
                </div>
                <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">
                  High-Resolution JPG · Suitable for wide social cards and feature spreads.
                </div>
                <a
                  href={BOOK_METADATA.fullJacketImage}
                  download="AI_vs_AI_Full_Jacket_Harsh_Verma.jpg"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Jacket Art (JPG)</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="bg-slate-100 dark:bg-[#07111F] rounded-xl p-4 flex justify-center h-64">
                <img
                  src={AUTHOR_DATA.portraitUrl}
                  alt="Harsh Verma Official Portrait"
                  referrerPolicy="no-referrer"
                  className="h-full w-auto object-contain rounded"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-[#F5F8FF]">
                  Official Author Portrait — {AUTHOR_DATA.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">
                  High-Resolution JPG · Approved for keynote flyers, articles, and press kits.
                </div>
                <a
                  href={AUTHOR_DATA.portraitUrl}
                  download="Harsh_Verma_Official_Portrait.jpg"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Author Portrait (JPG)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copy-Ready Approved Biographies & Book Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Short Executive Bio (Approved)
              </h2>
              <button
                type="button"
                onClick={() => copyText('short', AUTHOR_DATA.executiveBio)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 text-xs text-[#0284C7] dark:text-[#37D5F5]"
              >
                {copiedBio === 'short' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'short' ? 'Copied' : 'Copy Bio'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              {AUTHOR_DATA.executiveBio}
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Official Book Summary (Approved)
              </h2>
              <button
                type="button"
                onClick={() => copyText('summary', BOOK_METADATA.extendedOverview)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 text-xs text-[#0284C7] dark:text-[#37D5F5]"
              >
                {copiedBio === 'summary' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'summary' ? 'Copied' : 'Copy Summary'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              {BOOK_METADATA.extendedOverview}
            </p>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Long Professional Biography (Approved)
              </h2>
              <button
                type="button"
                onClick={() => copyText('long', AUTHOR_DATA.fullBioParagraphs.join('\n\n'))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 text-xs text-[#0284C7] dark:text-[#37D5F5]"
              >
                {copiedBio === 'long' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'long' ? 'Copied' : 'Copy Full Bio'}</span>
              </button>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              {AUTHOR_DATA.fullBioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Interview & Speaking Topics */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                MEDIA, PODCASTS &amp; CONFERENCE KEYNOTES
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] flex items-center gap-2 mt-1">
                <Mic className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Suggested Interview &amp; Speaking Topics</span>
              </h2>
            </div>
            <Link
              to="/contact?category=Media+and+interviews"
              className="px-5 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white whitespace-nowrap shrink-0"
            >
              Book Media Interview or Keynote →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERVIEW_TOPICS.map((t, i) => (
              <div
                key={t}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-4 text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed shadow-2xs"
              >
                <span className="font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold mr-2">
                  0{i + 1}.
                </span>
                <span className="text-slate-900 dark:text-[#F5F8FF]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ENQUIRY_CATEGORIES = [
  'Book questions',
  'Retailer and purchase issues',
  'Speaking',
  'Media and interviews',
  'Academic adoption',
  'Enterprise workshops',
  'Bulk orders',
  'General enquiries',
] as const;

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<string>('Book questions');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ referenceId: string; message: string } | null>(
    null
  );

  usePageSEO({
    title: 'Contact & Enquiries — AI vs. AI: Engineering the Cybersecurity Counteroffensive',
    description:
      'Contact Harsh Verma and the Beyond AI vs. AI desk for book questions, speaking engagements, media interviews, academic adoption, enterprise workshops, and bulk orders.',
    canonicalPath: '/contact',
  });

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && (ENQUIRY_CATEGORIES as readonly string[]).includes(paramCat)) {
      setCategory(paramCat);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          name,
          email,
          organization,
          role,
          subject,
          message,
          honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Please check your form inputs.');
      } else {
        setSuccessData(data);
      }
    } catch {
      setErrorMsg('Network error connecting to the server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
                DIRECT ENQUIRIES &amp; COLLABORATION
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                Contact &amp; Enquiries
              </h1>
              <p className="mt-3 text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Select your enquiry category to route your message to the appropriate desk for <em>{BOOK_METADATA.fullTitle}</em>.
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-3 shadow-xs">
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                ENQUIRY DESKS
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                {ENQUIRY_CATEGORIES.map((c) => (
                  <li key={c} className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`text-left hover:text-[#0284C7] dark:hover:text-[#37D5F5] transition-colors ${
                        category === c
                          ? 'text-[#0284C7] dark:text-[#37D5F5] font-semibold'
                          : 'text-slate-900 dark:text-[#F5F8FF]'
                      }`}
                    >
                      • {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/15 p-5 space-y-3 text-xs text-slate-600 dark:text-[#AAB8CC]">
              <div className="font-mono text-slate-900 dark:text-[#F5F8FF] font-semibold">
                OFFICIAL AUTHOR CHANNELS
              </div>
              <div className="space-y-2">
                <a
                  href={AUTHOR_DATA.socialProfiles.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                >
                  <span>harshverma.me</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={AUTHOR_DATA.socialProfiles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                >
                  <span>LinkedIn (@harshverma59)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={AUTHOR_DATA.socialProfiles.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                >
                  <span>Substack (aiwithharsh.substack.com)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 shadow-sm">
              {successData ? (
                <div className="rounded-xl bg-sky-50 dark:bg-[#0B1628] border border-sky-200 dark:border-[#37D5F5]/40 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-[#F5F8FF]">
                    <CheckCircle2 className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
                    <span>Enquiry Validated &amp; Stored ({successData.referenceId})</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                    {successData.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessData(null);
                      setMessage('');
                    }}
                    className="mt-2 px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] text-xs font-semibold text-white"
                  >
                    Submit Another Enquiry
                  </button>
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

                  <div>
                    <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                      Enquiry Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                    >
                      {ENQUIRY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@organization.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                        Organization / Institution
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Company, University, or Media Outlet"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="CISO, Professor, Editor, Producer..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={`Enquiry regarding ${category}`}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                      Message (Minimum 15 characters) *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please include relevant dates, quantities, or technical context..."
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
                    <Mail className="w-4 h-4" />
                    <span>{submitting ? 'Validating & Sending...' : 'Send Validated Enquiry'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  usePageSEO({
    title: 'Privacy Policy | Beyond AI vs. AI',
    description: 'Privacy policy, explicit opt-in data governance, and consent-aware analytics disclosure for beyondaivsai.com.',
    canonicalPath: '/privacy',
  });

  return (
    <div className="py-12 md:py-16 max-w-[860px] mx-auto px-6 space-y-6 text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
      <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
        Privacy Policy
      </h1>
      <p>
        <strong className="text-slate-900 dark:text-[#F5F8FF]">Beyond AI vs. AI</strong> (beyondaivsai.com) respects reader privacy and practices data minimization across all book preview, newsletter, and institutional enquiry features.
      </p>
      <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] pt-2">
        1. Explicit Opt-In Lead Capture
      </h2>
      <p>
        Reading the online Chapter 1 excerpt at <code>/excerpt</code> does not automatically subscribe you to any mailing list. We collect your name, email address, and optional professional role only when you explicitly submit a form and check the consent box.
      </p>
      <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] pt-2">
        2. Zero Payment Card Storage
      </h2>
      <p>
        This website never collects, processes, or stores payment card numbers directly. When direct checkout is enabled, transactions are handled exclusively through a PCI-DSS compliant hosted payment provider.
      </p>
      <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] pt-2">
        3. Consent-Aware Analytics
      </h2>
      <p>
        Interaction telemetry (such as chapter preview completion or order button clicks) is recorded only if you grant analytics consent, and our backend strips personal identifiers before logging event counts.
      </p>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  usePageSEO({
    title: 'Terms of Use, Shipping & Refund Policy | Beyond AI vs. AI',
    description: 'Intellectual property notices, manuscript copyright terms, and direct order fulfillment policies for AI vs. AI by Harsh Verma.',
    canonicalPath: '/terms',
  });

  return (
    <div className="py-12 md:py-16 max-w-[860px] mx-auto px-6 space-y-6 text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
      <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
        Terms of Use, Intellectual Property &amp; Ordering Policy
      </h1>
      <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] pt-2">
        1. Copyright &amp; Manuscript Protection
      </h2>
      <p>
        <em>AI vs. AI: Engineering the Cybersecurity Counteroffensive</em>, its 11-chapter manuscript, cover artwork, and architectural diagrams are Copyright © Harsh Verma. All rights reserved. The Chapter 1 preview is provided for personal evaluation only and may not be redistributed or used for automated model training without written permission.
      </p>
      <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] pt-2">
        2. Technical Disclaimer
      </h2>
      <p>
        The security design patterns, architectural diagrams, assessments, and roadmaps presented on this platform and in the book are educational and engineering reference frameworks. They do not constitute legal advice, formal regulatory certification, or a guarantee against all cyber threats.
      </p>
      <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] pt-2">
        3. Retailer &amp; Direct Order Policy
      </h2>
      <p>
        Orders placed through third-party book retailers (such as Amazon or Barnes &amp; Noble) are governed by the respective retailer’s shipping, return, and refund policies. Direct institutional or hosted checkout orders, when active, include full order confirmation receipts and a 30-day damaged-copy replacement or refund guarantee.
      </p>
    </div>
  );
};
