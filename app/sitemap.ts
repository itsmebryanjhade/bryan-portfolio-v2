import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { posts } from "@/content/blog";
import { SITE_URL } from "@/lib/site";

const staticRoutes = ["/", "/projects", "/stack", "/certifications", "/about", "/blog", "/gear", "/links", "/resources"];

export default function sitemap(): MetadataRoute.Sitemap {
  const details = getProjects().filter((p) => p.hasDetail).map((p) => `/projects/${p.slug}`);
  const blog = posts.map((p) => `/blog/${p.slug}`);
  const lastModified = new Date();
  return [...staticRoutes, ...details, ...blog].map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
