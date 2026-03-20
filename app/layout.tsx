import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'

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

// Prevents flash of wrong theme on load
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('atlas-theme');
      if (t === 'dark') document.documentElement.classList.add('dark');
    } catch(e) {}
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ClerkProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>{children}</AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
