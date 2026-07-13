import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-8 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="0.5" y="0.5" width="31" height="31" className="fill-surface-2 stroke-line" />
                  <path d="M9 16 H23" strokeWidth="2" className="stroke-line-strong" />
                  <path d="M14.5 16 H22" strokeWidth="2" stroke="var(--accent)" />
                  <rect x="6.6" y="13.6" width="4.8" height="4.8" fill="var(--accent-2)" />
                  <rect x="20.6" y="13.6" width="4.8" height="4.8" fill="var(--accent)" />
                </svg>
                <span className="mono-label text-ink">maz.radwan</span>
              </div>
              <p className="prose-face mt-4 text-sm leading-relaxed text-muted">
                {SITE.role} — {SITE.focus}. Building AI-integrated enterprise systems for provincial
                healthcare.
              </p>
            </div>

            {/* Nav + connect */}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-14">
              <nav aria-label="Footer" className="flex flex-col gap-2.5">
                <span className="mono-label text-faint">navigate</span>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="mono-label text-muted transition-colors hover:text-ink"
                  >
                    <span className="text-faint">~/</span>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-2.5">
                <span className="mono-label text-faint">connect</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={SITE.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-label inline-flex items-center gap-2 border border-line px-2.5 py-1.5 text-muted transition-colors hover:border-accent/60 hover:text-ink"
                  >
                    <Github size={14} /> github
                  </a>
                  <a
                    href={SITE.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-label inline-flex items-center gap-2 border border-line px-2.5 py-1.5 text-muted transition-colors hover:border-accent/60 hover:text-ink"
                  >
                    <Linkedin size={14} /> linkedin
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="mono-label text-faint">
              <span className="bg-surface-2 px-1.5 py-0.5 text-muted">© {year}</span> {SITE.name}
            </p>
            <p className="mono-label text-faint">{SITE.location}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
