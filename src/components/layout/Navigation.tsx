import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SITE } from "@/data/site";

function Monogram() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name} — home`}>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="31" height="31" className="fill-surface-2 stroke-line" />
        <path d="M9 16 H23" strokeWidth="2" className="stroke-line-strong" />
        <path d="M14.5 16 H22" strokeWidth="2" stroke="var(--accent)" />
        <rect x="6.6" y="13.6" width="4.8" height="4.8" fill="var(--accent-2)" />
        <rect x="20.6" y="13.6" width="4.8" height="4.8" fill="var(--accent)" />
      </svg>
      <span className="mono-label text-ink transition-colors group-hover:text-accent">maz.radwan</span>
    </Link>
  );
}

export function Navigation({ isScrolled }: { isScrolled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Monogram />

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="mono-label px-2.5 py-2 text-muted transition-colors hover:text-ink"
              >
                <span className="text-faint">~/</span>
                {item.label}
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-line" aria-hidden="true" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-8 w-8 items-center justify-center border border-line bg-surface-2 text-muted"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="pb-3 md:hidden">
            <div className="flex flex-col gap-0.5 border-t border-line pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mono-label px-2 py-2.5 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <span className="text-faint">~/</span>
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
