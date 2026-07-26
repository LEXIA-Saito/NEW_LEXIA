import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BlogPost } from "./blog-posts.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatJapaneseDate(date: string) {
  try {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo",
    })
  } catch {
    return date
  }
}

/**
 * Calculate word count for a blog post to be used in structured data
 * @param post - Blog post object
 * @returns Estimated word count
 */
export function calculateWordCount(post: BlogPost): number {
  if (post.contentHtml) {
    // Remove HTML tags and calculate length
    return post.contentHtml.replace(/<[^>]*>/g, '').length
  }
  
  if (post.sections && post.sections.length > 0) {
    // Calculate from sections body text
    return post.sections.reduce((acc, section) => {
      const bodyLength = section.body?.join(' ').length || 0
      return acc + bodyLength
    }, 0)
  }
  
  return 0
}
