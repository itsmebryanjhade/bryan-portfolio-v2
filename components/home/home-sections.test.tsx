import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import { posts } from "@/content/blog";
import { experience } from "@/content/experience";
import { BlogList } from "./blog-list";
import { ExperienceList } from "./experience-list";
import { StackRows } from "./stack-rows";

afterEach(cleanup);

it("shows each role's first point and opens the rest with '+ N more'", () => {
  render(<ExperienceList items={experience} />);
  expect(screen.queryAllByRole("link")).toHaveLength(0);
  expect(screen.getByRole("heading", { name: /^Frontend Developer.*SanX$/ })).toBeInTheDocument();
  expect(screen.getByText(/design user interfaces and build responsive front ends/i)).toBeInTheDocument();
  const more = screen.getAllByRole("button", { name: "+ 3 more" })[0];
  expect(more).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(more);
  expect(more).toHaveAttribute("aria-expanded", "true");
  expect(more).toHaveTextContent("Show less");
  expect(screen.queryByText(/froze/i)).toBeNull();
  expect(screen.queryByText(/odizee/i)).toBeNull();
});

it("blog: the newest post as a cover card, the next as rows with reading time", () => {
  render(<BlogList posts={posts.slice(0, 3)} />);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(4);
  expect(links[0]).toHaveAttribute("href", `/blog/${posts[0].slug}`);
  expect(screen.getByRole("link", { name: "View all blogs" })).toHaveAttribute("href", "/blog");
  expect(links[0]).toHaveTextContent(posts[0].title);
  expect(links[0]).toHaveTextContent(/min read/);
  expect(screen.getByRole("img", { name: posts[0].imageAlt })).toBeInTheDocument();
  expect(links[1]).toHaveTextContent(posts[1].title);
});

it("reading time rounds to whole minutes, never below one", async () => {
  const { minutesFor } = await import("@/lib/reading-time");
  expect(minutesFor("word ".repeat(450))).toBe(2);
  expect(minutesFor("short")).toBe(1);
});

it("shows only the core tools, with a link to the rest of the stack", () => {
  render(<StackRows />);
  expect(screen.getAllByRole("listitem")).toHaveLength(11);
  expect(screen.getByText("Next.js")).toBeInTheDocument();
  expect(screen.queryByText("Django")).toBeNull();
  expect(screen.getByRole("link", { name: /more/i })).toHaveAttribute("href", "/stack");
});

it("certifications: hovering a row swaps the print; rows never link to PDFs", async () => {
  const { getFeaturedCertifications } = await import("@/lib/content");
  const { CertShowcase } = await import("./cert-showcase");
  const certs = getFeaturedCertifications();
  render(<CertShowcase certs={certs} more={10} />);
  expect(screen.getByRole("img", { name: certs[0].imageAlt })).toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(1);
  fireEvent.mouseEnter(screen.getAllByRole("listitem")[1]);
  expect(screen.getByRole("img", { name: certs[1].imageAlt })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /\+ 10 more credentials/i })).toHaveAttribute("href", "/certifications");
});

it("every stack tool gets an icon tile; learning tools are marked", async () => {
  const { stack } = await import("@/content/stack");
  const { ToolTile } = await import("@/components/ui/tool-tile");
  const { container } = render(
    <ul>
      {stack.map((s) => (
        <ToolTile key={s.name} item={s} />
      ))}
    </ul>,
  );
  const tiles = container.querySelectorAll("li");
  expect(tiles).toHaveLength(stack.length);
  tiles.forEach((li) => expect(li.querySelector("svg")).not.toBeNull());
  expect(container.querySelectorAll("[data-learning]").length).toBe(stack.filter((s) => s.learning).length);
});
