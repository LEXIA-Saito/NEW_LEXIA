'use client'

import { useRouter, usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  // Helper function to correctly reconstruct the path
  const getRedirectedPath = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const currentLocale = pathname?.split('/')[1] || 'ja' // Default to 'ja' if no locale in path

  const switchLanguage = (lang: 'ja' | 'en') => {
    // Store preference
    localStorage.setItem('preferredLang', lang)
    // Push new path
    router.push(getRedirectedPath(lang))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
        <span role="img" aria-label="Language icon" style={{ marginRight: '0.5em' }}>🌐</span>
        {currentLocale === 'ja' ? '日本語' : 'English'}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => switchLanguage('ja')}>
          <span role="img" aria-label="Japanese flag" style={{ marginRight: '0.5em' }}>🇯🇵</span>
          日本語
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('en')}>
          <span role="img" aria-label="British flag" style={{ marginRight: '0.5em' }}>🇬🇧</span>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
