# 🔧 Vercel 環境変数トラブルシューティングガイド

## 🎯 問題の状況
- **ローカル環境**: ✅ RESEND_API_KEY 正常動作
- **Vercel本番環境**: ❌ 環境変数が認識されない

## 📋 Vercel環境変数の確認手順

### 1. Vercelダッシュボードでの設定確認

```bash
# Vercel CLIを使用して環境変数を確認（推奨）
npx vercel env ls

# 特定の環境変数を確認
npx vercel env pull .env.vercel.local
```

### 2. 環境変数設定の正しい手順

1. **Vercel Dashboard** → **プロジェクト選択** → **Settings** → **Environment Variables**
2. 以下の設定を確認：
   ```
   Name: RESEND_API_KEY
   Value: re_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ
   Environment: Production, Preview, Development (全て選択)
   ```

### 3. よくある問題と解決策

#### 🔴 問題1: 環境が正しく選択されていない
**症状**: 特定の環境でのみ動作しない  
**解決**: Environment で Production, Preview, Development を全て選択

#### 🔴 問題2: 値に余分な空白やHTML エンコーディングが含まれている
**症状**: キーの長さが正しくない  
**解決**: 値を再入力し、前後の空白を除去

#### 🔴 問題3: デプロイ後に環境変数を追加した
**症状**: 新しい環境変数が反映されない  
**解決**: 環境変数追加後に再デプロイが必要

#### 🔴 問題4: ビルド時とランタイムで異なる動作
**症状**: ビルドは成功するがランタイムでエラー  
**解決**: Environment Variables で全ての環境（Production, Preview, Development）を選択

### 4. 診断用APIエンドポイント

デプロイ後、以下のエンドポイントで環境変数を確認：

```bash
# 環境変数の存在確認
curl https://your-vercel-domain.vercel.app/api/debug-env

# Resend API テスト（実際にメール送信）
curl -X POST https://your-vercel-domain.vercel.app/api/debug-env
```

### 5. Vercel CLI を使用した確認

```bash
# プロジェクトにログイン
npx vercel login

# 環境変数を確認
npx vercel env ls

# 環境変数を追加（CLIから）
npx vercel env add RESEND_API_KEY

# 強制的に再デプロイ
npx vercel --prod --force
```

## 🚀 推奨される解決手順

### ステップ1: 環境変数の再設定
1. Vercel Dashboard → Settings → Environment Variables
2. 既存の RESEND_API_KEY を削除
3. 新しく追加：
   - Name: `RESEND_API_KEY`
   - Value: `re_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ`
   - Environment: ✅ Production ✅ Preview ✅ Development

### ステップ2: 再デプロイ
```bash
git push origin main
# または
npx vercel --prod --force
```

### ステップ3: 診断API で確認
```bash
curl https://your-domain.vercel.app/api/debug-env
```

### ステップ4: 実際のメール送信テスト
```bash
curl -X POST https://your-domain.vercel.app/api/debug-env
```

## 🔍 追加の確認事項

### Resendドメイン設定
1. [Resend Dashboard](https://resend.com/domains) でドメイン確認
2. `lexia-hp.com` が verified 状態であることを確認
3. DNS設定が正しいことを確認

### Next.js設定
- `next.config.mjs` に環境変数の設定は不要
- Next.js は自動的に `process.env.RESEND_API_KEY` を読み込む

## ⚡ 緊急時の回避策

もし上記で解決しない場合：

1. **ハードコーディング（テスト用のみ）**:
   ```typescript
   // app/api/contact/route.ts (本番環境でのみ一時的に)
   const apiKey = process.env.RESEND_API_KEY || 're_CWisMuJA_Ee48mxgpkt55Tqx9SnxLjLpZ'
   ```

2. **Vercel Functions の環境変数ログ**:
   ```typescript
   console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('RESEND')))
   ```

## 📞 サポート情報

**API Key Status**: ✅ 有効（テスト済み）  
**Local Environment**: ✅ 動作確認済み  
**Next Step**: Vercel Dashboard での環境変数再設定