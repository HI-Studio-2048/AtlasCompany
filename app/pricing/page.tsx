'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Check, X, ChevronRight, Zap, Building2, Globe2, Award, Star } from 'lucide-react'

interface Country {
  flag: string
  name: string
  basic: string
  pro: string
  enterprise: string
  enterpriseAddOns: string[]
}

const countries: Country[] = [
  {
    flag: '🇺🇸', name: 'United States',
    basic: '$299', pro: '$499', enterprise: '$899',
    enterpriseAddOns: [
      'EIN / Federal Tax ID registration',
      'Operating Agreement drafting',
      'State annual report filing',
      'Registered agent renewal (yr 2)',
    ],
  },
  {
    flag: '🇸🇬', name: 'Singapore',
    basic: '$799', pro: '$1,199', enterprise: '$1,999',
    enterpriseAddOns: [
      'GST registration',
      'Employment Pass application support',
      'ACRA annual return filing',
      'Corporate secretary (1 year)',
    ],
  },
  {
    flag: '🇭🇰', name: 'Hong Kong',
    basic: '$599', pro: '$999', enterprise: '$1,699',
    enterpriseAddOns: [
      'Business Registration Certificate renewal',
      'NAR1 Annual Return filing',
      'Nominee director service (1 yr)',
      'Profits Tax registration',
    ],
  },
  {
    flag: '🇬🇧', name: 'United Kingdom',
    basic: '$399', pro: '$699', enterprise: '$1,199',
    enterpriseAddOns: [
      'VAT registration',
      'Annual Confirmation Statement filing',
      'PAYE / Payroll setup',
      'Companies House filing agent',
    ],
  },
  {
    flag: '🇰🇾', name: 'Cayman Islands',
    basic: '$1,499', pro: '$2,199', enterprise: '$3,499',
    enterpriseAddOns: [
      'CIMA / VASP licensing guidance',
      'Annual General Meeting administration',
      'KYC / AML compliance package',
      'Economic Substance reporting',
    ],
  },
  {
    flag: '🇻🇬', name: 'British Virgin Islands',
    basic: '$1,299', pro: '$1,899', enterprise: '$2,999',
    enterpriseAddOns: [
      'Certificate of Good Standing',
      'BVI registered agent renewal',
      'Corporate structure memorandum',
      'Annual return & government fees',
    ],
  },
  {
    flag: '🇦🇪', name: 'UAE',
    basic: '$2,999', pro: '$4,499', enterprise: '$6,999',
    enterpriseAddOns: [
      'Freezone vs mainland advisory',
      'UAE resident visa processing',
      'Emirates ID & establishment card',
      'VAT registration & filing setup',
    ],
  },
  {
    flag: '🇩🇪', name: 'Germany',
    basic: '$899', pro: '$1,399', enterprise: '$2,299',
    enterpriseAddOns: [
      'Handelsregister commercial registration',
      'VAT (USt-IdNr.) registration',
      'Trade license (Gewerbeanmeldung)',
      'Annual financial statement filing',
    ],
  },
  {
    flag: '🇳🇱', name: 'Netherlands',
    basic: '$799', pro: '$1,299', enterprise: '$2,099',
    enterpriseAddOns: [
      'KvK (Chamber of Commerce) registration',
      'BTW (VAT) number registration',
      'UBO register filing',
      'Annual accounts preparation',
    ],
  },
  {
    flag: '🇲🇾', name: 'Malaysia',
    basic: '$499', pro: '$799', enterprise: '$1,299',
    enterpriseAddOns: [
      'SST (Sales & Service Tax) registration',
      'SSM annual return filing',
      'Labuan offshore option advisory',
      'Work permit & visa support',
    ],
  },
  {
    flag: '🇯🇵', name: 'Japan',
    basic: '$999', pro: '$1,599', enterprise: '$2,599',
    enterpriseAddOns: [
      'My Number / Corporate Number registration',
      'Consumption tax (JCT) registration',
      'Business Manager visa support',
      'Annual financial statement (決算)',
    ],
  },
  {
    flag: '🇦🇺', name: 'Australia',
    basic: '$599', pro: '$999', enterprise: '$1,699',
    enterpriseAddOns: [
      'ABN & ACN registration',
      'GST registration',
      'ASIC annual review fee lodgement',
      'Beneficial ownership disclosure',
    ],
  },
]

