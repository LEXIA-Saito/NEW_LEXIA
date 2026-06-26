import type { BlogPost } from "./blog-posts.types"

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
      image: "/images/blog/turso-cloud-beta-production-comparison.png",
      imageAlt: "本番で使える？成熟度と注意点（TursoとTurso Cloudの機能・成熟度比較）",
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
      heading: "使ってみる：インストールと最小例",
      body: [
        "前提：Python 3.10+ / FFmpeg / Node.js 18+ / AIコーディングアシスタント（Claude Code・Cursor・Copilot・Windsurf・Codex）。",
        "",
        "git clone https://github.com/calesthio/OpenMontage.git",
        "cd OpenMontage",
        "make setup",
        "",
        "あとはAIアシスタントでプロジェクトを開き、自然言語で指示するだけです。例：「なぜ空は青いのかを45秒のアニメ解説動画にして」。",
        "エージェントはリサーチ→脚本→画像/素材→ナレーション（Piper TTS・無料）→BGM→字幕→Remotionでレンダリング→自己レビューまで実行し、projects/<名前>/renders/final.mp4 を出力します。",
        "",
        "Piper・Remotion・FFmpeg・無料アーカイブ素材だけでAPIキーなしでも完結します。有料APIを足すと選択肢が広がり、READMEの実例では60秒アニメ約1.33ドル、製品広告約0.69ドル、12枚構成のジブリ風動画約0.15ドルといった低コストが示されています。",
      ],
    },
    {
      heading: "ライセンスと注意点",
      body: [
        "ライセンスはGNU AGPLv3（コピーレフト）。商用・プロプライエタリ利用には別途ライセンスが必要な点に注意が必要です。",
        "またWeb UIやAPIサーバーは付属せず“エージェント前提”で動きます。ローカルGPUの動画生成は相応のVRAMが必要で、多くのワークフローはクラウドAPIが現実的です。ドキュメントやスキルは英語中心です。",
        "ローカルLLM（Ollama・LM Studio）対応は今後予定されています。",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "OpenMontageは、単発クリップ生成と本格的な映像制作の間を埋める“エージェント駆動の動画パイプライン”です。リサーチから合成までを構造化された工程として自動化し、品質ゲートと予算管理で破綻を防ぎます。",
        "無料ローカルツールで始められ、必要に応じて有料APIへ拡張できる柔軟さは、Claude Codeを日常的に使う開発者にとって特に試す価値があります。",
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
        "このほかCLI連携やLovable・Zapier・n8nなどのプラットフォーム連携も用意されています。Claude Codeを使う開発フローとも噛み合います。",
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
