import type React from "react"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { Noto_Sans_JP } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import TypewriterEffect from "@/components/typewriter-effect"
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "@/components/google-analytics"
import CookieConsent from "@/components/cookie-consent"
import { Suspense } from "react"
import Script from "next/script"
import "@/styles/globals.css"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LEXIA",
  url: SITE_URL,
  logo: `${SITE_URL.replace(/\/$/, "")}/favicon/lexia_logo_square.png`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "JP",
    addressRegion: "愛知県",
    addressLocality: "碧南市",
    streetAddress: "川端町1-45",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+81-0000-000-000",
      email: "lexia0web@gmail.com",
      contactType: "customer service",
    },
  ],
}

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-jp",
})

const siteDescription =
  "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。中部・全国対応可"

export const metadata: Metadata = {
  title: "LEXIA | 価値を伝わるカタチに",
  description:
    "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。中部・全国対応可",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "LEXIA | 価値を伝わるカタチに",
    description:
      "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。中部・全国対応可",
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
        <link rel="stylesheet" href="/deferred.css" />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "LEXIA",
              url: SITE_URL,
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
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider defaultTheme="light" storageKey="lexia-theme">
          <Suspense fallback={null}>
            <TypewriterEffect />
            {children}
            <Analytics />
            <GoogleAnalytics />
            <CookieConsent />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
