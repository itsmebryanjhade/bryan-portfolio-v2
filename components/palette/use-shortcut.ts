"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

export type ShortcutLabel = "⌘K" | "Ctrl K";

const noop = () => () => {};
const getSnapshot = (): ShortcutLabel =>
  /mac|iphone|ipad|ipod/i.test(`${navigator.platform} ${navigator.userAgent}`) ? "⌘K" : "Ctrl K";
const getServerSnapshot = (): ShortcutLabel => "Ctrl K";

/** Platform-correct label for the palette shortcut; no listeners attached. */
export function useShortcutLabel(): ShortcutLabel {
  return useSyncExternalStore(noop, getSnapshot, getServerSnapshot);
}

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return target.closest("input, textarea, [contenteditable]:not([contenteditable='false'])") !== null;
}

/** Calls onOpen on Ctrl/Cmd K, except while typing in a field. */
export function useShortcut(onOpen: () => void): { label: ShortcutLabel } {
  const label = useShortcutLabel();
  const ref = useRef(onOpen);
  useEffect(() => {
    ref.current = onOpen;
  });

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (!(e.ctrlKey || e.metaKey) || e.altKey || e.key.toLowerCase() !== "k") return;
      if (isEditable(e.target)) return;
      e.preventDefault();
      ref.current();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return { label };
}
