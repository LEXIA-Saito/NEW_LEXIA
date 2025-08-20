"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Simple animated background without three.js */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl text-white font-light">404</h1>
        <p className="text-white/80 text-lg">ページが見つかりません</p>
        <Link 
          href="/" 
          className="inline-block mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-colors duration-300"
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  )
}
