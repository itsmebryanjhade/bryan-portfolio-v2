import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BlogPage from "./page";

afterEach(cleanup);

describe("blog page", () => {
  it("lists the published posts, featured first with covers, and links to the full stories", () => {
    render(<BlogPage />);
    expect(screen.getByRole("link", { name: /new tools, same foundations/i })).toHaveAttribute("href", "/blog/i-started-with-a-chat-window");
    expect(screen.getByRole("link", { name: /i joined my first hackathon solo/i })).toHaveAttribute("href", "/blog/my-first-hackathon-solo");
    expect(screen.getByRole("link", { name: /fifty photos, one zip/i })).toHaveAttribute("href", "/blog/fifty-photos-one-zip");
    expect(screen.getByRole("link", { name: /a photobooth of our own/i })).toHaveAttribute("href", "/blog/a-photobooth-of-our-own");
    expect(screen.getByRole("link", { name: /wrong strand, right direction/i })).toHaveAttribute("href", "/blog/wrong-strand-right-direction");
    expect(screen.getByRole("img", { name: /tangled red thread/i })).toHaveAttribute("src", expect.stringContaining(encodeURIComponent("/blog/wrong-strand-cover.webp")));
    expect(screen.getByRole("img", { name: /retro beige computer/i })).toHaveAttribute("src", expect.stringContaining(encodeURIComponent("/blog/new-tools-retro.webp")));
    expect(within(screen.getByRole("list", { name: "Posts" })).getAllByRole("listitem")[0]).toHaveTextContent(/wrong strand, right direction/i);
    expect(screen.getByRole("img", { name: /iot conference philippines 2026/i })).toHaveAttribute("src", expect.stringContaining(encodeURIComponent("/blog/iot-conference-ph-2026.webp")));
    expect(screen.queryByText("First posts coming soon")).toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
