import type { MetadataRoute } from "next"
import { projectsData } from "@/lib/projects-data"
import { SITE_URL } from "../lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  // Main pages
  const routes = ["", "/projects", "/company", "/services", "/pricing", "/team", "/contact"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Project pages
  const projectRoutes = projectsData.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.year, 0),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  return [...routes, ...projectRoutes]
}
