# Google AdSense 設定ガイド

## 📋 現在の設定状況

### ✅ 実装済みの項目

#### 1. AdSenseスクリプトローダー
- **ファイル**: `components/ads/AdSenseLoader.tsx`
- **配置**: `app/layout.tsx`（全ページで自動読み込み）
- **Publisher ID**: `ca-pub-8789901212664644`
- **実装方法**: クライアント側で動的にスクリプトを読み込み

```tsx
// app/layout.tsx
import AdSenseLoader from "@/components/ads/AdSenseLoader"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AdSenseLoader />
        {children}
      </body>
    </html>
  )
}
```

#### 2. Content Security Policy (CSP) 設定
- **ファイル**: `next.config.mjs`
- **設定済みドメイン**:
  - `script-src`: `https://pagead2.googlesyndication.com`
  - `script-src`: `https://adservice.google.com`
  - `script-src`: `https://ep1.adtrafficquality.google`
  - `script-src`: `https://ep2.adtrafficquality.google`
  - `script-src`: `https://fundingchoicesmessages.google.com`
  - `connect-src`: 上記すべてのドメイン
  - `frame-src`: `https://googleads.g.doubleclick.net`
  - `frame-src`: `https://tpc.googlesyndication.com`

これらのCSP設定により、AdSenseスクリプトとiframe、通信が正常に動作します。

#### 3. 広告ユニットコンポーネント（新規作成）
以下のコンポーネントを新規作成しました：

**基本コンポーネント**:
- `components/ads/AdSenseUnit.tsx` - 汎用AdSense広告ユニット

**プリセットコンポーネント**:
- `components/ads/AdSenseAds.tsx`
  - `AdSenseDisplayAd` - レスポンシブディスプレイ広告
  - `AdSenseInArticleAd` - 記事内広告
  - `AdSenseRectangleAd` - レクタングル広告

---

## 🚀 AdSense広告の配置方法

### Step 1: Google AdSense ダッシュボードで広告ユニットを作成

