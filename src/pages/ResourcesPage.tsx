import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Eye, X, CheckCircle2 } from 'lucide-react';
import { RESOURCES_DATA, TechnicalResource } from '../data/resourcesData';
import { usePageSEO } from '../utils/analytics';

const RESOURCE_TYPES = [
  'All Types',
  'Manifesto',
  'Architecture',
  'Labs',
  'Case studies',
  'Assessments',
  'Roadmaps',
  'Maturity models',
  'Career guidance',
] as const;

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [activeResource, setActiveResource] = useState<TechnicalResource | null>(null);

  usePageSEO({
    title: 'Technical Resource Library — AI vs. AI: Engineering the Cybersecurity Counteroffensive',
    description:
      'Searchable library of AI security resources: AI Security Manifesto, Technical Reference Architecture, Labs, Case Studies, 100-Question Assessment, and 30/60/90-Day Roadmap.',
    canonicalPath: '/resources',
  });

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesType = selectedType === 'All Types' || res.type === selectedType;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      res.title.toLowerCase().includes(q) ||
      res.shortDescription.toLowerCase().includes(q) ||
      res.audience.toLowerCase().includes(q) ||
      res.type.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5] mb-2">
            TECHNICAL RESOURCE &amp; COMPANION LIBRARY
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
            AI Security Frameworks, Assessments &amp; Roadmaps
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
            Explore the interactive companion specifications from <em>AI vs. AI: Engineering the Cybersecurity Counteroffensive</em>. Each resource can be inspected online below and is cross-referenced to its corresponding manuscript chapters.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="rounded-2xl bg-slate-100/80 dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/15 p-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 dark:text-[#AAB8CC] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by resource title, pattern, audience (e.g., CISO, RAG, 30/60/90, Labs)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-slate-900 dark:text-[#F5F8FF] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0284C7] dark:focus:border-[#37D5F5]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {RESOURCE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedType === type
                    ? 'bg-[#2563EB] dark:bg-[#3478F6] text-white'
                    : 'bg-white dark:bg-[#101F34] text-slate-600 dark:text-[#AAB8CC] border border-slate-200 dark:border-transparent hover:text-slate-900 dark:hover:text-[#F5F8FF]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards Grid */}
        {filteredResources.length === 0 ? (
          <div className="rounded-xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-10 text-center space-y-3 shadow-xs">
            <div className="text-base font-bold text-slate-900 dark:text-[#F5F8FF]">
              No resources matched your filter criteria.
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All Types');
              }}
              className="px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl bg-white dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-6 flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#AAB8CC]">
                    <span className="text-[#0284C7] dark:text-[#37D5F5] font-semibold">
                      {res.type}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{res.chapterReference}</span>
                    <span aria-hidden="true">·</span>
                    <span>{res.availability}</span>
                  </div>

                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                    {res.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                    {res.shortDescription}
                  </p>

                  <div className="text-xs text-slate-600 dark:text-[#AAB8CC] pt-1">
                    <span className="text-slate-900 dark:text-[#F5F8FF] font-medium">Format:</span>{' '}
                    {res.format}
                    <span className="mx-2 text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-slate-900 dark:text-[#F5F8FF] font-medium">
                      Audience:
                    </span>{' '}
                    {res.audience}
                  </div>

                  <ul className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                    {res.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#37D5F5] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-400/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveResource(res)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Interactive Specification</span>
                  </button>
                  <Link
                    to={res.interactiveRoute}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                  >
                    <span>Related Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Specification Modal */}
      {activeResource && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeResource.title}
        >
          <div className="max-w-3xl w-full rounded-2xl bg-white dark:bg-[#0B1628] border border-slate-200 dark:border-slate-400/20 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-400/15 bg-slate-50 dark:bg-[#101F34]">
              <div>
                <div className="text-xs font-mono text-[#0284C7] dark:text-[#37D5F5]">
                  {activeResource.type} · {activeResource.chapterReference}
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-[#F5F8FF]">
                  {activeResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveResource(null)}
                className="p-1.5 rounded-lg text-slate-500 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#07111F]"
                aria-label="Close resource preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
              <p className="text-sm text-slate-900 dark:text-[#F5F8FF] leading-relaxed">
                {activeResource.previewContent.overview}
              </p>

              <div className="space-y-3">
                {activeResource.previewContent.keyItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-slate-50 dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/15 p-4"
                  >
                    <div className="text-xs font-mono font-semibold text-[#0284C7] dark:text-[#37D5F5]">
                      {item.label}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-1.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-400/15 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={activeResource.interactiveRoute}
                  onClick={() => setActiveResource(null)}
                  className="text-xs font-semibold text-[#0284C7] dark:text-[#37D5F5] hover:underline"
                >
                  Open Associated Chapter / Architecture View →
                </Link>
                <Link
                  to="/order"
                  onClick={() => setActiveResource(null)}
                  className="px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3478F6] hover:bg-[#1D4ED8] dark:hover:bg-[#2563EB] text-xs font-semibold text-white"
                >
                  Order Full Book Edition
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
