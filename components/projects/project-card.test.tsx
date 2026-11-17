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

  it("Omnave: internal detail link with stack chips", () => {
    render(<ProjectCard project={get("omnave")} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects/omnave");
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.queryByText("Team project")).toBeNull();
  });
});
