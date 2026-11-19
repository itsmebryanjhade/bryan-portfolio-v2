import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Morph } from "./morph";

it("renders its child as-is where view transitions aren't available", () => {
  render(
    <Morph name="project-kisap">
      <span>thumb</span>
    </Morph>,
  );
  expect(screen.getByText("thumb")).toBeInTheDocument();
});
