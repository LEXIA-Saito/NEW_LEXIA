import { fetchBlogPosts } from "./blog-posts"
import { withComputedReadingTime } from "./reading-time"
import type { BlogPost } from "./blog-posts.types"

/**
 * 指定されたスラッグの記事に関連する記事を取得する
 * @param currentSlug 現在の記事のスラッグ
 * @param limit 取得する関連記事の最大数
 * @returns 関連記事の配列
 */
export async function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await fetchBlogPosts()
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost) {
    return []
  }

  // 現在の記事を除外
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)
  
  // タグの一致度でスコアリング
  const scoredPosts = otherPosts.map(post => {
    let score = 0
    
    // 同じジャンルの場合はスコア+2
    if (post.genre === currentPost.genre) {
      score += 2
    }
    
    // タグの一致数でスコア加算
    const matchingTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    ).length
    score += matchingTags
    
    return { post, score }
  })
  
  // スコアの高い順にソートして、指定された数だけ返す
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

/**
 * 特定の記事を関連記事として取得する(手動指定用)
 * @param slug 取得したい記事のスラッグ
 * @returns 記事データまたはnull
 */
export async function getSpecificArticle(slug: string): Promise<(BlogPost & { readingTime: string }) | null> {
  const { fetchBlogPost } = await import("./blog-posts")
  const post = await fetchBlogPost(slug)
  return post || null
}