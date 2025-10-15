# 🎯 Quick Start Guide - 最適化後の開発フロー

このガイドでは、リファクタリング後の NEW_LEXIA プロジェクトでの開発を開始する方法を説明します。

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
pnpm install
```

### 2. 開発サーバーの起動
```bash
# Turbopack を使用した高速開発サーバー
pnpm dev
```

開発サーバーは `http://localhost:3000` で起動します。

---

## 📝 開発ワークフロー

### コードを書く前に
```bash
# 型チェック
pnpm type-check

# Lint チェック
pnpm lint
```

### コードを書いた後
```bash
# 自動修正可能な Lint エラーを修正
pnpm lint:fix

# 型チェック
pnpm type-check
```

### ビルド前の確認
```bash
# 本番ビルド
pnpm build

# ビルド成功後、ローカルで確認
pnpm start
```

### バンドルサイズの確認（月1回推奨）
```bash
pnpm build:analyze
```

---

## 🧹 メンテナンス

### キャッシュのクリア（ビルドエラー時）
```bash
# ビルドキャッシュのみクリア
pnpm clean

# 完全クリーンアップ（node_modules も削除）
pnpm clean:all
pnpm install
```

### 依存関係の更新（週次推奨）
```bash
# 依存関係の更新
pnpm update

# セキュリティ監査
pnpm audit

# 未使用の依存関係チェック（月次）
pnpm exec depcheck
```

---

## 🎨 コンポーネント開発のベストプラクティス

### 1. Server Component をデフォルトに
```tsx
// ✅ Good - Server Component (デフォルト)
export default async function BlogPage() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}
```

### 2. Client Component は必要な場合のみ
```tsx
// ✅ Good - インタラクティブな機能がある場合のみ
'use client'

import { useState } from 'react'

export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### 3. 重いコンポーネントは動的インポート
```tsx
// ✅ Good - Canvas/Three.js など重いコンポーネント
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
)
```

### 4. リストアイテムは React.memo
```tsx
// ✅ Good - 頻繁に再レンダリングされるリストアイテム
import { memo } from 'react'

export const ListItem = memo(function ListItem({ item }) {
  return <div>{item.name}</div>
})
```

### 5. 計算コストの高い処理は useMemo
```tsx
// ✅ Good - フィルタリング、ソート、変換処理
const filtered = useMemo(() => {
  return items.filter(item => item.active)
}, [items])
```

### 6. イベントハンドラーは useCallback
```tsx
// ✅ Good - 子コンポーネントに渡すハンドラー
const handleClick = useCallback(() => {
  doSomething(value)
}, [value])
```

---

## 🖼️ 画像最適化

### next/image を常に使用
```tsx
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Hero"
  width={1200}
  height={675}
  priority // Above the fold のみ
  placeholder="blur" // 推奨
/>
```

### サイズ指定のガイドライン
- Hero画像: `priority` を設定
- Above the fold: `priority` を設定
- Below the fold: `loading="lazy"` (デフォルト)
- サムネイル: `sizes` 属性を適切に設定

---

## 🔍 デバッグとパフォーマンス測定

### ローカルでのパフォーマンス測定
```bash
# 本番ビルド
pnpm build

# 本番モードで起動
pnpm start

# Chrome DevTools でLighthouse実行
# または
# http://localhost:3000 を開いて
# F12 → Lighthouse → Analyze page load
```

### Vercel でのモニタリング
- Vercel Dashboard → Analytics
- Core Web Vitals を確認
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

---

## 🐛 トラブルシューティング

### ビルドエラー時
```bash
# 1. キャッシュクリア
pnpm clean

# 2. 再インストール
pnpm install

# 3. 型チェック
pnpm type-check

# 4. 再ビルド
pnpm build
```

### 型エラーが出る場合
```bash
# TypeScript サーバーを再起動
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# または
pnpm type-check
```

### Lint エラーが出る場合
```bash
# 自動修正
pnpm lint:fix

# それでもエラーが残る場合は手動で修正
pnpm lint
```

---

## 📊 パフォーマンス目標

| 指標 | 目標値 | 現在値 |
|------|--------|--------|
| **ビルド時間 (初回)** | < 60秒 | 最適化により30-40%削減 |
| **ビルド時間 (再)** | < 30秒 | 最適化により50-70%削減 |
| **開発サーバー起動** | < 3秒 | Turbopack により大幅改善 |
| **バンドルサイズ** | < 300KB | 最適化により10-15%削減 |
| **Lighthouse Score** | > 90 | 各ページで測定 |

---

## 🔗 関連ドキュメント

- [BUILD_OPTIMIZATION.md](./BUILD_OPTIMIZATION.md) - ビルド最適化の詳細
- [COMPONENT_OPTIMIZATION.md](./COMPONENT_OPTIMIZATION.md) - コンポーネント最適化ガイド
- [CLEANUP_GUIDE.md](./CLEANUP_GUIDE.md) - クリーンアップガイド
- [REFACTORING_SUMMARY.md](../REFACTORING_SUMMARY.md) - リファクタリング総まとめ

---

## ✨ よくある質問

### Q: `pnpm dev` が遅い
A: Turbopack は初回起動時にキャッシュを構築します。2回目以降は高速です。

### Q: バンドルサイズが大きい
A: `pnpm build:analyze` を実行してボトルネックを特定してください。

### Q: 型チェックが遅い
A: 増分ビルドが有効です。初回は遅いですが、2回目以降は高速になります。

### Q: エラーが消えない
A: キャッシュをクリアしてください: `pnpm clean && pnpm install`

---

**Happy Coding! 🚀**
