import type React from "react"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import { Noto_Sans_JP } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import TypewriterEffect from "@/components/typewriter-effect"
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "@/components/google-analytics"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500"] })

export const metadata: Metadata = {
  title: "LEXIA | 価値を伝わるカタチに",
  description:
    "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。中部・全国対応可",
  generator: "v0.dev",
  openGraph: {
    title: "LEXIA | 価値を伝わるカタチに",
    description:
      "愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。中部・全国対応可",
    url: SITE_URL,
    siteName: "LEXIA",
    images: [
      {
        url: `${SITE_URL}/og/og-image.png`,
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${notoSansJP.className} antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="lexia-theme">
          <TypewriterEffect />
          {children}
          <Analytics />
          <GoogleAnalytics />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
