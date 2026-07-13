import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, IDENTITY_FLOW, SECURITY_FINDINGS, type Project } from "@/data/site";

// teal = open/available, coral = restricted / security-sensitive
const metaColor: Record<Project["kind"], string> = {
  enterprise: "text-accent-2",
  security: "text-accent-2",
  open: "text-accent",
  method: "text-accent",
};

function MetaHead({ project }: { project: Project }) {
  return (
    <div className="mono-label mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span className="text-faint-glyph">{project.id}</span>
      <span className="text-faint-glyph" aria-hidden="true">·</span>
      <span className={metaColor[project.kind]}>{project.meta}</span>
    </div>
  );
}

function CommandLink({ project }: { project: Project }) {
  if (!project.href) return null;
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mono-label mt-5 inline-flex items-center gap-1.5 text-accent transition-colors hover:text-ink"
    >
      {project.hrefLabel}
      <span
        className="text-faint-glyph transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}

/* --- instruments (one per case) --- */

function Schematic() {
  return (
    <div className="mt-5 border-t border-line pt-5 text-[12.5px]">
      <div className="text-muted">
        model proposes codes + confidence <span className="text-faint-glyph" aria-hidden="true">→</span>{" "}
        <span className="text-ink">deterministic code validates</span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-l-2 border-accent pl-3">
          <div className="mono-label text-accent">▸ cloud</div>
          <div className="mt-1.5 text-ink">Claude API</div>
          <div className="text-faint">streaming · tools · vision · prompt cache</div>
        </div>
        <div className="border-l-2 border-accent-2 pl-3">
          <div className="mono-label text-accent-2">▸ on_prem</div>
          <div className="mt-1.5 text-ink">LiteLLM proxy → local Qwen</div>
          <div className="text-faint">~680-line SDK abstraction · zero data egress</div>
        </div>
      </div>
    </div>
  );
}

function LifecycleInstrument() {
  return (
    <div className="mt-5 border-t border-line pt-5 text-[12.5px]">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-accent">
        {IDENTITY_FLOW.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span>
              <span aria-hidden="true">✓ </span>
              {s}
            </span>
            {i < IDENTITY_FLOW.length - 1 && (
              <span className="text-faint-glyph" aria-hidden="true">
                ──▶
              </span>
            )}
          </span>
        ))}
      </div>
      <dl className="mt-3 space-y-1 text-muted">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-faint">provision</dt>
          <dd>Entra ID · Microsoft Graph · AD / LDAP</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-faint">resolve</dt>
          <dd>identity resolution / dedup engine</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-faint">gate</dt>
          <dd>privacy-legislation compliance · gRPC contracts</dd>
        </div>
      </dl>
    </div>
  );
}

function PackageInstrument() {
  return (
    <div className="mt-5 border-t border-line pt-5 text-[12.5px]">
      <div className="text-faint">
        <span className="text-accent">$</span> npx cursor-cli-mcp
      </div>
      <div className="mt-2 space-y-1 text-muted">
        <div>
          <span className="text-accent" aria-hidden="true">▪</span> mcp server ready
        </div>
        <div>
          <span className="text-accent" aria-hidden="true">▪</span> models: cursor subscription{" "}
          <span className="text-faint-glyph">·</span> api keys: none
        </div>
        <div>
          <span className="text-accent" aria-hidden="true">▪</span> published on npm
        </div>
      </div>
    </div>
  );
}

function PipelineInstrument() {
  return (
    <div className="mt-5 border-t border-line pt-5 text-[12.5px] text-muted">
      <div className="text-ink">orchestrator</div>
      <div className="mt-1 space-y-1">
        <div>
          <span className="text-faint-glyph" aria-hidden="true">├─</span> delegates{" "}
          <span className="text-faint-glyph" aria-hidden="true">→</span> role-specialized subagents
        </div>
        <div>
          <span className="text-faint-glyph" aria-hidden="true">├─</span> sync gate{" "}
          <span className="text-faint-glyph" aria-hidden="true">→</span> Claude implements / Codex reviews
        </div>
        <div>
          <span className="text-faint-glyph" aria-hidden="true">└─</span> hooks{" "}
          <span className="text-faint-glyph" aria-hidden="true">→</span> blocking delegation gates
        </div>
      </div>
      <div className="mt-2 text-faint">spec-driven epics · git-worktrees · Playwright QA</div>
    </div>
  );
}

function LedgerInstrument() {
  return (
    <div className="mt-5 border-t border-line pt-5 text-[12px]">
      <table className="w-full">
        <tbody>
          {SECURITY_FINDINGS.map((f) => (
            <tr key={f.id} className="border-b border-line/50 last:border-0">
              <td className="py-1 pr-3 text-faint tabular-nums">{f.id}</td>
              <td className="py-1 text-muted">{f.finding}</td>
              <td className="py-1 text-right text-accent">
                <span aria-hidden="true">✓ </span>
                {f.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 text-faint">12 found · exploited · fixed · test-verified</div>
    </div>
  );
}

function Instrument({ project }: { project: Project }) {
  switch (project.instrument) {
    case "schematic":
      return <Schematic />;
    case "lifecycle":
      return <LifecycleInstrument />;
    case "package":
      return <PackageInstrument />;
    case "pipeline":
      return <PipelineInstrument />;
    case "ledger":
      return <LedgerInstrument />;
  }
}

function ProjectArticle({ project, feature = false }: { project: Project; feature?: boolean }) {
  if (feature) {
    return (
      <article className="border border-line p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <MetaHead project={project} />
            <h3 className="text-xl font-semibold leading-snug tracking-tight text-ink">{project.title}</h3>
            <p className="prose-face mt-4 text-[15px] leading-relaxed text-muted">{project.summary}</p>
            <p className="prose-face mt-3 text-[13.5px] leading-relaxed text-muted/85">{project.body}</p>
          </div>
          <div className="lg:border-l lg:border-line lg:pl-12">
            <Instrument project={project} />
            <CommandLink project={project} />
          </div>
        </div>
      </article>
    );
  }
  return (
    <article className="flex h-full flex-col border border-line p-6">
      <MetaHead project={project} />
      <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">{project.title}</h3>
      <p className="prose-face mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
      <p className="prose-face mt-3 text-[13.5px] leading-relaxed text-muted/85">{project.body}</p>
      <Instrument project={project} />
      <CommandLink project={project} />
    </article>
  );
}

export function Projects() {
  const [guardian, iam, cursor, method, security] = PROJECTS;

  return (
    <section id="projects" className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <Container>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow flex items-center gap-2 text-accent">
              <span className="text-faint-glyph">//</span> selected work
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Case files</h2>
          </div>
          <p className="mono-label text-faint">{PROJECTS.length} records</p>
        </Reveal>

        <div className="space-y-5">
          <Reveal>
            <ProjectArticle project={guardian} feature />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <ProjectArticle project={iam} />
            </Reveal>
            <Reveal delay={60}>
              <ProjectArticle project={security} />
            </Reveal>
            <Reveal>
              <ProjectArticle project={cursor} />
            </Reveal>
            <Reveal delay={60}>
              <ProjectArticle project={method} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
