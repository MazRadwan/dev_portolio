import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, type Project } from "@/data/site";

// Duotone rhythm: coral marks restricted / alert work, cyan marks open systems.
const KIND_ACCENT: Record<Project["kind"], string> = {
  enterprise: "text-accent-2",
  security: "text-accent-2",
  open: "text-accent",
  method: "text-accent",
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="mono-label rounded-[var(--radius-chip)] border border-line bg-surface-2 px-2.5 py-1.5 text-faint"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function CardHead({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="mono-label text-faint">{project.id}</span>
      <span className={`mono-label ${KIND_ACCENT[project.kind]}`}>{project.label}</span>
    </div>
  );
}

function CardLink({ project }: { project: Project }) {
  if (!project.href) {
    return (
      <span className="mono-label text-faint">
        {project.kind === "enterprise" ? "Private engagement" : "Case study"}
      </span>
    );
  }
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link mono-label inline-flex items-center gap-1.5 text-accent transition-colors hover:text-ink"
    >
      {project.hrefLabel}
      <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}

function FeatureCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface/60 p-6 transition-colors hover:border-line-strong sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div className="flex flex-col">
          <CardHead project={project} />
          <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-auto pt-6">
            <CardLink project={project} />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:border-l lg:border-line lg:pl-10">
          <p className="text-sm leading-relaxed text-muted">{project.body}</p>
          <Tags tags={project.tags} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-surface/60 p-6 transition-colors hover:border-line-strong">
      <CardHead project={project} />
      <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-ink">
        {project.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted/85">{project.body}</p>
      <div className="mt-5">
        <Tags tags={project.tags} />
      </div>
      <div className="mt-auto pt-6">
        <CardLink project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  const [feature, ...rest] = PROJECTS;

  return (
    <section id="projects" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <Container>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mono-label mb-4 flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              selected work
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Case files
            </h2>
          </div>
          <p className="mono-label text-faint">{PROJECTS.length} records</p>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <FeatureCard project={feature} />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
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
