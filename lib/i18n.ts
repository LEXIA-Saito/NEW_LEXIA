import ja from '@/locales/ja/common.json'

export type TranslationKeys = keyof typeof ja

export function t(key: TranslationKeys): string {
  return (ja as Record<string, string>)[key] ?? key
}
