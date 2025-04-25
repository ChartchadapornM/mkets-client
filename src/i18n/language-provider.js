'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import '../i18n'

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  languageOptions: {},
})

export const LanguageProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const { i18n, t } = useTranslation()
  const [language, setLanguage] = useState(() => 'en')

  useEffect(() => {
    setMounted(true)

    const savedLanguage = localStorage.getItem('i18nextLng') || 'en'
    setLanguage(savedLanguage)

    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('lang', language)
    }
  }, [language, mounted])
  const changeLanguage = (lng) => {
    if (mounted) {
      setLanguage(lng)
      i18n.changeLanguage(lng)
      localStorage.setItem('i18nextLng', lng)
    }
  }

  if (!mounted) {
    return children
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        languageOptions: {
          en: { name: 'English', flag: '🇬🇧' },
          th: { name: 'ไทย', flag: '🇹🇭' },
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
