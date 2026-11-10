export interface InsightArticle {
  slug: string;
  title: string;
  subtitle: string;
  category:
    | 'AI Cybersecurity'
    | 'Agentic AI Security'
    | 'LLM Security'
    | 'AI Threat Landscape'
    | 'AI Attack Surface'
    | 'Enterprise AI Security'
    | 'Security Architecture'
    | 'AI Governance'
    | 'Autonomous Systems';
  author: string;
  authorTitle: string;
  publicationNote: string;
  readingTime: string;
  relatedChapterSlug: string;
  relatedChapterTitle: string;
  externalVerificationUrl?: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
}

export const INSIGHTS_CATEGORIES = [
  'All Categories',
  'AI Cybersecurity',
  'Agentic AI Security',
  'LLM Security',
  'AI Threat Landscape',
  'AI Attack Surface',
  'Enterprise AI Security',
  'Security Architecture',
  'AI Governance',
  'Autonomous Systems',
] as const;

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    slug: 'trusted-ai-in-the-age-of-autonomous-agents',
    title: 'Trusted AI in the Age of Autonomous Agents: Navigating the Lethal Trifecta of Agentic Risk',
    subtitle: 'How autonomy, multi-agent orchestration, and external trust dependencies redefine enterprise security boundaries.',
    category: 'Agentic AI Security',
    author: 'Harsh Verma',
    authorTitle: 'Principal Software Engineer in AI at Palo Alto Networks',
    publicationNote: 'Published Research Synthesis · Raptors Conference Proceedings (2026) · DOI: 10.68495/rc.2026.C025',
    readingTime: '9 min read',
    relatedChapterSlug: 'mapping-the-ai-attack-surface',
    relatedChapterTitle: 'Chapter 3: Mapping the AI Attack Surface',
    externalVerificationUrl: 'https://proceedings.raptors.dev/verma-trusted-ai-autonomous-agents/',
    summary:
      'As AI systems evolve from passive assistive interfaces into autonomous agents capable of independent planning and tool execution, they introduce dynamic vulnerabilities rooted in autonomy, orchestration, and trust dependencies.',
    keyTakeaways: [
      'Autonomous agents combine untrusted external data retrieval, internal reasoning, and privileged tool invocation inside a single execution loop.',
      'Traditional perimeter security cannot inspect semantic intent manipulation occurring inside inter-agent message buses.',
      'A defense-first architecture requires end-to-end observability lineage, capability-scoped tool brokers, and explicit human oversight gates.',
    ],
    sections: [
      {
        heading: 'From Passive Assistants to Autonomous Execution',
        body: [
          'First-generation enterprise AI deployments were predominantly stateless chat interfaces: a human entered a prompt, the model generated text, and the human decided what to do with the response. Even when a model hallucinated or was tricked by a clever prompt, the blast radius was constrained by the human sitting between the screen and the rest of the enterprise network.',
          'Agentic AI removes that air gap. Modern autonomous agents decompose high-level objectives into subtasks, query internal and external knowledge bases, delegate work to peer agents, and invoke production APIs. This shift transforms language models from text generators into dynamic control planes.',
        ],
      },
      {
        heading: 'The Lethal Trifecta: Autonomy, Orchestration, and Trust Dependencies',
        body: [
          'When threat-modeling production agent architectures, three intersecting risk factors consistently emerge: (1) Untrusted Data Ingestion (reading external emails, web pages, or shared documents), (2) Privileged Tool Access (holding credentials to send messages, query databases, or modify cloud state), and (3) Autonomous Chaining (executing multi-step plans without step-by-step operator validation).',
          'When all three coexist without deterministic isolation boundaries, an indirect prompt injection hidden inside a retrieved document can redirect the agent’s planning loop and abuse its privileged tools—a classic confused-deputy vulnerability operating at machine speed.',
        ],
      },
      {
        heading: 'Engineering Resilient, Trustworthy Agentic Systems',
        body: [
          'Securing autonomous agents requires moving from prompt-level reminders to structural architecture. In AI vs. AI: Engineering the Cybersecurity Counteroffensive, we formalize this defense-first approach through four composable patterns: Retrieval Gatekeepers that enforce ACLs and provenance tagging on context, Shadow Evaluators that audit intent out-of-band, Circuit Breakers that cap runtime drift, and Sandboxed Tool Brokers that bind every action to least-privilege On-Behalf-Of credentials.',
        ],
      },
    ],
  },
  {
    slug: 'deterministic-wrappers-for-probabilistic-models',
    title: 'Deterministic Wrappers Around Probabilistic Models: The Four AI-Native Security Patterns',
    subtitle: 'Why Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers, and Sandboxed Tool Brokers are essential for production AI.',
    category: 'Security Architecture',
    author: 'Harsh Verma',
    authorTitle: 'Principal Software Engineer in AI at Palo Alto Networks',
    publicationNote: 'Book Architectural Monograph · Chapter 4 Reference Companion',
    readingTime: '8 min read',
    relatedChapterSlug: 'ai-native-security-design-patterns',
    relatedChapterTitle: 'Chapter 4: AI Native Security Design Patterns',
    summary:
      'Large Language Models are inherently probabilistic token predictors. Expecting a probabilistic model to enforce zero-tolerance security invariants through system prompts alone violates fundamental systems engineering principles.',
    keyTakeaways: [
      'Separate probabilistic reasoning (what the model proposes) from deterministic policy enforcement (what the runtime allows).',
      'Place Retrieval Gatekeepers before context assembly and Sandboxed Tool Brokers before API execution.',
      'Pair fast inline Circuit Breakers with isolated Shadow Evaluators to balance latency and inspection depth.',
    ],
    sections: [
      {
        heading: 'The Fallacy of Prompt-Only Guardrails',
        body: [
          'In traditional software engineering, parameterization separates SQL commands from user-supplied data so that user input can never alter query syntax. In contrast, transformer architectures concatenate system instructions, retrieved documents, and user inputs into a unified sequence of tokens.',
          'Because no mathematical boundary separates instruction tokens from data tokens inside the attention mechanism, adversarial sequences can compete with system instructions. Consequently, security invariants must be enforced outside the primary model’s context window.',
        ],
      },
      {
        heading: 'Orchestrating the Four Core Patterns',
        body: [
          '1. Retrieval Gatekeeper: Mediates every query to vector databases and document stores, enforcing user-level access control lists (ACLs) prior to retrieval and marking external content with strict provenance delimiters.',
          '2. Shadow Evaluator: Operates in an isolated enclave with zero tool permissions, evaluating whether a proposed tool invocation or response aligns with organizational policy and the user’s original verified request.',
          '3. Circuit Breaker: Tracks deterministic runtime budgets (maximum reasoning iterations, token velocity, tool transition graphs) and trips immediately if semantic drift or anomalous looping is detected.',
          '4. Sandboxed Tool Broker: Validates structured tool arguments against strict schemas and executes approved calls inside ephemeral, network-restricted containers using short-lived On-Behalf-Of tokens.',
        ],
      },
    ],
  },
  {
    slug: 'mapping-the-five-layer-ai-attack-surface',
    title: 'Mapping the Five-Layer Enterprise AI Attack Surface',
    subtitle: 'A structured threat-modeling taxonomy spanning Application, Model, Data/RAG, Infrastructure, and Governance layers.',
    category: 'AI Attack Surface',
    author: 'Harsh Verma',
    authorTitle: 'Principal Software Engineer in AI at Palo Alto Networks',
    publicationNote: 'Book Architectural Monograph · Chapter 3 Reference Companion',
    readingTime: '7 min read',
    relatedChapterSlug: 'mapping-the-ai-attack-surface',
    relatedChapterTitle: 'Chapter 3: Mapping the AI Attack Surface',
    summary:
      'Security teams often focus narrowly on model jailbreaks while overlooking vulnerabilities in vector retrieval pipelines, shared semantic caches, non-human agent identities, and tool execution sandboxes.',
    keyTakeaways: [
      'Threat modeling an AI system requires tracing untrusted data across five distinct architectural layers.',
      'Cross-tenant data leakage in RAG systems most frequently stems from missing ACL enforcement at the vector retrieval layer.',
      'Full-stack lineage logging must connect user identity, retrieved chunk IDs, reasoning traces, and tool calls.',
    ],
    sections: [
      {
        heading: 'Beyond Single-Prompt Jailbreaks',
        body: [
          'Public discussions of LLM security frequently revolve around clever single-turn jailbreaks designed to elicit restricted text. For enterprise CISOs and platform architects, however, the highest-impact risks lie in how AI models interact with internal data stores and enterprise APIs.',
          'When an AI application ingests external files, indexes internal confluence/sharepoint repositories, and holds service credentials to ticketing or cloud infrastructure systems, vulnerabilities compound across layers.',
        ],
      },
      {
        heading: 'Applying the Five-Layer Taxonomy',
        body: [
          'By decomposing the stack into Application & Interaction (Layer 1), Model & Reasoning (Layer 2), Data, Retrieval & Knowledge (Layer 3), Tools, APIs & Infrastructure (Layer 4), and Governance, Telemetry & Human Oversight (Layer 5), engineering teams can assign clear ownership and verify controls systematically using the 100-Question AI Security Assessment.',
        ],
      },
    ],
  },
  {
    slug: 'identity-delegation-and-governance-for-enterprise-ai',
    title: 'Identity Propagation, On-Behalf-Of Delegation, and Governance in Enterprise AI',
    subtitle: 'Solving the Non-Human Identity (NHI) challenge when deploying autonomous agents at organizational scale.',
    category: 'Enterprise AI Security',
    author: 'Harsh Verma',
    authorTitle: 'Principal Software Engineer in AI at Palo Alto Networks',
    publicationNote: 'Book Architectural Monograph · Chapter 7 Reference Companion',
    readingTime: '8 min read',
    relatedChapterSlug: 'enterprise-ai-and-secure-deployment-at-scale',
    relatedChapterTitle: 'Chapter 7: Enterprise AI and Secure Deployment at Scale',
    summary:
      'Granting an AI agent a static, god-mode service account key breaks decades of zero-trust access control. Enterprise AI requires dynamic On-Behalf-Of (OBO) token exchange and intersection-scoped permissions.',
    keyTakeaways: [
      'Never provision static, over-privileged API keys directly to an AI orchestrator or agent runtime.',
      'Effective agent permissions must equal the strict intersection of the human user’s entitlements and the specific task scope.',
      'Enterprise AI Gateways provide unified policy enforcement, DLP redaction, and audit lineage across multi-model deployments.',
    ],
    sections: [
      {
        heading: 'Why Static Service Accounts Fail in Agentic Workflows',
        body: [
          'In conventional microservice architectures, a backend service often authenticates to a database using an application-level credential and enforces row-level authorization in deterministic code. When teams apply that same pattern to an AI agent—giving the agent a master API token to Slack, Jira, GitHub, or production databases—any prompt injection immediately inherits master privileges.',
        ],
      },
      {
        heading: 'Implementing On-Behalf-Of (OBO) Token Scoping',
        body: [
          'Using OAuth 2.0 Token Exchange and capability-scoped Sandboxed Tool Brokers, every tool invocation mints a short-lived token cryptographically bound to the invoking human user and restricted to the minimum scopes required for the current verified intent. If the human user cannot read a payroll table or delete a production cluster, the agent acting on their behalf cannot either.',
        ],
      },
    ],
  },
];
