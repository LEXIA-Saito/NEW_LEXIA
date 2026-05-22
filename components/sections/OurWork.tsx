import { fetchProjects } from "@/lib/microcms-projects"
import OurWorkClient from "./OurWorkClient"

export default async function OurWork() {
  const projects = await fetchProjects()
  // Filter featured projects for top page
  const featuredProjects = projects.filter((p) => p.featured)

  return <OurWorkClient initialProjects={featuredProjects.length > 0 ? featuredProjects : projects} />
}

