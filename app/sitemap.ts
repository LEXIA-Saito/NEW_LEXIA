import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-data"
import { categoryData } from "@/lib/category-data"
import { projectsData } from "@/lib/projects-data"
import { SITE_URL } from "../lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  // Main pages
  const routes = ["", "/blog", "/categories", "/tags", "/projects", "/about", "/contact"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Category pages
  const categoryRoutes = categoryData.map((category) => ({
    url: `${SITE_URL}/categories/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Project pages
  const projectRoutes = projectsData.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.year, 0),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Tag pages
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags.add(tag.toLowerCase().replace(/\s+/g, "-"))
    })
  })

  const tagRoutes = Array.from(tags).map((tag) => ({
    url: `${SITE_URL}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes, ...categoryRoutes, ...projectRoutes, ...tagRoutes]
}
