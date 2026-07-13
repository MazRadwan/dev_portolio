import { Github, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TermPane, LiveTag } from "@/components/ui/TermPane";
import { SITE, READOUT, STATUS_CHIPS, IDENTITY_FLOW } from "@/data/site";

function BracketStatus({ label, state }: { label: string; state: string }) {
  return (
    <span className="mono-label whitespace-nowrap">
      <span className="text-faint">[ </span>
      <span className="text-muted">{label}</span>
      <span className="text-faint">: </span>
      <span className="text-accent">{state}</span>
      <span className="text-faint"> ]</span>
    </span>
  );
}

function Readout() {
  return (
    <TermPane title="readout" className="h-full" bodyClassName="flex flex-col gap-5 p-4 sm:p-5">
      {/* Aligned key : value ledger */}
      <dl className="space-y-1.5 text-[13px]">
        {READOUT.map((row) => (
          <div key={row.key} className="grid grid-cols-[5rem_1fr] items-baseline gap-1 sm:grid-cols-[6rem_1fr]">
            <dt className="text-faint">{row.key}</dt>
            <dd className="text-ink">
              <span className="text-faint">: </span>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Identity lifecycle — ASCII pipeline with a traveling signal */}
      <div>
        <div className="mono-label mb-2.5 text-faint">identity_lifecycle</div>
        <div className="relative flex items-center justify-between text-[13px]">
          <span
            className="absolute inset-x-1 top-1/2 -translate-y-1/2 border-t border-dashed border-line"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-y-1/2 bg-accent shadow-[0_0_8px_1px_var(--accent)]"
            style={{ animation: "tui-trace 4.5s var(--ease-console) infinite" }}
          />
          {IDENTITY_FLOW.map((stage) => (
            <span key={stage} className="relative z-10 bg-surface px-1.5 text-muted">
              <span className="text-faint">[</span> {stage} <span className="text-faint">]</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bracketed statuses */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
        {STATUS_CHIPS.map((chip) => (
          <BracketStatus key={chip.label} label={chip.label} state={chip.state} />
        ))}
      </div>

      {/* On-prem guarantee — a real property of the work */}
      <div className="mt-auto border-l-2 border-accent-2 pl-3 text-[13px] text-muted">
        <span className="text-accent-2">▪ </span>on-prem mode:{" "}
        <span className="text-ink">no patient data leaves the premises.</span>
      </div>
    </TermPane>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-field absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_62%_0%,black,transparent)]" />
        <div className="absolute -top-24 right-[-12%] h-[480px] w-[480px] bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)] blur-2xl" />
        <div className="absolute top-40 left-[-16%] h-[400px] w-[400px] bg-[radial-gradient(circle,var(--accent-2-soft),transparent_70%)] blur-2xl" />
      </div>

      <Container>
        <TermPane title="identity-access-console" status={<LiveTag />}>
          <div className="grid gap-9 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-11">
            {/* Identity */}
            <Reveal>
              <div className="mono-label text-faint">$ whoami</div>
              <h1 className="mt-2 text-[2.5rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-[3.25rem]">
                Maz Radwan
                <span className="block-cursor" aria-hidden="true" />
              </h1>

              <p className="mt-4 text-sm text-muted sm:text-[15px]">
                senior programmer / analyst
                <span className="text-faint"> :: </span>
                <span className="text-accent">ai-integrated enterprise systems</span>
              </p>

              <div className="mono-label mt-5 inline-flex items-center gap-2.5 text-muted">
                <span className="pulse-sq" aria-hidden="true" />
                online — {SITE.location}
              </div>

              <p className="prose-face mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
                {SITE.heroBio}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-on-accent/70">▸</span> view work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="text-faint">▸</span> get in touch
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href={SITE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label inline-flex items-center gap-2 border border-line px-3 py-2 text-muted transition-colors hover:border-accent/60 hover:text-ink"
                >
                  <Github size={15} /> github
                </a>
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label inline-flex items-center gap-2 border border-line px-3 py-2 text-muted transition-colors hover:border-accent/60 hover:text-ink"
                >
                  <Linkedin size={15} /> linkedin
                </a>
              </div>
            </Reveal>

            {/* Signature readout */}
            <Reveal className="h-full" delay={120}>
              <Readout />
            </Reveal>
          </div>
        </TermPane>
      </Container>
    </section>
  );
}
