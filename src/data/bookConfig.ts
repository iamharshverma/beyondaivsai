export interface RetailerChannel {
  id: string;
  name: string;
  format: string;
  url: string | null; // null until official retailer product listing URL is confirmed
  price: string | null;
  currency: string;
  availability: 'Available' | 'Pre-Order / Launch Allocation' | 'Pending Retailer Listing';
  isbn: string | null;
  shippingNote: string;
  affiliateDisclosure?: string;
}

export interface BookFormatConfig {
  id: 'hardcover' | 'ebook' | 'institutional';
  name: string;
  editionNote: string;
  bindingDetails: string;
  isbn: string;
  priceDisplay: string;
  currency: string;
  status: 'Launch Allocation Open' | 'Digital Edition' | 'Custom Volume Allocation';
  directOrderEnabled: boolean;
  directCheckoutUrl: string | null;
  features: string[];
}

export const BOOK_METADATA = {
  brandName: 'Beyond AI vs. AI',
  domain: 'https://beyondaivsai.com',
  title: 'AI vs. AI',
  subtitle: 'Engineering the Cybersecurity Counteroffensive',
  fullTitle: 'AI vs. AI: Engineering the Cybersecurity Counteroffensive',
  supportingTagline: 'Architecting Autonomous AI Defenses Against Intelligent Adversaries.',
  coreMessage: 'The Future of Cybersecurity Is AI vs. AI. The Counteroffensive Must Be Engineered.',
  supportingMessage: 'Understand the threats. Engineer stronger defenses. Secure the intelligent future.',
  footerTagline: 'Understanding the Threats. Engineering the Counteroffensive.',
  signatureMessage: 'Understand the threats. Engineer the counteroffensive. Secure the intelligent future.',
  author: 'Harsh Verma',
  authorRole: 'Principal Software Engineer in AI at Palo Alto Networks',
  releaseWindow: 'October 2026 Hardcover Edition',
  category: 'AI Cybersecurity & Security Engineering',
  chapterCount: 11,
  coverImage: '/assets/book/ai_vs_ai_cover.jpg',
  fullJacketImage: '/assets/book/ai_vs_ai_full_jacket.jpg',
  authorPortrait: '/assets/book/harsh_verma_portrait.jpg',
  shortDescription:
    'Artificial intelligence is reshaping the cyber battlefield. Attackers can use it to accelerate deception, automate activity, and adapt their techniques. Defenders can use it to detect threats, investigate incidents, and respond intelligently. But the systems themselves must also be secured.',
  extendedOverview:
    'Artificial intelligence is changing the capabilities available to both attackers and defenders. AI systems also introduce their own attack surfaces, including models, prompts, data, retrieval systems, agents, APIs, and connected tools. AI vs. AI: Engineering the Cybersecurity Counteroffensive examines how to understand these changes and engineer safer, resilient AI-enabled systems across enterprise environments and high-consequence industries.',
  audioTeaserTranscript:
    'Cyber Warfare Teaser for AI vs. AI: Engineering the Cybersecurity Counteroffensive, authored by Harsh Verma. Artificial intelligence is reshaping the cyber battlefield. Attackers leverage autonomous reasoning loops, polymorphic generation, and reconnaissance swarms at machine speed. Defenders cannot rely solely on static perimeter rules—we must engineer AI-native security design patterns, circuit breakers, shadow evaluators, retrieval gatekeepers, and sandboxed tool brokers with verifiable human oversight.',
};

/**
 * Centralized Retailer & Commerce Configuration
 * Update URLs, verified prices, and ISBNs here as retailer listings go live.
 * Do not invent unverified retailer URLs, stock counts, or unconfirmed prices.
 */
