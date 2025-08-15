"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Tag } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Chip } from "@/components/ui/chip"
import { projectsData } from "@/lib/projects-data"
import { ProjectSchema } from "@/components/schema/project-schema"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white dark:bg-neutral-900">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
                Project Not Found
              </h1>
              <Breadcrumbs />
              <p className="text-neutral-700 dark:text-neutral-300 mb-8">
                The project you are looking for does not exist or has been moved.
              </p>
              <Link href="/projects" className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline">
                Back to Projects
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const relatedProjects = projectsData
    .filter((p) => p.slug !== project.slug && p.categories.some((cat) => project.categories.includes(cat)))
    .slice(0, 3)

  return (
    <>
      <ProjectSchema project={project} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
          <div className="mb-12">
            {project.categories[0] && <Chip>{project.categories[0]}</Chip>}
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-4">
              {project.title}
            </h1>
            <Breadcrumbs />
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-neutral-700 dark:text-neutral-300">
              {project.year && (
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{project.year}</span>
              )}
              {project.location && (
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{project.location}</span>
              )}
            </div>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                    <Tag className="h-3 w-3 mr-1" />{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-16">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((related) => (
                  <Link key={related.id} href={`/projects/${related.slug}`} className="block group">
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <Image src={related.image || "/placeholder.svg"} alt={related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{related.year}</p>
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Global CTA: encourage inquiry and browsing */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                このようなサイトを相談する
              </Link>
              <Link
                href="/services/web"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Web制作サービスを見る
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                実績一覧へ戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
