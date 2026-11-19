"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * A Links row for handles with no public profile URL (Discord): clicking copies the text
 * and briefly swaps the note for "Copied". Styled to match the link rows beside it.
 */
export function CopyRow({ name, value, icon }: { name: string; value: string; icon: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked: leave the handle visible so it can be copied by hand.
    }
  }

  return (
    <li className="border-t border-border">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${name} username ${value}`}
        className="group -mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer items-center gap-4 rounded-[12px] px-3 py-3.5 text-left transition-colors duration-150 hover:bg-hover/50"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-nav border border-border bg-card text-muted transition-colors duration-150 group-hover:border-border-hover group-hover:text-fg">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-fg">{name}</span>
          <span className="block truncate text-xs text-faint">{copied ? "Copied" : value}</span>
        </span>
        {copied ? (
          <Check size={16} strokeWidth={1.6} aria-hidden="true" className="text-fg" />
        ) : (
          <Copy size={15} strokeWidth={1.6} aria-hidden="true" className="text-faint transition-colors duration-200 group-hover:text-fg" />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${name} username copied` : ""}
      </span>
    </li>
  );
}
