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
        "ProまたはMaxの利用上限に達した後は、標準API料金で使った分だけ支払う「Extra Usage」も選べます。上限に達するたびに上位プランへ変更するのではなく、一時的な利用増加を従量課金で補う選択肢です。",
      ],
      list: [
        "Claude Pro（$20/月）：小規模なリポジトリでの軽いコーディングや、Claude Codeを試したい方向け。",
        "Claude Max 5x（$100/月）：1セッションあたりProの5倍の利用枠。日常的に使い、Proの上限に達することが多い方向け。",
        "Claude Max 20x（$200/月）：1セッションあたりProの20倍の利用枠。大規模な作業を高頻度で行う方向け。",
        "Extra Usage：Pro・Maxの利用上限を超えた分を標準API料金で支払う追加利用。設定画面で有効化し、支出上限を設定して使う。",
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
          ["上限を超えるのが一時的・不定期", "Extra Usage", "必要な月だけ追加分を従量課金で補える"],
          ["CI・夜間バッチ・自動処理", "API従量課金", "プログラムから実行でき、処理ごとの利用量を追跡しやすい"],
        ],
      },
    },
    {
      heading: "API料金の計算例",
      body: [
        "API料金は「入力トークン数 × 入力単価 ＋ 出力トークン数 × 出力単価」で概算できます。たとえば、1回の処理で入力10万トークン、出力1万トークンを使った場合の標準料金は次のとおりです。",
      ],
      table: {
        headers: ["モデル", "入力料金", "出力料金", "合計"],
        rows: [
          ["Sonnet 4.6", "10万 ÷ 100万 × $3 = $0.30", "1万 ÷ 100万 × $15 = $0.15", "$0.45"],
          ["Opus 4.8", "10万 ÷ 100万 × $5 = $0.50", "1万 ÷ 100万 × $25 = $0.25", "$0.75"],
        ],
      },
    },
    {
      richtext: affiliateNoteHtml(
        "計算例は目安です",
        "Claude Codeは作業中にコードや会話履歴を繰り返し読み込むため、実際のトークン数は依頼文の長さだけでは決まりません。プロンプトキャッシュ、Fast mode、バッチ処理、サーバー側ツールなどによっても料金は変わります。API利用時はセッション内の<code>/cost</code>とClaude Consoleの利用明細で実額を確認してください。",
      ),
    },
    {
      heading: "利用量を抑える8つの方法",
      body: [
        "API料金はトークン使用量に応じて増え、定額プランの利用枠もタスクの内容やモデルによって消費量が変わります。次の工夫は、不要なコンテキストや手戻りを減らすのに有効です。",
      ],
      list: [
        "API利用時は /cost で現在のセッションの費用を確認し、想定より増えていたら作業を分割する。",
        "/status で認証方法を確認し、定額プランとAPI従量課金のどちらが使われているかを把握する。",
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
        "対話しながら個人開発に使う場合はProから始め、上限に達する頻度が増えたらExtra UsageまたはMax 5x、さらに不足する場合はMax 20xを検討すると、過剰な契約を避けやすくなります。利用頻度が低い場合や、CI・定期処理などの自動化には、支出上限を設定したAPI従量課金が適しています。",
        "Maxも無制限ではなく、複数セッションを並列で動かすと利用枠を早く消費します。プラン名だけで判断せず、実際の使用量、待ち時間、月額費用を確認しながら見直してください。",
      ],
    },
    {
      heading: "関連記事・公式情報",
      list: [
        "Claude Code入門：https://lexia-hp.com/blog/claude-code-overview-2025-10-14",
        "Claude Pro・MaxでClaude Codeを使う：https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan/",
        "Pro・MaxのExtra Usage：https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans",
        "Claude Codeのモデル・利用量・上限：https://support.claude.com/en/articles/14552983-models-usage-limits-in-claude-code",
        "APIキーと定額プランの認証確認：https://support.claude.com/en/articles/12304248-managing-api-key-environment-variables-in-claude-code",
        "Claude APIの料金：https://platform.claude.com/docs/ja/about-claude/pricing",
        "Claude APIの利用上限と支出上限：https://platform.claude.com/docs/en/api/rate-limits",
      ],
    },
  ],
})

