# 🗑️ Sanity削除ガイド - microCMSへの一本化

**実施日**: 2025年10月15日  
**理由**: ブログ管理をmicroCMSに一本化するため

---

## ✅ 実施した変更

### 1. `package.json` の修正
以下のパッケージと スクリプトを削除しました:

**削除した依存関係**:
- `@sanity/client@^6.29.1`
- `@sanity/vision@^4.10.3`
- `sanity@^4.10.2`

**削除したスクリプト**:
- `sanity-dev`
- `sanity-build`
- `sanity-deploy`

### 2. 削除すべきファイル・ディレクトリ

以下のファイルとディレクトリを削除してください:

```bash
# Sanity設定ファイル
rm sanity.config.ts

# Sanityドキュメント
rm SANITY_SETUP.md

# Sanityビルド出力
rm -rf .sanity/
rm -rf dist/

# Sanity関連のlibファイル
rm lib/sanity.ts
rm lib/sanity-blog-adapter.ts
```

PowerShellの場合:
```powershell
# Sanity設定ファイル
Remove-Item sanity.config.ts -ErrorAction SilentlyContinue

# Sanityドキュメント
Remove-Item SANITY_SETUP.md -ErrorAction SilentlyContinue

# Sanityビルド出力
Remove-Item .sanity -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue

# Sanity関連のlibファイル
Remove-Item lib/sanity.ts -ErrorAction SilentlyContinue
Remove-Item lib/sanity-blog-adapter.ts -ErrorAction SilentlyContinue
```

### 3. コード内の参照削除

以下のファイルでSanity関連のコメントや参照を削除:

- `lib/related-articles.ts` - 行56のSanityコメント削除
- `lib/projects-data.ts` - 行119の "Sanity CMS" をスタックから削除（任意）

---

## 📖 microCMSの使用方法

### 環境変数の設定

`.env.local` に以下を設定:

```env
# microCMS設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_BLOG_ENDPOINT=blog
```

### ブログ記事の管理

1. **microCMS ダッシュボード**にログイン
2. **ブログ記事**を作成・編集
3. **スラッグ**を設定（URLになります）
4. **公開**ボタンをクリック

### フォールバック記事

microCMSが利用できない場合、または環境変数が未設定の場合は、`lib/blog-posts-fallback.ts` の記事が表示されます。

---

## 🔄 ブログデータの流れ

### 以前（Sanity + microCMS + Fallback）
```
1. Sanity からフェッチ（優先）
2. microCMS からフェッチ
3. fallback記事
```

### 現在（microCMS + Fallback）
```
1. microCMS からフェッチ（優先）
2. fallback記事
```

実装: `lib/blog-posts.ts` の `fetchBlogPosts()` 関数

---

## ✨ メリット

### シンプル化
- ✅ CMS が1つだけ（microCMS）
- ✅ 環境変数が減少
- ✅ 依存関係が3つ削減
- ✅ ビルド時間の短縮

### コスト削減
- ✅ Sanityの月額料金が不要
- ✅ デプロイサイズの削減

### メンテナンス性向上
- ✅ 管理画面が統一
- ✅ ドキュメントの簡略化
- ✅ デバッグが容易

---

## 📚 関連ドキュメント

- `README.md` - microCMS設定セクション
- `lib/blog-posts.ts` - ブログデータ取得ロジック
- `lib/blog-posts-fallback.ts` - フォールバック記事データ
- `lib/microcms.ts` - microCMS API クライアント

---

## 🚀 次のステップ

1. **ローカル環境で確認**
   ```bash
   pnpm install  # Sanity依存関係を削除
   pnpm dev      # 開発サーバー起動
   ```

2. **ブログページを確認**
   - `http://localhost:3000/blog` にアクセス
   - 記事が表示されることを確認

3. **不要ファイルを削除**
   - 上記のコマンドで削除

4. **コミット**
   ```bash
   git add .
   git commit -m "refactor: remove Sanity CMS, use microCMS only"
   git push
   ```

---

## ⚠️ 注意事項

### Sanityに保存していた記事について

Sanityに記事を保存していた場合、以下の対応が必要です:

1. **microCMSにエクスポート**
   - Sanity Studioから記事をエクスポート
   - microCMSにインポート

2. **fallbackファイルに追加**
   - `lib/blog-posts-fallback.ts` に手動で追加

### 環境変数のチェック

Vercelなどのデプロイ環境で以下を確認:

- ✅ `MICROCMS_SERVICE_DOMAIN` が設定されている
- ✅ `MICROCMS_API_KEY` が設定されている
- ❌ `SANITY_*` 環境変数は不要（削除推奨）

---

**完了！** これでブログ管理がmicroCMSに一本化されました 🎉
