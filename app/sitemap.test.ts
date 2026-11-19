import { describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";

vi.mock("@/content/blog", () => ({
  posts: [{ slug: "hello-world", title: "Hello", date: "2026-01-01", summary: "s" }],
  postModules: {},
}));

describe("sitemap", () => {
  const paths = sitemap().map((e) => new URL(e.url).pathname);
  it("lists every static route and detail project", () => {
    for (const p of ["/", "/projects", "/projects/omnave", "/projects/osc-halalan-2026", "/blog", "/gear", "/links", "/resources", "/stack", "/certifications", "/about"]) {
      expect(paths).toContain(p);
    }
  });
  it("includes blog posts from content/blog", () => {
    expect(paths).toContain("/blog/hello-world");
  });
  it("includes every project page", () => {
    expect(paths).toContain("/projects/kisap");
  });
  it("robots points at the sitemap", () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
