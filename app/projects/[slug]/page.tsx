"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Ruler, User, Building, Check, ArrowUpRight } from "lucide-react"
import { Chip } from "@/components/ui/chip"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ProjectSchema } from "@/components/schema/project-schema"
import { projectsData } from "@/lib/projects-data"
import { VRViewer } from "@/components/vr-viewer"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // Get project info
  const projectSlug = params.slug.toLowerCase()
  const project = projectsData.find((p) => p.slug === projectSlug)

  // Get related projects (same category, excluding current)
  const relatedProjects = projectsData
    .filter((p) => p.category === project?.category && p.id !== project?.id)
    .slice(0, 3)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
              <p className="text-neutral-700 dark:text-neutral-300 mb-8">
                The project you are looking for does not exist or has been moved.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!isLoaded) {
    return null // Prevent flash of unstyled content
  }

  return (
    <>
      <ProjectSchema project={project} />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip href={`/categories/${project.category.toLowerCase()}`}>{project.category}</Chip>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="text-neutral-900 dark:text-neutral-100 font-medium">{project.year}</p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="text-neutral-900 dark:text-neutral-100 font-medium">{project.location}</p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 mb-2">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span className="text-sm">Area</span>
                  </div>
                  <p className="text-neutral-900 dark:text-neutral-100 font-medium">{project.area}</p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="text-sm">Client</span>
                  </div>
                  <p className="text-neutral-900 dark:text-neutral-100 font-medium">{project.client}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Image Gallery */}
          <div className="mb-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
              <Image
                src={project.images[activeImage] || project.coverImage}
                alt={`${project.title} - Image ${activeImage + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {project.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
                      activeImage === index ? "ring-2 ring-neutral-900 dark:ring-neutral-100" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Virtual Tour */}
          {project.hasVirtualTour && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">Virtual Tour</h2>
              <div className="aspect-[16/9] rounded-lg overflow-hidden">
                <VRViewer imageUrl={project.virtualTourImage} />
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">Project Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-neutral-900 dark:text-neutral-100 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-6">Architects</h2>
              <ul className="space-y-4">
                {project.architects.map((architect, index) => (
                  <li key={index} className="flex items-center">
                    <User className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" />
                    <span className="text-neutral-700 dark:text-neutral-300">{architect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm"
                  >
                    <Link href={`/projects/${relatedProject.slug}`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={relatedProject.coverImage || "/placeholder.svg"}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                          {relatedProject.category}
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                        <span>{relatedProject.year}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedProject.location}</span>
                      </div>
                      <Link href={`/projects/${relatedProject.slug}`}>
                        <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 hover:underline">
                          {relatedProject.title}
                        </h3>
                      </Link>
                      <Link
                        href={`/projects/${relatedProject.slug}`}
                        className="inline-flex items-center text-neutral-900 dark:text-neutral-100 text-sm hover:underline group"
                      >
                        View Project
                        <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
