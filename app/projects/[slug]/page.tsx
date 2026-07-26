import Link from "next/link"
import Image from "next/image"
import { MapPin, Tag } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Chip } from "@/components/ui/chip"
import { ProjectSchema } from "@/components/schema/project-schema"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { notFound } from "next/navigation"
import { fetchProject, fetchProjects } from "@/lib/microcms-projects"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await fetchProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata(props: ProjectPageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  const project = await fetchProject(slug)

  if (!project) {
    return {
      title: "プロジェクトが見つかりません | LEXIA",
    }
  }

  const canonical = `${SITE_URL.replace(/\/$/, "")}/projects/${project.slug}`

  return {
    title: `${project.title} | 制作実績 | LEXIA`,
    description: project.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.title} | 制作実績 | LEXIA`,
      description: project.description,
      type: "article",
      url: canonical,
      images: project.image
        ? [
            {
              url: project.image,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | 制作実績 | LEXIA`,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
    keywords: project.tags.length > 0 ? project.tags : undefined,
  }
}

export default async function ProjectPage(props: ProjectPageProps) {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  const project = await fetchProject(slug)

  if (!project) {
    notFound()
  }

  const allProjects = await fetchProjects()
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && (p.categories || []).some((cat) => (project.categories || []).includes(cat)))
    .slice(0, 3)

  const isDesignProject = (project.categories || []).includes("design")

  return (
    <>
      <ProjectSchema project={project} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
          <div className="mb-12">
            {(project.categories || [])[0] && <Chip>{project.categories[0]}</Chip>}
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-4">
              {project.title}
            </h1>
            <Breadcrumbs dynamicLabels={{ [project.slug]: project.title }} />
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-neutral-700 dark:text-neutral-300">
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
            {project.url && (
              <div className="mt-6">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  サイトを見る
                </Link>
              </div>
            )}
          </div>

          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-16">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          {/* 課題 → 施策 → 成果 → お客様の声（microCMS に入力された分だけ表示） */}
          {project.challenges && project.challenges.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">課題</h2>
              <ul className="space-y-3">
                {project.challenges.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.solutions &&
            (project.solutions.design.length > 0 ||
              project.solutions.tech.length > 0 ||
              project.solutions.growth.length > 0) && (
              <section className="mb-16">
                <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">実施したこと</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "デザイン", items: project.solutions.design },
                    { label: "技術", items: project.solutions.tech },
                    { label: "集客・改善", items: project.solutions.growth },
                  ]
                    .filter((group) => group.items.length > 0)
                    .map((group) => (
                      <div
                        key={group.label}
                        className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5"
                      >
                        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
                          {group.label}
                        </h3>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item} className="text-sm text-neutral-700 dark:text-neutral-300">
                              ・{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </section>
            )}

          {project.results && project.results.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">成果</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-6 text-lg text-neutral-900 dark:text-neutral-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                {project.resultsNote ??
                  "※成果は一例です。個社により異なり、特定の成果を保証するものではありません。"}
              </p>
            </section>
          )}

          {project.testimonial && (
            <section className="mb-16">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">お客様の声</h2>
              <blockquote className="border-l-2 border-neutral-900 dark:border-neutral-100 pl-6">
                <p className="text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  「{project.testimonial.text}」
                </p>
                <footer className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {project.testimonial.author}
                </footer>
              </blockquote>
            </section>
          )}

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((related) => (
                  <Link key={related.id} href={`/projects/${related.slug}`} className="block group">
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <Image src={related.image || "/placeholder.svg"} alt={related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
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
                {isDesignProject ? "このようなデザインを相談する" : "このようなサイトを相談する"}
              </Link>
              <Link
                href={isDesignProject ? "/services/design" : "/services/web"}
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                {isDesignProject ? "デザイン制作サービスを見る" : "Web制作サービスを見る"}
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
