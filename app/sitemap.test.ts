import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";

describe("sitemap", () => {
  const paths = sitemap().map((e) => new URL(e.url).pathname);
  it("lists every static route and detail project", () => {
    for (const p of ["/", "/projects", "/projects/omnave", "/projects/osc-halalan-2026", "/blog", "/gear", "/links", "/resources", "/stack", "/certifications", "/about"]) {
      expect(paths).toContain(p);
    }
  });
  it("omits projects without a detail page", () => {
    expect(paths).not.toContain("/projects/kisap");
  });
  it("robots points at the sitemap", () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
