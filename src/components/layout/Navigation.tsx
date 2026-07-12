import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SITE } from "@/data/site";

function Monogram() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label={`${SITE.name} — home`}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-surface-2" />
        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" className="stroke-line" />
        <path d="M9 16 H23" strokeWidth="2" strokeLinecap="round" className="stroke-line-strong" />
        <path d="M14.5 16 H22" strokeWidth="2" strokeLinecap="round" stroke="var(--accent)" />
        <circle cx="9" cy="16" r="3.4" fill="var(--accent-2)" />
        <circle cx="23" cy="16" r="3.4" fill="var(--accent)" />
      </svg>
      <span className="mono-label text-ink transition-colors group-hover:text-accent">
        maz.radwan
      </span>
    </Link>
  );
}

export function Navigation({ isScrolled }: { isScrolled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Monogram />

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="mono-label rounded-[var(--radius-chip)] px-3 py-2 text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-chip)] border border-line bg-surface-2 text-muted"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col gap-1 border-t border-line pt-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mono-label rounded-[var(--radius-chip)] px-3 py-2.5 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
