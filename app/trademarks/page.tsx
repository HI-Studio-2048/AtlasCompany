'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { Award, Globe2, Shield, RefreshCw, Bell, ChevronRight, CheckCircle2 } from 'lucide-react'

const services = [
  { icon: Globe2,      key: 's1', color: '#DC2626' },
  { icon: Shield,      key: 's2', color: '#EF4444' },
  { icon: Bell,        key: 's3', color: '#F87171' },
  { icon: RefreshCw,   key: 's4', color: '#FFFFFF' },
]

const jurisdictions = [
  { flag: '🇺🇸', name: 'United States', office: 'USPTO', time: '8-12 mo' },
  { flag: '🇨🇳', name: 'China',         office: 'CNIPA', time: '12-18 mo' },
  { flag: '🇪🇺', name: 'European Union', office: 'EUIPO', time: '6-8 mo' },
  { flag: '🇬🇧', name: 'United Kingdom', office: 'UKIPO', time: '4-6 mo' },
  { flag: '🇸🇬', name: 'Singapore',      office: 'IPOS',  time: '6-9 mo' },
  { flag: '🇭🇰', name: 'Hong Kong',      office: 'IPD',   time: '6-12 mo' },
  { flag: '🇯🇵', name: 'Japan',          office: 'JPO',   time: '12-18 mo' },
  { flag: '🌐', name: '100+ via Madrid', office: 'WIPO',  time: '12-18 mo' },
]

const classes = ['tm.class.1','tm.class.2','tm.class.3','tm.class.4','tm.class.5','tm.class.6']

export default function TrademarksPage() {
  const { t } = useLang()
  const [form, setForm] = useState({ brand: '', countries: '', niceClass: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.brand || !form.email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden dot-grid">
        <div
          className="glow-orb w-[600px] h-[600px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="section-badge">
            <Award size={14} />
            {t('tm.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t('tm.headline').split(' ').slice(0,3).join(' ')}{' '}
            <span className="gold-text">{t('tm.headline').split(' ').slice(3).join(' ')}</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-10">{t('tm.sub')}</p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { val: t('tm.stat1'), label: t('tm.stat1.label') },
              { val: t('tm.stat2'), label: t('tm.stat2.label') },
              { val: t('tm.stat3'), label: t('tm.stat3.label') },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold gold-text">{s.val}</div>
                <div className="text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <a href="#apply" className="gold-btn inline-flex items-center gap-2">
            {t('tm.cta')} <ChevronRight size={18} />
          </a>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, key, color }) => (
              <div key={key} className="glass-card p-6 hover:border-red-600/30 transition-all duration-300 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `rgba(220,38,38,0.12)`, border: `1px solid rgba(220,38,38,0.2)` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{t(`tm.${key}.title`)}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{t(`tm.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Jurisdiction Coverage ─── */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #111111 0%, #0A0A0A 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-badge"><Globe2 size={14} /> Coverage</div>
            <h2 className="section-headline">Global Trademark Offices</h2>
            <p className="section-sub">We file directly with national IP offices and WIPO for Madrid Protocol applications.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {jurisdictions.map((j) => (
              <div
                key={j.name}
                className="glass-card p-5 flex items-start gap-3 hover:border-white/20 transition-all duration-200"
              >
                <span className="text-2xl leading-none mt-0.5">{j.flag}</span>
                <div>
                  <div className="font-medium text-sm text-white">{j.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{j.office}</div>
                  <div className="text-xs text-red-400 mt-1">{j.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Application Form ─── */}
      <section id="apply" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="glass-card p-12 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}
              >
                <CheckCircle2 size={36} className="text-red-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">{t('tm.form.success')}</h2>
              <p className="text-white/60 mb-8">{t('tm.form.success.sub')}</p>
              <Link href="/dashboard" className="gold-btn inline-flex items-center gap-2">
                Go to Dashboard <ChevronRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">{t('tm.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Brand name */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">{t('tm.form.brand')}</label>
                  <input
                    id="tm-brand"
                    type="text"
                    className="atlas-input"
                    placeholder={t('tm.form.brand.ph')}
                    value={form.brand}
                    onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                    required
                  />
                </div>

                {/* Nice class */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">{t('tm.form.class')}</label>
                  <select
                    id="tm-class"
                    className="atlas-select"
                    value={form.niceClass}
                    onChange={e => setForm(f => ({ ...f, niceClass: e.target.value }))}
                  >
                    <option value="">— Select class —</option>
                    {classes.map(c => (
                      <option key={c} value={c}>{t(c)}</option>
                    ))}
                  </select>
                </div>

                {/* Countries */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">{t('tm.form.countries')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {jurisdictions.slice(0, 6).map(j => (
                      <label key={j.name} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="accent-red-500 w-4 h-4"
                          onChange={e => {
                            const selected = form.countries ? form.countries.split(',') : []
                            const next = e.target.checked
                              ? [...selected, j.name]
                              : selected.filter(x => x !== j.name)
                            setForm(f => ({ ...f, countries: next.join(',') }))
                          }}
                        />
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                          {j.flag} {j.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">{t('tm.form.email')}</label>
                  <input
                    id="tm-email"
                    type="email"
                    className="atlas-input"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>

                <button
                  id="tm-submit"
                  type="submit"
                  disabled={loading}
                  className="gold-btn w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    <>{t('tm.form.submit')} <ChevronRight size={18} /></>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
