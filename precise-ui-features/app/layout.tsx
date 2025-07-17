import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description:
    '愛知県碧南市のホームページ制作・WEB制作ならLEXIA｜システム開発・AI活用・デザインまで一貫対応。制作実績多数、無料相談実施中。最新技術×地元視点で成果にコミット。中部・全国対応可',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
