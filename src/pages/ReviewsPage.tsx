import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquarePlus, CheckCircle2, ArrowRight, FileCheck } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookConfig';
import { AUTHOR_DATA } from '../data/authorData';
import { usePageSEO, trackEvent } from '../utils/analytics';

export const ReviewsPage: React.FC = () => {
  const [submissionType, setSubmissionType] = useState('reader_review');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [editionRead, setEditionRead] = useState('Chapter 1 Public Excerpt');
  const [content, setContent] = useState('');
  const [permissionToPublish, setPermissionToPublish] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  usePageSEO({
    title: 'Reviews, Manuscript Feedback & Credibility | AI vs. AI',
    description:
      'Editorial review standards, manuscript feedback disclosures, peer-reviewed research foundation, and reader review submission portal for AI vs. AI by Harsh Verma.',
    canonicalPath: '/reviews',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType,
          name,
          role,
          organization,
          email,
          editionRead,
          content,
          permissionToPublish,
          honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Please check your submission fields.');
      } else {
        setSubmittedRecord(data);
        trackEvent('review_submitted', { submissionType });
      }
    } catch {
      setErrorMsg('Network error while submitting feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16 space-y-16">
      <section className="max-w-[1280px] mx-auto px-6 space-y-8">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
            CREDIBILITY, PEER RIGOR &amp; VERIFIED FEEDBACK
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            Reviews, Manuscript Feedback &amp; Technical Credibility
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            <em>{BOOK_METADATA.fullTitle}</em> is built on a commitment to technical accuracy and transparent attribution. Below is our editorial policy separating early technical manuscript feedback from post-release reader reviews, alongside our verified submission pathway.
          </p>
        </div>

        {/* Editorial Transparency & Attribution Charter */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
            <ShieldCheck className="w-4 h-4" />
            <span>EDITORIAL ATTRIBUTION &amp; VERIFICATION POLICY</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            Distinguishing Early Manuscript Feedback from Published Edition Reviews
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            During development, the manuscript for <em>AI vs. AI: Engineering the Cybersecurity Counteroffensive</em> underwent technical feedback and architectural evaluation. In strict accordance with academic and publishing integrity:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
            <li className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-4 shadow-xs">
              <strong className="text-slate-900 dark:text-[#F5F8FF] block mb-1">
                1. No Unapproved Endorsements
              </strong>
              Early manuscript feedback is never misrepresented as an official endorsement of the final published edition, nor are reviewer names or institutional affiliations displayed without explicit written consent.
            </li>
            <li className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-4 shadow-xs">
              <strong className="text-slate-900 dark:text-[#F5F8FF] block mb-1">
                2. Zero Fabricated Ratings
              </strong>
              We never display synthetic star ratings, unverified customer counts, or simulated retailer reviews. Verified post-release reviews appear with clear edition provenance.
            </li>
            <li className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-4 shadow-xs">
              <strong className="text-slate-900 dark:text-[#F5F8FF] block mb-1">
                3. Open Errata &amp; Technical Dialogue
              </strong>
              We welcome constructive critique, architectural discussion, errata corrections, and positive testimonials equally through the verified reader portal below.
            </li>
          </ul>
        </div>

        {/* Structured Credibility Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              01. EXPERT &amp; MANUSCRIPT FEEDBACK
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Technical Architecture Evaluation
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Early technical readers evaluated the manuscript’s 5-layer AI Attack Surface taxonomy and 4 AI-Native Security Design Patterns (Circuit Breaker, Shadow Evaluator, Retrieval Gatekeeper, and Sandboxed Tool Broker). Approved signed quotations are added here upon formal release sign-off.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              02. ACADEMIC &amp; PEER FOUNDATION
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Published Research Lineage
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              The book’s agentic security concepts build on Harsh Verma’s peer-reviewed publications, including <em>Trusted AI in the Age of Autonomous Agents</em> (Proceedings of the Raptors Conference, 2026, DOI: 10.68495/rc.2026.C025) and 27+ papers across IEEE and Springer.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              03. EDITORIAL REVIEW CREDENTIALS
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Accredited Technical Book Reviewer
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              In addition to authoring <em>AI vs. AI</em>, {AUTHOR_DATA.name} has served as an official technical reviewer for commercial AI/ML engineering volumes (including Packt Publishing titles on TensorFlow and deep learning systems).
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              04. VERIFIED READER REVIEWS
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Post-Publication Reader Archive
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Verified reader reviews of the October 2026 Hardcover and Digital editions, along with Chapter 1 preview evaluations, are archived here once attribution consent is confirmed.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              05. MEDIA &amp; INTERVIEW APPEARANCES
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Keynotes, Podcasts &amp; Industry Press
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Explore speaking topics, executive interviews, and official press materials on our dedicated{' '}
              <Link to="/media" className="text-[#0284C7] dark:text-[#37D5F5] hover:underline">
                Press &amp; Media page
              </Link>
              .
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              06. UNIVERSITY &amp; ENTERPRISE ADOPTION
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              Educator &amp; CISO Cohort Feedback
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Professors and enterprise security leaders evaluating the syllabus can request review materials via our{' '}
              <Link to="/educators" className="text-[#0284C7] dark:text-[#37D5F5] hover:underline">
                Educators &amp; Enterprises portal
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Reader Feedback, Testimonial, Errata & Resource Request Submission Form */}
      <section className="max-w-[960px] mx-auto px-6">
        <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 p-6 md:p-10 space-y-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                READER FEEDBACK &amp; REVIEW PATHWAY
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mt-1">
                Submit a Review, Testimonial, Errata Note, or Resource Request
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#AAB8CC]">
                Whether you have read the Chapter 1 excerpt, reviewed a manuscript copy, or want to suggest a technical correction or companion resource, submit your feedback below.
              </p>
            </div>
            <MessageSquarePlus className="w-6 h-6 text-[#0284C7] dark:text-[#37D5F5] shrink-0" />
          </div>

          {submittedRecord ? (
            <div className="rounded-xl bg-sky-50 dark:bg-[#0B1628] border border-sky-200 dark:border-[#37D5F5]/40 p-6 space-y-3">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-[#F5F8FF]">
                <CheckCircle2 className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Submission Logged ({submittedRecord.referenceId})</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                {submittedRecord.message}
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
                    Submission Type *
                  </label>
                  <select
                    value={submissionType}
                    onChange={(e) => setSubmissionType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  >
                    <option value="reader_review">Reader Review / Testimonial</option>
                    <option value="academic_feedback">Academic / Curriculum Feedback</option>
                    <option value="errata_correction">Technical Correction / Errata Suggestion</option>
                    <option value="resource_request">Request Additional Companion Resource</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Edition or Section Read *
                  </label>
                  <select
                    value={editionRead}
                    onChange={(e) => setEditionRead(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  >
                    <option value="Chapter 1 Public Excerpt">Chapter 1 Public Excerpt</option>
                    <option value="Interactive Framework & Blueprints">
                      Interactive Framework &amp; Blueprints
                    </option>
                    <option value="Advance Review / Manuscript Copy">
                      Advance Review / Manuscript Copy (Specify Below)
                    </option>
                    <option value="Hardcover / Digital Edition">
                      Hardcover / Digital Edition
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Email Address (For Verification Only) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Professional Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Principal Security Architect"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                    Organization / University
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-900 dark:text-[#F5F8FF] mb-1.5">
                  Your Review, Feedback, Correction, or Resource Request *
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your honest assessment, specific technical feedback, or resource suggestion..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF]"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-[#AAB8CC] cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissionToPublish}
                  onChange={(e) => setPermissionToPublish(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 dark:border-slate-400/30 bg-white dark:bg-[#07111F] text-[#2563EB] dark:text-[#3478F6]"
                />
                <span>
                  Optional: I grant permission for my quotation, name, and role to be considered for publication on beyondaivsai.com after editorial verification. (Unchecked submissions remain private to the author and editorial team.)
                </span>
              </label>

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
                <FileCheck className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit to Editorial Queue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
