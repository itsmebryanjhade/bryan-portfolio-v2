"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { openPalette, Sidebar } from "./sidebar";
import { profile } from "@/content/profile";

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function MobileBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) menuRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const els = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!els || els.length === 0) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-panel px-4 py-2.5 lg:hidden">
      <span className="text-sm font-medium text-fg">{profile.name}</span>
      <button
        ref={menuRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-nav border border-border text-muted transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg"
      >
        <Menu size={16} strokeWidth={1.6} aria-hidden="true" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50" onKeyDown={onKeyDown}>
          <div className="absolute inset-0 bg-bg/70" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-panel"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-nav text-muted hover:bg-hover hover:text-fg"
            >
              <X size={16} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <Sidebar
              onSearch={() => {
                setOpen(false);
                openPalette();
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
