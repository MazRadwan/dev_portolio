import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { HeroConsole } from "./HeroConsole";
import { SITE, PROOF_LINE } from "@/data/site";

const FULL_NAME = "Maz Radwan";

/*
  Looping type-out of the identity. Progressive enhancement: the full name is
  real text in the SSR HTML (an invisible in-flow sizer reserves the box, and
  the visible span starts at the full name), so no-JS / first paint / SEO all
  get the complete name. The loop runs only after hydration and pauses when the
  tab is hidden. The h1's accessible name is fixed via aria-label, so a screen
  reader never hears a partial name. Reduced motion = static full name, no cursor.
*/
function NameType() {
  const [text, setText] = useState(FULL_NAME);
  const [active, setActive] = useState(false);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(true);
    setHolding(true);

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = FULL_NAME.length;
    let mode: "backspace" | "type" | "hold" = "backspace";
    const rand = (a: number, b: number) => Math.round(a + Math.random() * (b - a));
    const schedule = (ms: number) => {
      timer = setTimeout(step, ms);
    };

    function step() {
      if (cancelled) return;
      if (document.hidden) {
        schedule(500); // paused while the tab is hidden
        return;
      }
      if (mode === "backspace") {
        if (i > 0) {
          i -= 1;
          setText(FULL_NAME.slice(0, i));
          schedule(rand(30, 42));
        } else {
          mode = "type";
          schedule(280);
        }
      } else if (mode === "type") {
        if (i < FULL_NAME.length) {
          i += 1;
          setText(FULL_NAME.slice(0, i));
          setHolding(false);
          schedule(rand(55, 85));
        } else {
          mode = "hold";
          setHolding(true);
          schedule(6500);
        }
      } else {
        mode = "backspace";
        setHolding(false);
        schedule(0);
      }
    }

    // Boot choreography: the name sits full for ~1.9s, then the loop begins.
    schedule(1900);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <h1
      aria-label={FULL_NAME}
      className="relative mt-3 font-semibold leading-[0.98] tracking-tight text-ink [font-size:clamp(3.25rem,7vw,6.5rem)]"
    >
      {/* in-flow sizer reserves the full box so typing never reflows the page */}
      <span aria-hidden="true" className="invisible">
        {FULL_NAME}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {text}
        {active && <span className={holding ? "cursor-blink" : "cursor-solid"} />}
      </span>
    </h1>
  );
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
          {/* Identity — unboxed command shell; the name types on a loop */}
          <div>
            <div className="mono-label text-faint">$ whoami</div>
            <NameType />

            <p className="prose-face mt-6 max-w-xl text-[1.05rem] font-medium leading-snug text-ink sm:text-[1.18rem]">
              {SITE.heroThesis}
            </p>
            <p className="prose-face mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
              {SITE.heroSupport}
            </p>

            {/* immediate proof line */}
            <ul className="mono-label mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-muted">
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
          </div>

          {/* Telemetry / state-machine console */}
          <div className="h-full">
            <HeroConsole />
          </div>
        </div>
      </Container>
    </section>
  );
}
