import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TermPane } from "@/components/ui/TermPane";
import { SITE } from "@/data/site";

const SPINNER = ["[-]", "[\\]", "[|]", "[/]"];

function PromptField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono-label mb-2 block text-faint">
        {label}
      </label>
      <div className="prompt-wrap flex items-stretch border border-line bg-bg/50 transition-colors focus-within:border-accent">
        <span className="flex select-none items-center gap-1 py-3 pl-3 text-faint" aria-hidden="true">
          &gt;<span className="prompt-cursor inline-block h-[1.05em] w-[0.5em] bg-transparent" />
        </span>
        {children}
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-transparent px-2 py-3 text-[14px] text-ink placeholder:text-faint-glyph focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [frame, setFrame] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (status !== "loading" || reduced) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 120);
    return () => clearInterval(id);
  }, [status, reduced]);

  const consoleLine =
    status === "loading"
      ? `${reduced ? ">" : SPINNER[frame]} transmitting`
      : status === "success"
        ? "> message sent · thank you"
        : status === "error"
          ? "> error: send failed · retry"
          : "> awaiting input";

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <div className="eyebrow flex items-center gap-2 text-accent">
              <span className="text-faint-glyph">//</span> contact
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Open a channel</h2>
            <p className="prose-face mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Hiring for enterprise, healthcare, or AI-engineering work? Send a note and I&apos;ll
              reply. You can also find me on GitHub and LinkedIn.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label text-muted transition-colors hover:text-accent"
              >
                open github{" "}
                <span className="text-faint-glyph" aria-hidden="true">↗</span>
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label text-muted transition-colors hover:text-accent"
              >
                open linkedin{" "}
                <span className="text-faint-glyph" aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <TermPane
              title="compose_message"
              status={
                <span className="mono-label flex items-center gap-2 text-faint">
                  <span className="h-[7px] w-[7px] bg-accent" aria-hidden="true" />
                  secure
                </span>
              }
              bodyClassName="p-5 sm:p-6"
            >
              <form
                name="contact"
                method="POST"
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus("loading");

                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  formData.append("form-name", "contact");
                  formData.append("bot-field", (formData.get("bot-field") as string) || "");

                  fetch("/__forms.html", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData as any).toString(),
                  })
                    .then(() => {
                      setStatus("success");
                      form.reset();
                    })
                    .catch(() => setStatus("error"));
                }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <PromptField id="name" label="name">
                    <input id="name" type="text" name="name" required className={inputClass} />
                  </PromptField>
                  <PromptField id="email" label="email">
                    <input id="email" type="email" name="email" required className={inputClass} />
                  </PromptField>
                </div>

                <PromptField id="message" label="message">
                  <textarea id="message" name="message" required rows={5} className={`${inputClass} resize-y`} />
                </PromptField>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <output
                    aria-live="polite"
                    className={`text-[12.5px] ${
                      status === "error"
                        ? "text-accent-2"
                        : status === "success"
                          ? "text-accent"
                          : "text-faint"
                    }`}
                  >
                    {consoleLine}
                  </output>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-[13px] font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <span className="text-on-accent/70" aria-hidden="true">
                      {status === "loading" ? (reduced ? ">" : SPINNER[frame]) : ">"}
                    </span>
                    {status === "loading" ? (reduced ? "SENDING" : "sending") : "send message"}
                  </button>
                </div>
              </form>
            </TermPane>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
