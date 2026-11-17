"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { buildItems, type PaletteItem } from "./items";
import { useShortcut } from "./use-shortcut";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const GROUPS: PaletteItem["group"][] = ["Pages", "Projects", "Actions"];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function show() {
    if (!open) openerRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }
  const showRef = useRef(show);
  useEffect(() => {
    showRef.current = show;
  });

  function close() {
    setOpen(false);
    const el = openerRef.current;
    openerRef.current = null;
    el?.focus();
  }

  useShortcut(() => showRef.current());

  useEffect(() => {
    const onOpen = () => showRef.current();
    window.addEventListener("open-palette", onOpen);
    return () => window.removeEventListener("open-palette", onOpen);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const items = useMemo(() => buildItems((href) => router.push(href)), [router]);
  const q = query.trim().toLowerCase();
  const results = useMemo(() => items.filter((i) => i.label.toLowerCase().includes(q)), [items, q]);
  // Flat order follows the grouped render order so ArrowDown matches what is on screen.
  const ordered = useMemo(() => GROUPS.flatMap((g) => results.filter((i) => i.group === g)), [results]);
  const activeIndex = Math.min(active, Math.max(ordered.length - 1, 0));
  const activeItem = ordered[activeIndex];

  useEffect(() => {
    if (!open || !activeItem) return;
    document.getElementById(`palette-opt-${activeItem.id}`)?.scrollIntoView?.({ block: "nearest" });
  }, [open, activeItem]);

  function choose(item: PaletteItem | undefined) {
    if (!item) return;
    setOpen(false);
    openerRef.current = null;
    item.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!ordered.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((activeIndex + step + ordered.length) % ordered.length);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      choose(activeItem);
      return;
    }
    if (e.key !== "Tab") return;
    const els = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!els || els.length === 0) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (els.length === 1 || (e.shiftKey && document.activeElement === first) || (!e.shiftKey && document.activeElement === last)) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-bg/70" onClick={close} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-card border border-border bg-panel"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search size={16} strokeWidth={1.6} aria-hidden="true" className="text-faint" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeItem ? `palette-opt-${activeItem.id}` : undefined}
            aria-label="Search pages, projects and actions"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search pages, projects, actions"
            autoComplete="off"
            spellCheck={false}
            className="min-h-12 flex-1 bg-transparent text-sm text-fg placeholder:text-faint focus:outline-none"
          />
        </div>
        <div id="palette-listbox" role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto p-2">
          {ordered.length === 0 && <p role="presentation" className="px-3 py-6 text-center text-sm text-muted">No results</p>}
          {GROUPS.map((g) => {
            const group = ordered.filter((i) => i.group === g);
            if (!group.length) return null;
            return (
              <div key={g} role="group" aria-label={g}>
                <p role="presentation" className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{g}</p>
                {group.map((item) => {
                  const selected = item === activeItem;
                  return (
                    <div
                      key={item.id}
                      id={`palette-opt-${item.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setActive(ordered.indexOf(item))}
                      onClick={() => choose(item)}
                      className={`cursor-pointer rounded-nav px-3 py-2 text-sm transition-colors duration-150 ${selected ? "bg-hover text-fg" : "text-muted"}`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
