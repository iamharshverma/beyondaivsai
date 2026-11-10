export interface AttackSurfaceLayer {
  id: string;
  layerNumber: string;
  name: string;
  subtitle: string;
  components: string[];
  offensiveThreats: string[];
  defensiveControls: string[];
  humanOversightRole: string;
}

export interface SecurityDesignPattern {
  id: 'circuit-breaker' | 'shadow-evaluator' | 'retrieval-gatekeeper' | 'sandboxed-tool-broker';
  name: string;
  tagline: string;
  architecturalPlacement: string;
  latencyProfile: string;
  securityRole: string;
  threatMitigated: string;
  mechanismSteps: string[];
  failureModeHandling: string;
  humanApprovalTrigger: string;
}

export const TRIAD_PILLARS = [
  {
    id: 'weapon',
    label: 'Offensive AI Dimension',
    title: 'AI as Weapon',
    accentColor: '#F05252',
    summary:
      'AI-assisted reconnaissance, contextual deception, spear-phishing synthesis, polymorphic content generation, and task automation across the intrusion lifecycle.',
    capabilities: [
      'Automated open-source intelligence (OSINT) aggregation and organizational profiling',
      'Context-aware spear-phishing and synthetic voice/identity impersonation',
      'Iterative vulnerability probing and adaptive payload mutation against APIs',
      'Multi-agent task chaining that compresses reconnaissance-to-exploitation timelines',
    ],
    engineeringReality:
      'Offensive AI does not magically bypass strong cryptography, but it dramatically lowers the cost and latency of targeted reconnaissance, social engineering, and continuous probing.',
  },
  {
    id: 'target',
    label: 'Attack Surface Dimension',
    title: 'AI as Target',
    accentColor: '#37D5F5',
    summary:
      'Models, training and fine-tuning data, prompts, Retrieval-Augmented Generation (RAG) pipelines, autonomous agents, APIs, connected tools, and underlying infrastructure.',
    capabilities: [
      'Direct and indirect prompt injection via untrusted documents, emails, and web content',
      'RAG knowledge base poisoning, embedding manipulation, and cross-tenant context leakage',
      'Confused deputy privilege escalation in autonomous tool calling and multi-agent delegation',
      'Model supply-chain tampering, insecure adapters, and unbounded token/compute exhaustion',
    ],
    engineeringReality:
      'Because language models process instructions and untrusted data in a single token stream, traditional perimeter firewalls cannot distinguish benign prose from embedded adversarial directives.',
  },
  {
    id: 'shield',
    label: 'Defensive AI Dimension',
    title: 'AI as Shield',
    accentColor: '#3478F6',
    summary:
      'AI-assisted anomaly detection, telemetry correlation, automated adversarial red teaming, semantic policy evaluation, and policy-bound defensive response.',
    capabilities: [
      'Continuous automated red-teaming harnesses that probe models and agents before production release',
      'Inline and shadow semantic evaluators that audit prompts, reasoning traces, and tool arguments',
      'Evidence-grounded SOC investigation co-pilots that synthesize logs with verifiable trace citations',
      'Self-healing containment loops with episodic state rollback and human-in-the-loop approval gates',
    ],
    engineeringReality:
      'Defensive AI is most effective when paired with deterministic architectural wrappers—never as an unchecked black box making unilateral high-consequence decisions.',
  },
];

