/* eslint-disable @next/next/no-img-element */

interface AffiliateRecommendationsProps {
  articleSlug: string
  articleTitle: string
  genre: string
  tags?: string[]
}

interface AffiliateOffer {
  id: string
  title: string
  description: string
  cta: string
  href: string
  trackingPixel: string
  matches: (context: string, genre: string) => boolean
}

const AFFILIATE_OFFERS: AffiliateOffer[] = [
  {
    id: 'parallels',
    title: 'MacでWindowsを使うなら Parallels',
    description:
      'Mac上でWindows専用アプリや検証環境を動かしたい方向け。購入前に無料トライアルで動作を確認できます。',
    cta: '公式サイトで確認する',
    href: 'https://px.a8.net/svt/ejp?a8mat=4B650J+EV8PMA+49UM+5YJRM',
    trackingPixel:
      'https://www13.a8.net/0.gif?a8mat=4B650J+EV8PMA+49UM+5YJRM',
    matches: (context) =>
      /\bmac(?:os)?\b|windows|apple|open-notebook|仮想化/i.test(context),
  },
  {
    id: 'onamae',
    title: 'サイト公開用の独自ドメインを取得する',
    description:
      'Webサイトやブログの公開に使うドメイン候補です。取得料金だけでなく、更新料金も確認して選びましょう。',
    cta: 'お名前.comで料金を確認する',
    href: 'https://px.a8.net/svt/ejp?a8mat=45G5XJ+C08PYQ+50+2HFY7M',
    trackingPixel:
      'https://www14.a8.net/0.gif?a8mat=45G5XJ+C08PYQ+50+2HFY7M',
    matches: (context) =>
      /domain|ドメイン|website|webサイト|ホームページ|wordpress|next\.?js|vercel|firebase|onlook|ホスティング|レンタルサーバー/i.test(
        context,
      ),
  },
]

export default function AffiliateRecommendations({
  articleSlug,
  articleTitle,
  genre,
  tags = [],
}: AffiliateRecommendationsProps) {
  const context = [articleSlug, articleTitle, ...tags].join(' ')
  const offers = AFFILIATE_OFFERS.filter((offer) =>
    offer.matches(context, genre),
  ).slice(0, 2)

  if (offers.length === 0) return null

  return (
    <aside
      className="mb-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/20"
      aria-labelledby="affiliate-recommendations-title"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3
          id="affiliate-recommendations-title"
          className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
        >
          この記事に関連するサービス
        </h3>
        <span className="rounded-full border border-amber-300 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:border-amber-700 dark:text-amber-200">
          PR
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        記事内容に合う場合だけ掲載しています。リンク経由で購入されると、
        運営者に報酬が入ることがあります。
      </p>

      <div className="mt-4 grid gap-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            <p className="font-semibold text-neutral-900 dark:text-neutral-100">
              {offer.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {offer.description}
            </p>
            <a
              href={offer.href}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              data-affiliate-program={offer.id}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85 dark:bg-neutral-100 dark:text-neutral-900"
            >
              {offer.cta}
              <span aria-hidden="true">→</span>
            </a>
            <img
              src={offer.trackingPixel}
              width="1"
              height="1"
              alt=""
              aria-hidden="true"
              className="absolute h-px w-px opacity-0"
            />
          </div>
        ))}
      </div>
    </aside>
  )
}
