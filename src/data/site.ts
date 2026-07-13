export const SITE = {
  name: "Maz Radwan",
  role: "Senior Programmer / Analyst",
  focus: "AI-Integrated Enterprise Systems",
  location: "Newfoundland & Labrador, Canada",
  // Two lines — proof up front; agentic-methodology detail lives in the About inspection.
  heroBio:
    "I build AI-integrated enterprise systems for provincial healthcare — compliance, incident classification, and identity management. Backend and systems integration, mostly .NET.",
  social: {
    github: "https://github.com/MazRadwan",
    linkedin: "https://linkedin.com/in/maz-radwan",
  },
  title: "Maz Radwan — Senior Programmer/Analyst · AI-Integrated Enterprise Systems",
  description:
    "Senior Programmer/Analyst building AI-integrated enterprise systems for provincial healthcare. Disciplined agentic development with Claude Code and Codex. .NET, Azure, identity management, LLM security.",
} as const;

// Immediate proof, shown directly under the hero title.
export const PROOF_LINE = ["PROVINCIAL HEALTHCARE", "IAM", "12 VULNS VERIFIED", "3 AWS CERTS"] as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// Hero evidence ledger — verified facts, printed during boot then persistent.
export const READOUT = [
  { key: "role", value: "Senior Programmer / Analyst" },
  { key: "domain", value: "Provincial healthcare · enterprise .NET" },
  { key: "focus", value: "Backend · systems integration · IAM" },
  { key: "practice", value: "Agentic · Claude Code · Codex" },
  { key: "security", value: "AI for Cybersecurity · 12 vulns verified" },
] as const;

// IAM lifecycle state machine.
export const IDENTITY_FLOW = ["JOINER", "MOVER", "LEAVER"] as const;
export const LIFECYCLE_STATUS = ["INGESTING", "RESOLVING", "PROVISIONING", "ENFORCED"] as const;

// Subsystem table (SUBSYSTEM / PHASE / RESULT) — replaces bracket "badges".
export const SUBSYSTEMS = [
  { name: "identity", phase: "resolve", result: "ok" },
  { name: "access", phase: "enforce", result: "ok" },
  { name: "agents", phase: "orchestrate", result: "online" },
] as const;

// Cycling proof channel — a highlighted row moves down the ledger; values stay visible.
export const PROOF_CHANNEL = [
  { key: "CASE_FILES", value: "05" },
  { key: "VULNS_FIXED", value: "12" },
  { key: "AWS_CERTS", value: "03" },
  { key: "DEPLOY_MODE", value: "CLOUD | ON_PREM" },
] as const;

// About evidence log — deterministic sequence timestamps, not fake real-time data.
export const EVIDENCE_LOG = [
  { t: "09:14:03", tag: "ROLE", text: "provincial healthcare / senior programmer / analyst" },
  { t: "09:14:04", tag: "IAM", text: "joiner-mover-leaver / Graph / AD / LDAP / dedup" },
  { t: "09:14:04", tag: "AGENTS", text: "Claude implements / Codex gates / MCP servers" },
  { t: "09:14:05", tag: "SECURITY", text: "12 vulnerabilities found + exploited + fixed + verified" },
  { t: "09:14:05", tag: "DEPLOY", text: "Azure + AWS + fully on-prem model paths" },
  { t: "09:14:06", tag: "STACK", text: ".NET 9 / gRPC / Entra ID / SQL Server / Postgres" },
  { t: "09:14:06", tag: "CERTS", text: "3x AWS + AI-for-cybersecurity + ISTQB + EC-Council" },
] as const;

