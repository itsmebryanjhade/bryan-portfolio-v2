"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const TZ = "Asia/Manila";

function read() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
  const hour = Number(now.toLocaleString("en-US", { timeZone: TZ, hour: "numeric", hourCycle: "h23" }));
  return { time, day: hour >= 6 && hour < 18 };
}

/** Local time in Manila with a sun or moon, so visitors know if it's day or night for Bryan. Renders after mount. */
/** `compact` drops the sun/moon and shortens the label, for tight spots like the sidebar footer. */
export function ManilaStatus({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<ReturnType<typeof read> | null>(null);

  useEffect(() => {
    const tick = () => setState(read());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const Icon = state?.day ? Sun : Moon;
  return (
    <span className="inline-flex min-h-4 items-center gap-1.5 whitespace-nowrap text-[11px] text-muted">
      {state && (
        <>
          {!compact && <Icon size={12} strokeWidth={1.8} aria-hidden="true" className={state.day ? "text-amber-500" : "text-sky-400"} />}
          <span className="font-mono tabular-nums">{state.time}</span>
          <span className="text-faint">{compact ? "Manila" : "in Manila"}</span>
          <span className="sr-only">{state.day ? "(daytime)" : "(night-time)"}</span>
        </>
      )}
    </span>
  );
}
