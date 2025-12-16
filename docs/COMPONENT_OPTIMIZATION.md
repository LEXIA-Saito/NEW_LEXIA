# 🎨 Component Optimization Guide

## React Performance Best Practices

このガイドでは、NEW_LEXIA プロジェクトでのコンポーネント最適化のベストプラクティスを説明します。

## 1. 動的インポート (Code Splitting)

### Before
```tsx
import HeavyComponent from '@/components/HeavyComponent'
```

### After
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // クライアントサイドのみで必要な場合
})
```

### 適用候補
- `vr-viewer.tsx` (Three.js依存)
- `lexia-logo-particles.tsx` (Three.js依存)
- Chart/Graph コンポーネント
- Modal/Dialog の内容

## 2. React.memo による再レンダリング防止

### Before
```tsx
export function Card({ title, description }: CardProps) {
  return (...)
}
```

### After
```tsx
import { memo } from 'react'

export const Card = memo(function Card({ title, description }: CardProps) {
  return (...)
})
```

### 適用候補
- リスト内のアイテムコンポーネント
- 頻繁に親が再レンダリングされるが、自身のpropsが変わらないコンポーネント
- 計算コストの高いコンポーネント

## 3. useMemo と useCallback

### useMemo - 計算結果のメモ化
```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])
```

### useCallback - 関数のメモ化
```tsx
const handleClick = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### 適用候補
- フィルタリング/ソート処理
- データ変換処理
- イベントハンドラー（特に子コンポーネントに渡す場合）

## 4. 画像最適化

### next/image の活用
```tsx
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Hero"
  width={1200}
  height={675}
  priority // Above the fold の画像のみ
  placeholder="blur" // ぼかし効果付きローディング
  blurDataURL="data:image/..." // 小さなbase64画像
/>
```

### 設定 (next.config.mjs)
```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

## 5. Font Optimization

### next/font の活用
```tsx
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap', // FOUT を防ぐ
  preload: true,
  variable: '--font-noto-sans-jp',
})
```

## 6. バンドル分析

### パッケージインポートの最適化

#### Before
```tsx
import { Button, Card, Dialog } from '@radix-ui/react-*'
```

#### After
```tsx
// next.config.mjs で optimizePackageImports 設定済み
// そのままインポート可能（自動的に最適化される）
import { Button } from '@radix-ui/react-button'
```

### Tree-shaking の確保
```tsx
// ❌ Bad - 全体をインポート
import * as Icons from 'lucide-react'

// ✅ Good - 必要なものだけインポート
import { ChevronRight, Menu, X } from 'lucide-react'
```

## 7. Server Components vs Client Components

### Server Components (デフォルト)
```tsx
// app/blog/page.tsx
// "use client" なし = Server Component

export default async function BlogPage() {
  const posts = await getPosts() // サーバーサイドで実行
  return <PostList posts={posts} />
}
```

### Client Components
```tsx
// components/interactive-button.tsx
'use client'

import { useState } from 'react'

export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### ガイドライン
- デフォルトは Server Component
- 以下の場合のみ 'use client' を使用:
  - `useState`, `useEffect` などのフック使用
  - イベントハンドラー使用
  - ブラウザAPIアクセス
  - インタラクティブな機能

## 8. Suspense Boundaries

### データフェッチの最適化
```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <BlogPosts />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <RelatedArticles />
      </Suspense>
      <Footer />
    </>
  )
}
```

## 9. Parallel Route Loading

### 並列データ取得
```tsx
// ❌ Bad - 直列
const user = await getUser()
const posts = await getPosts()

// ✅ Good - 並列
const [user, posts] = await Promise.all([
  getUser(),
  getPosts(),
])
```

## 10. CSS-in-JS の最適化

### Tailwind CSS の最適化
```tsx
// ❌ Bad - 動的クラス名
<div className={`text-${color}-500`}>

// ✅ Good - 完全なクラス名
<div className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}>

// または cn() ユーティリティを使用
import { cn } from '@/lib/utils'
<div className={cn('base-class', isActive && 'active-class')}>
```

## 実装チェックリスト

- [ ] Three.js コンポーネントを動的インポート化
- [ ] ブログカードコンポーネントに React.memo 適用
- [ ] 画像を next/image に移行
- [ ] 不要な 'use client' を削除
- [ ] リスト処理に useMemo を追加
- [ ] イベントハンドラーに useCallback を追加
- [ ] Suspense Boundaries を追加
- [ ] 並列データフェッチに変更

## 測定とモニタリング

### ローカル
```bash
# Lighthouse
pnpm build && pnpm start
# Chrome DevTools > Lighthouse

# Bundle Analyzer
pnpm build:analyze
```

### 本番
- Vercel Analytics でパフォーマンスを監視
- Core Web Vitals のスコアを確認
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

## 参考資料
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
