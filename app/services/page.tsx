import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Link from "next/link"

export const metadata: Metadata = {
  title: "サービス一覧 | LEXIA",
  description: "LEXIAの提供するサービス一覧。WEB制作、デザイン、システム開発、動画制作、PC教室などを紹介。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services`,
  },
  openGraph: {
    title: "サービス一覧 | LEXIA",
    description: "LEXIAの提供するサービス一覧。WEB制作、デザイン、システム開発、動画制作、PC教室などを紹介。",
    type: "website",
    url: `${SITE_URL.replace(/\/$/, "")}/services`,
  },
  twitter: {
    card: "summary",
    title: "サービス一覧 | LEXIA",
    description: "LEXIAの提供するサービス一覧。WEB制作、デザイン、システム開発、動画制作、PC教室などを紹介。",
  },
}

const services = [
  {
    title: "WEB制作",
    href: "/services/web",
    desc: "コーポレート、LP、ECまで。成果につながるサイトを構築。",
  },
  {
    title: "デザイン制作",
    href: "/services/design",
    desc: "ロゴ、名刺、パンフレット、バナーなど各種デザイン。",
  },
  {
    title: "システム開発",
    href: "/services/system",
    desc: "業務効率化や新規事業のためのWebシステム開発。",
  },
  {
    title: "動画制作",
    href: "/services/movie",
    desc: "プロモーションや採用向けの動画制作・編集。",
  },
  {
    title: "PC教室",
    href: "/services/pc",
    desc: "個別指導で学べるPCスキル講座。",
  },
]

export default function ServicesIndexPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">
            サービス一覧
          </h1>
          <Breadcrumbs />
          <p className="text-center text-neutral-700 dark:text-neutral-300 mb-12">
            LEXIAが提供する各種サービスをご紹介します。
          </p>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-md transition-shadow bg-white/50 dark:bg-neutral-900/50"
                >
                  <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-2 group-hover:underline">
                    {s.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{s.desc}</p>
                  <span className="mt-4 inline-block text-sm text-neutral-900 dark:text-neutral-100 group-hover:underline">
                    もっと見る →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

