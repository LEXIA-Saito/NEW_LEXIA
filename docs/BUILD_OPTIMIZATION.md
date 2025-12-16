# 📦 Build & Performance Optimization Documentation

## Overview
このドキュメントでは、NEW_LEXIAプロジェクトに実施されたビルド最適化とパフォーマンス改善について説明します。

## 最適化の概要

### 1. Next.js Configuration (`next.config.mjs`)

#### SWC Minification
```javascript
swcMinify: true
```
- Babel の代わりに Rust ベースの SWC を使用してビルド速度を向上
- 本番環境で約 17倍高速なミニファイ

#### Compiler Optimizations
```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'],
  } : false,
}
```
- 本番環境で `console.log` を自動削除（エラーと警告は保持）
- バンドルサイズの削減

#### Experimental Features
```javascript
experimental: {
  optimizePackageImports: [...],
  optimizeCss: true,
  webpackBuildWorker: true,
}
```
- **optimizePackageImports**: 主要UIライブラリの Tree-shaking を最適化
  - lucide-react, @radix-ui/*, framer-motion, recharts など
- **optimizeCss**: CSS バンドルの最適化
- **webpackBuildWorker**: ビルド時の並列処理でビルド時間を短縮

#### Webpack Bundle Splitting
本番環境で以下のようにバンドルを分割:
- **framework**: React, Next.js (優先度: 40)
- **three**: Three.js, @react-three/fiber (優先度: 30)
- **ui-libs**: Radix UI, Framer Motion, Lucide React (優先度: 20)
- **vendor**: その他のnpmパッケージ (優先度: 10)

これにより:
- キャッシュ効率の向上
- 並列ダウンロードの最適化
- 初回ロード時間の短縮

### 2. TypeScript Configuration (`tsconfig.json`)

#### Incremental Compilation
```json
"incremental": true,
"tsBuildInfoFile": ".next/cache/tsconfig.tsbuildinfo"
```
- 変更されたファイルのみを再コンパイル
- ビルド時間を大幅に短縮

#### Stricter Exclusions
```json
"exclude": ["node_modules", ".next", "out", "dist", "build"]
```
- 不要なディレクトリをスキャン対象から除外
- 型チェックの高速化

### 3. Package Scripts (`package.json`)

#### Development
```bash
pnpm dev  # Turbopack を使用した高速開発サーバー
```
- Next.js 15 の Turbopack で開発サーバーの起動が最大 700% 高速化

#### Build Scripts
```bash
pnpm build              # 本番ビルド
pnpm build:analyze      # バンドル分析付きビルド
pnpm type-check         # 型チェックのみ
```

#### Maintenance Scripts
```bash
pnpm clean      # ビルドキャッシュをクリア
pnpm clean:all  # 全キャッシュと node_modules をクリア
```

### 4. ESLint Configuration (`eslint.config.mjs`)

#### Performance Rules
- `react/jsx-no-bind`: 不要な再レンダリングを防止
- `react/no-array-index-key`: リストレンダリングの最適化

#### Code Quality
- TypeScript の未使用変数警告
- console.log の警告（warn/error は許可）
- アクセシビリティルール

### 5. .gitignore Optimization

#### Build Artifacts
- `.next/`, `.turbo/` - Next.js のビルドキャッシュ
- `*.tsbuildinfo` - TypeScript の増分ビルド情報
- `node_modules/.cache` - 各種ツールのキャッシュ

## 期待される効果

### ビルド時間
- **初回ビルド**: webpack の並列処理により約 30-40% 高速化
- **再ビルド**: 増分ビルドにより約 50-70% 高速化

### デプロイ時間
- **バンドルサイズ**: Tree-shaking と console 削除により約 10-15% 削減
- **キャッシュ効率**: 適切なバンドル分割により再デプロイ時のキャッシュヒット率向上

### 開発体験
- **HMR**: Turbopack により開発サーバーの起動が劇的に高速化
- **型チェック**: 増分コンパイルにより約 60% 高速化

## 使用方法

### 開発開始
```bash
pnpm install
pnpm dev
```

### ビルドとデプロイ
```bash
# 型チェック
pnpm type-check

# Lint
pnpm lint

# ビルド
pnpm build

# バンドル分析（推奨：定期的に実行）
pnpm build:analyze
```

### トラブルシューティング
```bash
# キャッシュをクリアして再ビルド
pnpm clean
pnpm install
pnpm build
```

## メンテナンス

### 定期的に実施すべきこと
1. **バンドル分析**: 月1回 `pnpm build:analyze` を実行してバンドルサイズを確認
2. **依存関係の更新**: `pnpm update` で依存関係を最新に保つ
3. **未使用の依存関係削除**: `pnpm prune` で不要なパッケージを削除

### パフォーマンス監視
- Vercel Analytics でランタイムパフォーマンスを監視
- Core Web Vitals の定期チェック
- ビルド時間のトレンド監視

## 参考資料
- [Next.js Compiler](https://nextjs.org/docs/architecture/nextjs-compiler)
- [Turbopack](https://nextjs.org/docs/architecture/turbopack)
- [TypeScript Performance](https://github.com/microsoft/TypeScript/wiki/Performance)
