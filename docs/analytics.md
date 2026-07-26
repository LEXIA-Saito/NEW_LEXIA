# Google Analytics 設定

本プロジェクトでは Google Analytics を利用しています。

測定 ID は環境変数 `NEXT_PUBLIC_GA_ID` で指定してください。デフォルトでは `G-2L3TMWC2RQ` が使用されます。

## 収益イベント

以下のイベントをGA4とVercel Analyticsへ送信します。

- `contact_start`: 問い合わせフォームへの入力開始
- `contact_prefill`: 料金シミュレーション結果の自動入力
- `contact_form_submit`: 問い合わせ送信の試行
- `generate_lead`: 問い合わせ送信の成功（GA4のキーイベント候補）
- `pricing_complete`: 料金シミュレーションから相談へ進む
- `pricing_tab_view`: 料金タブの閲覧
- `service_cta_click`: サービス相談導線のクリック
- `affiliate_click`: アフィリエイトリンクのクリック
- `affiliate_funnel_click`: LEXIA BLOGから比較・購入ガイドへの送客
- `share`: 記事のシェア

GA4管理画面では `generate_lead` をキーイベントとして設定してください。
ブログのアフィリエイト改善では、`affiliate_funnel_click` と
`affiliate_click` を記事スラッグ別・遷移先別に確認してください。

## AdSense広告枠

手動広告枠を使う場合は、AdSenseで発行した実際の広告枠IDをVercelの環境変数に設定します。
未設定または旧ダミーIDの場合、空白の広告枠は表示しません。

- `NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT`
- `NEXT_PUBLIC_ADSENSE_ARTICLE_MID_SLOT`
- `NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_MAIN_SLOT`
- `NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SUB_SLOT`
- `NEXT_PUBLIC_ADSENSE_INFEED_SLOT`
- `NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT`

Auto adsの「除外エリア」では記事ヘッダー直下を除外し、記事上部に大きな空白広告が入らないように設定してください。
