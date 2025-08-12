import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "動画制作サービス | 碧南の動画制作はLEXIA",
  description:
    "企画から撮影・編集までワンストップで対応します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/movie`,
  },
  openGraph: {
    title: "動画制作サービス | 碧南の動画制作はLEXIA",
    description:
      "企画から撮影・編集までワンストップで対応します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "動画制作サービス | 碧南の動画制作はLEXIA",
    description:
      "企画から撮影・編集までワンストップで対応します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function MovieServicePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">動画制作</h1>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            Rfilmと提携し、企画から撮影・編集までワンストップで対応します。
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
