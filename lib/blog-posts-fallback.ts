import { BlogPost } from "./blog-posts.types"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "infisical-introduction",
    title: "Infisical: オープンソースのシークレット管理プラットフォーム",
    description: "GitHubでトレンドになっているInfisicalは、開発チームとインフラストラクチャ全体でシークレットを同期し、シークレットの漏洩を防ぐためのオープンソースプラットフォームです。この記事では、Infisicalの主な機能と始め方について解説します。",
    genre: "tech",
    tags: ["Infisical", "セキュリティ", "オープンソース"],
    date: "2025-10-09",
    readingTime: "5分", // Placeholder, will be recalculated
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
  genre: "trends",
    tags: ["Studio", "ノーコード", "AI"],
    date: "2025-10-08",
    readingTime: "6分",
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
    readingTime: "8分",
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
  {
    slug: "stremio-web-overview",
    title: "Stremio / stremio-web とは？技術的価値と合法性・リスクを徹底解説 — 将来性も含めて",
    description:
      "動画体験の統合を実現するStremioとstremio-webの技術的構造、合法性、安全対策、そして将来性を包括的に解説します。",
    genre: "tech",
    tags: ["Stremio", "stremio-web", "ストリーミング", "オープンソース", "セキュリティ"],
    date: "2025-10-08",
  readingTime: "約10分",
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stremio/article-super.webp",
  heroImageAlt: "Stremio に関する記事のメインビジュアル",
    sections: [
      {
        heading: "はじめに：動画体験の分散を統合したいニーズ",
        body: [
          "YouTube、Netflix、Amazon Prime、Disney+…現代では動画配信サービスが乱立し、「どこで観られるのか」を探すだけでも一苦労です。",
          "そんな中、複数サービスをひとつにまとめて視聴できたらという発想から生まれたのが Stremio（ストレミオ） です。特にそのWeb版インターフェースを担う stremio-web は、動画視聴体験を統合する次世代のUIとして注目を集めています。",
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stremio/Screenshot-2023-08-16-at-18.08.46-1024x595.webp",
        imageAlt: "Stremio のスクリーンショット（UIの一部）",
      },
      {
        heading: "Stremio / stremio-web の基本構造と役割",
        body: [
          "Stremioは、映画やドラマなどのメタデータ（作品情報・配信先リンクなど）を収集し、「どのサービスで視聴できるのか」を一覧化するコンテンツ・アグリゲータ（統合プラットフォーム）です。",
          "💡 Wikipediaでは \"semi–open-source content aggregator\" と紹介されており、部分的にオープンソースとして開発が進められています。",
          "一方で、stremio-web はStremioのフロントエンド（Web UI）を構成するリポジトリです。作品リスト表示、検索、詳細画面、アドオンとの通信など、ユーザーが実際に操作する部分を担当しています。",
          "Stremio自体は動画データをホストせず、あくまで「情報をまとめる・ストリーム元へ橋渡しする」仕組みを提供しています。この中立的な設計が、合法的な利用を可能にしています。",
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stremio/Stremio-logo-dark-background-1024x570.webp",
        imageAlt: "Stremio のロゴ（ダーク背景）",
      },
      {
        heading: "できること・実際の機能",
        table: {
          headers: ["機能", "説明", "利用者にとっての価値"],
          rows: [
            [
              "複数ソース統合",
              "YouTube、Twitch、公式VODサービス、Add-on経由の独自ソースを統合",
              "配信先を探す時間を削減",
            ],
            [
              "作品検索とレコメンド",
              "タイトル検索・関連作品表示",
              "見逃し防止・新作発見",
            ],
            [
              "視聴履歴／ライブラリ管理",
              "観た作品・お気に入りの登録・再開",
              "デバイスをまたいでも管理できる",
            ],
            [
              "ブラウザアクセス対応",
              "Web上で直接再生可能（インストール不要）",
              "利便性・軽快な操作",
            ],
            [
              "拡張Add-on対応",
              "外部開発者が新ソースを追加可能",
              "柔軟な拡張性・コミュニティ貢献",
            ],
            [
              "字幕・メタデータ取得",
              "作品情報・字幕ファイルの取得",
              "視聴体験の向上",
            ],
          ],
        },
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stremio/Endavo-BlogGraphic-230901-StreamingPlatformsCompleteGuide-1200x628-V1-1024x536.jpg",
        imageAlt: "複数のストリーミングプラットフォームを比較したグラフィック",
      },
      {
        heading: "技術的価値と恩恵：開発者・社会にとっての可能性",
        body: [
          "【開発者にとっての意義】",
          "・構造設計の学習素材 - stremio-webはUI層とバックエンド（データ処理・Add-on連携）を明確に分離しており、モジュール設計の良い教材になります。",
          "・拡張性の高いアーキテクチャ - Add-onによるプラグイン形式の拡張は、新しい配信サービスやAPI統合を容易にし、スケールしやすい構造です。",
          "・ハイブリッド設計の参考 - Web UIとネイティブアプリを組み合わせた構成は、モバイル・PC間のUI統一にも応用可能です。",
          "・セキュリティ設計の意識向上 - 後述の字幕脆弱性問題「Hacked in Translation」など、現代のストリーミング開発に欠かせない安全設計の重要性を示しています。",
        ],
        list: [
          "動画プラットフォームの統合体験を提供し、視聴効率を改善",
          "合法なコンテンツ連携を進めることで、正規ストリーミング利用の普及を促進",
          "ブラウザ対応による誰でも使いやすいUXの提供",
          "各国・地域の配信サービスをアドオンで追加する柔軟性により、ローカル文化にも対応可能",
        ],
      },
      {
        heading: "合法性・リスク：使う上での注意点と安全対策",
        body: [
          "【1. 合法性のポイント】",
          "Stremio自体は合法ですが、利用するアドオンが配信元の著作権を侵害する可能性があるため注意が必要です。アドオンによっては非公式なコンテンツを扱う場合もあるため、信頼できるソースの利用が推奨されます。",
          "",
          "【2. Stremioの免責構造】",
          "Stremio公式の利用規約では「提供するのはコンテンツのメタデータ・リンク情報であり、ストリーム元の責任は負わない」と明記されています。このため、違法配信を扱うAdd-onを利用する場合はユーザーの自己責任となります。",
          "",
          "【3. 地域ごとの法規制】",
          "著作権法は国によって異なります。たとえば、海外では視聴が認められる作品でも、日本国内では違法となるケースもあります。",
          "",
          "【4. 推奨される安全な使い方】",
        ],
        list: [
          "公式Add-onのみ使用",
          "信頼できる字幕ソースのみ利用",
          "ソフトウェアを常に最新に保つ",
          "VPN利用でプライバシーを保護する",
        ],
      },
      {
        heading: "セキュリティ視点：「Hacked in Translation」脆弱性とは",
        body: [
          "2024年に公開された研究論文 \"Hacked in Translation — From Subtitles to Complete Takeover\" により、悪意ある字幕ファイルを読み込むことでメディアプレイヤーが乗っ取られる脆弱性が報告されました。StremioやVLCなど複数のプレイヤーが対象とされ、字幕取得プロセスのセキュリティ強化が求められています。",
          "",
          "この問題を防ぐには以下の対策が有効です：",
        ],
        list: [
          "信頼できる字幕リポジトリを利用する",
          "外部字幕の自動取得を無効化する",
          "定期的なソフトウェアアップデートを行う",
          "研究元： https://arxiv.org/abs/2408.00502 (arXiv.org \"Hacked in Translation\")",
        ],
        image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stremio/1_xWN8xkAxo1qnQt9BoKaOdQ.jpg",
        imageAlt: "字幕脆弱性に関する参考図",
      },
      {
        heading: "将来性・展望：Stremioが描く次のフェーズ",
        list: [
          "公式Add-onの拡充 - 正規配信サービス（Netflix, Disney+, Huluなど）との連携が進めば、合法的統合プラットフォームとしての地位が高まる。",
          "AIレコメンド機能の強化 - 視聴履歴を活用したAIによる自動おすすめ機能が実装されれば、ユーザーエクスペリエンスがさらに向上する。",
          "セキュリティ・ガバナンスの進化 - 字幕攻撃や不正Add-on対策を継続し、安全性を高めたエコシステムの確立が期待される。",
          "地域連携・ローカル化対応 - 各国独自の配信文化に合わせたAdd-on展開で、グローバルかつローカルな両軸の発展が見込まれる。",
        ],
      },
      {
        heading: "まとめ：Stremio / stremio-web をどう扱うか",
        body: [
          "Stremio / stremio-web は、「動画視聴をもっとシンプルに、もっと自由に」するための新しいメディア統合基盤です。",
          "",
          "ただし、その自由さゆえに利用の仕方を誤ると違法視聴やセキュリティリスクを招く恐れもあります。記事として扱う際、また利用する際は以下の点を守ることが重要です。",
        ],
        list: [
          "Stremio自体は合法であるが、Add-on利用には注意が必要",
          "違法コンテンツを推奨・誘導しない",
          "安全性（字幕・VPN・更新）を確保して利用する",
          "正規Add-on・オープンソース文化を尊重する",
        ],
      },
      {
        heading: "",
        body: [
          "Stremio / stremio-web は、「合法的で安全なメディア統合の未来」を示すオープンソースの好例です。開発者にとっても、ユーザーにとっても、\"次世代の動画体験\" の可能性を探る学びのプラットフォームと言えるでしょう。",
        ],
      },
      {
        heading: "参考リンク",
        list: [
          "Stremio 公式サイト",
          "https://www.stremio.com/",
          "",
          "Stremio / stremio-web GitHub リポジトリ",
          "https://github.com/Stremio/stremio-web",
          "",
          "Stremio Wikipedia 記事",
          "https://en.wikipedia.org/wiki/Stremio",
          "",
          "arXiv: Hacked in Translation (2024)",
          "https://arxiv.org/abs/2408.00502",
          "",
          "Stremio 利用規約",
          "https://www.stremio.com/tos",
        ],
      },
    ],
  },
  
]

// Append Stagehand post to the fallback posts array
fallbackBlogPosts.push({
  slug: "stagehand-explained",
  title: "Stagehand：PlaywrightとAIが融合した次世代ブラウザ自動化フレームワークの全貌",
  description:
    "Playwright と AI を組み合わせたハイブリッド自動化フレームワーク Stagehand の特徴、アーキテクチャ、活用シーンを整理します。",
  genre: "tech",
  tags: ["Stagehand", "Playwright", "自動化", "AI"],
  date: "2025-10-10",
  readingTime: "5分",
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stagehand/browserbase-stagehand-illustration.webp",
  heroImageAlt: "Stagehand（ブラウザ自動化とAIの統合）を表す概念図",
  sections: [
    {
      heading: "はじめに：ブラウザ自動化の新たな可能性",
      body: [
        "Stagehand は Playwright を置き換えるのではなく、その上に AI を使った抽象化レイヤーを重ねる拡張フレームワークです。",
        "コードと自然言語のハイブリッドな指示を両立させることで、保守性と柔軟性を両立した自動化体験を提供します。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stagehand/f46ea1b8-f011-4c66-a65c-8c2ff411ef17_1200x630.png",
      imageAlt: "Stagehand のイントロダクションイメージ（概念図）",
    },
    {
      heading: "従来の課題を解決するハイブリッドアプローチ",
      body: [
        "従来の E2E テストやスクレイピングはセレクタや DOM 変化に弱く、AI は柔軟だが安定性に課題がありました。",
        "Stagehand は「精密なコードの再現性」と「自然言語 AI の柔軟性」を統合することで、両者の長所を活かします。",
      ],
    },
    {
      heading: "Stagehand の核となる4つの機能",
      list: [
        "act：自然言語によるアクション実行 — 英語での指示をブラウザ操作に変換",
        "observe：アクションのプレビューとキャッシュ化 — 実行前の確認と再利用で安定性を確保",
        "extract：構造化データの抽出 — 自然言語と Zod スキーマを組み合わせた型安全な抽出",
        "agent：多段階の自律タスク実行 — 複雑な目標を段階的に実行（v2 での追加機能）",
      ],
    },
    {
      heading: "act：自然言語でのブラウザ操作",
      body: [
        "act() は Stagehand の中心的メソッドで、\"Click the login button\" のような自然言語を解析して最適な DOM 操作を実行します。",
        "UI が多少変わっても壊れにくい点が特徴です。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stagehand/stagehand.jpg",
      imageAlt: "Stagehand の act 機能の操作イメージ",
    },
    {
      heading: "observe とキャッシュ：安定性の強化",
      body: [
        "observe() によるアクションの事前プレビューと、それを保存して再利用するキャッシュ設計により、AI の予測不確実性を低減し、再現性を高めます。",
      ],
    },
    {
      heading: "extract：Zod スキーマと自然言語による抽出",
      body: [
        "Zod のスキーマを使い、自然言語ベースの指示と組み合わせて構造化データを取り出せます。",
        "例：",
      ],
      list: [
        "const schema = z.object({ title: z.string(), price: z.number() })",
        "const data = await stagehand.extract({ schema, prompt: \"Extract all product titles and prices from the page\" })",
      ],
    },
    {
      heading: "技術アーキテクチャと構成",
      body: [
        "Stagehand は MIT ライセンスのオープンソースで、モノレポ構成で管理されます。",
        "主要技術：TypeScript, Playwright, React, Next.js, Tailwind CSS, Bun, Drizzle, Zod。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stagehand/gradii-1920x1080--4-.webp",
      imageAlt: "Stagehand のアーキテクチャ図",
    },
    {
      heading: "他ツールとの比較",
      table: {
        headers: ["比較項目", "Playwright/Selenium", "純 AI エージェント", "Stagehand"],
        rows: [
          ["操作精度", "高い", "中程度", "高い"],
          ["柔軟性", "低い", "高い", "高い"],
          ["UI 変更への耐性", "弱い", "中程度", "強化済み"],
          ["再現性", "安定", "不安定", "安定（キャッシュ機構）"],
        ],
      },
    },
    {
      heading: "活用シーンと将来性",
      list: [
        "E2E テスト自動化",
        "Web スクレイピング",
        "業務・データ収集の自動化",
        "QA／RPA シナリオの効率化",
      ],
    },
    {
      heading: "まとめ：AI 時代のブラウザ自動化がここから始まる",
      body: [
        "Stagehand はコードベース制御と AI の自律的判断を組み合わせた次世代フレームワークです。",
        "自然言語での操作、構造化抽出、キャッシュ機構により実運用に耐える安定性と柔軟性を備えています。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/Stagehand/stagehand2.jpg",
      imageAlt: "Stagehand の利用イメージ（まとめ）",
    },
    {
      heading: "参考リンク",
      list: [
        "Stagehand 公式サイト — https://stagehand.dev/",
        "Stagehand GitHub リポジトリ — https://github.com/browserbase/stagehand",
        "Stagehand 公式ドキュメント — https://docs.stagehand.dev/",
        "Browserbase 公式サイト — https://www.browserbase.com/",
      ],
    },
  ],
})

// Append Lobe Chat post to the fallback posts array
fallbackBlogPosts.push({
  slug: "lobe-chat-overview",
  title: "Lobe Chat完全ガイド：複数AI・ナレッジベース・MCPで“自社エージェント”を構築する方法",
  description:
    "GitHubトレンド上位のLobe Chatを検証。OpenAI / Claude / Gemini / DeepSeek / Ollama対応、ナレッジベース・Artifacts・MCPプラグイン・セルフホスト手順を公式情報をもとに整理。",
  genre: "tech",
  tags: ["AI", "MCP", "RAG"],
  date: "2025-10-14",
  readingTime: "8分",
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lobe-chat/lobe-chat-overview-hero.webp",
  heroImageAlt: "Lobe Chat のメインビジュアル（公式提供画像）",
  sections: [
    {
      heading: "この記事でわかること",
      list: [
        "Lobe Chatとは何か",
        "主な特徴・機能・技術構成",
        "MCPプラグイン・Artifacts・ナレッジベースの実装概要",
        "セルフホスト（Vercel／Docker）構成の基本",
        "今後の開発動向とビジネス活用の方向性",
      ],
      body: [
        "本記事は一次情報（公式GitHubリポジトリ・公式ドキュメント）をもとに構成しています。",
        "出典： https://github.com/lobehub/lobe-chat",
      ],
    },
    {
      heading: "Lobe Chatとは",
      body: [
        "Lobe Chat は、複数のAIモデルを切り替えて利用できるオープンソースのチャットアプリケーションフレームワークです。開発は LobeHub チームによって行われており、Next.js と TypeScript で構築されています。",
        "公式READMEの説明： An open-source, extensible AI chat framework supporting OpenAI, Claude, Gemini, DeepSeek, Ollama, and more.",
        "複数プロバイダ対応・セルフホスト可能・拡張性重視が大きな特徴で、UIはチャット形式で直感的に操作できます。",
      ],
    },
    {
      heading: "1. 複数AIプロバイダに対応（マルチLLM）",
      body: [
        "2025年10月時点の標準サポート例：OpenAI（GPT-4/4o）、Claude 4、Gemini、DeepSeek、Ollama（ローカルLLM）、Qwen など。",
        "環境変数として各APIキーを設定するだけで利用可能（例）：",
        "OPENAI_API_KEY=sk-xxxx",
        "ANTHROPIC_API_KEY=sk-xxxx",
        "GEMINI_API_KEY=sk-xxxx",
        "用途別に複数モデルの比較検証や切り替えが容易です。",
      ],
    },
    {
      heading: "2. MCP（Model Context Protocol）による拡張性",
      body: [
        "MCPはAIモデルが外部リソースへ安全にアクセスするための拡張プロトコルで、Lobe Chatはこれに対応しています。",
        "MCPマーケットプレイスからのワンクリック導入に関する記載が公式READMEにあります。",
        "プラグインにより機能拡張（自作含む）が可能で、データベース／外部API連携などの拡張余地があります。",
        "注：現時点で特定SaaS（例：Google Drive／Notion）との公式統合が標準提供と断定できる明記はなく、MCPにより拡張可能な設計として理解するのが正確です。",
      ],
    },
    {
      heading: "3. Artifacts（生成成果物）の保存と再利用",
      body: [
        "AIが生成したコード・文章・画像をArtifactsとして保存・一覧化し、チャット中に作成した成果物を右サイドで管理できます。",
        "コードや文書を再利用しやすいUIで、作業履歴を『生成物』として資産化できます。",
        "詳細： https://lobehub.com/docs/usage/features/artifacts",
        "出典（画像）：LobeHub Changelog - Artifacts Update",
        "ライセンス：LobeHub 公式提供画像",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lobe-chat/lobe-chat-artifacts-feature.webp",
      imageAlt: "Lobe Chat の Artifacts 機能イメージ（公式提供）",
    },
    {
      heading: "4. ナレッジベースとRAG対応",
      body: [
        "出典（図解）：Qdrant - What is RAG in AI",
        "ライセンス：教育目的での利用可（要出典明記） — https://qdrant.tech/articles_data/what-is-rag-in-ai/how-rag-works.jpg",
      ],
      list: [
        "PDF／Markdown／TXTなどのドキュメントをアップロードしてRAGで参照",
        "アップロードした独自データに基づくQA",
        "ベクトル検索で文脈把握し、自社マニュアルやFAQに強いエージェントを構築",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lobe-chat/lobe-chat-rag-knowledge-base.webp",
      imageAlt: "RAG（Retrieval-Augmented Generation）の仕組み概念図（Qdrant 提供）",
    },
    {
      heading: "5. セルフホスト構成（Docker／Vercel対応）",
      body: [
        "Lobe Chatはセルフホストでも稼働します。公式READMEではVercelとDockerの両対応が記載されています。",
        "Vercelでのデプロイ例（概念）：",
        "git clone https://github.com/lobehub/lobe-chat",
        "cd lobe-chat",
        "vercel deploy",
        "Dockerでの実行例（概念）：",
        "docker pull lobehub/lobe-chat:latest",
        "docker run -d -p 3000:3000 -e OPENAI_API_KEY=sk-xxxx lobehub/lobe-chat:latest",
        "起動後は http://localhost:3000 にアクセス。Next.js製のUIが表示されます。",
        "※環境変数仕様はリリースによって変わる可能性があります。最新のSelf-Hostingガイド： https://lobehub.com/docs/deployment/self-hosting",
      ],
    },
    {
      heading: "技術構成",
      table: {
        headers: ["カテゴリ", "使用技術"],
        rows: [
          ["フロントエンド", "Next.js / React / Tailwind CSS"],
          ["バックエンド", "Node.js / TypeScript"],
          ["認証", "OAuth2 / APIキー"],
          ["データベース", "Supabase（β版サポート）"],
          ["デプロイ", "Vercel / Docker"],
          ["AIモデル連携", "OpenAI / Claude / Gemini / DeepSeek / Ollama / Qwen"],
          ["拡張", "MCPプラグイン / RAG検索 / Artifacts保存"],
        ],
      },
    },
    {
      heading: "今後の開発動向（2025年10月時点）",
      body: [
        "公式のReleasesによると、v1.135.2（2025年10月6日リリース）が最新です。",
      ],
      list: [
        "MCP Marketplaceの拡張",
        "Realtime APIによる音声入力・ストリーミング応答",
        "チーム共有／マルチユーザー対応",
        "ナレッジベースUIの改良",
      ],
    },
    {
      heading: "Lobe Chatのビジネス活用：ユースケース",
      list: [
        "社内ドキュメント検索AI",
        "顧客サポート用チャットボット",
        "AIライティング補助・レビュー",
        "コードレビュー支援",
        "RAG × プロジェクトナレッジ活用",
      ],
    },
    {
      heading: "LEXIA的観点からの応用",
      list: [
        "Supabase連携で『プロジェクト情報 × 会話UI』",
        "MCPで社内DBや外部APIに安全アクセス（自作プラグイン）",
        "Artifactsで制作物を再利用・検証可能に",
      ],
    },
    {
      heading: "関連動画（YouTube）",
      body: [
        "LobeChat: Free Open Source LLM Platform — https://www.youtube.com/watch?v=2bjkx3QFOQo",
        "出典：YouTube - LobeChat: Free Open Source LLM Platform",
        "ライセンス：YouTube標準ライセンス（埋め込み・引用可）",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/lobe-chat/lobe-chat-youtube-thumbnail.webp",
      imageAlt: "YouTube サムネイル：LobeChat: Free Open Source LLM Platform",
    },
    {
      heading: "まとめ",
      list: [
        "複数AIモデル統合（OpenAI／Claude／Gemini等）",
        "MCPによるプラグイン拡張性",
        "ナレッジベース × RAG対応",
        "セルフホスト・プライベート運用対応",
      ],
      body: [
        "オープンソースの自由度と実運用性を両立しており、“自社AIエージェント構築基盤”として検討する価値があります。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "公式サイト",
        "https://lobehub.com/",
        "公式リポジトリ",
        "https://github.com/lobehub/lobe-chat",
        "公式ドキュメント",
        "https://lobehub.com/docs",
        "最新リリース",
        "https://github.com/lobehub/lobe-chat/releases",
      ],
    },
  ],
})


// Append XYFlow post to the fallback posts array
fallbackBlogPosts.push({
  slug: "xyflow-overview-2025",
  title: "XYFlow（React Flow 後継）入門：モダンなノード・グラフエディタをプロダクションへ",
  description:
    "GitHub トレンド入りの XYFlow を一次情報ベースで整理。主要機能、活用シーン、導入手順、運用のコツをまとめました。",
  genre: "tech",
  tags: ["XYFlow", "React Flow", "グラフ", "ノードエディタ"],
  date: "2025-10-11",
  readingTime: "6分",
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/xyflow/xyflow-playground-screenshot.webp",
  heroImageAlt: "XYFlow Playground のスクリーンショット",
  sections: [
    {
      heading: "はじめに：なぜいま XYFlow が注目？",
      body: [
        "ワークフロー・データフロー・オートメーションなど、ノードとエッジで表現する UI 需要が急増しています。XYFlow は React Flow の流れを汲むモダンなグラフエンジンで、実装とデザインの両立、拡張性、開発体験の良さが評価され GitHub トレンド入りしています。",
        "本記事では XYFlow のコア機能と導入方法、プロダクションでの運用ポイントを初学者にも分かる形で整理します。",
      ],
    },
    {
      heading: "XYFlow とは",
      body: [
        "XYFlow は、キャンバス上にノード（処理単位）とエッジ（接続）を配置して、対話的にフローを構築できるオープンソースの UI コンポーネント群です。",
        "拡張が容易で、カスタムノード・独自のエッジ形状・コンテキストメニュー・ズーム/パン・スナップなど、実用的な機能が標準で揃います。",
      ],
      list: [
        "React を中心に、他フレームワーク向けアダプタも整備が進行",
        "ドラッグ＆ドロップ、ズーム/パン、選択、スナップなどの基本操作",
        "カスタムノード/エッジの拡張 API と豊富なイベント",
        "レイアウト、マルチビュー、ミニマップなどの UX 補助",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/xyflow/react-flow-animated-example.gif",
      imageAlt: "XYFlow/React Flow 系のアニメーション動作例",
    },
    {
      heading: "主なユースケース",
      list: [
        "業務フロー/オートメーションのビルダー UI（IFTTT 的な体験）",
        "データパイプライン/ETL、IoT のシグナル伝搬可視化",
        "ゲーム/クリエイティブツールのノードベース編集",
        "コーディング教育/可視化、AI エージェントのプラン表示",
      ],
    },
    {
      heading: "導入（React の例）",
      body: [
        "1) パッケージを追加",
        "npm i @xyflow/react",
        "2) ベースとなるコンポーネントを配置（最小構成）",
        "import { ReactFlow } from '@xyflow/react'",
        "export default function Graph() { return <div style={{height:400}}><ReactFlow /></div> }",
        "3) 状態制御：nodes, edges, onNodesChange, onEdgesChange を useState/useCallback で制御し、コントロール可能な描画に",
        "4) カスタムノード/エッジやミニマップ、背景グリッドを必要に応じて追加",
      ],
    },
    {
      heading: "開発・運用のコツ（プロダクション視点）",
      list: [
        "制御型（controlled）で状態を一元管理：コラボや Undo/Redo に強い",
        "仮想化/可視範囲の工夫：ノード数が多い場合のパフォーマンス確保",
        "レイアウトは段階的に：自動整列（Dagre など）と手動調整の併用",
        "永続化は差分保存：全量よりも操作差分（op）で履歴/スナップショット",
        "アクセシビリティ：キーボード操作とフォーカスリングを明確に",
      ],
    },
    {
      heading: "他ツールとの比較（要点）",
      table: {
        headers: ["観点", "XYFlow", "D3.js", "GoJS/商用"],
        rows: [
          ["学習/導入コスト", "低〜中（React 前提）", "中（自由度高い）", "中（ドキュメント充実）"],
          ["拡張性", "高い（カスタム容易）", "最高（生DOM制御）", "高い（機能多い）"],
          ["速度/描画", "実運用十分", "最適化次第", "最適化済み"],
          ["ライセンス", "OSS（要確認）", "OSS", "商用ライセンス"],
        ],
      },
    },
    {
      heading: "よくある落とし穴",
      list: [
        "巨大グラフを一気に描画→初回コストが跳ねる：段階的レンダリングを",
        "カスタムノードの再レンダリング頻発：memo 化や選択的更新を徹底",
        "座標/スケールの取り扱い：ズーム時のヒットテスト/座標変換に注意",
        "ドラッグ操作とスクロール/選択の競合：優先度とハンドラ設計を整理",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "XYFlow は“つくりやすさ”と“拡張性”を両立したグラフ/ノードエディタ基盤です。PoC からプロダクションまでスムーズに繋げやすく、開発速度と UI 品質を両立できます。",
        "業務フローやデータフローの可視化が求められるプロジェクトで、まず検討すべき選択肢の一つと言えるでしょう。",
      ],
    },
    {
      heading: "ブランドロゴ（ダーク）",
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/xyflow/xyflow-logo-dark.svg",
      imageAlt: "XYFlow ロゴ（ダークバージョン）",
    },
    {
      heading: "ブランドロゴ（ライト）",
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/xyflow/xyflow-logo-light.svg",
      imageAlt: "XYFlow ロゴ（ライトバージョン）",
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: xyflow/xyflow",
        "https://github.com/xyflow/xyflow",
        "ドキュメント/サイト（該当する場合）",
        "https://xyflow.com/",
      ],
    },
  ],
})

// Append LanceDB post to the fallback posts array
fallbackBlogPosts.push({
  slug: "lancedb-vector-search-guide",
  title: "LanceDBとは？Rust製の高速ベクトルデータベースを徹底検証【Python/AI検索時代の新選択肢】",
  description:
    "オープンソースのベクトルデータベース「LanceDB」を解説。Python・JavaScript対応、マルチモーダル検索、ハイブリッドクエリなど、公式情報と実証例をもとに特徴と活用方法を整理します。",
  genre: "tech",
  tags: ["AI", "VectorDB", "Rust", "Python", "Database"],
  date: "2025-10-14",
  readingTime: "7分",
  heroImage: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/LanceDB/vector-db-architecture.webp",
  heroImageAlt: "ベクトルデータベースのアーキテクチャ概念図",
  sections: [
    {
      heading: "この記事でわかること",
      list: [
        "LanceDBの基本構造と特徴",
        "Pythonからの導入・検索実行方法",
        "他のベクトルDB（Milvus・Weaviate・Pinecone等）との比較",
        "実運用上の注意点と現状の制約",
        "今後の開発ロードマップと展望",
      ],
      body: [
        "本記事はGoogleアドセンス審査に準じ、LanceDB公式ドキュメント・GitHub README・ベンチマークリポジトリ（prrao87/lancedb-study）を参照した一次情報ベースの内容です。",
      ],
    },
    {
      heading: "1. LanceDBとは？",
      body: [
        "LanceDB は、Rustで実装されたオープンソースのベクトルデータベースで、テキスト・画像・動画・ポイントクラウドなどのマルチモーダルデータを効率的に扱うことを目的としています。",
        "特徴的なのは『軽量・ローカル実行可能・Python/JS対応』という設計思想。クラウド依存を避け、AI検索や類似度計算を自前で実装したい開発者層に人気を集めています。",
        "出典（GitHub README）：https://github.com/lancedb/lancedb",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/LanceDB/lancedb-logo.webp",
      imageAlt: "LanceDB ロゴ",
    },
    {
      heading: "2. 主な機能と設計上の特徴",
      table: {
        headers: ["機能", "説明"],
        rows: [
          ["ベクトル検索", "L2距離・コサイン類似度・内積・ハミング距離などの距離尺度をサポート"],
          ["ハイブリッド検索", "ベクトル検索とSQL/全文検索(FTS)を組み合わせ可能"],
          ["自動バージョン管理", "データセットの更新履歴を自動で保持"],
          ["Python / TypeScript SDK", "それぞれ公式ドキュメントでサンプルコードを提供"],
          ["GPUインデックス構築（試験的）", "一部の構成でGPUを用いたインデックス最適化をサポート（実装範囲は限定的）"],
        ],
      },
      body: [
        "🔍 アーキテクチャの特徴",
      ],
      list: [
        "Rust製コア：高速かつメモリ効率の良い設計",
        "Lanceフォーマット：列指向・バージョン管理可能なLanceファイルとして永続化",
        "ゼロコピー設計：可能な範囲でメモリコピーを削減",
        "ローカル運用対応：クラウド接続不要、Docker不要で手軽に開始可能",
      ],
    },
    {
      heading: "埋め込みの可視化（Embedding Visualization）",
      body: [
        "ベクトル検索の直感を掴むために、埋め込み空間を可視化すると近傍の関係性が把握しやすくなります。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/LanceDB/embedding-visualization.webp",
      imageAlt: "埋め込み空間の可視化イメージ",
    },
    {
      heading: "3. 競合ベクトルデータベースとの比較",
      table: {
        headers: ["プロジェクト", "強み", "弱み", "主な用途"],
        rows: [
          ["LanceDB", "軽量・ローカル実行・Python統合性", "分散構成未対応・成熟度発展途上", "小〜中規模のAI検索・PoC"],
          ["Milvus", "クラスタ対応・豊富なAPI", "初期設定が重い", "大規模システム"],
          ["Weaviate", "クラウド対応・ハイブリッド検索", "無料枠制限あり", "AI SaaS構築"],
          ["Pinecone", "SaaS型で導入容易", "完全クラウド依存", "MVP開発・スピード重視"],
        ],
      },
      body: [
        "補足：LanceDBは『スケーラブル』という表現を用いていますが、現時点でクラスタ分散機能は公式に実装されていません（2025年10月時点）。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/LanceDB/vector-db-comparison.webp",
      imageAlt: "ベクトルデータベースの比較チャート",
    },
    {
      heading: "参考：ベクトル構造（Qdrantの例）",
      body: [
        "ベクトルDBの内部構造を理解する補助として、Qdrantのベクトル構造イメージを参考に掲載します。",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/LanceDB/qdrant-vector-structure.webp",
      imageAlt: "Qdrant におけるベクトル構造の概念図",
    },
    {
      heading: "4. Pythonでの基本的な使い方",
      body: [
        "公式クイックスタート（LanceDB Docs）を基にした最小サンプルです： https://lancedb.com/docs/quickstart/basic-usage/",
        "```python",
        "import lancedb",
        "import numpy as np",
        "",
        "# データベースを作成",
        "db = lancedb.connect(\"./example_lancedb\")",
        "",
        "# データセットを作成",
        "table = db.create_table(\"embeddings\", data=[",
        "  {\"id\": 1, \"vector\": np.random.rand(128).tolist(), \"label\": \"cat\"},",
        "  {\"id\": 2, \"vector\": np.random.rand(128).tolist(), \"label\": \"dog\"}",
        "])",
        "",
        "# クエリ実行",
        "results = table.search(np.random.rand(128).tolist()).limit(3).to_df()",
        "print(results)",
        "```",
      ],
      image: "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/LanceDB/rust-python-integration.webp",
      imageAlt: "Rust コアと Python 統合の概念図",
    },
  ],
})
