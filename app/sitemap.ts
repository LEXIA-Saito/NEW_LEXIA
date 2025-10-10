import type { MetadataRoute } from "next"
import { projectsData } from "@/lib/projects-data"
import { fetchBlogPosts } from "@/lib/blog-posts"
import { SITE_URL } from "../lib/config"

function safeDate(input?: string | Date | undefined): Date {
  try {
    if (!input) return new Date()
    const d = new Date(input)
    if (Number.isNaN(d.getTime())) return new Date()
    return d
  } catch {
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchBlogPosts()
  const base = SITE_URL.replace(/\/$/, "")

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
    "/privacy",
    "/team/masato-saito",
    "/team/riho-saito",
    "/team/assistant",
    "/contact",
    "/blog",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const projectRoutes = projectsData.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: safeDate(project.year ? `${project.year}-01-01` : undefined),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...routes, ...projectRoutes, ...blogRoutes]
}
