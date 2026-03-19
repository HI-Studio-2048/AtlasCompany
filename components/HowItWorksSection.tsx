'use client'
import { MapPin, FileText, Upload, CheckCircle2 } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const steps = [
  { icon: MapPin,       numKey: '01', titleKey: 'how.step1', descKey: 'how.step1.desc' },
  { icon: FileText,     numKey: '02', titleKey: 'how.step2', descKey: 'how.step2.desc' },
  { icon: Upload,       numKey: '03', titleKey: 'how.step3', descKey: 'how.step3.desc' },
  { icon: CheckCircle2, numKey: '04', titleKey: 'how.step4', descKey: 'how.step4.desc' },
]

export default function HowItWorksSection() {
  const { t } = useLang()

  return (
    <section id="how-it-works" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #0A0F1E 0%, #0D1629 50%, #0A0F1E 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge">{t('how.badge')}</div>
          <h2 className="section-headline">{t('how.headline')}</h2>
          <p className="section-sub">{t('how.sub')}</p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 20%, rgba(212,175,55,0.3) 80%, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ icon: Icon, numKey, titleKey, descKey }, index) => (
              <div key={titleKey} className="relative text-center group" id={`how-step-${index + 1}`}>
                {/* Step number circle */}
                <div className="relative flex justify-center mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(30,45,79,0.8), rgba(13,22,41,0.9))',
                      border: '1px solid rgba(212,175,55,0.3)',
                      boxShadow: '0 0 30px rgba(212,175,55,0.1)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-gold-400" />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-navy-900"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D77E)' }}
                  >
                    {numKey}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3">{t(titleKey)}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
