'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

export default function CtaBanner() {
  const { t } = useLang()

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 text-center glass-card"
          style={{ border: '1px solid rgba(220,38,38,0.25)', boxShadow: '0 0 60px rgba(220,38,38,0.07)' }}>
          {/* Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(220,38,38,0.4), transparent)' }} />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--text)' }}>
              {t('cta.headline')}
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-2)' }}>
              {t('cta.sub')}
            </p>
            <Link href="/start" id="cta-banner-btn" className="gold-btn text-base inline-flex items-center gap-2">
              {t('cta.btn')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
