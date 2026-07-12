import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-10 py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect width="32" height="32" rx="8" className="fill-surface-2" />
                  <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" className="stroke-line" />
                  <path d="M9 16 H23" strokeWidth="2" strokeLinecap="round" className="stroke-line-strong" />
                  <path d="M14.5 16 H22" strokeWidth="2" strokeLinecap="round" stroke="var(--accent)" />
                  <circle cx="9" cy="16" r="3.4" fill="var(--accent-2)" />
                  <circle cx="23" cy="16" r="3.4" fill="var(--accent)" />
                </svg>
                <span className="mono-label text-ink">maz.radwan</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {SITE.role} — {SITE.focus}. Building AI-integrated enterprise systems for provincial
                healthcare.
              </p>
            </div>

            {/* Nav + social */}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
              <nav aria-label="Footer" className="flex flex-col gap-3">
                <span className="mono-label text-faint">navigate</span>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3">
                <span className="mono-label text-faint">connect</span>
                <div className="flex items-center gap-3">
                  <a
                    href={SITE.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-chip)] border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github size={16} />
                  </a>
                  <a
                    href={SITE.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-chip)] border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="mono-label text-faint">© {year} {SITE.name}</p>
            <p className="mono-label text-faint">built with next.js · tailwind css</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
