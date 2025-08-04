import { createClient } from "microcms-js-sdk"

// 環境変数の存在チェック
const serviceDomain = process.env.LEXIA_MICROCMS_DOMAIN
const apiKey = process.env.LEXIA_MICROCMS_API_KEY

console.log("microCMS configuration check:")
console.log("LEXIA_MICROCMS_DOMAIN:", serviceDomain ? "✓ Set" : "✗ Missing")
console.log("LEXIA_MICROCMS_API_KEY:", apiKey ? "✓ Set" : "✗ Missing")

if (!serviceDomain) {
  console.error("LEXIA_MICROCMS_DOMAIN is not set. Please add it to your environment variables.")
}

if (!apiKey) {
  console.error("LEXIA_MICROCMS_API_KEY is not set. Please add it to your environment variables.")
}

let client: any = null

if (serviceDomain && apiKey) {
  try {
    client = createClient({
      serviceDomain,
      apiKey,
    })
    console.log("microCMS client initialized successfully")
  } catch (error) {
    console.error("Failed to initialize microCMS client:", error)
  }
} else {
  console.error("microCMS configuration is missing. Please check your environment variables.")
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  categories: string[]
  featured: boolean
  year: string
  tags: string[]
  location: string
  createdAt: string
  updatedAt: string
}

export async function getProjects(): Promise<Project[]> {
  if (!client) {
    console.error("microCMS client is not initialized. Check environment variables:")
    console.error("LEXIA_MICROCMS_DOMAIN:", serviceDomain ? "✓" : "✗")
    console.error("LEXIA_MICROCMS_API_KEY:", apiKey ? "✓" : "✗")
    return []
  }

  try {
    console.log("Fetching projects from microCMS...")

    const response = await client.get({
      endpoint: "projects",
      queries: {
        limit: 100,
      },
    })

    console.log("microCMS response:", response)

    if (!response || !response.contents) {
      console.warn("No contents found in microCMS response")
      return []
    }

    const projects = response.contents.map((project: any) => ({
      id: project.id,
      slug: project.slug || project.id,
      title: project.title || "",
      description: project.description || "",
      image: project.image?.url || project.image || "",
      categories: Array.isArray(project.categories) ? project.categories : [],
      featured: project.featured || false,
      year: project.year || new Date(project.createdAt).getFullYear().toString(),
      tags: Array.isArray(project.tags) ? project.tags : [],
      location: project.location || "",
      createdAt: project.createdAt || "",
      updatedAt: project.updatedAt || "",
    }))

    console.log(`Successfully fetched ${projects.length} projects`)
    return projects
  } catch (error: any) {
    console.error("Error fetching projects from microCMS:", error)

    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response data:", error.response.data)
    }

    return []
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!client) {
    console.error("microCMS client is not initialized.")
    return null
  }

  try {
    console.log(`Fetching project with slug: ${slug}`)

    // まずスラッグでフィルタリングして検索
    const response = await client.get({
      endpoint: "projects",
      queries: {
        filters: `slug[equals]${slug}`,
      },
    })

    if (response && response.contents && response.contents.length > 0) {
      const project = response.contents[0]
      return {
        id: project.id,
        slug: project.slug || project.id,
        title: project.title || "",
        description: project.description || "",
        image: project.image?.url || project.image || "",
        categories: Array.isArray(project.categories) ? project.categories : [],
        featured: project.featured || false,
        year: project.year || new Date(project.createdAt).getFullYear().toString(),
        tags: Array.isArray(project.tags) ? project.tags : [],
        location: project.location || "",
        createdAt: project.createdAt || "",
        updatedAt: project.updatedAt || "",
      }
    }

    // スラッグで見つからない場合はIDで検索
    try {
      const directResponse = await client.get({
        endpoint: "projects",
        contentId: slug,
      })

      if (directResponse) {
        return {
          id: directResponse.id,
          slug: directResponse.slug || directResponse.id,
          title: directResponse.title || "",
          description: directResponse.description || "",
          image: directResponse.image?.url || directResponse.image || "",
          categories: Array.isArray(directResponse.categories) ? directResponse.categories : [],
          featured: directResponse.featured || false,
          year: directResponse.year || new Date(directResponse.createdAt).getFullYear().toString(),
          tags: Array.isArray(directResponse.tags) ? directResponse.tags : [],
          location: directResponse.location || "",
          createdAt: directResponse.createdAt || "",
          updatedAt: directResponse.updatedAt || "",
        }
      }
    } catch (directError) {
      console.log("Direct ID lookup failed, which is expected if slug doesn't match ID")
    }

    console.warn(`No project found with slug: ${slug}`)
    return null
  } catch (error: any) {
    console.error("Error fetching project from microCMS:", error)

    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response data:", error.response.data)
    }

    return null
  }
}
