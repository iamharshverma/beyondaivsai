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
    "id": "forbes-physical-ai-is-coming-when-ai-stops-generating-content-and-st",
    "title": "Physical AI Is Coming: When AI Stops Generating Content And Starts Acting On The World",
    "summary": "Generative AI was defined by digital creation—LLMs generating text, summarizing data, and generating code where errors can be edited. Physical AI brings artificial intelligence into the real world through sensors and robotic actuation, where actions have irreversible physical consequences and there is no 'undo' button.",
    "platform": "Forbes Technology Council",
    "category": "AI Research",
    "date": "October 27, 2026",
    "readTime": "6 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/10/27/physical-ai-is-coming-when-ai-stops-generating-content-and-starts-acting-on-the-world/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-physical-ai.jpg",
    "featured": true,
    "tags": [
      "Forbes Tech Council",
      "Physical AI",
      "Robotics"
    ]
  },
  {
    "id": "forbes-the-real-ai-moat-why-models-are-cheap-but-data-orchestration",
    "title": "The Real AI Moat: Why Models Are Cheap But Data Orchestration Is Priceless",
    "summary": "As frontier models commoditize and open-source alternatives catch up, owning raw models offers little defensibility. The true enterprise AI moat lies in continuous data orchestration, clean operational governance, domain-specific data pipelines, and high-fidelity contextual retrieval.",
    "platform": "Forbes Technology Council",
    "category": "AI Research",
    "date": "October 2, 2026",
    "readTime": "6 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/10/02/the-real-ai-moat-why-models-are-cheap-but-data-orchestration-is-priceless/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-real-ai-moat.jpg",
    "featured": true,
    "tags": [
      "Forbes Tech Council",
      "Data Orchestration",
      "AI Moat"
    ]
  },
  {
    "id": "forbes-beyond-the-code-the-evolution-of-the-next-generation-engineer",
    "title": "Beyond The Code: The Evolution Of The Next-Generation Engineer",
    "summary": "As code generation becomes commoditized, the next generation of engineers will differentiate through systems architecture, deterministic safety guardrails, prompt unit economics, and holistic cognitive system design.",
    "platform": "Forbes Technology Council",
    "category": "Engineering",
    "date": "April 20, 2026",
    "readTime": "5 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/04/20/beyond-the-code-the-evolution-of-the-next-generation-engineer/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-beyond-code.jpg",
    "featured": true,
    "tags": [
      "Forbes Tech Council",
      "Next-Gen Engineer",
      "Systems Architecture"
    ]
  },
  {
    "id": "forbes-the-intelligence-per-dollar-metric-how-influential-leaders-me",
    "title": "The Intelligence Per Dollar Metric: How Influential Leaders Measure AI Success",
    "summary": "Moving past vanity parameter counts to evaluate enterprise AI investments through cost-performance efficiency, token ROI, deterministic output density, and measurable business throughput.",
    "platform": "Forbes Technology Council",
    "category": "AI Research",
    "date": "May 18, 2026",
    "readTime": "6 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/05/18/the-intelligence-per-dollar-metric-how-influential-leaders-measure-ai-success/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-intelligence-dollar.jpg",
    "featured": true,
    "tags": [
      "Forbes Tech Council",
      "AI ROI",
      "Unit Economics"
    ]
  },
  {
    "id": "forbes-personalized-ai-systems-the-hidden-trade-off-behind-smarter-a",
    "title": "Personalized AI Systems: The Hidden Trade-Off Behind Smarter AI (Personalization vs. Privacy)",
    "summary": "An architectural examination of the fundamental tension between contextual user personalization and enterprise zero-trust data privacy in modern retrieval and agent ecosystems.",
    "platform": "Forbes Technology Council",
    "category": "Cybersecurity",
    "date": "June 11, 2026",
    "readTime": "5 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/06/11/personalized-ai-systems-the-hidden-trade-off-behind-smarter-ai-personalization-vs-privacy/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-personalized-ai.jpg",
    "tags": [
      "Forbes Tech Council",
      "Privacy",
      "Personalization"
    ]
  },
  {
    "id": "forbes-your-first-ai-agent-is-an-experiment-not-a-product",
    "title": "Your First AI Agent Is An Experiment, Not A Product",
    "summary": "Autonomous agents behave like evolving operational actors rather than predictable static code. Why founders and enterprise teams must adopt bounded experimental sandboxes before productizing.",
    "platform": "Forbes Technology Council",
    "category": "AI Research",
    "date": "July 23, 2026",
    "readTime": "5 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/07/23/your-first-ai-agent-is-an-experiment-not-a-product/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-first-agent-experiment.jpg",
    "tags": [
      "Forbes Tech Council",
      "Agentic AI",
      "Product Strategy"
    ]
  },
  {
    "id": "forbes-engineering-the-predictable-why-pure-determinism-is-becoming",
    "title": "Engineering The Predictable: Why Pure Determinism Is Becoming The New Premium In AI Architecture",
    "summary": "In mission-critical enterprise environments, repeatability and mathematical predictability command a higher commercial premium than stochastic creativity. How to design deterministic control layers over generative models.",
    "platform": "Forbes Technology Council",
    "category": "Engineering",
    "date": "August 25, 2026",
    "readTime": "6 min read",
    "articleUrl": "https://www.forbes.com/councils/forbestechcouncil/2026/08/25/engineering-the-predictable-why-pure-determinism-is-becoming-the-new-premium-in-ai-architecture/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/forbes-pure-determinism.jpg",
    "featured": true,
    "tags": [
      "Forbes Tech Council",
      "Determinism",
      "AI Architecture"
    ]
  },
  {
    "id": "hn-the-production-gap-your-ai-model-isn-t-as-reliable-as-you-think",
    "title": "The Production Gap: Your AI Model Isn’t as Reliable as You Think [Feature Interview]",
    "summary": "In-depth HackerNoon interview breaking down the critical gap between benchmark performance and enterprise production reality, detailing architectural strategies for resilient model deployment.",
    "platform": "HackerNoon",
    "category": "AI Research",
    "date": "2026",
    "readTime": "8 min read",
    "articleUrl": "https://hackernoon.com/the-production-gap-your-ai-model-isnt-as-reliable-as-you-think-interview",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-interview.png",
    "featured": true,
    "tags": [
      "HackerNoon",
      "Interview",
      "AI Reliability"
    ]
  },
  {
    "id": "hn-identity-is-the-new-perimeter-managing-ai-agents-as-digital-acto",
    "title": "Identity Is the New Perimeter: Managing AI Agents as Digital Actors",
    "summary": "AI agents are transforming cybersecurity from network perimeter defenses to continuous identity-first authorization. Featured on HackerNoon's Cybersecurity Tech Brief podcast on Spotify.",
    "platform": "HackerNoon",
    "category": "Cybersecurity",
    "date": "2026",
    "readTime": "7 min read",
    "articleUrl": "https://hackernoon.com/identity-is-the-new-perimeter-managing-ai-agents-as-digital-actors",
    "podcastUrl": "https://open.spotify.com/episode/0aDrp6DxLSSlWQ6gwfbi0l",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-identity-perimeter.png",
    "featured": true,
    "tags": [
      "HackerNoon",
      "AI Security",
      "Identity Access"
    ]
  },
  {
    "id": "hn-the-clean-attack-problem-when-nothing-looks-wrong-but-everything",
    "title": "The Clean Attack Problem: When Nothing Looks Wrong, but Everything Is Compromised",
    "summary": "Modern cyber threats no longer trigger noisy alarms. By abusing authorized API credentials and valid business logic, AI-driven attacks operate entirely within legitimate parameters.",
    "platform": "HackerNoon",
    "category": "Cybersecurity",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/the-clean-attack-problem-when-nothing-looks-wrong-but-everything-is-compromised",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-clean-attack.png",
    "featured": true,
    "tags": [
      "HackerNoon",
      "Cybersecurity",
      "Zero Trust"
    ]
  },
  {
    "id": "hn-the-trade-off-between-speed-and-reliability-in-modern-ai-systems",
    "title": "The Trade-Off Between Speed and Reliability in Modern AI Systems",
    "summary": "'Move fast and break things' causes catastrophic failure in mission-critical AI. Why leading architectural teams prioritize deterministic verification over raw inference speed.",
    "platform": "HackerNoon",
    "category": "AI Research",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/the-trade-off-between-speed-and-reliability-in-modern-ai-systems",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-speed-reliability.png",
    "tags": [
      "HackerNoon",
      "AI Reliability",
      "Latency vs Quality"
    ]
  },
  {
    "id": "hn-ai-governance-is-failing-because-we-re-regulating-models-instead",
    "title": "AI Governance Is Failing Because We’re Regulating Models Instead of Behavior",
    "summary": "An analysis of why static model audits fail to capture multi-agent emergent behavior, and why runtime behavioral observability is the only defensible governance framework.",
    "platform": "HackerNoon",
    "category": "AI Research",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/ai-governance-is-failing-because-were-regulating-models-instead-of-behavior",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-governance.png",
    "tags": [
      "HackerNoon",
      "AI Governance",
      "Compliance"
    ]
  },
  {
    "id": "hn-the-observability-crisis-in-ai-systems-why-your-logs-are-lying-t",
    "title": "The Observability Crisis in AI Systems: Why Your Logs Are Lying to You",
    "summary": "Standard logging stacks report HTTP 200s while models silently hallucinate, leak context, and drift. How semantic telemetry and cognitive tracing resolve the observability gap.",
    "platform": "HackerNoon",
    "category": "AI Research",
    "date": "2026",
    "readTime": "7 min read",
    "articleUrl": "https://hackernoon.com/the-observability-crisis-in-ai-systems-why-your-logs-are-lying-to-you",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-observability.png",
    "tags": [
      "HackerNoon",
      "Observability",
      "Telemetry"
    ]
  },
  {
    "id": "hn-reputation-systems-for-ai-agents-the-missing-layer-of-trust",
    "title": "Reputation Systems for AI Agents: The Missing Layer of Trust",
    "summary": "Introducing behavioral scoring protocols and cryptographic audit trails to quantify trust before allowing autonomous agents to execute high-stakes cross-enterprise tasks.",
    "platform": "HackerNoon",
    "category": "AI Research",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/reputation-systems-for-ai-agents-the-missing-layer-of-trust",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-reputation.png",
    "tags": [
      "HackerNoon",
      "Trust Scores",
      "Multi-Agent"
    ]
  },
  {
    "id": "hn-distributed-intelligence-why-multi-agent-systems-are-the-success",
    "title": "Distributed Intelligence: Why Multi-Agent Systems Are the Successor to Microservices",
    "summary": "Just as microservices decomposed monolithic codebases, autonomous multi-agent networks are decomposing complex reasoning workflows into distributed, collaborative nodes.",
    "platform": "HackerNoon",
    "category": "Engineering",
    "date": "2026",
    "readTime": "7 min read",
    "articleUrl": "https://hackernoon.com/distributed-intelligence-why-multi-agent-systems-are-the-successor-to-microservices-for-enterprise",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-distributed-intelligence.png",
    "tags": [
      "HackerNoon",
      "Multi-Agent Systems",
      "Distributed Intelligence"
    ]
  },
  {
    "id": "hn-from-identity-to-intent-autonomous-ai-agents-are-the-new-insider",
    "title": "From Identity to Intent: Autonomous AI Agents Are the New Insider Threat",
    "summary": "When AI agents are granted access to internal production pipelines, authentication alone cannot prevent prompt injection or goal hijacking. We need continuous intent validation.",
    "platform": "HackerNoon",
    "category": "Cybersecurity",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/from-identity-to-intent-autonomous-ai-agents-are-the-new-insider-threat",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-identity-intent.png",
    "tags": [
      "HackerNoon",
      "Insider Threat",
      "Agent Security"
    ]
  },
  {
    "id": "hn-trust-scores-for-ai-should-agents-earn-permissions-over-time-tru",
    "title": "Trust Scores for AI: Should Agents Earn Permissions Over Time? Trust Isn’t Granted, It’s Earned",
    "summary": "A dynamic least-privilege architecture where autonomous digital actors start in sandboxed environments and earn higher API thresholds through validated track records.",
    "platform": "HackerNoon",
    "category": "Cybersecurity",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/trust-scores-for-ai-should-agents-earn-permissions-over-time-trust-isnt-granted-its-earned",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-trust-scores.png",
    "tags": [
      "HackerNoon",
      "Dynamic Permissions",
      "Least Privilege"
    ]
  },
  {
    "id": "hn-the-rise-of-the-ai-orchestrator-the-latest-most-important-enterp",
    "title": "The Rise of the AI Orchestrator: The Latest, Most Important Enterprise Role",
    "summary": "Enterprises don't struggle to access LLMs; they struggle to orchestrate multiple models, routing state, memory, tool executions, and security guardrails across departments.",
    "platform": "HackerNoon",
    "category": "Engineering",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/the-rise-of-the-ai-orchestrator-the-latest-most-important-enterprise-role",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-ai-orchestrator.png",
    "tags": [
      "HackerNoon",
      "AI Orchestration",
      "Enterprise Roles"
    ]
  },
  {
    "id": "hn-what-most-ai-startup-founders-get-wrong-about-ai-agents-the-auto",
    "title": "What Most AI Startup Founders Get Wrong About AI Agents: The Autonomy Trap",
    "summary": "Unconstrained autonomy produces brittle demos that collapse in real customer deployments. Why the most valuable agentic startups build scoped, deterministic workflows.",
    "platform": "HackerNoon",
    "category": "AI Research",
    "date": "2026",
    "readTime": "6 min read",
    "articleUrl": "https://hackernoon.com/what-most-ai-startup-founders-get-wrong-about-ai-agents-the-autonomy-trap",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-autonomy-trap.png",
    "tags": [
      "HackerNoon",
      "Startup Founders",
      "Autonomy Trap"
    ]
  },
  {
    "id": "rsac-the-clean-attack-problem-when-nothing-looks-wrong-but-everythin",
    "title": "The Clean Attack Problem: When Nothing Looks Wrong but Everything is Compromised",
    "summary": "Published on RSA Conference official library: How AI agents mimic legitimate human interactions, adapt to organizational context, and operate within approved API policies to evade legacy SOC detection.",
    "platform": "RSA Conference",
    "category": "Cybersecurity",
    "date": "August 2026",
    "readTime": "7 min read",
    "articleUrl": "https://www.rsaconference.com/library/blog/the-clean-attack-problem",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/hn-clean-attack.png",
    "featured": true,
    "tags": [
      "RSA Conference",
      "RSAC Expert",
      "Clean Attacks"
    ]
  },
  {
    "id": "rsac-the-death-of-authentication-why-identity-isn-t-enough-for-ai-sy",
    "title": "The Death of Authentication: Why Identity Isn't Enough for AI Systems",
    "summary": "Published on RSA Conference official library: For decades cybersecurity assumed verifying identity ensures legitimate behavior. In autonomous AI workflows, attacks happen with valid credentials and approved permissions. Why Zero Trust must evolve to continuous behavioral monitoring and runtime intent analysis.",
    "platform": "RSA Conference",
    "category": "AI Research",
    "date": "September 2026",
    "readTime": "8 min read",
    "articleUrl": "https://www.rsaconference.com/Library/blog/the-death-of-authentication-why-identity-isnt-enough-for-ai-systems",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/rsac-death-of-authentication.jpg",
    "featured": true,
    "tags": [
      "RSA Conference",
      "RSAC Expert",
      "Zero Trust"
    ]
  },
  {
    "id": "rsac-agents-don-t-break-rules-they-redefine-them",
    "title": "Agents Don't Break Rules, They Redefine Them",
    "summary": "Published on RSA Conference official library: Autonomous AI agents don't fail by breaking rules—they follow instructions literally while circumventing intent through blind optimization and policy drift. Why AI security requires continuous runtime governance instead of static boundaries.",
    "platform": "RSA Conference",
    "category": "Cybersecurity",
    "date": "September 24, 2026",
    "readTime": "7 min read",
    "articleUrl": "https://www.rsaconference.com/Library/blog/agents-dont-break-rules-they-redefine-them",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/rsac-agents-rules.jpg",
    "featured": true,
    "tags": [
      "RSA Conference",
      "RSAC Expert",
      "Agentic AI"
    ]
  },
  {
    "id": "aij-harsh-verma-publishes-nuanced-framework-on-rise-of-agentic-ai-an",
    "title": "Harsh Verma Publishes Nuanced Framework on Rise of Agentic AI and Enterprise System Era",
    "summary": "Argues that AI system architecture—context routing, deterministic verification, persistent memory, and latency orchestration—has decisively replaced raw model training as the primary core discipline.",
    "platform": "The AI Journal",
    "category": "AI Research",
    "date": "May 2026",
    "readTime": "6 min read",
    "articleUrl": "https://aijourn.com/harsh-verma-publishes-nuanced-framework-on-rise-of-agentic-ai-and-enterprise-system-era-arguing-ai-system-architecture-has-replaced-model-building-as-the-core-discipline/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/aij-agentic-framework.jpg",
    "featured": true,
    "tags": [
      "The AI Journal",
      "Agentic AI",
      "Enterprise Era"
    ]
  },
  {
    "id": "aij-how-ai-agents-will-collaborate-with-human-experts-in-high-stakes",
    "title": "How AI Agents Will Collaborate with Human Experts in High-Stakes Environments",
    "summary": "Analyzing how human-in-the-loop and human-on-the-loop protocols should be structured across high-consequence domains including automated threat response, medicine, and critical infrastructure.",
    "platform": "The AI Journal",
    "category": "AI Research",
    "date": "May 2026",
    "readTime": "6 min read",
    "articleUrl": "https://aijourn.com/how-ai-agents-will-collaborate-with-human-experts-in-high-stakes-environments/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/aij-high-stakes.jpg",
    "tags": [
      "The AI Journal",
      "Human-AI Collaboration",
      "High Stakes"
    ]
  },
  {
    "id": "aij-harsh-verma-on-engineering-beyond-the-code-the-future-of-ai-and",
    "title": "Harsh Verma on Engineering Beyond the Code: The Future of AI and Cybersecurity",
    "summary": "Featured conversation on the convergence of large-scale artificial intelligence, autonomous security operations, and the future career trajectory of AI systems engineers.",
    "platform": "The AI Journal",
    "category": "Interviews",
    "date": "March 2026",
    "readTime": "7 min read",
    "articleUrl": "https://aijourn.com/harsh-verma-on-engineering-beyond-the-code-the-future-of-ai-and-cybersecurity/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/aij-beyond-code.jpg",
    "tags": [
      "The AI Journal",
      "Feature Profile",
      "Cybersecurity"
    ]
  },
  {
    "id": "aij-principal-ai-engineer-harsh-verma-nominated-for-tech-excellence",
    "title": "Principal AI Engineer Harsh Verma Nominated for Tech Excellence Award at Influencer Magazine Awards 2026",
    "summary": "Coverage of Harsh Verma's nomination for Tech Excellence Award 2026, highlighting his research and architectural leadership in agentic trust models and enterprise human-AI collaboration.",
    "platform": "The AI Journal",
    "category": "Interviews",
    "date": "June 2026",
    "readTime": "4 min read",
    "articleUrl": "https://aijourn.com/principal-ai-engineer-harsh-verma-nominated-for-tech-excellence-award-at-influencer-magazine-awards-2026-as-his-work-on-human-ai-collaboration-gains-enterprise-attention/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/aij-nomination.jpg",
    "tags": [
      "The AI Journal",
      "Award Nomination",
      "Tech Excellence"
    ]
  },
  {
    "id": "aij-your-first-ai-agent-is-your-new-intern-here-s-how-to-manage-it",
    "title": "Your First AI Agent Is Your New Intern: Here’s How to Manage It",
    "summary": "A grounded leadership guide for managing AI agents: establishing bounded roles, implementing stage-gated code reviews, and avoiding delegation traps in engineering organizations.",
    "platform": "The AI Journal",
    "category": "AI Research",
    "date": "June 2026",
    "readTime": "5 min read",
    "articleUrl": "https://aijourn.com/your-first-ai-agent-is-your-new-intern-heres-how-to-manage-it/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/aij-intern-agent.png",
    "tags": [
      "The AI Journal",
      "Agent Management",
      "Leadership"
    ]
  },
  {
    "id": "aij-designing-the-intelligence-layer-why-future-tech-leaders-must-be",
    "title": "Designing the Intelligence Layer: Why Future Tech Leaders Must Be AI Architects First",
    "summary": "Why the modern CTO and VP of Engineering must evolve from managing cloud infrastructure to engineering the cognitive orchestration layer that powers all enterprise workflows.",
    "platform": "The AI Journal",
    "category": "Engineering",
    "date": "August 2026",
    "readTime": "6 min read",
    "articleUrl": "https://aijourn.com/designing-the-intelligence-layer-why-future-tech-leaders-must-be-ai-architects-first/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/aij-future-cto.png",
    "featured": true,
    "tags": [
      "The AI Journal",
      "CTO Architecture",
      "Intelligence Layer"
    ]
  },
  {
    "id": "fc-unlocking-corporate-startup-co-innovation-with-ai",
    "title": "Unlocking Corporate–Startup Co-Innovation with AI",
    "summary": "How enterprise corporations and agile venture-backed AI startups can build collaborative co-innovation loops, de-risking pilot integrations and unlocking rapid enterprise market validation.",
    "platform": "Founders Creative",
    "category": "Engineering",
    "date": "2026",
    "readTime": "5 min read",
    "articleUrl": "https://www.founderscreative.org/unlocking-corporate-startup-co-innovation-with-ai/",
    "thumbnail": "https://www.harshverma.me/images/blog/thumbnails/fc-co-innovation.png",
    "featured": true,
    "tags": [
      "Founders Creative",
      "Substack",
      "Corporate Innovation"
    ]
  },
  {
    "id": "medium-helm-with-yugabytedb-google-kubernetes-engine-gke-distributed",
    "title": "Helm with YugabyteDB: Google Kubernetes Engine (GKE) Distributed Deployment",
    "summary": "A comprehensive practical guide to managing distributed cloud-native relational databases on Google Kubernetes Engine (GKE) using Helm package management.",
    "platform": "Medium",
    "category": "Engineering",
    "date": "2021",
    "readTime": "8 min read",
    "articleUrl": "https://medium.com/@harshverma59/helm-with-yugabytedb-gke-google-kubernetes-engine-9099b62548cd",
    "thumbnail": "https://www.harshverma.me/images/blog/helm_blog.jpg",
    "tags": [
      "Medium",
      "Kubernetes",
      "GKE"
    ]
  }
];
