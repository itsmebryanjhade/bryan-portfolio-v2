import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import CertificationsPage from "./page";

afterEach(cleanup);

it("lists 6 certificates linking to PDFs", () => {
  render(<CertificationsPage />);
  const links = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.endsWith(".pdf"));
  expect(links).toHaveLength(6);
  links.forEach((a) => expect(a).toHaveAttribute("target", "_blank"));
});

it("standalone badge grid has 8 items", () => {
  render(<CertificationsPage />);
  const grid = screen.getByRole("list", { name: "Badges" });
  expect(within(grid).getAllByRole("listitem")).toHaveLength(8);
});
