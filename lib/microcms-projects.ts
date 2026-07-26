import { microcmsFetch, type MicroCMSListResponse } from "./microcms"
import type { Project } from "./projects-data"
import { projectsData } from "./projects-data"

export type MicroCMSProject = {
  id: string
  slug: string
  title: string
  description?: string
  image?: { url: string; width?: number; height?: number } | string
  images?: any[] // Repeater field
  categories?: string[]
  featured?: boolean
  year?: string
  tags?: string
  location?: string
  client?: string
  industry?: string
  services?: string
  challenges?: string
  solutions_design?: string
  solutions_tech?: string
  solutions_growth?: string
  results?: string
  results_note?: string

  testimonial_text?: string
  testimonial_author?: string
  testimonial_rating?: number
  techStack?: string
  url?: string
  isComingSoon?: boolean
  publishedAt?: string
  updatedAt?: string
}

const parseCommaSeparated = (text?: string | string[] | any): string[] => {
  if (!text) return []
  if (Array.isArray(text)) return text.map(String)
  if (typeof text !== "string") return [String(text)]
  return text.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
}

function convertMicroCMSProject(post: MicroCMSProject): Project {
  // Extract main image
  const image = post.image
    ? (typeof post.image === "string" ? post.image : post.image.url)
    : ""

  // Extract slideshow images
  const images: string[] = []
  if (post.images && Array.isArray(post.images)) {
    for (const item of post.images) {
      if (item.image?.url) {
        images.push(item.image.url)
      } else if (item.url?.url) {
        images.push(item.url.url)
      } else if (typeof item === "string") {
        images.push(item)
      } else if (item.url && typeof item.url === "string") {
        images.push(item.url)
      }
    }
  }
  // Add main image to the front of slideshow if not present
  if (image && !images.includes(image)) {
    images.unshift(image)
  }


  // Extract testimonial
  let testimonial: Project["testimonial"] = undefined
  if (post.testimonial_text && post.testimonial_author) {
    testimonial = {
      text: post.testimonial_text,
      author: post.testimonial_author,
      rating: post.testimonial_rating || 5,
    }
  }

  // Extract solutions
  let solutions: Project["solutions"] = undefined
  const design = parseCommaSeparated(post.solutions_design)
  const tech = parseCommaSeparated(post.solutions_tech)
  const growth = parseCommaSeparated(post.solutions_growth)
  if (design.length > 0 || tech.length > 0 || growth.length > 0) {
    solutions = { design, tech, growth }
  }

  return {
    id: post.id,
    slug: post.slug || post.id,
    title: post.title,
    description: post.description || "",
    image: image,
    images: images.length > 0 ? images : undefined,
    categories: Array.isArray(post.categories) ? post.categories : (post.categories ? [post.categories as unknown as string] : []),
    featured: !!post.featured,
    year: post.year,
    tags: parseCommaSeparated(post.tags),
    location: post.location || "",
    client: post.client,
    industry: post.industry,
    services: parseCommaSeparated(post.services).length > 0 ? parseCommaSeparated(post.services) : undefined,
    challenges: parseCommaSeparated(post.challenges).length > 0 ? parseCommaSeparated(post.challenges) : undefined,
    solutions,
    results: parseCommaSeparated(post.results).length > 0 ? parseCommaSeparated(post.results) : undefined,
    resultsNote: post.results_note || undefined,

    testimonial,
    techStack: parseCommaSeparated(post.techStack).length > 0 ? parseCommaSeparated(post.techStack) : undefined,
    url: post.url,
    isComingSoon: !!post.isComingSoon,
  }
}

/**
 * Fetch all projects from microCMS.
 * If fetching fails or microCMS is not configured, it falls back to projectsData.
 */
export async function fetchProjects(limit = 100): Promise<Project[]> {
  try {
    const response = await microcmsFetch<MicroCMSListResponse<MicroCMSProject>>(
      "projects",
      {
        limit,
        orders: "-publishedAt",
      },
      {
        next: {
          revalidate: 60,
          tags: ["microcms-projects"],
        },
      }
    )

    if (!response || !Array.isArray(response.contents)) {
      console.warn("Invalid response from microCMS projects API. Using fallback data.")
      return projectsData
    }

    const validProjects: Project[] = []
    for (const post of response.contents) {
      try {
        if (post.slug || post.id) {
          validProjects.push(convertMicroCMSProject(post))
        }
      } catch (e) {
        console.error("Failed to convert project:", e)
      }
    }

    if (validProjects.length === 0) {
      return projectsData
    }

    return validProjects
  } catch (error) {
    console.warn("Failed to fetch projects from microCMS. Using fallback data.", error)
    return projectsData
  }
}

/**
 * Fetch a single project by slug from microCMS.
 * If fetching fails or it's not found in microCMS, falls back to projectsData.
 */
export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const response = await microcmsFetch<MicroCMSListResponse<MicroCMSProject>>(
      "projects",
      {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
      {
        next: {
          revalidate: 60,
          tags: [`microcms-projects-${slug}`],
        },
      }
    )

    if (response && response.contents && response.contents.length > 0) {
      try {
        return convertMicroCMSProject(response.contents[0])
      } catch (e) {
        console.error(`Failed to convert project "${slug}":`, e)
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch project "${slug}" from microCMS. Falling back.`, error)
  }

  // Fallback
  const fallbackProject = projectsData.find((p) => p.slug === slug)
  return fallbackProject || null
}
