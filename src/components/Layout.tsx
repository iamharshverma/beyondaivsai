import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookConfig';
import { AUTHOR_DATA } from '../data/authorData';
import { trackEvent } from '../utils/analytics';
import { BrandLogo, FloatingThemeSwitcher } from './BrandLogo';
import { NavigationTreeModal } from './NavigationTreeModal';

const ESSENTIAL_FOOTER_LINKS = [
  { to: '/book', label: 'The Book' },
  { to: '/order', label: 'Order the Book', highlight: true },
  { to: '/chapters', label: 'Sequence' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/framework', label: 'Security Framework' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/excerpt', label: 'Sample Sequence' },
  { to: '/resources', label: 'Resources' },
  { to: '/author', label: 'About Author' },
  { to: '/contact', label: 'Contact' },
];

const ROUTE_LABELS: Record<string, string> = {
  book: 'The Book & Sequence Details',
  order: 'Order the Book',
  chapters: 'Sequence & Infographics',
  assessment: 'Counteroffensive Readiness Assessment',
  framework: 'Security Framework',
  resources: 'Technical Resources',
  blogs: 'Author Blogs & Articles',
  'page-blog': 'Author Blogs & Articles',
  excerpt: 'Read Sample Sequence',
  reviews: 'Reviews & Credibility',
  author: 'About Harsh Verma',
  educators: 'Educators & Enterprises',
  insights: 'Insights & Knowledge Hub',
  media: 'Press & Media Kit',
  contact: 'Contact & Enquiries',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navTreeOpen, setNavTreeOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNavTreeOpen(false);
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setNavTreeOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFooterNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-transparent dark:bg-[#060D1A] text-[#091122] dark:text-[#F5F8FF] transition-colors duration-200 overflow-x-hidden">
      {/* Premium Glassmorphic Header with Red-vs-Blue Clash Bar, BrandLogo, Core Links & Interactive Navigation Tree Button */}
      <header className="sticky top-0 z-40 bg-white/92 dark:bg-[#060D1A]/92 backdrop-blur-xl border-b border-[#D5E0F0]/90 dark:border-slate-400/15 shadow-[0_6px_28px_-10px_rgba(29,78,216,0.08)] dark:shadow-none">
        {/* 2.5px Animated Red-vs-Blue AI Clash Accent Strip */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-[#E11D48] via-[#7C3AED] to-[#1D4ED8] bg-ai-clash-gradient" />

        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-2.5 sm:gap-5 px-4 sm:px-6 py-2.5 sm:py-3">
          {/* Zone 1: Creative Brand Logo */}
          <Link
            to="/"
            aria-label="Beyond AI vs. AI Home"
            className="whitespace-nowrap shrink-0 focus:outline-none"
          >
            <BrandLogo size="header" />
          </Link>

          {/* Zone 2: Streamlined Executive Navigation Pills */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#F2F6FC]/90 dark:bg-[#0B1628]/90 border border-[#DCE5F4] dark:border-slate-400/15 text-xs font-semibold text-slate-600 dark:text-[#AAB8CC]"
          >
            {[
              { to: '/book', label: 'The Book' },
              { to: '/chapters', label: 'Sequence' },
              { to: '/assessment', label: 'Assessment' },
              { to: '/framework', label: 'Framework' },
              { to: '/resources', label: 'Toolkit' },
              { to: '/blogs', label: 'Blogs' },
              { to: '/author', label: 'Author' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white dark:bg-[#162944] text-[#091122] dark:text-[#F5F8FF] shadow-2xs font-bold'
                      : 'hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Mobile shows ONLY the More Icon; Desktop also shows Order CTA & Theme Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Creative More / Explore Sections Bento-Tree Icon Button (Visible on all viewports) */}
            <button
              type="button"
              onClick={() => setNavTreeOpen(true)}
              aria-label="More — Explore All Sections & Sequence (⌘K)"
              title="More — Explore All Sections & Sequence (⌘K)"
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F4F7FC] dark:bg-[#0F1D33] hover:bg-white dark:hover:bg-[#162944] border border-[#CBD5E1] dark:border-slate-400/20 text-[#091122] dark:text-[#F5F8FF] shadow-2xs transition-all cursor-pointer group"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              >
                <rect
                  x="2.5"
                  y="2.5"
                  width="6"
                  height="6"
                  rx="1.75"
                  className="fill-[#E11D48] dark:fill-[#FB7185]"
                />
                <rect
                  x="11.5"
                  y="2.5"
                  width="6"
                  height="6"
                  rx="1.75"
                  className="stroke-[#1D4ED8] dark:stroke-[#38BDF8]"
                  strokeWidth="1.6"
                />
                <rect
                  x="2.5"
                  y="11.5"
                  width="6"
                  height="6"
                  rx="1.75"
                  className="stroke-[#091122] dark:stroke-[#F5F8FF]"
                  strokeWidth="1.6"
                />
                <circle
                  cx="14.5"
                  cy="14.5"
                  r="3"
                  className="fill-[#1D4ED8] dark:fill-[#38BDF8]"
                />
              </svg>
            </button>

            <Link
              to="/order"
              onClick={() => trackEvent('order_cta_clicked', { source: 'top_nav' })}
              className="hidden lg:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#E11D48] via-[#4F46E5] to-[#1D4ED8] hover:from-[#BE123C] hover:to-[#1E40AF] rounded-xl transition-all whitespace-nowrap shrink-0 shadow-[0_4px_14px_-3px_rgba(225,29,72,0.3),0_4px_14px_-3px_rgba(29,78,216,0.32)]"
            >
              <span>Order the Book</span>
            </Link>

            <div className="hidden lg:block">
              <FloatingThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Contextual Breadcrumb Strip on Subpages with Quick Tree Trigger */}
      {pathSegments.length > 0 && (
        <div className="bg-[#F2F6FC]/90 dark:bg-[#0A1426]/90 backdrop-blur-xs border-b border-[#D5E0F0]/80 dark:border-slate-400/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 text-xs text-slate-600 dark:text-[#AAB8CC]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link
                to="/"
                className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors font-medium text-[#091122] dark:text-[#AAB8CC] shrink-0"
              >
                Beyond AI vs. AI
              </Link>
              {pathSegments.map((seg, idx) => {
                const url = '/' + pathSegments.slice(0, idx + 1).join('/');
                const isLast = idx === pathSegments.length - 1;
                const label =
                  ROUTE_LABELS[seg] ||
                  seg
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ');
                return (
                  <React.Fragment key={url}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                    {isLast ? (
                      <span className="text-[#E11D48] dark:text-[#38BDF8] font-semibold truncate max-w-[200px] sm:max-w-[280px]">
                        {label}
                      </span>
                    ) : (
                      <Link
                        to={url}
                        className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors shrink-0"
                      >
                        {label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Interactive Navigation Tree Modal */}
      <NavigationTreeModal isOpen={navTreeOpen} onClose={() => setNavTreeOpen(false)} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Compact, High-Impact Red-vs-Blue Footer */}
      <footer className="relative bg-white/90 dark:bg-[#081120] border-t border-[#D5E0F0] dark:border-slate-400/15 text-xs text-slate-600 dark:text-[#AAB8CC]">
        {/* Top Red-to-Blue Clash Hairline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#E11D48] via-[#6366F1] to-[#1D4ED8]" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-7 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#D5E0F0] dark:border-slate-400/10">
            {/* Left: Compact Brand & Book Identity */}
            <div className="space-y-2 max-w-md">
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/" onClick={handleFooterNavClick} className="inline-block">
                  <BrandLogo size="footer" />
                </Link>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#E11D48]/10 to-[#1D4ED8]/10 border border-[#E11D48]/25 dark:border-[#38BDF8]/25 text-[10px] font-mono font-semibold text-[#091122] dark:text-[#F5F8FF]">
                  <ShieldAlert className="w-3 h-3 text-[#E11D48]" />
                  <span>RED</span>
                  <span className="text-slate-400">vs.</span>
                  <ShieldCheck className="w-3 h-3 text-[#1D4ED8] dark:text-[#38BDF8]" />
                  <span>BLUE</span>
                </span>
              </div>
              <p className="text-xs text-[#091122] dark:text-[#F5F8FF] font-medium">
                {BOOK_METADATA.fullTitle}{' '}
                <span className="text-slate-500 dark:text-[#AAB8CC] font-normal">
                  · By {BOOK_METADATA.author}
                </span>
              </p>
            </div>

            {/* Center/Right: Essential Navigation Pills & Author Profiles */}
            <div className="flex flex-col sm:items-start lg:items-end gap-3">
              <nav
                aria-label="Footer Essential Navigation"
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium"
              >
                {ESSENTIAL_FOOTER_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleFooterNavClick}
                    className={
                      item.highlight
                        ? 'text-[#E11D48] dark:text-[#FB7185] font-bold hover:underline underline-offset-4 transition-colors'
                        : 'text-[#091122] dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#38BDF8] hover:underline underline-offset-4 transition-colors'
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                {[
                  { label: 'harshverma.me', href: AUTHOR_DATA.socialProfiles.website },
                  { label: 'LinkedIn', href: AUTHOR_DATA.socialProfiles.linkedin },
                  { label: 'Google Scholar', href: AUTHOR_DATA.socialProfiles.googleScholar },
                  { label: 'RSA Conference', href: AUTHOR_DATA.socialProfiles.rsa },
                  { label: 'Forbes Profile', href: AUTHOR_DATA.socialProfiles.forbes },
                ].map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4F7FC] dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 text-slate-700 dark:text-[#AAB8CC] hover:text-[#1D4ED8] dark:hover:text-[#38BDF8] hover:border-[#1D4ED8]/40 transition-colors"
                  >
                    <span>{soc.label}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Compact Legal & Copyright Line */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-[#AAB8CC]">
            <div>
              © {new Date().getFullYear()} {BOOK_METADATA.author} · {BOOK_METADATA.brandName}.{' '}
              <span className="text-[#1D4ED8] dark:text-[#38BDF8] font-medium">
                {BOOK_METADATA.footerTagline}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                onClick={handleFooterNavClick}
                className="hover:text-[#091122] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                onClick={handleFooterNavClick}
                className="hover:text-[#091122] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/media"
                onClick={handleFooterNavClick}
                className="hover:text-[#091122] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
              >
                Media Kit
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
