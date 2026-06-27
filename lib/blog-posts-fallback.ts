import type { BlogPost } from "./blog-posts.types"
import {
  AFFILIATE_DISCLOSURE_HTML,
  affiliateAlertHtml,
  affiliateNoteHtml,
  amazonProductHtml,
} from "./affiliate"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "what-is-onlook",
    title: 'Onlookとは？ReactとTailwindを直感的に操る"デザイナー向けCursor"の全貌',
    description:
      "コードとデザインの境界を溶かす次世代ビジュアルエディタ「Onlook」の特徴、アーキテクチャ、利点と課題をLEXIA視点で解説します。",
    genre: "tech",
    tags: ["Onlook", "React", "Tailwind"],
    date: "2025-10-06",
    latest_update: "2026-06-24",
    heroImage:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-hero-cursor-for-designers.avif",
    heroImageAlt: "Onlook のメインビジュアル（デザイン編集 UI）",
    sections: [
      {
        body: [
          "こんにちは、LEXIAの齋藤です。",
          "Cursorがエンジニアの作業を変えたように、Onlookはデザイナーの手に“コードの自由”を与えます。ReactとTailwindのプロジェクトを“見た目で編集→即コード反映”できる点で注目を集めており、Y Combinator参加やオープンソースという背景も相まって急速に話題になっています。",
          "FramerやFigmaと似たUI面の編集体験を持ちながら、Onlookが異なるのは“リアルな開発コード”をそのまま扱う点です。デザイン上の操作が直接JSX/TSXに反映されるため、プロダクションコードとデザインの乖離を大幅に減らせます。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-desktop-app-main-interface.webp",
        imageAlt: "Onlook デスクトップアプリのメインインターフェース",
      },
      {
        heading: "Onlookの基本コンセプト",
        body: [
          "Onlookはしばしば“Cursor for Designers”と表現されます。Figmaのような直感的なUI編集体験とReactの実装を直結させる思想があり、デザインとコードが双方向に同期する点が最大の革新です。",
          "公式ドキュメントでは、コンポーネント編集・スタイル編集・プロジェクト読み込みのワークフローを重視しており、既存のNext.js＋Tailwindプロジェクトをそのまま取り込んで作業を開始できる点が強みとして挙げられています。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-figma-like-visual-editor.avif",
        imageAlt: "Figma ライクなビジュアルエディタのスクリーンショット",
      },
      {
        heading: "主要機能①：Figmaライクなビジュアルエディタ",
        body: [
          "OnlookのWeb版エディタでは要素をドラッグ＆ドロップで配置し、色・余白・フォントなどを直感的に編集できます。編集結果は即座にJSX/TSXに反映され、コードを意識せずに見た目を調整できます。",
          "また既存のNext.js + Tailwindプロジェクトを読み込んで、その上で編集できるため、デザインから実装への移行コストが小さく済みます。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-realtime-editing-demo.gif",
        imageAlt: "Onlook のリアルタイム編集デモ GIF",
      },
      {
        heading: "主要機能②：AIによる自然言語デザイン",
        body: [
          "Onlookは自然言語での指示を受け付け、Tailwindクラスやテーマ設定を理解した差分提案を生成します。例えば「このカードをシャドウ付きにして」や「フォームを2カラムにして」といった指示で、AIが適切なTailwindユーティリティやスタイルを当ててくれます。",
          "生成された結果はその場で微調整でき、デザイナーが短時間でプロダクション品質に近いUIを構築する助けになります。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-what-can-you-do-prompt.png",
        imageAlt: "Onlook の自然言語デザイン機能の例（プロンプトと結果）",
      },
      {
        heading: "主要機能③：Figmaインポートとデザインシステム管理",
        body: [
          "Figmaファイルの取り込みを通じて、コンポーネントごとにReact実装へと再構築できます。デザイントークン（色・フォント・スペーシング等）を一元管理し、デザインシステムを運用するための仕組みも用意されています。",
          "これにより、デザインから実装までのブリッジがスムーズになり、チームの整合性が高まります。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-project-creation-workflow.webp",
        imageAlt: "Onlook のプロジェクト作成ワークフロー図",
      },
      {
        heading: "アーキテクチャと技術構成",
        body: [
          "Onlookはオープンソース（Apache 2.0）で公開されており、モノレポ構成（apps / packages / tooling / plugins）で管理されています。技術スタックにはReact、Next.js、TailwindCSS、Supabase、Drizzle、Bunなどが含まれます。",
          "デスクトップ向けにはElectronベースのアプリも存在しますが、現在はWeb版が主に開発・利用されています。",
        ],
      },
      {
        heading: "現行プラン・料金体系",
        body: [
          "OnlookはFree（無料）プランのほか、Pro（$25/月）やEnterpriseプランを提供しています。無料プランにはプロジェクト数やAIの利用回数に制限があり、Proではそれらの上限が緩和されます。",
          "注意点として、コミュニティの情報には旧来の価格や回数制限が混在しているため、公式のPricingページで最新情報を確認してください。",
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-pricing-plans.jpg",
        imageAlt: "Onlook の料金プラン表イメージ",
      },
      {
        heading: "実際の使い心地と課題",
        body: [
          "β段階のプロダクトであるため、動作の不安定さやAIの応答精度の問題が報告されています。しかしながら、デザイナーが直接コードに触れられる体験としては非常に革新的です。",
          "FramerやV0、Cursorと比較すると、Onlookは“実際の開発コードをそのまま扱える”点で差別化されており、特にTailwind×Next.jsに慣れた開発者には恩恵が大きいでしょう。",
        ],
      },
      {
        heading: "LEXIA視点で見るOnlookの可能性",
        body: [
          "LEXIAのようにデザインと実装を一気通貫で行う制作体制にはOnlookが非常にマッチしています。コード直結ゆえの柔軟性は、デザインと実装が分断されがちな現場のボトルネックを解消できます。",
          "将来的には、AIを活用したデザイン提案と人による微調整を組み合わせたハイブリッド制作ワークフローの一部としてOnlookを組み込むことが可能です。",
        ],
      },
      {
        heading: "まとめ：デザイナーが“コードを書く”時代の幕開け",
        body: [
          "Onlookはノーコードでもローコードでもない、“デザイン実装融合ツール”としての位置付けを目指しています。デザイナーがReactを直感的に扱うためのツールとして、今後の制作ワークフローに大きな影響を与える可能性があります。",
          "公式ドキュメントやHacker Newsのコミュニティ議論を合わせて参照することで、Onlookの最新動向を追いかけることをおすすめします。",
        ],
      },
      {
        heading: "参考リンク",
        list: [
          "公式サイト / プロダクト紹介ページ",
          "https://onlook.com",
          "https://onlook.com/features",
          "https://onlook.com/features/ai-for-frontend",
          "https://onlook.com/pricing",
          "",
          "公式ドキュメント（Docs）",
          "https://docs.onlook.com",
          "https://docs.onlook.com/getting-started/core-features",
          "",
          "GitHubリポジトリ",
          "https://github.com/onlook-dev/onlook",
          "https://github.com/onlook-dev/onlook/discussions",
          "https://github.com/onlook-dev/onlook/wiki",
          "https://github.com/onlook-dev/desktop",
          "",
          "開発・技術関連情報",
          "https://news.ycombinator.com/item?id=44127653",
          "https://www.ycombinator.com/companies/onlook",
          "",
          "関連技術・フレームワーク",
          "https://nextjs.org/",
          "https://tailwindcss.com/",
          "https://supabase.com/",
        ],
      },
    ],
  },
]

// Append Firebase Studio Getting Started Guide (detailed tutorial)
fallbackBlogPosts.push({
  slug: "firebase-studio-getting-started-lexia",
  title: "Firebase Studioの始め方｜登録からAIプロトタイプ作成・デプロイまで完全ガイド",
  description:
    "Firebase StudioはGoogleが提供するAI統合クラウド開発環境。ブラウザだけでアプリ開発・プレビュー・デプロイまで完結します。本記事では、ワークスペース作成、Geminiの活用、Firebase連携、Hostingへの公開手順、注意点までを公式情報に基づいて解説。",
  genre: "AI",
  tags: ["Firebase", "AI", "開発環境", "チュートリアル"],
  date: "2025-10-14",
  latest_update: "2026-06-24",
  heroImage:
    "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-getting-started-tutorial-hero.webp",
  heroImageAlt: "Firebase Studio始め方チュートリアル - ワークスペース作成からデプロイまでの完全ガイド",
  sections: [
    {
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "本記事は一次情報（Firebase公式ドキュメント、Google Developers Blog、Firebase Blog）に基づき構成しています。Firebase Studioは現在プレビュー段階のため、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "Firebase Studioの準備とアクセス方法",
        "ワークスペース作成・既存リポジトリのインポート",
        "Gemini（AIエージェント）の活用ポイント",
        "Firebaseサービス（Auth／Firestore など）の統合",
        "プレビューとログ確認方法",
        "Firebase Hostingへのデプロイ手順",
        "制限事項・注意点",
        "概要編との連動（全体像の理解）",
      ],
    },
    {
      heading: "0. まずは全体像（前編：概要編）",
      body: [
        "Firebase Studioの背景や特徴、Project IDXからの進化については前回の記事で解説しています。",
        "",
        "{{RELATED_ARTICLE:what-is-firebase-studio-overview}}",
        "",
        "本記事では、その続編として「実際の操作方法（始め方）」に焦点を当てます。",
      ],
    },
    {
      heading: "1. 前提と準備",
      body: [
        "✅ 動作環境",
        "対応ブラウザ：Google Chrome（推奨）／Edge／Safari（最新版）",
        "Googleアカウント必須",
        "Firebaseプロジェクトを利用する場合は、Firebase Console権限も必要",
        "",
        "Firebase StudioはブラウザベースのIDEであり、ローカル環境構築は不要です。",
      ],
    },
    {
      heading: "2. Firebase Studioにアクセスしてワークスペースを作成",
      list: [
        "1. https://firebase.google.com/studio にアクセス",
        "2. 「Sign in with Google」でログイン",
        "3. 左上の Create a new workspace をクリック",
        "4. 任意のプロジェクト名を入力（例：my-first-firebase-app）",
        "5. テンプレートを選択（例：Next.js、React、Vue、Angular、Flutter、Go、Python）",
        "6. 「Create workspace」を押すと、数十秒でブラウザIDEが起動",
      ],
      body: [
        "作成されたワークスペースはGoogleアカウントに紐づき、他の端末からもアクセス可能。Firebase Studioでは、最大3つまで無料ワークスペースを保持できます。",
        "参考: Firebase Studio Pricing — https://firebase.google.com/docs/studio/pricing",
      ],
    },
    {
      heading: "3. 既存リポジトリをインポートする（任意）",
      body: [
        "GitHub／GitLab／Bitbucketから既存プロジェクトを取り込むことも可能です。",
        "手順:",
        "特殊なネイティブ依存やビルド設定がある場合、dev.nix を編集して環境をカスタマイズ可能です。",
        "参考: Import existing project — https://firebase.google.com/docs/studio/get-started-import",
      ],
      list: [
        "1. メニューから Import from GitHub を選択",
        "2. リポジトリを選択 → Import",
        "3. Studioが自動的に package.json や依存関係を解析し、環境を構築",
      ],
    },
    {
      heading: "4. テンプレートと初期構成を確認",
      body: [
        "テンプレートによってはすでにプレビュー設定（.idx/dev.nix）が組み込まれていますが、含まれていない場合は手動で有効化する必要があります。",
        "",
        "テンプレート構成：Next.js／React／Vue／Flutterなど",
        "一部テンプレートでは、プレビュー機能が事前設定されていない場合あり",
        "参考: Preview your app — https://firebase.google.com/docs/studio/preview-apps",
      ],
    },
    {
      heading: "5. Gemini（AIエージェント）を使う",
      body: [
        "Firebase Studio右上の「Gemini」アイコン、または下部のチャットバーから起動します。AIモデルには Gemini Pro が使用され、コード補完・提案・解説が可能です。",
        "",
        "AIはプロジェクト内の文脈を参照し、コードを提案します。ただし、生成内容は常に検証が必要です。",
        "参考: Gemini safety notice — https://firebase.google.com/docs/studio/ai-assistance",
      ],
      table: {
        headers: ["用途", "指示例（英語推奨）"],
        rows: [
          ["コード生成", "Create a login page using Firebase Auth"],
          ["エラーハンドリング改善", "Improve error handling in this function"],
          ["テスト作成", "Write a unit test for this component"],
          ["コード解説", "Explain what this function does"],
        ],
      },
    },
    {
      heading: "6. Firebaseサービスの統合（Auth／Firestoreなど）",
      body: [
        "Geminiに「Add Firebase Authentication」などと指示すると、関連する設定ファイル（firebase.json など）、必要な依存パッケージの追加、雛形コードの生成を試みます。",
        "",
        "ただし、すべてのケースで完全自動化されるわけではありません。Firebaseプロジェクトの紐付け、環境変数設定、セキュリティルールなどは手動確認が推奨されます。",
      ],
    },
    {
      heading: "7. プレビューとログ確認",
      body: [
        "上部の Preview ボタンで動作を確認できます。",
        "",
        "Webアプリ → ブラウザ内プレビュー（Live reload対応）",
        "Flutter（Android） → Androidプレビュー利用可能（β機能）",
        "",
        "ログ／ターミナルタブで、ビルド／エラー／出力結果をリアルタイムに確認可能。",
        "参考: Preview your app – Firebase Docs — https://firebase.google.com/docs/studio/preview-apps",
      ],
    },
    {
      heading: "8. Firebase Hostingへのデプロイ",
      list: [
        "1. 右上の Deploy をクリック",
        "2. Firebaseプロジェクトを選択（初回のみ紐付け）",
        "3. firebase.json が生成・更新され、デプロイ実行",
        "4. 完了後、公開URL（例：https://your-app.web.app/）が表示",
      ],
      body: [
        "StudioからHostingに直接デプロイ可能ですが、高度な設定（CI/CD・複数環境管理）はFirebase CLI併用が推奨されます。",
      ],
    },
    {
      heading: "9. トラブルシュート（よくある事例）",
      table: {
        headers: ["症状", "主な原因", "対処"],
        rows: [
          ["ワークスペースが開かない", "ブラウザ拡張・キャッシュ", "シークレットモードで再試行"],
          ["Geminiが応答しない", "一時的なサーバー制限", "モード切替または時間をおいて再試行"],
          ["FirestoreやAuthが反映されない", "設定未紐付け／ルールエラー", "Firebase Consoleで設定確認"],
          ["Hostingデプロイ失敗", "権限不足／プロジェクトID相違", "プロジェクト選択とロール確認"],
          ["プレビューが動かない", "dev.nix設定未適用", "設定ファイルの有効化またはテンプレート再作成"],
        ],
      },
    },
    {
      heading: "10. 制限と注意点（Preview版）",
      table: {
        headers: ["項目", "内容"],
        rows: [
          ["無料ワークスペース数", "最大3つまで"],
          ["Geminiリクエスト制限", "過負荷時に制限が発生する場合あり"],
          ["互換性", "Preview版のため後方互換性非保証"],
          ["費用", "Studio自体は無料。Firebaseサービス使用量に応じて課金発生あり"],
          ["商用利用", "Preview段階では慎重な運用推奨"],
        ],
      },
    },
    {
      heading: "11. まとめと次のステップ",
      body: [
        "Firebase Studioは、環境構築不要 × AI統合 × Firebase連携を実現した次世代IDEです。ブラウザだけで設計 → 実装 → プレビュー → デプロイを完結でき、特に個人開発・プロトタイピングに最適です。",
        "",
        "ただし、AI生成コードはレビュー必須、プレビュー版特有の不安定さにも注意が必要。今後は正式リリースに向け、Gemini連携やCLI統合の拡充が進む見込みです。",
      ],
    },
    {
      heading: "関連記事",
      body: ["{{RELATED_ARTICLE:what-is-firebase-studio-overview}}"],
      list: [
        "公式ドキュメント：Get started with Firebase Studio",
        "https://firebase.google.com/docs/studio/get-started",
      ],
    },
  ],
})

// Append Claude Code post to the fallback posts array
fallbackBlogPosts.push({
  slug: "claude-code-overview-2025-10-14",
  title: "Claude Code入門：ターミナルで動く“エージェント型”コーディングアシスタント",
  description:
    "GitHubトレンド入りのAnthropic製『Claude Code』を、機能・導入手順・安全性・活用シーンまで一次情報ベースで整理します。",
  genre: "tech",
  tags: ["Claude Code", "Anthropic", "AI", "開発支援", "エージェント"],
  date: "2025-10-14",
  latest_update: "2026-06-24",
  readingTime: "5分",
  sections: [
    {
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "Claude Codeは、ターミナルから自然言語で指示できる“エージェント型”のコーディングツールです。コードベースの理解、ルーチンタスクの自動化、Gitワークフロー支援、複雑なコードの説明などを一体化し、開発スピードと作業品質の向上を狙います。",
        "本記事では、公式ドキュメントとリポジトリREADMEをもとに、安全に導入・運用するための要点を整理します。",
      ],
    },
    {
      heading: "主な機能（要点）",
      list: [
        "自然言語での操作：ターミナル/IDE/GitHub上で@claudeに指示",
        "ルーチンタスクの自動化：ファイル操作、変更提案、説明生成など",
        "Git支援：コミットやブランチ運用の下支え（対話での段取り共有）",
        "コード読解支援：既存コードの要約・影響範囲の説明",
      ],
    },
    {
      heading: "インストールと起動（最短）",
      body: [
        "グローバルにインストール：",
        "npm install -g @anthropic-ai/claude-code",
        "プロジェクト直下で起動：",
        "claude",
        "以降は、対話形式でコマンド提案・実行を進められます。",
      ],
    },
    {
      heading: "活用シーン",
      list: [
        "既存リポジトリの読解・概要把握（初見コードのキャッチアップ）",
        "反復作業の短縮（設定ファイルの生成や修正、テスト整備）",
        "Git運用の補助（コミット粒度やPR説明のたたき台生成）",
        "学習・共有（社内向け説明資料や変更サマリーの作成）",
      ],
    },
    {
      heading: "アーキテクチャの見取り図（概要）",
      body: [
        "READMEと公式ドキュメントの説明から読み取れる範囲では、ターミナル/IDE上のエージェント体験を軸に、コードベースの解析・提案・実行を一連で扱う設計です。低レベルの内部実装は公開資料上の説明に留まるため、詳細はドキュメントの更新に追随してください。",
      ],
    },
    {
      heading: "データの取り扱いとプライバシー",
      body: [
        "READMEには、使用状況（提案の受諾/却下など）、会話データ、/bugで送信するフィードバック等を収集する旨が明記されています。",
        "機密情報の取り扱い、保持期間、アクセス制限、学習用途への利用有無などの方針は、公式のデータ使用ポリシー/プライバシーポリシー/商用利用規約を参照してください。",
      ],
      list: [
        "Data usage: https://docs.anthropic.com/en/docs/claude-code/data-usage",
        "Commercial Terms: https://www.anthropic.com/legal/commercial-terms",
        "Privacy Policy: https://www.anthropic.com/legal/privacy",
      ],
    },
    {
      heading: "注意点（安全・品質のために）",
      list: [
        "エージェントの提案は必ずレビュー：誤変更・過剰修正を防ぐ",
        "権限と秘密情報の扱いを最小化：不要な権限付与を避ける",
        "ログ/差分の可視化：提案の採否をチームで検証できる状態に",
        "導入範囲を段階的に：まずは補助タスクから適用し、影響を観察",
      ],
    },
    {
      heading: "トラブル対応",
      body: ["不具合報告は /bug コマンド、もしくはGitHub Issuesへ。Discordコミュニティも案内されています。"],
      list: ["Issues: https://github.com/anthropics/claude-code/issues", "Discord: https://anthropic.com/discord"],
    },
    {
      heading: "まとめ",
      body: [
        "Claude Codeは、自然言語インタフェースと開発フローを結びつける“実務寄りのAIアシスタント”です。導入は簡単で、まずはドキュメント生成やリファクタ提案などリスクの低い領域から試すのが現実的です。",
        "ツールの進化に合わせてルールと運用を見直し、レビュー/監査の仕組みとセットで活用することで、品質とスピードを両立できます。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: anthropics/claude-code",
        "https://github.com/anthropics/claude-code",
        "Overview Docs",
        "https://docs.anthropic.com/en/docs/claude-code/overview",
        "Data usage",
        "https://docs.anthropic.com/en/docs/claude-code/data-usage",
      ],
    },
  ],
})

// Append Turso (SQLite in Rust) overview article
fallbackBlogPosts.push({
  slug: "what-is-turso-sqlite-in-rust",
  title: "Tursoとは？SQLiteをRustで書き直す“次世代の組み込みDB”の全貌",
  description:
    "TursoはSQLiteをRustで一から書き直した、SQLite互換のインプロセスSQLデータベース。BEGIN CONCURRENTによる並行書き込み、ネイティブなベクトル検索、io_uringによる非同期I/Oなど、SQLiteの制約を超える機能を備えています。本記事ではlibSQLとの関係、注目機能、導入方法、成熟度までを公式情報に基づいて解説します。",
  genre: "Backend",
  tags: ["Turso", "SQLite", "Rust"],
  date: "2026-06-23",
  latest_update: "2026-06-24",
  heroImage: "/images/blog/what-is-turso-sqlite-in-rust-hero.jpg",
  heroImageAlt: "Tursoとは？SQLiteをRustで書き直す次世代の組み込みDBの全貌",
  sections: [
    {
      image: "/images/blog/turso-cloud-beta-production-comparison.png",
      imageAlt: "TursoとTurso Cloudの機能・成熟度比較（ベータ版とプロダクション版の全体像）",
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "本記事は一次情報（Turso公式リポジトリおよびドキュメント）に基づき構成しています。Tursoは現在ベータ段階のため、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "Tursoとは何か／SQLite・libSQLとの関係",
        "なぜRustで書き直すのか（非同期I/O・安全性）",
        "SQLiteとの違いと注目機能（並行書き込み・ベクトル検索ほか）",
        "インストールと最小コード例",
        "AIとの接点：MCPサーバーモード",
        "本番投入できるか（成熟度・ライセンス・注意点）",
      ],
    },
    {
      heading: "Tursoとは？SQLiteを“フォーク”ではなく“書き直す”",
      body: [
        "Tursoは「Rustで書かれた、SQLite互換のインプロセス（組み込み）SQLデータベース」です。アプリと同じプロセス内で動作し、サーバーを立てずに使える点はSQLiteと同じ思想を継いでいます。",
        "決定的に異なるのは、TursoがSQLiteのコードをフォーク（改変）したものではなく、SQLiteをRustでゼロから書き直したプロジェクトだという点です。公式は「SQLiteの次の進化形をRustで作る、オープンな貢献を重視したプロジェクト」と位置づけています。",
        "同チームはかつて、SQLiteをCのままフォークして拡張する「libSQL」を進めていました。しかしRustでの書き直しが想像以上にうまくいったため、現在はTursoがlibSQLに代わる本命の方向性とされています。",
      ],
    },
    {
      heading: "なぜRustなのか",
      body: [
        "Rustを選ぶ最大の動機は、Cでは難しかったアーキテクチャ上の自由度です。代表例がLinux上での io_uring を用いた非同期I/Oで、従来のSQLiteがスレッドに頼っていた並行処理のオーバーヘッドを削減できます。",
        "これはサーバーレスやエッジのように「スレッドを増やしにくい・接続が大量に発生する」環境で特に効きます。加えてRustのメモリ安全性により、より積極的な最適化を安全に行える点も書き直しの理由です。",
      ],
    },
    {
      heading: "SQLiteとの違いと注目機能",
      body: [
        "TursoはSQLite互換を保ちながら、SQLiteの「単一ライター」という根本制約に踏み込む機能を追加しています。主なものは次の通りです。",
      ],
      table: {
        headers: ["機能", "概要"],
        rows: [
          ["BEGIN CONCURRENT", "MVCC（多版型同時実行制御）による並行書き込みでスループットを改善"],
          ["Change Data Capture（CDC）", "データ変更をリアルタイムに追跡"],
          ["ネイティブ・ベクトル検索", "厳密検索やベクトル操作を標準サポート（埋め込み活用向け）"],
          ["全文検索（FTS）", "Tantivyライブラリを利用した全文検索"],
          ["スキーマ管理の強化", "ALTER対応の拡張など"],
          ["保存時暗号化", "Encryption at rest（実験的）"],
          ["インクリメンタル計算", "DBSPによる増分ビュー更新"],
        ],
      },
    },
    {
      heading: "使ってみる：インストールと最小例",
      body: [
        "CLIインストーラーで導入できます。",
        "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/tursodatabase/turso/releases/latest/download/turso_cli-installer.sh | sh",
        "",
        "対話シェルは tursodb で起動します。SQLそのものはSQLiteと同じ感覚で書けます。",
        "CREATE TABLE users (id INT, username TEXT);",
        "INSERT INTO users VALUES (1, 'alice');",
        "SELECT * FROM users;",
        "",
        "JavaScript（Node.js）では @tursodatabase/database を使います。",
        "import { connect } from '@tursodatabase/database';",
        "const db = await connect('sqlite.db');",
        "const users = db.prepare('SELECT * FROM users').all();",
        "",
        "このほかRust・Go・Python・Java・.NET・WebAssembly向けのバインディングが提供されています。",
      ],
    },
    {
      heading: "AIとの接点：MCPサーバーモード",
      body: [
        "Tursoは Model Context Protocol（MCP）サーバーモードを備えており、Claude CodeやClaude DesktopのようなAIアシスタントから直接データベースを操作できます。",
        "「組み込みDB × AIエージェント」という組み合わせは、ローカルで完結するRAGや開発支援ツールとの相性がよく、これからのAIエージェント開発における強力な選択肢となるでしょう。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "本番で使える？成熟度と注意点",
      image: "/images/blog/turso-cloud-dashboard-overview.png",
      imageAlt: "Turso Cloud管理ダッシュボードの概要（データベース管理と連携機能）",
      body: [
        "公式は「本ソフトウェアはベータであり、バグや想定外の挙動が残る可能性がある」と明記しています。一方で、Turso Cloud・Kin AIアシスタント・Spice.aiなど実運用での採用事例もあります。",
        "品質面では、独自の決定的シミュレーションテスト（DST）やAntithesisなど多数のツールで広範にテストされており、目標として「SQLiteレベルの信頼性」を掲げています。",
        "ライセンスはMITで商用採用のハードルが低い点も魅力です。最新版はv0.6.1（2026年5月時点）。新規プロジェクトでSQLite互換と現代的な並行性・ベクトル検索を両立したい場合は、評価する価値があります。",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "Tursoは、SQLiteの“組み込みで手軽”という長所を保ちつつ、並行書き込み・非同期I/O・ベクトル検索といった現代的な要求に応える「SQLiteの書き直し」プロジェクトです。",
        "ベータゆえにミッションクリティカル用途は慎重に判断すべきですが、活発な開発と実運用事例、MITライセンス、AI連携（MCP）まで含めて、今後の本命として注目に値します。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: tursodatabase/turso",
        "https://github.com/tursodatabase/turso",
        "公式サイト",
        "https://turso.tech/",
        "ドキュメント",
        "https://docs.turso.tech/",
      ],
    },
  ],
})

// Append OpenMontage (agentic video production) overview article
fallbackBlogPosts.push({
  slug: "what-is-openmontage-agentic-video",
  title: "OpenMontageとは？AIエージェントが“制作チーム”になる次世代の動画生成システム",
  description:
    "OpenMontageは、AIコーディングアシスタントを動画制作スタジオに変えるオープンソースのエージェント駆動システム。1クリップ生成で終わらず、リサーチ→脚本→素材生成→編集→合成という実際の制作工程を自動化します。12のパイプライン・52ツール・500以上のスキル、無料ローカル完結から有料API連携までを公式情報に基づいて解説します。",
  genre: "AI",
  tags: ["OpenMontage", "AI動画", "エージェント"],
  date: "2026-06-23",
  latest_update: "2026-06-24",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "OpenMontage - AIエージェントが制作チームになる動画生成システムの解説",
  sections: [
    {
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "本記事は一次情報（OpenMontage公式リポジトリおよびREADME）に基づき構成しています。本プロジェクトは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "OpenMontageとは何か／既存のAI動画ツールとの違い",
        "仕組み（3層アーキテクチャと「12パイプライン・52ツール・500+スキル」）",
        "対応する生成モデル・ツールの幅",
        "エージェントがどう動くか（プロバイダ選定・品質ゲート・予算管理）",
        "インストールと最小実行例（APIキーなしでも動く）",
        "ライセンスと注意点",
      ],
    },
    {
      heading: "OpenMontageとは？1クリップ生成では終わらない",
      body: [
        "OpenMontageは、Claude CodeやCursorのようなAIコーディングアシスタントを“動画制作スタジオ”に変える、オープンソースのエージェント駆動型動画制作システムです。",
        "既存のAI動画ツールの多くは「プロンプト→単発クリップ」で完結します。OpenMontageが異なるのは、実際の制作チームがたどる工程（リサーチ→提案→脚本→シーン設計→素材→編集→合成）をまるごとエージェントに自動実行させる点です。",
        "アニメ静止画を数枚動かして“動画”と称するのではなく、Archive.orgやNASA、Wikimedia Commonsなど無料・オープンな実写素材から検索可能なコーパスを構築し、本物のモーション映像で構成できるのも特徴です。GitHub Trendingで「Repository of the Day」1位を獲得しています。",
      ],
    },
    {
      heading: "仕組み：3層アーキテクチャと「12・52・500+」",
      body: [
        "知識を3層に分けて、エージェントが段階的に読み込みます。",
        "Layer 1（tools/ + pipeline_defs/）：実行可能な機能と進行ロジック",
        "Layer 2（skills/）：OpenMontage独自の作法・品質基準・制作プレイブック",
        "Layer 3（.agents/skills/）：外部技術の知識パック",
        "",
        "「12パイプライン」は用途別の制作ワークフロー、「52ツール」は8領域にまたがる実行機能、「500以上のスキル」は各ツールを“専門家のように”使うためのMarkdown指示書です。各パイプラインはYAMLマニフェスト（工程と合格基準）と、工程ごとの“ディレクタースキル”で定義されます。",
      ],
    },
    {
      heading: "12のパイプライン（用途別ワークフロー）",
      table: {
        headers: ["パイプライン", "用途"],
        rows: [
          ["Animated Explainer", "リサーチ＋ナレーション付きのAI解説動画"],
          ["Animation", "モーショングラフィックス／キネティックタイポ"],
          ["Avatar Spokesperson", "アバターが話すプレゼン動画"],
          ["Cinematic", "予告編・ティザー・ムード重視の編集"],
          ["Clip Factory", "長尺素材から短尺クリップを量産"],
          ["Documentary Montage", "無料ストック・アーカイブ素材でのテーマ編集"],
          ["Hybrid", "既存映像にAI生成グラフィックを追加"],
          ["Localization & Dub", "字幕・吹替・翻訳"],
          ["Podcast Repurpose", "ポッドキャストを動画ハイライト化"],
          ["Screen Demo", "ソフトのチュートリアル・操作解説"],
          ["Talking Head", "話者中心の映像"],
        ],
      },
    },
    {
      heading: "対応モデル・ツールの幅",
      body: [
        "52ツールは8領域に分かれ、無料ローカルから有料クラウドまで自由に組み合わせられます。主要なものを挙げます。",
      ],
      table: {
        headers: ["領域", "主な対応"],
        rows: [
          ["動画生成（14）", "Kling / Runway Gen-4 / Google Veo 3 / HeyGen、ローカルGPUのWAN 2.1・Hunyuan・LTX-Video、Pexels等のストック"],
          ["画像生成（10）", "FLUX / Google Imagen 4 / DALL-E 3 / Recraft / Stable Diffusion（ローカル）/ Unsplash ほか"],
          ["音声合成（4）", "ElevenLabs / Google TTS（700+音声・50+言語）/ OpenAI TTS / Piper（無料・オフライン）"],
          ["音楽・効果音", "Suno AI（最長8分）/ ElevenLabs Music・SFX"],
          ["合成・レンダリング", "Remotion（React）/ HyperFrames（HTML/CSS/GSAP）"],
          ["後処理", "FFmpeg、Real-ESRGAN拡大、背景除去、WhisperX文字起こし、Wav2Lipリップシンク"],
        ],
      },
    },
    {
      heading: "エージェントはどう動くか",
      body: [
        "別途オーケストレーターを用意せず、エージェント自身が制作を進めます。流れはおおむね次の通りです。",
        "1. パイプラインのYAMLマニフェスト（工程・ツール・レビュー基準）を読む",
        "2. 工程ごとのディレクタースキル（実行手順）を読む",
        "3. プロバイダを7次元スコアで選定（タスク適合30%・品質20%・制御15%・信頼性15%・コスト10%・遅延5%・連続性5%）",
        "4. Pythonツールを呼び、レビュアースキルで自己点検",
        "5. 状態をJSONでチェックポイント保存（判断ログ・コストも記録）",
        "6. 創造的な判断ポイントで人間に承認を求める",
        "7. 合成前のバリデーションゲートが“スライドショー化”を防止",
        "8. RemotionまたはFFmpegでレンダリング後、ffprobe等で自己レビュー",
        "",
        "予算管理も組み込みで、実行前に見積もり、上限（既定で合計10ドル）やアクション単位の承認しきい値を設定できます。",
      ],
    },
    {
      heading: "使ってみる：インストールと初期設定",
      body: [
        "OpenMontageの導入は、主にGitリポジトリをクローンし、セットアップコマンドを実行する流れで行います。",
        "お使いのAIコーディングアシスタント（Claude Code, Cursor, Copilot, Windsurf, Codexなど）でプロジェクトを開き、以下の手順で進めてください。",
        "",
        "【1. 前提条件の確認】",
        "導入前に以下のツールがインストールされている必要があります。",
        "・Python 3.10+ (python.org)",
        "・FFmpeg (brew install ffmpeg / sudo apt install ffmpeg など)",
        "・Node.js 18+ (nodejs.org)",
        "・AIコーディングアシスタント",
        "",
        "【2. インストール手順】",
        "ターミナルで以下のコマンドを順番に実行します。",
        "# 1. リポジトリのクローン",
        "git clone https://github.com/calesthio/OpenMontage.git",
        "cd OpenMontage",
        "",
        "# 2. セットアップの実行",
        "make setup",
        "",
        "【3. 初期設定（任意）】",
        "AIアシスタントに「何を作りたいか」を伝えてください。",
        "例：「Make a 60-second animated explainer about how neural networks learn」",
        "",
        "【注意点・補足】",
        "・APIキーについて: より高度なツール（画像・動画生成など）を使用したい場合は、.envファイルを作成し、必要なAPIキー（FAL_KEY, OPENAI_API_KEYなど）を設定します。.env.exampleを参考にしてください。",
        "・Windows環境: npm installでERR_INVALID_ARG_TYPEエラーが出る場合は、代わりに npx --yes npm install を試してください。",
        "・GPUをお持ちの場合: make install-gpu を実行すると、ローカルでの動画生成が可能になります。",
        "・詳細な構成やガイドについては、リポジトリ内の AGENT_GUIDE.md や README.md を直接AIエージェントに読み込ませて指示を出すとスムーズです。",
      ],
    },
    {
      heading: "利用料金とコスト管理：無料の範囲と有料のケース",
      body: [
        "OpenMontage自体はオープンソースのソフトウェアですので、ソフトウェアの利用料金はかかりません。",
        "ただし、生成する動画の内容や使用するツールによっては、外部サービスのAPI利用料金が発生する場合があります。費用が発生するかどうかは、以下の「無料の範囲」と「有料のケース」を比較して判断してください。",
        "",
        "【1. 無料でできること（APIキーなし）】",
        "以下のツールや手法を使う場合、追加の費用はかからず、完全無料で運用可能です。",
        "・ナレーション: ローカル動作の「Piper TTS」が使用可能（非常に自然な声です）。",
        "・素材の収集: Archive.org、NASA、Wikimedia Commonsなどのオープンソース素材を自動検索して使用可能。",
        "・動画編集・構成: 「Remotion」や「HyperFrames」を使用して、プログラミングベースで動画を組み立てられます。",
        "・ローカル生成: GPU（グラフィックボード）をお持ちの場合、make install-gpuを実行することで、動画生成モデル（WAN 2.1など）をPC上でローカル動作させ、無料で動画生成が可能です。",
        "",
        "【2. 有料になるケース（APIキー設定時）】",
        "より高品質な映像や、特定のモデルを使用したい場合に、外部サービス（API）の利用料が発生します。これらは使った分だけ課金されるのが一般的です。",
        "・画像・動画生成API: FLUX、Google Veo、Kling、Runwayなどのクラウドサービスを利用する場合、API利用料が必要です（目安として、簡単な動画なら数百円〜千円程度から）。",
        "・高度な音声・音楽: ElevenLabs（超高品質な音声）やSuno（楽曲生成）などを使用する場合。",
        "",
        "【費用を抑えるためのポイント】",
        "・まずは「無料版」から: 最初はAPIキーを設定せずに、「Piper TTS」と「オープンソース素材」の組み合わせでプロジェクトを作成してみてください。",
        "・事前見積もり機能: OpenMontageには実行前にコストを見積もる機能があります。制作を開始する前にAgentが予測費用を教えてくれるため、意図しない課金を防ぐことができます。",
        "・設定の管理: .envファイルで使うツールを制限できるため、無料ツールだけを許可するように設定すれば、誤って課金されることはありません。",
      ],
    },
    {
      heading: "ライセンスとまとめ",
      body: [
        "ライセンスはGNU AGPLv3（コピーレフト）です。商用・プロプライエタリ利用には別途ライセンスが必要な点に注意してください。",
        "OpenMontageは、単発クリップ生成と本格的な映像制作の間を埋める“エージェント駆動の動画パイプライン”です。リサーチから合成までを構造化された工程として自動化し、品質ゲートと予算管理で破綻を防ぎます。",
        "結論として、「AI生成動画に本格的なシネマティック映像を求めるなら少額のAPI利用料がかかる可能性があるが、工夫次第で完全に無料で作品を作り続けることも可能」という画期的なシステムです。Claude CodeやCursorを日常的に使う開発者にとって、大いに試す価値があります。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: calesthio/OpenMontage",
        "https://github.com/calesthio/OpenMontage",
        "YouTubeチャンネル（@OpenMontage）",
        "https://www.youtube.com/@OpenMontage",
      ],
    },
  ],
})

// Append Penpot (open-source design platform) overview article
fallbackBlogPosts.push({
  slug: "what-is-penpot-open-source-design",
  title: "Penpotとは？Web標準で“デザイン=コード”を実現するオープンソースのFigma代替",
  description:
    "Penpotは、SVG・CSS・HTML・JSONといったWeb標準の上に作られたオープンソースのデザインプラットフォーム。セルフホストでデザイン基盤を完全に所有でき、CSS Grid／Flexレイアウト、デザイントークン、Inspectモード、MCPサーバーでデザインと開発の距離を縮めます。Figmaとの違いから始め方までを公式情報に基づいて解説します。",
  genre: "Frontend",
  tags: ["Penpot", "デザインツール", "Figma代替"],
  date: "2026-06-23",
  latest_update: "2026-06-24",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Penpot - Web標準でデザインとコードをつなぐオープンソースのデザインプラットフォーム解説",
  sections: [
    {
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "本記事は一次情報（Penpot公式リポジトリおよびREADME）に基づき構成しています。Penpotは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "Penpotとは何か／Figmaとの違い",
        "最大の特徴：Web標準による“デザイン=コード”",
        "主な機能（レイアウト・トークン・Inspect・プラグイン・MCP）",
        "技術スタック",
        "始め方（SaaS／セルフホスト）",
        "ライセンス・成熟度・対象",
      ],
    },
    {
      heading: "Penpotとは？Figmaとの違い",
      body: [
        "Penpotは「大規模にプロダクトを作るチームのためのオープンソース・デザインプラットフォーム」を掲げるデザインツールです。",
        "Figmaのようなプロプライエタリなツールと最も異なるのは、セルフホストによってデザイン基盤を“自分たちで完全に所有”できる点です。ベンダーロックインや、厳しいガバナンス要件を持つ組織のコンプライアンス課題に応えます。ブラウザ版のSaaSと、自社サーバーでのホスティングを選べます。",
        "GitHubスター53.1k超のメジャーなプロジェクトで、ライセンスはMPL-2.0。Kaleidos社が支える商用バックアップ付きのオープンソースです。",
      ],
    },
    {
      heading: "最大の特徴：Web標準で“デザイン=コード”",
      body: [
        "Penpotは SVG・CSS・HTML・JSON といったWeb標準の上に作られています。これにより、デザイナーの成果物が独自エクスポート形式や変換レイヤーを介さず、そのままコードへ橋渡しされます。",
        "公式は「デザインがコードとして表現されるため、開発者がPenpotを“自宅のように”使える」と述べています。さらにMCP（Model Context Protocol）サーバーと公開APIによってワークスペースがプログラム可能になり、デザインと開発の距離を縮めます。",
      ],
    },
    {
      heading: "主な機能",
      table: {
        headers: ["機能", "概要"],
        rows: [
          ["リアルタイム協業", "複数人で同時編集"],
          ["CSS Grid / Flex レイアウト", "“最初から実コードのように振る舞う”レスポンシブ設計"],
          ["コンポーネント & バリアント", "再利用可能で一貫したUIを構築"],
          ["デザイントークン", "デザインと開発の単一の信頼できる情報源"],
          ["Inspectモード", "SVG/CSS/HTMLのすぐ使えるコードを取得"],
          ["プラグイン / API / Webhook", "カスタム連携・自動化、トークンによるAPIアクセス"],
          ["MCPサーバー", "デザインとコードの双方向ワークフロー"],
        ],
      },
    },
    {
      heading: "技術スタック",
      body: [
        "Penpotはデザインツールとしては珍しい関数型中心の構成です。",
        "バックエンド：Clojure（コードベースの約74%）",
        "フロントエンド：ClojureScript",
        "描画など性能が要る部分：Rust",
        "スタイル：SCSS、ほかTypeScript／HTML",
        "",
        "複雑な状態管理を関数型で扱いつつ、レンダリングのような性能クリティカルな処理にRustを使う設計です。",
      ],
    },
    {
      heading: "始め方（SaaS / セルフホスト）",
      body: [
        "導入は2通りあります。",
        "1. SaaS（最速）：ホスティング版 design.penpot.app にアクセスするだけ",
        "2. セルフホスト：penpot.app/self-host にDocker・Kubernetes・Elestio向けの手順あり",
        "",
        "公式の技術ガイド（help.penpot.app）にセットアップやコントリビュート手順がまとまっています。デザイン基盤を内製・監査したい組織はセルフホストが選択肢になります。",
      ],
    },
    {
      heading: "ライセンス・成熟度・対象",
      body: [
        "ライセンスはMPL-2.0（権利者はKaleidos INC）。最新版はv2.16.0（2026年6月11日）で、リリース数81・developブランチのコミットは2.2万超と、成熟して活発に開発が続いています。",
        "対象は「大規模にプロダクトを作るチーム」やコンプライアンス要件の厳しい組織を中心に、中小チームやスタートアップまで。ベンダー非依存のデザイン基盤を求める場合に有力です。",
        "",
        "デザインとコードを直結させるという思想は、ビジュアル編集が即コードに反映されるツールとも通じます。",
        "{{RELATED_ARTICLE:what-is-onlook}}",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "Penpotは、Web標準（SVG/CSS/HTML/JSON）を土台に“デザイン=コード”を実現し、セルフホストでデザイン基盤を完全に所有できるオープンソースのFigma代替です。",
        "デザイントークン・コンポーネント・Inspect・MCPなど、デザインと開発を一気通貫でつなぐ機能が揃っており、ベンダーロックインを避けたいチームにとって現実的な選択肢になっています。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: penpot/penpot",
        "https://github.com/penpot/penpot",
        "公式サイト",
        "https://penpot.app/",
        "セルフホスト手順",
        "https://penpot.app/self-host",
      ],
    },
  ],
})

