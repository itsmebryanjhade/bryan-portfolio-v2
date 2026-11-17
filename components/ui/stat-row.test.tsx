import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { StatRow } from "./stat-row";

afterEach(cleanup);

it("puts dt before dd", () => {
  const { container } = render(<StatRow stats={[{ label: "Credentials", value: "14" }]} />);
  const kids = Array.from(container.querySelector("dl > div")!.children).map((c) => c.tagName);
  expect(kids).toEqual(["DT", "DD"]);
});
