import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/services", "/projects", "/contact", "/privacy-policy"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
  const servicePages = services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: new Date() }));
  const projectPages = projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: new Date() }));
  return [...staticPages, ...servicePages, ...projectPages];
}