// Full explanatory prose, kept for the <details> "inspect full profile" disclosure.
export const ABOUT_PROSE = [
  {
    label: "role",
    body: "Senior Programmer/Analyst at a Newfoundland and Labrador provincial health authority, working in a large enterprise .NET codebase. I build full-stack, AI-integrated compliance and clinical-safety reporting systems, and I'm on the team building the internal enterprise identity & access management platform — primarily backend and systems integration across enterprise clinical and HR systems, with integration and deployment spanning Azure and AWS.",
  },
  {
    label: "practice",
    body: "I run a disciplined multi-agent development methodology: an orchestrator that delegates to specialized subagents, spec-driven epic→sprint→story workflows, and cross-model adversarial review — Claude implements, GPT/Codex gates. It's backed by custom MCP servers, lifecycle-hook quality gates, and mandatory visual QA. I work fluently across agentic coding tools, Claude Code and Codex especially.",
  },
  {
    label: "security",
    body: "Recently certified in AI for Cybersecurity, with hands-on LLM security work: prompt-injection and MCP tool-poisoning red-teaming, AI-assisted security review in CI, and custom SAST/secrets rules. The capstone found, exploited, fixed, and test-verified 12 vulnerabilities against a deliberately vulnerable app, including LLM-specific findings.",
  },
] as const;

// Capability matrix — categories with depth (core), shipped, and current markers.
export type Capability = {
  name: string;
  level: 1 | 2 | 3; // depth: 3 = core strength
  shipped: boolean; // production work shipped
  current: boolean; // actively used now
  tags: string[];
};

export const CAPABILITIES: Capability[] = [
  { name: ".NET / C#", level: 3, shipped: true, current: true, tags: ["C# / .NET 9", "gRPC", "REST APIs"] },
  { name: "identity / access", level: 3, shipped: true, current: true, tags: ["Entra ID", "Microsoft Graph", "AD / LDAP"] },
  { name: "agentic tooling", level: 3, shipped: true, current: true, tags: ["Claude Code", "Codex", "MCP", "orchestration"] },
  { name: "LLM systems", level: 2, shipped: true, current: true, tags: ["Claude API", "LiteLLM", "on-prem LLM"] },
  { name: "data", level: 2, shipped: true, current: true, tags: ["SQL Server", "PostgreSQL"] },
  { name: "cloud", level: 2, shipped: true, current: true, tags: ["Azure", "AWS", "Docker"] },
  { name: "web", level: 2, shipped: true, current: false, tags: ["Node.js / TypeScript", "React", "Next.js"] },
  { name: "security", level: 2, shipped: true, current: true, tags: ["LLM red-teaming", "Semgrep", "OWASP"] },
];

// Certifications — dense audit register (credential / issuer / year / state).
export type Cert = { credential: string; issuer: string; year: string; state: string; aws: boolean };

