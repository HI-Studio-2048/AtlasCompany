import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'Atlas Company — Global Business Formation',
  description:
    'Form your company in 50+ jurisdictions worldwide. International expansion and overseas asset acquisition for global business users.',
  keywords: 'company formation, offshore company, international business, global expansion, business registration',
  openGraph: {
    title: 'Atlas Company — Global Business Formation',
    description: 'Form your company in 50+ jurisdictions in days.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-navy-900 text-white antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