const basicFeatures = [
  { text: 'Company formation documents', included: true },
  { text: 'Registered agent (1 year)', included: true },
  { text: 'Digital delivery of certificates', included: true },
  { text: 'Compliance calendar', included: true },
  { text: 'Tax registration', included: false },
  { text: 'Business banking introduction', included: false },
  { text: 'Priority processing (24 hr)', included: false },
  { text: 'Dedicated account manager', included: false },
]

const proFeatures = [
  { text: 'Company formation documents', included: true },
  { text: 'Registered agent (1 year)', included: true },
  { text: 'Digital delivery of certificates', included: true },
  { text: 'Compliance calendar', included: true },
  { text: 'Tax registration', included: true },
  { text: 'Business banking introduction', included: true },
  { text: 'Priority processing (24 hr)', included: true },
  { text: 'Dedicated account manager', included: false },
]

const enterpriseBaseFeatures = [
  { text: 'Company formation documents', included: true },
  { text: 'Registered agent (1 year)', included: true },
  { text: 'Digital delivery of certificates', included: true },
  { text: 'Compliance calendar', included: true },
  { text: 'Tax registration', included: true },
  { text: 'Business banking introduction', included: true },
  { text: 'Priority processing (24 hr)', included: true },
  { text: 'Dedicated account manager', included: true },
]

const addOns = [
  { name: 'Trademark Registration', desc: 'National filing in one jurisdiction', from: '$499' },
  { name: 'Madrid Protocol Filing', desc: 'International filing via WIPO', from: '$899' },
  { name: 'DMCA Takedown', desc: 'Per-platform takedown notice', from: '$149' },
  { name: 'Brand Monitoring', desc: 'Monthly AI-powered surveillance', from: '$99/mo' },
  { name: 'Annual Compliance', desc: 'Annual returns & filings', from: '$199/yr' },
  { name: 'Local Director', desc: 'Nominee director service', from: '$399/yr' },
]

const faqs = [
  { q: 'How long does company formation take?', a: 'Most companies are ready in 3–5 business days. Pro and Enterprise clients get priority 24-hour processing for select jurisdictions.' },
  { q: 'What\'s the difference between Basic and Pro?', a: 'Basic covers company formation only. Pro adds tax registration and a business banking introduction — so you can operate immediately.' },
  { q: 'What does "banking introduction" mean?', a: 'We introduce you to our banking partners and help prepare your account-opening package. Approval is at the bank\'s discretion, but our introduction significantly improves acceptance rates.' },
  { q: 'Can I upgrade my plan after purchase?', a: 'Yes — you can upgrade from Basic to Pro or Enterprise at any time. You only pay the difference.' },
  { q: 'Do you offer refunds?', a: 'If your application is rejected by the government authority, we refund 100% of our service fee. Government filing fees are non-refundable.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, wire transfer, and cryptocurrency (Bitcoin, USDC, ETH).' },
]

