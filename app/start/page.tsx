import { Suspense } from 'react'
import OnboardingPage from './OnboardingPage'

export const metadata = {
  title: 'Start Your Company — Atlas',
  description: 'Begin your global company formation with Atlas Company.',
}

export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    }>
      <OnboardingPage />
    </Suspense>
  )
}
