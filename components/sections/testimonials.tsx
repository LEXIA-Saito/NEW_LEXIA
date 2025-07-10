"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { t } from "@/lib/i18n"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Startup Founder",
    quote:
      "LEXIA took our startup's vision and crafted a website that perfectly balances aesthetics and user experience. Their attention to detail and collaborative approach were key to our successful launch.",
    image: "/testimonials/person-1.png", // Placeholder, consider updating image for new role
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "E-commerce Store Owner",
    quote:
      "Partnering with LEXIA for our e-commerce platform was seamless. They understood our brand and built a site that our customers find intuitive and engaging, significantly boosting sales.",
    image: "/testimonials/person-2.png", // Placeholder, consider updating image for new role
  },
  {
    id: 3,
    name: "Amelia Rodriguez",
    title: "SaaS Product Manager",
    quote:
      "I've partnered with many design agencies, but LEXIA stands out for their user-centric approach and innovative web solutions. They consistently deliver products that exceed user expectations and drive engagement.",
    image: "/testimonials/person-3.png", // Placeholder, consider updating image for new role
  },
  {
    id: 4,
    name: "David Okafor",
    title: "Head of Digital",
    quote:
      "LEXIA's redesign of our corporate website has completely transformed our online presence. The thoughtful UX has improved lead generation, and we're proud to direct clients to our new site.",
    image: "/testimonials/person-4.png", // Placeholder, consider updating image for new role
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  // Auto-advance the carousel
  useEffect(() => {
    const startTimeout = () => {
      timeoutRef.current = setTimeout(() => {
        goToNext()
      }, 6000)
    }

    startTimeout()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex])

  // Reset the timeout when manually navigating
  const handleNavigation = (callback: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    callback()
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

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Chip>お客様の声</Chip>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mt-4 mb-6">
            {t('ourWork.clientsSay')}
          </h2>
        </motion.div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
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
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 md:p-10 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Quote className="h-8 w-8 text-neutral-300 dark:text-neutral-600 mb-2" />
                      <p className="text-neutral-700 dark:text-neutral-300 italic mb-4">
                        "{testimonials[currentIndex].quote}"
                      </p>
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                          {testimonials[currentIndex].title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-neutral-900 dark:bg-neutral-100 w-6" : "bg-neutral-300 dark:bg-neutral-600"
              }`}
              aria-label={`テストモニアル${index + 1}へ`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white dark:bg-neutral-800 shadow-md rounded-full h-10 w-10"
          onClick={() => handleNavigation(goToPrevious)}
          aria-label="前の声へ"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white dark:bg-neutral-800 shadow-md rounded-full h-10 w-10"
          onClick={() => handleNavigation(goToNext)}
          aria-label="次の声へ"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
