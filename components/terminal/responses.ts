import { profile } from "@/content/profile";
import { stack } from "@/content/stack";

/** Plain-text version of the profile intro (pills flattened to their labels). */
export function introText(): string {
  return profile.intro.map((part) => (typeof part === "string" ? part : part.pill)).join("");
}

export function whoami(): string {
  return `bryan-jhade\n${profile.roleLine}`;
}

export function neofetch(): string {
  const education = profile.education[0];
  return [
    "jhade@portfolio",
    "---------------",
    "OS: BryanOS / Web",
    `Role: ${profile.roleLine}`,
    `About: ${introText()}`,
    ...(education ? [`Education: ${education.program}`] : []),
    "Shell: portfolio-sh",
    `Status: ${profile.availability}`,
  ].join("\n");
}

export function stackOutput(): string {
  const names = stack.map((s) => s.name);
  const width = Math.max(...names.map((n) => n.length)) + 2;
  const rows: string[] = [];
  for (let i = 0; i < names.length; i += 2) {
    rows.push(names[i].padEnd(width) + (names[i + 1] ?? ""));
  }
  return `ACTIVE TOOLCHAIN\n${rows.join("\n").trimEnd()}`;
}
