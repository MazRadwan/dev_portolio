import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TermPane } from "@/components/ui/TermPane";
import { PROJECTS, type Project } from "@/data/site";

// Duotone: coral marks restricted/alert work, teal marks open systems.
const KIND_ACCENT: Record<Project["kind"], string> = {
  enterprise: "text-accent-2",
  security: "text-accent-2",
  open: "text-accent",
  method: "text-accent",
};

function LabelTag({ project }: { project: Project }) {
  return (
    <span className="mono-label whitespace-nowrap">
      <span className="text-faint">[ </span>
      <span className={KIND_ACCENT[project.kind]}>{project.label}</span>
      <span className="text-faint"> ]</span>
    </span>
  );
}

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[3.5rem_1fr] gap-1 sm:grid-cols-[4rem_1fr]">
      <dt className="text-faint">{k}</dt>
      <dd className="text-muted">
        <span className="text-faint">: </span>
        {children}
      </dd>
    </div>
  );
}

function Fields({ project }: { project: Project }) {
  return (
    <dl className="space-y-1.5 text-[12.5px]">
      <Field k="stack">{project.tags.join(" · ")}</Field>
      {project.href ? (
        <Field k="repo">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            → {project.href.replace(/^https?:\/\//, "")}
          </a>
        </Field>
      ) : (
        <Field k="access">
          {project.kind === "enterprise" ? "private engagement" : "case study"}
        </Field>
      )}
    </dl>
  );
}

function FeatureCard({ project }: { project: Project }) {
  return (
    <TermPane as="article" title={project.id} status={<LabelTag project={project} />}>
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_1fr] lg:gap-9">
        <div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
            {project.title}
          </h3>
          <p className="prose-face mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        </div>
        <div className="flex flex-col gap-5 lg:border-l lg:border-line lg:pl-9">
          <p className="prose-face text-sm leading-relaxed text-muted">{project.body}</p>
          <Fields project={project} />
        </div>
      </div>
    </TermPane>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TermPane
      as="article"
      className="h-full"
      title={project.id}
      status={<LabelTag project={project} />}
      bodyClassName="flex flex-col p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">{project.title}</h3>
      <p className="prose-face mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
      <p className="prose-face mt-3 text-[13.5px] leading-relaxed text-muted/85">{project.body}</p>
      <div className="mt-auto pt-5">
        <Fields project={project} />
      </div>
    </TermPane>
  );
}

export function Projects() {
  const [feature, ...rest] = PROJECTS;

  return (
    <section id="projects" className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <Container>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mono-label flex items-center gap-2 text-accent">
              <span className="text-faint">//</span> selected work
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Case files</h2>
          </div>
          <p className="mono-label text-faint">{PROJECTS.length} records</p>
        </Reveal>

        <div className="space-y-5">
          <Reveal>
            <FeatureCard project={feature} />
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
