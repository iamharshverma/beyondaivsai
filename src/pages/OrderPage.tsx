import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Info,
  ArrowRight,
  Mail,
} from 'lucide-react';
import {
  BOOK_METADATA,
  BOOK_FORMATS,
  RETAILER_CHANNELS,
  LAUNCH_CAMPAIGN_CONFIG,
} from '../data/bookConfig';
import { usePageSEO, trackEvent } from '../utils/analytics';

const triggerOrderConfetti = () => {
  try {
    const colors = ['#1D4ED8', '#0284C7', '#37D5F5', '#28D17C', '#F5A524'];
    // Primary center burst
    confetti({
      particleCount: 85,
      spread: 72,
      origin: { y: 0.62 },
      colors,
    });
    // Left & right celebratory side cannons
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.12, y: 0.68 },
        colors,
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 0.88, y: 0.68 },
        colors,
      });
    }, 180);
  } catch {
    // Fallback safely if canvas is unavailable
  }
};

export const OrderPage: React.FC = () => {
  const [selectedFormatId, setSelectedFormatId] = useState<'hardcover' | 'ebook' | 'institutional'>(
    'hardcover'
  );
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerOrg, setCustomerOrg] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingNotes, setShippingNotes] = useState('');
  const [directHoneypot, setDirectHoneypot] = useState('');
  const [directSubmitting, setDirectSubmitting] = useState(false);
  const [directError, setDirectError] = useState<string | null>(null);
  const [directResult, setDirectResult] = useState<{
    status: string;
    referenceId: string;
    notificationRecipient?: string;
    message: string;
    checkoutUrl?: string;
  } | null>(null);

  const [commerceStatus, setCommerceStatus] = useState<{
    directCheckoutEnabled: boolean;
    directCheckoutUrl: string | null;
    authorNotificationEmail: string;
  }>({
    directCheckoutEnabled: false,
    directCheckoutUrl: null,
    authorNotificationEmail: 'harshverma59@gmail.com',
  });

  // Bulk Order State
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkQty, setBulkQty] = useState(25);
  const [intendedUse, setIntendedUse] = useState('Enterprise Security / Engineering Team');
  const [bulkCountry, setBulkCountry] = useState('United States');
  const [requiredFormat, setRequiredFormat] = useState('Hardcover');
  const [bulkMessage, setBulkMessage] = useState('');
  const [bulkHoneypot, setBulkHoneypot] = useState('');
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const [bulkSuccess, setBulkSuccess] = useState<{
    referenceId: string;
    notificationRecipient?: string;
    message: string;
  } | null>(null);

  usePageSEO({
    title: 'Order AI vs. AI: Engineering the Cybersecurity Counteroffensive | Harsh Verma',
    description:
      'Order AI vs. AI by Harsh Verma. View edition formats, retailer availability, direct allocation registration, and institutional/university bulk order options.',
    canonicalPath: '/order',
  });

  useEffect(() => {
    fetch('/api/commerce/status')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data.directCheckoutEnabled === 'boolean') {
          setCommerceStatus({
            directCheckoutEnabled: data.directCheckoutEnabled,
            directCheckoutUrl: data.directCheckoutUrl || null,
            authorNotificationEmail: data.authorNotificationEmail || 'harshverma59@gmail.com',
          });
        }
      })
      .catch(() => {
        // default safe state
      });
  }, []);

  const selectedFormat =
    BOOK_FORMATS.find((f) => f.id === selectedFormatId) || BOOK_FORMATS[0];

  const handleDirectOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDirectError(null);
    setDirectSubmitting(true);
    trackEvent('direct_checkout_started', { format: selectedFormatId, quantity });

    try {
      const res = await fetch('/api/orders/direct-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formatId: selectedFormatId,
          quantity,
          customerName,
          customerEmail,
          organization: customerOrg,
          country,
          shippingNotes,
          honeypot: directHoneypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDirectError(data.error || 'Please check your order details.');
      } else {
        setDirectResult(data);
        triggerOrderConfetti();
        if (data.status === 'redirect_to_checkout' && data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }
      }
    } catch {
      setDirectError('Unable to reach the order server. Please try again.');
    } finally {
      setDirectSubmitting(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBulkError(null);
    setBulkSubmitting(true);

    try {
      const res = await fetch('/api/orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization: orgName,
          contactName,
          email: bulkEmail,
          quantity: bulkQty,
          intendedUse,
          country: bulkCountry,
          requiredFormat,
          message: bulkMessage,
          honeypot: bulkHoneypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBulkError(data.error || 'Please check your bulk order fields.');
      } else {
        setBulkSuccess(data);
        triggerOrderConfetti();
        trackEvent('bulk_order_enquiry', { quantity: bulkQty, intendedUse });
      }
    } catch {
      setBulkError('Network error submitting bulk enquiry.');
    } finally {
      setBulkSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16 space-y-20">
      {/* MAIN PURCHASE PANEL (Contiguous Purchase Module) */}
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Book Cover & Edition Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 space-y-6 shadow-md dark:shadow-none">
            <div className="flex justify-center bg-[#EDF2F9] dark:bg-[#07111F] rounded-xl p-6 border border-[#D5E0F0] dark:border-slate-400/10">
              <img
                src={BOOK_METADATA.coverImage}
                alt={BOOK_METADATA.fullTitle}
                referrerPolicy="no-referrer"
                className="max-h-[340px] w-auto object-contain rounded-lg shadow-xl"
              />
            </div>

            <div>
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                {BOOK_METADATA.releaseWindow}
              </div>
              <h1 className="text-2xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mt-1">
                {BOOK_METADATA.fullTitle}
              </h1>
              <div className="text-sm text-slate-600 dark:text-[#AAB8CC] mt-1">
                By {BOOK_METADATA.author}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-400/10 space-y-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
              <div>
                <strong className="text-[#091122] dark:text-[#F5F8FF]">Selected Format:</strong>{' '}
                {selectedFormat.name}
              </div>
              <div>
                <strong className="text-[#091122] dark:text-[#F5F8FF]">Status:</strong>{' '}
                {selectedFormat.status}
              </div>
              <div>
                <strong className="text-[#091122] dark:text-[#F5F8FF]">ISBN / Cataloging:</strong>{' '}
                {selectedFormat.isbn}
              </div>
              <div>
                <strong className="text-[#091122] dark:text-[#F5F8FF]">
                  Order Dispatch Desk:
                </strong>{' '}
                {commerceStatus.authorNotificationEmail}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-400/10 flex items-center justify-between text-xs">
              <Link
                to="/excerpt"
                className="text-[#1D4ED8] dark:text-[#37D5F5] hover:underline font-semibold"
              >
                Read Chapter 1 Preview First →
              </Link>
              <Link
                to="/terms"
                className="text-slate-600 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-[#F5F8FF]"
              >
                Shipping &amp; Refund Policy
              </Link>
            </div>
          </div>

          {/* Right Contiguous Purchase & Channel Selection Module */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
                OFFICIAL ORDERING &amp; ALLOCATION CENTER
              </div>
              <h2 className="text-3xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
                Select Your Edition &amp; Place Your Order
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                Choose your preferred edition format below. Submitting the direct order form immediately dispatches your order details to <strong>{commerceStatus.authorNotificationEmail}</strong> and logs your fulfillment reference ID.
              </p>
            </div>

            {/* Step 1: Format Selector */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold text-[#091122] dark:text-[#F5F8FF]">
                1. SELECT EDITION FORMAT
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {BOOK_FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormatId(fmt.id)}
                    className={`text-left rounded-xl p-4 border transition-all cursor-pointer ${
                      selectedFormatId === fmt.id
                        ? 'bg-white dark:bg-[#101F34] border-[#1D4ED8] dark:border-[#37D5F5] shadow-md ring-2 ring-[#1D4ED8]/20'
                        : 'bg-white/70 dark:bg-[#0B1628] border-[#D5E0F0] dark:border-slate-400/15 hover:border-[#1D4ED8]/50 dark:hover:border-slate-400/30'
                    }`}
                  >
                    <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                      {fmt.status}
                    </div>
                    <div className="text-sm font-bold font-display text-[#091122] dark:text-[#F5F8FF] mt-1">
                      {fmt.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-2 font-mono">
                      {fmt.priceDisplay}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Direct Website Order Form (Dispatches to harshverma59@gmail.com) */}
            <div
              id="direct-allocation"
              className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 md:p-8 space-y-5 shadow-md dark:shadow-none"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                    2. DIRECT BOOK ORDER &amp; AUTHOR ALLOCATION FORM
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mt-1">
                    Order Directly — Instant Notification to Author Desk
                  </h3>
                </div>
                <ShoppingBag className="w-5 h-5 text-[#1D4ED8] dark:text-[#37D5F5] shrink-0" />
              </div>

              <div className="rounded-xl bg-[#EDF2F9]/80 dark:bg-[#0B1628] border border-[#D5E0F0] dark:border-slate-400/15 p-4 flex items-start gap-3 text-xs text-slate-700 dark:text-[#AAB8CC]">
                <Info className="w-4 h-4 text-[#1D4ED8] dark:text-[#37D5F5] shrink-0 mt-0.5" />
                <div>
                  Completing this order form validates your request on our server and automatically dispatches your order details to <strong className="text-[#091122] dark:text-[#F5F8FF]">{commerceStatus.authorNotificationEmail}</strong> for direct fulfillment and invoice/checkout link dispatch.
                </div>
              </div>

              {directResult ? (
                <div className="rounded-xl bg-blue-50/90 dark:bg-[#0B1628] border border-blue-200 dark:border-[#37D5F5]/40 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-base font-bold text-[#091122] dark:text-[#F5F8FF]">
                    <CheckCircle2 className="w-5 h-5 text-[#1D4ED8] dark:text-[#37D5F5]" />
                    <span>Order Dispatched ({directResult.referenceId})</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                    {directResult.message}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${
                        directResult.notificationRecipient || 'harshverma59@gmail.com'
                      }?subject=${encodeURIComponent(
                        `[Book Order ${directResult.referenceId}] ${quantity}x ${selectedFormat.name} — ${customerName}`
                      )}&body=${encodeURIComponent(
                        `Hello Harsh,\n\nI just placed an order on beyondaivsai.com:\n\nReference ID: ${directResult.referenceId}\nEdition Format: ${selectedFormat.name}\nQuantity: ${quantity}\nName: ${customerName}\nEmail: ${customerEmail}\nOrganization: ${
                          customerOrg || 'Individual'
                        }\nCountry: ${country}\nNotes: ${shippingNotes || 'None'}\n\nThank you!`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Direct Email Copy to harshverma59@gmail.com</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setDirectResult(null)}
                      className="px-4 py-2 rounded-lg bg-white dark:bg-[#101F34] border border-slate-300 dark:border-slate-400/20 text-xs font-semibold text-slate-700 dark:text-[#AAB8CC] hover:text-slate-900 dark:hover:text-white"
                    >
                      Place Another Order
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDirectOrderSubmit} className="space-y-4" noValidate>
                  <input
                    type="text"
                    value={directHoneypot}
                    onChange={(e) => setDirectHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Selected Edition Format *
                      </label>
                      <select
                        value={selectedFormatId}
                        onChange={(e) =>
                          setSelectedFormatId(
                            e.target.value as 'hardcover' | 'ebook' | 'institutional'
                          )
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] focus:outline-none focus:border-[#1D4ED8]"
                      >
                        {BOOK_FORMATS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] font-mono tabular-nums focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Dr. Jordan Patel"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="jordan@organization.org"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Organization / Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={customerOrg}
                        onChange={(e) => setCustomerOrg(e.target.value)}
                        placeholder="Company or University"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Country / Region *
                      </label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                      Shipping Address or Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingNotes}
                      onChange={(e) => setShippingNotes(e.target.value)}
                      placeholder="City, State / Delivery instructions or signed copy request..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  {directError && (
                    <div className="text-xs text-red-700 dark:text-[#F05252] bg-red-50 dark:bg-[#F05252]/10 border border-red-200 dark:border-[#F05252]/30 rounded-lg px-3.5 py-2">
                      {directError}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
                      <ShieldCheck className="w-4 h-4 text-[#1D4ED8] dark:text-[#37D5F5]" />
                      <span>
                        Dispatches order notification to {commerceStatus.authorNotificationEmail}
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={directSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1] text-xs font-semibold text-white transition-all shadow-md cursor-pointer"
                    >
                      <span>
                        {directSubmitting
                          ? 'Dispatching Order...'
                          : commerceStatus.directCheckoutEnabled
                          ? 'Proceed to Secure Hosted Checkout'
                          : 'Submit Order & Notify Author Desk'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Step 3: Retailer Channels */}
            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 space-y-4 shadow-xs dark:shadow-none">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-semibold text-[#091122] dark:text-[#F5F8FF]">
                  3. GLOBAL BOOK RETAILERS &amp; DISTRIBUTION CHANNELS
                </div>
                <span className="text-xs text-slate-500 dark:text-[#AAB8CC]">
                  Centralized Retailer Configuration
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RETAILER_CHANNELS.map((ret) => (
                  <div
                    key={ret.id}
                    className="rounded-xl bg-[#F4F7FC] dark:bg-[#0B1628] border border-[#D5E0F0] dark:border-slate-400/15 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#091122] dark:text-[#F5F8FF] text-sm">
                          {ret.name}
                        </span>
                        <span className="font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                          {ret.format}
                        </span>
                      </div>
                      <div className="mt-1.5 text-xs text-slate-600 dark:text-[#AAB8CC]">
                        Status:{' '}
                        <span className="text-[#091122] dark:text-[#F5F8FF] font-medium">
                          {ret.availability}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
                        {ret.shippingNote}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-400/10">
                      {ret.url && ret.url.startsWith('http') ? (
                        <a
                          href={ret.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('retailer_selected', { retailer: ret.id })}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1D4ED8] dark:bg-[#3478F6] hover:bg-[#1E40AF] text-xs font-semibold text-white transition-colors"
                        >
                          <span>Order on {ret.name}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <a
                          href="#direct-allocation"
                          onClick={() => trackEvent('retailer_selected', { retailer: ret.id })}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-[#101F34] hover:bg-slate-100 dark:hover:bg-[#162944] border border-slate-300 dark:border-slate-400/20 text-xs font-semibold text-[#1D4ED8] dark:text-[#37D5F5] transition-colors"
                        >
                          <span>Reserve via Direct Order Form Above</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BULK AND INSTITUTIONAL ORDERS SECTION */}
      <section
        id="bulk-enquiry"
        className="max-w-[1280px] mx-auto px-6 pt-8 border-t border-[#D5E0F0] dark:border-slate-400/15"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
              INSTITUTIONAL &amp; VOLUME FULFILLMENT
            </div>
            <h2 className="text-3xl font-bold font-display text-[#091122] dark:text-[#F5F8FF]">
              Bulk Orders for Universities, CISOs &amp; Enterprise Teams
            </h2>
            <p className="text-sm text-slate-600 dark:text-[#AAB8CC] leading-relaxed">
              Equip your cybersecurity organization, AI engineering guild, university seminar, or executive summit with copies of <em>AI vs. AI: Engineering the Cybersecurity Counteroffensive</em>.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-[#AAB8CC]">
              {[
                'Universities & Graduate Cybersecurity / AI Programs',
                'Corporate CISO & Security Operations Teams',
                'Enterprise AI & Cloud Architecture Organizations',
                'Professional Training Institutes & Certification Cohorts',
                'Industry Conferences, Keynotes & Executive Workshops',
              ].map((org) => (
                <div key={org} className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#1D4ED8] dark:text-[#37D5F5] shrink-0" />
                  <span className="text-[#091122] dark:text-[#F5F8FF] font-medium">{org}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/educators"
                className="text-xs font-semibold text-[#1D4ED8] dark:text-[#37D5F5] hover:underline inline-flex items-center gap-1"
              >
                <span>View University Syllabus &amp; Enterprise Workshop Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#101F34] border border-[#D5E0F0] dark:border-slate-400/15 p-6 md:p-8 shadow-sm dark:shadow-none">
              {bulkSuccess ? (
                <div className="rounded-xl bg-blue-50/90 dark:bg-[#0B1628] border border-blue-200 dark:border-[#37D5F5]/40 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-base font-bold text-[#091122] dark:text-[#F5F8FF]">
                    <CheckCircle2 className="w-5 h-5 text-[#1D4ED8] dark:text-[#37D5F5]" />
                    <span>Bulk Order Enquiry Dispatched ({bulkSuccess.referenceId})</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-[#AAB8CC] leading-relaxed">
                    {bulkSuccess.message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBulkSubmit} className="space-y-4" noValidate>
                  <input
                    type="text"
                    value={bulkHoneypot}
                    onChange={(e) => setBulkHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Organization / University *
                      </label>
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Stanford / Enterprise Security Team"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Primary Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Prof. / CISO Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={bulkEmail}
                        onChange={(e) => setBulkEmail(e.target.value)}
                        placeholder="contact@institution.edu"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Intended Quantity (Min 5) *
                      </label>
                      <input
                        type="number"
                        min={5}
                        required
                        value={bulkQty}
                        onChange={(e) => setBulkQty(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF] font-mono tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Destination Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={bulkCountry}
                        onChange={(e) => setBulkCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Intended Use *
                      </label>
                      <select
                        value={intendedUse}
                        onChange={(e) => setIntendedUse(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                      >
                        <option value="Enterprise Security / Engineering Team">
                          Enterprise Security / Engineering Team
                        </option>
                        <option value="University Course / Academic Adoption">
                          University Course / Academic Adoption
                        </option>
                        <option value="Conference / Keynote Attendee Distribution">
                          Conference / Keynote Attendee Distribution
                        </option>
                        <option value="Training & Workshop Cohort">
                          Training &amp; Workshop Cohort
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                        Required Format
                      </label>
                      <select
                        value={requiredFormat}
                        onChange={(e) => setRequiredFormat(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                      >
                        <option value="Hardcover">Hardcover</option>
                        <option value="Digital / eBook Site License">
                          Digital / eBook Cohort Access
                        </option>
                        <option value="Hybrid (Hardcover + Digital)">
                          Hybrid (Hardcover + Digital)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#091122] dark:text-[#F5F8FF] mb-1.5">
                      Additional Requirements / Delivery Timeline
                    </label>
                    <textarea
                      rows={3}
                      value={bulkMessage}
                      onChange={(e) => setBulkMessage(e.target.value)}
                      placeholder="Share your target semester, team size, or executive briefing goals..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F7FC] dark:bg-[#07111F] border border-slate-300 dark:border-slate-400/20 text-sm text-[#091122] dark:text-[#F5F8FF]"
                    />
                  </div>

                  {bulkError && (
                    <div className="text-xs text-red-700 dark:text-[#F05252] bg-red-50 dark:bg-[#F05252]/10 border border-red-200 dark:border-[#F05252]/30 rounded-lg px-3.5 py-2">
                      {bulkError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={bulkSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1] text-xs font-semibold text-white transition-all shadow-md cursor-pointer"
                  >
                    <span>
                      {bulkSubmitting
                        ? 'Dispatching Bulk Enquiry...'
                        : 'Submit Institutional Bulk Enquiry'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Launch Updates Module */}
      <section className="max-w-[1280px] mx-auto px-6 pt-8 border-t border-[#D5E0F0] dark:border-slate-400/15">
        <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5] mb-2">
          {LAUNCH_CAMPAIGN_CONFIG.campaignPhase}
        </div>
        <h3 className="text-xl font-bold font-display text-[#091122] dark:text-[#F5F8FF] mb-6">
          Release &amp; Fulfillment Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LAUNCH_CAMPAIGN_CONFIG.updates.map((u) => (
            <div
              key={u.title}
              className="rounded-xl bg-white dark:bg-[#0B1628] border border-[#D5E0F0] dark:border-slate-400/15 p-5 shadow-2xs dark:shadow-none"
            >
              <div className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-[#37D5F5]">
                {u.date}
              </div>
              <div className="text-base font-bold font-display text-[#091122] dark:text-[#F5F8FF] mt-1">
                {u.title}
              </div>
              <p className="text-xs text-slate-600 dark:text-[#AAB8CC] mt-2 leading-relaxed">
                {u.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
