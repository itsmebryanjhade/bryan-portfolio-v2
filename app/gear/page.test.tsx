import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

import GearPage from "./page";

afterEach(cleanup);

it("lists the workstation and desk gear with photos", () => {
  render(<GearPage />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  const workstation = within(screen.getByRole("region", { name: "Workstation" }));
  expect(workstation.getAllByRole("listitem")).toHaveLength(5);
  expect(workstation.getByText("AULA F75")).toBeInTheDocument();
  expect(workstation.getByRole("img", { name: /lenovo loq/i })).toHaveAttribute("src", "/images/gear/laptop-open/0.webp");
  expect(workstation.getByRole("img", { name: /koorui 24-inch 144hz monitor/i })).toHaveAttribute("src", "/images/gear/monitor.webp");
  // the monitor's screen-on image, shown on hover (decorative, so it has no role)
  expect(screen.getByRole("region", { name: "Workstation" }).querySelector('img[src="/images/gear/monitor-on.webp"]')).not.toBeNull();
  const desk = within(screen.getByRole("region", { name: "Desk" }));
  expect(desk.getAllByRole("listitem")).toHaveLength(2);
  expect(desk.getByRole("img", { name: /cordless table lamp/i })).toHaveAttribute("src", "/images/gear/lamp-off.webp");
});
