import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LinksPage from "./page";

afterEach(cleanup);

describe("links page", () => {
  it("groups links with a handle under each name", () => {
    render(<LinksPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const profiles = screen.getByRole("region", { name: "Profiles" });
    const github = within(profiles).getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("href", "https://github.com/itsmebryanjhade");
    expect(github).toHaveAttribute("target", "_blank");
    expect(within(github).getByText("@itsmebryanjhade")).toBeInTheDocument();
    expect(within(profiles).getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  it("lists Instagram and Facebook under Elsewhere", () => {
    render(<LinksPage />);
    const elsewhere = screen.getByRole("region", { name: "Elsewhere" });
    expect(within(elsewhere).getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/itsmebryanjhade",
    );
    expect(within(elsewhere).getByRole("link", { name: /facebook/i })).toHaveAttribute(
      "href",
      "https://www.facebook.com/bryanjhade.ebuan.5",
    );
  });

  it("copies the Discord username instead of linking", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<LinksPage />);
    const button = within(screen.getByRole("region", { name: "Elsewhere" })).getByRole("button", {
      name: /copy discord username itsmebryanjhade/i,
    });
    fireEvent.click(button);
    expect(writeText).toHaveBeenCalledWith("itsmebryanjhade");
    expect(await within(button).findByText("Copied")).toBeInTheDocument();
  });

  it("opens email in place, not in a new tab", () => {
    render(<LinksPage />);
    const email = within(screen.getByRole("region", { name: "Contact" })).getByRole("link", { name: /email/i });
    expect(email).toHaveAttribute("href", "mailto:bryanjhade.e@gmail.com");
    expect(email).not.toHaveAttribute("target");
  });
});
