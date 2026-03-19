'use client'
import Link from 'next/link'
import { ArrowRight, Play, TrendingUp, Shield, Zap, Globe2 } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const stats = [
  { key: 'hero.stat1', labelKey: 'hero.stat1.label', icon: Globe2 },
  { key: 'hero.stat2', labelKey: 'hero.stat2.label', icon: Zap },
  { key: 'hero.stat3', labelKey: 'hero.stat3.label', icon: TrendingUp },
  { key: 'hero.stat4', labelKey: 'hero.stat4.label', icon: Shield },
]

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
      {/* Background orbs */}
      <div
        className="glow-orb w-[700px] h-[700px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="glow-orb w-[350px] h-[350px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
        }}
      />
      <div
        className="glow-orb w-[250px] h-[250px] opacity-8"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          top: '20%',
          left: '-5%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="section-badge">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            {t('hero.badge')}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6">
          <span className="text-white">{t('hero.headline1')}</span>
          <br />
          <span className="gold-text">{t('hero.headline2')}</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/start"
            id="hero-cta-primary"
            className="gold-btn text-base gap-2"
          >
            {t('hero.cta.primary')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            id="hero-cta-demo"
            className="ghost-btn text-base gap-2"
          >
            <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
            </div>
            {t('hero.cta.secondary')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map(({ key, labelKey, icon: Icon }) => (
            <div
              key={key}
              className="glass-card px-6 py-5 text-center group hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="flex justify-center mb-2">
                <Icon className="w-4 h-4 text-gold-500 opacity-70" />
              </div>
              <div className="text-2xl md:text-3xl font-bold gold-text">{t(key)}</div>
              <div className="text-xs text-white/50 mt-1">{t(labelKey)}</div>
            </div>
          ))}
        </div>

        {/* Floating jurisdiction pills */}
        <div className="hidden md:flex items-center justify-center gap-3 mt-16 flex-wrap">
          {['🇺🇸 USA', '🇸🇬 Singapore', '🇭🇰 Hong Kong', '🇬🇧 UK', '🇰🇾 Cayman Islands', '🇻🇬 BVI', '🇦🇪 UAE'].map((j) => (
            <span
              key={j}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50"
              style={{ background: 'rgba(28,28,28,0.4)' }}
            >
              {j}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
      />
    </section>
  )
}
