export interface ChapterDetail {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  partLabel: string;
  readingTime: string;
  introduction: string;
  summary: string;
  mainThemes: string[];
  keyQuestions: string[];
  learningOutcomes: string[];
  technicalConcepts: {
    name: string;
    description: string;
  }[];
  visualSpec: {
    title: string;
    diagramType: 'arms-race' | 'attacker-playbook' | 'attack-surface' | 'design-patterns' | 'safe-ai' | 'self-healing' | 'enterprise-scale' | 'critical-infra' | 'startup-day-one' | 'careers' | 'playbook';
    caption: string;
    offensiveVector: string;
    defensiveCountermeasure: string;
    humanOversightGate: string;
  };
  infographicUrl: string;
  secondaryInfographicUrl?: string;
  infographicTitle: string;
  infographicKeyTakeaway: string;
  relatedChapters: number[];
}

export const MASTER_BLUEPRINT_INFOGRAPHIC = {
  id: 'master-blueprint',
  title: 'AI vs. AI: The Complete 11-Chapter Cybersecurity Blueprint',
  subtitle: 'The Complete Visual Blueprint for Defending an AI-Powered World (Chapters 1–11 Overview)',
  imageUrl: '/assets/aistudio/AI_vs._AI_Cybersecurity_Blueprint_a4e7209d.png',
  keyTakeaway:
    'Cybersecurity is now a continuous AI-vs-AI race: defenders must understand AI-powered threats, map the 5-layer attack surface, surround models with deterministic design patterns, and operationalize a 30/60/90-day counteroffensive.',
  highlights: [
    'Attack: Understand AI-enabled reconnaissance, deepfakes, and autonomous attack chains (Ch 1–3)',
    'Design: Enforce Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers & Tool Brokers (Ch 4–5)',
    'Defend: Build self-healing resilience, agent identity/OBO governance, and sector guardrails (Ch 6–9)',
    'Advance: Develop AI cybersecurity talent and execute the 30/60/90-day counteroffensive (Ch 10–11)',
  ],
};