export const BOOK_FORMATS: BookFormatConfig[] = [
  {
    id: 'hardcover',
    name: 'Hardcover Collector & Practitioner Edition',
    editionNote: 'First Edition Hardcover · Full-Color Architectural Diagrams',
    bindingDetails: 'Case-bound hardcover with panoramic dust jacket, archival paper, and 11-chapter reference index',
    isbn: 'Pending Final Publisher Assignment (Jacket Proof: 978-1-950000-00-0)',
    priceDisplay: 'Pricing Announced at Retailer Listing',
    currency: 'USD',
    status: 'Launch Allocation Open',
    directOrderEnabled: false,
    directCheckoutUrl: null,
    features: [
      'Complete 11-chapter engineering manuscript',
      'AI-Native Security Design Patterns reference blueprints',
      'AI Attack Surface 5-layer taxonomy diagrams',
      '30/60/90-Day Counteroffensive Playbook checklists',
    ],
  },
  {
    id: 'ebook',
    name: 'Digital & eBook Edition',
    editionNote: 'DRM-Free EPUB / Kindle Digital Format',
    bindingDetails: 'High-resolution vector diagrams, searchable glossary, and hyperlinked cross-references',
    isbn: 'Assigned Upon Digital Retailer Distribution',
    priceDisplay: 'Pricing Announced at Retailer Listing',
    currency: 'USD',
    status: 'Digital Edition',
    directOrderEnabled: false,
    directCheckoutUrl: null,
    features: [
      'Complete 11-chapter digital text',
      'High-DPI zoomable architectural schematics',
      'Searchable 100-Question AI Security Assessment index',
    ],
  },
  {
    id: 'institutional',
    name: 'Enterprise, University & Bulk Allocation',
    editionNote: '5+ Copies · Academic & CISO Team Briefing Packages',
    bindingDetails: 'Hardcover or hybrid cohort distribution with educator & architecture briefing materials',
    isbn: 'Institutional Fulfillment Program',
    priceDisplay: 'Volume Quote via Institutional Desk',
    currency: 'USD',
    status: 'Custom Volume Allocation',
    directOrderEnabled: true,
    directCheckoutUrl: '/order#bulk-enquiry',
    features: [
      'Custom volume allocation for security & engineering teams',
      'University syllabus mapping and seminar discussion guides',
      'Optional executive keynote or architectural workshop inquiry',
    ],
  },
];

export const RETAILER_CHANNELS: RetailerChannel[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    format: 'Hardcover & Kindle',
    url: null, // Populate with verified Amazon ASIN/ISBN URL when live
    price: null,
    currency: 'USD',
    availability: 'Pending Retailer Listing',
    isbn: null,
    shippingNote: 'Global fulfillment via Amazon regional storefronts once listing is active.',
    affiliateDisclosure: 'Direct link to official publisher listing when active.',
  },
  {
    id: 'barnes-noble',
    name: 'Barnes & Noble',
    format: 'Hardcover',
    url: null,
    price: null,
    currency: 'USD',
    availability: 'Pending Retailer Listing',
    isbn: null,
    shippingNote: 'US and international bookstore fulfillment upon release.',
  },
  {
    id: 'bookshop-org',
    name: 'Bookshop.org / Independent Bookstores',
    format: 'Hardcover',
    url: null,
    price: null,
    currency: 'USD',
    availability: 'Pending Retailer Listing',
    isbn: null,
    shippingNote: 'Supports local independent bookstores upon catalog distribution.',
  },
  {
    id: 'direct-author',
    name: 'Direct Platform Allocation',
    format: 'Hardcover & Institutional Bundles',
    url: '/order#direct-allocation',
    price: null,
    currency: 'USD',
    availability: 'Pre-Order / Launch Allocation',
    isbn: null,
    shippingNote: 'Register for direct fulfillment notification or submit an institutional bulk request.',
  },
];

export const LAUNCH_CAMPAIGN_CONFIG = {
  campaignPhase: 'Global Launch & Release Preparation',
  confirmedCountdownDate: null as string | null, // Only display countdown when a confirmed timestamp is set
  announcementBanner:
    'AI vs. AI: Engineering the Cybersecurity Counteroffensive — Chapter 1 Preview & Launch Allocation Registration Open',
  updates: [
    {
      date: 'Release Roadmap',
      title: '11-Chapter Manuscript & Architectural Diagrams Finalized',
      description:
        'Full coverage of AI as Weapon, Target, and Shield, plus four core AI-native security design patterns: Circuit Breaker, Shadow Evaluator, Retrieval Gatekeeper, and Sandboxed Tool Broker.',
    },
    {
      date: 'Reader Access',
      title: 'Chapter 1 Interactive Online Preview Available',
      description:
        'Read the opening chapter online with adjustable typography and dark/light reading modes, or opt in for direct release updates.',
    },
    {
      date: 'Institutional Program',
      title: 'Academic & Enterprise Security Team Enquiries Open',
      description:
        'Universities, CISOs, and AI engineering organizations can request curriculum alignment details and bulk allocation quotes.',
    },
  ],
};