export const ATTACK_SURFACE_LAYERS: AttackSurfaceLayer[] = [
  {
    id: 'application',
    layerNumber: 'Layer 01',
    name: 'Application & Interaction Layer',
    subtitle: 'User Interfaces, Chat/Copilot Endpoints, System Prompts & Session State',
    components: ['Web/Mobile AI Interfaces', 'System Prompt Templates', 'Conversation Memory', 'Output Renderers (Markdown/HTML/Code)'],
    offensiveThreats: [
      'Direct prompt injection and multi-turn jailbreak framing',
      'Insecure output handling leading to client-side XSS or SSRF via rendered links/markdown',
      'Session state manipulation across multi-turn conversations',
    ],
    defensiveControls: [
      'Strict input schema validation and structural separation of system vs. user turns',
      'Content-Security-Policy (CSP) and sanitization on all rendered model outputs',
      'Session-scoped rate quotas and anomaly velocity tracking',
    ],
    humanOversightRole: 'Clear UI provenance indicators showing when actions require explicit user confirmation.',
  },
  {
    id: 'model',
    layerNumber: 'Layer 02',
    name: 'Model & Reasoning Layer',
    subtitle: 'Foundation Models, Fine-Tuned Weights, Adapters, Tokenizers & Agent Planners',
    components: ['Foundation LLMs', 'LoRA / Fine-Tuned Adapters', 'Reasoning / Planning Loops', 'Guardrail Classifiers'],
    offensiveThreats: [
      'Goal hijacking inside multi-step ReAct or autonomous planning loops',
      'Training/fine-tuning data poisoning and backdoor trigger insertion',
      'Token exhaustion (sponge attacks) and unbounded recursive reasoning loops',
    ],
    defensiveControls: [
      'Inline AI Circuit Breakers capping reasoning depth, token budgets, and semantic drift',
      'Independent Shadow Evaluators auditing reasoning traces outside the primary model context',
      'Cryptographic provenance verification (signing/hashing) of model weights and adapters',
    ],
    humanOversightRole: 'Red-team calibration of model safety thresholds before model version promotion.',
  },
  {
    id: 'data-knowledge',
    layerNumber: 'Layer 03',
    name: 'Data, Retrieval & Knowledge Layer',
    subtitle: 'Vector Databases, RAG Pipelines, Document Ingestors, Embeddings & Caches',
    components: ['Document Parsers & Chunkers', 'Embedding Models', 'Vector Indices', 'Semantic Caches'],
    offensiveThreats: [
      'Indirect prompt injection embedded in external PDFs, emails, tickets, or web pages',
      'RAG corpus poisoning to manipulate retrieval ranking or inject false facts',
      'Cross-tenant data leakage via ACL-unaware vector similarity searches or shared semantic caches',
    ],
    defensiveControls: [
      'Retrieval Gatekeeper enforcing document-level ACLs at query time before context assembly',
      'Data provenance tagging and instructional stripping on untrusted external chunks',
      'Per-tenant cryptographic namespace isolation in vector stores and caches',
    ],
    humanOversightRole: 'Curated knowledge base governance and quarantine review for flagged external data sources.',
  },
  {
    id: 'infrastructure',
    layerNumber: 'Layer 04',
    name: 'Tools, APIs & Infrastructure Layer',
    subtitle: 'MCP Servers, Function Calling, Agent Delegation, Cloud Compute & Egress Networks',
    components: ['Tool / Function Registries', 'Sub-Agent Delegation Buses', 'Sandboxed Containers', 'AI Gateway & GPU Runtime'],
    offensiveThreats: [
      'Confused deputy attacks coercing agents into calling privileged internal APIs',
      'Arbitrary code execution or shell escape in code-interpreter/tool environments',
      'Unauthorized data exfiltration over unrestricted network egress channels',
    ],
    defensiveControls: [
      'Sandboxed Tool Broker enforcing strict JSON schema validation and ephemeral least-privilege scopes',
      'On-Behalf-Of (OBO) cryptographic token delegation tied to the human user’s identity',
      'Zero-egress network defaults with explicit domain allowlists inside ephemeral microVMs',
    ],
    humanOversightRole: 'Mandatory human-in-the-loop step-up approval for state-mutating, financial, or destructive tool calls.',
  },
  {
    id: 'governance',
    layerNumber: 'Layer 05',
    name: 'Governance, Telemetry & Human Layer',
    subtitle: 'Audit Lineage, Incident Response, Shadow AI Discovery, Compliance & Operator Controls',
    components: ['Telemetry Lineage Store', 'Human Approval Console', 'Shadow AI Inventory', 'AI Incident Runbooks'],
    offensiveThreats: [
      'Automation bias tricking human operators into rubber-stamping malicious agent proposals',
      'Unmonitored Shadow AI SaaS integrations bypassing enterprise DLP and logging',
      'Log tampering or insufficient lineage preventing post-incident forensic reconstruction',
    ],
    defensiveControls: [
      'Immutable prompt-to-action lineage graphs capturing retrieved chunk IDs and tool arguments',
      'Continuous automated red-teaming and tabletop breach simulations',
      'Tiered autonomy fallback modes allowing instant downgrade to deterministic rules',
    ],
    humanOversightRole: 'Executive CISO/CTO governance charter, incident command authority, and audit verification.',
  },
];

