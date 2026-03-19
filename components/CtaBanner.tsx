'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

export default function CtaBanner() {
  const { t } = useLang()

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(28,28,28,0.8) 0%, rgba(17,17,17,0.9) 100%)',
            border: '1px solid rgba(220,38,38,0.25)',
            boxShadow: '0 0 80px rgba(220,38,38,0.08)',
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(220,38,38,0.4), transparent)' }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {t('cta.headline')}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              {t('cta.sub')}
            </p>
            <Link
              href="/start"
              id="cta-banner-btn"
              className="gold-btn text-base inline-flex items-center gap-2"
            >
              {t('cta.btn')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
