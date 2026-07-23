import type React from "react"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { Noto_Sans_JP } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import TypewriterEffect from "@/components/typewriter-effect"
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "@/components/google-analytics"
import { Suspense } from "react"
import { jsonLdString } from "@/lib/json-ld"
import AdSenseLoader from "@/components/ads/AdSenseLoader"
import "@/styles/globals.css"

// Canonical base (no trailing slash) so @id anchors stay identical across pages.
const SITE_BASE = SITE_URL.replace(/\/$/, "")

// Single site-wide business entity. Organization + LocalBusiness are merged into one
// node with a stable @id so pages can reference it without re-declaring NAP data.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_BASE}/#organization`,
  name: "LEXIA",
  alternateName: "レクシア",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_BASE}/favicon/lexia_logo_square.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_BASE}/og/og-image.png`,
  description: "愛知県碧南市のホームページ制作・WEB制作会社。システム開発・AI活用・デザインまで一貫対応。",
  telephone: "090-1742-3456",
  email: "lexia0web@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "JP",
    addressRegion: "愛知県",
    addressLocality: "碧南市",
    streetAddress: "川端町1-45",
    postalCode: "447-0876",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.867852,
    longitude: 136.99312,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 34.867852,
      longitude: 136.99312,
    },
    geoRadius: "50000",
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
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "090-1742-3456",
      email: "lexia0web@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Japanese"],
    },
  ],
  sameAs: ["https://www.instagram.com/lexia_web", "https://x.com/lexia_web"],
  founder: {
    "@type": "Person",
    name: "齋藤雅人",
    jobTitle: "代表",
  },
  foundingDate: "2023",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "WEB制作サービス",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ホームページ制作" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "システム開発" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "動画制作" } },
    ],
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_BASE}/#website`,
  name: "LEXIA",
  url: SITE_URL,
  inLanguage: "ja",
  publisher: { "@id": `${SITE_BASE}/#organization` },
}

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-jp",
})

const siteDescription =
  "愛知県碧南市のホームページ制作・WEB制作ならLEXIA。システム開発からAI活用・デザインまで一貫対応し、成果にコミット。無料相談実施中。"

export const metadata: Metadata = {
  title: "LEXIA | 価値を伝わるカタチに",
  description: siteDescription,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "LEXIA | 価値を伝わるカタチに",
    description: siteDescription,
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
    apple: "/apple-icon.png",
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
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Apply the persisted theme before first paint to avoid a light→dark flash (FOUC). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('lexia-theme');var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t==='dark'?'dark':'light');}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* deferred.css: fetch without blocking first paint (media=print), then apply once loaded. */}
        <link rel="stylesheet" href="/deferred.css" media="print" data-deferred-css />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.querySelectorAll('link[data-deferred-css]').forEach(function(l){if(l.sheet){l.media='all'}else{l.addEventListener('load',function(){l.media='all'})}});",
          }}
        />
        <noscript>
          <link rel="stylesheet" href="/deferred.css" />
        </noscript>
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-900 focus:shadow-md dark:focus:bg-neutral-900 dark:focus:text-neutral-100"
        >
          メインコンテンツへスキップ
        </a>
        <AdSenseLoader />
        {/* Site-wide structured data rendered server-side (crawlable, non-blocking). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(websiteJsonLd) }}
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
