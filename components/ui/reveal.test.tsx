import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Reveal } from "./reveal";

afterEach(cleanup);

it("never hides content when it can't watch scrolling", () => {
  render(
    <Reveal>
      <p>Selected work</p>
    </Reveal>,
  );
  const wrap = screen.getByText("Selected work").parentElement!;
  expect(wrap).toHaveAttribute("data-reveal", "idle");
});
