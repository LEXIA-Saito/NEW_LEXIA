## 概要
- ブログに『技術（Tech）』カテゴリを追加し、クリックで一覧をフィルタできるようにしました。
- 『アイデア（Ideas）』も同様にクリックで一覧表示を切替可能です。
- URL に ?genre=tech|ideas を反映し、リンク共有に対応しました。

## 変更点
- 追加: components/blog/GenreFilterList.tsx（カテゴリチップ + クライアントサイドフィルタ）
- 更新: app/blog/page.tsx（フィルタUIの組込み、クエリの初期選択）

## 動作確認
- /blog で一覧表示
- /blog?genre=tech で Tech のみ表示
- /blog?genre=ideas で Ideas のみ表示

## 補足
- Lint は既存の警告のみ（本PRの変更による新規エラーなし）
- ビルドはFontsの外部取得で失敗する環境があるため、通常環境でのビルド確認をお願いします。
