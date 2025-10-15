# ブログカテゴリ変更例: "design" を追加

このドキュメントは、新しいブログカテゴリを追加する際の具体例を示します。

## 変更内容

**新カテゴリ**: `design` (デザイン・UI/UX)
- **ID**: `design`
- **表示名**: デザイン・UI/UX（Design / UX）
- **説明**: UIデザイン、UX設計、デザインシステム、アクセシビリティなど

---

## 1. 型定義を更新 (`lib/blog-posts.types.ts`)

```diff
- export type BlogGenre = "tech" | "trends" | "ideas"
+ export type BlogGenre = "tech" | "trends" | "ideas" | "design"
```

---

## 2. ジャンルメタデータを追加 (`lib/blog-posts.ts`)

```diff
const GENRE_METADATA: Record<BlogGenre, { label: string; description: string }> = {
  tech: {
    label: "技術・実装（Tech / Implementation）",
    description: "コード解説、ライブラリ紹介、API使い方、フレームワーク分析など。開発者・技術担当者向け。",
  },
  trends: {
    label: "トレンド・先端（Trends / Innovation）",
    description: "新技術動向、AI／Web界隈の最新潮流、業界の変化予測。今何が来ているかを素早く把握。",
  },
  ideas: {
    label: "戦略・構想（Strategy / Ideas）",
    description: "Web制作戦略、コンセプト設計、UX思想、プロセス論など。技術以外の視点で深掘り。",
  },
+  design: {
+    label: "デザイン・UI/UX（Design / UX）",
+    description: "UIデザイン、UX設計、デザインシステム、アクセシビリティ、ビジュアル表現など。",
+  },
}
```

---

## 3. ナビゲーションに追加 (`components/navigation.tsx`)

```diff
const navigation = [
  {
    name: "ブログ",
    href: "/blog",
    subItems: [
      { name: "技術（Tech）", href: "/blog/genres/tech", subItems: [] },
      { name: "アイデア（Ideas）", href: "/blog/genres/ideas", subItems: [] },
+      { name: "デザイン（Design）", href: "/blog/genres/design", subItems: [] },
    ],
  },
  // ...
]
```

---

## 4. 軽量ナビゲーションに追加 (`components/navigation-lite.tsx`)

```diff
const subItems = [
  { href: "/blog/genres/tech", label: "技術（Tech）" },
  { href: "/blog/genres/ideas", label: "アイデア（Ideas）" },
+  { href: "/blog/genres/design", label: "デザイン（Design）" },
]
```

---

## 5. ジャンルページに追加 (`app/blog/genres/[genre]/page.tsx`)

```diff
export async function generateStaticParams() {
-  const genres: BlogGenre[] = ["tech", "ideas"]
+  const genres: BlogGenre[] = ["tech", "ideas", "design"]
  return genres.map((genre) => ({ genre }))
}
```

---

## 6. microCMS設定

### APIスキーマ（genre フィールド）
```json
{
  "fieldId": "genre",
  "name": "カテゴリ",
  "kind": "select",
  "selectItems": [
    { "value": "tech", "label": "技術・実装" },
    { "value": "trends", "label": "トレンド・先端" },
    { "value": "ideas", "label": "戦略・構想" },
    { "value": "design", "label": "デザイン・UI/UX" }
  ]
}
```

---

## 7. デフォルト値の確認 (`lib/microcms-blog.ts`)

デフォルト値が適切か確認（通常は変更不要）:
```typescript
const genre: BlogGenre = Array.isArray(post.genre) 
  ? (post.genre[0] as BlogGenre) || "tech"  // デフォルトは "tech" のまま
  : (post.genre as BlogGenre) || "tech"
```

---

## テスト手順

1. **TypeScriptコンパイル**
   ```bash
   pnpm build
   ```

2. **ローカル確認**
   ```bash
   pnpm dev
   ```
   - `/blog` でカテゴリフィルターに "デザイン" が表示されるか
   - `/blog/genres/design` にアクセスできるか

3. **microCMS確認**
   - 管理画面で新規記事作成時に "design" が選択できるか
   - design カテゴリの記事が正しく表示されるか

---

## カテゴリ削除時の注意

カテゴリを削除する場合は、以下を確認：

1. **既存記事の移行**: 削除予定カテゴリの記事を別カテゴリに変更
2. **型定義からの削除**: `BlogGenre` から該当IDを削除
3. **メタデータ削除**: `GENRE_METADATA` から該当エントリを削除
4. **ナビゲーション削除**: navigation.tsx / navigation-lite.tsx から削除
5. **ジャンルページ削除**: `generateStaticParams` から削除

---

## カテゴリ名変更時の注意

カテゴリIDはURLに影響するため、変更には注意が必要：

### ラベルのみ変更（推奨）
```diff
tech: {
-  label: "技術・実装（Tech / Implementation）",
+  label: "技術解説（Tech Guide）",
  description: "...",
}
```
✅ URLは `/blog/genres/tech` のまま  
✅ 既存記事に影響なし

### IDを変更（非推奨）
```diff
- export type BlogGenre = "tech" | "trends" | "ideas"
+ export type BlogGenre = "technology" | "trends" | "ideas"
```
❌ URL変更: `/blog/genres/tech` → `/blog/genres/technology`  
❌ 既存記事のgenre値を一括更新が必要  
❌ SEO影響あり（リダイレクト設定が必要）

---

## まとめ

カテゴリ追加は以下の順序で実施：

1. ✅ 型定義更新（`blog-posts.types.ts`）
2. ✅ メタデータ追加（`blog-posts.ts`）
3. ✅ ナビゲーション更新（`navigation.tsx`, `navigation-lite.tsx`）
4. ✅ ジャンルページ更新（`app/blog/genres/[genre]/page.tsx`）
5. ✅ microCMS設定更新（管理画面）
6. ✅ ビルド・テスト（`pnpm build && pnpm dev`）
