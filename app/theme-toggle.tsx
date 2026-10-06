"use client";

import { useEffect } from "react";
type Theme = "light" | "dark";

export function ThemeToggle() {
  useEffect(() => {
    const saved = window.localStorage.getItem("theme") as Theme | null;
    const initial = saved ?? "dark";
    document.documentElement.dataset.theme = initial;
  }, []);
  function toggleTheme() {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
  }
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme"><span aria-hidden="true">◐</span><span className="theme-label">Theme</span></button>;
}
