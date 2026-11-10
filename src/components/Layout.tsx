import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ExternalLink, Sun, Moon } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookConfig';
import { AUTHOR_DATA } from '../data/authorData';
import { trackEvent } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo, FloatingThemeSwitcher } from './BrandLogo';

const SECONDARY_PLATFORM_LINKS = [
  { to: '/excerpt', label: 'Chapter 1 Excerpt' },
  { to: '/reviews', label: 'Reviews & Credibility' },
  { to: '/educators', label: 'Educators & Enterprises' },
  { to: '/insights', label: 'Insights Hub' },
  { to: '/media', label: 'Press & Media' },
  { to: '/contact', label: 'Contact' },
];

const ROUTE_LABELS: Record<string, string> = {
  book: 'The Book',
  order: 'Order the Book',
  chapters: '11 Chapters',
  framework: 'Security Framework',
  resources: 'Technical Resources',
  excerpt: 'Read Sample Chapter',
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMobileMenuOpen(false);
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

  const handleFooterNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-transparent dark:bg-[#07111F] text-[#091122] dark:text-[#F5F8FF] transition-colors duration-200">
      {/* Top Header with Creative BrandLogo, Primary Navigation, Floating Theme Switcher, and Order CTA */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#07111F]/90 backdrop-blur-xl border-b border-[#D5E0F0] dark:border-slate-400/15 shadow-[0_4px_24px_-6px_rgba(29,78,216,0.07)] dark:shadow-none">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
          {/* Zone 1: Creative Brand Logo (Beyond + Vertical AI vs. AI) */}
          <Link
            to="/"
            aria-label="Beyond AI vs. AI Home"
            className="whitespace-nowrap shrink-0 focus:outline-none"
          >
            <BrandLogo size="header" />
          </Link>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-[#AAB8CC]"
          >
            <NavLink
              to="/book"
              className={({ isActive }) =>
                `hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#091122] dark:text-[#F5F8FF] font-semibold underline underline-offset-8 decoration-2 decoration-[#1D4ED8] dark:decoration-[#37D5F5]'
                    : ''
                }`
              }
            >
              Book
            </NavLink>
            <NavLink
              to="/chapters"
              className={({ isActive }) =>
                `hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#091122] dark:text-[#F5F8FF] font-semibold underline underline-offset-8 decoration-2 decoration-[#1D4ED8] dark:decoration-[#37D5F5]'
                    : ''
                }`
              }
            >
              Chapters
            </NavLink>
            <NavLink
              to="/framework"
              className={({ isActive }) =>
                `hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#091122] dark:text-[#F5F8FF] font-semibold underline underline-offset-8 decoration-2 decoration-[#1D4ED8] dark:decoration-[#37D5F5]'
                    : ''
                }`
              }
            >
              Framework
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#091122] dark:text-[#F5F8FF] font-semibold underline underline-offset-8 decoration-2 decoration-[#1D4ED8] dark:decoration-[#37D5F5]'
                    : ''
                }`
              }
            >
              Resources
            </NavLink>
            <NavLink
              to="/author"
              className={({ isActive }) =>
                `hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#091122] dark:text-[#F5F8FF] font-semibold underline underline-offset-8 decoration-2 decoration-[#1D4ED8] dark:decoration-[#37D5F5]'
                    : ''
                }`
              }
            >
              Author
            </NavLink>
          </nav>

          {/* Zone 3: Primary Order Action + Floating Theme Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/order"
              onClick={() => trackEvent('order_cta_clicked', { source: 'top_nav' })}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] dark:from-[#3478F6] dark:to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1] rounded-lg transition-all whitespace-nowrap shrink-0 shadow-[0_4px_14px_-2px_rgba(29,78,216,0.38)]"
            >
              Order the Book
            </Link>
            <FloatingThemeSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#101F34]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-[#0B1628] border-t border-[#D5E0F0] dark:border-slate-400/15 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-400/15">
              <span className="text-xs font-mono text-slate-500 dark:text-[#AAB8CC]">
                APPEARANCE MODE
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#101F34] border border-slate-200 dark:border-slate-400/20 text-xs font-medium text-slate-800 dark:text-[#F5F8FF]"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Switch to Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch to Light Mode</span>
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-sm font-medium">
              <Link to="/" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Home
              </Link>
              <Link to="/book" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                The Book
              </Link>
              <Link to="/order" className="py-1.5 text-[#1D4ED8] dark:text-[#37D5F5] font-semibold">
                Order the Book
              </Link>
              <Link to="/chapters" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                11 Chapters
              </Link>
              <Link to="/framework" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Framework
              </Link>
              <Link to="/resources" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Resources
              </Link>
              <Link to="/excerpt" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Sample Chapter
              </Link>
              <Link to="/author" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                About the Author
              </Link>
              <Link to="/reviews" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Reviews
              </Link>
              <Link to="/educators" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Educators &amp; Enterprise
              </Link>
              <Link to="/insights" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Insights Hub
              </Link>
              <Link to="/media" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Press &amp; Media
              </Link>
              <Link to="/contact" className="py-1.5 text-slate-900 dark:text-[#F5F8FF] hover:text-[#1D4ED8] dark:hover:text-[#37D5F5]">
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Secondary Platform Strip & Breadcrumbs */}
      <div className="bg-[#EAF0F8]/80 dark:bg-[#0B1628] backdrop-blur-sm border-b border-[#D5E0F0] dark:border-slate-400/10">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-[#AAB8CC]">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
            <Link
              to="/"
              className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors font-medium text-[#091122] dark:text-[#AAB8CC]"
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
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                  {isLast ? (
                    <span className="text-[#1D4ED8] dark:text-[#F5F8FF] font-semibold truncate max-w-[220px]">
                      {label}
                    </span>
                  ) : (
                    <Link
                      to={url}
                      className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Quick Platform Links */}
          <div className="hidden lg:flex items-center gap-5">
            {SECONDARY_PLATFORM_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[#1D4ED8] dark:text-[#37D5F5] font-semibold' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Comprehensive Footer */}
      <footer className="bg-[#E9F0F9]/90 dark:bg-[#0B1628] border-t border-[#D5E0F0] dark:border-slate-400/15 pt-16 pb-12 text-sm text-slate-600 dark:text-[#AAB8CC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D5E0F0] dark:border-slate-400/10">
            {/* Brand & Book Identity */}
            <div className="lg:col-span-4 space-y-3">
              <Link to="/" onClick={handleFooterNavClick} className="inline-block">
                <BrandLogo size="footer" />
              </Link>
              <div className="text-sm font-semibold text-[#091122] dark:text-[#F5F8FF] pt-1">
                {BOOK_METADATA.fullTitle}
              </div>
              <div className="text-xs text-slate-600 dark:text-[#AAB8CC]">
                By {BOOK_METADATA.author} · {BOOK_METADATA.authorRole}
              </div>
              <p className="text-xs text-[#1D4ED8] dark:text-[#37D5F5] font-semibold pt-2">
                {BOOK_METADATA.footerTagline}
              </p>
            </div>

            {/* Platform Navigation */}
            <div className="lg:col-span-2 space-y-2.5">
              <div className="text-xs font-mono font-semibold text-[#091122] dark:text-[#F5F8FF] mb-3">
                Book &amp; Platform
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/book"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    The Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#37D5F5] text-[#091122] dark:text-[#F5F8FF] font-semibold hover:underline underline-offset-4 transition-colors"
                  >
                    Order the Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order#bulk-enquiry"
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Institutional &amp; Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/excerpt"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Read Sample Chapter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/framework"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Technical Framework
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Book Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Chapters & Audience */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="text-xs font-mono font-semibold text-[#091122] dark:text-[#F5F8FF] mb-3">
                Chapters &amp; Audience
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/chapters"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    All 11 Chapters Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chapters/the-new-cyber-arms-race"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Ch 1: The New Cyber Arms Race
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chapters/mapping-the-ai-attack-surface"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Ch 3: Mapping the AI Attack Surface
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chapters/ai-native-security-design-patterns"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Ch 4: AI Native Security Patterns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chapters/the-ai-counter-offensive-playbook"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Ch 11: The Counter Offensive Playbook
                  </Link>
                </li>
                <li>
                  <Link
                    to="/educators"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    For Educators &amp; Enterprises
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Insights &amp; Knowledge Hub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Author & Official Channels */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="text-xs font-mono font-semibold text-[#091122] dark:text-[#F5F8FF] mb-3">
                Author &amp; Enquiries
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/author"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    About Harsh Verma
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reviews"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Reviews &amp; Credibility
                  </Link>
                </li>
                <li>
                  <Link
                    to="/media"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Press &amp; Media Kit
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={handleFooterNavClick}
                    className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
                  >
                    Contact &amp; Speaking
                  </Link>
                </li>
                <li className="pt-2">
                  <a
                    href={AUTHOR_DATA.socialProfiles.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#1D4ED8] dark:hover:text-[#37D5F5] hover:underline underline-offset-4 transition-colors"
                  >
                    <span>Official Author Website (harshverma.me)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={AUTHOR_DATA.socialProfiles.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#1D4ED8] dark:hover:text-[#37D5F5] hover:underline underline-offset-4 transition-colors"
                  >
                    <span>LinkedIn (@harshverma59)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={AUTHOR_DATA.socialProfiles.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#1D4ED8] dark:hover:text-[#37D5F5] hover:underline underline-offset-4 transition-colors"
                  >
                    <span>Google Scholar Publications</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={AUTHOR_DATA.socialProfiles.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#1D4ED8] dark:hover:text-[#37D5F5] hover:underline underline-offset-4 transition-colors"
                  >
                    <span>YouTube (@aiwithharshverma)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={AUTHOR_DATA.socialProfiles.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#1D4ED8] dark:hover:text-[#37D5F5] hover:underline underline-offset-4 transition-colors"
                  >
                    <span>Substack (aiwithharsh.substack.com)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600 dark:text-[#AAB8CC]">
            <div>
              © {new Date().getFullYear()} {BOOK_METADATA.author} · {BOOK_METADATA.brandName}. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/privacy"
                onClick={handleFooterNavClick}
                className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                onClick={handleFooterNavClick}
                className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                to="/contact"
                onClick={handleFooterNavClick}
                className="hover:text-[#1D4ED8] dark:hover:text-[#F5F8FF] hover:underline underline-offset-4 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