export default function PricingPage() {
  const [selectedCountry, setSelectedCountry] = useState(0)
  const country = countries[selectedCountry]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[600px] h-[600px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="section-badge"><Award size={14} /> Simple Pricing</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Plans for Every <span className="gold-text">Jurisdiction</span>
          </h1>
          <p className="text-xl text-white/55 max-w-2xl mx-auto">
            Select your country and choose the plan that fits — from a simple formation to a fully-managed setup with tax and banking.
          </p>
        </div>
      </section>

      {/* Country Selector */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max mx-auto justify-center flex-wrap">
              {countries.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCountry(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCountry === i
                      ? 'text-white border-red-600/50'
                      : 'text-white/50 border-white/10 hover:text-white/80 hover:border-white/25'
                  }`}
                  style={selectedCountry === i ? {
                    background: 'rgba(220,38,38,0.12)',
                    border: '1px solid rgba(220,38,38,0.4)',
                    boxShadow: '0 0 16px rgba(220,38,38,0.08)',
                  } : {
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {/* Basic */}
          <div className="glass-card p-8 flex flex-col relative hover:border-white/20 transition-all duration-300">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <Zap size={22} className="text-white/60" />
              </div>
              <h3 className="text-xl font-bold mb-1">Basic</h3>
              <p className="text-sm text-white/50">Company formation, done right.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold gold-text">{country.basic}</span>
              <span className="text-white/40 text-sm ml-2">one-time</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {basicFeatures.map(f => (
                <li key={f.text} className="flex items-start gap-3">
                  {f.included
                    ? <Check size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    : <X size={16} className="text-white/20 flex-shrink-0 mt-0.5" />}
                  <span className={`text-sm ${f.included ? 'text-white/70' : 'text-white/25'}`}>{f.text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/start"
              className="w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30"
            >
              Get Started <ChevronRight size={16} />
            </Link>
          </div>

          {/* Pro */}
          <div
            className="glass-card p-8 flex flex-col relative border-red-600/40 transition-all duration-300"
            style={{ boxShadow: '0 0 40px rgba(220,38,38,0.12)' }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)', color: '#fff' }}>
              Most Popular
            </div>
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <Building2 size={22} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <p className="text-sm text-white/50">Formation + tax registration + banking.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold gold-text">{country.pro}</span>
              <span className="text-white/40 text-sm ml-2">one-time</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map(f => (
                <li key={f.text} className="flex items-start gap-3">
                  {f.included
                    ? <Check size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    : <X size={16} className="text-white/20 flex-shrink-0 mt-0.5" />}
                  <span className={`text-sm ${f.included ? 'text-white/70' : 'text-white/25'}`}>{f.text}</span>
                </li>
              ))}
            </ul>
            <Link href="/start" className="gold-btn w-full text-center py-3 font-semibold text-sm flex items-center justify-center gap-2">
              Get Started <ChevronRight size={16} />
            </Link>
          </div>

          {/* Enterprise */}
          <div className="glass-card p-8 flex flex-col relative hover:border-white/20 transition-all duration-300">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <Globe2 size={22} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <p className="text-sm text-white/50">Fully managed, white-glove service.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold gold-text">{country.enterprise}</span>
              <span className="text-white/40 text-sm ml-2">one-time</span>
            </div>
            <ul className="space-y-3 mb-4 flex-1">
              {enterpriseBaseFeatures.map(f => (
                <li key={f.text} className="flex items-start gap-3">
                  <Check size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">{f.text}</span>
                </li>
              ))}
              {/* Country-specific add-ons */}
              <li className="pt-2 border-t border-white/8">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={12} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{country.flag} {country.name} Add-ons</span>
                </div>
                <ul className="space-y-2">
                  {country.enterpriseAddOns.map(addon => (
                    <li key={addon} className="flex items-start gap-3">
                      <Check size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70">{addon}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <Link
              href="/contact"
              className="w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 mt-4"
            >
              Talk to Sales <ChevronRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-headline">Add-On Services</h2>
            <p className="section-sub">Available with any plan, for any jurisdiction.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addOns.map(a => (
              <div key={a.name} className="glass-card p-5 flex items-center justify-between hover:border-white/20 transition-all duration-200">
                <div>
                  <div className="font-medium text-sm text-white mb-0.5">{a.name}</div>
                  <div className="text-xs text-white/40">{a.desc}</div>
                </div>
                <div className="text-red-400 font-semibold text-sm flex-shrink-0 ml-4">From {a.from}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-headline">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.q} className="glass-card p-6">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-white/55 mb-8">Our team responds within 2 hours on business days.</p>
          <Link href="/contact" className="gold-btn inline-flex items-center gap-2">
            Talk to Our Team <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
