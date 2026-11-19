import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchContributions } from "./github";

const payload = {
  total: { lastYear: 406 },
  contributions: [
    { date: "2025-11-16", count: 0, level: 0 },
    { date: "2025-11-17", count: 3, level: 2 },
    { date: "2025-11-18", count: 9, level: 4 },
  ],
};

afterEach(() => vi.unstubAllGlobals());

describe("fetchContributions", () => {
  it("parses total and days", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(payload), { status: 200 })));
    const r = await fetchContributions();
    expect(r?.total).toBe(406);
    expect(r?.days).toHaveLength(3);
    expect(r?.days[2]).toEqual({ date: "2025-11-18", level: 4 });
  });

  it("returns null on 500", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("x", { status: 500 })));
    expect(await fetchContributions()).toBeNull();
  });

  it("returns null when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await fetchContributions()).toBeNull();
  });

  it("returns null on invalid JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not json", { status: 200 })));
    expect(await fetchContributions()).toBeNull();
  });

  it.each([
    ["missing total", { contributions: payload.contributions }],
    ["non-array contributions", { total: { lastYear: 1 }, contributions: "x" }],
    ["out-of-range level", { total: { lastYear: 1 }, contributions: [{ date: "2025-11-16", count: 1, level: 7 }] }],
    ["empty contributions", { total: { lastYear: 0 }, contributions: [] }],
  ])("returns null on %s", async (_n, body) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status: 200 })));
    expect(await fetchContributions()).toBeNull();
  });
});
