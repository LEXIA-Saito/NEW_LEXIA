"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, ExternalLink, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"

// Project categories
const categories = [
  { id: "all", name: "All" },
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "interior", name: "Interior" },
  { id: "exterior", name: "Exterior" },
  { id: "sustainable", name: "Sustainable" },
]

// Portfolio projects data with categories and testimonials
const projects = [
  {
    id: 1,
    title: "Minimalist Villa",
    description: "A contemporary villa with clean lines and natural materials",
    image: "/portfolio/house-1.png",
    slug: "minimalist-villa",
    categories: ["residential", "exterior", "sustainable"],
    featured: true,
    testimonial: {
      quote:
        "Risala Design transformed our vision into a home that perfectly balances aesthetics and functionality. Their attention to detail made all the difference.",
      author: "Sarah Johnson",
      role: "Homeowner",
      image: "/testimonials/person-1.png",
    },
    hasVR: true,
    location: "Bali, Indonesia",
    year: "2023",
  },
  {
    id: 2,
    title: "Urban Apartment",
    description: "Modern apartment renovation in the heart of the city",
    image: "/portfolio/house-2.png",
    slug: "urban-apartment",
    categories: ["residential", "interior"],
    featured: true,
    location: "Jakarta, Indonesia",
    year: "2022",
  },
  {
    id: 3,
    title: "Coastal Retreat",
    description: "Beachfront home designed to embrace the natural surroundings",
    image: "/portfolio/house-3.png",
    slug: "coastal-retreat",
    categories: ["residential", "exterior", "sustainable"],
    featured: false,
    location: "Lombok, Indonesia",
    year: "2023",
  },
  {
    id: 4,
    title: "Office Complex",
    description: "Contemporary office space designed for collaboration",
    image: "/portfolio/house-4.png",
    slug: "office-complex",
    categories: ["commercial", "interior"],
    featured: true,
    testimonial: {
      quote:
        "Our office renovation has completely transformed our workspace. The thoughtful design has improved team collaboration and created a space we're proud to bring clients to.",
      author: "David Okafor",
      role: "Office Manager",
      image: "/testimonials/person-4.png",
    },
    location: "Singapore",
    year: "2022",
  },
  {
    id: 5,
    title: "Garden House",
    description: "Sustainable home integrated with its garden landscape",
    image: "/portfolio/house-5.png",
    slug: "garden-house",
    categories: ["residential", "exterior", "sustainable"],
    featured: false,
    location: "Bandung, Indonesia",
    year: "2021",
  },
  {
    id: 6,
    title: "Retail Space",
    description: "Modern retail environment focused on customer experience",
    image: "/portfolio/house-6.png",
    slug: "retail-space",
    categories: ["commercial", "interior"],
    featured: true,
    testimonial: {
      quote:
        "Working with Risala on our store redesign was a seamless experience. They understood our brand and created a space that our customers love to spend time in.",
      author: "Michael Chen",
      role: "Store Owner",
      image: "/testimonials/person-2.png",
    },
    location: "Jakarta, Indonesia",
    year: "2022",
  },
]

