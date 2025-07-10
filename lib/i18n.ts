"use client"

import fs from "fs"
import path from "path"

type Locale = "ja" | "en"

interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Locale, Translations> = {
  ja: {},
  en: {},
}

// Load translations
function loadTranslations() {
  const localesDir = path.join(process.cwd(), "locales")

  try {
    // Load Japanese translations
    const jaPath = path.join(localesDir, "ja", "common.json")
    if (fs.existsSync(jaPath)) {
      translations.ja = JSON.parse(fs.readFileSync(jaPath, "utf8"))
    }

    // Load English translations (if exists)
    const enPath = path.join(localesDir, "en", "common.json")
    if (fs.existsSync(enPath)) {
      translations.en = JSON.parse(fs.readFileSync(enPath, "utf8"))
    }
  } catch (error) {
    console.warn("Failed to load translations:", error)
  }
}

// Initialize translations
loadTranslations()

function getNestedValue(obj: Translations, path: string): string {
  return path.split(".").reduce((current, key) => {
    return current && typeof current === "object" ? (current as any)[key] : undefined
  }, obj) as string
}

export function t(key: string, locale: Locale = "ja"): string {
  const value = getNestedValue(translations[locale], key)
  return value || key
}

export function useTranslations() {
  return t
}

export type { Locale }
