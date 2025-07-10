import { usePathname } from 'next/navigation'
import footerJa from '@/public/locales/ja/footer.json'
import footerEn from '@/public/locales/en/footer.json'

const resources = {
  ja: { footer: footerJa },
  en: { footer: footerEn },
}

type Locale = keyof typeof resources
export type FooterKey = keyof typeof footerJa

export function useI18n(section: 'footer') {
  const pathname = usePathname()
  const locale: Locale = pathname?.split('/')[1] === 'en' ? 'en' : 'ja'
  return (key: FooterKey): string => {
    const value = resources[locale][section][key]
    return value || key
  }
}
