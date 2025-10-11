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

// Append Dify post to the fallback posts array
fallbackBlogPosts.push({
  slug: "dify-overview-2025",
  title: "Dify：エージェントワークフロー基盤を徹底解説（2025年最新版）",
  description:
    "オープンソースの LLM アプリ開発プラットフォーム Dify を、アーキテクチャ・主要機能・導入・運用・ライセンス観点で整理。初学者でも理解しやすい実践ガイド。",
  genre: "tech",
  tags: ["Dify", "ワークフロー", "エージェント", "TypeScript"],
  date: "2025-10-11",
  readingTime: "7分",
  sections: [
    {
      heading: "はじめに：なぜエージェント×ワークフローか",
      body: [
        "自動化の対象が API 単体から“複数エージェントの協調”へ広がる中、対話・検索・推論・外部ツール連携を一連のフローとして設計・運用する基盤の需要が高まっています。",
        "Dify は、エージェントワークフロー、RAG、モデル管理、観測性などを統合したオープンソース基盤で、プロトタイプから本番運用までの橋渡しを狙うプロダクトです。",
      ],
    },
    {
      heading: "Dify とは",
      body: [
        "Dify は LLM アプリ開発のためのプラットフォームで、ノーコード/ローコードなフロービルダーと API を両備えします。",
        "エージェント、RAG（ナレッジベース）、モデル管理、ツール連携、実行履歴・メトリクスなどを一体で扱える点が特徴です。",
      ],
      list: [
        "UI でのワークフロー設計（分岐・ループ・並列）と、再利用可能なコンポーネント化",
        "エージェント機能：ツール呼び出しや外部 API 連携を組み込める",
        "RAG：ドキュメント取り込み・埋め込み・検索の一連管理",
        "モデル/プロバイダ管理：複数ベンダの切替・キー管理",
        "観測性：実行ログ、コスト・遅延の可視化、エラー解析",
        "自己ホスト/クラウドの両対応（用途に応じて選択可）",
      ],
    },
    {
      heading: "アーキテクチャの見取り図（要点）",
      body: [
        "Dify は“フロービルダー + 実行ランタイム + 観測性 + API/SDK”を中核に、ナレッジベースやコネクタ群を周辺に据える構成です。",
        "アプリは UI 上で定義したフローを実行し、各ステップでモデル／ツール／検索を呼び分けます。ログとメトリクスは後追い解析や品質改善に利用可能です。",
      ],
      list: [
        "Flow：分岐/ループ/並列の制御、コンポーネント化",
        "Agents：タスク分解・外部ツール連携（関数/HTTP など）",
        "Datasets（RAG）：取り込み→前処理→埋め込み→検索",
        "Connectors：ベクタDB/ストレージ/外部 API への接続",
        "Observability：実行ログ、コスト、遅延、失敗トレース",
        "API/SDK：アプリやバックエンドからの呼び出し",
      ],
    },
    {
      heading: "ライセンス上の注意（2025-10 時点）",
      body: [
        "Dify は Apache 2.0 をベースにした条件付きライセンスです。特に以下の追加条件が公表されています（最新は公式 LICENSE を参照）。",
      ],
      list: [
        "マルチテナント運用は原則不可（ワークスペース=テナント）。許諾なく複数顧客の共用基盤として提供する場合は商用ライセンスが必要。",
        "フロントエンドのロゴ/著作権表記の削除・改変は不可（web/ ディレクトリや Docker web イメージ等が該当）。",
        "上記以外は Apache 2.0 に準拠（詳細は公式 LICENSE を確認）。",
      ],
    },
    {
      heading: "主なユースケース",
      list: [
        "問い合わせ自動応答：RAG + エージェントで社内/製品知識を活用",
        "ドキュメント要約・比較：ファイル取り込み→前処理→抽出→要約",
        "業務オートメーション：API 連携を組み合わせた定型処理の自動化",
        "アナリティクス支援：データ取得→変換→可視化プロンプトの自動生成",
      ],
    },
    {
      heading: "導入手順（概要）",
      body: [
        "1) すぐ試す：Dify Cloud（サインアップで利用開始）",
        "2) 自己ホスト：Docker Compose で最短構築（公式 docs に手順）",
        "3) アプリ連携：ワークフロー/エージェントを API 経由で呼び出し",
      ],
      list: [
        "自己ホスト例：Docker / docker-compose の準備 → .env の調整 → docker compose up -d",
        "アプリからの呼び出し：バックエンドで Dify のエンドポイントに HTTP リクエスト（API Key/Workspace 指定）",
        "運用：ログ/メトリクスで品質とコストを継続評価、モデルやプロンプトを段階的にチューニング",
      ],
    },
    {
      heading: "他ツールとの比較（要点）",
      table: {
        headers: ["観点", "Dify", "Flowise", "LangGraph"],
        rows: [
          ["形態", "プラットフォーム+UI", "ローコード/ビルダー", "ライブラリ（コードベース）"],
          ["導入難易度", "低（UI 中心）", "低〜中", "中（設計自由度が高い）"],
          ["観測・運用", "標準で充実", "一部拡張次第", "実装者設計次第"],
          ["自己ホスト", "可能（公式手順あり）", "可能", "可能"],
          ["商用利用", "条件付き Apache 2.0", "OSS（要確認）", "OSS（要確認）"],
        ],
      },
    },
    {
      heading: "運用のコツ・ベストプラクティス",
      list: [
        "フェイルセーフ設計：タイムアウト/リトライ/補償処理を明示",
        "ログと可観測性：コスト・遅延・失敗率を継続モニタリング",
        "データ/プライバシー：PII の取り扱い、保存期間、暗号化の方針を明確に",
        "スケーリング：キュー/並列度/レート制御を段階的に調整",
        "権限/鍵管理：API Key の保護、最小権限、キーのローテーション",
      ],
    },
    {
      heading: "最近のトピック",
      body: [
        "ワークフローのファイルアップロード対応など、実用性を高める改良が継続。具体的な変更点はリリースノート/ブログを参照してください。",
      ],
    },
    {
      heading: "まとめ",
      body: [
        "Dify は“つくって回す”ための現実解を提供するプラットフォームです。UI ベースの設計と API 連携を両立でき、PoC から本番までの移行をスムーズにします。",
        "一方で、ライセンスの追加条件（マルチテナント/ロゴ表記）と、組織のセキュリティ・データガイドライン整合を事前に確認すると安心です。",
      ],
    },
    {
      heading: "参考リンク",
      list: [
        "GitHub: langgenius/dify",
        "https://github.com/langgenius/dify",
        "Documentation（英語）",
        "https://docs.dify.ai",
        "Dify Cloud",
        "https://cloud.dify.ai",
        "Self-hosting（公式手順）",
        "https://docs.dify.ai/getting-started/install-self-hosted",
      ],
    },
  ],
})