// Mac mini × Claude Code multi-node operations article (Amazonアソシエイト記事)
fallbackBlogPosts.push({
  slug: "mac-mini-cluster-claude-code-monetization",
  title: "Mac mini複数台でClaude Codeを並列運用する方法｜構成・費用・セキュリティ",
  description:
    "Mac miniを複数台使ってClaude CodeやローカルLLMを並列運用する際の判断基準を解説。1台目の選び方、メモリ・ネットワーク構成、総保有コスト、常時稼働のセキュリティを整理します。",
  genre: "Full-stack",
  tags: ["Mac mini", "Claude Code", "運用設計"],
  date: "2026-06-26",
  latest_update: "2026-06-27",
  readingTime: "10分",
  sections: [
    { richtext: AFFILIATE_DISCLOSURE_HTML },
    {
      body: [
        "Claude CodeのセッションやローカルLLMの検証を同時に進めるため、Mac miniを複数台使う構成を検討する方もいるでしょう。ただし、台数を増やせばすべての処理が比例して速くなるわけではありません。",
        "本記事では、複数台が必要になる条件、1台目の選び方、ネットワーク構成、総保有コスト、常時稼働時のセキュリティを整理します。最初から複数台を購入するのではなく、実測した負荷を基準に増設を判断することが前提です。",
      ],
    },
    {
      heading: "複数台構成が必要になるケース",
      image: "/images/blog/mac-mini-cluster-rack.webp",
      imageAlt: "ラックに複数台のMac miniを積み上げて構成したクラスタ",
      body: [
        "Mac miniは小型で静音性が高く、デスク上や小規模な検証環境に複数台を設置しやすい端末です。複数のOS環境を分離したい場合や、ローカルLLM・ビルド・テストを同時実行したい場合には、処理を別の端末へ分ける価値があります。",
        "一方、Claude Codeの推論はクラウド側で行われます。Mac miniの台数やメモリを増やしても、Claude自体の回答性能や定額プランの利用枠は増えません。ProとMaxの利用枠はClaudeとClaude Codeで共有されるため、複数セッションを動かすほど上限には早く到達します（料金の考え方は https://lexia-hp.com/blog/claude-code-pricing-cost-optimization を参照）。",
      ],
      list: [
        "複数台が向く例：OSや権限の分離、複数リポジトリのビルド・テスト、ローカルLLMの同時実行。",
        "1台で十分な例：Claude Codeだけを使う、小規模な開発、同時処理が少ない。",
        "増設前に確認する指標：CPU・メモリ使用率、ビルド待ち時間、同時実行数、月間のClaude利用量。",
      ],
    },
    {
      heading: "まずは1台で負荷を測る",
      body: [
        "最初の1台では、Claude Code、エディタ、ブラウザ、Docker、ビルド、ローカルLLMなど、実際に使うソフトウェアを同時に動かして負荷を測ります。Claude Code中心の軽い開発であれば標準モデルから検討し、ローカルLLMや複数の仮想環境も使う場合はメモリに余裕を持たせます。",
      ],
      richtext: amazonProductHtml({
        name: "Apple Mac mini（M4・16GB / 24GB）",
        context: "Claude Code中心の開発や、小規模なローカル処理を検証する1台目の候補。在庫・仕様・価格はリンク先でご確認ください（Apple Storeでも購入できます）。",
        url: "https://amzn.to/43XtC7M",
      }),
    },
    {
      heading: "メモリはローカル処理に合わせて選ぶ",
      body: [
        "Claude Codeだけを使う場合、端末のメモリ量はClaudeの回答品質に影響しません。メモリが必要になるのは、ローカルLLM、Docker、仮想環境、大規模なビルドなどを同時に動かす場合です。",
        "Mac miniのユニファイドメモリは購入後に増設できません。ただし、必要以上に大きな構成を選ぶのではなく、使用するローカルモデルと開発環境の実測値に余裕を加えて判断します。",
      ],
      table: {
        headers: ["メモリ", "想定する使い方", "確認点"],
        rows: [
          ["16GB / 24GB", "Claude Code中心・軽いローカル処理", "Dockerやブラウザとの同時使用量を確認"],
          ["32GB", "複数の開発環境・中規模のローカルモデル", "モデルの必要メモリを事前に確認"],
          ["48GB / 64GB", "大きなローカルモデル・複数VM", "高額になるため実測後に選択"],
        ],
      },
    },
    {
      richtext: affiliateNoteHtml(
        "高負荷なローカル処理向け：Apple Mac mini（M4 Pro・48GB / 64GB）",
        "大きなローカルモデルや複数の仮想環境を常用する場合の候補です。メモリは後から増設できないため、必要量を測ってから構成を選んでください。<strong>Amazonでは在庫が変動しやすいため、最新情報は「Mac mini M4 Pro」で検索するか、Apple Storeの構成ページをご確認ください。</strong>",
      ),
    },
    {
      heading: "ネットワーク構成：何を共有するかを先に決める",
      image: "/images/blog/mac-mini-cluster-topology.webp",
      imageAlt: "Mac miniクラスタのトポロジーとノード間通信のイメージ",
      body: [
        "Claude Codeの各セッションは独立して動作するため、Mac mini同士を接続するだけで自動的に分散処理されるわけではありません。ネットワークを設計する前に、ソースコード、ビルド成果物、ローカルモデル、バックアップのどれを共有するのか決めます。",
        "大きなファイルやモデルを端末間で転送する場合は有線LANが安定します。Thunderboltによる直結も高速ですが、対応機種、接続方式、利用する分散ソフトウェアの仕様を確認する必要があります。余っている端末でローカルLLMを分散実行する場合は、OSS「exo」の解説（ https://lexia-hp.com/blog/what-is-exo-ai-cluster ）も参考になります。",
      ],
      richtext:
        amazonProductHtml({
          name: "2.5GbE / 10GbE スイッチングハブ",
          context: "大容量ファイルやローカルモデルを複数端末で共有する場合の有線ネットワーク候補。",
          url: "https://amzn.to/4ex7xmr",
        }) +
        amazonProductHtml({
          name: "エレコム CAT6A LANケーブル",
          context: "2.5GbE / 10GbE環境を構成する際の配線。スイッチと端末の対応規格をご確認ください。",
          url: "https://amzn.to/4g27ZdD",
        }) +
        amazonProductHtml({
          name: "Thunderbolt 5 ケーブル",
          context: "対応機種間で大容量データを転送する場合の候補。接続する機器とソフトウェアの対応状況をご確認ください。",
          url: "https://amzn.to/44vbJ03",
        }) +
        amazonProductHtml({
          name: "Anker USB-C KVMスイッチ",
          context: "複数台を1組のキーボード・マウス・モニターで操作する場合の切り替え用。",
          url: "https://amzn.to/4vx3ZGL",
        }),
    },
    {
      heading: "常時稼働で確認する電源・熱・ストレージ",
      body: [
        "複数台を常時稼働させる場合は、停電時の安全な終了、排熱、バックアップ、ストレージ容量を確認します。すべての周辺機器を台数分購入する前に、UPSの給電容量や共有ストレージで集約できる範囲を計算してください。",
      ],
      richtext:
        amazonProductHtml({
          name: "CyberPower ST425JP UPS（425VA / 260W）",
          context: "停電時のデータ保護と安全なシャットダウン用。接続機器の合計消費電力と必要な稼働時間をご確認ください。",
          url: "https://amzn.to/4ey3CWI",
        }) +
        amazonProductHtml({
          name: "Crucial X10 外付けSSD 2TB（USB-C）",
          context: "ローカルモデル、ビルド成果物、バックアップの保存先候補。必要な転送速度とバックアップ方式をご確認ください。",
          url: "https://amzn.to/4g8GM99",
        }) +
        amazonProductHtml({
          name: "UGREEN Mac mini M4 / M4 Pro 専用 USB-Cハブ＆スタンド（10-in-1）",
          context: "ポート拡張と設置スペースの整理に。対応するMac miniとM.2 SSDの仕様をご確認ください。",
          url: "https://amzn.to/4uWCjdg",
        }),
    },
    {
      heading: "導入前に総保有コストを計算する",
      body: [
        "必要台数を判断するときは、本体価格だけでなく、周辺機器、Claudeの料金、電気代、保守時間を含めた総保有コストで比較します。電気代は「平均消費電力（W）÷1000 × 24時間 × 30日 × 1kWhあたりの単価」で概算できます。",
        "たとえば電力単価を31円/kWhと仮定すると、平均10Wで月約223円、平均40Wで月約893円です。実際の消費電力は処理内容や接続機器によって変わるため、ワットチェッカーなどで測定してください。",
      ],
      table: {
        headers: ["費用項目", "確認する内容", "注意点"],
        rows: [
          ["初期費用", "本体・メモリ・ストレージ・周辺機器", "最新価格で比較し、不要な一括購入を避ける"],
          ["Claude利用料", "Pro・Max・Extra Usage・API", "複数台でも同一アカウントの利用枠は増えない"],
          ["電気代", "平均消費電力 × 稼働時間 × 電力単価", "アイドル値ではなく実運用時に測定する"],
          ["運用費", "更新・監視・バックアップ・障害対応", "管理する端末が増えるほど作業時間も増える"],
        ],
      },
    },
    {
      richtext: affiliateAlertHtml(
        "台数とClaudeの利用枠は別に考えてください",
        "Mac miniを増やしても、Claudeの定額プランに含まれる利用枠は増えません。複数セッションは上限を早く消費するため、<strong>端末負荷とClaude利用量を別々に測定</strong>してください。アカウントやプランの利用条件も契約前に公式情報でご確認ください。",
      ),
    },
    {
      heading: "常時稼働時のセキュリティ",
      body: [
        "常時稼働する端末や自動処理は、設定不備に気づくまでの時間が長くなりやすく、侵害時の影響も広がります。開発用の権限をそのまま渡さず、端末・アカウント・ネットワークの各層で範囲を制限します。",
      ],
      list: [
        "OSと利用ツールを更新し、不要なサービスとポートを無効化する。",
        "端末ごとに用途と権限を分け、APIキーや秘密情報は必要最小限にする。",
        "外部入力をそのままコマンドとして実行せず、変更内容を人が確認する。",
        "ログ、利用量、失敗した処理を監視し、異常時に停止できるようにする。",
        "ソースコードと重要データを別媒体へバックアップし、復元手順を確認する。",
      ],
    },
    {
      heading: "まとめ：増設は実測後に判断する",
      body: [
        "まず1台で実際の作業を行い、CPU・メモリ・待ち時間・Claude利用量を測ります。端末側の負荷が継続的に高く、作業を分離する効果が確認できた場合にだけ、2台目や高速ネットワークを追加します。",
        "複数台構成は、処理の分離やローカル計算資源の追加には有効です。一方、Claudeの利用枠や回答性能を増やす仕組みではありません。目的と測定値を明確にしたうえで、必要な機材だけを段階的に導入してください。",
      ],
    },
    {
      richtext:
        affiliateNoteHtml(
          "さらに学ぶ（書籍）",
          "AIエージェント開発やローカルLLMの基礎を体系的に確認したい方向けの参考書です。内容と目次を確認し、必要な場合にご検討ください。",
        ) +
        amazonProductHtml({
          name: "AIエージェント 設計＆実装 完全ガイド",
          context: "エージェント設計や実装例を確認するための参考書。最新の目次と対応技術をご確認ください。",
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

// Append Valkey (Redis fork) explainer — origin, license, compatibility, 9.0, migration
fallbackBlogPosts.push({
  slug: "what-is-valkey-redis-fork",
  title: "Valkeyとは？Redisから分かれたOSSの正体｜ライセンス・互換性・移行の判断材料",
  description:
    "Redisのライセンス変更を機にLinux Foundationが立ち上げたOSS「Valkey」を解説します。フォークの経緯、Redisとの互換性とライセンスの違い、Valkey 9.0の新機能、移行時に確認すべき判断材料を整理します。",
  genre: "Backend",
  tags: ["Valkey", "Redis", "OSS"],
  date: "2026-06-29",
  sections: [
    {
      body: [
        "キャッシュやセッション管理で長く使われてきたRedisですが、2024年のライセンス変更をきっかけに「Valkey（ヴァルキー）」という名前を見かける機会が増えました。AWSやGoogle Cloudのマネージドサービスでも選択肢に並び、主要なLinuxディストリビューションが標準パッケージとして採用し始めています。",
        "「Redisと何が違うのか」「今あるRedisをそのまま置き換えられるのか」「ライセンスは結局どうなったのか」と迷っている方も多いでしょう。本記事では、フォークが起きた経緯、Redisとの互換性とライセンスの違い、最新のValkey 9.0で何が変わったか、そして移行を判断するうえで確認すべき点を、一次情報をもとに整理します。",
      ],
      list: [
        "この記事でわかること：Valkeyが生まれた背景と、Redisとの関係。",
        "ライセンス（BSD 3-Clause）とガバナンスの違い、互換性の現状。",
        "Valkey 9.0の主な新機能と、性能面のアップデート。",
        "導入・移行を判断するときに確認すべきコスト・運用・セキュリティの観点。",
      ],
    },
    {
      heading: "Valkeyとは？Redisから分岐したOSS",
      body: [
        "Valkeyは、Redisと互換性を持つインメモリのデータストア／キャッシュサーバーのオープンソース実装です。Redis 7.2系のコードを起点にフォークされ、現在はThe Linux Foundationのプロジェクトとして開発されています。ライセンスはOSI承認の許諾的ライセンスであるBSD 3-Clauseで、商用利用・改変・再配布に追加の制限はありません（公式サイト: https://valkey.io ）。",
        "キーバリュー型のデータ構造（文字列・ハッシュ・リスト・セット・ソート済みセットなど）、Pub/Sub、クラスタリング、永続化といったRedisでおなじみの機能をそのまま備えています。クライアントライブラリやコマンド体系の多くも共通しているため、既存のRedis資産を活かしやすい点が特徴です。",
      ],
    },
    {
      heading: "なぜフォークが起きたのか：ライセンス変更の経緯",
      body: [
        "Redisは2009年にSalvatore Sanfilippo氏が作成し、長くBSDライセンスの下でオープンソースとして開発されてきました。状況が変わったのは2024年3月で、Redis Ltd.がライセンスを「Redis Source Available License v2（RSALv2）」と「Server Side Public License v1（SSPLv1）」のデュアル“ソースアベイラブル”ライセンスへ移行したことがきっかけです。これらはクラウド事業者によるマネージド提供などを制限する内容で、OSIの定義するオープンソースには該当しません。",
        "ライセンス変更からわずか8日後、The Linux Foundationがオープンソースの後継としてValkeyの立ち上げを発表しました。Amazon・Google・Alibaba・Ericsson・Huawei・Tencentといった企業の貢献者が中心となり、その後さらに多くの企業が参加しています。最初の公式版としてValkey 7.2.5がリリースされ、フォーク前のRedisと連続性を保った形で開発が引き継がれました（経緯の詳細: https://valkey.io/topics/history/ ）。",
      ],
    },
    {
      heading: "ValkeyとRedisの違い：ライセンス・互換性・ガバナンス",
      body: [
        "実務上いちばん意識すべき違いはライセンスとガバナンスです。Valkeyは一貫してBSD 3-Clauseを採用し、特定企業が単独でライセンスを変更できないLinux Foundationの体制下にあります。一方Redisは、2025年5月のRedis 8.0でOSI承認のAGPLv3を選択肢として追加し、現在はRSALv2／SSPLv1／AGPLv3のトライライセンス構成になりました（Redis社の解説: https://redis.io/blog/what-is-valkey/ ）。",
        "AGPLv3はOSI承認のオープンソースライセンスですが、ネットワーク経由でサービス提供する場合に改変部分の公開を求める「ネットワーク・コピーレフト」を伴います。Redisを改変して自社サービスに組み込む場合、この条項が問題になるかどうかは法務での確認が必要です。純粋に許諾的なライセンスを求めるならValkeyのBSD 3-Clauseが扱いやすい選択肢になります。",
      ],
      table: {
        headers: ["観点", "Valkey", "Redis（8.0以降）"],
        rows: [
          ["ライセンス", "BSD 3-Clause（許諾的）", "RSALv2／SSPLv1／AGPLv3のトライライセンス"],
          ["ガバナンス", "Linux Foundation（複数企業の共同運営）", "Redis Ltd. による単一ベンダー主導"],
          ["起点", "Redis 7.2系からフォーク", "オリジナルの継続開発"],
          ["互換性の方針", "既存Redisクライアント・コマンドとの互換を重視", "独自機能・モジュールを拡充"],
        ],
      },
    },
    {
      heading: "Valkey 9.0で何が変わったか",
      body: [
        "2025年10月21日に公開されたValkey 9.0は、フォーク後の独自進化が目立つメジャーバージョンです。長く要望のあった機能と大規模クラスタ向けの性能改善が中心になっています（リリース解説: https://valkey.io/blog/introducing-valkey-9/ ）。コミュニティは年1回のメジャーリリースを基本とし、必要に応じてマイナー版を提供する方針です。",
      ],
      list: [
        "ハッシュのフィールド単位の有効期限（HEXPIRE / HPERSIST / HTTL）。従来はキー単位でしか設定できなかったTTLを、フィールドごとに指定できる。",
        "アトミックなスロット移行：クラスタのスロットをキー単位ではなくまとめて移行し、移行中の性能低下を抑える。",
        "クラスタモードでの番号付きデータベースのサポート。",
        "大規模クラスタで毎秒10億リクエスト規模に対応（最大2,000ノード）。パイプライン処理のメモリプリフェッチで最大40%、ゼロコピー応答で最大20%のスループット向上。",
      ],
    },
    {
      heading: "導入・移行時に確認すべき判断材料",
      body: [
        "高い互換性を持つとはいえ、本番環境の移行は「動くはず」で進めず、コスト・運用・セキュリティの観点を事前に確認します。最新の安定版は9.0系のほか、長期的に使いやすい8.1系の保守も継続しているため、利用するマネージドサービスや機能要件に合わせてバージョンを選びます。",
      ],
      list: [
        "互換性の検証：使用しているコマンド・データ構造・クライアントライブラリが対象バージョンのValkeyで動作するかをテスト環境で確認する。Redis固有のモジュールに依存している場合は代替の有無を調べる。",
        "マネージドサービスの対応：AWS ElastiCacheやGoogle Cloud Memorystoreなど、利用中のクラウドがValkeyを提供しているか、料金やサポート範囲はどうかを公式情報で確認する。",
        "ライセンスの整合性：自社の利用形態（社内利用か、改変してネットワーク提供するか）と、ValkeyのBSD／RedisのAGPLv3などの条件が合うかを法務と確認する。",
        "データ移行と永続化：RDB／AOFやレプリケーションを使った移行手順、バックアップと復元手順、切り戻し計画を事前に用意する。",
        "セキュリティと運用：認証（ACL）、通信のTLS化、公開範囲の制限、バージョン更新と脆弱性情報の追跡体制を、移行を機に見直す。",
      ],
    },
    {
      heading: "まとめ：Valkeyは“以前のRedis”を引き継ぐ選択肢",
      body: [
        "Valkeyは、Redisがソースアベイラブルへ移行したことを受けて生まれた、BSDライセンスのオープンソース後継です。Linux Foundationの共同運営により単一ベンダーがライセンスを左右しにくく、許諾的ライセンスを重視する組織にとっては扱いやすい選択肢になっています。",
        "一方でRedis 8.0以降はAGPLv3を加えて再びオープンソースの選択肢を提供しており、どちらが適切かは利用形態とライセンス条件次第です。互換性・コスト・運用・セキュリティを実環境で検証したうえで、目的に合うほうを段階的に選んでください。最新の仕様やリリース情報は、必ず下記の一次情報で確認することをおすすめします。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "Valkey 公式サイト",
        "https://valkey.io",
        "Valkey の歴史（フォークの経緯）",
        "https://valkey.io/topics/history/",
        "Valkey 9.0 リリース解説",
        "https://valkey.io/blog/introducing-valkey-9/",
        "Valkey リリース一覧",
        "https://valkey.io/download/releases/",
        "GitHub リポジトリ",
        "https://github.com/valkey-io/valkey",
        "Redis 社による Valkey との比較記事",
        "https://redis.io/blog/what-is-valkey/",
      ],
    },
  ],
})

// Amical × voice input microphone comparison (Amazonアソシエイト記事)
fallbackBlogPosts.push({
  slug: "voice-input-microphone-guide-amical",
  title: "Amicalの音声入力用マイク4選｜環境別の選び方と設定のコツ",
  description:
    "Amicalで音声入力するときのマイク選びを、静かなデスク、生活音のある部屋、据え置き、移動しながらの長時間入力に分けて解説。メーカー公式仕様を比較し、内蔵マイクとのテスト方法や設定のコツも紹介します。",
  genre: "AI",
  tags: ["Amical", "音声入力", "USBマイク"],
  date: "2026-07-26",
  readingTime: "10分",
  sections: [
    { richtext: AFFILIATE_DISCLOSURE_HTML },
    {
      body: [
        "Amicalで音声入力を始めたものの、誤変換が多い、生活音まで拾う、口元とパソコンの距離で認識が不安定になる——そんなときは、AIモデルを変える前に「Amicalへ届く音」を見直す価値があります。",
        "ただし、外付けマイクを買えば必ず認識精度が上がるわけではありません。静かな部屋でパソコンの近くから話すなら、内蔵マイクで十分な場合もあります。本記事では内蔵マイクを基準に、用途の異なる4製品をメーカー公式仕様から比較します。",
        "Amicalのインストールや基本操作を先に確認したい方は「Amicalの使い方ガイド」（ https://lexia-hp.com/blog/amical-guide ）をご覧ください。",
      ],
      list: [
        "この記事でわかること：外付けマイクを検討する前の30秒テスト。",
        "静かなデスク、生活音のある部屋、据え置き、長時間入力に合う候補。",
        "マイクを替えたあとに確認したいOSとAmicalの設定。",
        "音声入力用マイクで、購入前に見落としやすい接続端子と設置条件。",
      ],
    },
    {
      heading: "結論：マイクは価格ではなく入力環境で選ぶ",
      body: [
        "最初に確認するのは、価格やレビュー数ではなく「どこで、どの姿勢で話すか」です。静かな机なら小型USBマイク、家族の声や空調音が入るなら指向性とノイズ抑制、口元の位置を固定できないならブームマイク付きヘッドセットが比較しやすくなります。",
        "以下の表は優劣のランキングではなく、用途を切り分けるための早見表です。接続端子、マイクとの距離、スタンドの有無まで含めて選んでください。",
      ],
      table: {
        headers: ["候補", "向いている環境", "主な特徴", "購入前の確認"],
        rows: [
          ["パソコン内蔵マイク", "静かな部屋・短時間の入力", "追加費用なし。まず比較の基準にする", "口元との距離、ファン音、机の振動"],
          ["ATR4800-USB", "静かなデスク・省スペース", "単一指向性、USB Type-A、小型・軽量", "Type-A端子の有無、設置位置"],
          ["MM-MCTC02NC", "生活音のある部屋・会議兼用", "超指向性、DSPノイズキャンセル、Type-CとType-Aに対応", "正面に置けるか、話す距離"],
          ["AT2040USB", "据え置き・口元へ近づけられる環境", "ダイナミック型、ハイパーカーディオイド、モニター端子", "スタンドやアームが別途必要"],
          ["OpenComm2 UC 2025 Upgrade", "移動しながら・長時間の入力", "ブームマイク、約35g、最長16時間の通話", "USBアダプターの端子、装着感"],
        ],
      },
    },
    {
      heading: "購入前にやる30秒テスト",
      body: [
        "まずAmicalで30秒ほどの同じ文章を3回読み、誤変換した箇所と周囲の音をメモします。1回目は普段の姿勢、2回目はパソコンへ少し近づき、3回目は空調やスピーカーを止めて試します。",
        "近づくだけで改善するなら、外付けマイクより設置位置の見直しが先です。周囲を静かにしたときだけ改善するなら、指向性のあるマイクや口元へ固定できるブームマイクを比較する意味があります。どの条件でも同じ固有名詞だけを間違える場合は、マイクより辞書・文脈・発音の影響が大きい可能性があります。",
      ],
      richtext: affiliateAlertHtml(
        "認識精度の向上を保証する比較ではありません",
        "本記事はメーカー公式仕様をもとに用途を整理したもので、すべての製品を同一条件で実測したランキングではありません。Amicalの認識結果は、使用するモデル、OSの入力設定、話し方、部屋の反響、通信状態などでも変わります。購入前に、まず内蔵マイクで同条件の記録を残してください。",
      ),
    },
    {
      heading: "静かなデスクならATR4800-USB",
      body: [
        "オーディオテクニカのATR4800-USBは、パソコンへUSB Type-Aで接続する単一指向性のコンデンサーマイクです。公式仕様では重量約60gで、マイク本体を垂直・水平に調整でき、ミュートスイッチと動作表示LEDを備えています。",
        "大きなマイクアームを置かず、パソコンの近くで短いメモや文章を入力したい場合の候補です。一方で、接続はUSB Type-Aなので、Type-C端子だけのノートパソコンでは変換アダプターやハブが必要です。単一指向性でも周囲の音が完全に消えるわけではないため、生活音が大きい場所では次の候補と比較してください。",
      ],
      richtext: amazonProductHtml({
        name: "オーディオテクニカ ATR4800-USB",
        context:
          "静かなデスクで使いやすい小型USBマイクの候補。パソコン側のUSB Type-A端子と設置位置をご確認ください。価格・在庫はリンク先でご確認ください。",
        url: "https://www.amazon.co.jp/dp/B0CRL3P11Y?tag=watoma0a-22",
      }),
    },
    {
      heading: "生活音を抑えたいならMM-MCTC02NC",
      body: [
        "サンワサプライのMM-MCTC02NCは、超指向性マイクとDSPノイズキャンセルを組み合わせたUSBマイクです。メーカーは最大約40dBの環境ノイズを低減すると案内し、文字起こし用途にも適するとしています。USB Type-Cで接続でき、付属アダプターでUSB Type-Aにも対応します。",
        "家族の声、空調、キーボードなどが入りやすい部屋で、マイクを自分の正面に置ける人に向く仕様です。公式の集音範囲は約0.5mですが、ノイズ抑制の効果や声の自然さは部屋と設置条件で変わります。静かな環境ではDSP処理が必須とは限らないため、内蔵マイクとの録音比較をしてから選びましょう。",
      ],
      richtext: amazonProductHtml({
        name: "サンワサプライ MM-MCTC02NC",
        context:
          "生活音のある部屋や文字起こし用途向けの候補。Type-C／Type-Aの接続方法と、正面約0.5m以内に設置できるかをご確認ください。",
        url: "https://www.amazon.co.jp/dp/B0GJD41V2J?tag=watoma0a-22",
      }),
    },
    {
      heading: "据え置きで口元へ寄せるならAT2040USB",
      body: [
        "オーディオテクニカのAT2040USBは、ハイパーカーディオイドのダイナミック型USBマイクです。ショックマウントとポップフィルターを内蔵し、ミュート、ヘッドホンモニター、USB Type-C出力を備えています。口元へ近づけ、周囲の音より声を明瞭に入力したい据え置き環境の候補です。",
        "本体は約600gで、メーカー公式ページでもスタンドやブームアームは別売りと案内されています。マイク単体で完結する小型製品ではないため、机の奥行き、アームの固定場所、口元からの距離を一定にできるかまで確認してください。短い音声入力だけなら過剰な構成になりやすく、配信や会議にも共用したい人ほど検討しやすい製品です。",
      ],
      richtext: amazonProductHtml({
        name: "オーディオテクニカ AT2040USB",
        context:
          "据え置きで口元へ近づけ、配信や会議にも共用したい場合の候補。別売りのスタンド／ブームアームと設置スペースをご確認ください。",
        url: "https://www.amazon.co.jp/dp/B0C2G4PGYS?tag=watoma0a-22",
      }),
    },
    {
      heading: "長時間・移動しながらならOpenComm2 UC",
      body: [
        "Shokz OpenComm2 UC 2025 Upgradeは、耳をふさがない骨伝導ヘッドセットにブームマイクを組み合わせた製品です。公式仕様では重量約35g、最長16時間の通話に対応し、DSPデュアルノイズキャンセリングと単一指向性のブームマイクを備えています。",
        "立ったり歩いたりしながらメモする場合でも、マイクと口元の距離を保ちやすい点がデスクマイクとの違いです。今回のリンクはUSB Type-Cアダプター同梱モデルです。パソコンにUSB Type-Aしかない場合は対応モデルを選び直してください。装着感、骨伝導の聞こえ方、Bluetoothやアダプターとの接続相性には個人差があります。",
      ],
      richtext: amazonProductHtml({
        name: "Shokz OpenComm2 UC 2025 Upgrade（USB Type-Cアダプター同梱）",
        context:
          "長時間の音声入力や、席を離れながら話す用途の候補。パソコンの端子と同梱USBアダプターの種類をご確認ください。",
        url: "https://www.amazon.co.jp/dp/B0DSJBGB6S?tag=watoma0a-22",
      }),
    },
    {
      heading: "Amicalでマイクを替えたあとの設定",
      body: [
        "マイクを接続しただけで判断せず、OSとAmicalが同じ入力デバイスを使っているかを確認します。別のWeb会議アプリが以前のマイクを選んでいることもあるため、入力先を明示的に切り替えたうえで、購入前と同じ文章を同じ距離から読みます。",
      ],
      list: [
        "OSのサウンド設定で目的のマイクを選び、入力レベルが小さすぎないか、声が割れていないか確認する。",
        "Amical側に入力デバイスの選択項目がある場合は、OSと同じマイクを指定する。",
        "デスクマイクは正面へ置き、口元との距離と角度を毎回そろえる。キーボードの真横やパソコンの排気口は避ける。",
        "スピーカーの音をマイクが拾う場合は、イヤホンやヘッドセットへ切り替えて同じ文章を再テストする。",
        "誤変換数だけでなく、装着や設置の手間、入力開始までの時間、長時間使った疲れも記録する。",
      ],
    },
    {
      heading: "まとめ：内蔵マイクとの差が出る製品だけを選ぶ",
      body: [
        "静かなデスクで手軽に始めるならATR4800-USB、生活音への対策を重視するならMM-MCTC02NC、据え置きで口元へ寄せるならAT2040USB、姿勢を変えながら長時間話すならOpenComm2 UCが、それぞれ仕様上の候補になります。",
        "購入前に内蔵マイクで30秒の基準を残し、購入後も同じ文章、距離、部屋で比較してください。誤変換が減らない場合は、製品を追加する前にAmicalの入力デバイス、認識モデル、固有名詞の扱いを見直すほうが効果的です。",
      ],
    },
    {
      list: [
        "メーカー公式情報",
        "オーディオテクニカ ATR4800-USB",
        "https://www.audio-technica.co.jp/product/ATR4800-USB",
        "サンワサプライ MM-MCTC02NC",
        "https://www.sanwa.co.jp/product/syohin?code=MM-MCTC02NC",
        "オーディオテクニカ AT2040USB",
        "https://www.audio-technica.co.jp/product/AT2040USB",
        "Shokz OpenComm2 UC 2025 Upgrade",
        "https://jp.shokz.com/products/opencomm2uc-2025upgrade",
        "Amical公式サイト",
        "https://amical.ai/",
      ],
    },
  ],
})
