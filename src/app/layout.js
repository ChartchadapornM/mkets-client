import { Kanit, Poppins } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../i18n/language-provider'

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-kanit',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'mkets',
  description: 'Your trusted platform for market insights and analysis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${kanit.variable} ${poppins.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
