'use client'
import { Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

const jurisdictions = [
  { flag: '🇺🇸', country: 'United States',      countryZh: '美国',       types: ['LLC', 'C-Corp', 'S-Corp'],          days: '5-7',   price: '$299', highlight: false },
  { flag: '🇸🇬', country: 'Singapore',           countryZh: '新加坡',     types: ['Pte Ltd', 'Limited Partnership'],    days: '3-5',   price: '$399', highlight: true  },
  { flag: '🇭🇰', country: 'Hong Kong',           countryZh: '香港',       types: ['Limited Co.', 'Branch Office'],      days: '5-7',   price: '$349', highlight: false },
  { flag: '🇬🇧', country: 'United Kingdom',      countryZh: '英国',       types: ['Ltd', 'PLC', 'LLP'],                 days: '2-3',   price: '$249', highlight: false },
  { flag: '🇰🇾', country: 'Cayman Islands',      countryZh: '开曼群岛',   types: ['Exempted Co.', 'LLC'],               days: '5-10',  price: '$799', highlight: false },
  { flag: '🇻🇬', country: 'British Virgin Islands', countryZh: '英属维京群岛', types: ['IBC', 'LLC'],                   days: '3-5',   price: '$599', highlight: false },
  { flag: '🇦🇪', country: 'UAE',                 countryZh: '阿联酋',     types: ['Free Zone', 'Mainland LLC'],         days: '7-10',  price: '$699', highlight: false },
  { flag: '🇩🇪', country: 'Germany',             countryZh: '德国',       types: ['GmbH', 'UG'],                        days: '14-21', price: '$499', highlight: false },
]

export default function JurisdictionsSection() {
  const { t, lang } = useLang()

  return (
    <section id="jurisdictions" className="py-28 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-badge">{t('juris.badge')}</div>
          <h2 className="section-headline">{t('juris.headline')}</h2>
          <p className="section-sub">{t('juris.sub')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {jurisdictions.map((j, i) => (
            <div key={j.country} id={`jurisdiction-card-${i}`}
              className={`relative glass-card p-6 group hover:-translate-y-1 transition-all duration-300 cursor-pointer ${j.highlight ? 'border-red-500/40' : ''}`}>
              {j.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
                  Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{j.flag}</span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    {lang === 'en' ? j.country : j.countryZh}
                  </div>
                  <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                    <Clock className="w-3 h-3" />
                    {j.days} {t('juris.days')}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {j.types.map(type => (
                  <span key={type} className="px-2 py-0.5 rounded text-xs"
                    style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs" style={{ color: 'var(--text-3)' }}>{t('juris.from')}</div>
                  <div className="text-lg font-bold gold-text">{j.price}</div>
                </div>
                <Link href={`/start?jurisdiction=${j.country.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:border-red-500/40 group-hover:text-red-500"
                  style={{ border: '1px solid var(--border-strong)', color: 'var(--text-3)' }}>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
