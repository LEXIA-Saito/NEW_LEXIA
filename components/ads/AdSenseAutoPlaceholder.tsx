'use client'

/**
 * AdSense自動広告用プレースホルダーコンポーネント
 * 
 * 自動広告（Auto Ads）が配置されやすいスペースを確保するためのコンポーネント。
 * Googleの自動広告アルゴリズムがこのスペースを検出して広告を挿入します。
 * 
 * 注意: これは「広告を強制表示」するものではなく、
 * 「広告が入りやすいスペース」を作るものです。
 */

interface AdSenseAutoPlaceholderProps {
  /** 配置位置（デバッグ・識別用） */
  position?: 'article-top' | 'article-mid' | 'article-bottom' | 'infeed' | 'sidebar'
  /** 最小高さ（px） */
  minHeight?: number
  /** 追加のCSSクラス */
  className?: string
}

export default function AdSenseAutoPlaceholder({
  position = 'article-bottom',
  minHeight = 100,
  className = '',
}: AdSenseAutoPlaceholderProps) {
  return (
    <div 
      className={`adsense-auto-placeholder ${className}`}
      data-ad-position={position}
      aria-hidden="true"
      style={{
        // 自動広告が配置されやすいスペースを確保
        minHeight: `${minHeight}px`,
        display: 'block',
        width: '100%',
        margin: '24px 0',
        // 背景は透明（広告が入らない場合は見えない）
        background: 'transparent',
      }}
    >
      {/* 
        自動広告のヒント: 
        Googleのアルゴリズムはコンテンツの区切りを検出して広告を挿入します。
        このdivは「ここに広告を入れても良い」というスペースを示します。
      */}
    </div>
  )
}
