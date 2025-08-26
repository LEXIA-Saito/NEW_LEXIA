import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import Link from "next/link"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "お問い合わせ | Web制作の無料見積もり・相談はLEXIA",
  description:
    "ホームページ制作のご相談や無料見積もりは碧南のWEB制作会社LEXIAまで。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/contact`,
  },
  openGraph: {
    title: "お問い合わせ | Web制作の無料見積もり・相談はLEXIA",
    description:
      "ホームページ制作のご相談や無料見積もりは碧南のWEB制作会社LEXIAまで。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | Web制作の無料見積もり・相談はLEXIA",
    description:
      "ホームページ制作のご相談や無料見積もりは碧南のWEB制作会社LEXIAまで。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">お問い合わせ</h1>
          <Breadcrumbs />
          <ContactForm />
          <div className="mt-10 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">お探しの内容に応じて、以下もご覧ください。</p>
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                サービス一覧
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                料金を見る
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                制作実績
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
