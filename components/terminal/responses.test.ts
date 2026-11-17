import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { stack } from "@/content/stack";
import { neofetch, stackOutput, whoami } from "./responses";

describe("terminal responses are derived from content", () => {
  it("whoami uses the profile role line", () => {
    expect(whoami()).toContain(profile.roleLine);
  });
  it("neofetch uses the role line, intro facts, education and availability", () => {
    const out = neofetch();
    expect(out).toContain(`Role: ${profile.roleLine}`);
    expect(out).toContain("BS IT");
    expect(out).toContain("election system");
    expect(out).toContain(profile.education[0].program);
    expect(out).toContain(profile.availability);
  });
  it("stack lists every item from content/stack", () => {
    const out = stackOutput();
    for (const s of stack) expect(out).toContain(s.name);
  });
});
