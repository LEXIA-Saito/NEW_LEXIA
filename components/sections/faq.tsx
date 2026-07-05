import { homepageFaq } from "@/lib/faq"

// 可視のFAQ（ネイティブの details/summary で開閉。JSと重いライブラリ不要でアクセシブル）。
// 構造化データ(FAQPage)と同じ lib/faq.ts のデータを表示する。
export default function Faq() {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">FAQ</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100">
          よくあるご質問
        </h2>
      </div>

      <div className="space-y-4">
        {homepageFaq.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-neutral-900 dark:text-neutral-100">
              {item.question}
              <span
                className="ml-2 shrink-0 text-xl leading-none text-neutral-400 transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                ＋
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
