export interface CareerMilestone {
  id: string;
  period: string;
  organization: string;
  role: string;
  domainFocus: string;
  summary: string;
  highlights: string[];
}

export const AUTHOR_DATA = {
  name: 'Harsh Verma',
  currentTitle: 'Principal Software Engineer in AI',
  currentOrganization: 'Palo Alto Networks',
  portraitUrl: '/assets/book/harsh_verma_portrait.jpg',
  officialWebsite: 'https://www.harshverma.me',
  aboutPageUrl: 'https://www.harshverma.me/page-about',
  booksPageUrl: 'https://www.harshverma.me/page-books#book2',
  socialProfiles: {
    website: 'https://www.harshverma.me',
    linkedin: 'https://www.linkedin.com/in/harshverma59/',
    youtube: 'https://www.youtube.com/@aiwithharshverma',
    substack: 'https://aiwithharsh.substack.com/',
    googleScholar: 'https://scholar.google.com/citations?hl=en&user=zSt9oRMAAAAJ',
    github: 'https://github.com/iamharshverma',
  },
  keyMetrics: [
    { label: 'Technology & AI Experience', value: '12+ Years' },
    { label: 'Published Research Papers', value: '27+ Papers' },
    { label: 'Patents (Granted & Pending)', value: '6 Patents (2 Granted, 4 Pending)' },
    { label: 'Chartered Fellowship', value: 'Fellow of BCS (FBCS)' },
  ],
  executiveBio:
    'Harsh Verma is a Principal Software Engineer in AI at Palo Alto Networks, where he focuses on autonomous agent systems, multi-agent reasoning and orchestration, enterprise AI security, and distributed cloud defense architectures. With over 12 years of experience across artificial intelligence, machine learning infrastructure, and cybersecurity, he is the author of 27+ published research papers and holds six patents (two granted and four pending).',
  fullBioParagraphs: [
    'Harsh Verma is a Principal Software Engineer in AI at Palo Alto Networks, focused on advancing autonomous agent systems, multi-agent reasoning topologies, and enterprise AI security strategies. Across more than a decade of engineering leadership, his work bridges foundational research in machine learning and distributed systems with mission-critical production security.',
    'He is an elected Fellow of the British Computer Society (FBCS), a Senior Member of IEEE, and an official member of the Forbes Technology Council. As an international keynote speaker, technical reviewer, and startup advisor—including advisory and mentorship involvement at UC Berkeley SkyDeck—he works closely with engineering leaders, founders, and security practitioners navigating responsible enterprise AI adoption.',
    'His technical contributions span 27+ peer-reviewed research publications across venues including IEEE and Springer, alongside six patent filings (two granted and four pending) in machine learning systems, cloud security, and intelligent infrastructure. His work has been recognized with the Global Recognition Award (2026), inclusion in Most Admired Global Indians 2026, and Globee Business Awards recognition.',
  ],
  professionalFocusAreas: [
    'Autonomous agent systems',
    'Multi-agent reasoning and orchestration',
    'Enterprise AI security',
    'AI engineering',
    'Cybersecurity and defensive AI',
    'Distributed cloud systems',
    'Machine learning infrastructure',
    'Responsible enterprise AI adoption',
  ],
  engineerBehindBook: {
    title: 'The Engineer Behind the Counteroffensive',
    subtitle: 'Why Real-World Enterprise AI & Security Engineering Experience Matters',
    paragraphs: [
      'Most discussions of AI and cybersecurity fall into one of two extremes: purely theoretical academic models that overlook production latency and multi-tenant realities, or high-level governance checklists that stop short of concrete architectural implementation.',
      'AI vs. AI: Engineering the Cybersecurity Counteroffensive grows directly out of Harsh Verma’s hands-on experience building and securing large-scale distributed systems, machine learning pipelines, and autonomous agent architectures at Palo Alto Networks and across high-growth technology organizations.',
      'Working at the intersection of enterprise cloud security and autonomous AI systems provides a direct vantage point into how models, retrieval pipelines, and tool-using agents behave under adversarial pressure—and what engineering patterns actually work when milliseconds, permissions, and blast-radius containment matter.',
    ],
  },
  whyIWroteSection: {
    title: 'Perspective: Why AI vs. AI Was Written',
    paragraphs: [
      'The transition from isolated software microservices to autonomous, tool-using AI agents represents a foundational shift in systems engineering. As organizations connect language models to internal knowledge bases, APIs, and operational workflows, every natural-language interface becomes a potential execution path.',
      'At the same time, attackers are adopting AI to accelerate reconnaissance, automate social engineering, and probe defenses continuously. AI vs. AI was written to give security architects, AI engineers, CISOs, educators, and technology leaders a rigorous, engineering-first reference—moving beyond alarmism to provide concrete design patterns, attack-surface taxonomies, and resilient architectures.',
    ],
  },
  careerTimeline: [
    {
      id: 'panw',
      period: '2020 – Present',
      organization: 'Palo Alto Networks',
      role: 'Principal Software Engineer in AI',
      domainFocus: 'Enterprise AI Security, Autonomous Agents & Cloud Defense',
      summary:
        'Architecting enterprise AI and machine learning systems at the intersection of cybersecurity, distributed cloud defense pipelines, autonomous multi-agent reasoning, and real-time policy engines.',
      highlights: [
        'Leading autonomous agent systems and multi-agent reasoning orchestration for enterprise security',
        'Designing scalable ML inference pipelines and cloud security telemetry architectures',
        'Authoring research and patent innovations in intelligent defense and secure AI systems',
      ],
    },
    {
      id: 'worlds-hypergiant',
      period: '2020',
      organization: 'Worlds / Hypergiant',
      role: 'AI & Computer Vision Systems Engineering',
      domainFocus: 'Spatial AI, Vector Search (FAISS) & Deep Learning Infrastructure',
      summary:
        'Engineered high-throughput computer vision, vector similarity indexing, and spatial AI sensing pipelines for real-time enterprise environments.',
      highlights: [
        'Low-latency vector indexing and real-time deep learning inference at scale',
        'Production deployment of distributed sensing and perception architectures',
      ],
    },
    {
      id: 'utd-panw',
      period: '2019 – 2020',
      organization: 'UT Dallas & Palo Alto Networks',
      role: 'Graduate AI/Big Data Researcher & Security Engineering',
      domainFocus: 'Distributed Big Data, Apache Spark & IoT Machine Learning',
      summary:
        'Conducted advanced research in machine learning, heterogeneous wireless sensor networks, and big-data security analytics.',
      highlights: [
        'Published peer-reviewed research on evolutionary clustering and intelligent network architectures',
        'Transitioned scalable big-data ML research into enterprise cybersecurity applications',
      ],
    },
    {
      id: 'jio',
      period: '2018 – 2019',
      organization: 'Reliance Jio',
      role: 'Distributed Systems & Telecom Scale Engineering',
      domainFocus: 'High-Throughput Data Systems & Network Infrastructure',
      summary:
        'Built high-concurrency backend and data services operating at massive consumer telecommunications scale.',
      highlights: [
        'Engineered fault-tolerant distributed services for hundreds of millions of connected endpoints',
      ],
    },
    {
      id: 'hike',
      period: '2015 – 2018',
      organization: 'Hike Messenger',
      role: 'Software & Distributed Backend Engineering',
      domainFocus: 'Real-Time Messaging & High-Concurrency Cloud Infrastructure',
      summary:
        'Developed low-latency distributed messaging backends, data pipelines, and scalable consumer platform services.',
      highlights: [
        'High-availability microservice engineering and real-time event processing',
      ],
    },
    {
      id: 'isro',
      period: '2015',
      organization: 'ISRO (Indian Institute of Remote Sensing)',
      role: 'Research & Scientific Computing',
      domainFocus: 'Geospatial Algorithms & Remote Sensing Systems',
      summary:
        'Early engineering and scientific research foundation working on satellite imagery analysis and algorithmic modeling.',
      highlights: [
        'Foundation in mathematical modeling, algorithmic rigor, and mission-critical systems',
      ],
    },
  ] as CareerMilestone[],
  membershipsAndFellowships: [
    {
      title: 'Fellow of the British Computer Society (FBCS)',
      organization: 'BCS, The Chartered Institute for IT (UK)',
      description:
        'Elected Fellow recognizing senior technical leadership, sustained engineering impact, and contributions to computing and artificial intelligence.',
    },
    {
      title: 'Senior Member of IEEE',
      organization: 'Institute of Electrical and Electronics Engineers',
      description:
        'Peer-reviewed senior grade distinction recognizing significant technical maturity and published contributions in computer science and engineering.',
    },
    {
      title: 'Official Member, Forbes Technology Council',
      organization: 'Forbes Technology Council (Invitation-Only Professional Organization)',
      description:
        'Selected member contributing practitioner thought leadership on enterprise AI, autonomous agents, and cybersecurity engineering. (Note: Council membership is an invitation-only professional membership, distinct from editorial staff employment.)',
    },
    {
      title: 'Advisor & Mentor, UC Berkeley SkyDeck',
      organization: 'UC Berkeley SkyDeck Startup Accelerator',
      description:
        'Advises and mentors deep-tech, AI, and cybersecurity founders on scalable system architecture, enterprise readiness, and responsible AI deployment.',
    },
  ],
  awardsAndRecognition: [
    {
      year: '2026',
      title: 'Global Recognition Award 2026',
      context: 'Recognized for measurable advances in enterprise AI architectures and autonomous cybersecurity defense.',
    },
    {
      year: '2026',
      title: 'Most Admired Global Indians 2026',
      context: 'Featured recognition honoring international leadership in artificial intelligence and enterprise technology engineering.',
    },
    {
      year: 'Selected Recognition',
      title: 'Globee Business Awards Recognition',
      context: 'Honored for technical innovation, technology judging, and leadership in enterprise AI systems.',
    },
  ],
  patentsSummary: {
    total: 6,
    granted: 2,
    pending: 4,
    note: 'Six patent filings (two granted and four pending), as presented on the official author biography, spanning machine learning infrastructure, autonomous agent orchestration, and cloud security systems.',
    focusDomains: [
      'Autonomous multi-agent reasoning and policy enforcement topologies',
      'Real-time cloud security telemetry and anomaly detection pipelines',
      'Distributed machine learning inference and resource optimization',
    ],
  },
  selectedPublications: [
    {
      title: 'Trusted AI in the Age of Autonomous Agents',
      venue: 'Proceedings of the Raptors Conference (2026) · DOI: 10.68495/rc.2026.C025',
      summary:
        'Examines the transition of AI systems from passive tools into autonomous decision-making agents, analyzing emergent vulnerabilities across autonomy, orchestration, and trust dependencies, and proposing defense-first observability and governance frameworks.',
      url: 'https://proceedings.raptors.dev/verma-trusted-ai-autonomous-agents/',
    },
    {
      title: 'DEICA-ML: A Multi-Layer Differential Evolution-Based Improved Clustering Algorithm for IoT-Based Heterogeneous Wireless Sensor Networks',
      venue: 'IEEE Access (2026)',
      summary:
        'Proposes a multi-layer differential evolution-based clustering architecture engineered for IoT-based heterogeneous wireless sensor networks, optimizing adaptive cluster-head selection and resilient cross-tier data transmission.',
      url: 'https://www.harshverma.me/page-publications',
    },
    {
      title: '27+ Peer-Reviewed Research Papers & Technical Articles',
      venue: 'IEEE, Springer, Forbes Technology Council & HackerNoon',
      summary:
        'Full bibliography of 27+ peer-reviewed conference/journal publications and practitioner articles available via Google Scholar and the official author website.',
      url: 'https://scholar.google.com/citations?hl=en&user=zSt9oRMAAAAJ',
    },
  ],
  speakingTopics: [
    {
      title: 'AI vs. AI: Engineering the Cybersecurity Counteroffensive',
      audience: 'CISOs, Security Conferences, Enterprise Leadership Summits',
      description:
        'How autonomous offensive agents change threat latency and how organizations can architect AI-native security patterns without sacrificing engineering velocity.',
    },
    {
      title: 'Securing Agentic AI: Trust Boundaries, Tool Brokers, and Circuit Breakers',
      audience: 'AI Engineers, Cloud Architects, Developer Conferences',
      description:
        'Deep-dive architectural walkthrough of indirect prompt injection, confused deputy risks in MCP/tool calling, and deterministic runtime guardrails.',
    },
    {
      title: 'From Prototype to Regulated Enterprise AI at Scale',
      audience: 'CTOs, Healthcare/Financial Technology Leaders, University Seminars',
      description:
        'Identity delegation (OBO), ACL-aware retrieval, observability lineage, and human oversight gates for high-consequence industries.',
    },
  ],
};
