import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import Script from "next/script"

export const metadata: Metadata = {
  title: "料金計算・サービス別料金表 | LEXIA",
  description:
    "LEXIAのホームページ制作、ECサイト、システム開発、デザイン制作、PC教室、AI活用サポートの料金目安をご確認いただけます。",
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/pricing`,
  },
  openGraph: {
    title: "料金計算・サービス別料金表 | LEXIA",
    description:
      "LEXIAのホームページ制作、ECサイト、システム開発、デザイン制作、PC教室、AI活用サポートの料金目安をご確認いただけます。",
    type: "website",
    url: `${SITE_URL.replace(/\/$/, "")}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "料金計算・サービス別料金表 | LEXIA",
    description:
      "LEXIAのホームページ制作、ECサイト、システム開発、デザイン制作、PC教室、AI活用サポートの料金目安をご確認いただけます。",
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const offers = [
    { name: "ホームページ制作", price: "100000" },
    { name: "ECサイト制作", price: "120000" },
    { name: "システム開発", price: "180000" },
    { name: "デザイン制作", price: "100000" },
    { name: "PC教室", price: "5000" },
    { name: "AI活用サポート", price: "100000" },
  ]

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@graph": offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "JPY",
      url: `${SITE_URL.replace(/\/$/, "")}/pricing`,
      availability: "https://schema.org/InStock",
    })),
  }

  return (
    <>
      {children}
      <Script
        id="pricing-offers-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
    </>
  )
}
