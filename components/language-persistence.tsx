'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'; // Using useLayoutEffect for earlier execution

export function LanguagePersistence() {
  const pathname = usePathname()
  const router = useRouter()

  useLayoutEffect(() => {
    const preferredLang = localStorage.getItem('preferredLang') as 'ja' | 'en' | null
    const segments = pathname.split('/')
    const currentLocale = segments[1]

    if (preferredLang) {
      // Only redirect if the current locale is not the preferred one
      // and we are not already on a locale-specific base path (e.g. /ja, /en)
      // to prevent loops if the homepage is the target.
      if (currentLocale !== preferredLang) {
        // Construct the new path by replacing the locale segment
        segments[1] = preferredLang
        const newPath = segments.join('/')

        // Check if the current path is just the locale (e.g. /ja or /en)
        // and if the newPath is different to avoid redirecting /ja to /ja/
        // or /ja to /en if already on /en.
        // This check aims to prevent unnecessary redirects or loops.
        if (pathname !== newPath) {
             router.replace(newPath); // Use replace to not add to history
        }
      }
    }
    // No explicit redirection if no preference is set, allow Next.js i18n to handle it.
  }, [pathname, router]) // Rerun if pathname or router changes

  return null // This component does not render anything
}
