"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Mail, ExternalLink } from "lucide-react"
import { authorData } from "@/lib/author-data"
import { useTranslations } from "@/lib/i18n"

interface AuthorProfileProps {
  authorSlug: string
}

export function AuthorProfile({ authorSlug }: AuthorProfileProps) {
  const t = useTranslations()
  // Find author data by slug
  const author = authorData.find((author) => author.slug === authorSlug)

  if (!author) {
    return null
  }

  const translatedName = t(author.nameKey)
  const translatedRole = t(author.roleKey)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
          <Image src={author.image || "/placeholder.svg"} alt={translatedName} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">{translatedName}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-3">{translatedRole}</p>
          </div>

          <p className="text-neutral-700 dark:text-neutral-300 mb-4 text-center md:text-left">{author.bio}</p>

          <div className="flex justify-center md:justify-start space-x-3">
            <Link
              href={`mailto:${author.email}`}
              className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
              aria-label={t("blog.aria.emailAuthor") + " " + translatedName}
            >
              <Mail className="h-5 w-5" />
            </Link>

            {author.linkedin && author.linkedin !== "#" && (
              <Link
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
                aria-label={t("blog.aria.linkedinAuthor") + " (" + translatedName + ")"}
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}

            <Link
              href={`/authors/${author.slug}`}
              className="bg-white dark:bg-neutral-700 p-2 rounded-full text-neutral-900 dark:text-neutral-100 hover:scale-110 transition-transform duration-300 shadow-sm"
              aria-label={t("blog.aria.viewAuthorProfile") + " (" + translatedName + ")"}
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
