'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import your translations
import enTranslation from './locales/en.json'
import thTranslation from './locales/th.json'

// Check if we're on client side before initializing
const isClient = typeof window !== 'undefined'

if (isClient) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslation },
        th: { translation: thTranslation },
      },
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    })
}

export default i18next
