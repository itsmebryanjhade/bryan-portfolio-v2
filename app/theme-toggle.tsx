"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { applyTheme, readTheme, writeTheme, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : readTheme();
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  if (!mounted && typeof window !== "undefined") {
    // sync from the no-flash script's result on first client render
    setMounted(true);
    setTheme(currentTheme());
  }

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    writeTheme(next);
    setTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={label} suppressHydrationWarning>
      <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
