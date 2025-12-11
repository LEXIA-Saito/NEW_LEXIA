import type React from "react"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { Noto_Sans_JP } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import TypewriterEffect from "@/components/typewriter-effect"
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "@/components/google-analytics"
import { Suspense } from "react"
import Script from "next/script"
import "@/styles/globals.css"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "LEXIA",
  alternateName: "レクシア",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL.replace(/\/$/, "")}/favicon/lexia_logo_square.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`,
  description: "愛知県碧南市のホームページ制作・WEB制作会社。システム開発・AI活用・デザインまで一貫対応。",
  address: {
    "@type": "PostalAddress",
    addressCountry: "JP",
    addressRegion: "愛知県",
    addressLocality: "碧南市",
    streetAddress: "川端町1-45",
    postalCode: "447-0000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.8847,
    longitude: 136.9936,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "lexia0web@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Japanese"],
    },
  ],
  sameAs: [],
  founder: {
    "@type": "Person",
    name: "齋藤雅人",
    jobTitle: "代表",
  },
  foundingDate: "2023",
  areaServed: {
    "@type": "Place",
    name: "愛知県",
  },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: "LEXIA",
  image: `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`,
  url: SITE_URL,
  telephone: "",
  email: "lexia0web@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "川端町1-45",
    addressLocality: "碧南市",
    addressRegion: "愛知県",
    postalCode: "447-0000",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.8847,
    longitude: 136.9936,
  },
  priceRange: "¥¥",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "WEB制作サービス",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ホームページ制作",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "システム開発",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "動画制作",
        },
      },
    ],
  },
}

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-jp",
})

const siteDescription =
  "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。愛知県碧南市"

export const metadata: Metadata = {
  title: "LEXIA | 価値を伝わるカタチに",
  description:
    "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。愛知県碧南市",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "LEXIA | 価値を伝わるカタチに",
    description:
      "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。愛知県碧南市",
    url: SITE_URL,
    siteName: "LEXIA",
    images: [
      {
        url: `${SITE_URL.replace(/\/$/, "")}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "LEXIA",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favicon/lexia_logo_square.png",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/lexia_logo_square.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEXIA | 価値を伝わるカタチに",
    description: siteDescription,
    images: [`${SITE_URL.replace(/\/$/, "")}/og/og-image.png`],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/deferred.css" />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789901212664644"
          crossOrigin="anonymous"
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              name: "LEXIA",
              url: SITE_URL,
              publisher: {
                "@id": `${SITE_URL}#organization`,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL.replace(/\/$/, "")}/projects?query={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ThemeProvider defaultTheme="light" storageKey="lexia-theme">
          <div className="isolate">
            <Suspense fallback={null}>
              <TypewriterEffect />
              {children}
              <Analytics />
              <GoogleAnalytics />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
