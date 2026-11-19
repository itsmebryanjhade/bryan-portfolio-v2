import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import AboutPage from "./page";

afterEach(cleanup);

it("has one h1, the intro, and a journey that includes school", () => {
  render(<AboutPage />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(within(screen.getByRole("region", { name: /bryan jhade b\. ebuan/i })).getByRole("button", { name: /get in touch/i })).toBeInTheDocument();
  expect(within(screen.getByRole("region", { name: "Journey" })).getAllByRole("listitem")).toHaveLength(5);
  expect(within(screen.getByRole("region", { name: "Journey" })).getByText(/Mapúa Malayan Digital College/)).toBeInTheDocument();
  expect(screen.queryByRole("region", { name: "Education" })).toBeNull();
});

it("shows three photos and a journey without the strand name", () => {
  render(<AboutPage />);
  const photos = within(screen.getByRole("list", { name: "Photos" }));
  expect(photos.getAllByRole("listitem")).toHaveLength(3);
  expect(photos.getByRole("img", { name: /speaking into a microphone/i })).toBeInTheDocument();
  const journey = screen.getByRole("region", { name: "Journey" });
  expect(within(journey).queryByText(/HUMSS/)).toBeNull();
  expect(within(journey).getByText("Aug 2026")).toBeInTheDocument();
});

it("opens the contact form from Get in touch", () => {
  render(<AboutPage />);
  fireEvent.click(screen.getByRole("button", { name: /get in touch/i }));
  expect(screen.getByRole("dialog", { name: /let's talk/i })).toBeInTheDocument();
});
