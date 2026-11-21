import type { ComponentType } from "react";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  imageAlt: string;
};

/** Add a post: create `content/blog/<slug>.mdx`, list it here and in `postModules`. */
export const posts: Post[] = [
  {
    slug: "i-started-with-a-chat-window",
    title: "New Tools, Same Foundations",
    date: "Feb 2025",
    summary: "From copying Gemini replies into VS Code to building with Claude and Antigravity, while staying involved in the backend and testing the result.",
    image: "/blog/new-tools-retro.webp",
    imageAlt: "Pixel art of a retro beige computer showing code, beside a project notebook, a pencil and a cup of coffee.",
  },
  {
    slug: "my-first-hackathon-solo",
    title: "I Joined My First Hackathon Solo",
    date: "Nov 2026",
    summary: "I joined to gain experience, built my submission alone, and froze during the Q&A. Here's what I want to do differently next time.",
    image: "/blog/iot-conference-ph-2026.webp",
    imageAlt: "Bryan at the IoT Conference Philippines 2026 and AI Philippine Expo, pointing to the event's LED screen.",
  },
  {
    slug: "fifty-photos-one-zip",
    title: "Fifty Photos, One ZIP",
    date: "Nov 2025",
    summary: "Framing 50 to 80+ event photos one by one led me to build Framori. My batches now take about five minutes, but getting the photo quality right was the hard part.",
    image: "/blog/fifty-photos-cover.svg",
    imageAlt: "Illustration of a fanned stack of framed event photos beside a ZIP file.",
  },
  {
    slug: "a-photobooth-of-our-own",
    title: "A Photobooth of Our Own",
    date: "Mar 2025",
    summary: "How a school photobooth became Kisap, and what running it at Balik Eskwela taught me about building tools that actually help.",
    image: "/blog/photobooth-cover.svg",
    imageAlt: "Illustration of a four-frame photobooth strip next to a booth camera.",
  },
  {
    slug: "wrong-strand-right-direction",
    title: "Wrong Strand, Right Direction",
    date: "Apr 2026",
    summary: "I didn't start in a tech strand, but I kept learning to code. That led to a photobooth, a photo framing tool, and a voting system used by more than 800 students.",
    image: "/blog/wrong-strand-cover.webp",
    imageAlt: "A tangled red thread drawn in pixels on the left, straightening into a real thread that leads to a laptop showing code.",
  },
];

/** The post highlighted first on the home and Blog pages. */
export const featuredPostSlug = "wrong-strand-right-direction";

/** Explicit loaders let the bundler resolve each local MDX file. */
export const postModules: Record<string, () => Promise<{ default: ComponentType }>> = {
  "i-started-with-a-chat-window": () => import("./i-started-with-a-chat-window.mdx"),
  "my-first-hackathon-solo": () => import("./my-first-hackathon-solo.mdx"),
  "fifty-photos-one-zip": () => import("./fifty-photos-one-zip.mdx"),
  "a-photobooth-of-our-own": () => import("./a-photobooth-of-our-own.mdx"),
  "wrong-strand-right-direction": () => import("./wrong-strand-right-direction.mdx"),
};
