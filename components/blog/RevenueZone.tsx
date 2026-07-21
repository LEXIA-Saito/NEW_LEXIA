'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import AdSenseResponsive, { AD_SLOTS } from '@/components/ads/AdSenseResponsive'

/**
 * 収益ゾーンコンポーネント
 * 
 * 記事読了後の最重要収益エリア
 * 配置順序: CTA → SNSシェア → 広告① → 関連記事 → 広告② → 新着記事
 */

interface RelatedPost {
  slug: string
  title: string
  description: string
  heroImage?: string
  date: string
  readingTime: string
}

interface RevenueZoneProps {
  /** 現在の記事タイトル */
  articleTitle: string
  /** 現在の記事URL */
  articleUrl: string
  /** 現在の記事ジャンル */
  genre: string
  /** 同ジャンルの関連記事 */
  relatedPosts: RelatedPost[]
  /** 新着記事 */
  latestPosts: RelatedPost[]
  /** ジャンルラベル */
  genreLabel: string
}

// SNSシェアボタン
function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${title}\n`)
    const shareUrl = encodeURIComponent(url)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const shareOnFacebook = () => {
    const shareUrl = encodeURIComponent(url)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-2">
        <Share2 className="inline-block w-4 h-4 mr-1" />
        シェア
      </span>
      <button
        onClick={shareOnTwitter}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1DA1F2] text-white hover:opacity-80 transition-opacity"
        aria-label="Twitterでシェア"
      >
        <Twitter className="w-5 h-5" />
      </button>
      <button
        onClick={shareOnFacebook}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity"
        aria-label="Facebookでシェア"
      >
        <Facebook className="w-5 h-5" />
      </button>
      <button
        onClick={copyToClipboard}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        aria-label="URLをコピー"
      >
        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  )
}

// 記事カード（コンパクト版）
function ArticleCardCompact({ post }: { post: RelatedPost }) {
  return (
    <article className="flex gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 hover:shadow-md transition-shadow">
      {post.heroImage && (
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Link 
          href={`/blog/${post.slug}`}
          className="block font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {post.title}
        </Link>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {post.description}
        </p>
        <span className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {post.readingTime}
        </span>
      </div>
    </article>
  )
}

export default function RevenueZone({
  articleTitle,
  articleUrl,
  genre,
  relatedPosts,
  latestPosts,
  genreLabel,
}: RevenueZoneProps) {
  return (
    <section 
      className="revenue-zone mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800"
      aria-label="記事を読んでいただいた方へ"
    >
      {/* 1. 感謝CTA */}
      <div className="text-center mb-8">
        <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
          最後までお読みいただきありがとうございます
        </p>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          この記事が参考になりましたら、ぜひシェアや他の記事もご覧ください。
        </p>
      </div>

      {/* 2. SNSシェアボタン */}
      <div className="mb-10">
        <ShareButtons title={articleTitle} url={articleUrl} />
      </div>

      {/* 3. 広告①（メイン・最重要） */}
      <div className="mb-12">
        <AdSenseResponsive
          slot={AD_SLOTS.ARTICLE_BOTTOM_MAIN}
          format="rectangle"
          minHeight={250}
          position="article-bottom-main"
          className="mx-auto max-w-xl"
        />
      </div>

      {/* 4. 関連記事（同ジャンル優先） */}
      {relatedPosts.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              <span className="text-blue-600 dark:text-blue-400">{genreLabel}</span>
              の関連記事
            </h3>
            <Link
              href={`/blog?genre=${genre}#genre-filter`}
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              もっと見る →
            </Link>
          </div>
          <div className="space-y-4">
            {relatedPosts.slice(0, 3).map((post) => (
              <ArticleCardCompact key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* 5. 広告②（回遊前） */}
      <div className="mb-10">
        <AdSenseResponsive
          slot={AD_SLOTS.ARTICLE_BOTTOM_SUB}
          format="auto"
          minHeight={150}
          position="article-bottom-sub"
        />
      </div>

      {/* 6. 新着記事（回遊促進） */}
      {latestPosts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              新着記事
            </h3>
            <Link
              href="/blog"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              一覧を見る →
            </Link>
          </div>
          <div className="space-y-4">
            {latestPosts.slice(0, 3).map((post) => (
              <ArticleCardCompact key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* CTA: お問い合わせ導線 */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          LEXIA BLOGの運営は、ホームページ制作・システム開発を行うWEB制作事業
          <strong className="text-neutral-900 dark:text-neutral-100">LEXIA</strong>
          が行っています。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium text-sm hover:opacity-90 transition-opacity"
          >
            制作の相談をする
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/services/web"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            サービス一覧
          </Link>
        </div>
      </div>
    </section>
  )
}
