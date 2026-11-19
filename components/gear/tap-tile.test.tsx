import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { TapTile } from "./tap-tile";

afterEach(cleanup);

it("toggles its tapped state on touch taps, not mouse clicks", () => {
  render(
    <ul>
      <TapTile className="group">Monitor</TapTile>
    </ul>,
  );
  const tile = screen.getByRole("listitem");
  fireEvent.pointerUp(tile, { pointerType: "mouse" });
  expect(tile).not.toHaveAttribute("data-tapped");
  fireEvent.pointerUp(tile, { pointerType: "touch" });
  expect(tile).toHaveAttribute("data-tapped");
  fireEvent.pointerUp(tile, { pointerType: "touch" });
  expect(tile).not.toHaveAttribute("data-tapped");
});
