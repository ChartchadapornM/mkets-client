'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/i18n/language-provider'
import { RiDashboardFill } from 'react-icons/ri'
import { FaUsers } from 'react-icons/fa'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { IoSettingsSharp } from 'react-icons/io5'
import MarketMappingTool from './components/MarketMappingTool'
import Dashboard from './components/DashBoard'
import { CiMenuBurger } from 'react-icons/ci'

export default function ManagementPage() {
  const { t, language, setLanguage, languageOptions } = useLanguage()
  const router = useRouter()
  const [activePage, setActivePage] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const fontClass = language === 'th' ? 'font-kanit' : 'font-poppins'

  const navItems = [
    {
      id: 'dashboard',
      icon: 'grid',
      label: t('management.dashboard') || 'Dashboard',
    },
    { id: 'users', icon: 'users', label: t('management.users') || 'Users' },
    {
      id: 'reports',
      icon: 'bar-chart',
      label: t('management.reports') || 'Reports',
    },
    {
      id: 'settings',
      icon: 'settings',
      label: t('management.settings') || 'Settings',
    },
  ]

  const handleLogout = () => {
    router.push('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      <div
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 transition duration-300 transform bg-blue-600 lg:translate-x-0 lg:static lg:inset-0 ${fontClass}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-blue-700">
            <span className="text-white font-bold text-xl">mkets</span>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`${
                  activePage === item.id
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
                onClick={() => setActivePage(item.id)}
              >
                <span className="mr-3 h-6 w-6 flex items-center justify-center">
                  {item.icon === 'grid' && <RiDashboardFill size={20} />}
                  {item.icon === 'users' && <FaUsers size={20} />}
                  {item.icon === 'bar-chart' && <BiBarChartAlt2 size={20} />}
                  {item.icon === 'settings' && <IoSettingsSharp size={20} />}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="px-4 py-3 border-t border-blue-700">
            <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-2">
              {t('settings.language')}
            </p>
            <div className="flex space-x-2">
              {Object.entries(languageOptions || {}).map(
                ([lang, { name, flag }]) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`flex items-center ${
                      language === lang
                        ? 'bg-white text-blue-600'
                        : 'bg-blue-500 text-white hover:bg-blue-400'
                    } px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150`}
                  >
                    <span className="mr-1">{flag}</span>
                    <span>{name}</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-blue-700">
            <button
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-md"
              onClick={handleLogout}
            >
              <FaUsers />
              {t('auth.logout') || 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 lg:hidden"
            onClick={toggleMobileMenu}
          >
            <CiMenuBurger />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className={`text-xl font-semibold ${fontClass} text-black`}>
                {t(`management.${activePage}`) ||
                  activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h1>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6 text-black">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'reports' && <MarketMappingTool />}
        </main>
      </div>
    </div>
  )
}
