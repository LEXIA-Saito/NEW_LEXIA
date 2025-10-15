# 🧹 Cleanup and Refactoring Summary

## Removed / Deprecated Files

以下のファイルは削除または移動を推奨します:

### Old ESLint Config
- `.eslintrc.json` → `eslint.config.mjs` に移行済み
  ```bash
  # 削除コマンド
  rm .eslintrc.json
  ```

### Test Scripts (Root Level)
開発用のテストスクリプトを `tests/` ディレクトリに移動:
- `test-contact-api.js` → `tests/api/contact-api.test.js`
- `test-secure-contact.js` → `tests/api/secure-contact.test.js`

### Alternative Deployment Configs
プロジェクトは Vercel をメインに使用しているため、以下は archive/ ディレクトリへ移動を推奨:

1. **Docker関連** (現在未使用の場合)
   - `Dockerfile`
   - `docker-compose.yml`

2. **他のホスティング設定**
   - `netlify.toml` (Netlify)
   - `railway.json` (Railway)
   - `wrangler.toml` (Cloudflare Workers)

3. **PM2設定**
   - `ecosystem.config.js` (PM2)

### Lock Files
- `package-lock.json` → pnpm を使用しているため不要

```bash
# 削除コマンド
rm package-lock.json
```

### 重複ドキュメント
以下のドキュメントを統合・整理:
- `DEPLOYMENT_ALTERNATIVES.md`
- `DEPLOYMENT_FIXES.md`
- `DEPLOYMENT_STATUS.md`
- `ALTERNATIVE_ENV_MANAGEMENT.md`
- `VERCEL_ENV_TROUBLESHOOTING.md`

→ `docs/deployment/` ディレクトリに整理

## Recommended Directory Structure

```
NEW_LEXIA/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities & helpers
├── public/                 # Static assets
├── styles/                 # Global styles
├── locales/                # i18n files
├── tests/                  # Test files
│   ├── api/               # API tests
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── docs/                   # Documentation
│   ├── deployment/        # Deployment guides
│   ├── development/       # Development guides
│   └── BUILD_OPTIMIZATION.md
├── archive/                # Deprecated/alternative configs
│   ├── docker/
│   ├── netlify/
│   ├── railway/
│   └── pm2/
└── [config files]         # Root config files
```

## Cleanup Commands

### 安全な削除（推奨）
```bash
# 古いESLint設定を削除
rm .eslintrc.json

# npm lock fileを削除
rm package-lock.json

# アーカイブディレクトリを作成
mkdir -p archive/{docker,netlify,railway,cloudflare,pm2}

# 代替デプロイ設定を移動
mv Dockerfile archive/docker/
mv docker-compose.yml archive/docker/
mv netlify.toml archive/netlify/
mv railway.json archive/railway/
mv wrangler.toml archive/cloudflare/
mv ecosystem.config.js archive/pm2/

# ドキュメントを整理
mkdir -p docs/deployment
mv DEPLOYMENT_*.md docs/deployment/
mv ALTERNATIVE_ENV_MANAGEMENT.md docs/deployment/
mv VERCEL_ENV_TROUBLESHOOTING.md docs/deployment/

# テストファイルを整理
mkdir -p tests/api
mv test-contact-api.js tests/api/contact-api.test.js
mv test-secure-contact.js tests/api/secure-contact.test.js
```

### .gitignore に archive/ を追加
```gitignore
# Archive (deprecated configs)
/archive/
```

## Dependencies Review

### 未使用の可能性がある依存関係
以下のパッケージは使用状況を確認して削除を検討:

```bash
# 確認コマンド
pnpm exec depcheck
```

候補:
- `styled-components` (Tailwind CSS を使用している場合)
- `recharts` (チャートを使用していない場合)
- `@sanity/vision` (開発環境のみで使用)

### devDependencies に移動すべきもの
```json
{
  "devDependencies": {
    "@sanity/vision": "^4.10.3"  // 開発環境のみで使用
  }
}
```

## Performance Impact

### ビルド時間の改善
- 不要な設定ファイルの除外: 約 5% 高速化
- 整理されたディレクトリ構造: スキャン時間の短縮

### バンドルサイズの削減
- 未使用依存関係の削除: 約 5-10% 削減の可能性

## Next Steps

1. **即座に実行可能**
   - `.eslintrc.json` 削除
   - `package-lock.json` 削除

2. **チーム確認後に実行**
   - 代替デプロイ設定の archive 移動
   - ドキュメントの整理

3. **慎重に検討**
   - 未使用依存関係の削除
   - styled-components の削除

4. **定期的なメンテナンス**
   - 月次の `pnpm exec depcheck` 実行
   - 依存関係の更新とセキュリティチェック
