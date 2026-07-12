import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/data/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Header rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="mono-label mb-4 flex items-center gap-2.5 text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                profile
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                Enterprise systems, built with a disciplined agentic practice.
              </h2>
              <p className="mono-label mt-6 leading-relaxed text-faint">{ABOUT.credentials}</p>
            </Reveal>
          </div>

          {/* Records */}
          <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface/60">
            {ABOUT.paras.map((para, i) => (
              <Reveal key={para.label} delay={i * 0.06}>
                <article
                  className={`grid gap-3 p-6 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:p-7 ${
                    i !== 0 ? "border-t border-line" : ""
                  }`}
                >
                  <div className="mono-label pt-1 text-faint">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {para.label}
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted">{para.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <Reveal className="mt-14">
          <div className="mono-label mb-5 text-faint">stack · tooling</div>
          <div className="flex flex-wrap gap-2.5">
            {ABOUT.chips.map((chip) => (
              <span
                key={chip}
                className="mono-label rounded-[var(--radius-chip)] border border-line bg-surface-2 px-3 py-2 text-muted transition-colors hover:border-accent/40 hover:text-ink"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
