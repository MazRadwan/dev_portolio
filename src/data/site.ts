export const SITE = {
  name: "Maz Radwan",
  role: "Senior Programmer / Analyst",
  focus: "AI-Integrated Enterprise Systems",
  location: "Newfoundland & Labrador, Canada",
  heroBio:
    "I build AI-integrated enterprise applications for provincial healthcare — compliance platforms, incident classification, and identity management — mostly backend and systems integration in .NET. I develop with a disciplined agentic practice: orchestrating specialized AI agents with Claude Code and Codex under spec-driven workflows and cross-model review gates.",
  social: {
    github: "https://github.com/MazRadwan",
    linkedin: "https://linkedin.com/in/maz-radwan",
  },
  title:
    "Maz Radwan — Senior Programmer/Analyst · AI-Integrated Enterprise Systems",
  description:
    "Senior Programmer/Analyst building AI-integrated enterprise systems for provincial healthcare. Disciplined agentic development with Claude Code and Codex. .NET, Azure, identity management, LLM security.",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// Hero "readout" telemetry — verified facts framed as console lines.
export const READOUT = [
  { key: "role", value: "Senior Programmer / Analyst" },
  { key: "domain", value: "Provincial healthcare · enterprise .NET" },
  { key: "focus", value: "Backend · systems integration · IAM" },
  { key: "practice", value: "Agentic · Claude Code · Codex" },
  { key: "security", value: "AI for Cybersecurity — 2026" },
] as const;

export const STATUS_CHIPS = [
  { label: "IDENTITY", state: "RESOLVING" },
  { label: "ACCESS", state: "ENFORCED" },
  { label: "AGENTS", state: "ONLINE" },
] as const;

// Identity lifecycle — the animated flow trace in the hero readout.
export const IDENTITY_FLOW = ["JOINER", "MOVER", "LEAVER"] as const;

export const ABOUT = {
  paras: [
    {
      label: "Role",
      body: "Senior Programmer/Analyst at a Newfoundland and Labrador provincial health authority, working in a large enterprise .NET codebase. I build full-stack, AI-integrated compliance and clinical-safety reporting systems, and I'm on the team building the internal enterprise identity & access management platform — primarily backend and systems integration across enterprise clinical and HR systems, with integration and deployment spanning Azure and AWS.",
    },
    {
      label: "Practice",
      body: "I run a disciplined multi-agent development methodology: an orchestrator that delegates to specialized subagents, spec-driven epic→sprint→story workflows, and cross-model adversarial review — Claude implements, GPT/Codex gates. It's backed by custom MCP servers, lifecycle-hook quality gates, and mandatory visual QA. I work fluently across agentic coding tools, Claude Code and Codex especially.",
    },
    {
      label: "Security",
      body: "Recently certified in AI for Cybersecurity, with hands-on LLM security work: prompt-injection and MCP tool-poisoning red-teaming, AI-assisted security review in CI, and custom SAST/secrets rules. The capstone found, exploited, fixed, and test-verified 12 vulnerabilities against a deliberately vulnerable app, including LLM-specific findings.",
    },
  ],
  chips: [
    "C# / .NET",
    "SQL Server",
    "Azure & Entra ID",
    "AWS",
    "gRPC",
    "REST APIs",
    "Node.js / TypeScript",
    "PostgreSQL",
    "Docker",
    "Claude Code",
    "Codex",
    "MCP",
    "React",
  ],
  // Order per spec; AWS certs get emphasis in the UI.
  certs: [
    { name: "AWS Solutions Architect", aws: true },
    { name: "AWS Developer Associate", aws: true },
    { name: "AWS Cloud Practitioner", aws: true },
    { name: "AI for Cybersecurity (techNL, 2026)", aws: false },
    { name: "ISTQB Certified Tester (QA/QC)", aws: false },
    { name: "EC-Council Cyber-Security Technician", aws: false },
  ],
} as const;

export type Project = {
  id: string;
  label: string;
  kind: "enterprise" | "open" | "method" | "security";
  title: string;
  summary: string;
  body: string;
  tags: string[];
  href?: string;
  hrefLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "CASE 01",
    label: "Enterprise · Private",
    kind: "enterprise",
    title: "Guardian — AI Governance & Clinical Incident Classification",
    summary:
      "AI platform assessing vendors against a 10-dimension risk rubric and classifying patient-safety incidents.",
    body: "Built for a provincial health authority. The LLM integration layer — streaming, tool use, vision, prompt caching — runs under a strict contract: the model proposes codes with confidence, deterministic code validates. Two deployment modes: cloud (Claude API) and fully on-prem, where the provider swaps to a local Qwen model via a LiteLLM proxy behind the same ~680-line SDK abstraction, so no patient data leaves the premises.",
    tags: ["TypeScript", "Next.js", "Express", "Postgres", "Claude API", "LiteLLM", "On-prem LLM"],
  },
  {
    id: "CASE 02",
    label: "Enterprise · Private",
    kind: "enterprise",
    title: "Enterprise Identity & Access Management",
    summary:
      "Core team member on a provincial health authority's internal IAM platform, built on .NET 9.",
    body: "Identity lifecycle (joiner-mover-leaver), Azure Entra External ID / B2B guest provisioning via Microsoft Graph, on-prem AD/LDAP provisioning, an identity resolution/dedup engine, privacy-legislation compliance gates, and gRPC service contracts. Recent win: diagnosed a December 2025 Microsoft change that broke B2B invitation email delivery and shipped the Graph API fix with a validated end-to-end onboarding POC.",
    tags: ["C#", ".NET 9", "Microsoft Graph", "Entra ID", "Active Directory", "gRPC", "SQL Server"],
  },
  {
    id: "CASE 03",
    label: "Open Source",
    kind: "open",
    title: "cursor-cli-mcp — Open-Source MCP Server",
    summary:
      "Published npm MCP server connecting any AI agent to every model in a Cursor subscription.",
    body: "Cross-model code review and prompting with no API keys required. Honest framing: a focused tool, not a platform.",
    tags: ["JavaScript", "MCP", "Node.js", "npm"],
    href: "https://github.com/MazRadwan/cursor-cli-mcp",
    hrefLabel: "View on GitHub",
  },
  {
    id: "CASE 04",
    label: "Methodology",
    kind: "method",
    title: "Agentic Development Methodology",
    summary:
      "The practice itself as a project: orchestrator agents, review swarms, and spec-driven delivery.",
    body: "State-machine orchestrator agents, role-specialized subagent teams, blocking hooks that force delegation, review swarms, Claude-implements / Codex-reviews sync gates, spec-driven epics, parallel git-worktree design exploration, and context-compaction survival. Applied across healthcare platforms, finance apps, and marketing sites — including building this site's variants in parallel worktrees with agent teams.",
    tags: ["Claude Code", "Codex", "MCP", "Orchestration", "Git worktrees", "Playwright QA"],
    href: "https://github.com/MazRadwan",
    hrefLabel: "GitHub profile",
  },
  {
    id: "CASE 05",
    label: "Security",
    kind: "security",
    title: "AI for Cybersecurity",
    summary:
      "LLM red-teaming, AI-assisted security review in CI, and a full vulnerable-app assessment.",
    body: "Prompt injection, MCP tool poisoning, and the \"lethal trifecta\"; AI-assisted security review in GitHub Actions; 15 custom Semgrep SAST rules plus 15 secrets/PII detectors; adversarial-ML data poisoning. Capstone: 12 vulnerabilities found, exploited, fixed, and test-verified — including LLM-specific findings like tool-calling data exfiltration, LLM-controlled path traversal, and unrestricted LLM-generated SQL.",
    tags: ["LLM Security", "Semgrep", "TruffleHog", "OWASP", "GitHub Actions", "Python"],
  },
];
