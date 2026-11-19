import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { badges } from "@/content/badges";
import { certifications } from "@/content/certifications";
import {
  getCredentialCount,
  getFeaturedCertifications,
  getFeaturedProjects,
  getNavCounts,
  getProject,
  getProjects,
  getStats,
  isEmpty,
} from "@/lib/content";

const pub = (p: string) => join(process.cwd(), "public", p);

describe("projects", () => {
  it("has 7 projects with unique slugs in the §6.6 order", () => {
    const slugs = getProjects().map((p) => p.slug);
    expect(slugs).toHaveLength(7);
    expect(new Set(slugs).size).toBe(7);
    expect(slugs).toEqual(["omnave", "osc-halalan-2026", "pondopath", "throwback-ph", "wholeturn", "kisap", "framori"]);
  });
  it("features omnave, osc-halalan-2026, pondopath", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual(["omnave", "osc-halalan-2026", "pondopath"]);
  });
  it("only lists stacks that are known", () => {
    expect(getProject("omnave")?.stack).toEqual(["Next.js", "Supabase"]);
    expect(getProject("pondopath")?.stack).toEqual([]);
    expect(getProject("osc-halalan-2026")?.stack).toEqual([]);
  });
  it("has a detail page for every project", () => {
    expect(getProjects().filter((p) => p.hasDetail).map((p) => p.slug)).toEqual(["omnave", "osc-halalan-2026", "pondopath", "throwback-ph", "wholeturn", "kisap", "framori"]);
  });
  it("returns undefined for an unknown slug", () => {
    expect(getProject("nope")).toBeUndefined();
  });
  it("has images that exist under public/", () => {
    for (const p of getProjects()) expect(existsSync(pub(p.image)), p.image).toBe(true);
    for (const c of certifications) expect(existsSync(pub(c.image)), c.image).toBe(true);
    for (const b of badges) expect(existsSync(pub(b.image)), b.image).toBe(true);
  });
});

describe("credentials", () => {
  it("counts certifications plus unmatched badges", () => {
    expect(getCredentialCount()).toBe(13);
  });
  it("links every badge.certification to a real certification", () => {
    const slugs = certifications.map((c) => c.slug);
    for (const b of badges) if (b.certification) expect(slugs).toContain(b.certification);
  });
  it("features Google AI Professional, Prompt Like an Engineer and AI Quality Assurance", () => {
    expect(getFeaturedCertifications().map((c) => c.title)).toEqual([
      "Google AI Professional Certificate",
      "Prompt Like an Engineer",
      "AI Quality Assurance & Hallucination Mitigation",
    ]);
  });
});

describe("derived values", () => {
  it("computes stats", () => {
    expect(getStats().map((s) => s.value)).toEqual(["7", "13", "2026"]);
    expect(getStats().map((s) => s.label)).toEqual(["Projects shipped", "Credentials", "Started BSIT"]);
  });
  it("computes nav counts", () => {
    expect(getNavCounts()).toEqual({ projects: 7, certifications: 13 });
  });
  it("detects empty lists", () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([{ name: "x", category: "y" }])).toBe(false);
  });
});

describe("content hygiene", () => {
  it("never references the wrong GitHub username", () => {
    const dir = join(process.cwd(), "content");
    for (const f of readdirSync(dir, { recursive: true }) as string[]) {
      if (statSync(join(dir, f)).isDirectory()) continue;
      expect(readFileSync(join(dir, f), "utf8"), f).not.toContain("codebyjhade");
    }
  });
});
