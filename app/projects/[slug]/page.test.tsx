import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));

import { getProject } from "@/lib/content";
import ProjectPage, { generateMetadata, generateStaticParams } from "./page";

afterEach(() => {
  cleanup();
  notFound.mockClear();
});

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("project detail page", () => {
  it("statically generates only projects with detail pages", () => {
    expect(generateStaticParams().map((p) => p.slug).sort()).toEqual(["omnave", "osc-halalan-2026"]);
  });

  it("metadata uses the tagline as description and sets openGraph title", async () => {
    const md = await generateMetadata(params("omnave"));
    expect(md.title).toBe("Omnave");
    expect(md.description).toBe(getProject("omnave")!.tagline);
    expect(md.openGraph?.title).toBe("Omnave");
  });

  it("metadata is empty for an unknown slug", async () => {
    expect(await generateMetadata(params("nope"))).toEqual({});
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(ProjectPage(params("nope"))).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("calls notFound for a project without a detail page", async () => {
    await expect(ProjectPage(params("kisap"))).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("renders Omnave with the Play Store note and no link for it", async () => {
    render(await ProjectPage(params("omnave")));
    expect(screen.getByRole("heading", { level: 1, name: "Omnave" })).toBeInTheDocument();
    expect(screen.getByText("Play Store: coming soon")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /play store/i })).toBeNull();
    expect(screen.getByRole("button", { name: /Study guide/ })).toBeInTheDocument();
  });

  it("renders Halalan with the known facts", async () => {
    render(await ProjectPage(params("osc-halalan-2026")));
    expect(screen.getByText(/Grade 12 HUMSS/)).toBeInTheDocument();
    expect(screen.getByText("Team project")).toBeInTheDocument();
  });

  it("generateMetadata uses the project title", async () => {
    expect(await generateMetadata(params("omnave"))).toMatchObject({ title: "Omnave" });
  });
});
