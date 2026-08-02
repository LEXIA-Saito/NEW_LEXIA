'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import AffiliateRecommendations from '@/components/blog/AffiliateRecommendations'
/**
 * 回遊促進ゾーンコンポーネント
 * 
 * 記事読了後の回遊促進エリア
 * 感謝CTA → SNSシェア → 提携サービス → デスク環境ガイド → 無料ツール → 関連記事 → 新着記事 の順番
 * 
 * ※ Google自動広告はコンテンツの区切りを自動検出し最適な位置に広告を配置するため、
 *   広告スペースの事前確保は不要です
 */

interface RelatedPost {
  slug: string
  title: string
  description: string
  heroImage?: string
  date: string
  readingTime: string
}

interface RevenueZoneAutoProps {
  /** 現在の記事スラッグ */
  articleSlug: string
  /** 現在の記事タイトル */
  articleTitle: string
  /** 現在の記事URL */
  articleUrl: string
  /** 現在の記事ジャンル */
  genre: string
  /** 現在の記事タグ */
  tags?: string[]
  /** 同ジャンルの関連記事 */
  relatedPosts: RelatedPost[]
  /** 新着記事 */
  latestPosts: RelatedPost[]
  /** 全記事への内部リンク（クロール網羅・回遊用の軽量リスト） */
  morePosts?: { slug: string; title: string; genre: string }[]
  /** ジャンルラベル */
  genreLabel: string
}

// 在宅ワーク・デスク環境ガイド（og.lexia-hp.com）への内部リンク。
// 別サブドメインの物販記事へ導線を張り、回遊とクロール誘導・権威移転を両立する。
const DESK_GUIDES: { slug: string; title: string; desc: string }[] = [
  { slug: 'remote-work-desk-setup-roadmap', title: '在宅デスク環境 完全ガイド', desc: '快適な作業環境の作り方を総まとめ' },
  { slug: 'monitor-arm-guide', title: 'モニターアームの選び方', desc: 'デスクを広く使う定番アイテム' },
  { slug: 'laptop-stand-guide', title: 'ノートPCスタンド', desc: '姿勢改善と冷却に効く一台' },
  { slug: 'standing-desk-guide', title: 'スタンディングデスク', desc: '昇降デスクの比較と選び方' },
  { slug: 'ergonomic-chair-guide', title: '疲れないワークチェア', desc: '長時間作業を支える椅子選び' },
  { slug: 'docking-station-guide', title: 'ドッキングステーション', desc: 'ケーブル1本で拡張する' },
]

const OG_BASE = 'https://og.lexia-hp.com/articles'

// 自社無料ツール（tools.lexia-hp.com）への内部リンク。
// フッターだけではクロールに拾われず個別ツールページが未インデックスのままだったため、
// og. と同じく全記事の記事下からも導線を張ってクロール誘導・権威移転を狙う。
const FREE_TOOLS: { slug: string; title: string; desc: string }[] = [
  { slug: 'image-converter', title: '画像フォーマット変換', desc: 'PNG・JPG・WebP をブラウザで相互変換' },
  { slug: 'image-resizer', title: '画像リサイズ', desc: 'サイズ指定・一括リサイズに対応' },
  { slug: 'zip-tool', title: 'ZIP圧縮・解凍', desc: 'アップロード不要でその場で処理' },
  { slug: 'file-renamer', title: 'ファイル名一括変更', desc: '連番・置換でまとめてリネーム' },
]

const TOOLS_BASE = 'https://tools.lexia-hp.com'

// SNSシェアボタン
function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  const shareOnTwitter = () => {
    trackEvent('share', { method: 'x', content_type: 'article', item_id: url })
    const text = encodeURIComponent(`${title}\n`)
    const shareUrl = encodeURIComponent(url)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const shareOnFacebook = () => {
    trackEvent('share', { method: 'facebook', content_type: 'article', item_id: url })
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
      trackEvent('share', { method: 'copy', content_type: 'article', item_id: url })
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
// ヒーロー画像は16:9のアスペクト比で統一
function ArticleCardCompact({ post }: { post: RelatedPost }) {
  return (
    <article className="flex gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 hover:shadow-md transition-shadow">
      {post.heroImage && (
        <div className="relative w-32 flex-shrink-0 overflow-hidden rounded-lg aspect-video">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="128px"
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

export default function RevenueZoneAuto({
  articleSlug,
  articleTitle,
  articleUrl,
  genre,
  tags,
  relatedPosts,
  latestPosts,
  morePosts,
  genreLabel,
}: RevenueZoneAutoProps) {
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

      {/* 3. 記事テーマに合う提携サービスだけを表示 */}
      <AffiliateRecommendations
        articleSlug={articleSlug}
        articleTitle={articleTitle}
        genre={genre}
        tags={tags}
      />

      {/* 4. 物販比較記事への送客 */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            AI・開発作業を快適にする
            <span className="text-blue-600 dark:text-blue-400">デスク環境</span>
          </h3>
          <a
            href={`${OG_BASE}/remote-work-desk-setup-roadmap`}
            data-affiliate-funnel="desk-guide"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            比較ガイドを見る →
          </a>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          購入前に比較しやすいよう、用途別の選び方をまとめています。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {DESK_GUIDES.slice(0, 4).map((g) => (
            <a
              key={g.slug}
              href={`${OG_BASE}/${g.slug}`}
              data-affiliate-funnel="desk-guide"
              className="block p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <span className="block font-semibold text-neutral-900 dark:text-neutral-100">
                {g.title}
              </span>
              <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                {g.desc}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 5. 自社無料ツールへの送客（tools.lexia-hp.com のクロール誘導も兼ねる） */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            ブラウザで完結する
            <span className="text-blue-600 dark:text-blue-400">無料ツール</span>
          </h3>
          <a
            href={TOOLS_BASE}
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            ツール一覧を見る →
          </a>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          LEXIA が制作現場向けに開発した無料ツールです。登録不要・ブラウザ上で処理が完結します。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {FREE_TOOLS.map((t) => (
            <a
              key={t.slug}
              href={`${TOOLS_BASE}/${t.slug}`}
              data-tools-funnel="blog-footer"
              className="block p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <span className="block font-semibold text-neutral-900 dark:text-neutral-100">
                {t.title}
              </span>
              <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                {t.desc}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 6. 関連記事（同ジャンル優先） */}
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
            {relatedPosts.slice(0, 6).map((post) => (
              <ArticleCardCompact key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* 7. 新着記事（回遊促進） */}
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
            {latestPosts.slice(0, 6).map((post) => (
              <ArticleCardCompact key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* すべての記事（内部リンク網羅：未クロール記事へのクロール誘導・回遊促進） */}
      {morePosts && morePosts.length > 0 && (
        <div className="mb-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              LEXIA BLOG のすべての記事
            </h3>
            <Link
              href="/blog"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              ブログトップ →
            </Link>
          </div>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {morePosts.map((p) => (
              <li key={p.slug} className="leading-snug">
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  )
}
