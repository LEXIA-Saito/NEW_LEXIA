import { createClient } from "microcms-js-sdk"

// 環境変数の存在チェック
const serviceDomain = process.env.LEXIA_MICROCMS_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_DOMAIN
const apiKey = process.env.LEXIA_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY

console.log("microCMS configuration check:")
console.log("LEXIA_MICROCMS_DOMAIN:", process.env.LEXIA_MICROCMS_DOMAIN ? "✓ Set" : "✗ Missing")
console.log("LEXIA_MICROCMS_API_KEY:", process.env.LEXIA_MICROCMS_API_KEY ? "✓ Set" : "✗ Missing")
console.log("NEXT_PUBLIC_MICROCMS_DOMAIN:", process.env.NEXT_PUBLIC_MICROCMS_DOMAIN ? "✓ Set" : "✗ Missing")
console.log("MICROCMS_API_KEY:", process.env.MICROCMS_API_KEY ? "✓ Set" : "✗ Missing")
console.log("Using serviceDomain:", serviceDomain)

if (!serviceDomain) {
  console.error("microCMS domain is not set. Please add LEXIA_MICROCMS_DOMAIN or NEXT_PUBLIC_MICROCMS_DOMAIN to your environment variables.")
}

if (!apiKey) {
  console.error("microCMS API key is not set. Please add LEXIA_MICROCMS_API_KEY or MICROCMS_API_KEY to your environment variables.")
}

let client: any = null

if (serviceDomain && apiKey) {
  try {
    client = createClient({
      serviceDomain,
      apiKey,
    })
    console.log("microCMS client initialized successfully")
    console.log("Client will connect to:", `https://${serviceDomain}.microcms.io`)
  } catch (error) {
    console.error("Failed to initialize microCMS client:", error)
  }
} else {
  console.error("microCMS configuration is missing. Please check your environment variables.")
  console.error("Required: serviceDomain and apiKey")
  console.error("serviceDomain:", serviceDomain || "MISSING")
  console.error("apiKey:", apiKey ? "SET" : "MISSING")
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
    console.error("serviceDomain:", serviceDomain || "MISSING")
    console.error("apiKey:", apiKey ? "SET" : "MISSING")
    return []
  }

  try {
    console.log("Fetching projects from microCMS...")
    console.log("Endpoint URL:", `https://${serviceDomain}.microcms.io/api/v1/projects`)

    const response = await client.get({
      endpoint: "projects",
      queries: {
        limit: 100,
      },
    })

    console.log("microCMS response received")
    console.log("Response type:", typeof response)
    console.log("Response keys:", response ? Object.keys(response) : "null")

    if (!response) {
      console.warn("No response from microCMS")
      return []
    }

    if (!response.contents) {
      console.warn("No contents found in microCMS response")
      console.log("Full response:", JSON.stringify(response, null, 2))
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
    console.error("Error type:", typeof error)
    console.error("Error message:", error.message)

    if (error.response) {
      console.error("HTTP Response status:", error.response.status)
      console.error("HTTP Response statusText:", error.response.statusText)
      console.error("HTTP Response data:", error.response.data)
      console.error("HTTP Response headers:", error.response.headers)
    }

    if (error.request) {
      console.error("Request details:", error.request)
    }

    // 404エラーの場合の詳細情報
    if (error.response?.status === 404) {
      console.error("404 Error Details:")
      console.error("- Check if the 'projects' endpoint exists in your microCMS service")
      console.error("- Verify the service domain is correct:", serviceDomain)
      console.error("- Ensure the API key has proper permissions")
      console.error("- Check if the microCMS service is active")
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
