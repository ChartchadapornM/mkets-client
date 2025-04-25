'use client'

import React from 'react'
import { useLanguage } from './language-provider'

const LanguageSwitcher = () => {
  const { language, setLanguage, t, languageNames } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{t('settings.language')}:</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="block w-auto py-1 px-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {Object.keys(languageNames).map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSwitcher
