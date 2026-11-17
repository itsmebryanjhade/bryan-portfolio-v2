export type Theme = "dark" | "light";

export const THEME_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

export function readTheme(storage?: Storage): Theme {
  try {
    const s = storage ?? window.localStorage;
    return s.getItem(THEME_KEY) === "light" ? "light" : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function writeTheme(theme: Theme, storage?: Storage): void {
  try {
    (storage ?? window.localStorage).setItem(THEME_KEY, theme);
  } catch {
    // storage unavailable (private mode); the theme just won't persist
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

/** Flips the theme currently on <html> (the source of truth), applies and persists it. */
export function toggleTheme(): Theme {
  const next: Theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  writeTheme(next);
  return next;
}

/** Inline no-flash script; runs before hydration. Built from the constants above. */
export const themeScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});document.documentElement.dataset.theme=t==="light"?"light":${JSON.stringify(DEFAULT_THEME)}}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_THEME)}}`;
