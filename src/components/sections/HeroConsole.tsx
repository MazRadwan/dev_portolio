import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TermPane } from "@/components/ui/TermPane";
import { READOUT, IDENTITY_FLOW, LIFECYCLE_STATUS, SUBSYSTEMS, PROOF_CHANNEL } from "@/data/site";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const N = IDENTITY_FLOW.length;
const LAST_STATUS = LIFECYCLE_STATUS.length - 1;

type ConsoleState = {
  header: string;
  init: string;
  rows: number;
  lifeDone: number;
  lifeActive: number;
  statusIdx: number;
  subOn: boolean;
  chanOn: boolean;
  chanActive: number;
};

// Resolved (default) values — what SSR, no-JS, and reduced-motion render.
const RESOLVED: ConsoleState = {
  header: "READY",
  init: "console online",
  rows: READOUT.length,
  lifeDone: N,
  lifeActive: -1,
  statusIdx: LAST_STATUS,
  subOn: true,
  chanOn: true,
  chanActive: 0,
};

export function HeroConsole() {
  const [s, setS] = useState<ConsoleState>(RESOLVED);
  const armed = useRef(false);

  // Before paint: if we should animate, drop to the boot-start state (no flash).
  useIsoLayout(() => {
    if (armed.current) return;
    armed.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // stay resolved
    setS({
      header: "SYNCING",
      init: "",
      rows: 0,
      lifeDone: 0,
      lifeActive: -1,
      statusIdx: -1,
      subOn: false,
      chanOn: false,
      chanActive: 0,
    });
  }, []);

  useEffect(() => {
    // Reduced motion: no boot choreography or spatial motion, but the quiet
    // TEXT liveness (state-machine walk, proof-channel cycling) still runs —
    // "reduce" targets spatial motion, not content updates.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const set = (patch: Partial<typeof RESOLVED>) => setS((p) => ({ ...p, ...patch }));
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    // --- one-time boot: identity/title already visible on the left ---
    if (!reduce) {
    at(150, () => set({ init: "initializing identity_access_console" }));
    READOUT.forEach((_, i) => at(350 + i * 120, () => set({ rows: i + 1 })));
    at(1000, () => set({ subOn: true }));

    // lifecycle walk (JOINER -> MOVER -> LEAVER), status advancing with it
    const walk = (base: number) => {
      at(base, () => set({ lifeActive: 0, lifeDone: 0, statusIdx: 0 }));
      at(base + 130, () => set({ lifeDone: 1, lifeActive: 1, statusIdx: 1 }));
      at(base + 260, () => set({ lifeDone: 2, lifeActive: 2, statusIdx: 2 }));
      at(base + 390, () => set({ lifeDone: 3, lifeActive: -1, statusIdx: 3 }));
    };
    walk(1100);
    at(1450, () => set({ header: "READY", init: "console online", chanOn: true }));
    }

    // --- quiet live loops after boot ---
    let lifeTimer: ReturnType<typeof setInterval> | null = null;
    let chanTimer: ReturnType<typeof setInterval> | null = null;
    const walkNow = () => {
      set({ lifeActive: 0, lifeDone: 0, statusIdx: 0 });
      setTimeout(() => set({ lifeDone: 1, lifeActive: 1, statusIdx: 1 }), 480);
      setTimeout(() => set({ lifeDone: 2, lifeActive: 2, statusIdx: 2 }), 960);
      setTimeout(() => set({ lifeDone: 3, lifeActive: -1, statusIdx: 3 }), 1440);
    };
    const startLoops = () => {
      stopLoops();
      lifeTimer = setInterval(walkNow, 13000);
      chanTimer = setInterval(() => setS((p) => ({ ...p, chanActive: (p.chanActive + 1) % PROOF_CHANNEL.length })), 3200);
    };
    const stopLoops = () => {
      if (lifeTimer) clearInterval(lifeTimer);
      if (chanTimer) clearInterval(chanTimer);
      lifeTimer = chanTimer = null;
    };
    at(reduce ? 400 : 2000, startLoops);

    const onVis = () => {
      if (document.hidden) stopLoops();
      else if (armed.current) startLoops();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      timers.forEach(clearTimeout);
      stopLoops();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const node = (label: string, i: number) => {
    const done = i < s.lifeDone;
    const active = i === s.lifeActive;
    const mark = done ? "✓" : active ? ">" : " ";
    const on = done || active;
    return (
      <span key={label} className={on ? "text-accent" : "text-muted"}>
        <span aria-hidden="true">{mark} </span>
        {label}
      </span>
    );
  };

  return (
    <TermPane
      title="readout"
      className="h-full"
      status={
        <span className="mono-label flex items-center gap-2">
          <span className={s.header === "READY" ? "pulse-sq" : "block h-[7px] w-[7px] animate-pulse bg-accent-2"} aria-hidden="true" />
          <span className={s.header === "READY" ? "text-accent" : "text-accent-2"}>{s.header}</span>
        </span>
      }
      bodyClassName="relative flex flex-col gap-4 p-4 sm:p-5"
    >
      <span className="scan-pass" aria-hidden="true" />

      {/* boot / prompt line */}
      <div className="text-[12.5px] text-faint">
        <span className="text-accent">&gt;</span> {s.init || " "}
      </div>

      {/* evidence ledger */}
      <dl className="space-y-1 text-[13px]">
        {READOUT.map((row, i) => (
          <div
            key={row.key}
            className="boot-line grid grid-cols-[4.5rem_1fr] items-baseline gap-1 sm:grid-cols-[5.5rem_1fr]"
            style={i >= s.rows ? { opacity: 0 } : undefined}
          >
            <dt className="text-faint">{row.key}</dt>
            <dd className="text-ink">
              <span className="text-faint-glyph">: </span>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* IAM lifecycle state machine */}
      <div className="border-t border-line pt-3.5">
        <div className="mono-label mb-2 text-faint">identity_lifecycle</div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          {IDENTITY_FLOW.map((stage, i) => (
            <span key={stage} className="flex items-center gap-2">
              {node(stage, i)}
              {i < N - 1 && <span className="text-faint-glyph" aria-hidden="true">──</span>}
            </span>
          ))}
        </div>
        <div className="mt-2 text-[12.5px] text-muted">
          status<span className="text-faint-glyph"> : </span>
          <span className="text-accent">{s.statusIdx >= 0 ? LIFECYCLE_STATUS[s.statusIdx] : "…"}</span>
        </div>
      </div>

      {/* subsystem table */}
      <table
        className="w-full border-t border-line pt-1 text-[12px] transition-opacity"
        style={!s.subOn ? { opacity: 0 } : undefined}
      >
        <thead>
          <tr className="mono-label text-faint-glyph">
            <th scope="col" className="py-1.5 pt-3 text-left font-medium">subsystem</th>
            <th scope="col" className="py-1.5 pt-3 text-left font-medium">phase</th>
            <th scope="col" className="py-1.5 pt-3 text-right font-medium">result</th>
          </tr>
        </thead>
        <tbody>
          {SUBSYSTEMS.map((row) => (
            <tr key={row.name}>
              <td className="py-0.5 text-muted">{row.name}</td>
              <td className="py-0.5 text-faint">{row.phase}</td>
              <td className="py-0.5 text-right text-accent">{row.result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* cycling proof channel — values always visible */}
      <div
        className="border-t border-line pt-3.5 transition-opacity"
        aria-live="off"
        style={!s.chanOn ? { opacity: 0 } : undefined}
      >
        <div className="mono-label mb-2 text-faint">proof_channel</div>
        <dl className="text-[12.5px]">
          {PROOF_CHANNEL.map((row, i) => {
            const active = i === s.chanActive;
            return (
              <div
                key={row.key}
                className={`grid grid-cols-[1rem_7.5rem_1fr] items-baseline py-0.5 ${active ? "text-ink" : "text-muted"}`}
              >
                <span className="text-accent" aria-hidden="true">{active ? ">" : ""}</span>
                <dt className={active ? "text-accent" : "text-faint"}>{row.key}</dt>
                <dd>{row.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      {/* on-prem guarantee */}
      <div className="mt-auto border-l-2 border-accent-2 pl-3 text-[12.5px] text-muted">
        <span className="text-accent-2" aria-hidden="true">▪ </span>on-prem mode:{" "}
        <span className="text-ink">no patient data leaves the premises.</span>
      </div>
    </TermPane>
  );
}
