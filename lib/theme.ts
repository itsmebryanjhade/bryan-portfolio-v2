export type Theme = "dark" | "light";

const KEY = "theme";

export function readTheme(storage?: Storage): Theme {
  try {
    const s = storage ?? window.localStorage;
    return s.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function writeTheme(theme: Theme, storage?: Storage): void {
  try {
    (storage ?? window.localStorage).setItem(KEY, theme);
  } catch {
    // storage unavailable (private mode); the theme just won't persist
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}