export const CERTS: Cert[] = [
  { credential: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2024", state: "ACTIVE", aws: true },
  { credential: "AWS Developer Associate", issuer: "Amazon Web Services", year: "2025", state: "ACTIVE", aws: true },
  { credential: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", state: "ACTIVE", aws: true },
  { credential: "AI for Cybersecurity", issuer: "techNL", year: "2026", state: "VERIFIED", aws: false },
  { credential: "ISTQB Certified Tester (QA/QC)", issuer: "ISTQB", year: "—", state: "CERTIFIED", aws: false },
  { credential: "EC-Council Cyber-Security Technician", issuer: "EC-Council", year: "2024", state: "CERTIFIED", aws: false },
];

export type Project = {
  id: string;
  meta: string; // metadata header text, e.g. "access: private" / "type: open_source"
  kind: "enterprise" | "open" | "method" | "security";
  instrument: "schematic" | "lifecycle" | "package" | "pipeline" | "ledger";
  title: string;
  summary: string;
  body: string;
  tags: string[];
  href?: string;
  hrefLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "CASE_01",
    meta: "access: private · enterprise",
    kind: "enterprise",
    instrument: "schematic",
    title: "Guardian — AI Governance & Clinical Incident Classification",
    summary:
      "AI platform assessing vendors against a 10-dimension risk rubric and classifying patient-safety incidents.",
    body: "Built for a provincial health authority. The LLM integration layer — streaming, tool use, vision, prompt caching — runs under a strict contract: the model proposes codes with confidence, deterministic code validates. Two deployment modes: cloud (Claude API) and fully on-prem, where the provider swaps to a local Qwen model via a LiteLLM proxy behind the same ~680-line SDK abstraction, so no patient data leaves the premises.",
    tags: ["TypeScript", "Next.js", "Express", "Postgres", "Claude API", "LiteLLM", "On-prem LLM"],
  },
  {
    id: "CASE_02",
    meta: "access: private · enterprise",
    kind: "enterprise",
    instrument: "lifecycle",
    title: "Enterprise Identity & Access Management",
    summary:
      "Core team member on a provincial health authority's internal IAM platform, built on .NET 9.",
    body: "Identity lifecycle (joiner-mover-leaver), Azure Entra External ID / B2B guest provisioning via Microsoft Graph, on-prem AD/LDAP provisioning, an identity resolution/dedup engine, privacy-legislation compliance gates, and gRPC service contracts. Recent win: diagnosed a December 2025 Microsoft change that broke B2B invitation email delivery and shipped the Graph API fix with a validated end-to-end onboarding POC.",
    tags: ["C#", ".NET 9", "Microsoft Graph", "Entra ID", "Active Directory", "gRPC", "SQL Server"],
  },
  {
    id: "CASE_03",
    meta: "type: open_source",
    kind: "open",
    instrument: "package",
    title: "cursor-cli-mcp — Open-Source MCP Server",
    summary:
      "Published npm MCP server connecting any AI agent to every model in a Cursor subscription.",
    body: "Cross-model code review and prompting with no API keys required. Honest framing: a focused tool, not a platform.",
    tags: ["JavaScript", "MCP", "Node.js", "npm"],
    href: "https://github.com/MazRadwan/cursor-cli-mcp",
    hrefLabel: "open repository",
  },
  {
    id: "CASE_04",
    meta: "type: methodology",
    kind: "method",
    instrument: "pipeline",
    title: "Agentic Development Methodology",
    summary:
      "The practice itself as a project: orchestrator agents, review swarms, and spec-driven delivery.",
    body: "State-machine orchestrator agents, role-specialized subagent teams, blocking hooks that force delegation, review swarms, Claude-implements / Codex-reviews sync gates, spec-driven epics, parallel git-worktree design exploration, and context-compaction survival. Applied across healthcare platforms, finance apps, and marketing sites — including building this site's variants in parallel worktrees with agent teams.",
    tags: ["Claude Code", "Codex", "MCP", "Orchestration", "Git worktrees", "Playwright QA"],
    href: "https://github.com/MazRadwan",
    hrefLabel: "open profile",
  },
  {
    id: "CASE_05",
    meta: "type: security",
    kind: "security",
    instrument: "ledger",
    title: "AI for Cybersecurity",
    summary:
      "LLM red-teaming, AI-assisted security review in CI, and a full vulnerable-app assessment.",
    body: "Prompt injection, MCP tool poisoning, and the \"lethal trifecta\"; AI-assisted security review in GitHub Actions; 15 custom Semgrep SAST rules plus 15 secrets/PII detectors; adversarial-ML data poisoning. Capstone: 12 vulnerabilities found, exploited, fixed, and test-verified — including LLM-specific findings like tool-calling data exfiltration, LLM-controlled path traversal, and unrestricted LLM-generated SQL.",
    tags: ["LLM Security", "Semgrep", "TruffleHog", "OWASP", "GitHub Actions", "Python"],
  },
];

// Findings ledger for the security case instrument (verified capstone results).
export const SECURITY_FINDINGS = [
  { id: "F-01", finding: "tool-calling data exfiltration", severity: "llm", state: "fixed" },
  { id: "F-02", finding: "LLM-controlled path traversal", severity: "llm", state: "fixed" },
  { id: "F-03", finding: "unrestricted LLM-generated SQL", severity: "llm", state: "fixed" },
  { id: "F-04", finding: "prompt injection / lethal trifecta", severity: "llm", state: "fixed" },
  { id: "F-05", finding: "MCP tool poisoning", severity: "llm", state: "fixed" },
  { id: "···", finding: "+ 7 further web/app vulnerabilities", severity: "app", state: "fixed" },
] as const;