export const CHAPTERS_DATA: ChapterDetail[] = [
  {
    number: 1,
    slug: 'the-new-cyber-arms-race',
    title: 'The New Cyber Arms Race',
    subtitle: 'Understanding the Asymmetry of Machine-Speed Adversarial Intelligence',
    partLabel: 'Foundations of the AI Battlefield',
    readingTime: '22 min read',
    introduction:
      'For decades, enterprise cybersecurity rested on the implicit assumption that attackers and defenders operate at human cognitive speed. As autonomous models, reasoning loops, and agentic toolchains enter production, both offensive operations and defensive countermeasures are shifting to machine timescales.',
    summary:
      'Chapter 1 establishes the foundational thesis of AI vs. AI: artificial intelligence simultaneously acts as an offensive accelerator, a complex new attack surface, and an indispensable defensive instrument. It examines why static perimeter controls must be augmented with dynamic, intent-aware engineering.',
    mainThemes: [
      'The transition from human-latency intrusion lifecycles to automated, adaptive campaign execution',
      'The dual-use nature of frontier foundation models, code synthesis, and autonomous orchestration',
      'Why AI systems are simultaneously the weapon, the target, and the defensive shield',
      'Defining the engineering mandate for a disciplined cybersecurity counteroffensive',
    ],
    keyQuestions: [
      'Why do conventional security alerting thresholds struggle when adversarial reconnaissance and adaptation occur at machine speed?',
      'How does the economics of cyber offense change when marginal campaign generation cost approaches zero?',
      'Where must human judgment remain anchored when defensive systems automate containment?',
    ],
    learningOutcomes: [
      'Evaluate the structural asymmetry between automated offensive tooling and manual security triage',
      'Categorize AI security challenges across the Weapon, Target, and Shield triad',
      'Formulate an architectural baseline that balances automated response with human approval gates',
    ],
    technicalConcepts: [
      {
        name: 'Latency Asymmetry',
        description:
          'The operational gap between automated vulnerability probing/exploitation and traditional human-in-the-loop incident triage.',
      },
      {
        name: 'Triad of AI Security',
        description:
          'Analytical framework separating offensive AI capabilities (Weapon), AI system vulnerabilities (Target), and AI-driven defense (Shield).',
      },
      {
        name: 'Human Oversight Gate',
        description:
          'Deterministic policy checkpoints requiring cryptographic or operator verification before high-impact defensive actions execute.',
      },
    ],
    visualSpec: {
      title: 'Machine-Speed Asymmetry & Counteroffensive Equilibrium',
      diagramType: 'arms-race',
      caption: 'Figure 1.1: Opposing offensive and defensive intelligence loops across a contested digital environment with human governance gates.',
      offensiveVector: 'Automated reconnaissance, adaptive payload mutation, and continuous probing',
      defensiveCountermeasure: 'Real-time behavioral telemetry, anomaly correlation, and policy-bound containment',
      humanOversightGate: 'Strategic policy threshold, blast-radius governance, and escalation sign-off',
    },
    infographicUrl: '/assets/aistudio/The_New_Cyber_Arms_Race_Infographic_eb3f7914.png',
    infographicTitle: 'Chapter 1 Infographic: The New Cyber Arms Race — When the Battlefield Learned to Think',
    infographicKeyTakeaway:
      'Cybersecurity is now a machine-speed contest where AI is simultaneously a weapon, a target, and a shield—defenders must think in systems at AI scale to stay in control.',
    relatedChapters: [2, 3, 11],
  },
  {
    number: 2,
    slug: 'how-ai-changes-the-attackers-playbook',
    title: 'How AI Changes the Attacker’s Playbook',
    subtitle: 'Reconnaissance, Deception, Polymorphic Content, and Task Automation',
    partLabel: 'Threat Analysis',
    readingTime: '25 min read',
    introduction:
      'Attackers do not need superintelligent capabilities to alter the threat landscape; they use practical AI pipelines to scale reconnaissance, personalize social engineering, synthesize evasive lures, and chain vulnerability discovery.',
    summary:
      'Chapter 2 dissects how threat actors integrate large language models, voice/media synthesis, and automated scripting into each stage of the intrusion kill chain—and separates realistic operational threats from speculative hype.',
    mainThemes: [
      'AI-assisted open-source intelligence (OSINT) aggregation and target profiling',
      'Context-aware phishing, synthetic identity impersonation, and multi-channel social engineering',
      'Automated vulnerability analysis, exploit scaffolding, and adaptive evasion attempts',
      'Multi-agent task decomposition in offensive workflows and where offensive automation still fails',
    ],
    keyQuestions: [
      'Which phases of the cyber kill chain gain the highest leverage from generative and agentic AI?',
      'How do synthetic voice, video, and contextual spear-phishing bypass traditional awareness training?',
      'What operational signatures distinguish AI-augmented reconnaissance from conventional scanning?',
    ],
    learningOutcomes: [
      'Map AI-enabled threat techniques across reconnaissance, initial access, lateral movement, and exfiltration',
      'Design verification protocols resilient against synthetic executive impersonation and deepfake lures',
      'Identify behavioral indicators of automated LLM-driven probing against public APIs and endpoints',
    ],
    technicalConcepts: [
      {
        name: 'Contextual Lure Synthesis',
        description:
          'Automated ingestion of public repositories, organizational charts, and communications to craft tailored deception artifacts.',
      },
      {
        name: 'Iterative Evasion Probing',
        description:
          'Closed-loop testing where offensive scripts adjust inputs based on classifier feedback or error responses.',
      },
      {
        name: 'Out-of-Band Identity Attestation',
        description:
          'Cryptographic or multi-channel verification workflows that neutralize synthetic audio/video impersonation.',
      },
    ],
    visualSpec: {
      title: 'AI-Augmented Intrusion Kill Chain vs. Detection Interception Points',
      diagramType: 'attacker-playbook',
      caption: 'Figure 2.1: Mapping AI acceleration across OSINT, deception, and exploitation stages alongside defensive interception gates.',
      offensiveVector: 'Automated OSINT synthesis, contextual spear-phishing, and iterative payload adaptation',
      defensiveCountermeasure: 'Behavioral anomaly scoring, cryptographic identity verification, and rate-limited honeytokens',
      humanOversightGate: 'High-privilege transaction confirmation and incident threat-hunt validation',
    },
    infographicUrl: '/assets/aistudio/AI-Powered_Attacker_Playbook_Infographic_0b18f0e4.png',
    infographicTitle: 'Chapter 2 Infographic: How AI Changes the Attacker’s Playbook',
    infographicKeyTakeaway:
      'AI enables attackers to operate faster, at larger scale, with greater stealth and persuasion across Reconnaissance, Weaponization, Delivery, Exploitation, and Post-Exploitation.',
    relatedChapters: [1, 3, 5],
  },
  {
    number: 3,
    slug: 'mapping-the-ai-attack-surface',
    title: 'Mapping the AI Attack Surface',
    subtitle: 'Models, Prompts, Data Pipelines, Retrieval Systems, Agents, and Connected Tools',
    partLabel: 'Attack Surface Architecture',
    readingTime: '28 min read',
    introduction:
      'When organizations deploy AI applications and autonomous agents, they introduce an interconnected stack where natural language instructions, untrusted external data, vector databases, and privileged APIs converge.',
    summary:
      'Chapter 3 provides a systematic, five-layer taxonomy of the modern AI attack surface—spanning Application interfaces, Foundation Models, Data & Retrieval pipelines, Infrastructure, and Governance/Human operations.',
    mainThemes: [
      'Direct and indirect prompt injection across single-turn and multi-agent architectures',
      'Retrieval-Augmented Generation (RAG) poisoning, embedding manipulation, and cross-tenant data leakage',
      'Excessive agency, insecure tool calling, and confused deputy vulnerabilities in agentic workflows',
      'Supply chain integrity for model weights, adapters, tokenizers, and MCP/tool plugins',
    ],
    keyQuestions: [
      'How does untrusted third-party data retrieved during a RAG query become an executable instruction inside an agent?',
      'Where do trust boundaries break down when multiple specialized agents delegate tasks to one another?',
      'How can security architects inventory and threat-model non-deterministic model components alongside deterministic microservices?',
    ],
    learningOutcomes: [
      'Conduct an end-to-end threat model across all five layers of an enterprise AI system',
      'Trace untrusted data flows from external documents through vector embeddings into tool execution contexts',
      'Define explicit trust boundaries between user prompts, retrieved context, model reasoning, and downstream APIs',
    ],
    technicalConcepts: [
      {
        name: 'Indirect Prompt Injection',
        description:
          'Adversarial instructions embedded inside external web pages, documents, or emails that hijack model behavior upon retrieval.',
      },
      {
        name: 'Confused Deputy in Agent Tooling',
        description:
          'When an AI agent with broad service credentials is manipulated by a lower-privilege user or untrusted document into performing unauthorized actions.',
      },
      {
        name: 'RAG Context Contamination',
        description:
          'Adversarial poisoning of knowledge base chunks designed to alter retrieval ranking or inject malicious directives.',
      },
    ],
    visualSpec: {
      title: 'Five-Layer Enterprise AI Attack Surface Topology',
      diagramType: 'attack-surface',
      caption: 'Figure 3.1: Trust boundaries and vulnerability vectors across Application, Model, Data/RAG, Infrastructure, and Governance layers.',
      offensiveVector: 'Indirect prompt injection, RAG corpus poisoning, and unauthorized tool invocation',
      defensiveCountermeasure: 'Strict context privilege separation, provenance tagging, and least-privilege tool scoping',
      humanOversightGate: 'Mandatory operator approval for state-mutating or external tool executions',
    },
    infographicUrl: '/assets/aistudio/Mapping_the_AI_Attack_Surface_093f2281.png',
    infographicTitle: 'Chapter 3 Infographic: Mapping the AI Attack Surface',
    infographicKeyTakeaway:
      'The AI attack surface is broad, dynamic, and interconnected—spanning Application, Model, Data & Knowledge, Infrastructure, and Governance & Identity layers.',
    relatedChapters: [2, 4, 7],
  },
  {
    number: 4,
    slug: 'ai-native-security-design-patterns',
    title: 'AI Native Security Design Patterns',
    subtitle: 'Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers, and Sandboxed Tool Brokers',
    partLabel: 'Core Engineering Patterns',
    readingTime: '32 min read',
    introduction:
      'Securing probabilistic AI models requires deterministic architectural wrappers. Rather than trusting a single model prompt to police itself, engineers must surround AI components with composable security design patterns.',
    summary:
      'Chapter 4 introduces four flagship AI-native security design patterns—the Circuit Breaker, Shadow Evaluator, Retrieval Gatekeeper, and Sandboxed Tool Broker—complete with placement topologies, latency trade-offs, and failure modes.',
    mainThemes: [
      'Deterministic containment around non-deterministic model inference',
      'The Circuit Breaker pattern: halting runaway agent loops, token exhaustion, and policy violations in real time',
      'The Shadow Evaluator pattern: asynchronous and inline semantic inspection using isolated policy models',
      'The Retrieval Gatekeeper and Sandboxed Tool Broker patterns: securing data ingestion and external action execution',
    ],
    keyQuestions: [
      'How do you enforce hard security invariants around a probabilistic language model that cannot guarantee 100% prompt compliance?',
      'When should policy evaluation run inline (blocking) versus asynchronously (shadow/out-of-band)?',
      'How does a Sandboxed Tool Broker prevent privilege escalation even if the reasoning model is compromised?',
    ],
    learningOutcomes: [
      'Architect and place Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers, and Sandboxed Tool Brokers in production pipelines',
      'Enforce capability-based permissions and schema validation on every agent tool call',
      'Balance security inspection depth against end-to-end inference latency budgets',
    ],
    technicalConcepts: [
      {
        name: 'AI Circuit Breaker',
        description:
          'Inline telemetry interceptor that trips and halts execution when semantic drift, anomalous tool sequences, or budget thresholds are exceeded.',
      },
      {
        name: 'Shadow Evaluator',
        description:
          'Independent verifier model or rule engine that audits prompts, reasoning traces, and outputs against security policies.',
      },
      {
        name: 'Retrieval Gatekeeper',
        description:
          'Access-control and sanitization proxy enforcing document-level ACLs, provenance checks, and injection scanning before context reaches the model.',
      },
      {
        name: 'Sandboxed Tool Broker',
        description:
          'Isolated execution mediation layer that validates parameters, scopes ephemeral credentials, and runs tools inside restricted containers.',
      },
    ],
    visualSpec: {
      title: 'Reference Placement of the Four AI-Native Security Design Patterns',
      diagramType: 'design-patterns',
      caption: 'Figure 4.1: Architectural placement of Retrieval Gatekeeper, Shadow Evaluator, Circuit Breaker, and Sandboxed Tool Broker.',
      offensiveVector: 'Injected instructions attempting unauthorized API execution or data exfiltration',
      defensiveCountermeasure: 'Four-stage deterministic mediation pipeline isolating retrieval, evaluation, runtime state, and tool execution',
      humanOversightGate: 'Policy escalation queue when Circuit Breaker trips or high-risk tool parameters are detected',
    },
    infographicUrl: '/assets/aistudio/AI-Native_Security_Architecture_Patterns_32482177.png',
    infographicTitle: 'Chapter 4 Infographic: Designing AI-Native Security Architecture Patterns',
    infographicKeyTakeaway:
      'Secure AI is not a single control, but a set of four architectural patterns—Circuit Breaker, Shadow Evaluator, Retrieval Gatekeeper, and Sandboxed Tool Broker—across the entire AI lifecycle.',
    relatedChapters: [3, 5, 6],
  },
  {
    number: 5,
    slug: 'using-ai-to-build-safe-ai',
    title: 'Using AI to Build Safe AI',
    subtitle: 'Adversarial Testing, Automated Red Teaming, Guardrail Evaluation, and Defensive Co-Pilots',
    partLabel: 'Defensive Engineering',
    readingTime: '26 min read',
    introduction:
      'Manual security reviews cannot cover the combinatorial input space of natural language and multi-step agent trajectories. Defensive engineering must harness automated red teaming, continuous adversarial simulation, and specialized classifier models.',
    summary:
      'Chapter 5 explores how to use AI defensively—from continuous automated red-teaming harnesses and synthetic adversarial benchmarks to SOC investigation assistance, threat intelligence triage, and policy verification.',
    mainThemes: [
      'Automated red-teaming pipelines that probe models and agents for jailbreaks, data leaks, and policy bypasses prior to deployment',
      'Training and calibrating small, fast guardrail classifiers and semantic intent verifiers',
      'Defensive AI in Security Operations Centers (SOCs): alert enrichment, log synthesis, and root-cause hypothesis generation',
      'Preventing alert fatigue and hallucinated remediation in AI-assisted security tools',
    ],
    keyQuestions: [
      'How do you construct an automated red-teaming harness that continuously evolves its test cases as your application changes?',
      'What metrics accurately measure guardrail precision, recall, and false-positive friction in production?',
      'How can security analysts verify AI-generated incident summaries without falling victim to automation bias?',
    ],
    learningOutcomes: [
      'Build continuous adversarial evaluation suites integrated into CI/CD model deployment pipelines',
      'Combine deterministic regex/AST checks with lightweight semantic guardrail models',
      'Design evidence-linked SOC workflows where defensive AI surfaces verifiable telemetry citations',
    ],
    technicalConcepts: [
      {
        name: 'Continuous Adversarial Harness',
        description:
          'Automated pre-release and runtime testing framework that generates mutated adversarial prompts and multi-turn attack trajectories.',
      },
      {
        name: 'Constitutional & Policy Classifiers',
        description:
          'Compact, low-latency models fine-tuned specifically to detect policy violations, PII leakage, and untrusted instruction hijacking.',
      },
      {
        name: 'Evidence-Grounded Triage',
        description:
          'Defensive AI pattern requiring every synthesized security finding to link directly to immutable log lines and packet/trace IDs.',
      },
    ],
    visualSpec: {
      title: 'Closed-Loop Automated Red Teaming & Guardrail Calibration Pipeline',
      diagramType: 'safe-ai',
      caption: 'Figure 5.1: Continuous adversarial simulation feeding guardrail policy refinement and verified SOC investigation.',
      offensiveVector: 'Mutating jailbreak trajectories and multi-turn semantic evasion',
      defensiveCountermeasure: 'Automated adversarial test harness, ensemble policy classifiers, and citation-backed triage',
      humanOversightGate: 'Red-team findings review and policy threshold sign-off before production promotion',
    },
    infographicUrl: '/assets/aistudio/Building_Safe_AI__Testing___Red-Teaming_Lifecycle_2150fd99.png',
    infographicTitle: 'Chapter 5 Infographic: Using AI to Build Safe AI — Testing & Red-Teaming Lifecycle',
    infographicKeyTakeaway:
      'Continuously test, evaluate, and red-team your AI systems across a 5-stage lifecycle (Plan, Test, Evaluate, Fix & Iterate, Report) before and after deployment.',
    relatedChapters: [2, 4, 6],
  },
  {
    number: 6,
    slug: 'building-resilient-and-self-healing-ai-systems',
    title: 'Building Resilient and Self-Healing AI Systems',
    subtitle: 'Detection, Containment, State Rollback, Deception, and Adaptive Recovery',
    partLabel: 'Resilience & Recovery',
    readingTime: '27 min read',
    introduction:
      'Assume breach applies equally to AI architectures. When a prompt injection succeeds, a retrieval index is contaminated, or an agent enters a compromised state, the system must detect the anomaly, contain the blast radius, and recover cleanly.',
    summary:
      'Chapter 6 details engineering patterns for resilient AI systems—covering runtime drift detection, automated containment, episodic memory rollback, deceptive honeypots/honeytokens for agents, and graceful degradation.',
    mainThemes: [
      'Designing for failure: assuming model manipulation or context poisoning will eventually occur',
      'Episodic memory snapshotting and clean-state rollback for stateful AI agents',
      'Deploying AI honeytokens and synthetic decoy environments to detect and study adversarial probing',
      'Graceful degradation: falling back from autonomous multi-agent execution to deterministic workflows during incidents',
    ],
    keyQuestions: [
      'How do you roll back an autonomous agent’s memory and downstream side effects after detecting a poisoned context window?',
      'How can canary tokens and deceptive documents reveal indirect prompt injection attempts in real time?',
      'What defines a safe degraded mode when an enterprise AI service experiences an active adversarial campaign?',
    ],
    learningOutcomes: [
      'Implement immutable state checkpoints and compensating transactions for agentic workflows',
      'Embed canary honeytokens inside RAG corpora and tool schemas to trigger immediate high-confidence alerts',
      'Engineer automated fallback tiers that preserve core business continuity when AI components are isolated',
    ],
    technicalConcepts: [
      {
        name: 'Episodic State Checkpointing',
        description:
          'Versioned snapshots of agent memory and context windows allowing rapid rollback to a known-clean state upon anomaly detection.',
      },
      {
        name: 'Semantic Honeytokens',
        description:
          'Decoy credentials, synthetic context records, or trap tools that no legitimate workflow invokes, signaling immediate compromise if triggered.',
      },
      {
        name: 'Tiered Autonomy Fallback',
        description:
          'Pre-engineered operational modes that step down from full agentic autonomy to human-approved or rule-based execution under threat.',
      },
    ],
    visualSpec: {
      title: 'Resilient Detection, Containment, State Rollback & Adaptation Loop',
      diagramType: 'self-healing',
      caption: 'Figure 6.1: Four-phase resilience lifecycle: Detect (honeytokens/telemetry), Contain (isolation), Recover (memory rollback), Adapt.',
      offensiveVector: 'Persistent context poisoning and multi-step lateral tool abuse',
      defensiveCountermeasure: 'Canary honeytoken triggers, container quarantine, and episodic state rollback',
      humanOversightGate: 'Post-containment forensic audit and authorization to restore full autonomy tier',
    },
    infographicUrl: '/assets/aistudio/Building_Resilient_AI_Systems_3a09a952.png',
    infographicTitle: 'Chapter 6 Infographic: Building Resilient and Self-Healing AI Systems',
    infographicKeyTakeaway:
      'Resilient AI doesn’t just avoid failure—it detects anomalies early, contains blast radius, recovers clean state, and keeps improving with minimal disruption.',
    relatedChapters: [4, 5, 7],
  },
  {
    number: 7,
    slug: 'enterprise-ai-and-secure-deployment-at-scale',
    title: 'Enterprise AI and Secure Deployment at Scale',
    subtitle: 'Identity, Permissions, Observability, Multi-Tenancy, and Governance in Production',
    partLabel: 'Enterprise Architecture',
    readingTime: '30 min read',
    introduction:
      'Moving an AI prototype from a laptop into a global enterprise environment exposes complex challenges around identity propagation, role-based access control, shadow AI governance, audit logging, and regulatory accountability.',
    summary:
      'Chapter 7 provides an enterprise blueprint for deploying AI securely at scale—integrating AI gateways, Non-Human Identity (NHI) governance, end-to-end telemetry, tenant isolation, and human-in-the-loop operational workflows.',
    mainThemes: [
      'Centralized AI Gateways: unified authentication, rate limiting, model routing, and DLP inspection',
      'Identity and permissions for agents: managing Non-Human Identities (NHIs) and on-behalf-of (OBO) token delegation',
      'Full-stack AI observability: logging prompts, retrieved chunks, reasoning steps, and tool invocations without leaking secrets',
      'Discovery and governance of Shadow AI across enterprise SaaS and developer workflows',
    ],
    keyQuestions: [
      'How should an enterprise propagate a user’s exact permissions through an AI agent to downstream databases and APIs?',
      'What telemetry must be captured to reconstruct an AI security incident during a forensic audit?',
      'How does an AI Gateway unify security enforcement across multiple cloud and self-hosted model providers?',
    ],
    learningOutcomes: [
      'Architect an enterprise AI Gateway enforcing authentication, DLP redaction, and routing governance',
      'Bind agent tool executions to short-lived, user-scoped OAuth/OIDC tokens rather than static service accounts',
      'Establish tamper-evident audit trails covering the complete prompt-to-action lifecycle',
    ],
    technicalConcepts: [
      {
        name: 'On-Behalf-Of (OBO) Agent Delegation',
        description:
          'Cryptographic token exchange ensuring an AI agent can never access data or tools beyond the invoking human user’s authorization.',
      },
      {
        name: 'Enterprise AI Gateway',
        description:
          'Unified ingress/egress control plane mediating all model API calls, policy checks, PII redaction, and cost/rate quotas.',
      },
      {
        name: 'Telemetry Lineage Graph',
        description:
          'Structured observability trail linking user identity, prompt input, retrieved document IDs, model version, and downstream API calls.',
      },
    ],
    visualSpec: {
      title: 'Enterprise AI Control Plane & Identity-Scoped Deployment Architecture',
      diagramType: 'enterprise-scale',
      caption: 'Figure 7.1: End-to-end enterprise deployment featuring AI Gateway, OBO token scoping, ACL-aware RAG, and immutable telemetry.',
      offensiveVector: 'Cross-tenant data leakage, privilege escalation via shared service tokens, and unmonitored shadow AI endpoints',
      defensiveCountermeasure: 'Centralized AI Gateway, OBO cryptographic delegation, and per-chunk ACL enforcement',
      humanOversightGate: 'CISO/Governance policy console and high-sensitivity data access approval workflows',
    },
    infographicUrl: '/assets/aistudio/Securing_Agentic_AI_Systems_9a7ddc13.png',
    secondaryInfographicUrl: '/assets/aistudio/Securing_Multi-Agent_AI_Infographic_6cde3f65.png',
    infographicTitle: 'Chapter 7 Infographic: Securing Agentic AI and Multi-Agent Systems at Scale',
    infographicKeyTakeaway:
      'Multi-agent AI unlocks massive capability, but it must be designed and governed from the start with strong agent identity, policy enforcement, least-privilege access, observability, and human-in-the-loop control.',
    relatedChapters: [3, 4, 8],
  },
  {
    number: 8,
    slug: 'healthcare-finance-and-critical-infrastructure',
    title: 'Healthcare, Finance, and Critical Infrastructure',
    subtitle: 'Engineering AI Security for High-Consequence, Regulated Environments',
    partLabel: 'High-Consequence Domains',
    readingTime: '26 min read',
    introduction:
      'In clinical healthcare, financial markets, energy grids, and transportation systems, an AI security failure is not merely an information leak—it can impact patient safety, market stability, physical operations, and strict statutory compliance.',
    summary:
      'Chapter 8 examines domain-specific threat models and engineering controls for high-consequence sectors, addressing clinical privacy and diagnostic integrity in healthcare, algorithmic fraud and model risk in finance, and cyber-physical safety boundaries in critical infrastructure.',
    mainThemes: [
      'Healthcare AI security: protecting PHI, securing clinical decision support, and preventing adversarial manipulation of medical workflows',
      'Financial services: defending fraud-detection models, preventing automated market manipulation, and satisfying model risk management (MRM)',
      'Critical infrastructure & OT/ICS: air-gapped safety interlocks and why probabilistic AI must never bypass deterministic physical safety controllers',
      'Auditable compliance, explainability, and regulatory readiness across high-consequence jurisdictions',
    ],
    keyQuestions: [
      'Where must hard physical or deterministic interlocks sit when AI optimizes industrial or critical infrastructure operations?',
      'How do financial institutions protect autonomous trading and credit-scoring pipelines against adversarial evasion and synthetic identity fraud?',
      'What controls prevent Protected Health Information (PHI) from leaking across clinical summarization and retrieval pipelines?',
    ],
    learningOutcomes: [
      'Design deterministic safety interlocks that isolate OT/physical actuators from direct probabilistic model outputs',
      'Align AI security controls with sector governance frameworks (HIPAA, financial Model Risk Management, NIS2/critical infrastructure directives)',
      'Implement privacy-preserving retrieval and strict de-identification pipelines for regulated datasets',
    ],
    technicalConcepts: [
      {
        name: 'Deterministic Safety Interlock',
        description:
          'Hardware or hard-coded PLC/software boundary that validates operational constraints independently of any AI recommendation.',
      },
      {
        name: 'Model Risk Management (MRM) Attestation',
        description:
          'Continuous validation of model stability, adversarial robustness, and decision auditability in regulated financial workflows.',
      },
      {
        name: 'PHI/PII Vault Tokenization',
        description:
          'Reversible or irreversible replacement of sensitive identifiers prior to model context assembly.',
      },
    ],
    visualSpec: {
      title: 'High-Consequence Cyber-Physical & Regulated Isolation Architecture',
      diagramType: 'critical-infra',
      caption: 'Figure 8.1: Separating probabilistic AI advisory layers from deterministic safety interlocks and regulated data vaults.',
      offensiveVector: 'Adversarial sensor/input manipulation, synthetic financial fraud, and regulated data extraction',
      defensiveCountermeasure: 'PII/PHI tokenization vaults, model risk anomaly monitors, and hard PLC/safety interlocks',
      humanOversightGate: 'Clinician, risk officer, or control-room operator sign-off before high-consequence actuation',
    },
    infographicUrl: '/assets/aistudio/AI_Agent_Identity_and_Access_Control_Infographic_20747d7c.png',
    infographicTitle: 'Chapter 8 Infographic: Identity, Authorization, Policy & High-Consequence Guardrails',
    infographicKeyTakeaway:
      'AI agents and high-consequence deployments need verifiable identity, least-privilege authorization, intent-based policy control, and end-to-end auditability.',
    relatedChapters: [6, 7, 9],
  },
  {
    number: 9,
    slug: 'startups-product-builders-and-secure-ai-from-day-one',
    title: 'Startups, Product Builders, and Secure AI from Day One',
    subtitle: 'Pragmatic Security Architecture That Accelerates Enterprise Trust and Product Velocity',
    partLabel: 'Product & Startup Engineering',
    readingTime: '24 min read',
    introduction:
      'AI startups and product teams face intense pressure to ship features rapidly. Yet retrofitting security after a multi-tenant data leak or enterprise security review failure is far costlier than embedding pragmatic, lightweight security primitives from Day One.',
    summary:
      'Chapter 9 gives founders, product engineers, and technical leads a practical minimum-viable AI security architecture—showing how to build secure multi-tenant AI products that pass enterprise CISO scrutiny without slowing developer velocity.',
    mainThemes: [
      'The Minimum Viable AI Security (MVAS) stack for seed-to-growth startups and product teams',
      'Preventing cross-customer data leakage in multi-tenant vector databases and fine-tuning pipelines',
      'Securing third-party model APIs, webhook integrations, and customer-supplied plugins',
      'Turning verifiable AI security architecture into a competitive enterprise sales differentiator',
    ],
    keyQuestions: [
      'What are the non-negotiable security controls an AI product must implement before onboarding its first enterprise customer?',
      'How do you architect strict tenant isolation in shared vector databases and caching layers?',
      'How can small engineering teams automate security regression testing inside fast-moving deployment pipelines?',
    ],
    learningOutcomes: [
      'Implement a Day-One Secure AI checklist covering tenant isolation, secret handling, prompt separation, and tool scoping',
      'Avoid common startup pitfalls such as shared embedding namespaces, over-privileged API keys, and unvalidated webhook actions',
      'Prepare transparent AI security architecture documentation for enterprise customer due diligence',
    ],
    technicalConcepts: [
      {
        name: 'Namespace & Cryptographic Tenant Isolation',
        description:
          'Partitioning vector indices, semantic caches, and storage buckets per tenant with independent encryption keys.',
      },
      {
        name: 'Minimum Viable AI Security (MVAS)',
        description:
          'High-leverage baseline controls—structured outputs, input length caps, scoped tool schemas, and egress allowlists—deployable in days.',
      },
      {
        name: 'Enterprise Trust Readiness Packet',
        description:
          'Architectural transparency artifacts documenting data retention, zero-training guarantees, and security pattern boundaries.',
      },
    ],
    visualSpec: {
      title: 'Day-One Multi-Tenant Secure AI Product Architecture',
      diagramType: 'startup-day-one',
      caption: 'Figure 9.1: Pragmatic startup architecture enforcing per-tenant vector isolation, structured output validation, and egress allowlists.',
      offensiveVector: 'Cross-tenant cache/RAG bleed, unbounded token cost exhaustion, and malicious plugin callbacks',
      defensiveCountermeasure: 'Per-tenant namespace encryption, strict JSON schema validation, and egress domain allowlisting',
      humanOversightGate: 'Customer admin policy controls and explicit approval for external integration scopes',
    },
    infographicUrl: '/assets/aistudio/The_AI_Engineer_s_Toolkit_Infographic_e3ae62e8.png',
    infographicTitle: 'Chapter 9 Infographic: The AI Engineer’s Toolkit & Day-One Secure Building Blocks',
    infographicKeyTakeaway:
      'A great AI engineer combines agent/workflow design, RAG grounding, function-calling guardrails, observability, and security-by-design across the 6-stage production lifecycle.',
    relatedChapters: [3, 4, 7],
  },
  {
    number: 10,
    slug: 'careers-in-ai-cybersecurity',
    title: 'Careers in AI Cybersecurity',
    subtitle: 'Skills, Roles, Competencies, and Leadership in the Next Era of Security Engineering',
    partLabel: 'Human Capital & Leadership',
    readingTime: '23 min read',
    introduction:
      'The convergence of artificial intelligence and cybersecurity is creating one of the most critical talent gaps in modern technology. Security professionals must understand ML/agent architectures, while AI engineers must master adversarial thinking and systems security.',
    summary:
      'Chapter 10 provides a structured career roadmap for engineers, security practitioners, students, and executives—detailing emerging roles, core technical competencies, portfolio projects, and leadership strategies in AI cybersecurity.',
    mainThemes: [
      'Bridging the disciplinary divide between distributed systems, machine learning engineering, and offensive/defensive cybersecurity',
      'Emerging roles: AI Security Architect, Agentic Red Teamer, Defensive ML Engineer, and AI Governance Lead',
      'Core competency matrix: threat modeling AI stacks, secure tool orchestration, adversarial evaluation, and cloud security',
      'Building durable technical authority through empirical research, open benchmarks, and engineering leadership',
    ],
    keyQuestions: [
      'How can traditional application or cloud security engineers transition into AI security architecture?',
      'What foundational security engineering skills do ML and AI engineers need to build production-grade autonomous systems?',
      'How should CISOs and engineering VPs structure cross-functional AI security teams?',
    ],
    learningOutcomes: [
      'Assess your current skill profile against the AI Cybersecurity Competency Matrix',
      'Design a structured 90-day learning and hands-on lab progression for AI security roles',
      'Structure organizational hiring and red/blue team collaboration for AI-enabled enterprises',
    ],
    technicalConcepts: [
      {
        name: 'Cross-Disciplinary Security Fluency',
        description:
          'Combining distributed systems security (IAM, network isolation, sandboxing) with AI internals (embeddings, attention context, agent loops).',
      },
      {
        name: 'Adversarial Engineering Mindset',
        description:
          'Evaluating every new AI capability by asking how untrusted inputs, incentives, or failure modes can subvert system intent.',
      },
      {
        name: 'Organizational AI Security Guild',
        description:
          'Operating model embedding AI security champions across product, platform, and SOC teams.',
      },
    ],
    visualSpec: {
      title: 'AI Cybersecurity Career & Competency Convergence Matrix',
      diagramType: 'careers',
      caption: 'Figure 10.1: Intersection of AI/ML Engineering, Distributed Systems Architecture, and Offensive/Defensive Security Operations.',
      offensiveVector: 'Skill silos leaving gaps between ML data scientists and infrastructure security teams',
      defensiveCountermeasure: 'Unified AI Security Engineering discipline spanning model internals, runtime guardrails, and SOC telemetry',
      humanOversightGate: 'Executive CISO/CTO governance and continuous practitioner red/blue exercises',
    },
    infographicUrl: '/assets/aistudio/Careers_in_AI_Cybersecurity_2fdb36e9.png',
    infographicTitle: 'Chapter 10 Infographic: Careers in AI Cybersecurity — Skills, Roles & Growth Path',
    infographicKeyTakeaway:
      'Build foundations in AI/ML, cloud, and cybersecurity, gain hands-on red/blue lab experience, specialize in secure AI architecture, and lead at the frontline of the AI security revolution.',
    relatedChapters: [1, 9, 11],
  },
  {
    number: 11,
    slug: 'the-ai-counter-offensive-playbook',
    title: 'The AI Counter Offensive Playbook',
    subtitle: 'A Practical 30/60/90-Day Blueprint for Engineering Resilient AI Security',
    partLabel: 'The Counteroffensive Playbook',
    readingTime: '30 min read',
    introduction:
      'Architectural theory only matters when translated into disciplined execution. The final chapter synthesizes the entire book into an actionable counteroffensive playbook for engineering teams, CISOs, and technology leaders.',
    summary:
      'Chapter 11 delivers the complete operational synthesis: the AI Security Manifesto principles, the 5-stage AI Security Maturity Model, the 100-Question Security Assessment structure, incident response runbooks for AI breaches, and a phased 30/60/90-day implementation roadmap.',
    mainThemes: [
      'Synthesizing Weapon, Target, and Shield into a cohesive organizational security posture',
      'The 30/60/90-Day Counteroffensive Implementation Roadmap: Discovery & Visibility (Days 1–30), Pattern Enforcement (Days 31–60), Continuous Adversarial Resilience (Days 61–90)',
      'Incident response playbooks specifically tailored for prompt injection, RAG poisoning, and rogue agent containment',
      'Engineering the intelligent future: balancing autonomous defense speed with accountable human governance',
    ],
    keyQuestions: [
      'How should an organization sequence its AI security investments over the first 30, 60, and 90 days?',
      'What are the immediate containment steps when an enterprise AI agent exhibits unauthorized tool execution in production?',
      'How do you measure progression across the five levels of the AI Security Maturity Model?',
    ],
    learningOutcomes: [
      'Execute a phased 30/60/90-day AI security transformation across engineering and security operations',
      'Run structured tabletop exercises for AI-specific security incidents',
      'Establish continuous governance metrics that keep defensive capabilities ahead of evolving adversarial techniques',
    ],
    technicalConcepts: [
      {
        name: '30/60/90-Day Counteroffensive Roadmap',
        description:
          'Phased execution plan moving from inventory and gateway visibility to inline security patterns and automated red-team resilience.',
      },
      {
        name: 'AI Incident Containment Runbook',
        description:
          'Step-by-step operational protocol for tripping circuit breakers, revoking agent OBO tokens, purging poisoned RAG chunks, and auditing lineage.',
      },
      {
        name: 'Five-Level AI Security Maturity Model',
        description:
          'Benchmarking progression from Level 1 (Ad-Hoc/Unmonitored) to Level 5 (Resilient, Continuously Red-Teamed & Self-Healing Architecture).',
      },
    ],
    visualSpec: {
      title: 'The 30/60/90-Day AI Counteroffensive Execution Architecture',
      diagramType: 'playbook',
      caption: 'Figure 11.1: Phased operationalization from visibility and threat mapping to inline patterns and continuous adversarial resilience.',
      offensiveVector: 'Evolving multi-vector AI threats targeting unmonitored deployments and static defenses',
      defensiveCountermeasure: 'Phased deployment of AI Gateways, 4 core design patterns, honeytokens, and continuous red-teaming',
      humanOversightGate: 'Board/CISO maturity reviews, incident command authority, and ethical governance charters',
    },
    infographicUrl: '/assets/aistudio/The_Road_Ahead__AI_s_Next_Decade_14cde121.png',
    secondaryInfographicUrl: '/assets/aistudio/AI_vs._AI_Cybersecurity_Blueprint_a4e7209d.png',
    infographicTitle: 'Chapter 11 Infographic: The Counteroffensive Playbook & The Next Decade of AI Engineering',
    infographicKeyTakeaway:
      'The next decade isn’t just about more powerful AI—it’s about engineering secure, reliable, and self-improving systems governed by a repeatable counteroffensive playbook.',
    relatedChapters: [1, 4, 6, 7],
  },
];

