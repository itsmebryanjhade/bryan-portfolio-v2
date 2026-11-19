import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));
// next/font only runs in the Next compiler; in tests each font is just a family name.
vi.mock("next/font/google", () => ({
  Instrument_Sans: () => ({ style: { fontFamily: "Instrument Sans" } }),
  Instrument_Serif: () => ({ style: { fontFamily: "Instrument Serif" } }),
}));

import { getProject } from "@/lib/content";
import ProjectPage, { generateMetadata, generateStaticParams } from "./page";

afterEach(() => {
  cleanup();
  notFound.mockClear();
});

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("project detail page", () => {
  it("statically generates a page for every project", () => {
    expect(generateStaticParams().map((p) => p.slug).sort()).toEqual(
      ["framori", "kisap", "omnave", "osc-halalan-2026", "pondopath", "throwback-ph", "wholeturn"],
    );
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

  it("renders a short project page with its preview, highlights and links", async () => {
    render(await ProjectPage(params("kisap")));
    expect(screen.getByRole("heading", { level: 1, name: "kisap." })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: getProject("kisap")!.imageAlt })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "What it does" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "How I built it" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open site/i })).toHaveAttribute("href", "https://kisap.vercel.app/");
    expect(screen.queryByRole("link", { name: /view code/i })).toBeNull();
    // The project fonts apply inside the page only.
    expect(screen.getByRole("article").style.getPropertyValue("--font-newsreader")).toBe("Instrument Serif");
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
    expect(screen.getByText(/student council/)).toBeInTheDocument();
    expect(screen.queryByText(/HUMSS|Odizee/)).toBeNull();
    expect(screen.getByText("Team project")).toBeInTheDocument();
  });

  it("generateMetadata uses the project title", async () => {
    expect(await generateMetadata(params("omnave"))).toMatchObject({ title: "Omnave" });
  });
});
