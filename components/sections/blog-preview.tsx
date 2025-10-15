import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fetchBlogPosts, getBlogGenreLabel } from "@/lib/blog-posts"

function formatJapaneseDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPreview() {
  const posts = (await fetchBlogPosts())
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-24 md:py-32 below-fold bg-white dark:bg-neutral-900" aria-labelledby="blog-preview-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">LEXIA BLOG</span>
            <h2 id="blog-preview-heading" className="mt-3 text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              制作の裏側と集客ノウハウを発信中
            </h2>
            <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">
              WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。
            </p>
          </div>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors"
            >
              記事一覧を見る
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-neutral-100"
            >
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <Link
                  href={`/blog?genre=${post.genre}#genre-filter`}
                  aria-label={`${getBlogGenreLabel(post.genre)} の記事一覧`}
                  className="hover:underline"
                >
                  {getBlogGenreLabel(post.genre)}
                </Link>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-900">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{post.description}</p>
              {post.tags && post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 dark:border-neutral-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-6 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                <span>{formatJapaneseDate(post.date)}</span>
                <span>{post.readingTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:gap-3 dark:text-neutral-100"
                aria-label={`${post.title}を読む`}
              >
                記事を読む
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
