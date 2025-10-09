# 🔄 Vercel環境変数の代替管理方法

## 🎯 解決策概要

Vercelの環境変数管理を使わずに、APIキーを安全に管理する代替方法を実装しました。

## ✅ 実装済みの方法

### 1. **Runtime Configuration** (✨ 推奨・採用済み)

**実装場所**: `lib/config.ts`  
**使用API**: `/api/contact` (メインのContact API)

**特徴**:
- ✅ Vercel環境変数から安全に読み込み
- ✅ 設定の検証機能付き
- ✅ 開発・本番環境対応

**動作方式**:
```typescript
// lib/config.ts
export const config = {
  resend: {
    apiKey: process.env.RESEND_API_KEY ?? '',
    from: "LEXIA <noreply@lexia-hp.com>",
    to: "lexia0web@gmail.com"
  }
}
```

### 2. **External Configuration Service**

**実装場所**: `lib/external-config.ts`  
**使用API**: `/api/contact-external`

**特徴**:
- 🔒 外部サービスからの設定取得
- 🌍 複数環境での設定管理
- 📝 キャッシュ機能付き
- 🔄 フォールバック設定

### 3. **Next.js Runtime Config**

**実装場所**: `next.config.mjs`  
**使用API**: `/api/contact-v2`

**特徴**:
- ⚙️ Next.jsネイティブの設定方法
- 🔐 サーバーサイド専用設定
- 📦 ビルド時設定埋め込み

## 🚀 現在の本番設定

**メインContact API** (`/api/contact`) は **Runtime Configuration** を使用：

```typescript
import { config, validateConfig } from "@/lib/config"

// APIキーは以下の優先順位で取得：
// 1. ENCRYPTED_SECURE_CONFIG / ENCRYPTED_SECURE_CONFIG_IV (提供されている場合)
// 2. process.env.RESEND_API_KEY (Vercel環境変数)
```

## 🧪 テスト結果

```bash
# すべての方法でテスト成功
✅ Runtime Config: 200 OK
✅ External Config: 200 OK  
✅ Next.js Runtime: 200 OK
```

## 📋 デプロイ手順

### 本番公開前に必ず実施

```bash
# 1. ResendダッシュボードでAPIキーを発行
# 2. Vercel CLIで環境変数を登録
npx vercel env add RESEND_API_KEY

# 3. （任意）暗号化ストアを利用する場合
# ENCRYPTED_SECURE_CONFIG と ENCRYPTED_SECURE_CONFIG_IV を登録

# 4. コードをプッシュしてデプロイ
git push origin main

# 5. 動作確認
curl https://your-domain.vercel.app/api/debug-env
curl -X POST https://your-domain.vercel.app/api/contact
```

## 🔒 セキュリティ考慮

### APIキーの保護方法（現行）

1. **Vercel環境変数** で集中管理
2. **暗号化済み設定（任意）**: `initializeSecureConfig('re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')` で生成し、環境変数に保存
3. **権限管理**: Resend ダッシュボードで不要なキーは即時削除
4. **監査ログ**: GitGuardian 等のツールで漏洩検知

### リスク評価

- **主要リスク**: 環境変数の誤設定または漏洩
- **軽減策**: 定期ローテーション、アクセス権限の最小化、監査ログの確認
- **代替案**: AWS Secrets Manager / HashiCorp Vault などの専用シークレットストア

## 📊 方法別比較

| 方法 | セットアップ | セキュリティ | 保守性 | 推奨度 |
|------|-------------|-------------|--------|--------|
| Vercel Env Vars | ⭐ | ⭐⭐⭐ | ⭐⭐ | **✅ 推奨** |
| Encrypted Secure Config | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | 本番向け拡張 |
| External Config Service | ⭐⭐ | ⭐⭐⭐ | ⭐ | 大規模用途 |
| Next.js Runtime Config | ⭐⭐ | ⭐⭐ | ⭐⭐ | 代替案 |

## 🔄 将来のアップグレード

### より高度なセキュリティが必要な場合

1. **AWS Secrets Manager**
2. **HashiCorp Vault**  
3. **Azure Key Vault**
4. **独自の設定API**

### 実装例

```typescript
// 将来の外部サービス連携
async function fetchFromSecureVault() {
  const response = await fetch('https://your-vault-api.com/secrets/resend-key', {
    headers: { 'Authorization': 'Bearer vault-token' }
  })
  return response.json()
}
```

## ✅ 現在のステータス

- **✅ Runtime Configuration** 実装完了・テスト済み
- **✅ メインContact API** 更新完了
- **✅ 複数の代替方法** 利用可能
- **✅ Vercel Dashboard での環境変数管理に統一**
- **✅ GitGuardian による漏洩監視を継続**

## 📞 メール送信確認

**テスト成功**: Email ID `0941208a-d4dc-4995-a8f4-72b2900fbb99`  
**宛先**: `lexia0web@gmail.com`  
**設定**: `lexia-hp.com` ドメイン検証済み  
**Status**: ✅ 完全動作