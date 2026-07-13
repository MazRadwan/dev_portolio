import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SITE } from "@/data/site";

function Monogram() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="maz.radwan — home">
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

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const ticking = useRef(false);

  /*
    Smart-sticky header — DYNAMIC 1:1 tracking (iOS-Safari-toolbar style, ported
    from LyonsDen Header.island). The header slides out/in pixel-for-pixel with
    the scroll delta (survives momentum scrolling, unlike a binary hide toggle);
    on pause it settles to the nearer edge. The transform is written straight to
    the DOM node, rAF-throttled — no React re-render per frame. Mobile only; the
    desktop header stays pinned.
  */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    const SHOW_AT_TOP = 80;
    const SETTLE = "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)";
    let settleTimer: ReturnType<typeof setTimeout>;
    lastScrollY.current = Math.max(window.scrollY, 0);

    const apply = (animated: boolean) => {
      el.style.transition = animated && !reduced ? SETTLE : "none";
      el.style.transform = `translateY(${-offsetRef.current}px)`;
    };

    // Menu just opened (effect re-runs on `open`): snap fully visible + pin.
    if (open && offsetRef.current > 0) {
      offsetRef.current = 0;
      apply(true);
    }

    const update = () => {
      const y = Math.max(window.scrollY, 0); // guard iOS rubber-band overscroll
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      setScrolled(y > 24);

      if (!isMobile()) {
        offsetRef.current = 0;
        apply(false);
      } else if (y < SHOW_AT_TOP || open) {
        offsetRef.current = 0;
        apply(true);
      } else {
        const h = el.offsetHeight;
        offsetRef.current = Math.min(Math.max(offsetRef.current + delta, 0), h);
        apply(false);
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          offsetRef.current = offsetRef.current > h / 2 ? h : 0;
          apply(true);
        }, 150);
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      offsetRef.current = 0;
      apply(true); // snap back on rotate/resize (desktop stays pinned anyway)
    };

    setScrolled(Math.max(window.scrollY, 0) > 24);
    if (!isMobile()) apply(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(settleTimer);
    };
  }, [open]);

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
    : scrolled
      ? "bg-bg/85 backdrop-blur-md border-line"
      : "border-transparent";

  return (
    <>
      {/* Header (z-50) transforms; the tucked menu (z-40) hides behind it. */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b [will-change:transform] ${barBg}`}
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
                  <span className="text-faint-glyph">~/</span>
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
      </header>

      {/* Scrim + detached menu — siblings of the header so its transform never
          becomes the containing block for these fixed elements. */}
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
              <span className="text-faint-glyph">~/</span>
              {item.label}
              <span className="ml-auto text-faint-glyph">›</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
