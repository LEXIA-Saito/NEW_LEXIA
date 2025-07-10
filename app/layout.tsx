import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Inter } from "next/font/google" // Import Inter
import { ThemeProvider } from "@/components/theme-provider"
import { LanguagePersistence } from '@/components/language-persistence'; // Import
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-jp", // Add CSS variable
})

const inter = Inter({ // Initialize Inter
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter", // Add CSS variable
})

export const metadata: Metadata = {
  title: "LEXIA | 語りかけるウェブデザイン",
  description: "デジタルであなたのストーリーを伝え、成果につなげます。",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // The `lang` attribute here will be managed by Next.js i18n.
    // We will verify this. If not, we'll need a client component to set it.
    // For now, we remove the hardcoded `lang="ja"`.
    <html className="scroll-smooth">
      <body className={`${notoSansJP.variable} ${inter.variable} font-sans antialiased`}>
        {/*
              Use CSS variables for fonts.
              font-sans will be the default.
              We'll use html[lang="ja"] .font-sans { font-family: var(--font-noto-sans-jp); }
              and html[lang="en"] .font-sans { font-family: var(--font-inter); } in globals.css or tailwind config.
              For now, just adding variables and a default 'font-sans' class.
            */}
        <ThemeProvider defaultTheme="light" storageKey="lexia-theme">
          <LanguagePersistence /> {/* Add component here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
