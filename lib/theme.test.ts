import { describe, expect, it } from "vitest";
import { readTheme, writeTheme } from "@/lib/theme";

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
