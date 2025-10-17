import { BlogPost } from "./blog-posts.types"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "infisical-introduction",
    title: "Infisical: オープンソースのシークレット管理プラットフォーム",
    description: "GitHubでトレンドになっているInfisicalは、開発チームとインフラストラクチャ全体でシークレットを同期し、シークレットの漏洩を防ぐためのオープンソースプラットフォームです。この記事では、Infisicalの主な機能と始め方について解説します。",
    genre: "Security",
    tags: ["Infisical", "セキュリティ", "オープンソース"],
    date: "2025-10-09",
    heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Infisical/cover.webp",
    heroImageAlt: "Infisical のロゴとダッシュボードイメージ",
    sections: [
      {
        heading: "はじめに",
        body: [
          "開発プロセスにおいて、APIキーやデータベースの認証情報などの「シークレット」の管理は、セキュリティを確保する上で非常に重要です。これらの情報を安全に、かつ効率的にチームやインフラ間で共有するためのツールとして、オープンソースのシークレット管理プラットフォーム「Infisical」が注目を集めています。",
          "Infisicalは、GitHubのトレンドリポジトリにも登場するほど人気があり、開発者体験全体を再設計することで、セキュリティツールを誰もが利用しやすいものにすることを目指しています。"
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Infisical/Infisical-logo.webp",
        imageAlt: "Infisical のロゴ",
      },
      {
        heading: "Infisicalの主な機能",
        body: [
          "Infisicalは、シークレット管理を容易にするための多くの機能を提供しています。"
        ],
        list: [
          "ダッシュボードによる一元管理: 使いやすいダッシュボードで、プロジェクトや環境ごとにシークレットを一元管理できます。",
          "ネイティブ統合: GitHub ActionsやVercel、AWSなどのプラットフォームとネイティブに統合できます。",
          "バージョン管理とポイントインタイムリカバリ: シークレットの変更履歴を記録し、必要に応じて復元できます。",
          "シークレットローテーションと動的シークレット: 定期的なローテーションや一時的なシークレットの生成が可能です。",
          "シークレットのスキャンと漏洩防止: Gitリポジトリへのシークレットのコミットを防ぎます。"
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Infisical/best-secret-management-tools.webp",
        imageAlt: "シークレット管理ツール比較のイメージ",
      },
      {
        heading: "始め方",
        body: [
          "Infisicalを始めるには、いくつかの方法があります。"
        ],
        list: [
          "Infisical Cloud: 最も手軽な方法で、無料で利用を開始できます。",
          "セルフホスティング: 自身のインフラで運用することも可能です。Dockerを使って簡単にセットアップできます。"
        ]
        ,
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Infisical/infisical-1500-color.webp",
        imageAlt: "Infisical のセットアップ画面イメージ",
      },
      {
        heading: "まとめ",
        body: [
          "Infisicalは、開発者にとって非常に強力なシークレット管理プラットフォームです。オープンソースであるため、誰でも利用でき、コミュニティによる活発な開発も行われています。シークレット管理に課題を感じている方は、ぜひ一度試してみてはいかがでしょうか。"
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Infisical/secrets-management-cicd.webp",
        imageAlt: "シークレット管理とCI/CD連携のイメージ",
      }
    ]
  },
  {
    slug: "studio-ai-status-2025",
    title: "STUDIOアップデート総点検：あの「STUDIO AI」は今どこに？",
    description:
      "Studio（旧STUDIO）のプロダクト刷新とAI機能の現在地を一次情報から整理します。",
  genre: "Update",
    tags: ["Studio", "ノーコード", "AI"],
    date: "2025-10-08",
    heroImage:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/STUDIO%20AI%E5%85%AC%E5%BC%8F%E7%99%BA%E8%A1%A8%E7%94%BB%E5%83%8F.webp",
    heroImageAlt: "Studio / STUDIO AI に関する公式ビジュアル",
    sections: [
      {
        body: [
          "Studio（旧STUDIO）の最新アップデートを追跡し、長らく動向が気になっていた「STUDIO AI」がどこに位置付けられているのかを確認しました。",
          "2025年10月時点で公開されている一次情報に絞り、プロダクトの刷新状況と利用可能なAI機能を整理します。",
        ],
      },
      {
        heading: "いまの「Studio」で起きていること",
        body: [
          "公式の更新履歴では2025年秋にEditor 5.0 Betaが公開され、CMSリストのAND条件フィルタ対応など月次の改善が続いています。",
          "2024年10月にはブランド名をSTUDIOからStudioへ正式に刷新し、料金体系とビジュアルIDのアップデートが発表されています。",
        ],
        list: [
          "Editor 5.0 Betaのロールアウト（2025年秋）",
          "CMSリストのAND条件フィルタなど継続的な改善",
          "ブランド名・料金・ビジュアルIDのリニューアル（2024年10月）",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/Editor%205.0%20Beta%20Web%E3%82%A8%E3%83%86%E3%82%99%E3%82%A3%E3%82%BF%E3%83%BC%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9.webp",
        imageAlt: "Editor 5.0 Beta のスクリーンショット",
      },
      {
        heading: "“STUDIO AI”の足跡",
        body: [
          "2023年3月の公式記事では「STUDIO AI」のアーリーアクセス募集が行われ、自然言語によるアニメーション設定や自動レスポンシブ生成など4つの予定機能が紹介されました。",
          "2025年9月に発表されたEditor 5.0 Betaの記事では、将来的に「Studio AI」と連携していくことが明記され、構想が継続していることが示唆されています。",
        ],
        list: [
          "2023年3月：アーリーアクセス募集と4機能の予告",
          "2025年9月：Editor 5.0 Beta記事で将来的な連携を言及",
          "一般提供の正式リリース告知は未確認",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/STUDIO%20AI%E5%85%AC%E5%BC%8F%E7%99%BA%E8%A1%A8%E7%94%BB%E5%83%8F.webp",
      },
      {
        heading: "現在使えるAI機能：SEO Writing Assist",
        body: [
          "現時点で誰でも利用できるAI機能として、テキストコンテンツを解析しmetaタイトルとディスクリプションを提案・生成する「SEO Writing Assist」が正式に案内されています。",
          "デザイン自動生成ではなくSEO支援に特化したツールで、ヘルプセンターでは手順や活用方法が詳細に解説されています。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/SEO%20Writing%20Assist%20%E3%81%AE%E8%A8%AD%E5%AE%9A%E7%94%BB%E9%9D%A2.webp",
        imageAlt: "SEO Writing Assist の設定画面イメージ",
      },
      {
        heading: "タイムライン早見表",
        list: [
          "2023/03：STUDIO AIのEA募集を公式発表（4機能を予定）",
          "2024/10：STUDIOからStudioへリブランディング（社名・ロゴ・料金刷新）",
          "2025/01：SEO Writing Assistを新機能として案内",
          "2025/09：Editor 5.0 Beta公開。将来的にStudio AIと連携と記載",
        ],
      },
      {
        heading: "結論",
        body: [
          "「STUDIO AI」は公式に発表された構想として存続しており、Editor 5.0の基盤を通じて今後の連携が示されていますが、一般提供の確定情報はまだ確認できません。",
          "現状で触れられるAI機能はSEO Writing Assistのみで、ページのmeta生成に特化した実用的な支援ツールとして提供されています。",
        ],
      },
      {
        heading: "一次公式ソース一覧",
        list: [
          "Studio “What’s New / Updates”ページ",
          "https://studio.design/updates",
          "“Studio Design Refresh / ブランディング刷新”記事",
          "https://studio.design/updates/thenewstudio",
          "SEO Writing AssistのAI meta生成ヘルプ",
          "https://help.studio.design/en/articles/10472120-automatically-generate-titles-and-descriptions-with-ai",
          "Studio Help（ヘルプセンター）トップ",
          "https://help.studio.design/en/",
          "バージョン管理機能のヘルプ記事",
          "https://help.studio.design/en/articles/7793727-manage-site-versions",
        ],
      },
    ],
  },
  {
    slug: "what-is-onlook",
    title: "Onlookとは？ReactとTailwindを直感的に操る“デザイナー向けCursor”の全貌",
    description:
      "コードとデザインの境界を溶かす次世代ビジュアルエディタ「Onlook」の特徴、アーキテクチャ、利点と課題をLEXIA視点で解説します。",
    genre: "tech",
    tags: ["Onlook", "React", "Tailwind"],
    date: "2025-10-06",
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

// Append Firebase Studio post to the fallback posts array (SEO-optimized)
fallbackBlogPosts.push({
  slug: "what-is-firebase-studio-overview",
  title: "Firebase Studioとは？Googleが描くAI時代の新しい開発環境を徹底解説",
  description:
    "Firebase StudioはGoogleが提供するAI統合型クラウド開発環境（IDE）。Project IDXを継承し、Geminiによるコード生成やFirebaseとの連携を実現。この記事では、Firebase Studioの仕組み・特徴・使い方・注意点までをわかりやすく紹介します。",
  genre: "AI",
  tags: ["Firebase", "AI", "開発環境"],
  date: "2025-10-14",
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-logo-hero-banner.webp",
  heroImageAlt: "Firebase Studioロゴとブランディング",
  sections: [
    {
      // 導入（冒頭パート）
      body: [
        "AIがコードを書く時代、Googleの答えは『Firebase Studio』だった。",
        "2025年、Googleは『Project IDX』を進化させた新たな開発環境 Firebase Studio を発表しました。クラウド上でアプリを構築し、AIがリアルタイムでサポートする——まさに次世代の開発体験です。",
        "この記事では、Firebase Studioの概要から特徴、使い方、注意点、そして今後の展望までを、一次情報（公式ドキュメント・Google開発者ブログ）に基づいて詳しく解説します。これからFirebase Studioを試したい開発者や、AI時代の新しいIDEを探している方に最適な内容です。",
        "画像提供: Google Firebase Studio ／ 引用元: https://firebase.studio/",
      ],
    },
    {
      heading: "Firebase Studioとは？【概要と基本コンセプト】",
      body: [
        "Firebase StudioはGoogleが開発したクラウドベースのAI対応開発環境です。ブラウザ上でアプリを構築・テスト・デプロイでき、FirebaseサービスやGemini AIとシームレスに連携します。",
        "公式には“agentic cloud-based development environment”として紹介され、フロントエンド/バックエンド/モバイルを横断する開発を1つのワークスペースで完結できるよう設計されています。",
        "なお現時点ではPreview（プレビュー）提供で、SLA保証はなく、将来的に後方互換性を壊す変更の可能性が明記されています。",
        "画像提供: Google Firebase Studio ／ 引用元: https://firebase.studio/",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/google-firebase-studio-website-1024x572.webp",
      imageAlt: "Firebase Studio開発環境の全体像",
    },
    {
      heading: "Project IDXからFirebase Studioへ【進化の背景】",
      body: [
        "Firebase Studioは、かつてのProject IDXを統合・進化させたプロジェクトです。",
        "IDXが目指した“AI支援のクラウドIDE”に、Firebaseのバックエンド機能（Auth/Firestore/Hosting等）が有機的に結び付けられ、AIエージェントを核とする開発体験へと深化しました。",
        "これにより、プロトタイピングと運用基盤の距離が縮まり、設計→実装→デプロイの一連の体験がシームレスになっています。",
        "画像提供: Google Firebase Studio ／ 引用元: https://firebase.google.com/docs/studio",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-coding-interface-gemini-ai.webp",
      imageAlt: "Firebase StudioのTypeScriptコーディング画面とGemini AI連携",
    },
    {
      heading: "Firebase Studioの主な機能とできること【AI×クラウド開発】",
      body: [
        "画像提供: Google Firebase Studio ／ 引用元: https://cloud.google.com/blog/products/application-development/firebase-studio-lets-you-build-full-stack-ai-apps-with-gemini",
      ],
      list: [
        "AIプロトタイピング（Gemini連携）：自然言語/画像からUI・API・データ構成を生成・修正",
        "コード補完とデバッグ支援：バグ修正・ユニットテスト補助・依存管理までサポート",
        "テンプレート対応：Next.js / React / Angular / Vue / Go / Python Flask / Flutter など",
        "MCP対応で拡張性を強化：Model Context Protocolでワークスペースの文脈理解を拡張",
        "Nixベースの環境カスタマイズ：宣言的にツール/設定を管理し再現性を担保",
        "プレビュー/エミュレータ：Web即時プレビュー、FlutterではAndroidエミュレータをブラウザで実行",
        "Gemini CLI / Agentモード：Ask→Agent→Autonomousのモード切替、ターミナル統合",
        "Firebase Hostingへのワンクリックデプロイ：Auth/Firestoreなどと深く統合",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-ai-prototyping-interface.webp",
      imageAlt: "Firebase StudioのAIプロトタイピング機能とGemini統合",
    },
    {
      heading: "Firebase Studioの使い方【始め方からデプロイまで】",
      body: [
        "Firebase Studioは、ブラウザ上でAI支援を受けながらアプリを構築・テスト・デプロイできるクラウド開発環境です。基本的な流れは以下の通りです。",
      ],
      list: [
        "1. Googleアカウントでサインイン",
        "2. 新規プロジェクト作成またはGitHubインポート",
        "3. テンプレート選択（例：Next.js）",
        "4. Geminiエージェントでプロトタイプ生成（UI・データ・認証の初期設定）",
        "5. Webプレビュー／エミュレータで動作確認",
        "6. Firebase Hostingへデプロイ",
        "",
        "これらの手順を実際に体験してみたい方は、以下の記事で詳しく解説しています👇",
        "",
        "{{RELATED_ARTICLE:firebase-studio-getting-started-lexia}}",
        "",
        "この記事では、Googleアカウントでのアクセス手順、ワークスペース作成とテンプレート設定、Geminiによる自動コード生成と補助操作、Firebaseサービス連携・デプロイの実例をステップごとにわかりやすくまとめています。",
        "",
        "画像提供: Google Firebase Studio ／ 引用元: https://cloud.google.com/blog/products/application-development/firebase-studio-lets-you-build-full-stack-ai-apps-with-gemini",
      ],
    },
    {
      heading: "Firebase Studioのメリット【AIがもたらす新しい開発体験】",
      body: [
        "画像提供: Google Firebase Studio ／ 引用元: https://firebase.google.com/docs/studio",
      ],
      list: [
        "ローカル環境構築が不要：ブラウザですぐ開始",
        "Geminiによる自然言語操作：設計/コード修正/テストを言語化",
        "Firebaseとの完全統合：Auth・Firestore・Hostingの接続がスムーズ",
        "Nixで高い環境再現性：VMベースの宣言的環境管理",
        "AIモード切替の柔軟性：会話型/部分実行/自律実行を使い分け",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/firebase-studio/firebase-studio-firestore-rules-preview.webp",
      imageAlt: "Firebase StudioのFirestoreルール設定とプレビュー画面",
    },
    {
      heading: "Firebase Studioの注意点・制限事項【知っておきたいリスク】",
      list: [
        "プレビュー版ゆえの不安定さと仕様変更リスク（SLAなし）",
        "無料ワークスペース上限（3つまで：プレビュー時点）",
        "AI生成コードの品質保証が必要（レビュー/テスト前提）",
        "Firebase依存による移行難易度（ロックイン可能性）",
        "大規模/複雑構成での実績・性能が未成熟",
      ],
    },
    {
      heading: "今後のアップデートと展望【Gemini時代の開発環境へ】",
      list: [
        "Gemini 2.5 / Gemma など最新モデル対応",
        "MCP拡張・CLI統合の強化（自律エージェントの深化）",
        "モバイル向けプロトタイピング体験の最適化",
        "ワークスペース制限の見直しや商用プラン拡充",
        "（可能性）開発者向けAPI公開・自動化の拡張",
      ],
    },
    {
      heading: "まとめ｜Firebase StudioはAI時代の“開発の起点”になる",
      body: [
        "Firebase Studioは『AI×開発×Firebase』を結ぶ新しい拠点です。プレビュー中ながら将来性は高く、試作・学習・新規プロジェクトの検証環境として有用です。",
        "今のうちに触れてワークフローに慣れておくことで、正式版以降の開発速度と品質に差が出ます。",
      ],
    },
    {
      heading: "参考",
      list: [
        "Firebase Studio 公式サイト",
        "https://firebase.studio/",
        "Firebase Studio 公式ドキュメント",
        "https://firebase.google.com/docs/studio",
        "Google Cloud Blog – Firebase Studio lets you build full-stack AI apps with Gemini",
        "https://cloud.google.com/blog/products/application-development/firebase-studio-lets-you-build-full-stack-ai-apps-with-gemini",
        "Firebase Blog – Introducing Firebase Studio (2025年4月発表)",
        "https://firebase.blog/posts/2025/04/introducing-firebase-studio/",
        "Licensed software in Firebase Studio",
        "https://firebase.google.com/docs/studio/oss",
        "Firebase Studio Workspaces - Getting Started",
        "https://firebase.google.com/docs/studio/get-started-workspace",
      ],
    },
  ],
})

// Append Firebase Studio Getting Started Guide (detailed tutorial)
fallbackBlogPosts.push({
  slug: "firebase-studio-getting-started-lexia",
  title: "Firebase Studioの始め方｜登録からAIプロトタイプ作成・デプロイまで完全ガイド",
  description:
    "Firebase StudioはGoogleが提供するAI統合クラウド開発環境。ブラウザだけでアプリ開発・プレビュー・デプロイまで完結します。本記事では、ワークスペース作成、Geminiの活用、Firebase連携、Hostingへの公開手順、注意点までを公式情報に基づいて解説。",
  genre: "AI",
  tags: ["Firebase", "AI", "開発環境", "チュートリアル"],
  date: "2025-10-14",
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
