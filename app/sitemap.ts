import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const staticRoutes = ["/", "/projects", "/stack", "/certifications", "/about", "/blog", "/gear", "/links", "/resources"];

export default function sitemap(): MetadataRoute.Sitemap {
  const details = getProjects().filter((p) => p.hasDetail).map((p) => `/projects/${p.slug}`);
  const lastModified = new Date();
  return [...staticRoutes, ...details].map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
