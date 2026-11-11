export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  platform: string;
  category: "Cybersecurity" | "AI Research" | "Engineering" | "Interviews";
  date: string;
  readTime: string;
  articleUrl: string;
  podcastUrl?: string;
  thumbnail?: string;
  featured?: boolean;
  tags: string[];
}

export const AUTHOR_BLOG_ARTICLES: BlogArticle[] = [
	{
		id: "forbes-autonomous-agents-cyber-defense",
		title: "Engineering Deterministic Guardrails for Autonomous AI Agents in the Enterprise",
		summary: "As enterprises transition from conversational copilots to tool-invoking autonomous agents, security architectures must evolve from polite system prompts to inline circuit breakers and intent-scoped OBO credentials.",
		platform: "Forbes Technology Council",
		category: "Cybersecurity",
		date: "2026",
		readTime: "6 min read",
		articleUrl: "https://www.forbes.com/councils/forbestechcouncil/people/harshverma/",
		featured: true,
		tags: [
			"Autonomous Agents",
			"Zero Trust",
			"Circuit Breakers",
			"Enterprise AI"
		]
	},
	{
		id: "rsa-ai-vs-ai-counteroffensive",
		title: "AI vs. AI: Defending Against Machine-Speed Reconnaissance and Indirect Prompt Injection",
		summary: "An architectural breakdown of how offensive AI compresses the exploit lifecycle and how defenders can deploy retrieval gatekeepers, provenance spotlighting, and out-of-band shadow evaluators.",
		platform: "RSA Conference",
		category: "Cybersecurity",
		date: "2026",
		readTime: "7 min read",
		articleUrl: "https://www.rsaconference.com/experts/Harsh%20Verma",
		featured: true,
		tags: [
			"RSA Conference",
			"Prompt Injection",
			"RAG Security",
			"Blue AI"
		]
	},
	{
		id: "raptors-trusted-ai-autonomous-agents",
		title: "Trusted AI in the Age of Autonomous Agents",
		summary: "Examines the transition of AI systems from passive tools into autonomous decision-making agents, analyzing emergent vulnerabilities across autonomy, orchestration, and trust dependencies.",
		platform: "The AI Journal",
		category: "AI Research",
		date: "2026",
		readTime: "9 min read",
		articleUrl: "https://proceedings.raptors.dev/verma-trusted-ai-autonomous-agents/",
		featured: true,
		tags: [
			"Multi-Agent Systems",
			"Trust Boundaries",
			"Observability",
			"DOI: 10.68495"
		]
	},
	{
		id: "hackernoon-confused-deputy-mcp-agents",
		title: "Solving the Confused Deputy Problem in Multi-Agent Tool Calling & MCP Topologies",
		summary: "Why static service accounts turn enterprise AI agents into privilege-escalation vectors—and how to implement sandboxed tool brokers with ephemeral On-Behalf-Of (OBO) token exchange.",
		platform: "HackerNoon",
		category: "Engineering",
		date: "2025",
		readTime: "8 min read",
		articleUrl: "https://www.harshverma.me/page-publications",
		featured: true,
		tags: [
			"OBO Identity",
			"Tool Broker",
			"Confused Deputy",
			"Agentic Mesh"
		]
	},
	{
		id: "forbes-self-healing-ai-resilience",
		title: "Beyond Model Accuracy: Designing Self-Healing AI Systems with Episodic Rollback",
		summary: "When vector indexes or agent memories are poisoned, container restarts are not enough. How to engineer AI-specific RTO/RPO, semantic honeytokens, and Merkle-epoch state recovery.",
		platform: "Forbes Technology Council",
		category: "Engineering",
		date: "2025",
		readTime: "6 min read",
		articleUrl: "https://www.forbes.com/councils/forbestechcouncil/people/harshverma/",
		tags: [
			"Self-Healing AI",
			"Vector Security",
			"Resilience",
			"CISO Playbook"
		]
	},
	{
		id: "founders-creative-journey-panw",
		title: "From Distributed Systems to Autonomous AI Defense: Inside the Engineering Journey",
		summary: "In-depth conversation on building high-throughput distributed systems, authoring 27+ research papers, advising deep-tech startups, and writing AI vs. AI: Engineering the Cybersecurity Counteroffensive.",
		platform: "Founders Creative",
		category: "Interviews",
		date: "2025",
		readTime: "10 min read",
		articleUrl: "https://www.harshverma.me/page-about",
		tags: [
			"Leadership",
			"Career Journey",
			"Author Interview",
			"AI Security"
		]
	}
];
