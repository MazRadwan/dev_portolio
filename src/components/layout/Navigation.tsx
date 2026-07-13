import { useEffect, useState } from "react";
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

  // Body scroll lock + Escape to close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const barBg = open
    ? "bg-bg border-line"
    : isScrolled
      ? "bg-bg/85 backdrop-blur-md border-line"
      : "border-transparent";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Opaque bar (z-30) — the tucked menu hides behind it. */}
      <div className={`relative z-30 border-b transition-colors duration-300 ${barBg}`}>
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
                className="inline-flex h-8 w-8 items-center justify-center border border-line bg-surface-2 text-muted transition-colors hover:text-ink"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Detached terminal-pane menu + scrim (mobile only). */}
      <div className="md:hidden">
        <div
          className={`tui-scrim ${open ? "is-open" : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div id="mobile-menu" className={`tui-menu ${open ? "is-open" : ""}`}>
          <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
            <span className="mono-label text-faint">~/navigate</span>
            <span className="mono-label text-accent">menu</span>
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="tui-menu__row mono-label flex items-center border-b border-line px-4 py-3.5 text-muted transition-colors last:border-b-0 hover:bg-surface-2 hover:text-ink"
            >
              <span className="text-faint">~/</span>
              {item.label}
              <span className="ml-auto text-faint">›</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
