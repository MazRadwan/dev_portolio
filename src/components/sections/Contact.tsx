import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TermPane, LiveTag } from "@/components/ui/TermPane";
import { SITE } from "@/data/site";

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
      <div className="flex border border-line bg-bg/50 transition-colors focus-within:border-accent">
        <span className="select-none py-3 pl-3 text-faint" aria-hidden="true">
          &gt;
        </span>
        {children}
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-transparent px-2.5 py-3 text-[14px] text-ink placeholder:text-faint focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Invitation */}
          <Reveal>
            <div className="mono-label flex items-center gap-2 text-accent">
              <span className="text-faint">//</span> contact
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Open a channel
            </h2>
            <p className="prose-face mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Hiring for enterprise, healthcare, or AI-engineering work? Send a note and I&apos;ll
              reply. You can also find me on GitHub and LinkedIn.
            </p>

            <div className="mt-8 flex items-center gap-2.5">
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

          {/* Terminal form */}
          <Reveal delay={0.08}>
            <TermPane title="compose_message" status={<LiveTag label="secure" />} bodyClassName="p-5 sm:p-6">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-5"
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
                  <div aria-live="polite" className="text-[13px]">
                    {status === "success" && (
                      <span className="text-accent">&gt; message sent · thank you</span>
                    )}
                    {status === "error" && (
                      <span className="text-accent-2">&gt; error: send failed · retry</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <span className="text-on-accent/70">▸</span>
                    {status === "loading" ? "sending…" : "send message"}
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
