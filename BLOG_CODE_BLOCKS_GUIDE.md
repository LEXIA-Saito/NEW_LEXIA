# ブログ記事のコードブロック使用ガイド

**最終更新**: 2025-12-25  
**対象**: ブログ記事作成者、microCMS管理者

## 📚 概要

このガイドは、LEXIAブログでコードブロックを効果的に使用する方法を説明します。IT関連の技術記事で読者にとって分かりやすく、プロフェッショナルなコード表示を実現するための仕様とベストプラクティスをまとめています。

---

## 🎨 コードブロックの特徴

### 2025-12-25リニューアルで追加された機能

1. **プロフェッショナルなシンタックスハイライト**
   - VS Code Dark+テーマに触発されたカラースキーム
   - 12以上のプログラミング言語に対応
   - キーワード、文字列、コメント、関数名などを色分け

2. **洗練されたUI**
   - ヘッダーバーに言語名とアイコンを表示
   - 改善されたコピーボタン（視覚的フィードバック付き）
   - ダークテーマ対応
   - レスポンシブデザイン

3. **読みやすさの向上**
   - 適切な行間隔
   - モノスペースフォント
   - 横スクロール対応
   - モバイル最適化

---

## 💻 対応言語

### 完全対応言語（シンタックスハイライト付き）

| 言語 | 識別子 | 特徴 |
|------|--------|------|
| **JavaScript** | `javascript`, `js` | キーワード、関数、プロパティを色分け |
| **TypeScript** | `typescript`, `ts` | JSXを含む全構文に対応 |
| **JSX/TSX** | `jsx`, `tsx` | React コンポーネント記述に最適 |
| **Python** | `python`, `py` | デコレータ、文字列リテラルに対応 |
| **Bash/Shell** | `bash`, `sh`, `shell`, `zsh`, `terminal` | コマンド、フラグ、変数を強調 |
| **JSON** | `json` | プロパティ、値、キーワードを識別 |
| **HTML** | `html`, `xml`, `svg` | タグ、属性、コメントを色分け |
| **CSS** | `css`, `scss`, `sass`, `less` | セレクタ、プロパティ、値を識別 |
| **SQL** | `sql` | SQL文、キーワードを強調 |
| **Go** | `go`, `golang` | Go特有の構文に対応 |
| **Rust** | `rust`, `rs` | マクロ、所有権関連の構文に対応 |
| **Markdown** | `markdown`, `md` | 見出し、リンク、コードを識別 |

### その他の言語

上記以外の言語でも基本的な表示は可能ですが、シンタックスハイライトは適用されません。

---

## 📝 microCMSでの使用方法

### 1. リッチエディタV2でコードブロックを追加

1. microCMS編集画面で、リッチエディタV2の**コードブロック**ボタンをクリック
2. 言語を選択（ドロップダウンから選択または手動入力）
3. コードを入力
4. 保存

### 2. 言語指定の例

```html
<!-- microCMSのHTML出力例 -->
<pre><code class="language-javascript">
const greeting = "Hello, World!";
console.log(greeting);
</code></pre>
```

**重要**: `class="language-{言語名}"` の形式で言語を指定してください。

### 3. 推奨される言語名

| 記事内容 | 推奨言語名 |
|---------|----------|
| JavaScriptコード | `javascript` または `js` |
| TypeScriptコード | `typescript` または `ts` |
| Reactコンポーネント | `jsx` または `tsx` |
| Pythonスクリプト | `python` または `py` |
| シェルコマンド | `bash`, `shell`, `terminal` |
| 設定ファイル（JSON） | `json` |
| HTMLマークアップ | `html` |
| CSSスタイル | `css` |

---

## 🎯 ベストプラクティス

### 1. 適切な言語を指定する

❌ **悪い例**: 言語を指定しない
```
function example() {
  return "no syntax highlighting";
}
```

✅ **良い例**: JavaScriptと明記
```javascript
function example() {
  return "with syntax highlighting";
}
```

### 2. コードは短く、要点を絞る

- 1つのコードブロックは10-30行程度が理想
- 長いコードは複数のブロックに分割
- 重要な部分だけを抜粋

### 3. コメントで説明を補足

```javascript
// ユーザーデータを取得する非同期関数
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}
```

### 4. インラインコードとコードブロックを使い分ける

**インラインコード**: 短い関数名や変数名、コマンド
- 例: `useState`フックを使って状態管理を行います。

**コードブロック**: 複数行のコード、実装例
```javascript
const [count, setCount] = useState(0);
```

---

## 🎨 表示例

### JavaScript

```javascript
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
};
```

### Python

```python
def calculate_sum(numbers):
    """リストの合計を計算する関数"""
    return sum(numbers)

result = calculate_sum([1, 2, 3, 4, 5])
print(f"Sum: {result}")
```

### Bash

```bash
# Node.jsプロジェクトのセットアップ
npm init -y
npm install express dotenv
npm run dev
```

### JSON

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "next": "^15.0.0"
  }
}
```

---

## 🔧 技術詳細（開発者向け）

### 実装ファイル

- **コンポーネント**: `components/blog/EnhancedRichText.tsx`
- **スタイル**: `styles/globals.css`
- **サニタイズ**: `lib/sanitize-blog-html.ts`

### シンタックスハイライトの仕組み

1. `<pre><code class="language-xxx">` を検出
2. 言語に応じた正規表現でトークン化
3. トークンごとにCSSクラスを適用（`.token-keyword`, `.token-string` など）
4. ダークテーマ対応のカラースキームで表示

### カスタマイズ

トークンの色は `styles/globals.css` の以下のセクションで調整可能:

```css
.token-keyword { color: #c586c0; font-weight: 600; }
.token-string { color: #ce9178; }
.token-comment { color: #6a9955; font-style: italic; }
/* ... */
```

---

## ❓ トラブルシューティング

### シンタックスハイライトが適用されない

**原因**: 言語名が正しく指定されていない

**解決策**: `class="language-{言語名}"` の形式を確認してください

### コピーボタンが表示されない

**原因**: JavaScriptが無効、またはブラウザの互換性問題

**解決策**: モダンブラウザ（Chrome, Firefox, Safari, Edge）の最新版を使用してください

### コードが横にはみ出る

**原因**: 長い行がある

**解決策**: 
- 自動的に横スクロールが有効になります
- モバイルでは画面幅に合わせて調整されます

---

## 📚 関連ドキュメント

- [AGENTS.md](./AGENTS.md) - ブログ記事作成ワークフロー
- [MICROCMS_QUICK_REFERENCE.md](./MICROCMS_QUICK_REFERENCE.md) - microCMS設定ガイド
- [MICROCMS_FIELD_FORMAT.md](./MICROCMS_FIELD_FORMAT.md) - フィールド入力形式

---

## 📞 サポート

コードブロックの表示に問題がある場合は、以下を確認してください:

1. microCMSで言語が正しく指定されているか
2. コードに不正なHTMLタグが含まれていないか
3. ブラウザのコンソールにエラーが出ていないか

問題が解決しない場合は、開発チームまでお問い合わせください。

---

**作成日**: 2025-12-25  
**管理者**: LEXIA開発チーム