// Append Firecrawl (web data API for AI) overview article
fallbackBlogPosts.push({
  slug: "what-is-firecrawl-web-data-api",
  title: "Firecrawlとは？Webを“LLMが使えるデータ”に変えるAI時代のスクレイピングAPI",
  description:
    "Firecrawlは、WebサイトをクリーンなMarkdownや構造化JSONに変換し、RAGやAIエージェントにそのまま渡せるWebデータAPI。Scrape・Search・Crawl・Map・Agentなどのエンドポイント、JS描画やプロキシの自動処理、スキーマによる構造化抽出、MCPサーバー連携までを公式情報に基づいて解説します。",
  genre: "Backend",
  tags: ["Firecrawl", "RAG", "スクレイピング"],
  date: "2026-06-23",
  latest_update: "2026-06-24",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Firecrawl - WebをLLM向けデータに変換するAI時代のスクレイピングAPIの解説",
  sections: [
    {
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "本記事は一次情報（Firecrawl公式リポジトリおよびREADME）に基づき構成しています。Firecrawlは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "Firecrawlとは何か／どんな課題を解くか",
        "主要エンドポイント（Scrape・Search・Crawl・Map・Agent・Batch）",
        "ただのスクレイパーではない理由（JS描画・プロキシ・Actions・構造化抽出）",
        "最小コード例とSDK／クラウドとセルフホスト",
        "AIエコシステム連携（MCPサーバーほか）",
        "ライセンスと成熟度",
      ],
    },
    {
      heading: "Firecrawlとは？Webを“LLMが使えるデータ”に",
      body: [
        "Firecrawlは「Webを大規模に検索・スクレイプ・操作するためのAPI」です。乱雑なWebページを、クリーンなMarkdownや構造化JSON、スクリーンショットといったLLM最適化された形式に変換します。",
        "RAG（検索拡張生成）やAIエージェントを作るとき、Webから信頼できるデータを取り出すのは想像以上に厄介です。サイトごとに構造はバラバラ、JavaScriptレンダリング、プロキシ・レート制限・ボット対策…。Firecrawlはこの面倒をまるごと肩代わりし、トークン消費を抑えた出力をそのままAIスタックに流し込めます。",
        "GitHubスターは13万超と非常に人気が高く、ライセンスはAGPL-3.0のオープンソースです。",
      ],
    },
    {
      heading: "主要エンドポイント",
      table: {
        headers: ["エンドポイント", "役割"],
        rows: [
          ["Scrape", "単一URLをMarkdown/HTML/JSON/スクショに変換。JS重めのページにも対応"],
          ["Search", "Web検索し、結果ページの本文まで取得（URL未知のRAG向け）"],
          ["Crawl", "サイト内の全URLをスクレイプ。ジョブID＋ポーリングで非同期処理"],
          ["Map", "サイトの全URLを即座に発見。検索フィルタで関連順に絞り込み可"],
          ["Agent（旧 extract）", "自然言語で“ほしい情報”を指定すると、探索・取得まで自動実行"],
          ["Batch Scrape", "複数URLを1リクエストで非同期にまとめて取得"],
        ],
      },
    },
    {
      heading: "ただのスクレイパーではない",
      body: [
        "Firecrawlが単なる取得ツールと違うのは、実運用で詰まりがちな部分を標準で備えている点です。",
        "JavaScriptレンダリング：JS重めのサイトもネイティブ対応（公式は“Webの96%をカバー”と表現）",
        "プロキシ自動ローテーション：ゼロ設定で切り替え",
        "Actions（操作）：抽出前にクリック・スクロール・入力・待機などを実行。フォームやECサイト向け",
        "メディア解析：Web上のPDFやDOCXなどの文書からも内容を抽出",
        "構造化抽出：JSONスキーマを定義すると、生Markdownではなく検証済みの構造化データを返す",
      ],
    },
    {
      heading: "使ってみる：最小コードとSDK",
      body: [
        "クラウド版はAPIキーを取得するだけで使えます（インフラ不要）。セルフホストもAGPL-3.0で可能です。",
        "",
        "Python（Scrape）の例：",
        "from firecrawl import Firecrawl",
        "app = Firecrawl(api_key='fc-YOUR_API_KEY')",
        "result = app.scrape('firecrawl.dev')",
        "print(result.markdown)",
        "",
        "Agentはスキーマ（例：Pydanticモデル）を渡すと、自然言語の指示から構造化データを返します。たとえば「Firecrawlの創業者を探して」という指示＋スキーマで、名前・役職などを型付きで取得できます。",
        "",
        "公式SDKはPython（firecrawl-py）・Node.js（firecrawl）・Java・Elixir・Rust、コミュニティ製のGoなど。Crawlやバッチの非同期ポーリングはSDKが自動で面倒を見ます。",
      ],
    },
    {
      heading: "AIエコシステム連携（MCPほか）",
      body: [
        "FirecrawlはMCP（Model Context Protocol）サーバーを提供しており、ClaudeなどMCP対応エージェントから直接Webデータ取得を呼び出せます。導入は npx -y firecrawl-mcp をMCPサーバーとして登録し、環境変数 FIRECRAWL_API_KEY を設定するだけです。",
        "このほかCLI連携やLovable・Zapier・n8nなどのプラットフォーム連携も用意されています。Claude Codeを使う開発フローにも自然に組み込めます。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "ライセンスと成熟度",
      body: [
        "ライセンスはAGPL-3.0（SDKはMIT）。最新版はv2.11.0（2026年6月時点）で、TypeScript中心にPython・Rustを含む構成です。",
        "活発に開発・メンテナンスが続いており、クラウド版にはプレミアム機能、セルフホストはAGPLで完全サポートという二本立てです。",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "Firecrawlは、Webスクレイピングの定型作業（JS描画・プロキシ・構造化）を肩代わりし、Webを“LLMがそのまま使えるデータ”に変えるAPIです。",
        "高いカバー率と構造化抽出、Agentによる自然言語取得、MCP連携まで揃っており、RAGパイプラインやリアルタイムな知識ベース、最新情報を必要とするAIエージェントの土台として有力です。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: firecrawl/firecrawl",
        "https://github.com/firecrawl/firecrawl",
        "公式サイト",
        "https://firecrawl.dev/",
        "ドキュメント",
        "https://docs.firecrawl.dev/",
      ],
    },
  ],
})

