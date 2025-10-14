import type { BlogPost, BlogPostSection } from "./blog-posts.types"
import type { SanityBlogPost, SanityBlogSection } from "./sanity"
import { withComputedReadingTime } from "./reading-time"

/**
 * SanityBlogSectionをBlogPostSectionに変換
 */
function convertSanitySection(sanitySection: SanityBlogSection): BlogPostSection {
  return {
    heading: sanitySection.heading,
    body: sanitySection.body,
    image: sanitySection.image,
    imageAlt: sanitySection.imageAlt,
    list: sanitySection.list,
    table: sanitySection.table,
  }
}

/**
 * SanityBlogPostをBlogPostに変換
 */
function convertSanityBlogPost(sanityPost: SanityBlogPost): BlogPost {
  const blogPost: BlogPost = {
    slug: sanityPost.slug,
    title: sanityPost.title,
    description: sanityPost.description,
    genre: sanityPost.genre,
    tags: sanityPost.tags,
    date: sanityPost.date,
    heroImage: sanityPost.heroImage,
    heroImageAlt: sanityPost.heroImageAlt,
    sections: sanityPost.sections?.map(convertSanitySection),
    contentHtml: sanityPost.contentHtml,
  }

  // 読了時間を計算して追加
  return withComputedReadingTime(blogPost)
}

/**
 * 複数のSanityBlogPostをBlogPostの配列に変換
 */
export function convertSanityBlogPosts(sanityPosts: SanityBlogPost[]): (BlogPost & { readingTime: string })[] {
  return sanityPosts.map(convertSanityBlogPost)
}

/**
 * 単一のSanityBlogPostをBlogPostに変換
 */
export function convertSanityBlogPostSingle(sanityPost: SanityBlogPost): BlogPost & { readingTime: string } {
  return convertSanityBlogPost(sanityPost)
}