import { microcmsFetch, type MicroCMSListResponse } from "./microcms"
import type { BlogPost, BlogGenre, BlogHeading } from "./blog-posts.types"
import { withComputedReadingTime } from "./reading-time"

/**
 * microCMSから取得するブログ記事の型定義
 * 2025-10-17スキーマ変更対応
 */
export type MicroCMSBlogPost = {
  id: string
  slug: string
  title: string
  description: string
  genre: BlogGenre | BlogGenre[]  // microCMSは配列で返す場合がある
  tags?: string[]  // オプショナル（スキーマから削除）
  date: string
  latest_update?: string  // 最終更新日（新規フィールド）
  heroImage?: string | { url: string; width?: number; height?: number }  // microCMSは画像をオブジェクトで返す
  heroImageAlt?: string
  // アプローチA: contentHtml（リッチエディタV2で全文を管理）
  contentHtml?: string
  // アプローチB: sections（構造化データ - fallback互換用）
  sections?: {
    heading?: string
    body?: string      // 改行区切りの文字列（プレーンテキスト）
    richtext?: string  // リッチエディタV2（HTML）
    list?: string      // 改行区切りの文字列
    image?: string
    imageAlt?: string
    tableHeaders?: string  // カンマ区切りの文字列
    tableRows?: string     // 改行区切り、各行はカンマ区切り
  }[]
  // アプローチC: custom（新スキーマ - 繰り返し本文ブロック）
  custom?: {
    body_text?: string  // リッチエディタV2（HTML）
    body_img?: { url: string } | string  // 本文中の画像
    others_cta?: {
      id: string
      slug?: string
      title?: string
    }  // 他記事導線
  }[]
  publishedAt?: string
  updatedAt?: string
}

/**
 * microCMSの記事データをアプリケーション内部の型に変換
 */
function convertMicroCMSPost(post: MicroCMSBlogPost): BlogPost & { readingTime: string } {
  // 必須フィールドのバリデーション
  if (!post.slug || typeof post.slug !== "string" || post.slug.trim().length === 0) {
    throw new Error(`Invalid slug in microCMS post: ${JSON.stringify(post)}`)
  }
  if (!post.title || typeof post.title !== "string") {
    throw new Error(`Invalid title in microCMS post with slug: ${post.slug}`)
  }
  
  // genreが配列の場合は最初の要素を取得（microCMSのセレクトフィールドが配列を返す場合がある）
  const genre: BlogGenre = Array.isArray(post.genre) 
    ? (post.genre[0] as BlogGenre) || "AI"
    : (post.genre as BlogGenre) || "AI"
  
  // heroImageがオブジェクトの場合はURLを抽出
  const heroImage = post.heroImage 
    ? (typeof post.heroImage === 'string' ? post.heroImage : post.heroImage.url)
    : undefined
  
  // customフィールド（新スキーマ）の処理
  const customBlocks = post.custom?.map((block) => {
    const imageUrl = block.body_img 
      ? (typeof block.body_img === 'string' ? block.body_img : block.body_img.url)
      : undefined

    return {
      body_text: block.body_text,
      body_img: imageUrl,
      others_cta: block.others_cta,
    }
  })

  const blogPost: BlogPost = {
    slug: post.slug.trim(),
    title: post.title,
    description: post.description || "",
    genre: genre,
    tags: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : undefined, // tagsが存在しない場合はundefined
    date: post.date,
    latest_update: post.latest_update, // 最終更新日を追加
    heroImage: heroImage,
    heroImageAlt: post.heroImageAlt,
    // contentHtmlがある場合はそれを使用
    contentHtml: post.contentHtml,
    // customブロック（新スキーマ）
    custom: customBlocks,
    // sectionsがある場合は変換、ない場合は空配列
    sections: post.sections ? post.sections.map((section) => {
      const converted: any = {
        heading: section.heading,
        image: section.image,
        imageAlt: section.imageAlt,
      }

      // body: 改行区切り → 配列に変換（プレーンテキスト）
      if (section.body) {
        converted.body = section.body
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
      }

      // richtext: そのままHTML文字列として保持
      if (section.richtext) {
        converted.richtext = section.richtext
      }

      // list: 改行区切り → 配列に変換
      if (section.list) {
        converted.list = section.list
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
      }

      // table: tableHeadersとtableRowsから構築
      if (section.tableHeaders && section.tableRows) {
        const headers = section.tableHeaders
          .split(",")
          .map((h) => h.trim())
          .filter((h) => h.length > 0)

        const rows = section.tableRows
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((row) =>
            row
              .split(",")
              .map((cell) => cell.trim())
          )

        if (headers.length > 0 && rows.length > 0) {
          converted.table = { headers, rows }
        }
      }

      return converted
    }) : [],
    // readingTimeはフォールバックとして設定（後で自動計算される）
    readingTime: "5分",
  }

  return withComputedReadingTime(blogPost)
}

/**
 * microCMSから全ブログ記事を取得
 * @param limit 取得する記事数（デフォルト: 100）
 */
export async function fetchMicroCMSBlogPosts(
  limit = 100,
): Promise<(BlogPost & { readingTime: string })[]> {
  try {
    const response = await microcmsFetch<MicroCMSListResponse<MicroCMSBlogPost>>(
      "blog", // microCMSのエンドポイント名（適宜変更してください）
      {
        limit,
        orders: "-date", // 日付の降順でソート
      },
      {
        next: {
          revalidate: 60, // 60秒ごとに再検証
          tags: ["microcms-blog"],
        },
      },
    )

    // レスポンスデータのバリデーション
    if (!response || !Array.isArray(response.contents)) {
      console.warn("Invalid response from microCMS:", response)
      return []
    }

    // 各記事を変換し、エラーがあるものはスキップ
    const validPosts: (BlogPost & { readingTime: string })[] = []
    for (const post of response.contents) {
      try {
        validPosts.push(convertMicroCMSPost(post))
      } catch (conversionError) {
        console.error("Failed to convert microCMS post:", conversionError)
        // 変換エラーがあった記事はスキップして続行
      }
    }

    return validPosts
  } catch (error) {
    console.error("Failed to fetch blog posts from microCMS:", error)
    throw error
  }
}

/**
 * microCMSから特定のスラッグの記事を取得
 * @param slug 記事のスラッグ
 */
export async function fetchMicroCMSBlogPost(
  slug: string,
): Promise<(BlogPost & { readingTime: string }) | null> {
  try {
    const response = await microcmsFetch<MicroCMSListResponse<MicroCMSBlogPost>>(
      "blog",
      {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
      {
        next: {
          revalidate: 60,
          tags: [`microcms-blog-${slug}`],
        },
      },
    )

    if (response.contents.length === 0) {
      return null
    }

    // 変換時のエラーをキャッチ
    try {
      return convertMicroCMSPost(response.contents[0])
    } catch (conversionError) {
      console.error(`Failed to convert microCMS post "${slug}":`, conversionError)
      return null
    }
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from microCMS:`, error)
    // エラーをスローせずnullを返す（フォールバックに任せる）
    return null
  }
}