export const FOUR_SECURITY_PATTERNS: SecurityDesignPattern[] = [
  {
    id: 'circuit-breaker',
    name: 'Circuit Breaker',
    tagline: 'Real-Time Runtime Interception & Runaway Loop Containment',
    architecturalPlacement: 'Inline between the Agent Reasoning Loop, Model Inference Stream, and Downstream Execution Bus',
    latencyProfile: 'Sub-5ms deterministic counters + ~15–30ms fast embedding/classifier drift check',
    securityRole:
      'Monitors ongoing model generation and multi-step agent trajectories in real time, immediately tripping to halt execution when policy invariants, recursion limits, token budgets, or anomaly thresholds are breached.',
    threatMitigated:
      'Runaway autonomous agent loops, denial-of-wallet token exhaustion, iterative jailbreak probing, and rapid multi-tool privilege escalation.',
    mechanismSteps: [
      '1. Intercept every reasoning step, token chunk, and proposed tool call before downstream dispatch.',
      '2. Evaluate deterministic invariants (step count <= maxSteps, cumulative cost <= budget, tool transition graph validity).',
      '3. Compute semantic drift score against the user’s original verified intent envelope.',
      '4. If threshold is violated, trip breaker to OPEN state: terminate generation, revoke active ephemeral tokens, and route to safe fallback.',
    ],
    failureModeHandling: 'Fails closed to a deterministic static response or human escalation queue while preserving an immutable snapshot for triage.',
    humanApprovalTrigger: 'Required to reset a tripped session breaker when high-severity policy violations or repeated anomalies occur.',
  },
  {
    id: 'shadow-evaluator',
    name: 'Shadow Evaluator',
    tagline: 'Independent Semantic Policy Verification & Out-of-Band Auditing',
    architecturalPlacement: 'Parallel sidecar (asynchronous or pre-commit barrier) isolated from the primary model’s context window',
    latencyProfile: '0ms added latency in async audit mode; ~40–90ms in pre-commit barrier mode for high-risk actions',
    securityRole:
      'Uses an independent, smaller, policy-specialized verifier model (with zero access to tools and a separate system prompt) to inspect inputs, retrieved context, and proposed outputs for policy violations or hijacked intent.',
    threatMitigated:
      'Prompt injection bypassing the primary model’s instructions, subtle PII/secret exfiltration in generated responses, and semantic misalignment.',
    mechanismSteps: [
      '1. Mirror the user prompt, retrieved context metadata, and candidate model output/tool proposal to an isolated evaluation enclave.',
      '2. Run structured policy verification using a dedicated classifier/evaluator that never executes untrusted instructions.',
      '3. For read-only low-risk turns, log evaluation scores asynchronously and trip the session Circuit Breaker if compromise is detected.',
      '4. For state-mutating actions, act as a synchronous pre-commit barrier before the Sandboxed Tool Broker executes.',
    ],
    failureModeHandling: 'If the Shadow Evaluator times out on a high-risk action, execution pauses and defaults to explicit human operator review.',
    humanApprovalTrigger: 'Triggered when the Shadow Evaluator flags medium-to-high semantic ambiguity between user intent and proposed agent action.',
  },
  {
    id: 'retrieval-gatekeeper',
    name: 'Retrieval Gatekeeper',
    tagline: 'ACL-Enforced Context Assembly & Indirect Injection Defense',
    architecturalPlacement: 'Between Vector/Knowledge Databases, External Connectors, and the Model Context Assembler',
    latencyProfile: '~10–25ms per retrieval batch for ACL verification, provenance tagging, and injection scanning',
    securityRole:
      'Ensures an AI system only retrieves documents the invoking human user is authorized to read, strips or flags adversarial instruction patterns in untrusted chunks, and wraps retrieved data in strict data-only delimiters.',
    threatMitigated:
      'Cross-tenant RAG data leakage, unauthorized access to restricted internal documents, and indirect prompt injection from external files/emails.',
    mechanismSteps: [
      '1. Verify the caller’s cryptographic identity token and inject mandatory ACL filter predicates into the vector/hybrid query.',
      '2. Assign trust-level provenance tags to each retrieved chunk (e.g., VERIFIED_INTERNAL_POLICY vs. UNTRUSTED_EXTERNAL_EMAIL).',
      '3. Scan untrusted chunks for imperative instruction patterns, hidden unicode characters, and canary token tampering.',
      '4. Encapsulate surviving chunks in spotlighted data delimiters so the model treats them strictly as passive reference data.',
    ],
    failureModeHandling: 'Drops any chunk lacking verified ACL entitlement or failing injection sanitization, logging the document ID to security telemetry.',
    humanApprovalTrigger: 'Quarantined external documents require security analyst or document-owner review before re-indexing.',
  },
  {
    id: 'sandboxed-tool-broker',
    name: 'Sandboxed Tool Broker',
    tagline: 'Capability-Scoped Mediation & Isolated Execution for Agent Actions',
    architecturalPlacement: 'Mandatory mediation gateway between the AI Agent Planner and all internal/external APIs, databases, and code environments',
    latencyProfile: '~5–15ms policy & schema validation + ephemeral microVM/container execution time',
    securityRole:
      'Prevents the AI model from ever holding raw API keys or direct network access. Every tool request is validated against strict schemas, scoped to the user’s On-Behalf-Of permissions, and executed in an isolated sandbox.',
    threatMitigated:
      'Confused deputy privilege escalation, arbitrary code/command execution, unauthorized database mutation, and covert network exfiltration.',
    mechanismSteps: [
      '1. Receive structured tool invocation request (tool name + typed JSON parameters) from the agent orchestrator.',
      '2. Validate parameters against strict JSON schemas, allowlisted patterns, and semantic policy rules from the Shadow Evaluator.',
      '3. Mint a short-lived On-Behalf-Of (OBO) credential scoped strictly to the intersection of the human user’s role and the specific task.',
      '4. Execute the action inside an isolated, network-restricted sandbox and sanitize the returned payload before passing results back.',
    ],
    failureModeHandling: 'Rejects any malformed, out-of-scope, or unauthorized tool call without exposing internal stack traces or credentials.',
    humanApprovalTrigger: 'Enforces a hard cryptographic step-up approval gate for high-consequence tools (data deletion, external email/webhook dispatch, IAM changes, financial transfers).',
  },
];

export const RESILIENCE_PHASES = [
  {
    phase: '01. Detect',
    title: 'Runtime Telemetry & Semantic Honeytokens',
    description:
      'Instrument every layer with structured lineage logs and embed canary honeytokens inside RAG corpora and tool registries. Any attempt to invoke a decoy tool or exfiltrate a canary string provides an immediate, zero-false-positive compromise signal.',
  },
  {
    phase: '02. Contain',
    title: 'Automated Blast-Radius Isolation',
    description:
      'Trip the inline Circuit Breaker to freeze the affected session, revoke short-lived On-Behalf-Of tokens at the Sandboxed Tool Broker, and quarantine the suspect document chunk or external connector.',
  },
  {
    phase: '03. Recover',
    title: 'Episodic Memory Rollback & Clean-State Restoration',
    description:
      'Revert stateful agent memory to the last verified pre-contamination checkpoint, execute compensating transactions for reversible state changes, and fall back to deterministic rule-based workflows.',
  },
  {
    phase: '04. Adapt',
    title: 'Adversarial Harness Updating & Policy Hardening',
    description:
      'Convert the captured attack trajectory into a permanent regression test inside the automated red-teaming suite and update Shadow Evaluator classifiers across the fleet.',
  },
];
