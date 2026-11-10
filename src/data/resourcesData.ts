export interface TechnicalResource {
  id: string;
  title: string;
  type:
    | 'Manifesto'
    | 'Architecture'
    | 'Labs'
    | 'Case studies'
    | 'Assessments'
    | 'Roadmaps'
    | 'Maturity models'
    | 'Career guidance';
  shortDescription: string;
  format: string;
  audience: string;
  availability: 'Interactive Online Module' | 'Included in Book & Interactive Preview' | 'Book Companion Blueprint';
  chapterReference: string;
  interactiveRoute: string;
  highlights: string[];
  previewContent: {
    overview: string;
    keyItems: { label: string; detail: string }[];
  };
}

export const RESOURCES_DATA: TechnicalResource[] = [
  {
    id: 'ai-security-manifesto',
    title: 'The AI Security Engineering Manifesto',
    type: 'Manifesto',
    shortDescription:
      'Ten foundational engineering tenets for securing probabilistic models, autonomous agents, and enterprise AI infrastructure.',
    format: 'Interactive Reference & Printable Charter',
    audience: 'CISOs, CTOs, Security Architects & AI Leads',
    availability: 'Interactive Online Module',
    chapterReference: 'Chapters 1 & 11',
    interactiveRoute: '/framework',
    highlights: [
      'Why system prompts are never a security boundary',
      'Deterministic wrappers around probabilistic inference',
      'Identity-scoped least privilege for autonomous agents',
    ],
    previewContent: {
      overview:
        'Core principles guiding the engineering counteroffensive across design, deployment, and runtime operations:',
      keyItems: [
        {
          label: 'Tenet 01 · Prompts Are Not Boundaries',
          detail: 'Never rely on natural language instructions inside a model context window to enforce access control or tenant isolation.',
        },
        {
          label: 'Tenet 02 · Assume Context Contamination',
          detail: 'Treat all external retrieved documents, emails, and web pages as untrusted inputs capable of carrying indirect prompt injections.',
        },
        {
          label: 'Tenet 03 · Deterministic Mediation for Every Tool',
          detail: 'Models propose actions; deterministic Sandboxed Tool Brokers validate schemas, verify permissions, and execute within isolated boundaries.',
        },
        {
          label: 'Tenet 04 · Human Authority at High-Consequence Gates',
          detail: 'Preserve explicit human oversight for irreversible, financial, safety-critical, or privilege-escalating operations.',
        },
      ],
    },
  },
  {
    id: 'technical-reference-architecture',
    title: 'Enterprise AI Security Technical Reference Architecture',
    type: 'Architecture',
    shortDescription:
      'End-to-end 5-layer reference blueprint integrating AI Gateways, Retrieval Gatekeepers, Shadow Evaluators, Circuit Breakers, and Sandboxed Tool Brokers.',
    format: 'Interactive Multi-Layer Blueprint',
    audience: 'Security Architects, Cloud Engineers & AI Platform Teams',
    availability: 'Interactive Online Module',
    chapterReference: 'Chapters 3, 4 & 7',
    interactiveRoute: '/framework#patterns',
    highlights: [
      'Complete 5-layer AI Attack Surface mapping',
      'Placement topology for the 4 AI-Native Security Design Patterns',
      'On-Behalf-Of (OBO) cryptographic token delegation flow',
    ],
    previewContent: {
      overview:
        'Defines the canonical control points between user ingress, RAG context assembly, model inference, and tool execution:',
      keyItems: [
        {
          label: 'Ingress & AI Gateway Control Plane',
          detail: 'Unified authentication, tenant rate limiting, PII tokenization, and model routing governance.',
        },
        {
          label: 'ACL-Aware Retrieval Gatekeeper',
          detail: 'Enforces document-level entitlements prior to vector context assembly and tags untrusted external sources.',
        },
        {
          label: 'Inline Circuit Breaker + Parallel Shadow Evaluator',
          detail: 'Sub-second runtime drift interception paired with independent semantic policy verification.',
        },
        {
          label: 'Sandboxed Tool Broker',
          detail: 'Executes approved tool calls inside network-restricted containers using ephemeral user-scoped credentials.',
        },
      ],
    },
  },
  {
    id: 'hands-on-labs',
    title: 'Hands-On AI Security Engineering Lab Specifications',
    type: 'Labs',
    shortDescription:
      'Practical lab blueprints covering indirect prompt injection reproduction, Retrieval Gatekeeper enforcement, and Sandboxed Tool Broker mediation.',
    format: 'Lab Architecture & Walkthrough Guide',
    audience: 'AI Engineers, AppSec Practitioners & University Courses',
    availability: 'Included in Book & Interactive Preview',
    chapterReference: 'Chapters 3, 4, 5 & 6',
    interactiveRoute: '/chapters/ai-native-security-design-patterns',
    highlights: [
      'Lab 01: Tracing indirect prompt injection across a RAG pipeline',
      'Lab 02: Implementing a schema-enforced Sandboxed Tool Broker',
      'Lab 03: Configuring semantic honeytokens and state rollback',
    ],
    previewContent: {
      overview:
        'Structured engineering exercises designed for local sandboxed environments and university cybersecurity laboratories:',
      keyItems: [
        {
          label: 'Lab Module A · RAG Poisoning & Context Isolation',
          detail: 'Demonstrates how untrusted document chunks hijack naive agent prompts and how provenance delimiters + Retrieval Gatekeepers neutralize the vector.',
        },
        {
          label: 'Lab Module B · Confused Deputy Prevention',
          detail: 'Replaces static service-account API keys in an agent tool registry with short-lived On-Behalf-Of (OBO) tokens and JSON schema validators.',
        },
        {
          label: 'Lab Module C · Circuit Breaker Calibration',
          detail: 'Implements token-budget, step-count, and semantic-drift thresholds that trip cleanly during simulated runaway agent loops.',
        },
      ],
    },
  },
  {
    id: 'architectural-case-studies',
    title: 'Domain Threat Scenarios & Architectural Case Studies',
    type: 'Case studies',
    shortDescription:
      'Structured architectural analyses examining AI security controls across enterprise SaaS, financial services, clinical healthcare, and critical infrastructure.',
    format: 'Architectural Threat & Control Analyses',
    audience: 'CISOs, Risk Officers, Sector Architects & Product Leaders',
    availability: 'Included in Book & Interactive Preview',
    chapterReference: 'Chapters 7, 8 & 9',
    interactiveRoute: '/chapters/healthcare-finance-and-critical-infrastructure',
    highlights: [
      'Clearly labeled architectural threat analyses (never misrepresented as undisclosed breaches)',
      'Multi-tenant SaaS RAG isolation blueprint',
      'Cyber-physical safety interlock boundaries for OT/critical infrastructure',
    ],
    previewContent: {
      overview:
        'Engineering threat models illustrating how the book’s patterns apply to high-consequence operational environments:',
      keyItems: [
        {
          label: 'Scenario 01 · Enterprise Customer Support & Internal Copilot',
          detail: 'Preventing external support tickets from triggering internal CRM data export via indirect prompt injection.',
        },
        {
          label: 'Scenario 02 · Financial Advisory & Model Risk Governance',
          detail: 'Combining deterministic transaction limits, Shadow Evaluators, and immutable audit lineage for regulated workflows.',
        },
        {
          label: 'Scenario 03 · Critical Infrastructure Advisory Boundary',
          detail: 'Ensuring AI optimization models remain strictly separated from deterministic PLC hardware safety interlocks.',
        },
      ],
    },
  },
  {
    id: '100-question-security-assessment',
    title: '100-Question Enterprise AI Security Assessment Framework',
    type: 'Assessments',
    shortDescription:
      'Diagnostic audit rubric organized across the 5 layers of the AI Attack Surface to evaluate organizational readiness before and after deployment.',
    format: 'Interactive Diagnostic Domains & Rubric',
    audience: 'CISOs, Security Auditors, GRC Teams & Engineering Leads',
    availability: 'Interactive Online Module',
    chapterReference: 'Chapters 3, 7 & 11',
    interactiveRoute: '/chapters/the-ai-counter-offensive-playbook',
    highlights: [
      '20 diagnostic questions per layer across all 5 AI Attack Surface tiers',
      'Covers model supply chain, RAG ACLs, agent NHI governance, and incident response',
      'Designed for pre-production architecture reviews and vendor due diligence',
    ],
    previewContent: {
      overview:
        'Sample diagnostic checkpoints across the five assessment domains (20 questions per domain in the complete book rubric):',
      keyItems: [
        {
          label: 'Domain 1 · Application & Prompt Integrity (Q1–Q20)',
          detail: 'Are system instructions structurally isolated from user inputs, and are all rendered markdown/HTML outputs sanitized against XSS/SSRF?',
        },
        {
          label: 'Domain 2 · Model & Reasoning Controls (Q21–Q40)',
          detail: 'Are maximum reasoning steps, token budgets, and inline Circuit Breakers enforced for every autonomous agent workflow?',
        },
        {
          label: 'Domain 3 · Data & Retrieval Security (Q41–Q60)',
          detail: 'Does the Retrieval Gatekeeper enforce per-user document ACLs at query time before vector chunks enter the context window?',
        },
        {
          label: 'Domain 4 · Tooling, Identity & Sandboxing (Q61–Q80)',
          detail: 'Are all agent tool calls mediated by a Sandboxed Tool Broker using short-lived user-scoped credentials rather than static API keys?',
        },
        {
          label: 'Domain 5 · Observability, Resilience & Governance (Q81–Q100)',
          detail: 'Can your SOC reconstruct the exact prompt, retrieved chunk IDs, model version, and tool arguments for any production AI incident?',
        },
      ],
    },
  },
  {
    id: '30-60-90-day-roadmap',
    title: '30/60/90-Day Counteroffensive Implementation Roadmap',
    type: 'Roadmaps',
    shortDescription:
      'Phased execution sequence guiding engineering and security teams from initial AI discovery to inline pattern enforcement and continuous red teaming.',
    format: 'Phased Execution Blueprint',
    audience: 'CISOs, VPs of Engineering, AI Platform Leads & Founders',
    availability: 'Interactive Online Module',
    chapterReference: 'Chapter 11',
    interactiveRoute: '/chapters/the-ai-counter-offensive-playbook',
    highlights: [
      'Days 1–30: AI inventory, Shadow AI discovery, and AI Gateway visibility',
      'Days 31–60: Retrieval Gatekeeper, Sandboxed Tool Broker, and Circuit Breaker deployment',
      'Days 61–90: Automated red-teaming harnesses, semantic honeytokens, and tabletop drills',
    ],
    previewContent: {
      overview:
        'A pragmatic 90-day sequence designed to deliver measurable risk reduction without stalling AI product velocity:',
      keyItems: [
        {
          label: 'Phase 1 (Days 1–30) · Visibility, Inventory & Trust Boundaries',
          detail: 'Catalog all internal models, RAG indices, and third-party AI APIs; route traffic through a unified AI Gateway with baseline telemetry.',
        },
        {
          label: 'Phase 2 (Days 31–60) · Inline AI-Native Design Patterns',
          detail: 'Deploy ACL-aware Retrieval Gatekeepers, migrate agent tools to a Sandboxed Tool Broker with OBO tokens, and enable Circuit Breakers.',
        },
        {
          label: 'Phase 3 (Days 61–90) · Continuous Resilience & Red Teaming',
          detail: 'Integrate automated adversarial testing into CI/CD, plant canary honeytokens, and validate AI incident rollback runbooks.',
        },
      ],
    },
  },
  {
    id: 'ai-security-maturity-model',
    title: 'Five-Stage AI Security Maturity Model',
    type: 'Maturity models',
    shortDescription:
      'Structured benchmarking framework measuring organizational progression from ad-hoc model experimentation to self-healing, continuously verified AI systems.',
    format: '5-Tier Capability Matrix',
    audience: 'Executive Leadership, CISOs, Enterprise Architects & Educators',
    availability: 'Interactive Online Module',
    chapterReference: 'Chapters 7 & 11',
    interactiveRoute: '/framework',
    highlights: [
      'Clear progression criteria across 5 maturity levels',
      'Maps technical controls, observability depth, and human oversight maturity',
      'Supports board-level security posture reporting',
    ],
    previewContent: {
      overview:
        'Evaluate your organization’s current engineering posture across five defined maturity stages:',
      keyItems: [
        {
          label: 'Level 1 · Ad-Hoc & Unmonitored',
          detail: 'Direct API calls with static keys, reliance on system prompts for safety, and no centralized logging of prompts or tool calls.',
        },
        {
          label: 'Level 2 · Gateway Visibility & Baseline Guardrails',
          detail: 'Centralized AI Gateway routing, basic PII redaction, input/output filtering, and inventory of production AI endpoints.',
        },
        {
          label: 'Level 3 · Deterministic Pattern Containment',
          detail: 'ACL-enforced Retrieval Gatekeepers, Sandboxed Tool Brokers with user-scoped tokens, and inline runtime Circuit Breakers.',
        },
        {
          label: 'Level 4 · Continuous Adversarial Verification',
          detail: 'Automated CI/CD red-teaming suites, parallel Shadow Evaluators, and immutable prompt-to-action forensic lineage.',
        },
        {
          label: 'Level 5 · Resilient & Adaptive Counteroffensive Architecture',
          detail: 'Semantic honeytokens, automated episodic state rollback, tiered autonomy fallback, and closed-loop policy adaptation.',
        },
      ],
    },
  },
  {
    id: 'ai-cybersecurity-career-roadmap',
    title: 'AI Cybersecurity Career & Competency Roadmap',
    type: 'Career guidance',
    shortDescription:
      'Skill matrices, role definitions, and learning pathways for security practitioners, ML engineers, and students entering AI cybersecurity.',
    format: 'Competency Matrix & Study Guide',
    audience: 'Security Engineers, AI/ML Engineers, Students & Hiring Managers',
    availability: 'Interactive Online Module',
    chapterReference: 'Chapter 10',
    interactiveRoute: '/chapters/careers-in-ai-cybersecurity',
    highlights: [
      'Role blueprints: AI Security Architect, Agentic Red Teamer, Defensive ML Engineer',
      'Bridging distributed systems security with LLM and agent internals',
      'Curriculum mapping for university courses and corporate upskilling',
    ],
    previewContent: {
      overview:
        'Core technical pillars for practitioners building careers at the intersection of AI and cybersecurity:',
      keyItems: [
        {
          label: 'Track 01 · For Security Engineers Transitioning to AI',
          detail: 'Master transformer context mechanics, embedding spaces, RAG pipelines, agent tool orchestration (MCP/function calling), and adversarial ML.',
        },
        {
          label: 'Track 02 · For AI/ML Engineers Mastering Security',
          detail: 'Master threat modeling, OAuth/OBO identity delegation, container/microVM sandboxing, least-privilege IAM, and tamper-evident audit logging.',
        },
        {
          label: 'Track 03 · For Engineering Leaders & CISOs',
          detail: 'Build cross-functional AI security guilds, align with regulatory frameworks, and govern autonomous risk with measurable SLAs.',
        },
      ],
    },
  },
];
