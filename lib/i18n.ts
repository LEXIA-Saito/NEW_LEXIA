import ja from '@/locales/ja/common.json'

export function useTranslations() {
  const dictionary = ja as Record<string, any>

  const t = (key: string): string => {
    const parts = key.split('.')
    let result: any = dictionary
    for (const part of parts) {
      result = result?.[part]
      if (result === undefined) return key
    }
    return result as string
  }

  return t
}
