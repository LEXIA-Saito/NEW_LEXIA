import Link from "next/link"

const primaryLinks = [
  { href: "/company", label: "事業概要" },
  { href: "/services", label: "サービス一覧" },
  { href: "/projects", label: "制作実績" },
  { href: "/pricing", label: "料金" },
]

const secondaryLinks = [
  { href: "/team", label: "チーム" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/blog", label: "LEXIA BLOG" },
]

export default function FooterLite() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">LEXIA</p>
          <p className="max-w-sm text-sm leading-relaxed">
            愛知県碧南市を拠点に、成果につながるWEBサイト制作とマーケティング支援を提供しています。
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-6 text-sm md:max-w-md">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Main Links
            </p>
            <nav className="flex flex-col gap-2">
              {primaryLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-neutral-900 dark:hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              More
            </p>
            <nav className="flex flex-col gap-2">
              {secondaryLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-neutral-900 dark:hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start gap-4 px-4 text-xs text-neutral-500 dark:text-neutral-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} LEXIA All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/company#mission" className="hover:text-neutral-900 dark:hover:text-white">
            ミッション
          </Link>
          <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  )
}
