import { afterEach, describe, expect, it, vi } from "vitest";
import { readTheme, THEME_KEY, themeScript, toggleTheme, writeTheme } from "@/lib/theme";

function fakeStorage(value: string | null): Storage {
  return { getItem: () => value } as unknown as Storage;
}
const throwing = {
  getItem: () => { throw new Error("denied"); },
  setItem: () => { throw new Error("denied"); },
} as unknown as Storage;

describe("theme", () => {
  it("defaults to dark for empty storage", () => expect(readTheme(fakeStorage(null))).toBe("dark"));
  it("returns light when stored", () => expect(readTheme(fakeStorage("light"))).toBe("light"));
  it("returns dark for garbage", () => expect(readTheme(fakeStorage("blue"))).toBe("dark"));
  it("returns dark when getItem throws", () => expect(readTheme(throwing)).toBe("dark"));
  it("writeTheme swallows errors", () => expect(() => writeTheme("light", throwing)).not.toThrow());
});

describe("toggleTheme", () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    vi.restoreAllMocks();
  });

  it("flips dark to light and back, applying the attribute", () => {
    document.documentElement.dataset.theme = "dark";
    expect(toggleTheme()).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(toggleTheme()).toBe("dark");
  });

  it("still flips when storage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("denied"); });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("denied"); });
    document.documentElement.dataset.theme = "dark";
    expect(toggleTheme()).toBe("light");
    expect(toggleTheme()).toBe("dark");
  });

  it("treats a missing attribute as dark", () => {
    expect(toggleTheme()).toBe("light");
  });

  it("builds the no-flash script from THEME_KEY", () => {
    expect(themeScript).toContain(`"${THEME_KEY}"`);
  });
});
