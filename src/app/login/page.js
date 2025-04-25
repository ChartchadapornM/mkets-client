'use client'

import React, { useState } from 'react'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useLanguage } from '@/i18n/language-provider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fontClass = language === 'th' ? 'font-kanit' : 'font-poppins'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push('/management')
    } catch (err) {
      setError(t('auth.loginError') || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2
              className={`mt-6 text-3xl font-extrabold text-gray-900 ${fontClass}`}
            >
              {t('auth.loginTitle') || 'Sign in to your account'}
            </h2>
            <p className={`mt-2 text-sm text-gray-600 ${fontClass}`}>
              {t('auth.noAccount') || "Don't have an account?"}{' '}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t('auth.signup') || 'Sign up'}
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  {t('auth.email') || 'Email address'}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${fontClass}`}
                  placeholder={t('auth.email') || 'Email address'}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {t('auth.password') || 'Password'}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${fontClass}`}
                  placeholder={t('auth.password') || 'Password'}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm text-gray-900 ${fontClass}`}
                >
                  {t('auth.rememberMe') || 'Remember me'}
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className={`font-medium text-blue-600 hover:text-blue-500 ${fontClass}`}
                >
                  {t('auth.forgotPassword') || 'Forgot your password?'}
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${fontClass} ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('auth.signingIn') || 'Signing in...'}
                  </span>
                ) : (
                  t('auth.login') || 'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 mkets. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
