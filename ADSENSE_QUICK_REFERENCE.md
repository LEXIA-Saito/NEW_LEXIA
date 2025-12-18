# Google AdSense クイックリファレンス

## 🚀 広告を今すぐ配置する方法

### 1. 記事内広告（ブログ記事推奨）

```tsx
import { AdSenseInArticleAd } from "@/components/ads/AdSenseAds"

export default function BlogArticle() {
  return (
    <article>
      <h1>記事タイトル</h1>
      <p>記事の導入...</p>
      
      {/* 記事の1/3位置 */}
      <AdSenseInArticleAd adSlot="あなたの広告スロットID" />
      
      <p>記事の本文...</p>
      
      {/* 記事の2/3位置 */}
      <AdSenseInArticleAd adSlot="あなたの広告スロットID" />
      
      <p>まとめ...</p>
    </article>
  )
}
```

### 2. レスポンシブディスプレイ広告（汎用）

```tsx
import { AdSenseDisplayAd } from "@/components/ads/AdSenseAds"

<AdSenseDisplayAd adSlot="あなたの広告スロットID" />
```

### 3. レクタングル広告（サイドバー）

```tsx
import { AdSenseRectangleAd } from "@/components/ads/AdSenseAds"

<AdSenseRectangleAd adSlot="あなたの広告スロットID" />
```

---

## 📋 広告スロットIDの取得方法

1. [Google AdSense](https://adsense.google.com/) にログイン
2. 左メニュー「広告」→「広告ユニットごと」
3. 広告ユニットを新規作成
4. **広告スロットID**（10桁の数字）をコピー
   - 例: `1234567890`

---

## 🧪 テストモード（開発環境）

```tsx
import { AdSenseDisplayAd } from "@/components/ads/AdSenseAds"

<AdSenseDisplayAd 
  adSlot="1234567890" 
  testMode={process.env.NODE_ENV === "development"} 
/>
```

テストモードでは実際の広告の代わりにプレースホルダーが表示されます。

---

## 🔍 トラブルシューティング

### 広告が表示されない？

#### チェック1: AdSenseスクリプトが読み込まれているか
ブラウザのコンソールで確認:
```javascript
console.log(window.adsbygoogle)
// 配列が表示されればOK
```

#### チェック2: CSPエラーがないか
ブラウザのコンソールでエラーを確認

#### チェック3: 広告スロットIDが正しいか
- AdSenseダッシュボードで再確認
- コンポーネントの `adSlot` プロパティを確認

#### チェック4: AdSenseアカウントのステータス
- アカウントが承認済みか
- サイトが登録・承認済みか
- 広告ユニットが審査中でないか

#### チェック5: ads.txt
ブラウザで確認: `https://yourdomain.com/ads.txt`

---

## 📊 推奨配置パターン

### ブログ記事ページ

```tsx
export default function BlogArticle() {
  return (
    <>
      {/* ヘッダー */}
      <header>タイトル、メタ情報</header>
      
      {/* 記事本文 */}
      <article>
        <section>導入</section>
        
        <AdSenseInArticleAd adSlot="SLOT_ID_1" />  {/* 1/3 */}
        
        <section>本文前半</section>
        
        <AdSenseInArticleAd adSlot="SLOT_ID_2" />  {/* 2/3 */}
        
        <section>本文後半</section>
        <section>まとめ</section>
      </article>
      
      {/* 記事末尾 */}
      <AdSenseDisplayAd adSlot="SLOT_ID_3" />
      
      {/* その他の広告（A8など） */}
      <A8Banner />
    </>
  )
}
```

### トップページ・一覧ページ

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>トップページ</h1>
      
      {/* ヘッダー下 */}
      <AdSenseDisplayAd adSlot="SLOT_ID_1" />
      
      {/* コンテンツ */}
      <section>記事一覧1-3</section>
      
      {/* 記事一覧の間 */}
      <AdSenseDisplayAd adSlot="SLOT_ID_2" />
      
      <section>記事一覧4-6</section>
    </main>
  )
}
```

---

## 🎯 ベストプラクティス

### 広告配置のルール
- **1ページあたり**: 3-5個が推奨
- **最初の広告**: スクロールせずに見える位置は避ける（Googleポリシー）
- **間隔**: 広告同士は適度に離す
- **コンテンツとのバランス**: 広告が多すぎないように

### パフォーマンス
- ✅ AdSenseスクリプトは非同期読み込み（実装済み）
- ✅ 広告は遅延読み込み（AdSenseのデフォルト動作）
- ✅ CSPで不要なドメインはブロック（実装済み）

### ユーザー体験
- コンテンツの読みやすさを優先
- 広告は自然に配置
- モバイルでも快適に表示

---

## 📁 ファイル構成

```
components/ads/
├── AdSenseLoader.tsx       ← スクリプトローダー（自動）
├── AdSenseUnit.tsx         ← 汎用ユニット（詳細カスタマイズ用）
└── AdSenseAds.tsx          ← プリセット広告（推奨）
    ├── AdSenseDisplayAd       ← レスポンシブディスプレイ
    ├── AdSenseInArticleAd     ← 記事内広告
    └── AdSenseRectangleAd     ← レクタングル広告

app/
└── layout.tsx              ← AdSenseLoader 使用中

public/
└── ads.txt                 ← Publisher ID 設定済み

next.config.mjs             ← CSP設定済み
```

---

## 📚 詳細ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| `ADSENSE_VERIFICATION_REPORT.md` | 詳細な設定確認結果 |
| `ADSENSE_SETUP_GUIDE.md` | 完全なセットアップガイド |
| `ADSENSE_ARCHITECTURE.md` | 実装アーキテクチャ図 |
| `CSP_ADSENSE_FIX.md` | CSPエラー修正履歴 |

---

## ✅ 設定確認コマンド

```bash
node test-adsense-config.js
```

すべての設定が正しいか自動でチェックします。

---

## 🔗 リンク

- [Google AdSense](https://adsense.google.com/)
- [AdSenseヘルプ](https://support.google.com/adsense/)
- [広告配置ガイド](https://support.google.com/adsense/answer/1354736)

---

**Publisher ID**: `ca-pub-8789901212664644`  
**最終更新**: 2025-12-18
