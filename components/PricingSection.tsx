'use client'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

const plans = [
  {
    nameKey: 'plan1.name',
    priceKey: 'plan1.price',
    descKey: 'plan1.desc',
    period: '/formation',
    features: {
      en: ['1 Jurisdiction', 'Company Formation', 'Digital Documents', 'Email Support', '3-Month Compliance'],
      zh: ['1个司法管辖区', '公司注册', '电子文件', '邮件支持', '3个月合规'],
    },
    highlight: false,
    ctaKey: 'pricing.cta',
    href: '/start',
  },
  {
    nameKey: 'plan2.name',
    priceKey: 'plan2.price',
    descKey: 'plan2.desc',
    period: '/formation',
    features: {
      en: ['3 Jurisdictions', 'Company Formation', 'Digital Documents', 'Priority Support', '12-Month Compliance', 'Bank Account Intro', 'Tax Planning Consult'],
      zh: ['3个司法管辖区', '公司注册', '电子文件', '优先支持', '12个月合规', '银行账户介绍信', '税务规划咨询'],
    },
    highlight: true,
    ctaKey: 'pricing.cta',
    href: '/start',
  },
  {
    nameKey: 'plan3.name',
    priceKey: 'plan3.price',
    descKey: 'plan3.desc',
    period: '',
    features: {
      en: ['Unlimited Jurisdictions', 'Bulk Formation Discounts', 'Dedicated Account Manager', '24/7 Priority Support', 'Full Compliance Suite', 'Asset Acquisition Support', 'Custom Legal Structures'],
      zh: ['无限司法管辖区', '批量注册折扣', '专属客户经理', '7×24小时优先支持', '完整合规套件', '资产收购支持', '定制法律结构'],
    },
    highlight: false,
    ctaKey: 'pricing.contact',
    href: '#',
  },
]

export default function PricingSection() {
  const { t, lang } = useLang()

  return (
    <section id="pricing" className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge">{t('pricing.badge')}</div>
          <h2 className="section-headline">{t('pricing.headline')}</h2>
          <p className="section-sub">{t('pricing.sub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.nameKey}
              id={`pricing-card-${i}`}
              className={`relative glass-card p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'border-gold-500/50 scale-105 md:-translate-y-2'
                  : 'hover:border-white/20 hover:-translate-y-1'
              }`}
              style={plan.highlight ? { boxShadow: '0 0 40px rgba(220,38,38,0.15)' } : {}}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold text-navy-900 whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}
                >
                  {t('pricing.most')}
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm font-medium text-white/60 mb-1">{t(plan.nameKey)}</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'gold-text' : 'text-white'}`}>
                    {t(plan.priceKey)}
                  </span>
                  {plan.period && (
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-white/50 mt-2">{t(plan.descKey)}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(plan.features[lang] || plan.features.en).map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}>
                      <Check className="w-2.5 h-2.5 text-gold-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? 'gold-btn'
                    : 'border border-white/20 text-white hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/5'
                }`}
              >
                {t(plan.ctaKey)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
