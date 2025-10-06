import { BlogPost } from "./blog-posts.types"

export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "kickoff-lexia-blog",
    title: "LEXIA BLOGスタート。地域密着で届けるWEB制作のリアル",
    description:
      "WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。",
    genre: "ideas",
    tags: ["Next.js", "Vercel", "Notion"],
    date: "2024-05-01",
    readingTime: "5分",
    sections: [
      {
        body: [
          "WEB制作事業LEXIAがWEB制作技術やITの最新トレンドを発信します。",
          "このブログでは、制作の裏側、ツールの活用法、地域ビジネスが成果を伸ばすためのポイントなど、実務で蓄積した知見を惜しみなく公開していきます。制作環境ではNext.jsとNotionを軸に情報整理を行い、Vercelのプレビューを通じて進行を透明化する取り組みも紹介していく予定です。",
        ],
      },
      {
        heading: "これから発信していくテーマ",
        list: [
          "制作事例から学ぶ集客改善のヒント",
          "低予算でも成果につなげるサイト改善のコツ",
          "ローカルビジネスのための最新SEO・MEO情報",
          "LEXIAの制作体制やツール選定の裏側",
        ],
        body: [
          "単なる情報発信ではなく、読んでくださった方がすぐに実践できるような内容にこだわります。質問もお気軽にお寄せください。",
        ],
      },
      {
        heading: "地域に根ざしたWEB制作事業として",
        body: [
          "私たちは、一社一社の課題に合わせた柔軟な提案を大切にしています。ブログを通じてLEXIAのスタンスを知っていただき、気軽に相談してもらえる関係づくりを目指します。",
          "次回以降の記事では、早速プロジェクトの進め方やリサーチ手法などを深掘りしていく予定です。ぜひ更新を楽しみにしていてください。",
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
    tags: ["Onlook", "React", "Tailwind", "デザインツール", "AI"],
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
    ],
  },
  {
    slug: "local-seo-checklist-2024",
    title: "2024年版：ローカルSEOで押さえるべき7つのチェックポイント",
    description:
      "地域ビジネスがGoogleで選ばれるために、今すぐ取り組めるローカルSEOの実践チェックリストをまとめました。",
    genre: "tech",
    tags: ["Googleビジネスプロフィール", "Googleマップ", "Google検索"],
    date: "2024-05-15",
    readingTime: "7分",
    sections: [
      {
        body: [
          "検索結果の上位を狙うには、店舗情報を正確に整えることと、ユーザーの体験価値を高めることの両立が重要です。ここでは、愛知県碧南市・西三河エリアのクライアント支援で成果が出た施策を中心に、GoogleビジネスプロフィールやGoogleマップを活用した実践的なチェックリストをご紹介します。",
        ],
      },
      {
        heading: "基本情報の整備",
        list: [
          "Googleビジネスプロフィールのオーナー確認と最新化",
          "営業時間・電話番号・サービス内容の一貫性",
          "主要カテゴリと補助カテゴリの最適化",
        ],
        body: [
          "まずは正確な情報を届けることが信頼につながります。営業時間の変更などは、Googleだけでなく自社サイトやSNSも同時に更新することで評価が安定します。",
        ],
      },
      {
        heading: "評価と口コミの活用",
        list: [
          "来店後のフォローで口コミ投稿を依頼",
          "返信テンプレートを用意し、即レスで対応",
          "写真付きの口コミが増るように事例を共有",
        ],
        body: [
          "最新のアルゴリズムでは、星の数だけでなく返信率や返信スピードも評価対象です。クレーム対応はパブリックな改善アピールの場として活用しましょう。Google検索での上位表示にもつながるため、定期的なモニタリングをおすすめします。",
        ],
      },
      {
        heading: "コンテンツとリンクの強化",
        list: [
          "地域名＋サービス名のページを用意",
          "イベントレポートなど独自性のある記事を作成",
          "商工会議所など信頼性のあるサイトからリンクを獲得",
        ],
        body: [
          "検索順位はコンテンツの独自性と信頼性で決まります。地域の声を盛り込んだ記事や導入事例は、来店前の不安解消にも効果的です。",
        ],
      },
    ],
  },
  {
    slug: "website-renewal-checkflow",
    title: "成果につながるホームページリニューアルの進め方",
    description:
      "リニューアルで失敗しないために、現状分析から公開後の改善までのフローをまとめました。",
    genre: "tech",
    tags: ["Figma", "Notion", "Googleアナリティクス"],
    date: "2024-06-05",
    readingTime: "8分",
    sections: [
      {
        body: [
          "ホームページのリニューアルは、新規集客だけでなく採用や業務効率化にも大きく影響します。LEXIAが実際に行っている進行フローを公開します。設計段階ではFigmaでデザインのバージョン管理を行い、Notionで要件とスケジュールを共有しながら進めています。",
        ],
      },
      {
        heading: "1. 目的と指標を明確にする",
        body: [
          "最初に確認するのは、リニューアルで何を達成したいのかという点です。問い合わせ増、採用強化、EC売上改善など、目的によって必要な情報設計が変わります。KPIを数値で定義し、全員で共有しておきましょう。",
        ],
      },
      {
        heading: "2. コンテンツと導線の設計",
        list: [
          "現行サイトのアクセス解析から改善ポイントを抽出",
          "ペルソナごとの閲覧シナリオを作成",
          "スマホでの操作性を最優先にUIを調整",
        ],
        body: [
          "特にBtoBサイトでは、意思決定者と現場担当者で求める情報が異なります。両者がスムーズに行動できる導線を用意することが成果への近道です。",
        ],
      },
      {
        heading: "3. 公開後の改善と運用",
        body: [
          "公開して終わりではなく、アクセスデータを確認しながら改善を続けることが重要です。Googleアナリティクスやヒートマップツールを活用し、問い合わせまでの流れを定期的に見直しましょう。",
          "定期的な記事更新や事例追加もSEOと信頼性の両面で効果があります。LEXIA BLOGもその一環として運用していきます。",
        ],
      },
    ],
  },
]
