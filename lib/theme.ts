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

/**
 * Inline script: a refresh starts at the top of the page. Browsers (Safari most of all) otherwise put
 * you back where you were; back/forward still restores your place.
 */
/**
 * Phone-width screens skip page-to-page view transitions (the project thumbnail morph): Safari freezes
 * the screen while it prepares one, which made back buttons feel stuck. Without the API, React simply
 * swaps pages and each page plays its normal entrance. Laptops and tablets keep the morph.
 */
export const phoneTransitionsScript = `try{if(matchMedia("(max-width: 639px)").matches){delete Document.prototype.startViewTransition}}catch(e){}`;

export const reloadTopScript =`try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){history.scrollRestoration="manual";window.scrollTo(0,0);addEventListener("load",function(){window.scrollTo(0,0);setTimeout(function(){history.scrollRestoration="auto"},0)})}}catch(e){}`;
