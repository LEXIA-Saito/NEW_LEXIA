import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "システム開発サービス | 碧南のWebアプリ開発はLEXIA",
  description:
    "碧南での予約・顧客管理などのWebシステム開発やDX支援を提供します。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/services/system`,
  },
  openGraph: {
    title: "システム開発サービス | 碧南のWebアプリ開発はLEXIA",
    description:
      "碧南での予約・顧客管理などのWebシステム開発やDX支援を提供します。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "システム開発サービス | 碧南のWebアプリ開発はLEXIA",
    description:
      "碧南での予約・顧客管理などのWebシステム開発やDX支援を提供します。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function SystemServicePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4 text-center">システム開発</h1>
          <Breadcrumbs />
          <p className="text-neutral-700 dark:text-neutral-300">
            予約システム、顧客管理システム、財務管理システム等の開発を行います。
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
