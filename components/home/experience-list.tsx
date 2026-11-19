"use client";

import { useState } from "react";
import type { Experience } from "@/content/experience";

const point =
  "relative pl-5 text-[15px] leading-7 text-muted before:absolute before:left-0 before:top-[13px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-border-hover before:content-['']";

/**
 * Experience: "Role · Org" with the date on the right, the first point always visible,
 * and "+ N more" to open the rest in place.
 */
export function ExperienceList({ items }: { items: Experience[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <ol className="m-0 list-none border-b border-border p-0">
      {items.map((x, i) => {
        const isOpen = open.has(i);
        const [first, ...rest] = x.points;
        const panelId = `experience-${i}`;
        return (
          <li key={x.role} className="border-t border-border py-5">
            <div className="flex items-baseline gap-4">
              <h3 className="min-w-0 flex-1 text-base font-normal leading-snug">
                <span className="text-fg">{x.role}</span>
                <span className="text-faint"> · {x.org}</span>
              </h3>
              <span className="flex-none font-mono text-xs text-faint">{x.period}</span>
            </div>

            <ul className="m-0 mt-2.5 list-none space-y-2 p-0">
              <li className={point}>{first}</li>
            </ul>

            {rest.length > 0 && (
              <>
                {/* the rest: grows open smoothly (grid rows 0fr -> 1fr) */}
                <div
                  id={panelId}
                  inert={!isOpen || undefined}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="m-0 min-h-0 list-none space-y-2 overflow-hidden p-0 [&>li:first-child]:mt-2">
                    {rest.map((pt) => (
                      <li key={pt} className={point}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="mt-2 text-xs text-faint transition-colors duration-150 hover:text-fg"
                >
                  {isOpen ? "Show less" : `+ ${rest.length} more`}
                </button>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
