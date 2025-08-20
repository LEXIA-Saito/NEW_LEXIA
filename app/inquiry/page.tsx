import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import InquiryForm from "@/components/inquiry-form"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "ホームページ制作ヒヤリングシート | LEXIA",
  description:
    "ホームページ制作にあたり、お客様のご要望を詳しくお伺いするためのヒヤリングシートです。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/inquiry`,
  },
  openGraph: {
    title: "ホームページ制作ヒヤリングシート | LEXIA",
    description:
      "ホームページ制作にあたり、お客様のご要望を詳しくお伺いするためのヒヤリングシートです。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ホームページ制作ヒヤリングシート | LEXIA",
    description:
      "ホームページ制作にあたり、お客様のご要望を詳しくお伺いするためのヒヤリングシートです。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function InquiryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
              LEXIA 新規受付窓口フォーム
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              ホームページ制作にあたり、<br />
              お客様のご要望を詳しくお伺いするため、<br />
              以下のフォームにご記入いただけますと幸いです。
            </p>
          </div>
          <Breadcrumbs />
          <InquiryForm />
        </div>
      </main>
      <Footer />
    </>
  )
}