// Claude Code pricing / cost-optimization article
fallbackBlogPosts.push({
  slug: "claude-code-pricing-cost-optimization",
  title: "Claude Codeの料金は結局いくら？Pro・Max・API課金とコスト最適化【2026年版】",
  description:
    "Claude CodeのPro、Max 5x、Max 20xとAPI従量課金を比較。月額料金、利用上限の考え方、利用頻度別の選び方、トークン消費を抑える方法を2026年6月時点の公式情報に基づいて解説します。",
  genre: "AI",
  tags: ["Claude Code", "料金", "コスト最適化"],
  date: "2026-06-26",
  latest_update: "2026-06-27",
  readingTime: "6分",
  sections: [
    {
      body: [
        "Claude Codeを導入したいものの、「Pro、Max、APIのどれを選べばよいのか」「月額はいくら見込めばよいのか」と迷う方は少なくありません。",
        "本記事では、個人向けの定額プランとAPI従量課金の違いを整理し、利用頻度に合った選び方とコストを抑える方法を解説します。初めてClaude Codeを使う方は、入門記事（ https://lexia-hp.com/blog/claude-code-overview-2025-10-14 ）もあわせてご覧ください。",
      ],
    },
    {
      richtext: affiliateNoteHtml(
        "契約前に最新料金をご確認ください",
        '本記事は2026年6月時点の情報を掲載しています。プラン料金、利用上限、モデル単価は変更されることがあるため、契約前に<a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer"><strong>Claude公式料金ページ</strong></a>と<a href="https://platform.claude.com/docs/ja/about-claude/pricing" target="_blank" rel="noopener noreferrer"><strong>API公式料金表</strong></a>をご確認ください。表示額は米ドルで、税やモバイルアプリ経由の料金は異なる場合があります。',
      ),
    },
    {
      heading: "料金体系の全体像：定額プランとAPI従量課金",
      image: "/images/blog/claude-code-ai-assistant.webp",
      imageAlt: "Claude CodeをエディタとターミナルでAIアシスタントとして使うイメージ",
      body: [
        "個人でClaude Codeを使う主な方法は、Claudeアカウントの定額プランに加入する方法と、APIの利用量に応じて支払う方法です。",
        "ProとMaxの利用枠は、ブラウザ版やデスクトップ版などのClaudeとClaude Codeで共有されます。実際に使える量は、選択するモデル、コードベースの規模、実行するタスク、並列セッション数によって変わります。",
      ],
      list: [
        "Claude Pro（$20/月）：小規模なリポジトリでの軽いコーディングや、Claude Codeを試したい方向け。",
        "Claude Max 5x（$100/月）：1セッションあたりProの5倍の利用枠。日常的に使い、Proの上限に達することが多い方向け。",
        "Claude Max 20x（$200/月）：1セッションあたりProの20倍の利用枠。大規模な作業を高頻度で行う方向け。",
        "API従量課金：入力・出力トークンなどの使用量に応じて課金。2026年6月時点の標準料金は、Opus 4.8が入力$5／出力$25、Sonnet 4.6が入力$3／出力$15（いずれも100万トークンあたり）。",
      ],
    },
    {
      heading: "利用頻度別の選び方",
      body: [
        "定額プランは毎月の支出を把握しやすく、APIは使った分だけ支払えることが大きな違いです。ただし、モデルや入出力トークン量によってAPI料金が変わるため、すべての利用者に共通する損益分岐点はありません。まず小さなプランから始め、実際の利用状況を見て変更するのが現実的です。",
      ],
      table: {
        headers: ["使い方の目安", "向いている課金", "理由"],
        rows: [
          ["週に数回の軽い利用・導入テスト", "Claude Pro", "最も低い月額でClaude Codeを試せる"],
          ["日常的に使い、Proの上限に達することが多い", "Claude Max 5x", "Proより大きな利用枠を定額で確保できる"],
          ["大規模な作業が多く、Max 5xでも不足する", "Claude Max 20x", "個人向け定額プランの中で利用枠が最も大きい"],
          ["CI・夜間バッチ・自動処理", "API従量課金", "プログラムから実行でき、処理ごとの利用量を追跡しやすい"],
        ],
      },
    },
    {
      heading: "利用量を抑える6つの方法",
      body: [
        "API料金はトークン使用量に応じて増え、定額プランの利用枠もタスクの内容やモデルによって消費量が変わります。次の工夫は、不要なコンテキストや手戻りを減らすのに有効です。",
      ],
      list: [
        "会話が長くなったら /compact でコンテキストを圧縮し、前の作業が不要になったら /clear で会話をリセットする。",
        "CLAUDE.mdには、プロジェクト固有のルールや必要最小限の前提だけを書く。APIキー、パスワード、顧客情報などの機密情報は記載しない。",
        "複雑な設計や調査にはOpus 4.8、定型的な実装や修正にはSonnet 4.6を使うなど、タスクに応じてモデルを選ぶ。",
        "サブエージェントや並列セッションは、同時実行が必要な作業に限定する。",
        "大きなファイルを無条件に読み込ませず、対象のファイルや範囲を具体的に指定する。",
        "大きな依頼は検証可能な単位に分け、途中で結果を確認してから次へ進む。",
      ],
    },
    {
      heading: "API従量課金が向くケースと費用管理",
      body: [
        "API従量課金は、CIでのチェック、夜間バッチ、定期的なコード解析など、プログラムから実行する処理に適しています。一方、ループや過剰な並列実行が続くと、想定より早く費用が増える可能性があります。",
        "また、端末にANTHROPIC_API_KEYが設定されている場合、定額プランでログインしていてもAPI課金が使われることがあります。Claude Codeを実行する前に、認証方法と請求先を確認してください。",
      ],
      richtext: affiliateAlertHtml(
        "利用前に支出上限を設定してください",
        'Claude Consoleでは、組織やワークスペースに月間の支出上限と通知を設定できます。自動処理を始める前に、<strong>支出上限・通知・利用量の確認方法</strong>を設定し、小規模な実行で費用を確認してから対象を広げてください。設定方法は<a href="https://platform.claude.com/docs/en/api/rate-limits" target="_blank" rel="noopener noreferrer">公式ドキュメント</a>で確認できます。',
      ),
    },
    {
      heading: "まとめ：利用実績を見て段階的に選ぶ",
      body: [
        "初めて使う場合はProから始め、利用上限に達する頻度が増えたらMax 5x、さらに不足する場合はMax 20xを検討すると、過剰な契約を避けやすくなります。CIや定期処理などの自動化には、支出上限を設定したAPI従量課金が適しています。",
        "Maxも無制限ではなく、複数セッションを並列で動かすと利用枠を早く消費します。プラン名だけで判断せず、実際の使用量、待ち時間、月額費用を確認しながら見直してください。",
      ],
    },
    {
      heading: "関連記事・公式情報",
      list: [
        "Claude Code入門：https://lexia-hp.com/blog/claude-code-overview-2025-10-14",
        "Claude Pro・MaxでClaude Codeを使う：https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan/",
        "Claude APIの料金：https://platform.claude.com/docs/ja/about-claude/pricing",
        "Claude APIの利用上限と支出上限：https://platform.claude.com/docs/en/api/rate-limits",
      ],
    },
  ],
})

