import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroConsole } from "./HeroConsole";
import { SITE, PROOF_LINE } from "@/data/site";

/* Name cursor: blinks during the ~1.5s boot, settles to a steady underscore,
   then disappears. Decorative and JS-only — nothing renders without JS. */
function NameCursor() {
  const [phase, setPhase] = useState<"none" | "blink" | "steady">("none");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("blink");
    const t1 = setTimeout(() => setPhase("steady"), 1500);
    const t2 = setTimeout(() => setPhase("none"), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (phase === "none") return null;
  return <span aria-hidden="true" className={phase === "blink" ? "cursor-blink" : "cursor-steady"} />;
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-field absolute inset-0 [mask-image:radial-gradient(ellipse_75%_55%_at_60%_0%,black,transparent)]" />
        <div className="absolute -top-24 right-[-12%] h-[460px] w-[460px] bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)] blur-2xl" />
        <div className="absolute top-40 left-[-16%] h-[380px] w-[380px] bg-[radial-gradient(circle,var(--accent-2-soft),transparent_70%)] blur-2xl" />
      </div>

      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* Identity — unboxed command shell; the name breaks the terminal scale */}
          <Reveal>
            <div className="mono-label text-faint">$ whoami</div>
            <h1 className="mt-3 font-semibold leading-[0.98] tracking-tight text-ink [font-size:clamp(3.25rem,7vw,6.5rem)]">
              Maz Radwan
              <NameCursor />
            </h1>

            <p className="mt-5 text-sm text-muted sm:text-[15px]">
              senior programmer / analyst
              <span className="text-faint-glyph"> :: </span>
              <span className="text-accent">ai-integrated enterprise systems</span>
            </p>

            {/* immediate proof, directly under the title */}
            <ul className="mono-label mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-muted">
              {PROOF_LINE.map((item, i) => (
                <li key={item} className="flex items-center gap-2.5">
                  {i > 0 && (
                    <span className="text-faint-glyph" aria-hidden="true">
                      /
                    </span>
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="prose-face mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
              {SITE.heroBio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
              >
                <span
                  className="text-on-accent/70 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  &gt;_
                </span>
                view work
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <span
                  className="text-faint opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  &gt;_
                </span>
                get in touch
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label text-muted transition-colors hover:text-accent"
              >
                open github{" "}
                <span className="text-faint-glyph" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label text-muted transition-colors hover:text-accent"
              >
                open linkedin{" "}
                <span className="text-faint-glyph" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </Reveal>

          {/* Telemetry / state-machine console */}
          <Reveal className="h-full" delay={100}>
            <HeroConsole />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
