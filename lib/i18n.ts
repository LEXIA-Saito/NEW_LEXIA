"use client"

/**
 * lib/i18n.ts
 * ブラウザでも動作する簡易 i18n 実装。
 * - Node.js の `fs` 依存を排除
 * - デフォルトで日本語辞書（`/locales/ja/common.json`）をインポート
 * - `t()` と `useTranslations()` の 2 つを公開
 */

import ja from "@/locales/ja/common.json"

export type Locale = "ja"
type Dictionary = Record<string, any>

const dictionaries: Record<Locale, Dictionary> = {
  ja,
}

/* -------------------------------------------------- */
/* helpers                                            */
/* -------------------------------------------------- */

function getNestedValue(obj: Dictionary, path: string): string | undefined {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object") return acc[part] as Dictionary
    return undefined
  }, obj) as string | undefined
}

/* -------------------------------------------------- */
/* public api                                         */
/* -------------------------------------------------- */

/**
 * 同期的に翻訳文字列を取得するユーティリティ関数。
 * 見つからない場合はキー自体を返す。
 *
 * @param key    - 例: "ourWork.title"
 * @param locale - 現状は "ja" のみ
 */
export function t(key: string, locale: Locale = "ja"): string {
  const value = getNestedValue(dictionaries[locale], key)
  return typeof value === "string" ? value : key
}

/**
 * React コンポーネント内で使用するフック。
 * ```tsx
 * const t = useTranslations()
 * return <h1>{t('ourWork.title')}</h1>
 * ```
 */
export function useTranslations(locale: Locale = "ja") {
  return (key: string): string => t(key, locale)
}
