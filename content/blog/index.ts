import type { ComponentType } from "react";

export type Post = { slug: string; title: string; date: string; summary: string };

/** Add a post: create `content/blog/<slug>.mdx`, list it here and in `postModules`. */
export const posts: Post[] = [];

/**
 * Explicit loaders instead of a dynamic `import(`./${slug}.mdx`)`: with no .mdx
 * files present, bundlers fail to resolve that template at build time.
 * Example: "my-post": () => import("./my-post.mdx"),
 */
export const postModules: Record<string, () => Promise<{ default: ComponentType }>> = {};
