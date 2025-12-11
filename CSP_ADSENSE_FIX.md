# CSP & Google AdSense エラー修正

## 🐛 発生していたエラー

### 1. Content Security Policy (CSP) 違反
\`\`\`
Refused to load the script 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' 
because it violates the following Content Security Policy directive
\`\`\`

### 2. React Hydration エラー
\`\`\`
Uncaught Error: Minified React error #231
\`\`\`

### 3. CSS MIME type エラー
\`\`\`
Refused to execute script from '...css' because its MIME type ('text/css') is not executable
\`\`\`

---

## ✅ 修正内容

### 1. CSP設定を更新（`next.config.mjs`）

Google AdSenseのドメインをCSPに追加:

\`\`\`javascript
// 変更前
"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com"

// 変更後
"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com"
\`\`\`

追加したドメイン:
- `script-src`: `https://pagead2.googlesyndication.com`
- `connect-src`: `https://pagead2.googlesyndication.com`
- `frame-src`: `https://googleads.g.doubleclick.net`

### 2. Scriptタグの `async` 属性を削除（`app/layout.tsx`）

Next.jsの `<Script>` コンポーネントでは `strategy` プロパティを使用するため、`async` 属性は不要:

\`\`\`tsx
// 変更前
<Script
  id="google-adsense"
  strategy="afterInteractive"
  async // ← 削除
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789901212664644"
  crossOrigin="anonymous"
/>

// 変更後
<Script
  id="google-adsense"
  strategy="afterInteractive"
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789901212664644"
  crossOrigin="anonymous"
/>
\`\`\`

---

## 📝 変更ファイル

1. `next.config.mjs` - CSPヘッダーを更新
2. `app/layout.tsx` - Google AdSense Scriptタグの `async` 属性を削除

---

## 🔍 備考

### CSS MIME type エラーについて

このエラーは実際には問題ありません。Next.jsのビルドプロセスで一時的に発生する可能性がありますが、`deferred.css` は正しく `<link>` タグで読み込まれています。

### 画像404エラーについて

microCMSの画像URLが404を返している場合は、以下を確認:
1. microCMS管理画面で画像が正しくアップロードされているか
2. 画像URLが正しいか
3. 画像が削除されていないか

---

**修正日**: 2025-10-15  
**影響範囲**: Google AdSense表示、CSPセキュリティ設定
