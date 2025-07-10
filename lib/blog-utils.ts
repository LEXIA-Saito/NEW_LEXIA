/**
 * Calculates the estimated reading time for a given text
 * @param content Array of paragraphs or string content
 * @param wordsPerMinute Average reading speed (default: 225 words per minute)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string[] | string, wordsPerMinute = 225): number {
  let text: string

  if (Array.isArray(content)) {
    text = content.join(" ")
  } else {
    text = content
  }

  // Count words in the text
  const words = text.trim().split(/\s+/).length

  // Calculate reading time in minutes
  const readingTime = Math.ceil(words / wordsPerMinute)

  // Return at least 1 minute
  return Math.max(1, readingTime)
}

/**
 * Formats the reading time into a human-readable string
 * @param minutes Reading time in minutes
 * @returns Formatted reading time string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return "Less than a minute"
  } else if (minutes === 1) {
    return "1 minute read"
  } else {
    return `${minutes} minute read`
  }
}

/**
 * Gets all posts in a specific series
 * @param seriesId The ID of the series
 * @param posts Array of all blog posts
 * @returns Array of posts in the series, sorted by series order
 */
export function getSeriesPosts(seriesId: string, posts: any[]): any[] {
  return posts
    .filter((post) => post.series?.id === seriesId)
    .sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0))
}

/**
 * Gets the next and previous posts in a series
 * @param currentPost The current post
 * @param allPosts Array of all blog posts
 * @returns Object containing next and previous posts in the series
 */
export function getSeriesNavigation(currentPost: any, allPosts: any[]): { next: any | null; previous: any | null } {
  if (!currentPost.series) {
    return { next: null, previous: null }
  }

  const seriesPosts = getSeriesPosts(currentPost.series.id, allPosts)
  const currentIndex = seriesPosts.findIndex((post) => post.id === currentPost.id)

  return {
    next: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
    previous: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
  }
}

/**
 * Gets all unique series from blog posts
 * @param posts Array of all blog posts
 * @returns Array of unique series objects with post counts
 */
export function getAllSeries(posts: any[]): any[] {
  const seriesMap = new Map()

  posts.forEach((post) => {
    if (post.series) {
      if (!seriesMap.has(post.series.id)) {
        seriesMap.set(post.series.id, {
          id: post.series.id,
          title: post.series.title,
          description: post.series.description,
          count: 1,
          image: post.series.image || post.image,
        })
      } else {
        const series = seriesMap.get(post.series.id)
        series.count += 1
        seriesMap.set(post.series.id, series)
      }
    }
  })

  return Array.from(seriesMap.values())
}
