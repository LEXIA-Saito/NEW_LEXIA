import { BlogPost } from "./blog-posts.types"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "what-is-onlook",
    title: "Onlookとは？ReactとTailwindを直感的に操る\"デザイナー向けCursor\"の全貌",
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
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-pricing-plans.jpg",
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
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-getting-started-tutorial-hero.webp",
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
      body: [
        "GitHub／GitLab／Bitbucketから既存プロジェクトを取り込むことも可能です。",
        "",
        "手順:",
      ],
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
      body: [
        "{{RELATED_ARTICLE:what-is-firebase-studio-overview}}",
      ],
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
      body: [
        "不具合報告は /bug コマンド、もしくはGitHub Issuesへ。Discordコミュニティも案内されています。",
      ],
      list: [
        "Issues: https://github.com/anthropics/claude-code/issues",
        "Discord: https://anthropic.com/discord",
      ],
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
