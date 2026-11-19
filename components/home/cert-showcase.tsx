"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Certification } from "@/content/types";

/**
 * Certifications: the highlighted certificate shown as a tilted print, with a clean list beside it.
 * Hovering (or focusing) a row swaps the print. Rows are not links, so nothing opens or downloads.
 */
export function CertShowcase({ certs, more }: { certs: Certification[]; more: number }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-center gap-8 sm:grid-cols-[300px_1fr] sm:gap-10">
      {/* the print */}
      <div className="relative mx-auto w-full max-w-[340px] sm:mx-0">
        <div className="relative aspect-[1.414/1] -rotate-3 rounded-[10px] bg-white p-1.5 shadow-[0_24px_50px_-22px_rgba(0,0,0,0.9)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-0 motion-reduce:transition-none">
          <div className="relative h-full w-full overflow-hidden rounded-[4px]">
            {certs.map((c, i) => (
              <Image
                key={c.slug}
                src={c.image}
                alt={i === active ? c.imageAlt : ""}
                aria-hidden={i !== active}
                fill
                sizes="(min-width: 640px) 300px, 340px"
                className={`object-contain transition-[opacity,transform,translate,scale,rotate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* the list */}
      <div>
        <ol className="m-0 list-none border-b border-border p-0">
          {certs.map((c, i) => {
            const on = i === active;
            return (
              <li
                key={c.slug}
                tabIndex={0}
                aria-current={on ? "true" : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="flex cursor-default items-baseline gap-4 border-t border-border py-3.5 outline-none focus-visible:bg-hover/50"
              >
                <span className="min-w-0 flex-1 leading-snug">
                  <span className={`text-[15px] transition-colors duration-200 ${on ? "text-fg" : "text-muted"}`}>{c.title}</span>
                  <span className="mt-0.5 block text-xs text-faint">{c.issuer}</span>
                </span>
                <span className="flex-none font-mono text-xs text-faint">{c.year}</span>
              </li>
            );
          })}
        </ol>
        <Link href="/certifications" className="mt-4 inline-block text-sm text-muted transition-colors duration-150 hover:text-fg">
          + {more} more credentials
        </Link>
      </div>
    </div>
  );
}
