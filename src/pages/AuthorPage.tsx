import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Award,
  BookOpen,
  Cpu,
  FileText,
  Mic,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { AUTHOR_DATA } from '../data/authorData';
import { BOOK_METADATA } from '../data/bookConfig';
import { usePageSEO } from '../utils/analytics';

export const AuthorPage: React.FC = () => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(
    AUTHOR_DATA.careerTimeline[0].id
  );

  usePageSEO({
    title: 'About the Author — Harsh Verma | AI vs. AI: Engineering the Cybersecurity Counteroffensive',
    description:
      'Harsh Verma is a Principal Software Engineer in AI at Palo Alto Networks, Fellow of the British Computer Society (FBCS), IEEE Senior Member, author of 27+ papers, and holder of 6 patents.',
    canonicalPath: '/author',
    ogType: 'profile',
  });

  const activeMilestone =
    AUTHOR_DATA.careerTimeline.find((m) => m.id === selectedMilestoneId) ||
    AUTHOR_DATA.careerTimeline[0];

  return (
    <div className="py-12 md:py-16 space-y-20">
      {/* 1–3. Author Hero, Portrait & Executive Biography */}
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 shadow-lg">
              <img
                src={AUTHOR_DATA.portraitUrl}
                alt={`${AUTHOR_DATA.name} — ${AUTHOR_DATA.currentTitle} at ${AUTHOR_DATA.currentOrganization}`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="p-5 bg-slate-50 dark:bg-[#0B1628] border-t border-slate-200 dark:border-slate-400/15 space-y-2">
                <div className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {AUTHOR_DATA.name}
                </div>
                <div className="text-xs font-medium text-[#0284C7] dark:text-[#37D5F5]">
                  {AUTHOR_DATA.currentTitle} · {AUTHOR_DATA.currentOrganization}
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                  <span>FBCS</span>
                  <span aria-hidden="true">·</span>
                  <span>IEEE Senior Member</span>
                  <span aria-hidden="true">·</span>
                  <span>Forbes Technology Council</span>
                </div>
              </div>
            </div>

            {/* External Verified Profiles */}
            <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-3 shadow-xs">
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                OFFICIAL VERIFIED PROFILES
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <a
                  href={AUTHOR_DATA.socialProfiles.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0B1628] hover:bg-slate-100 dark:hover:bg-[#07111F] text-slate-900 dark:text-[#F5F8FF] transition-colors border border-slate-200/70 dark:border-transparent"
                >
                  <span>Official Website (harshverma.me)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                </a>
                <a
                  href={AUTHOR_DATA.socialProfiles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0B1628] hover:bg-slate-100 dark:hover:bg-[#07111F] text-slate-900 dark:text-[#F5F8FF] transition-colors border border-slate-200/70 dark:border-transparent"
                >
                  <span>LinkedIn (@harshverma59)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                </a>
                <a
                  href={AUTHOR_DATA.socialProfiles.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0B1628] hover:bg-slate-100 dark:hover:bg-[#07111F] text-slate-900 dark:text-[#F5F8FF] transition-colors border border-slate-200/70 dark:border-transparent"
                >
                  <span>Google Scholar (27+ Papers)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                </a>
                <a
                  href={AUTHOR_DATA.socialProfiles.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0B1628] hover:bg-slate-100 dark:hover:bg-[#07111F] text-slate-900 dark:text-[#F5F8FF] transition-colors border border-slate-200/70 dark:border-transparent"
                >
                  <span>YouTube (@aiwithharshverma)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                </a>
                <a
                  href={AUTHOR_DATA.socialProfiles.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0B1628] hover:bg-slate-100 dark:hover:bg-[#07111F] text-slate-900 dark:text-[#F5F8FF] transition-colors border border-slate-200/70 dark:border-transparent"
                >
                  <span>Substack (aiwithharsh.substack.com)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5]" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
                AUTHOR BIOGRAPHY
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {AUTHOR_DATA.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-[#0284C7] dark:text-[#37D5F5]">
                {AUTHOR_DATA.currentTitle} at {AUTHOR_DATA.currentOrganization}
              </p>
            </div>

            {/* Full Biography */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              {AUTHOR_DATA.fullBioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* AI and Cybersecurity Expertise Focus */}
            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF] mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Core AI Engineering &amp; Cybersecurity Focus</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-900 dark:text-[#F5F8FF]">
                {AUTHOR_DATA.professionalFocusAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-lg bg-slate-50 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/10 px-4 py-2.5 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0284C7] dark:text-[#37D5F5] shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. The Engineer Behind the Counteroffensive & Why AI vs. AI Was Written */}
      <section className="bg-slate-100/80 dark:bg-[#0B1628] py-16 border-y border-slate-200 dark:border-slate-400/15">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 md:p-8 space-y-4 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              {AUTHOR_DATA.engineerBehindBook.subtitle}
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              {AUTHOR_DATA.engineerBehindBook.title}
            </h2>
            {AUTHOR_DATA.engineerBehindBook.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 md:p-8 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                CONNECTING ENTERPRISE REALITY TO THE MANUSCRIPT
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                {AUTHOR_DATA.whyIWroteSection.title}
              </h2>
              {AUTHOR_DATA.whyIWroteSection.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-400/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore {BOOK_METADATA.fullTitle}</span>
              </Link>
              <Link
                to="/order"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white"
              >
                <span>Order the Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Career Journey Timeline */}
      <section className="max-w-[1280px] mx-auto px-6 space-y-8">
        <div>
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
            ENGINEERING ODYSSEY: FROM ISRO TO PALO ALTO NETWORKS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            Career Journey &amp; Systems Engineering Progression
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {AUTHOR_DATA.careerTimeline.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedMilestoneId(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                selectedMilestoneId === item.id
                  ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white border-[#2563EB] dark:border-[#3478F6]'
                  : 'bg-white dark:bg-[#101F34] text-slate-600 dark:text-[#AAB8CC] border-slate-200 dark:border-slate-400/15 hover:text-slate-900 dark:hover:text-[#F5F8FF]'
              }`}
            >
              {item.period} · {item.organization}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] font-semibold">
              {activeMilestone.period}
            </span>
            <span className="text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
              {activeMilestone.domainFocus}
            </span>
          </div>
          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            {activeMilestone.organization} — {activeMilestone.role}
          </h3>
          <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            {activeMilestone.summary}
          </p>
          <ul className="space-y-2 pt-2 text-xs text-slate-900 dark:text-[#F5F8FF]">
            {activeMilestone.highlights.map((h) => (
              <li key={h} className="text-slate-600 dark:text-[#AAB8CC]">
                • {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 & 7. Research Publications & Patents */}
      <section className="max-w-[1280px] mx-auto px-6 pt-8 border-t border-slate-200 dark:border-slate-400/15 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
            27+ PUBLISHED RESEARCH PAPERS
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
            <span>Selected Research &amp; Scholarly Publications</span>
          </h2>
          <div className="space-y-4">
            {AUTHOR_DATA.selectedPublications.map((pub) => (
              <div
                key={pub.title}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs"
              >
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  {pub.venue}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {pub.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                  {pub.summary}
                </p>
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline pt-1"
                >
                  <span>View Publication Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              PATENTS &amp; INNOVATION
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
              6 Patents (2 Granted, 4 Pending)
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              {AUTHOR_DATA.patentsSummary.note}
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
              {AUTHOR_DATA.patentsSummary.focusDomains.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 space-y-4 shadow-xs">
            <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
              SELECTED HONORS &amp; AWARDS
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span>Awards &amp; Recognition</span>
            </h2>
            <div className="space-y-3">
              {AUTHOR_DATA.awardsAndRecognition.map((aw) => (
                <div
                  key={aw.title}
                  className="rounded-lg bg-slate-50 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/10 p-3.5"
                >
                  <div className="text-sm font-bold text-slate-900 dark:text-[#F5F8FF]">
                    {aw.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1">{aw.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8, 10 & 11. Memberships, Advisory & Speaking */}
      <section className="max-w-[1280px] mx-auto px-6 pt-8 border-t border-slate-200 dark:border-slate-400/15 space-y-12">
        <div>
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-1">
            FELLOWSHIPS, COUNCILS &amp; ADVISORY
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] mb-6">
            Professional Memberships &amp; Mentorship
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AUTHOR_DATA.membershipsAndFellowships.map((mem) => (
              <div
                key={mem.title}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs"
              >
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  {mem.organization}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {mem.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                  {mem.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                KEYNOTES, EXECUTIVE BRIEFINGS &amp; JUDGING
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-[#F5F8FF] flex items-center gap-2 mt-1">
                <Mic className="w-5 h-5 text-[#0284C7] dark:text-[#37D5F5]" />
                <span>Speaking &amp; Keynote Topics</span>
              </h2>
            </div>
            <Link
              to="/contact?category=Speaking"
              className="px-5 py-2.5 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white whitespace-nowrap shrink-0"
            >
              Invite Harsh Verma to Speak →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AUTHOR_DATA.speakingTopics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-5 space-y-2 shadow-xs"
              >
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  {topic.audience}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
