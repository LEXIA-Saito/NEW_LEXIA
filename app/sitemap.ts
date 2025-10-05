import type { MetadataRoute } from "next"
import { projectsData } from "@/lib/projects-data"
import { blogPosts } from "@/lib/blog-posts"
import { SITE_URL } from "../lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  // Main pages
  const routes = [
    "",
    "/projects",
    "/company",
    "/services/web",
    "/services/system",
    "/services/movie",
    "/services/pc",
    "/services/design",
    "/pricing",
    "/team/masato-saito",
    "/team/riho-saito",
    "/team/assistant",
    "/contact",
    "/blog",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Project pages
  const projectRoutes = projectsData.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(parseInt(project.year, 10), 0),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...projectRoutes, ...blogRoutes]
}
