"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { applyTheme, writeTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle() {
  // Server and hydration render use "dark"; React re-syncs after hydration.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    writeTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={label}>
      {/* icons are swapped by CSS on [data-theme] so there is no wrong-icon flash */}
      <Sun className="icon-sun" size={16} strokeWidth={1.6} aria-hidden="true" />
      <Moon className="icon-moon" size={16} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
