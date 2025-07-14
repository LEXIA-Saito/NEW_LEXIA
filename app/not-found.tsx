"use client"

import Link from "next/link"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <CanvasRevealEffect
          animationSpeed={2}
          containerClassName="bg-neutral-900"
          dotSize={3}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl text-white">404</h1>
        <p className="text-white">ページが見つかりません</p>
        <Link href="/" className="text-blue-300 underline">トップへ戻る</Link>
      </div>
    </div>
  )
}