1. [Google AdSense](https://adsense.google.com/) にログイン
2. 「広告」→「広告ユニットごと」をクリック
3. 広告ユニットを作成:
   - **ディスプレイ広告**: 汎用的なレスポンシブ広告
   - **記事内広告**: ブログ記事本文中に配置
   - **Multiplex広告**: 関連コンテンツ広告
4. 作成後、**広告スロットID**（例: `1234567890`）をコピー

### Step 2: コンポーネントで広告を配置

#### ブログ記事内に広告を配置する例

```tsx
// app/blog/[slug]/page.tsx
import { AdSenseInArticleAd } from "@/components/ads/AdSenseAds"

export default function BlogArticlePage() {
  return (
    <article>
      {/* 記事の冒頭 */}
      <h1>記事タイトル</h1>
      
      {/* 導入部 */}
      <p>記事の導入文...</p>
      
      {/* 記事内広告（記事の1/3程度の位置） */}
      <AdSenseInArticleAd adSlot="あなたの広告スロットID" />
      
      {/* 記事本文 */}
      <div>記事本文...</div>
      
      {/* 記事内広告（記事の2/3程度の位置） */}
      <AdSenseInArticleAd adSlot="あなたの広告スロットID" />
      
      {/* 記事の結論 */}
      <p>まとめ...</p>
    </article>
  )
}
```

#### トップページやサイドバーに広告を配置する例

```tsx
import { AdSenseDisplayAd, AdSenseRectangleAd } from "@/components/ads/AdSenseAds"

export default function HomePage() {
  return (
    <div>
      {/* メインコンテンツ */}
      <main>
        <h1>トップページ</h1>
        
        {/* レスポンシブディスプレイ広告 */}
        <AdSenseDisplayAd adSlot="あなたの広告スロットID" />
        
        <section>コンテンツ...</section>
      </main>
      
      {/* サイドバー */}
      <aside>
        {/* レクタングル広告 */}
        <AdSenseRectangleAd adSlot="あなたの広告スロットID" />
      </aside>
    </div>
  )
}
```

### Step 3: テストモードで確認（開発環境）

開発環境では `testMode={true}` を使用して広告プレースホルダーを表示:

```tsx
<AdSenseDisplayAd 
  adSlot="1234567890" 
  testMode={process.env.NODE_ENV === "development"}
/>
```

---

## 📍 推奨される広告配置位置

### ブログ記事ページ (`app/blog/[slug]/page.tsx`)

1. **記事の冒頭**（タイトル直後）- ディスプレイ広告
2. **記事本文の1/3位置** - 記事内広告
3. **記事本文の2/3位置** - 記事内広告
4. **記事の末尾**（既存のA8バナーの前） - ディスプレイ広告

### トップページ・一覧ページ

1. **ヘッダー下** - ディスプレイ広告
2. **記事一覧の間**（3-4記事ごと） - ディスプレイ広告
3. **サイドバー** - レクタングル広告
4. **フッター上** - ディスプレイ広告

---

## 🔧 カスタマイズ方法

### カスタムスタイルを適用

```tsx
<AdSenseUnit
  adSlot="1234567890"
  adFormat="auto"
  style={{
    display: "block",
    minHeight: "300px",
    maxWidth: "728px",
    margin: "0 auto",
  }}
  className="my-custom-ad-class"
/>
```

### 広告の種類を指定

```tsx
// レスポンシブディスプレイ広告
<AdSenseUnit adSlot="..." adFormat="auto" fullWidthResponsive={true} />

// 記事内広告
<AdSenseUnit adSlot="..." adFormat="fluid" adLayout="in-article" />

// 固定サイズ広告（レクタングル）
<AdSenseUnit 
  adSlot="..." 
  adFormat="rectangle" 
  style={{ width: "336px", height: "280px" }} 
/>
```

---

## 🛠️ トラブルシューティング

### 広告が表示されない場合

#### 1. AdSenseスクリプトが読み込まれているか確認
ブラウザのデベロッパーツールで以下を確認:
```javascript
console.log(window.adsbygoogle)
// 配列が表示されればOK
```

#### 2. CSPエラーが出ていないか確認
ブラウザのコンソールで以下のエラーがないか確認:
```
Refused to load the script 'https://pagead2.googlesyndication.com/...' 
because it violates the following Content Security Policy directive
```

→ `next.config.mjs` の CSP 設定を確認してください

#### 3. 広告スロットIDが正しいか確認
- Google AdSenseダッシュボードで広告スロットIDを再確認
- `data-ad-slot` 属性に正しい値が設定されているか確認

#### 4. AdSenseアカウントのステータスを確認
- AdSenseアカウントが有効で承認済みか
- サイトがAdSenseに登録・承認済みか
- ads.txt が正しく配置されているか

### CSPエラーが発生する場合

`next.config.mjs` に以下のドメインが追加されているか確認:

```javascript
{
  key: 'Content-Security-Policy',
  value: "script-src 'self' ... https://pagead2.googlesyndication.com https://adservice.google.com; connect-src 'self' ... https://pagead2.googlesyndication.com; frame-src 'self' ... https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;"
}
```

---

## 📊 パフォーマンスの考慮事項

### 1. 遅延読み込み（Lazy Loading）
広告は自動的にビューポートに入ってから読み込まれます（AdSenseのデフォルト動作）

### 2. スクリプトの非同期読み込み
`AdSenseLoader` コンポーネントは `async` 属性付きでスクリプトを読み込むため、ページ読み込みをブロックしません

### 3. 広告の配置数
1ページあたりの広告数:
- **推奨**: 3-5個
- **最大**: Google AdSenseポリシーに準拠

---

## 📝 実装チェックリスト

- [x] `AdSenseLoader` コンポーネントが `app/layout.tsx` に配置されている
- [x] CSP設定で AdSense ドメインが許可されている
- [x] `AdSenseUnit` コンポーネントが作成されている
- [x] プリセット広告コンポーネント（`AdSenseAds.tsx`）が作成されている
- [ ] Google AdSenseで広告ユニットを作成
- [ ] 広告スロットIDを取得
- [ ] ブログ記事ページに広告を配置
- [ ] トップページに広告を配置
- [ ] 開発環境でテストモードで確認
- [ ] 本番環境で広告が正しく表示されるか確認
- [ ] ads.txt を public ディレクトリに配置

---

## 🔐 ads.txt の設定

Google AdSenseダッシュボードから `ads.txt` の内容をコピーして、以下の場所に配置してください:

```
/home/runner/work/NEW_LEXIA/NEW_LEXIA/public/ads.txt
```

内容例:
```
google.com, pub-8789901212664644, DIRECT, f08c47fec0942fa0
```

---

## 📚 参考リンク

- [Google AdSense ヘルプ](https://support.google.com/adsense/)
- [Next.js Content Security Policy](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [AdSense 広告コードガイド](https://support.google.com/adsense/answer/9274019)

---

**最終更新日**: 2025-12-18  
**現在の Publisher ID**: `ca-pub-8789901212664644`
