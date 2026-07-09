import type { MetadataRoute } from "next"
import { fetchProjects } from "@/lib/microcms-projects"
import { fetchBlogPosts, BLOG_GENRES } from "@/lib/blog-posts"
import { SITE_URL } from "../lib/config"

// app/blog/tags/[tag]/page.tsx のnoindex閾値と揃える。
// 1記事のみの薄いタグはnoindexのためsitemapにも載せない。
const MIN_ARTICLES_TO_INDEX = 2

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
  const projects = await fetchProjects()
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

  const projectRoutes = projects.map((project) => ({
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

  const genreRoutes = BLOG_GENRES.map((genre) => ({
    url: `${base}/blog/genres/${genre.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const tagCounts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }
  const tagRoutes = Array.from(tagCounts.entries())
    .filter(([, count]) => count >= MIN_ARTICLES_TO_INDEX)
    .map(([tag]) => ({
      url: `${base}/blog/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }))

  return [...routes, ...projectRoutes, ...blogRoutes, ...genreRoutes, ...tagRoutes]
}
