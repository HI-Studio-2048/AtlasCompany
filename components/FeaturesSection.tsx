'use client'
import { Globe2, Zap, Shield, Building2, BarChart3, Headphones } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const features = [
  { icon: Globe2,    titleKey: 'feat1.title', descKey: 'feat1.desc', color: '#DC2626' },
  { icon: Zap,       titleKey: 'feat2.title', descKey: 'feat2.desc', color: '#EF4444' },
  { icon: Shield,    titleKey: 'feat3.title', descKey: 'feat3.desc', color: '#F87171' },
  { icon: Building2, titleKey: 'feat4.title', descKey: 'feat4.desc', color: '#FFFFFF' },
  { icon: BarChart3, titleKey: 'feat5.title', descKey: 'feat5.desc', color: '#E5E5E5' },
  { icon: Headphones,titleKey: 'feat6.title', descKey: 'feat6.desc', color: '#DC2626' },
]

export default function FeaturesSection() {
  const { t } = useLang()

  return (
    <section id="features" className="py-28 px-6 relative">
      <div
        className="glow-orb w-[500px] h-[500px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge">{t('features.badge')}</div>
          <h2 className="section-headline">{t('features.headline')}</h2>
          <p className="section-sub">{t('features.sub')}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, titleKey, descKey, color }, i) => (
            <div
              key={titleKey}
              id={`feature-card-${i}`}
              className="glass-card p-8 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{t(titleKey)}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
