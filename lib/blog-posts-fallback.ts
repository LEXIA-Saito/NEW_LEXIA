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
    latest_update: "2025-10-06",
    heroImage:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-hero-cursor-for-designers.avif",
    heroImageAlt: "Onlook のメインビジュアル（デザイン編集 UI）",
    sections: [
      {
        body: [
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
          "LEXIA技術スタックとの関連（補足参照用）",
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
  latest_update: "2025-10-14",
  heroImage:
    "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-getting-started-tutorial-hero.webp",
  heroImageAlt: "Firebase Studio始め方チュートリアル - ワークスペース作成からデプロイまでの完全ガイド",
  sections: [
    {
      body: [
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
      body: ["GitHub／GitLab／Bitbucketから既存プロジェクトを取り込むことも可能です。", "", "手順:"],
      list: [
        "1. メニューから Import from GitHub を選択",
        "2. リポジトリを選択 → Import",
        "3. Studioが自動的に package.json や依存関係を解析し、環境を構築",
      ],
      body: [
        "特殊なネイティブ依存やビルド設定がある場合、dev.nix を編集して環境をカスタマイズ可能です。",
        "参考: Import existing project — https://firebase.google.com/docs/studio/get-started-import",
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
  readingTime: "5分",
  sections: [
    {
      body: [
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
  latest_update: "2026-06-23",
  heroImage: "/images/blog/what-is-turso-sqlite-in-rust-hero.jpg",
  heroImageAlt: "Tursoとは？SQLiteをRustで書き直す次世代の組み込みDBの全貌",
  sections: [
    {
      body: [
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
        "「組み込みDB × AIエージェント」という組み合わせは、ローカルで完結するRAGや開発支援ツールとの相性がよく、LEXIAが扱うAI開発のテーマとも地続きです。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "本番で使える？成熟度と注意点",
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
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "OpenMontage - AIエージェントが制作チームになる動画生成システムの解説",
  sections: [
    {
      body: [
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
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Penpot - Web標準でデザインとコードをつなぐオープンソースのデザインプラットフォーム解説",
  sections: [
    {
      body: [
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
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Firecrawl - WebをLLM向けデータに変換するAI時代のスクレイピングAPIの解説",
  sections: [
    {
      body: [
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

// Append codebase-memory-mcp (code intelligence MCP server) overview article
fallbackBlogPosts.push({
  slug: "what-is-codebase-memory-mcp",
  title: "codebase-memory-mcpとは？AIにコードを“読ませない”知識グラフ型コード解析MCPサーバー",
  description:
    "codebase-memory-mcpは、コードベースを永続的な知識グラフにインデックスする高速・省トークンなコード解析エンジン。ファイル総当たり比で最大120倍少ないトークン、158言語対応のtree-sitter解析、14のMCPツール、Claude Codeなど11エージェントへの自動連携、ローカル完結の安全性までを公式情報に基づいて解説します。",
  genre: "Backend",
  tags: ["MCP", "コード解析", "AIエージェント"],
  date: "2026-06-23",
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "codebase-memory-mcp - コードベースを知識グラフ化する高速・省トークンなコード解析MCPサーバーの解説",
  sections: [
    {
      body: [
        "本記事は一次情報（codebase-memory-mcp公式リポジトリおよびREADME）に基づき構成しています。本プロジェクトは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "codebase-memory-mcpとは何か／どんな課題を解くか",
        "なぜ速くて省トークンなのか（C製バイナリ × tree-sitter × 知識グラフ）",
        "コードを“グラフ”として持つという発想",
        "14のMCPツールでAIエージェントに何ができるか",
        "対応言語とセマンティック解析の範囲",
        "導入手順とエージェント連携（Claude Codeほか）",
        "セキュリティ・ライセンス・成熟度",
      ],
    },
    {
      heading: "codebase-memory-mcpとは？ファイルを“読ませない”という発想",
      body: [
        "codebase-memory-mcpは、自らを「AIコーディングエージェントのための、最速かつ最も効率的なコード知能エンジン」と位置づけるMCP（Model Context Protocol）サーバーです。コードベースを丸ごと解析し、関数やクラス、呼び出し関係を持つ“永続的な知識グラフ”に変換します。",
        "解こうとしている課題はシンプルです。AIエージェントが既存コードを理解しようとすると、ファイルを一つひとつ読み込む必要があり、膨大なトークンと何度ものツール呼び出しを消費します。大規模リポジトリでは、これがコスト・速度・コンテキスト窓を一気に圧迫します。",
        "codebase-memory-mcpは、この“ファイル総当たり”をグラフへの構造的な問い合わせに置き換えます。公式の計測では、5つの構造クエリで約3,400トークン（ファイル総当たりの約412,000トークン比）と、最大120倍・約99.2%のトークン削減を示しています。",
      ],
    },
    {
      heading: "なぜ速くて省トークンなのか",
      body: [
        "速さと軽さの源泉は、徹底して“低レベル”に作られている点にあります。本体は依存ゼロの単一静的バイナリ（Pure C）で、tree-sitterの文法をバイナリに同梱し、解析結果をSQLiteベースの知識グラフへ保存します。",
        "インデックス性能も具体的です。Linuxカーネル（2,800万行・7.5万ファイル）をフル解析しても約3分、高速インデックスなら約1分12秒、Django規模なら数秒で完了すると公表されています。一度作ったグラフは永続化され、差分だけを更新できます。",
      ],
      table: {
        headers: ["項目", "内容"],
        rows: [
          ["トークン削減", "5つの構造クエリで約3,400トークン（ファイル総当たり比 約412,000トークン）。最大120倍・約99.2%削減"],
          ["インデックス速度", "Linuxカーネル（2,800万行・7.5万ファイル）をフル解析約3分／高速インデックス約1分12秒"],
          ["実装", "依存ゼロの単一静的バイナリ（Pure C）。tree-sitter文法を同梱"],
          ["保存", "SQLite＋LZ4圧縮のローカル知識グラフ（増分更新対応）"],
          ["可視化", "localhost:9749 で3Dグラフを表示"],
        ],
      },
    },
    {
      heading: "コードを“グラフ”として持つ",
      body: [
        "codebase-memory-mcpの中核は、コードを「ノード」と「エッジ」の知識グラフとして表現することです。プロジェクト・フォルダ・ファイル・クラス・関数・メソッド・ルートなどがノードになり、CALLS（呼び出し）・IMPORTS（インポート）・DEFINES（定義）・IMPLEMENTS（実装）といった関係がエッジになります。",
        "この構造のおかげで、「この関数を呼んでいるのは誰か」「この変更はどこに波及するか」といった問いに、ファイルを開かずに答えられます。問い合わせには読み取り専用のopenCypherサブセット（MATCH / WHERE / RETURN）が使え、グラフDBのように直接クエリすることも可能です。",
        "DockerfileやKubernetesマニフェストといったInfrastructure as Codeもインデックス対象で、生成した圧縮グラフはチームで共有できます。コードの“地図”をAIと人の双方が共有できるイメージです。",
      ],
    },
    {
      heading: "14のMCPツールでできること",
      body: [
        "codebase-memory-mcpは14のMCPツールを公開しており、AIエージェントは自然言語の指示をこれらのツール呼び出しへと変換します。代表的なものを役割別に整理すると次の通りです。",
      ],
      table: {
        headers: ["ツール", "役割"],
        rows: [
          ["index_repository / index_status", "リポジトリを解析してグラフ化・進捗を確認"],
          ["search_graph / search_code", "関数・クラスなどをパターン検索／コードを検索"],
          ["trace_path", "呼び出し経路を上流・下流にたどり、影響範囲を把握"],
          ["get_architecture", "依存関係やクラスタからアーキテクチャを俯瞰"],
          ["query_graph / get_graph_schema", "openCypherサブセットでグラフを直接問い合わせ"],
          ["get_code_snippet", "該当ノードの実コードを取得"],
          ["detect_changes", "変更を検知して必要箇所だけ再解析"],
          ["manage_adr / ingest_traces", "設計判断記録（ADR）の管理・実行トレースの取り込み"],
        ],
      },
    },
    {
      heading: "対応言語とセマンティック解析",
      body: [
        "tree-sitter文法を同梱することで、158言語の構文解析に対応します。さらに一部の主要言語では、単なる構文木にとどまらず、型を解決する“ハイブリッドLSP”によるセマンティック解析を備えています。",
        "セマンティック解析の対象は、Python・TypeScript / JavaScript / JSX / TSX・PHP・C#・Go・C・C++・Java・Kotlin・Rustなどです。型情報まで踏み込むことで、同名関数の取り違えなどを避け、より正確な呼び出しグラフを構築できます。",
      ],
    },
    {
      heading: "導入とエージェント連携",
      body: [
        "導入はワンライナーのインストーラーで完了します（macOS / Linux）。",
        "curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash",
        "",
        "3Dグラフの可視化UIも使いたい場合は --ui を付けます。Windowsは同梱のPowerShellスクリプトに対応します。",
        "curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash -s -- --ui",
        "",
        "インストーラーは導入済みのAIツールを自動検出し、設定まで行います。対応するのはClaude Code・Codex CLI・Gemini CLI・Zed・OpenCode・Antigravity・Aider・KiloCode・VS Code・OpenClaw・Kiroなど。手動で登録する場合のMCP設定はシンプルです。",
        "",
        '{ "mcpServers": { "codebase-memory-mcp": { "command": "/path/to/codebase-memory-mcp", "args": [] } } }',
        "",
        "CLIから直接呼ぶこともでき、まずはリポジトリをインデックスしてから検索・追跡を試せます。",
        "codebase-memory-mcp cli index_repository '{\"repo_path\": \"/path/to/repo\"}'",
        "codebase-memory-mcp cli trace_path '{\"function_name\": \"ProcessOrder\", \"direction\": \"inbound\"}'",
      ],
    },
    {
      heading: "セキュリティと信頼性（ローカル完結）",
      body: [
        "コード解析はすべてローカルで完結し、ソースコードがマシンの外に出ることはありません。機密性の高いコードベースを扱う現場でも導入のハードルが低い設計です。",
        "配布物の信頼性にも力が入っており、SLSA Level 3のビルドプロベナンス、Sigstore cosignによるキーレス署名、SHA-256チェックサム、そして70以上のアンチウイルスエンジンによるVirusTotalスキャンが用意されています。ライセンスはMITで、商用採用のハードルも低めです。",
        "なお、設計と評価をまとめた研究もREADMEから参照されています（arXiv:2603.27277）。バージョンは2026年6月時点でv0.8.1です。",
      ],
    },
    {
      heading: "LEXIA視点：MCPで広がる“AIネイティブ開発”",
      body: [
        "codebase-memory-mcpが面白いのは、「AIにコードを読ませる」のではなく「AIが問い合わせられるコードの地図を用意する」という発想の転換にあります。トークン効率はもちろん、回答の再現性や影響範囲の把握といった“実務の質”に効いてきます。",
        "Turso（組み込みDB）やFirecrawl（Webデータ取得）と同様に、MCPを介してAIエージェントと外部能力をつなぐという潮流の一部でもあります。Claude Codeのようなエージェントを日常的に使う開発フローと、特に相性が良いツールです。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "codebase-memory-mcpは、コードベースを永続的な知識グラフへインデックスし、AIエージェントに“ファイルを読ませず”構造的な問い合わせで答えさせるコード知能MCPサーバーです。最大120倍のトークン削減と高速インデックス、158言語対応、ローカル完結の安全性を兼ね備えています。",
        "依存ゼロのC製バイナリで導入も容易、主要エージェントへ自動連携でき、MITライセンスで商用利用もしやすい。大規模リポジトリをAIと扱う際のコストとコンテキスト不足に悩んでいるなら、評価する価値のある一本です。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: DeusData/codebase-memory-mcp",
        "https://github.com/DeusData/codebase-memory-mcp",
        "インストールスクリプト",
        "https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh",
        "Model Context Protocol（MCP）",
        "https://modelcontextprotocol.io/",
      ],
    },
  ],
})

// Append Voicebox (local-first AI voice studio) overview article
fallbackBlogPosts.push({
  slug: "what-is-voicebox-local-ai-voice",
  title: "Voiceboxとは？ElevenLabs代替をローカルで動かすオープンソースのAI音声スタジオ",
  description:
    "Voiceboxは、音声合成（TTS）・文字起こし（STT）・音声クローンを1つにまとめ、すべてローカルで完結させるオープンソースのAI音声スタジオ。7つのTTSエンジン、23言語、OpenAI Whisperによる音声入力、Claude CodeなどへのMCP連携、Tauri製デスクトップアプリまでを公式情報に基づいて解説します。",
  genre: "AI",
  tags: ["Voicebox", "AI音声", "MCP"],
  date: "2026-06-23",
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Voicebox - 音声合成・文字起こし・音声クローンをローカルで完結させるオープンソースAI音声スタジオの解説",
  sections: [
    {
      body: [
        "本記事は一次情報（Voicebox公式リポジトリおよびREADME）に基づき構成しています。Voiceboxは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "Voiceboxとは何か／どんな課題を解くか",
        "ローカル完結であることの意味（プライバシー）",
        "7つのTTSエンジンと表現力（多言語・音声クローン）",
        "音声入力（OpenAI Whisper）と編集機能",
        "MCPでAIエージェントに“声”を与える",
        "技術スタックと対応プラットフォーム",
        "ライセンスと位置づけ",
      ],
    },
    {
      heading: "Voiceboxとは？クラウドに送らないAI音声",
      body: [
        "Voiceboxは「オープンソースのAI音声スタジオ」を掲げるアプリで、公式は“ElevenLabsとWisprFlowの代替を1つのアプリに”と表現しています。音声合成（TTS）・文字起こし（STT）・音声クローンを一体化し、すべてを手元のマシンで動かせるのが最大の特徴です。",
        "公式は「モデル・音声データ・録音が、マシンの外に出ることはない」と明言しています。クラウドの文字起こし／音声生成に頼らず、プライバシーを保ったまま“声”を扱えるのが、従来のクラウドサービスとの決定的な違いです。",
        "開発者はSpacedriveで知られるJamie Pine氏で、ライセンスはMIT。デスクトップアプリとして配布されています。",
      ],
    },
    {
      heading: "7つのTTSエンジンと表現力",
      body: [
        "Voiceboxは用途に応じて7つのTTSエンジンを切り替えられます。Qwen3-TTS、Qwen CustomVoice、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo、HumeAI TADA、Kokoroです。",
        "23言語に対応し、KokoroやQwen CustomVoiceによる50以上のプリセット音声に加え、音声サンプルからのクローンも可能。さらに [laugh] [chuckle] [gasp] [sigh] [clear throat] のようなパラ言語タグで、笑いやため息といった表現を差し込めます。長文は自動チャンク分割とクロスフェードで、長さ無制限に生成できます。",
      ],
    },
    {
      heading: "音声入力（Whisper）と編集機能",
      body: [
        "入力側はOpenAI Whisperを採用し、Base / Small / Medium / Largeに加え、Whisper Largeより約8倍高速で品質低下を抑えたTurboを選べます。グローバルなディクテーション用ホットキー（押している間だけ／トグル）や、macOSではフォーカス中のテキスト欄への自動ペーストにも対応します。",
        "生成後の音声には、ピッチ変更・リバーブ・ディレイ・コーラス・コンプレッションといった後処理（Spotify製のPedalboardを利用）をかけられます。複数の声をタイムラインに並べる「ストーリーエディタ」や、ローカルLLMでセリフを書き換える“声の個性”機能も備えています。",
      ],
    },
    {
      heading: "MCPでAIエージェントに“声”を与える",
      body: [
        "VoiceboxはMCP（Model Context Protocol）サーバーを内蔵し、Claude CodeやCursorなどのエージェントに音声出力・文字起こしの能力を渡せます。公開ツールは voicebox.speak / voicebox.transcribe / voicebox.list_captures / voicebox.list_profiles の4つです。",
        "Claude Codeへの登録はコマンド1行で完了します。",
        "claude mcp add voicebox --transport http --url http://127.0.0.1:17493/mcp --header \"X-Voicebox-Client-Id: claude-code\"",
        "",
        "ローカルサーバーはポート17493で動作し、POST /generate（音声生成）・POST /speak（エージェント発話）・POST /transcribe（文字起こし）・GET /profiles（音声一覧）などのAPIも提供します。",
      ],
    },
    {
      heading: "技術スタックと対応プラットフォーム",
      body: [
        "デスクトップ層はTauri（Rust）で軽量に作られ、推論はApple SiliconならMLX、その他はPyTorch（CUDA・ROCmなど）に対応します。",
      ],
      table: {
        headers: ["領域", "技術"],
        rows: [
          ["デスクトップ", "Tauri（Rust）"],
          ["フロントエンド", "React / TypeScript / Tailwind CSS"],
          ["バックエンド", "FastAPI（Python）"],
          ["推論", "MLX（Apple Silicon）/ PyTorch（CUDA・ROCm ほか）"],
          ["保存", "SQLite"],
          ["対応OS", "macOS（Apple Silicon・Intel）/ Windows / Linux / Docker"],
        ],
      },
    },
    {
      heading: "LEXIA視点：ローカルAIという選択",
      body: [
        "Voiceboxの面白さは、生成AIの体験を“クラウド前提”から“ローカル完結”へと引き戻した点にあります。データを外に出さずに高品質な音声を扱えることは、機密性が問われる制作現場や個人開発にとって大きな安心材料です。",
        "MCPを介してエージェントに音声を与える設計は、Claude Codeを軸にしたワークフローとも自然につながります。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "Voiceboxは、TTS・STT・音声クローンを1つにまとめ、すべてローカルで完結させるオープンソースのAI音声スタジオです。7つのTTSエンジンと23言語、Whisperベースの音声入力、後処理やストーリーエディタ、そしてMCP連携まで揃っています。",
        "クラウドにデータを預けたくない、けれど高品質なAI音声を使いたい——そんなニーズに正面から応える一本で、MITライセンスで気軽に試せます。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: jamiepine/voicebox",
        "https://github.com/jamiepine/voicebox",
        "公式サイト",
        "https://voicebox.sh/",
        "Model Context Protocol（MCP）",
        "https://modelcontextprotocol.io/",
      ],
    },
  ],
})

// Append Cybersecurity Skills (agent skills for security) overview article
fallbackBlogPosts.push({
  slug: "what-is-anthropic-cybersecurity-skills",
  title: "AIエージェント向けに817のサイバーセキュリティ知識を構造化したOSS「Cybersecurity Skills」とは？",
  description:
    "「Anthropic-Cybersecurity-Skills」は、817のサイバーセキュリティ知識をAIエージェント用に構造化したオープンソースのスキル集。29ドメイン・6つのフレームワーク（MITRE ATT&CK／NIST CSFほか）にマッピングし、Claude Codeなどから必要なスキルだけを段階的に読み込めます。Agent Skills標準・構造・使い方・注意点を公式情報に基づいて解説します。",
  genre: "Security",
  tags: ["セキュリティ", "Agent Skills", "Claude Code"],
  date: "2026-06-23",
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Cybersecurity Skills - AIエージェント向けに817のサイバーセキュリティ知識を構造化したオープンソースのスキル集の解説",
  sections: [
    {
      body: [
        "本記事は一次情報（公式リポジトリおよびREADME）に基づき構成しています。なお本プロジェクトはリポジトリ名に「Anthropic」を含みますが、Anthropic公式の製品ではなく、開発者mukul975氏によるコミュニティ主導のオープンソース（Apache-2.0）です。Anthropicが提唱する「Agent Skills」の形式に準拠している点に由来します。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "このスキル集とは何か／何が新しいのか",
        "「Agent Skills」という考え方",
        "6つのセキュリティフレームワークへのマッピング",
        "スキルの構造と段階的読み込み（省トークン）",
        "対応するAIエージェント／導入方法",
        "扱う上での注意（デュアルユース・認可）",
      ],
    },
    {
      heading: "何を解決するのか：知識を“エージェントが使える形”に",
      body: [
        "このプロジェクトは、自らを「817のプロダクション級サイバーセキュリティスキル・29のセキュリティドメイン・6つのフレームワークマッピング・26以上のAIプラットフォーム対応」と説明します。",
        "ねらいは、断片的なドキュメントやチュートリアルではなく、AIエージェントがそのまま実行できる“作業手順つきの知識ベース”を用意することです。クラウドセキュリティ（66）、脅威ハンティング（58）、脅威インテリジェンス（52）、ネットワークセキュリティ（43）、Webアプリセキュリティ（42）、デジタルフォレンジック（41）など、29ドメインに体系立てて整理されています。",
      ],
    },
    {
      heading: "「Agent Skills」という考え方",
      body: [
        "Agent Skillsは、AIエージェントに専門知識を“スキル”という単位で渡す仕組みです。各スキルはMarkdownで書かれ、エージェントは必要なときに必要なスキルだけを読み込みます。",
        "この設計の肝は省トークン性にあります。各スキルは冒頭のメタ情報（フロントマター）だけなら約30トークンで走査でき、実際に使う段になって500〜2,000トークンで全文を読み込みます。膨大な知識を抱えていても、コンテキスト窓を浪費しません。",
      ],
    },
    {
      heading: "6つのフレームワークへのマッピング",
      body: [
        "各スキルは主要なセキュリティフレームワークに対応づけられており、ATT&CKのテクニック番号などから逆引きできます。",
      ],
      table: {
        headers: ["フレームワーク", "バージョン", "カバー範囲"],
        rows: [
          ["MITRE ATT&CK", "v19.1", "15戦術・286テクニック"],
          ["NIST CSF", "2.0", "6機能・22カテゴリ"],
          ["MITRE ATLAS", "v5.4", "16戦術・84テクニック（AI/MLの敵対的脅威）"],
          ["MITRE D3FEND", "v1.3", "7カテゴリ・267の防御テクニック"],
          ["NIST AI RMF", "1.0", "4機能・72サブカテゴリ"],
          ["MITRE F3（不正対策）", "v1.1", "8戦術・123テクニック"],
        ],
      },
    },
    {
      heading: "スキルの構造と対応エージェント",
      body: [
        "各スキルはYAMLフロントマター（名前・説明・ドメイン・タグ・フレームワークID）と、「When to Use（いつ使うか）」「Prerequisites（前提）」「Workflow（手順）」「Verification（検証）」というMarkdownのセクション、さらに references / scripts / assets のディレクトリで構成されます。",
        "対応はClaude Code・GitHub Copilot・Cursor・Windsurf・Cline・Aider・Continue・Amazon Q・JetBrains AIなど広範で、agentskills.io標準に準拠したプラットフォームで利用できます。導入はパッケージコマンド、またはリポジトリのクローンで行います。",
        "npx skills add mukul975/Anthropic-Cybersecurity-Skills",
      ],
    },
    {
      heading: "扱う上での注意：デュアルユースと認可",
      body: [
        "本スキル集にはレッドチーム演習・ペネトレーションテスト・マルウェア解析など、攻撃と防御の両面（デュアルユース）の知識が含まれます。これらは本来、自社資産や明示的に許可された対象に対する正当なセキュリティ業務・学習のためのものです。",
        "実務で用いる際は、対象範囲の合意（スコープ）や法令・社内規程の遵守を前提とし、防御・ガバナンス・インシデント対応といった文脈で活用するのが基本です。AIエージェントの提案は必ずレビューし、無許可の対象には使用しないでください。",
      ],
    },
    {
      heading: "LEXIA視点：スキルで広がるエージェント運用",
      body: [
        "このプロジェクトは、「AIエージェント × 専門知識」をスキル単位でモジュール化する流れの好例です。省トークンな段階的読み込みは、codebase-memory-mcpのような“エージェントの土台”を整える発想とも通じます。",
        "Claude Codeを業務に組み込む際、こうした構造化スキルをどう選び・どう統制するかは、これからの開発・運用テーマになりそうです。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "「Cybersecurity Skills」は、817のサイバーセキュリティ知識をAIエージェントが実行できる形に構造化し、6つのフレームワークへマッピングしたオープンソースのスキル集です。省トークンな段階的読み込みと広範なエージェント対応により、知識ベースとして実用的にまとまっています。",
        "Anthropic公式ではないコミュニティ製である点と、デュアルユースゆえの認可・統制の必要性を理解したうえで、防御や学習の土台として活用する価値があります。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: mukul975/Anthropic-Cybersecurity-Skills",
        "https://github.com/mukul975/Anthropic-Cybersecurity-Skills",
        "Agent Skills（agentskills.io）",
        "https://agentskills.io/",
        "MITRE ATT&CK",
        "https://attack.mitre.org/",
      ],
    },
  ],
})

// Append AI Website Cloner Template (frontend) overview article
fallbackBlogPosts.push({
  slug: "what-is-ai-website-cloner-template",
  title: "ai-website-cloner-templateとは？AIエージェントで既存サイトをNext.jsに“複製”するテンプレート",
  description:
    "ai-website-cloner-templateは、任意のWebサイトをAIコーディングエージェントでクリーンなNext.jsコードに作り直すための再利用可能テンプレート。/clone-websiteコマンド一発で、偵察→基盤→コンポーネント設計→並列ビルド→組み立てと進みます。仕組み・対応エージェント・技術スタック・責任ある使い方を公式情報に基づいて解説します。",
  genre: "Frontend",
  tags: ["Next.js", "AIエージェント", "Claude Code"],
  date: "2026-06-23",
  latest_update: "2026-06-23",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "ai-website-cloner-template - AIエージェントで既存サイトをNext.jsコードに複製するテンプレートの解説",
  sections: [
    {
      body: [
        "本記事は一次情報（公式リポジトリおよびREADME）に基づき構成しています。本プロジェクトは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "このテンプレートとは何か／どんな用途か",
        "/clone-website の使い方（最小コマンド）",
        "5段階の複製パイプラインの仕組み",
        "git worktreeによる並列ビルド",
        "対応するAIコーディングエージェント",
        "技術スタックと責任ある使い方",
      ],
    },
    {
      heading: "ai-website-cloner-templateとは？",
      body: [
        "ai-website-cloner-templateは、公式の言葉を借りれば「任意のWebサイトを、クリーンでモダンなNext.jsコードベースへとリバースエンジニアリングするための、再利用可能なテンプレート」です。URLを指定してコマンドを実行すると、AIエージェントがサイトを調べ、デザインを抽出し、各セクションをコンポーネントとして組み直します。",
        "想定する用途は3つ。WordPress / Webflow / SquarespaceなどからNext.jsへの移行、ソースコードを失った稼働中サイトの復旧、そして本番サイトのレイアウト・アニメーション・レスポンシブ設計を学ぶための分解です。",
      ],
    },
    {
      heading: "使い方：/clone-website 一発",
      body: [
        "セットアップは最小限です。依存をインストールし、ブラウザ連携付きでエージェントを起動して、複製コマンドを叩くだけです。",
        "npm install",
        "claude --chrome",
        "/clone-website <target-url1> [<target-url2> ...]",
        "",
        "あとはエージェントが対象サイトを解析し、コンポーネントを生成して組み立てていきます。元サイトとのビジュアル差分比較や、フォント・色の反映、アセットのダウンロードも自動で行われます。",
      ],
    },
    {
      heading: "5段階の複製パイプライン",
      body: [
        "/clone-websiteは、実際の制作に近い5つの工程として実行されます。",
      ],
      list: [
        "1. Reconnaissance（偵察）：スクリーンショット・デザイントークン・インタラクションを収集",
        "2. Foundation（基盤）：スタイルやテーマなど土台を構築",
        "3. Component Specs（設計）：各セクションをコンポーネント仕様に落とし込む",
        "4. Parallel Build（並列ビルド）：セクション/コンポーネント単位でビルダーを並走",
        "5. Assembly & QA（組み立て・品質チェック）：統合し、差分検証で仕上げる",
      ],
    },
    {
      heading: "git worktreeによる並列ビルドと対応エージェント",
      body: [
        "速さの工夫が並列ビルドです。公式は「セクション/コンポーネントごとに1つ、git worktree内でビルダーエージェントを起動する」と説明しており、複数の部品を同時並行で作り進められます。",
        "対応エージェントは13種。Claude Code（Opus 4.7推奨）・Codex CLI・OpenCode・GitHub Copilot・Cursor・Windsurf・Gemini CLI・Cline・Roo Code・Continue・Amazon Q・Augment Code・Aiderです。",
      ],
    },
    {
      heading: "技術スタックと責任ある使い方",
      body: [
        "生成されるコードはモダンな構成です。Next.js 16（App Router・React 19・TypeScript strict）、shadcn/ui（Radix + Tailwind CSS v4）、Tailwind CSS v4、Lucide Reactを用います。ライセンスはMITです。",
        "一方で、サイトの“複製”は権利・規約への配慮が欠かせません。対象は自社サイトや明示的に許可されたサイトに限り、著作権や各サービスの利用規約を尊重して使うのが前提です。移行・復旧・学習という本来の用途の範囲で活用しましょう。",
      ],
    },
    {
      heading: "LEXIA視点：デザインとコードの距離を縮める",
      body: [
        "このテンプレートは、「見えているUI」から「保守可能なコード」へ橋渡しする、エージェント時代の制作支援ツールです。手作業の再現に比べ、初期の足場づくりを大幅に短縮できます。",
        "ビジュアルとコードを行き来するという発想は、デザイン編集が即コードに反映されるツールとも地続きです。",
        "",
        "{{RELATED_ARTICLE:what-is-onlook}}",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "ai-website-cloner-templateは、AIコーディングエージェントで既存サイトをクリーンなNext.jsコードへ作り直す、再利用可能なテンプレートです。/clone-website一発で偵察から組み立てまでを5段階で進め、git worktreeによる並列ビルドで効率化します。",
        "移行・復旧・学習に強力な一方、複製には権利と規約への配慮が不可欠です。責任ある範囲で使えば、フロントエンド制作の初速を大きく引き上げてくれます。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: JCodesMore/ai-website-cloner-template",
        "https://github.com/JCodesMore/ai-website-cloner-template",
        "Next.js",
        "https://nextjs.org/",
        "shadcn/ui",
        "https://ui.shadcn.com/",
      ],
    },
  ],
})

// Append DeerFlow (super agent harness) overview article
fallbackBlogPosts.push({
  slug: "what-is-deerflow-super-agent",
  title: "DeerFlowとは？サブエージェント・メモリ・サンドボックスで“ほぼ何でも”こなすAIスーパーエージェント",
  description:
    "DeerFlowは、ByteDance発のオープンソース“スーパーエージェント・ハーネス”。サブエージェント・永続メモリ・サンドボックス実行を束ね、拡張可能なスキルで長時間タスクを自律的にこなします。v2.0の全面書き直し、導入方法、各種メッセンジャー連携、Claude Code連携までを公式情報に基づいて解説します。",
  genre: "AI",
  tags: ["DeerFlow", "AIエージェント", "ByteDance"],
  date: "2026-06-24",
  latest_update: "2026-06-24",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "DeerFlow - サブエージェント・メモリ・サンドボックスを束ねるオープンソースAIスーパーエージェントの解説",
  sections: [
    {
      body: [
        "本記事は一次情報（DeerFlow公式リポジトリおよびREADME）に基づき構成しています。DeerFlowは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "DeerFlowとは何か／何を解決するか",
        "v2.0が“全面書き直し”である意味",
        "中核機能（スキル・サブエージェント・サンドボックス・メモリ）",
        "導入方法（make一発）と連携先",
        "推奨モデルと技術スタック",
        "運用上の注意（サンドボックスとセキュリティ）",
      ],
    },
    {
      heading: "DeerFlowとは？“何でも屋”のエージェントハーネス",
      body: [
        "DeerFlowは公式の言葉で「サブエージェント・メモリ・サンドボックスを束ね、拡張可能なスキルによって“ほぼ何でも”こなす、オープンソースのスーパーエージェント・ハーネス」と表現されています。ByteDanceが開発し、ライセンスはMITです。",
        "一般的なチャットボットは文脈をすぐ忘れ、実際の作業を実行できません。DeerFlowは永続メモリ・実ファイルシステム・実行サンドボックス・サブエージェントの生成を備えることで、数分〜数時間かかるような長時間タスクを自律的に進められるようにします。",
      ],
    },
    {
      heading: "v2.0は“ゼロからの書き直し”",
      body: [
        "現行のDeerFlow 2.0は、公式が「ゼロからの全面書き直しであり、v1とコードを共有しない」と明言する大型アップデートです（v1系は1.xブランチで維持）。",
        "設計の中心にあるのが“スキル”という単位です。標準のAgent Skillは「ワークフローを定義したMarkdownファイル」で、必要なときに必要な能力だけを読み込みます。膨大な機能を抱えてもコンテキストを浪費しない、いまのエージェント設計のトレンドに沿った作りです。",
      ],
    },
    {
      heading: "中核機能：サブエージェント・サンドボックス・メモリ",
      table: {
        headers: ["機能", "概要"],
        rows: [
          ["スキル", "ワークフローを定義したMarkdownの能力モジュールを段階的に読み込む"],
          ["サブエージェント", "状況に応じて生成。各自にスコープ付き文脈・ツール・終了条件を持ち、可能なら並列実行"],
          ["サンドボックス", "タスクごとに専用の実行環境（フルのファイルシステムを参照）"],
          ["永続メモリ", "プロフィール・好み・蓄積した知識をセッションを越えて保持"],
          ["コンテキスト管理", "完了タスクを要約し、中間結果をファイルへ退避してトークンを節約"],
        ],
      },
    },
    {
      heading: "導入と連携",
      body: [
        "導入はmakeコマンドで完結します。",
        "git clone https://github.com/bytedance/deer-flow.git",
        "make setup",
        "make dev",
        "",
        "起動後は http://localhost:2026 にアクセスします。Docker利用時は make docker-start（開発）/ make up（本番）も用意されています。",
        "外部連携も広く、Telegram・Slack・Feishu（Lark）・WeChat・WeCom・DingTalkといったメッセンジャーに対応。MCPサーバーやスキルを設定でき、claude-to-deerflowスキルを使えばClaude Codeから直接DeerFlowを操作できます。",
        "",
        "{{RELATED_ARTICLE:claude-code-overview-2025-10-14}}",
      ],
    },
    {
      heading: "推奨モデルと技術スタック",
      body: [
        "DeerFlowはモデル非依存ですが、長いコンテキスト・推論力・強いツール利用に対応するモデルを推奨し、ByteDanceはDoubao-Seed-2.0-Code・DeepSeek v3.2・Kimi 2.5を挙げています。",
        "技術スタックはPython 3.12+とNode.js 22+を前提に、中核はLangGraphとLangChainで構築されています。エージェントのオーケストレーションをグラフとして扱う、堅実な構成です。",
      ],
    },
    {
      heading: "運用上の注意",
      body: [
        "強力な反面、DeerFlowはシステムコマンドの実行やリソース操作を行うため、公式も「不適切なデプロイはセキュリティリスクを招きうる」と警告しています。",
        "外部公開する場合はIP許可リスト・認証ゲートウェイ・ネットワーク分離を、基本はローカルや信頼できるネットワークでの運用を推奨します。サンドボックスがある前提でも、権限と公開範囲は最小化するのが安全です。",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "DeerFlowは、サブエージェント・サンドボックス・永続メモリ・スキルを統合し、長時間の複雑なタスクを自律実行できるオープンソースのスーパーエージェント・ハーネスです。v2.0の全面書き直しで設計が刷新され、Claude Codeを含む幅広い連携先を備えています。",
        "MITライセンスで自由度が高く、セルフホストでエージェント基盤を持ちたいチームにとって有力な選択肢です。実行能力が高いぶん、デプロイ時のセキュリティ設計だけは丁寧に行いましょう。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: bytedance/deer-flow",
        "https://github.com/bytedance/deer-flow",
        "LangGraph",
        "https://www.langchain.com/langgraph",
        "Model Context Protocol（MCP）",
        "https://modelcontextprotocol.io/",
      ],
    },
  ],
})

// Append WorldMonitor (global intelligence dashboard) overview article
fallbackBlogPosts.push({
  slug: "what-is-worldmonitor-global-intelligence",
  title: "WorldMonitorとは？500以上のソースをAIで束ねる“地球規模”のリアルタイム情報ダッシュボード",
  description:
    "WorldMonitorは、地政学・金融・インフラの情報をAIで統合表示するオープンソースのダッシュボード。500以上のニュースフィード、3D地球儀＋WebGLマップ、OllamaによるローカルAI（APIキー不要）、Tauri 2のデスクトップアプリまでを備えます。機能・データソース・技術スタック・ライセンスを公式情報に基づいて解説します。",
  genre: "Full-stack",
  tags: ["WorldMonitor", "データ可視化", "ローカルAI"],
  date: "2026-06-24",
  latest_update: "2026-06-24",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "WorldMonitor - 500以上のソースをAIで統合するリアルタイム地球規模情報ダッシュボードの解説",
  sections: [
    {
      body: [
        "本記事は一次情報（WorldMonitor公式リポジトリおよびREADME）に基づき構成しています。WorldMonitorは活発に開発が進んでおり、機能や仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "WorldMonitorとは何か／どんな課題を解くか",
        "主な機能（地図・指数・フィード・多言語）",
        "データソースとAIの使い方（ローカル完結）",
        "技術スタックとアーキテクチャ",
        "導入方法（環境変数ゼロ）",
        "ライセンスと注意点",
      ],
    },
    {
      heading: "WorldMonitorとは？分断された情報を1画面に",
      body: [
        "WorldMonitorは、地政学・金融・インフラにまたがる情報をAIで統合表示する、オープンソースのリアルタイム情報ダッシュボードです。ニュース・市場データ・各種シグナル・災害アラートといった断片的な情報源を、ひとつの“状況把握”プラットフォームにまとめます。",
        "現代の情報は量も経路もバラバラで、全体像をつかむのは困難です。WorldMonitorは数百のソースを集約し、AIで相関づけることで、世界の動きを俯瞰できるようにします。GitHubスターは約59.5k、最新はv2.5.23（2026年3月）です。",
      ],
    },
    {
      heading: "主な機能",
      table: {
        headers: ["機能", "概要"],
        rows: [
          ["AI統合ニュース", "15カテゴリ・500以上のキュレーション済みフィードをAIで要約・統合"],
          ["デュアル地図", "3D地球儀（globe.gl）とWebGLの平面マップ（deck.gl）を切替"],
          ["国家不安定指数（CII）", "v8のストレススコアでTier-1の31カ国を評価"],
          ["金融レーダー", "29の証券取引所・商品・暗号資産をカバー"],
          ["6つのサイト派生", "world / tech / finance / commodity / happy / energy"],
          ["多言語", "24言語に対応（RTL対応含む）"],
        ],
      },
    },
    {
      heading: "データソースとAIの使い方（ローカル完結）",
      body: [
        "地政学・金融・エネルギー・航空など65以上の外部プロバイダからデータを集約します。AIによる要約・相関づけは、ローカルのOllamaを使えばAPIキー不要で動かせるのが大きな特徴です。",
        "クラウドを使いたい場合はGroqやOpenRouterにも対応し、さらにブラウザ側でTransformers.jsを用いた推論も組み合わせられます。“手元で完結させるか、クラウドに広げるか”を選べる柔軟さがあります。",
        "",
        "{{RELATED_ARTICLE:what-is-voicebox-local-ai-voice}}",
      ],
    },
    {
      heading: "技術スタックとアーキテクチャ",
      body: [
        "フロントエンドはTypeScript・Vite・Three.jsで構築され、可視化に強い構成です。デスクトップ版はTauri 2にNode.jsサイドカーを組み合わせ、Windows・macOS・Linux向けのネイティブアプリを提供します。",
        "サービス間の契約にはProtocol Buffers（276のproto・34サービス）を採用し、配信はVercel Edge・Railwayリレー・PWAという多面的な構成。キャッシュにはRedis/Upstashやサービスワーカーを使います。フロント中心の大規模アプリらしい、現代的なフルスタック設計です。",
      ],
    },
    {
      heading: "導入方法（環境変数ゼロ）",
      body: [
        "ローカル起動は数コマンドで済み、環境変数の設定は不要です。",
        "git clone https://github.com/koala73/worldmonitor.git",
        "cd worldmonitor && npm install && npm run dev",
        "",
        "起動後は http://localhost:3000 で開きます。APIキーなしでローカルAIまで含めて試せるため、最初のハードルが低いのも魅力です。",
      ],
    },
    {
      heading: "ライセンスと注意点",
      body: [
        "ライセンスはAGPL-3.0-only（コピーレフト）。個人利用・セルフホスト・フォークは許可されますが、商用のSaaS提供にはAGPL遵守または別途ライセンスが必要です。改変して公開する場合はソース公開義務が及ぶ点に注意してください。",
        "扱う情報の性質上、表示内容はあくまで参考情報として捉え、重要な判断には一次情報の確認を併用するのが安全です。",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "WorldMonitorは、500以上のソースとAIを束ね、世界の動きを1画面で俯瞰できるオープンソースのダッシュボードです。3D地球儀やWebGLマップ、国家不安定指数、金融レーダー、24言語対応など、情報の“見える化”に振り切った機能が揃っています。",
        "OllamaによるローカルAIでAPIキーなしに動かせる手軽さと、Tauri 2のデスクトップアプリまで含めた完成度は、データ可視化やフルスタック開発の好例としても学びの多いプロジェクトです。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: koala73/worldmonitor",
        "https://github.com/koala73/worldmonitor",
        "Ollama",
        "https://ollama.com/",
        "deck.gl",
        "https://deck.gl/",
      ],
    },
  ],
})

// Append Claude Code official plugin directory overview article
fallbackBlogPosts.push({
  slug: "what-is-claude-code-plugins-official",
  title: "Claude Code公式プラグインディレクトリとは？スキル・MCP・コマンドを“入れて使う”仕組み",
  description:
    "Anthropic公式の「claude-plugins-official」は、Claude Codeを拡張する高品質プラグインを集めた厳選ディレクトリ。スキル・MCPサーバー・スラッシュコマンド・エージェントをまとめて配布でき、/pluginコマンドで導入します。仕組み・導入方法・プラグイン構造・貢献方法・注意点を公式情報に基づいて解説します。",
  genre: "Update",
  tags: ["Claude Code", "プラグイン", "MCP"],
  date: "2026-06-24",
  latest_update: "2026-06-24",
  heroImage: "/images/blog-placeholder.svg",
  heroImageAlt: "Claude Code公式プラグインディレクトリ - スキル・MCP・コマンド・エージェントをまとめて導入する仕組みの解説",
  sections: [
    {
      body: [
        "本記事は一次情報（Anthropic公式リポジトリおよびREADME）に基づき構成しています。Claude Codeおよびプラグイン機能は活発に更新されており、コマンドや仕様は今後変更される可能性があります。",
      ],
    },
    {
      heading: "この記事でわかること",
      list: [
        "公式プラグインディレクトリとは何か",
        "プラグインで何を拡張できるか（スキル・MCP・コマンド・エージェント）",
        "導入と発見の方法（/pluginコマンド）",
        "プラグインの標準構造",
        "貢献（自作プラグインの提出）方法",
        "インストール時の注意（信頼性）",
      ],
    },
    {
      heading: "公式プラグインディレクトリとは？",
      body: [
        "claude-plugins-officialは、Claude Codeを拡張する高品質なプラグインをAnthropicが厳選して集めた公式ディレクトリです。リポジトリは内部プラグイン（Anthropicが保守する /plugins）と、サードパーティ製の外部プラグイン（/external_plugins）の2つに分かれています。",
        "プラグインは、スキル・MCPサーバー・スラッシュコマンド・エージェントといった機能をまとめて配布する仕組みで、Claude Codeの能力を“パッケージ単位”で足せるのが特徴です。ライセンスはApache-2.0（各プラグインは個別ライセンスの場合あり）、スターは約31kです。",
      ],
    },
    {
      heading: "導入と発見：/plugin コマンド",
      body: [
        "インストールはコマンド1行です。マーケットプレイス名を添えて指定します。",
        "/plugin install {plugin-name}@claude-plugins-official",
        "",
        "どんなプラグインがあるかを探すときは、/plugin から Discover を開いて一覧をブラウズできます。導入後はそのプラグインが持つスキルやコマンド、MCPサーバーがClaude Codeから使えるようになります。",
      ],
    },
    {
      heading: "プラグインの標準構造",
      body: [
        "各プラグインは決まったディレクトリ構造に従います。メタ情報を定義する .claude-plugin/plugin.json が必須で、あとは必要な機能だけを足していく形です。",
      ],
      list: [
        ".claude-plugin/plugin.json … プラグインのメタ情報（必須）",
        ".mcp.json … MCPサーバー設定（任意）",
        "commands/ … スラッシュコマンド（任意）",
        "agents/ … エージェント定義（任意）",
        "skills/ … スキル定義（任意）",
        "README.md … ドキュメント",
      ],
    },
    {
      heading: "貢献と注意点",
      body: [
        "内部プラグインはAnthropicのチームが開発し、/plugins/example-plugin が参考になります。サードパーティはプラグインディレクトリの提出フォームから申請でき、外部プラグインはセキュリティと品質の基準を満たす必要があります。",
        "ただし重要な注意があります。Anthropicはプラグインが含むMCPサーバーやファイルの中身までを管理しているわけではありません。インストール前に提供元を信頼できるか必ず確認し、不要な権限や未知のMCPサーバーを安易に有効化しないことが大切です。",
        "",
        "{{RELATED_ARTICLE:what-is-anthropic-cybersecurity-skills}}",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "claude-plugins-officialは、スキル・MCP・コマンド・エージェントをまとめて配布できる、Claude Codeの公式プラグインディレクトリです。/plugin install で手軽に導入でき、Discoverで探せて、決まった構造に従えば自作プラグインの提出もできます。",
        "Claude Codeを“自分たちのワークフロー”に合わせて拡張する公式の入口として要注目です。便利さの一方で、外部プラグインは信頼性の確認を忘れずに運用しましょう。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: anthropics/claude-plugins-official",
        "https://github.com/anthropics/claude-plugins-official",
        "Claude Code 公式ドキュメント",
        "https://docs.anthropic.com/en/docs/claude-code/overview",
        "Model Context Protocol（MCP）",
        "https://modelcontextprotocol.io/",
      ],
    },
  ],
})
