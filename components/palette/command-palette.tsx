"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { buildItems, score, type PaletteGroup, type PaletteItem } from "./items";
import { FOCUSABLE } from "@/lib/focus";
import { useShortcut } from "./use-shortcut";

const GROUPS: PaletteGroup[] = ["Pages", "Projects", "Posts", "Actions"];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-border bg-card px-1 font-sans text-[10.5px] text-faint">
      {children}
    </kbd>
  );
}

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
    if (el?.isConnected) el.focus();
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
  // Best matches first: groups ordered by their best hit, rows by their own score. The flat
  // order follows the grouped render order so ArrowDown matches what is on screen.
  const groups = useMemo(() => {
    const scored = items.map((item) => ({ item, s: score(item, q) })).filter((r) => r.s >= 0);
    return GROUPS.map((g) => {
      const rows = scored.filter((r) => r.item.group === g).sort((a, b) => a.s - b.s);
      return { g, best: rows[0]?.s ?? 9, items: rows.map((r) => r.item) };
    })
      .filter((x) => x.items.length)
      .sort((a, b) => a.best - b.best);
  }, [items, q]);
  const ordered = useMemo(() => groups.flatMap((x) => x.items), [groups]);
  const activeIndex = Math.min(active, Math.max(ordered.length - 1, 0));
  const activeItem = ordered[activeIndex];

  useEffect(() => {
    if (!open || !activeItem) return;
    document.getElementById(`palette-opt-${activeItem.id}`)?.scrollIntoView?.({ block: "nearest" });
  }, [open, activeItem]);

  function choose(item: PaletteItem | undefined) {
    if (!item) return;
    const opener = openerRef.current;
    openerRef.current = null;
    setOpen(false);
    // Restore focus first so actions that record the active element (terminal) see the real opener.
    if (opener?.isConnected) opener.focus();
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
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <div
        className="absolute inset-0 bg-bg/60 backdrop-blur-[2px] [animation:page-fade_180ms_ease-out] motion-reduce:[animation:none]"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[560px] overflow-hidden rounded-card border border-border bg-panel shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)] [animation:palette-in_220ms_cubic-bezier(.22,1,.36,1)] motion-reduce:[animation:none]"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={17} strokeWidth={1.6} aria-hidden="true" className="flex-none text-faint" />
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
            placeholder="Where to?"
            autoComplete="off"
            spellCheck={false}
            className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-faint"
          />
          <button
            type="button"
            onClick={close}
            className="flex-none rounded-[5px] border border-border bg-card px-1.5 py-0.5 text-[10.5px] text-faint transition-colors duration-150 hover:text-fg"
          >
            esc
          </button>
        </div>
        <div id="palette-listbox" role="listbox" aria-label="Results" className="max-h-[min(420px,52vh)] overflow-y-auto px-2 pb-2">
          {groups.map(({ g, items: group }) => (
            <div key={g} role="group" aria-label={g}>
              <p role="presentation" className="px-3 pb-1.5 pt-3.5 text-xs text-faint">
                {g}
              </p>
              {group.map((item) => {
                const selected = item === activeItem;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    id={`palette-opt-${item.id}`}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => setActive(ordered.indexOf(item))}
                    onClick={() => choose(item)}
                    className={`flex cursor-pointer items-center gap-3 rounded-nav px-3 py-2.5 text-sm transition-colors duration-150 ${selected ? "bg-hover text-fg" : "text-muted"}`}
                  >
                    <Icon size={16} strokeWidth={1.6} aria-hidden="true" className={`flex-none transition-colors duration-150 ${selected ? "text-fg" : "text-faint"}`} />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.hint && <span className="flex-none text-xs text-faint">{item.hint}</span>}
                    <CornerDownLeft
                      size={14}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className={`flex-none text-faint transition-opacity duration-150 ${selected ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {ordered.length === 0 && (
          <p role="status" className="px-4 pb-10 pt-8 text-center text-sm text-muted">
            Nothing for &ldquo;{query.trim()}&rdquo;. Try a page or project name.
          </p>
        )}
        <div aria-hidden="true" className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11.5px] text-faint">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            move
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>↵</Kbd>
            open
          </span>
          <span className="ml-auto">{ordered.length} {ordered.length === 1 ? "result" : "results"}</span>
        </div>
      </div>
    </div>
  );
}
