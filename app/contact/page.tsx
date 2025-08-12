import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import Breadcrumbs from "@/components/breadcrumbs"
import type { Metadata } from "next"
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
        </div>
      </main>
      <Footer />
    </>
  )
}
