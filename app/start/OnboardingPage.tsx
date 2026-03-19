'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Globe, CheckCircle2, ChevronRight, ArrowLeft, Building2 } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const jurisdictions = [
  { flag: '🇺🇸', name: 'United States', nameZh: '美国' },
  { flag: '🇸🇬', name: 'Singapore', nameZh: '新加坡' },
  { flag: '🇭🇰', name: 'Hong Kong', nameZh: '香港' },
  { flag: '🇬🇧', name: 'United Kingdom', nameZh: '英国' },
  { flag: '🇰🇾', name: 'Cayman Islands', nameZh: '开曼群岛' },
  { flag: '🇻🇬', name: 'British Virgin Islands', nameZh: '英属维京群岛' },
  { flag: '🇦🇪', name: 'UAE', nameZh: '阿联酋' },
  { flag: '🇩🇪', name: 'Germany', nameZh: '德国' },
  { flag: '🇳🇱', name: 'Netherlands', nameZh: '荷兰' },
  { flag: '🇲🇾', name: 'Malaysia', nameZh: '马来西亚' },
  { flag: '🇯🇵', name: 'Japan', nameZh: '日本' },
  { flag: '🇦🇺', name: 'Australia', nameZh: '澳大利亚' },
]

const businessTypes = [
  { id: 'llc', label: 'LLC', labelZh: '有限责任公司', desc: 'Flexible structure, limited liability', descZh: '灵活结构，有限责任保护' },
  { id: 'corp', label: 'Corporation', labelZh: '股份公司', desc: 'Ideal for raising investment', descZh: '适合融资的企业形式' },
  { id: 'ltd', label: 'Limited Company', labelZh: '有限公司', desc: 'Common international structure', descZh: '常见的国际企业结构' },
  { id: 'ibc', label: 'IBC / Offshore', labelZh: '离岸公司', desc: 'Optimised for offshore operations', descZh: '专为离岸业务优化' },
]

const industries = ['Technology', 'Finance', 'Real Estate', 'Import/Export', 'E-Commerce', 'Consulting', 'Manufacturing', 'Other']
const industriesZh = ['科技', '金融', '房地产', '进出口', '电子商务', '咨询', '制造业', '其他']

