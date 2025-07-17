import type React from "react"
import type { Metadata } from "next"
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
    "LEXIAは愛知県碧南市を拠点に、ホームページ制作・システム開発・デザイン・AI活用支援まで、最新技術でお客様のデジタル課題を一貫解決。「価値を伝わるカタチに」変える、あなたのビジネスパートナーです。",
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "/favicon/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.png",
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
