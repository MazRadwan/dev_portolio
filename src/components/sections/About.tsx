import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TermPane } from "@/components/ui/TermPane";
import { ABOUT } from "@/data/site";

function CertRow({ name, aws }: { name: string; aws: boolean }) {
  return (
    <div
      className={`flex items-baseline py-1.5 text-[13px] ${
        aws ? "-mx-2 border-l-2 border-accent bg-accent-soft px-2" : "px-2"
      }`}
    >
      <span className={`mr-2.5 shrink-0 ${aws ? "text-accent" : "text-faint"}`}>
        {aws ? "[★]" : "[ ]"}
      </span>
      <span className={aws ? "text-ink" : "text-muted"}>{name}</span>
      <span className="leader" aria-hidden="true" />
      <span className={`mono-label shrink-0 ${aws ? "text-accent" : "text-faint"}`}>
        {aws ? "active" : "verified"}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Marker + heading rail */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="mono-label flex items-center gap-2 text-accent">
                <span className="text-faint">//</span> profile
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[1.9rem]">
                Enterprise systems, built through a disciplined agentic practice.
              </h2>
            </Reveal>
          </div>

          {/* Records log */}
          <Reveal>
            <TermPane title="profile.log">
              {ABOUT.paras.map((para, i) => (
                <article key={para.label} className={`p-5 sm:p-6 ${i !== 0 ? "border-t border-line" : ""}`}>
                  <div className="mono-label text-faint">
                    <span className="text-accent">[{String(i + 1).padStart(2, "0")}]</span>{" "}
                    {para.label}
                  </div>
                  <p className="prose-face mt-3 text-[15px] leading-relaxed text-muted">{para.body}</p>
                </article>
              ))}
            </TermPane>
          </Reveal>
        </div>

        {/* Stack */}
        <Reveal className="mt-12">
          <div className="mono-label mb-4 text-faint">$ stack --list</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[13px] sm:grid-cols-3 lg:grid-cols-4">
            {ABOUT.chips.map((chip) => (
              <span key={chip} className="text-muted">
                <span className="text-faint">▪</span> {chip}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal className="mt-12">
          <div className="mono-label mb-4 text-faint">$ certs --list</div>
          <TermPane className="max-w-2xl" bodyClassName="p-4 sm:p-5">
            {ABOUT.certs.map((cert) => (
              <CertRow key={cert.name} name={cert.name} aws={cert.aws} />
            ))}
          </TermPane>
        </Reveal>
      </Container>
    </section>
  );
}