export default function OnboardingPage() {
  const { t, lang } = useLang()
  const searchParams = useSearchParams()
  const prefilledJuris = searchParams.get('jurisdiction') || ''

  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    jurisdiction: prefilledJuris,
    businessType: '',
    companyName: '',
    industry: '',
    directors: '1',
    email: '',
    phone: '',
  })

  const steps = [
    t('onboard.step1'),
    t('onboard.step2'),
    t('onboard.step3'),
    t('onboard.step4'),
  ]

  const canAdvance = () => {
    if (step === 1) return !!form.jurisdiction
    if (step === 2) return !!form.businessType
    if (step === 3) return !!form.companyName && !!form.email
    if (step === 4) return true
    return false
  }

  const handleSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0A0A0A' }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{t('onboard.success')}</h1>
          <p className="text-white/60 mb-8">{t('onboard.success.sub')}</p>
          <Link href="/dashboard" className="gold-btn inline-flex items-center gap-2">
            Go to Dashboard <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dot-grid" style={{ background: '#0A0A0A' }}>
      {/* Top nav */}
      <div className="border-b border-white/8 px-6 h-16 flex items-center justify-between"
        style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
            <Globe className="w-3.5 h-3.5 text-navy-900" strokeWidth={2.5} />
          </div>
          <span className="font-bold">Atlas</span>
        </Link>
        <div className="text-sm text-white/40">{t('onboard.title')}</div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">{t('onboard.title')}</h1>
          <p className="text-white/50">{t('onboard.sub')}</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => {
            const num = i + 1
            const isDone = num < step
            const isActive = num === step
            return (
              <div key={s} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      background: isDone ? 'linear-gradient(135deg, #DC2626, #F87171)' : isActive ? 'rgba(220,38,38,0.2)' : 'rgba(28,28,28,0.6)',
                      border: isActive ? '1px solid #DC2626' : isDone ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      color: isDone ? '#0A0A0A' : isActive ? '#DC2626' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : num}
                  </div>
                  <div className={`text-xs mt-1.5 font-medium hidden sm:block ${isActive ? 'text-gold-400' : 'text-white/30'}`}>{s}</div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px mx-2 transition-all duration-300"
                    style={{ background: isDone ? 'linear-gradient(90deg, #DC2626, #F87171)' : 'rgba(255,255,255,0.1)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <div className="glass-card p-8">
          {/* Step 1: Jurisdiction */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">{t('onboard.step1')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {jurisdictions.map((j) => (
                  <button
                    key={j.name}
                    id={`jurisdiction-option-${j.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setForm({ ...form, jurisdiction: j.name })}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border text-left transition-all duration-200"
                    style={{
                      border: form.jurisdiction === j.name ? '1px solid #DC2626' : '1px solid rgba(255,255,255,0.1)',
                      background: form.jurisdiction === j.name ? 'rgba(220,38,38,0.1)' : 'rgba(28,28,28,0.3)',
                    }}
                  >
                    <span className="text-xl">{j.flag}</span>
                    <span className="text-sm font-medium text-white">{lang === 'en' ? j.name : j.nameZh}</span>
                    {form.jurisdiction === j.name && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Business Type */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">{t('onboard.step2')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessTypes.map((bt) => (
                  <button
                    key={bt.id}
                    id={`business-type-${bt.id}`}
                    onClick={() => setForm({ ...form, businessType: bt.id })}
                    className="flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200"
                    style={{
                      border: form.businessType === bt.id ? '1px solid #DC2626' : '1px solid rgba(255,255,255,0.1)',
                      background: form.businessType === bt.id ? 'rgba(220,38,38,0.1)' : 'rgba(28,28,28,0.3)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.2)' }}>
                      <Building2 className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{lang === 'en' ? bt.label : bt.labelZh}</div>
                      <div className="text-xs text-white/50">{lang === 'en' ? bt.desc : bt.descZh}</div>
                    </div>
                    {form.businessType === bt.id && (
                      <CheckCircle2 className="w-4 h-4 text-gold-400 ml-auto mt-1 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">{t('onboard.step3')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">{t('onboard.name')} *</label>
                  <input
                    id="company-name-input"
                    className="atlas-input"
                    placeholder="e.g. Atlas Global Ltd"
                    value={form.companyName}
                    onChange={e => setForm({ ...form, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">{t('onboard.industry')}</label>
                  <select
                    id="industry-select"
                    className="atlas-select"
                    value={form.industry}
                    onChange={e => setForm({ ...form, industry: e.target.value })}
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind, i) => (
                      <option key={ind} value={ind}>{lang === 'en' ? ind : industriesZh[i]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">{t('onboard.directors')}</label>
                  <select
                    id="directors-select"
                    className="atlas-select"
                    value={form.directors}
                    onChange={e => setForm({ ...form, directors: e.target.value })}
                  >
                    {['1', '2', '3', '4', '5+'].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">{t('onboard.email')} *</label>
                  <input
                    id="email-input"
                    type="email"
                    className="atlas-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">{t('onboard.phone')}</label>
                  <input
                    id="phone-input"
                    type="tel"
                    className="atlas-input"
                    placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">{t('onboard.step4')}</h2>
              <div className="space-y-3">
                {[
                  { label: 'Jurisdiction', value: form.jurisdiction },
                  { label: 'Business Type', value: businessTypes.find(b => b.id === form.businessType)?.label || '' },
                  { label: 'Company Name', value: form.companyName },
                  { label: 'Industry', value: form.industry || '—' },
                  { label: 'Directors', value: form.directors },
                  { label: 'Email', value: form.email },
                  { label: 'Phone', value: form.phone || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-white/8">
                    <span className="text-sm text-white/50">{label}</span>
                    <span className="text-sm font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <p className="text-sm text-gold-300/80">
                  By submitting, you agree to our Terms of Service and Privacy Policy. Our team will contact you within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            id="wizard-back-btn"
            onClick={() => step > 1 && setStep(step - 1)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-200 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" /> {t('onboard.back')}
          </button>

          {step < 4 ? (
            <button
              id="wizard-next-btn"
              onClick={() => canAdvance() && setStep(step + 1)}
              disabled={!canAdvance()}
              className={`gold-btn text-sm px-8 py-2.5 flex items-center gap-2 transition-opacity duration-200 ${!canAdvance() ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {t('onboard.next')} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="wizard-submit-btn"
              onClick={handleSubmit}
              className="gold-btn text-sm px-8 py-2.5 flex items-center gap-2"
            >
              {t('onboard.submit')} <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
