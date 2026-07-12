import { useState } from "react";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/data/site";

const fieldClass =
  "w-full rounded-[var(--radius-card)] border border-line bg-bg/50 px-3.5 py-3 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Invitation */}
          <Reveal>
            <div className="mono-label mb-4 flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              open channel
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Hiring for enterprise, healthcare, or AI-engineering work? Send a note and I&apos;ll
              reply. You can also find me on GitHub and LinkedIn.
            </p>

            <div className="mt-8 flex items-center gap-3">
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
            </div>
          </Reveal>

          {/* Secure channel form */}
          <Reveal delay={0.08}>
            <div className="rounded-[var(--radius-panel)] border border-line bg-surface/60 p-1">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="mono-label text-faint">compose message</span>
                <span className="mono-label flex items-center gap-2 text-accent">
                  <span className="pulse-dot" aria-hidden="true" />
                  secure
                </span>
              </div>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-5 p-5 sm:p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus("loading");

                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  formData.append("form-name", "contact");
                  formData.append("bot-field", (formData.get("bot-field") as string) || "");

                  fetch("/", {
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
                  <div>
                    <label htmlFor="name" className="mono-label mb-2 block text-faint">
                      name
                    </label>
                    <input id="name" type="text" name="name" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mono-label mb-2 block text-faint">
                      email
                    </label>
                    <input id="email" type="email" name="email" required className={fieldClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mono-label mb-2 block text-faint">
                    message
                  </label>
                  <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div aria-live="polite" className="mono-label">
                    {status === "success" && <span className="text-accent">message sent · thank you</span>}
                    {status === "error" && (
                      <span className="text-accent-2">send failed · please retry</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-2 rounded-[var(--radius-chip)] bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "loading" ? "Sending…" : "Send message"}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
