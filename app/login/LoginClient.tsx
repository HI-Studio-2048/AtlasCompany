'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

interface Props {
  isChina: boolean
  country: string
}

const CHINA_PROVIDERS = [
  {
    id: 'wechat',
    label: '微信登录',
    sublabel: 'WeChat',
    comingSoon: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.11.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 0 1 .177-.554 5.46 5.46 0 0 0 2.5-4.624c0-3.376-3.165-6.119-6.059-6.119zm-2.41 3.361c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.846 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
      </svg>
    ),
    bg: 'bg-[#07C160]',
    text: 'text-white',
  },
  {
    id: 'qq',
    label: 'QQ 登录',
    sublabel: 'QQ',
    comingSoon: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2zm0 3c-2.21 0-4 2.462-4 5.5 0 .557.06 1.094.17 1.6C7.565 12.81 7 13.87 7 15c0 1.657 1.12 3 2.5 3 .41 0 .797-.106 1.133-.293C11.078 17.886 11.523 18 12 18s.922-.114 1.367-.293A2.483 2.483 0 0 0 14.5 18c1.38 0 2.5-1.343 2.5-3 0-1.13-.565-2.19-1.17-2.9.11-.506.17-1.043.17-1.6C16 7.462 14.21 5 12 5z" />
      </svg>
    ),
    bg: 'bg-[#12B7F5]',
    text: 'text-white',
  },
  {
    id: 'alipay',
    label: '支付宝登录',
    sublabel: 'Alipay',
    comingSoon: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M3.648 2h16.704C21.822 2 22 2.178 22 3.648v16.704C22 21.822 21.822 22 20.352 22H3.648C2.178 22 2 21.822 2 20.352V3.648C2 2.178 2.178 2 3.648 2zm8.368 6.464c0-.992-.8-1.792-1.792-1.792H7.04v5.824h1.184V10.08h1.776c.464 0 .672.24.672.624v1.792h1.184V10.64c0-.48-.176-.88-.512-1.104.336-.256.512-.624.512-1.072zm-1.184.08c0 .432-.304.64-.672.64H8.224V7.584h1.888c.368 0 .672.208.672.64v.32zm5.2 1.088c-.32-.192-.688-.32-1.12-.336v-.016h-1.168v5.104h1.184v-1.84c.08.016.144.016.224.016 1.136 0 1.888-.736 1.888-1.712 0-.608-.336-1.008-1.008-1.216zm-.32 1.904c-.192.192-.464.272-.8.256v-1.312c.752.048 1.04.352 1.04.72 0 .128-.08.24-.24.336z" />
      </svg>
    ),
    bg: 'bg-[#1677FF]',
    text: 'text-white',
  },
]

const GLOBAL_PROVIDERS = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    bg: 'bg-white dark:bg-white/10',
    text: 'text-gray-700 dark:text-white',
    border: 'border border-gray-200 dark:border-white/10',
  },
  {
    id: 'github',
    label: 'Continue with GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    bg: 'bg-[#24292E] dark:bg-white/10',
    text: 'text-white',
    border: '',
  },
]

export default function LoginClient({ isChina, country }: Props) {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'
  const error = searchParams.get('error')

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: redirect })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>Atlas</span>
          </Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-3)' }}>
            {isChina ? '登录您的账户' : 'Sign in to your account'}
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 space-y-3">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center mb-4">
              {error === 'OAuthCallback' ? 'Login failed. Please try again.' : 'Something went wrong. Please try again.'}
            </div>
          )}

          {isChina ? (
            <>
              <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--text-4)' }}>
                中国用户 · China
              </p>
              {CHINA_PROVIDERS.map(p => (
                <div key={p.id} className="relative">
                  <button
                    disabled={p.comingSoon}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${p.bg} ${p.text} ${p.comingSoon ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'}`}
                  >
                    <span className="w-6 flex items-center justify-center">{p.icon}</span>
                    <span className="flex-1 text-left">{p.label}</span>
                    {p.comingSoon && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </button>
                </div>
              ))}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: 'var(--border)' }} />
                </div>
                <div className="relative flex justify-center text-xs" style={{ color: 'var(--text-4)' }}>
                  <span className="px-2" style={{ background: 'var(--surface)' }}>或使用其他方式</span>
                </div>
              </div>
              {/* Google/GitHub also work in China via VPN or HK */}
              {GLOBAL_PROVIDERS.map(p => {
                const border = 'border' in p ? p.border : ''
                return (
                  <button key={p.id} onClick={() => handleSignIn(p.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:opacity-90 ${p.bg} ${p.text} ${border}`}>
                    <span className="w-6 flex items-center justify-center">{p.icon}</span>
                    <span className="flex-1 text-left">{p.label}</span>
                  </button>
                )
              })}
              <p className="text-xs text-center mt-2" style={{ color: 'var(--text-4)' }}>
                微信/QQ/支付宝登录即将开放 · 业务注册审批中
              </p>
            </>
          ) : (
            <>
              {GLOBAL_PROVIDERS.map(p => {
                const border = 'border' in p ? p.border : ''
                return (
                  <button key={p.id} onClick={() => handleSignIn(p.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:opacity-90 active:scale-[0.99] ${p.bg} ${p.text} ${border}`}>
                    <span className="w-6 flex items-center justify-center">{p.icon}</span>
                    <span className="flex-1 text-left">{p.label}</span>
                  </button>
                )
              })}
            </>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-4)' }}>
          By signing in you agree to our{' '}
          <Link href="/legal/terms" className="underline hover:opacity-80">Terms</Link>
          {' '}and{' '}
          <Link href="/legal/privacy" className="underline hover:opacity-80">Privacy Policy</Link>
        </p>

        <p className="text-center text-xs mt-2" style={{ color: 'var(--text-4)' }}>
          Detected region: {country}{isChina && ' 🇨🇳'}
        </p>
      </div>
    </div>
  )
}
