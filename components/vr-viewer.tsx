"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react'

interface VRViewerProps {
  imageUrl?: string
}

export function VRViewer({ imageUrl = "/vr/minimalist-villa-360.png" }: VRViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    
    img.onload = () => {
      setIsLoaded(true)
      drawPanorama(ctx, img, canvas.width, canvas.height)
    }

    img.onerror = () => {
      // フォールバック: グラデーション背景を描画
      ctx.fillStyle = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // テキストを描画
      ctx.fillStyle = '#ffffff'
      ctx.font = '24px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('360° Virtual Tour', canvas.width / 2, canvas.height / 2)
      ctx.font = '16px sans-serif'
      ctx.fillText('Interactive panoramic view', canvas.width / 2, canvas.height / 2 + 30)
      setIsLoaded(true)
    }

    img.src = imageUrl
  }, [imageUrl, rotation, zoom])

  const drawPanorama = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    
    // 簡単なパノラマ効果をシミュレート
    const offsetX = (rotation.y * width) / 360
    const offsetY = (rotation.x * height) / 180
    
    ctx.save()
    ctx.scale(zoom, zoom)
    ctx.translate(-offsetX, -offsetY)
    
    // 画像を描画
    ctx.drawImage(img, 0, 0, width, height)
    
    // 継ぎ目を隠すために画像を繰り返し描画
    ctx.drawImage(img, width, 0, width, height)
    ctx.drawImage(img, -width, 0, width, height)
    
    ctx.restore()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMouse.x
    const deltaY = e.clientY - lastMouse.y

    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
      y: (prev.y + deltaX * 0.5) % 360
    }))

    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setZoom(1)
  }

  const zoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.2))
  }

  const zoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.2))
  }

  return (
    <div className="relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* コントロールパネル */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={resetView}
          className="text-white hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={zoomOut}
          className="text-white hover:bg-white/20"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={zoomIn}
          className="text-white hover:bg-white/20"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* 操作説明 */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2 mb-1">
          <Move className="h-4 w-4" />
          <span>Drag to look around</span>
        </div>
        <div>Zoom: {Math.round(zoom * 100)}%</div>
      </div>

      {/* ローディング状態 */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Virtual Tour...</p>
          </div>
        </div>
      )}
    </div>
  )
}