// Featured testimonials for carousel
const testimonials = [
  {
    id: 1,
    quote:
      "I've worked with many architects, but Risala Design stands out for their collaborative approach and innovative solutions. They consistently deliver projects that exceed expectations.",
    author: "Amelia Rodriguez",
    role: "Real Estate Developer",
    image: "/testimonials/person-3.png",
  },
  {
    id: 2,
    quote:
      "Risala Design transformed our vision into a home that perfectly balances aesthetics and functionality. Their attention to detail made all the difference.",
    author: "Sarah Johnson",
    role: "Homeowner",
    image: "/testimonials/person-1.png",
  },
  {
    id: 3,
    quote:
      "Working with Risala on our store redesign was a seamless experience. They understood our brand and created a space that our customers love to spend time in.",
    author: "Michael Chen",
    role: "Store Owner",
    image: "/testimonials/person-2.png",
  },
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState(0)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Filter projects based on active category and filters
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.categories.includes(activeCategory)

    // If no filters are active, just check category
    if (activeFilters.length === 0) return matchesCategory

    // Check if project matches any active filter
    const matchesFilter = activeFilters.some((filter) => {
      if (filter === "recent" && project.year === "2023") return true
      if (filter === "indonesia" && project.location.includes("Indonesia")) return true
      if (filter === "vr" && project.hasVR) return true
      return false
    })

    return matchesCategory && matchesFilter
  })

  // Featured projects for the showcase
  const featuredProjects = projects.filter((project) => project.featured)

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <Chip>Our Work</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            Featured Projects
          </h2>
        </motion.div>
      </div>

      {/* Featured Projects Showcase */}
      <div className="mb-24">
        {featuredProjects.slice(0, 2).map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 md:gap-12 items-center mb-24`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="w-full md:w-1/2">
              <Link href={`/projects/${project.slug}`}>
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                  {project.hasVR && (
                    <div className="absolute top-4 right-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      VR Tour
                    </div>
                  )}
                </motion.div>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3">{project.title}</h3>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">{project.description}</p>

                {project.testimonial && (
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg mb-6 transform transition-transform duration-300 hover:scale-[1.01]">
                    <Quote className="h-6 w-6 text-neutral-300 dark:text-neutral-600 mb-2" />
                    <p className="text-neutral-700 dark:text-neutral-300 italic mb-4">"{project.testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={project.testimonial.image || "/placeholder.svg"}
                          alt={project.testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                          {project.testimonial.author}
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs">{project.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mb-6">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <Link href={`/projects/${project.slug}`}>
                  <Button className="rounded-full bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 group">
                    <span>View Project</span>
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Testimonials Carousel */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <motion.h3
            className="text-2xl font-light text-neutral-900 dark:text-neutral-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            What Our Clients Say
          </motion.h3>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div className="relative h-[250px] md:h-[200px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  <motion.div
                    className="bg-neutral-50 dark:bg-neutral-800 p-6 md:p-8 rounded-lg text-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Quote className="h-6 w-6 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-700 dark:text-neutral-300 italic mb-6">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                          alt={testimonials[currentTestimonial].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentTestimonial ? 1 : -1)
                  setCurrentTestimonial(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-neutral-900 dark:bg-neutral-100 w-6"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white dark:bg-neutral-800 shadow-md rounded-full h-10 w-10"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white dark:bg-neutral-800 shadow-md rounded-full h-10 w-10"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div>
        <div className="text-center mb-12">
          <motion.h3
            className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            Explore Our Portfolio
          </motion.h3>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Additional filters */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="rounded-full flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
              </Button>

              {showFilterMenu && (
                <motion.div
                  className="absolute top-full mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-3 z-10 min-w-[200px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="filter-recent"
                        checked={activeFilters.includes("recent")}
                        onChange={() => toggleFilter("recent")}
                        className="rounded text-neutral-900 dark:text-neutral-100"
                      />
                      <label htmlFor="filter-recent" className="text-sm">
                        Recent (2023)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="filter-indonesia"
                        checked={activeFilters.includes("indonesia")}
                        onChange={() => toggleFilter("indonesia")}
                        className="rounded text-neutral-900 dark:text-neutral-100"
                      />
                      <label htmlFor="filter-indonesia" className="text-sm">
                        Indonesia
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="filter-vr"
                        checked={activeFilters.includes("vr")}
                        onChange={() => toggleFilter("vr")}
                        className="rounded text-neutral-900 dark:text-neutral-100"
                      />
                      <label htmlFor="filter-vr" className="text-sm">
                        VR Tour Available
                      </label>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-2">
                      <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])} className="w-full text-xs">
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className="relative aspect-[3/4] overflow-hidden group rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                    {project.hasVR && (
                      <div className="absolute top-4 right-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        VR Tour
                      </div>
                    )}

                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
                          {project.title}
                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </h3>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.categories.map((category) => (
                            <span
                              key={category}
                              className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-12">
          <Link href="/categories">
            <Button
              variant="outline"
              className="rounded-full group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              as={motion.button}
            >
              <span>View All Categories</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