// Append Mac mini × Claude Code cluster monetization article (Amazonアソシエイト記事)
fallbackBlogPosts.push({
  slug: "mac-mini-cluster-claude-code-monetization",
  title: "Mac mini複数台で「AIエージェント部署」を作る｜Claude Code並列稼働と収益化の採算シミュレーション",
  description:
    "Mac miniを複数台そろえてClaude Codeを並列で動かし続ける——“AI社員チーム”の作り方を、機種・周辺機器の選び方から、何台で黒字化するかの採算シミュレーション、常時稼働のセキュリティまで実務目線で解説します。",
  genre: "Full-stack",
  tags: ["Mac mini", "Claude Code", "収益化"],
  date: "2026-06-26",
  readingTime: "10分",
  sections: [
    { richtext: AFFILIATE_DISCLOSURE_HTML },
    {
      body: [
        "こんにちは、LEXIAの齋藤です。",
        "「Mac miniを何台か並べて、その上でClaude Codeを動かしまくって稼ぐ」——2026年に入って一気に現実味を帯びてきたこの構成を、機材選びから採算計算まで一気通貫で設計します。",
        "1台＝1人のAI社員、複数台＝ひとつの“部署”。そう捉えると、何を何台そろえ、どう束ね、いくらで黒字化するかが見えてきます。",
      ],
    },
    {
      heading: "① なぜ今「複数台のMac mini」なのか",
      image: "/images/blog/mac-mini-cluster-rack.webp",
      imageAlt: "ラックに複数台のMac miniを積み上げて構成したクラスタ",
      body: [
        "きっかけは、ローカルで常時動くAIエージェント（OpenClaw＝旧ClawdBot）の爆発的ヒットでMac miniが品薄になるほどの社会現象になったことです。低消費電力・静音・省スペースで24時間つけっぱなしにできるMac miniは、AIエージェントの“常駐ホスト”として理想的でした。",
        "そこにClaude Codeの定額プラン（Max）を組み合わせると、API課金の青天井を気にせず、複数のエージェントを終日回し続けられます（料金の考え方は https://lexia-hp.com/blog/claude-code-pricing-cost-optimization を参照）。「クラウドに毎月払い続けるより、手元の箱で完結させたい」と感じている人も多いはず。その背景にある“ローカルファースト”の考え方は、別記事（ https://lexia-hp.com/blog/end-of-cloud-local-first-thinking ）が参考になります。",
      ],
    },
    {
      heading: "② まずは1台目——入門ノードの選び方",
      body: [
        "いきなり複数台をそろえる必要はありません。まずは1台で「Claude Codeを並列で回す」「軽いローカルLLMを動かす」感覚をつかむのがおすすめです。検証用の入門ノードなら、無印のMac mini M4で十分始められます。",
      ],
      richtext: amazonProductHtml({
        name: "Apple Mac mini（M4・16GB / 24GB）",
        context: "まず1台で試す入門ノード。Claude Codeの並列実行や軽量モデルの検証に。在庫は変動するため、最新の在庫・価格はリンク先でご確認ください（Apple Storeでも購入できます）。",
        url: "https://amzn.to/43XtC7M",
      }),
    },
    {
      heading: "③ 主力ノードのスペック設計（メモリは盛れるだけ盛る）",
      body: [
        "“部署の主力”として常用するなら、Mac mini M4 Proが本命です。理由は2つ。ユニファイドメモリの帯域が広く、ローカルLLMとClaude Codeの同時稼働に耐えること。そして高速なクラスタ接続（Thunderbolt 5）に対応することです。",
        "重要なのは、Macのメモリは後から増設できないという点。用途が伸びる前提なら、買う時点で“盛れるだけ盛る”のが鉄則です。",
      ],
      table: {
        headers: ["メモリ", "向き", "ひとことで"],
        rows: [
          ["24GB", "最低限", "Claude Code中心・軽いモデルなら"],
          ["32GB", "実用", "エージェント＋中規模モデルの常用"],
          ["48GB / 64GB", "本命", "複数エージェントの連続運用・大きめモデル"],
        ],
      },
    },
    {
      richtext: affiliateNoteHtml(
        "主力ノード：Apple Mac mini（M4 Pro・48GB / 64GB）",
        "クラスタの主力。Claude Codeの並列稼働＋ローカルLLM常用の本命です。メモリは後から増設できないため、買う時点で余裕を持った構成に。<strong>Amazonでは在庫が変動しやすいため、最新の在庫は「Mac mini M4 Pro」で検索、または Apple Store のビルド注文が確実です。</strong>",
      ),
    },
    {
      heading: "④ 複数台を束ねる——配線とネットワーク",
      image: "/images/blog/mac-mini-cluster-topology.webp",
      imageAlt: "Mac miniクラスタのトポロジーとノード間通信のイメージ",
      body: [
        "複数台に分担させると、体感速度を左右するのはノード間の通信です。Wi-Fiはボトルネックになりやすいので、有線で束ねるのが基本。台数を増やすほど、スイッチングハブと良質なLANケーブル、そして高速なノード直結が効いてきます。",
        "分散の仕組みづくりには、余り端末をAIクラスター化するOSS『exo』の解説（ https://lexia-hp.com/blog/what-is-exo-ai-cluster ）も参考になります。",
      ],
      richtext:
        amazonProductHtml({
          name: "2.5GbE / 10GbE スイッチングハブ",
          context: "複数ノードを束ねる有線バックボーン。台数が増えるほどノード間通信の速度が効く。",
          url: "https://amzn.to/4ex7xmr",
        }) +
        amazonProductHtml({
          name: "エレコム CAT6A LANケーブル",
          context: "2.5G / 10GbEを活かすための配線。スイッチとセットで本数をそろえる。",
          url: "https://amzn.to/4g27ZdD",
        }) +
        amazonProductHtml({
          name: "Thunderbolt 5 ケーブル",
          context: "M4 Pro同士の高速直結に。低遅延でノード間をつなぐ要（対応機種を要確認）。",
          url: "https://amzn.to/44vbJ03",
        }) +
        amazonProductHtml({
          name: "Anker USB-C KVMスイッチ",
          context: "複数台を1組のキーボード・マウス・モニタで切り替え。初期セットアップが一気に楽になる。",
          url: "https://amzn.to/4vx3ZGL",
        }),
    },
    {
      heading: "⑤ 24時間運用の現実——電源・熱・ストレージ",
      body: [
        "常時稼働＋複数台になると、地味な「運用の足回り」が効いてきます。突然の停電でセッションやデータを失わないUPS、積み重ねて省スペース化するスタンド、内蔵SSDが割高なMac miniを助ける外付けSSD——このあたりは台数ぶん必要になりがちです。",
      ],
      richtext:
        amazonProductHtml({
          name: "CyberPower ST425JP UPS（425VA / 260W）",
          context: "24時間ヘッドレス運用の前提。停電時のデータ保護と安全なシャットダウンに。",
          url: "https://amzn.to/4ey3CWI",
        }) +
        amazonProductHtml({
          name: "Crucial X10 外付けSSD 2TB（USB-C）",
          context: "モデルの重みやデータの置き場に。割高な内蔵SSDを増やさず外付けで逃がす。",
          url: "https://amzn.to/4g8GM99",
        }) +
        amazonProductHtml({
          name: "UGREEN Mac mini M4 / M4 Pro 専用 USB-Cハブ＆スタンド（10-in-1）",
          context: "ハブ＋スタンド一体型。ポート拡張・M.2 NVMeエンクロージャ内蔵で、Mac miniの足回りをまとめて整える。",
          url: "https://amzn.to/4uWCjdg",
        }),
    },
    {
      heading: "⑥ 採算シミュレーション——何台で黒字化する？",
      image: "/images/blog/mac-mini-monetization-path.webp",
      imageAlt: "MVPからPMF、そして収益化・スケールへ至る成長と採算のイメージ",
      body: [
        "ここが本題です。下表は「1台あたりの初期投資」「月額の定額プラン」「電気代」をざっくり置いた“モデルケース”です（金額はすべて仮の前提。構成・為替・電気料金で変わります）。",
        "ポイントは、Mac miniのアイドル消費電力は数Wと小さく、電気代は1台あたり月100〜200円程度に収まること。つまり毎月の主なコストは電気代ではなく、定額プラン（Max）の月額です。",
      ],
      table: {
        headers: ["項目", "1台あたりの目安（仮）", "メモ"],
        rows: [
          ["初期投資（本体＋周辺機器）", "20〜35万円", "M4 / M4 Proの構成による"],
          ["定額プラン（Claude Max）", "月 約$100〜$200", "並列で回すなら20xが現実的"],
          ["電気代", "月 約100〜200円", "アイドル数Wと省電力"],
          ["回収の考え方", "成果物の粗利 ÷ 月額", "月額を上回る付加価値を出せれば黒字"],
        ],
      },
    },
    {
      richtext: affiliateAlertHtml(
        "重要：これは「儲け」を保証するものではありません",
        "上表はあくまで前提を置いたシミュレーションで、収益額を約束するものではありません。実際の成果は、案件の有無・スキル・運用次第で大きく変わります。<strong>「Mac miniを買えば必ず稼げる」わけではない</strong>点を理解したうえで、小さく1台から検証することを強くおすすめします。",
      ),
    },
    {
      heading: "⑦ 常時稼働の落とし穴——セキュリティ",
      body: [
        "終日つけっぱなしのエージェントは、攻撃面も“常時”開きっぱなしになります。実際、ローカルAIエージェントには深刻な脆弱性（WebSocketの乗っ取り等）が報告された例もあります。複数台に権限を委譲して自動実行させるほど、事故の影響範囲は広がります。",
      ],
      list: [
        "LAN内へのサービス公開は最小限にし、不要なポートは閉じる",
        "エージェントに渡す権限・APIキー・秘密情報は必要最小限に絞る",
        "プロンプトインジェクション対策として、外部入力をそのまま実行させない",
        "自動実行は段階的に。まずは人のレビューを挟む運用から始める",
      ],
    },
    {
      heading: "⑧ まとめ：1台から始めて“部署”に育てる",
      body: [
        "いきなり大量導入はおすすめしません。(1) M4 1台でClaude Codeの並列と運用感をつかむ→(2) 手応えがあればM4 Pro（メモリ大）を主力に追加→(3) 配線・UPS・スタンドで“部署”として束ねる、の順で育てるのが安全で確実です。",
        "機材は、用途に合った最小限から。あれもこれも最初に揃えるより、まず1台で運用感をつかみ、本当に必要になったものだけを足していくほうが、結果的にお金も手間も無駄になりません。",
      ],
    },
    {
      richtext:
        affiliateNoteHtml(
          "さらに学ぶ（書籍）",
          "AIエージェント開発やローカルLLMの基礎を体系的に押さえたい方へ。実務に近い解説書を1冊持っておくと、クラスタ運用の判断が速くなります。",
        ) +
        amazonProductHtml({
          name: "AIエージェント 設計＆実装 完全ガイド",
          context: "ローコード開発やユースケースを徹底解説。エージェント設計の基礎固めに。",
          url: "https://amzn.to/4f5zDp2",
        }),
    },
    {
      heading: "関連記事",
      list: [
        "Claude Codeの料金は結局いくら？Pro・Max・API課金とコスト最適化",
        "https://lexia-hp.com/blog/claude-code-pricing-cost-optimization",
        "exoとは？余ってる端末が“ひとつのAIクラスター”になるOSSを解説",
        "https://lexia-hp.com/blog/what-is-exo-ai-cluster",
        "Claude Code入門：ターミナルで動く“エージェント型”コーディングアシスタント",
        "https://lexia-hp.com/blog/claude-code-overview-2025-10-14",
      ],
    },
  ],
})
