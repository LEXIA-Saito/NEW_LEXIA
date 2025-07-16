import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import TypewriterEffect from "@/components/typewriter-effect"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500"] })

export const metadata: Metadata = {
  title: "LEXIA | 価値を伝わるカタチに",
  description: "デジタルであなたのストーリーを伝え、成果につなげます。",
  generator: "v0.dev",
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
        </ThemeProvider>
      </body>
    </html>
  )
}
