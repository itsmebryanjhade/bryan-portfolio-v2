import { readFileSync } from "node:fs";
import path from "node:path";

/** Minutes to read, at ~200 words a minute; never less than 1. */
export function minutesFor(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Reading time for a blog post, from its MDX file. Server-only (reads the file at build time). */
export function readingTime(slug: string): string {
  try {
    const text = readFileSync(path.join(process.cwd(), "content", "blog", `${slug}.mdx`), "utf8");
    return `${minutesFor(text)} min read`;
  } catch {
    return "";
  }
}
