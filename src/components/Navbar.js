'use client'

import React, { useState } from 'react'
import { useLanguage } from '../i18n/language-provider'
import Link from 'next/link'

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage()
  const [showLangMenu, setShowLangMenu] = useState(false)

  const languageOptions = {
    en: {
      name: 'English',
      flag: '🇬🇧',
    },
    th: {
      name: 'ไทย',
      flag: '🇹🇭',
    },
  }

  const toggleLangMenu = () => {
    setShowLangMenu(!showLangMenu)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowLangMenu(false)
  }

  const navFontClass = language === 'th' ? 'font-kanit' : 'font-poppins'

  return (
    <nav className={`bg-white shadow-md relative z-50 ${navFontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-blue-600 font-bold text-xl">mkets</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                type="button"
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={toggleLangMenu}
              >
                <span className="mr-1 text-base">
                  {languageOptions[language]?.flag}
                </span>
                <span>{languageOptions[language]?.name}</span>
                <svg
                  className="ml-1 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showLangMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {Object.entries(languageOptions).map(
                      ([lang, { name, flag }]) => (
                        <button
                          key={lang}
                          onClick={() => changeLanguage(lang)}
                          className={`${
                            language === lang
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                            lang === 'th' ? 'font-kanit' : 'font-poppins'
                          }`}
                          role="menuitem"
                        >
                          <span className="mr-2 text-base">{flag}</span>
                          {name}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/login">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('loginButton')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
