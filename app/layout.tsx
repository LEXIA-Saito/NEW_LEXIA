import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LEXIA | Web Design That Speaks",
  description: "デジタルであなたのストーリーを伝え、成果につなげます。",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="lexia-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
