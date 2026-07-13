import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EvidenceLog } from "./EvidenceLog";
import { CAPABILITIES, CERTS, ABOUT_PROSE } from "@/data/site";

function Bars({ level }: { level: number }) {
  return (
    <>
      <span aria-hidden="true" className="tracking-[0.2em]">
        {[0, 1, 2].map((i) => (
          <span key={i} className={i < level ? "text-accent" : "text-faint-glyph"}>
            █
          </span>
        ))}
      </span>
      <span className="sr-only">depth {level} of 3</span>
    </>
  );
}

function Mark({ on, label }: { on: boolean; label: string }) {
  return (
    <>
      <span aria-hidden="true" className={on ? "text-accent" : "text-faint-glyph"}>
        {on ? "●" : "○"}
      </span>
      <span className="sr-only">
        {label}: {on ? "yes" : "no"}
      </span>
    </>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="eyebrow flex items-center gap-2 text-accent">
            <span className="text-faint-glyph">//</span> profile
          </div>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[1.9rem]">
            Enterprise systems, built through a disciplined agentic practice.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Evidence log — spans wider */}
          <Reveal className="lg:col-span-7">
            <div className="mono-label mb-4 text-faint">$ tail -f profile.evidence</div>
            <EvidenceLog />
          </Reveal>

          {/* Capability matrix */}
          <Reveal className="lg:col-span-5" delay={60}>
            <div className="mono-label mb-4 text-faint">$ capability --matrix</div>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="mono-label border-b border-line text-faint-glyph">
                  <th scope="col" className="py-2 text-left font-medium">capability</th>
                  <th scope="col" className="w-14 py-2 pl-5 text-left font-medium">core</th>
                  <th scope="col" className="w-16 py-2 text-center font-medium">shipped</th>
                  <th scope="col" className="w-16 py-2 text-center font-medium">current</th>
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((cap) => (
                  <tr key={cap.name} className="border-b border-line/60 align-top">
                    <td className="py-2.5 pr-4">
                      <div className="text-ink">{cap.name}</div>
                      <div className="mt-0.5 text-[11px] leading-relaxed text-faint">
                        {cap.tags.join(" · ")}
                      </div>
                    </td>
                    <td className="py-2.5 pl-5">
                      <Bars level={cap.level} />
                    </td>
                    <td className="py-2.5 text-center">
                      <Mark on={cap.shipped} label="shipped" />
                    </td>
                    <td className="py-2.5 text-center">
                      <Mark on={cap.current} label="current" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Certifications — audit register */}
          <Reveal className="lg:col-span-12" delay={80}>
            <div className="mono-label mb-4 text-faint">$ certs --audit</div>
            <div className="overflow-x-auto">
              <table data-testid="certs-table" className="w-full min-w-[34rem] text-[12.5px]">
                <thead>
                  <tr className="mono-label border-b border-line text-faint-glyph">
                    <th scope="col" className="py-2 pr-4 text-left font-medium">credential</th>
                    <th scope="col" className="py-2 pr-4 text-left font-medium">issuer</th>
                    <th scope="col" className="py-2 pr-4 text-left font-medium">year</th>
                    <th scope="col" className="py-2 text-left font-medium">state</th>
                  </tr>
                </thead>
                <tbody>
                  {CERTS.map((c, i) => {
                    const lastAws = c.aws && !CERTS[i + 1]?.aws;
                    const healthy = c.state === "ACTIVE" || c.state === "VERIFIED";
                    return (
                      <tr
                        key={c.credential}
                        className={`border-b ${lastAws ? "border-accent/40" : "border-line/60"}`}
                      >
                        <td className="py-2.5 pr-4 text-ink">{c.credential}</td>
                        <td className="py-2.5 pr-4 text-muted">{c.issuer}</td>
                        <td className="py-2.5 pr-4 text-faint tabular-nums">{c.year}</td>
                        <td className={`py-2.5 ${healthy ? "text-accent" : "text-muted"}`}>{c.state}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Full prose, tucked away */}
          <Reveal className="lg:col-span-12">
            <details className="group border-t border-line pt-5">
              <summary className="mono-label inline-flex cursor-pointer list-none items-center gap-2 text-faint transition-colors hover:text-ink">
                <span className="text-accent transition-transform group-open:rotate-90">▸</span>
                inspect full profile
              </summary>
              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                {ABOUT_PROSE.map((para) => (
                  <div key={para.label}>
                    <div className="mono-label mb-2 text-faint-glyph">{para.label}</div>
                    <p className="prose-face text-[14px] leading-relaxed text-muted">{para.body}</p>
                  </div>
                ))}
              </div>
            </details>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
