import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { getProject } from "@/lib/content";
import type { Project } from "@/content/types";
import { ProjectCard } from "./project-card";

afterEach(cleanup);
const get = (s: string) => getProject(s) as Project;

describe("ProjectCard", () => {
  it("PondoPath: external link, team tag, no stack chips", () => {
    render(<ProjectCard project={get("pondopath")} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://pondopath.sanx.dev/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByText("Team project")).toBeInTheDocument();
    expect(screen.queryByTestId("stack-chips")).toBeNull();
  });

  it("shows the year and lifts with a reduced-motion-safe transform", () => {
    render(<ProjectCard project={get("omnave")} />);
    expect(screen.getByText(new RegExp(`· ${get("omnave").year}`))).toBeInTheDocument();
    expect(screen.getByRole("link").className).toMatch(/motion-safe:hover:-translate-y-px/);
  });

  it("Omnave: internal detail link with stack chips", () => {
    render(<ProjectCard project={get("omnave")} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects/omnave");
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.queryByText("Team project")).toBeNull();
  });
});
