import { BlogPost } from "./blog-posts.types"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "studio-ai-status-2025",
    title: "STUDIOアップデート総点検：あの「STUDIO AI」は今どこに？",
    description:
      "Studio（旧STUDIO）のプロダクト刷新とAI機能の現在地を一次情報から整理します。",
    genre: "tech",
    tags: ["Studio", "ノーコード", "AI"],
    date: "2025-10-08",
    readingTime: "6分",
    heroImage:
      "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/studio-ai-status-2025/STUDIO%20AI%E5%85%AC%E5%BC%8F%E7%99%BA%E8%A1%A8%E7%94%BB%E5%83%8F.webp",
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
    sections: [
      {
        body: [
          "Cursorがエンジニアの作業を変えたように、Onlookはデザイナーの手に“コードの自由”を与えます。ReactとTailwindのプロジェクトを“見た目で編集→即コード反映”できる点で注目を集めており、Y Combinator参加やオープンソースという背景も相まって急速に話題になっています。",
          "FramerやFigmaと似たUI面の編集体験を持ちながら、Onlookが異なるのは“リアルな開発コード”をそのまま扱う点です。デザイン上の操作が直接JSX/TSXに反映されるため、プロダクションコードとデザインの乖離を大幅に減らせます。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-desktop-app-main-interface.webp",
      },
      {
        heading: "Onlookの基本コンセプト",
        body: [
          "Onlookはしばしば“Cursor for Designers”と表現されます。Figmaのような直感的なUI編集体験とReactの実装を直結させる思想があり、デザインとコードが双方向に同期する点が最大の革新です。",
          "公式ドキュメントでは、コンポーネント編集・スタイル編集・プロジェクト読み込みのワークフローを重視しており、既存のNext.js＋Tailwindプロジェクトをそのまま取り込んで作業を開始できる点が強みとして挙げられています。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-figma-like-visual-editor.avif",
      },
      {
        heading: "主要機能①：Figmaライクなビジュアルエディタ",
        body: [
          "OnlookのWeb版エディタでは要素をドラッグ＆ドロップで配置し、色・余白・フォントなどを直感的に編集できます。編集結果は即座にJSX/TSXに反映され、コードを意識せずに見た目を調整できます。",
          "また既存のNext.js + Tailwindプロジェクトを読み込んで、その上で編集できるため、デザインから実装への移行コストが小さく済みます。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-realtime-editing-demo.gif",
      },
      {
        heading: "主要機能②：AIによる自然言語デザイン",
        body: [
          "Onlookは自然言語での指示を受け付け、Tailwindクラスやテーマ設定を理解した差分提案を生成します。例えば「このカードをシャドウ付きにして」や「フォームを2カラムにして」といった指示で、AIが適切なTailwindユーティリティやスタイルを当ててくれます。",
          "生成された結果はその場で微調整でき、デザイナーが短時間でプロダクション品質に近いUIを構築する助けになります。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-what-can-you-do-prompt.png",
      },
      {
        heading: "主要機能③：Figmaインポートとデザインシステム管理",
        body: [
          "Figmaファイルの取り込みを通じて、コンポーネントごとにReact実装へと再構築できます。デザイントークン（色・フォント・スペーシング等）を一元管理し、デザインシステムを運用するための仕組みも用意されています。",
          "これにより、デザインから実装までのブリッジがスムーズになり、チームの整合性が高まります。",
        ],
        image:
          "https://2iuxfx58zw36rxwq.public.blob.vercel-storage.com/onlook-article-images/onlook-project-creation-workflow.webp",
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
