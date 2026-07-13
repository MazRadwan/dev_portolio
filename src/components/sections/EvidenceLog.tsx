import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EVIDENCE_LOG } from "@/data/site";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* An evidence log that prints its lines on first scroll into view. Resolved
   (all lines) is the default, so SSR / no-JS / reduced-motion show everything;
   the per-line opacity is only ever applied client-side. */
export function EvidenceLog() {
  const total = EVIDENCE_LOG.length;
  const [shown, setShown] = useState<number>(total);
  const ref = useRef<HTMLOListElement>(null);
  const animate = useRef(false);

  useIsoLayout(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate.current = true;
    setShown(0);
  }, []);

  useEffect(() => {
    if (!animate.current) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let i = 0;
        const tick = () => {
          i += 1;
          setShown(i);
          if (i < total) timer = setTimeout(tick, 200);
        };
        timer = setTimeout(tick, 120);
      },
      { rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [total]);

  return (
    <ol ref={ref} className="space-y-1.5 text-[13px] leading-relaxed">
      {EVIDENCE_LOG.map((line, i) => (
        <li
          key={line.tag}
          className="boot-line grid grid-cols-[4.5rem_1fr] gap-x-3 sm:grid-cols-[4.5rem_5rem_1fr]"
          style={i >= shown ? { opacity: 0 } : undefined}
        >
          <span className="text-faint-glyph tabular-nums">{line.t}</span>
          <span className="text-accent">{line.tag}</span>
          <span className="col-span-2 text-muted sm:col-span-1">{line.text}</span>
        </li>
      ))}
    </ol>
  );
}