export const CHAPTER_ONE_EXCERPT = {
  chapterNumber: 1,
  title: 'Chapter 1: The New Cyber Arms Race',
  alternateSubtitle: 'When Machines Attack — The Breakdown of Static Perimeters & the Engineering Counteroffensive',
  estimatedReadTime: '12 min preview',
  notice:
    'This is an official reading preview from Chapter 1 of AI vs. AI: Engineering the Cybersecurity Counteroffensive by Harsh Verma. Copyright © Harsh Verma. All rights reserved.',
  sections: [
    {
      heading: '1.1 The End of the Human-Latency Assumption',
      paragraphs: [
        'The premise of enterprise cybersecurity has long rested on a comfortable structural assumption: human adversaries operate at human latency. Historically, even sophisticated threat actors had to perform reconnaissance, analyze target configurations, craft custom lures, identify vulnerabilities, and manually pivot across internal network segments. That operational cadence gave defensive Security Operations Centers (SOCs) hours—or sometimes days—to correlate anomalies, triage alerts, and orchestrate containment.',
        'Artificial intelligence is fundamentally altering that equation. As foundation models, code-synthesis engines, and autonomous agent frameworks mature, attackers can compress reconnaissance, social engineering, vulnerability discovery, and adaptive payload mutation into automated pipelines. At the same time, defenders gain the ability to analyze telemetry at scale, synthesize threat intelligence, investigate complex incident graphs, and automate containment workflows.',
        'Yet this is not a simple story of one algorithm defeating another. Every AI system deployed inside an enterprise—whether a customer-facing assistant, an internal Retrieval-Augmented Generation (RAG) knowledge engine, or an autonomous workflow agent with API access—introduces a new, poorly understood attack surface of its own.',
      ],
    },
    {
      heading: '1.2 The Core Postulate: Weapon, Target, and Shield',
      callout: {
        title: 'The Counteroffensive Mandate',
        quote:
          'You cannot defend a machine-speed threat landscape with static rules alone, nor can you deploy autonomous AI without engineering deterministic security boundaries around it. The future of cybersecurity is AI vs. AI—and the counteroffensive must be engineered.',
      },
      paragraphs: [
        'To reason clearly about this transformation without falling prey to either complacency or vendor hype, engineers and security leaders must examine artificial intelligence across three distinct dimensions simultaneously:',
        'First, AI as a Weapon: How threat actors use generative models and agentic automation to scale reconnaissance, craft context-aware deception, accelerate exploit development, and adapt dynamically to defensive filters.',
        'Second, AI as a Target: How the AI stack itself—spanning foundation models, system prompts, fine-tuning datasets, vector embeddings, retrieval pipelines, orchestrator memory, and connected tools—can be subverted through indirect prompt injection, context poisoning, and confused-deputy privilege escalation.',
        'Third, AI as a Shield: How defenders can engineer AI-assisted detection, automated adversarial red teaming, semantic policy evaluation, and resilient containment architectures anchored by verifiable human oversight.',
      ],
    },
    {
      heading: '1.3 Why Traditional Controls Are Necessary—But Insufficient',
      paragraphs: [
        'Nothing in the AI era invalidates the fundamentals of cybersecurity. Network segmentation, cryptographic identity, least-privilege access control, patch management, and defense-in-depth remain mandatory foundations. However, conventional security controls were designed for deterministic software where code and data occupy strictly separated channels.',
        'In Large Language Models and agentic systems, instructions and data share the same token stream. When an autonomous enterprise agent reads an external email, summarizes a web page, or queries a shared document repository, untrusted data enters the model’s reasoning context alongside privileged system instructions. A traditional Web Application Firewall (WAF) inspecting HTTP packets for SQL injection or cross-site scripting sees only benign natural language prose—even when that prose instructs the agent to exfiltrate sensitive records or invoke an internal administrative tool.',
      ],
    },
    {
      heading: '1.4 Engineering the Counteroffensive',
      paragraphs: [
        'Relying on a model’s system prompt ("Never reveal confidential data or call unauthorized tools") as a primary security boundary is the modern equivalent of client-side JavaScript validation. Probabilistic models require deterministic engineering guardrails.',
        'Throughout the eleven chapters of this book, we move systematically from threat analysis and attack-surface mapping to concrete architectural patterns—including AI Circuit Breakers, Shadow Evaluators, Retrieval Gatekeepers, and Sandboxed Tool Brokers—culminating in a practical 30/60/90-day counteroffensive playbook for enterprise security teams, product builders, and critical infrastructure operators.',
      ],
    },
  ],
};
