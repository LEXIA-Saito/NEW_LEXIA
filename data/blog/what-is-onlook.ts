import type { BlogPost } from '@/lib/blog-posts.types';

export const post: BlogPost = {
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
  };