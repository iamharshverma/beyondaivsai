import { useEffect } from 'react';

export type AnalyticsEventName =
  | 'book_page_viewed'
  | 'order_cta_clicked'
  | 'retailer_selected'
  | 'direct_checkout_started'
  | 'purchase_completed'
  | 'sample_chapter_opened'
  | 'sample_chapter_completed'
  | 'newsletter_signup'
  | 'bulk_order_enquiry'
  | 'review_submitted'
  | 'blog_article_clicked';

const CONSENT_STORAGE_KEY = 'beyond_ai_vs_ai_analytics_consent';

export function getAnalyticsConsent(): 'granted' | 'declined' | 'unset' {
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'granted' || val === 'declined') return val;
    return 'unset';
  } catch {
    return 'unset';
  }
}

export function setAnalyticsConsent(status: 'granted' | 'declined') {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // ignore storage errors
  }
}

export async function trackEvent(
  eventName: AnalyticsEventName,
  metadata?: Record<string, string | number | boolean>
) {
  const consent = getAnalyticsConsent();
  if (consent !== 'granted') return;

  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        pathName: window.location.pathname,
        metadata: metadata || {},
        consentGranted: true,
      }),
    });
  } catch {
    // Non-blocking telemetry
  }
}

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'book' | 'article' | 'profile';
  jsonLd?: Record<string, unknown>;
}

export function usePageSEO({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes('AI vs. AI')
      ? title
      : `${title} | AI vs. AI — Harsh Verma`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
          if (nameMatch) el.setAttribute('name', nameMatch[1]);
        } else if (selector.startsWith('meta[property=')) {
          const propMatch = selector.match(/meta\[property="([^"]+)"\]/);
          if (propMatch) el.setAttribute('property', propMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);

    const path = canonicalPath || window.location.pathname;
    const canonicalUrl = `https://beyondaivsai.com${path === '/' ? '/' : path}`;
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    let dynamicJsonLd = document.getElementById('dynamic-page-jsonld');
    if (jsonLd) {
      if (!dynamicJsonLd) {
        dynamicJsonLd = document.createElement('script');
        dynamicJsonLd.id = 'dynamic-page-jsonld';
        dynamicJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(dynamicJsonLd);
      }
      dynamicJsonLd.textContent = JSON.stringify(jsonLd);
    } else if (dynamicJsonLd) {
      dynamicJsonLd.remove();
    }
  }, [title, description, canonicalPath, ogType, jsonLd]);
}
