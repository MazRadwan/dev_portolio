import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE, READOUT, STATUS_CHIPS, IDENTITY_FLOW } from "@/data/site";

function Readout() {
  const reduce = useReducedMotion();

  return (
    <div className="relative rounded-[var(--radius-panel)] border border-line bg-surface/80 p-1 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_24px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="mono-label text-faint">identity · access · readout</span>
        <span className="mono-label flex items-center gap-2 text-accent">
          <span className="pulse-dot" aria-hidden="true" />
          live
        </span>
      </div>

      <div className="space-y-5 p-4 sm:p-5">
        {/* Status chips */}
        <div className="flex flex-wrap gap-2">
          {STATUS_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="mono-label inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line bg-surface-2 px-2.5 py-1.5 text-faint"
            >
              {chip.label}
              <span className="text-accent">{chip.state}</span>
            </span>
          ))}
        </div>

        {/* Credential telemetry */}
        <dl className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg/40">
          {READOUT.map((row, i) => (
            <div
              key={row.key}
              className={`flex items-baseline gap-3 px-3.5 py-2.5 ${
                i !== 0 ? "border-t border-line" : ""
              }`}
            >
              <dt className="mono-label w-20 shrink-0 text-faint">{row.key}</dt>
              <dd className="text-sm text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        {/* Identity lifecycle flow trace */}
        <div>
          <div className="mono-label mb-2.5 text-faint">identity lifecycle</div>
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-line" aria-hidden="true" />
            {!reduce && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]"
                style={{ animation: "relay-trace 4.5s var(--ease-console) infinite" }}
              />
            )}
            {IDENTITY_FLOW.map((stage) => (
              <span
                key={stage}
                className="mono-label relative z-10 rounded-[var(--radius-chip)] border border-line bg-surface-2 px-2.5 py-1.5 text-muted"
              >
                {stage}
              </span>
            ))}
          </div>
        </div>

        {/* On-prem guarantee — a real property of the work */}
        <div className="flex items-center gap-2.5 rounded-[var(--radius-card)] border border-accent-2/25 bg-[var(--accent-2-soft)] px-3.5 py-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
          <span className="text-sm text-muted">
            On-prem mode: <span className="text-ink">no patient data leaves the premises.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Ambient console field */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-field absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_0%,black,transparent)]" />
        <div className="absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)] blur-2xl" />
        <div className="absolute top-40 left-[-15%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--accent-2-soft),transparent_70%)] blur-2xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Identity statement */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="mono-label mb-6 inline-flex items-center gap-2.5 text-muted">
              <span className="pulse-dot" aria-hidden="true" />
              online · {SITE.location}
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl"
            >
              {SITE.name}
            </motion.h1>

            <motion.p variants={item} className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
              <span className="text-ink">{SITE.role}</span>
              <span className="text-faint"> — </span>
              <span className="text-accent">{SITE.focus}</span>
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
              {SITE.heroBio}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-[var(--radius-chip)] bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
              >
                View my work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-3">
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-chip)] border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                <span className="sr-only">GitHub</span>
                <Github size={18} />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-chip)] border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Signature: the ops readout */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Readout />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
