# AdSense収益最大化 デプロイ前後チェックリスト

> 自動広告（Auto Ads）ベースの設計なので、スロットIDの設定は不要です

---

## ✅ デプロイ前チェックリスト

### AdSense設定確認

- [ ] AdSenseアカウントが有効な状態か
- [ ] サイト（lexia-hp.com）がAdSenseに登録・承認されているか
- [ ] 自動広告がオンになっているか（AdSense管理画面で確認）

### CSP（Content Security Policy）確認

`next.config.mjs` のCSPヘッダーに以下が含まれているか:

- [ ] `script-src`: pagead2.googlesyndication.com, adservice.google.com
- [ ] `connect-src`: pagead2.googlesyndication.com, adservice.google.com
- [ ] `frame-src`: googleads.g.doubleclick.net, tpc.googlesyndication.com

### コード確認

- [ ] `app/blog/[slug]/page.tsx` に広告スペースが追加されているか
- [ ] `components/blog/RevenueZoneAuto.tsx` が正しくインポートされているか
- [ ] `styles/globals.css` にAdSenseスタイルが追加されているか

---

## 🔍 デプロイ後チェックリスト

### 1. デスクトップ表示確認

- [ ] Chrome DevTools でConsoleエラーがないか
- [ ] ネットワークタブでAdSenseスクリプトが読み込まれているか
- [ ] 記事ページで自動広告が表示されているか
- [ ] 収益ゾーンが正しく表示されているか

### 2. スマホ表示確認（最重要）

テストデバイス:
- [ ] iPhone SE（小画面）
- [ ] iPhone 14 Pro（標準画面）
- [ ] Android（Galaxy など）

確認項目:
- [ ] 自動広告が表示されているか
- [ ] 広告とコンテンツの間隔が適切か（誤クリック防止）
- [ ] レイアウトシフト（ガタつき）がないか
- [ ] 収益ゾーンのSNSシェアボタンが動作するか

### 3. パフォーマンス確認

Lighthouse でスコアを確認:
- [ ] Performance: 80以上
- [ ] LCP: 2.5秒以内
- [ ] CLS: 0.1以下

---

## 📊 運用モニタリング

### 毎日
- [ ] AdSenseダッシュボードで前日の収益を確認
- [ ] 異常値（急増/急減）がないかチェック

### 毎週
- [ ] 週間収益レポートを確認
- [ ] ページ別のパフォーマンスを分析

### 毎月
- [ ] 月間収益レポートの作成
- [ ] AdSenseポリシーセンターの確認
- [ ] 自動広告の設定を見直し（必要に応じて）

---

## 🎯 KPI目標

| 指標 | 目標値 | 確認方法 |
|------|--------|----------|
| ページRPM | 300円以上 | AdSense管理画面 |
| CTR | 0.3-0.5% | AdSense管理画面 |
| CPC | 30円以上 | AdSense管理画面 |
| 無効クリック率 | 5%以下 | AdSense管理画面 |

---

## 🚫 AdSenseポリシー違反防止

### やってはいけないこと

- [ ] 自分で広告をクリックしない
- [ ] 家族・知人にクリックを依頼しない
- [ ] 「広告をクリックしてください」と誘導しない
- [ ] 広告の近くに誤クリックを誘発するボタンを置かない
- [ ] 広告をCSSで隠さない

---

## 📝 トラブルシューティング

### 広告が表示されない場合

1. **AdSense管理画面で確認**
   - 自動広告がオンになっているか
   - サイトが承認されているか

2. **Consoleエラーを確認**
   - CSPエラーがあれば `next.config.mjs` を修正

3. **時間を置く**
   - 新しいページは広告表示まで24-48時間かかることがある

### スマホで広告が表示されない場合

1. **実機でテスト**
   - DevToolsのデバイスモードではなく実機で確認

2. **キャッシュをクリア**
   - ブラウザのキャッシュ・Cookieをクリア

---

**このチェックリストを活用して、安全にAdSense収益を最大化してください。**
