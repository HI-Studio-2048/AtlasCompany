'use client'

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

interface Props {
  isChina: boolean
  country: string
}

export default function LoginClient({ isChina, country }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Atlas
          </span>
        </Link>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-3)' }}>
          {isChina ? '登录或创建您的账户' : 'Sign in or create your account'}
        </p>
        {isChina && (
          <p className="mt-1 text-xs" style={{ color: 'var(--text-4)' }}>
            Detected region: {country} 🇨🇳
          </p>
        )}
      </div>

      <SignIn
        fallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'glass-card !bg-transparent !shadow-none !border-0',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            socialButtonsBlockButton:
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all border border-white/10 bg-white/5 text-white hover:bg-white/10',
            formButtonPrimary:
              'gold-btn w-full',
            footerAction: 'text-white/40',
            footerActionLink: 'text-white underline hover:opacity-80',
          },
        }}
      />

      <p className="text-center text-xs mt-6" style={{ color: 'var(--text-4)' }}>
        By signing in you agree to our{' '}
        <Link href="/legal/terms" className="underline hover:opacity-80">
          Terms
        </Link>{' '}
        and{' '}
        <Link href="/legal/privacy" className="underline hover:opacity-80">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
