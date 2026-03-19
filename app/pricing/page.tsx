'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Check, X, ChevronRight, Zap, Building2, Globe2, Award } from 'lucide-react'

const plans = [
  {
    id: 'starter',
    icon: Zap,
    name: 'Starter',
    price: '$299',
    period: 'one-time',
    desc: 'Perfect for first-time global entrepreneurs.',
    cta: 'Get Started',
    popular: false,
    features: [
      { text: '1 jurisdiction of your choice', included: true },
      { text: 'Company formation documents', included: true },
      { text: 'Registered agent (1 year)', included: true },
      { text: 'Digital delivery of certificates', included: true },
      { text: 'Bank introduction letter', included: true },
      { text: 'Basic compliance calendar', included: true },
      { text: 'Multi-jurisdiction support', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'Priority formation (24hr)', included: false },
      { text: 'Trademark filing included', included: false },
    ],
  },
  {
    id: 'growth',
    icon: Building2,
    name: 'Growth',
    price: '$699',
    period: 'one-time',
    desc: 'For serious businesses expanding globally.',
    cta: 'Get Started',
    popular: true,
    features: [
      { text: 'Up to 3 jurisdictions', included: true },
      { text: 'Company formation documents', included: true },
      { text: 'Registered agent (1 year)', included: true },
      { text: 'Digital delivery of certificates', included: true },
      { text: 'Bank introduction letter', included: true },
      { text: 'Full compliance calendar', included: true },
      { text: 'Multi-jurisdiction support', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Priority formation (24hr)', included: true },
      { text: 'Trademark filing included', included: false },
    ],
  },
  {
    id: 'enterprise',
    icon: Globe2,
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    desc: 'High-volume formations and white-glove service.',
    cta: 'Talk to Sales',
    popular: false,
    features: [
      { text: 'Unlimited jurisdictions', included: true },
      { text: 'Company formation documents', included: true },
      { text: 'Registered agent (1 year)', included: true },
      { text: 'Digital delivery of certificates', included: true },
      { text: 'Bank introduction letter', included: true },
      { text: 'Full compliance calendar', included: true },
      { text: 'Multi-jurisdiction support', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Priority formation (24hr)', included: true },
      { text: 'Trademark filing included', included: true },
    ],
  },
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
  { q: 'How long does company formation take?', a: 'Most companies are ready in 3-5 business days. Growth plan clients get priority 24-hour processing for select jurisdictions.' },
  { q: 'What\'s included in "registered agent"?', a: 'We act as your registered agent for the first year, receiving official government correspondence on your behalf and forwarding it securely.' },
  { q: 'Can I add more jurisdictions later?', a: 'Yes — you can always add additional jurisdictions at any time. Each additional jurisdiction is priced based on the local government fees plus our service fee.' },
  { q: 'Do you offer refunds?', a: 'If your application is rejected by the government authority for any reason, we refund 100% of our service fee. Government filing fees are non-refundable.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, wire transfer, and cryptocurrency (Bitcoin, USDC, ETH).' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[600px] h-[600px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="section-badge"><Award size={14} /> Simple Pricing</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Transparent, <span className="gold-text">No Surprises</span>
          </h1>
          <p className="text-xl text-white/55 max-w-2xl mx-auto">
            One-time formation fee. No hidden government charges. No annual platform fee. Pay once, own forever.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={`glass-card p-8 flex flex-col relative transition-all duration-300 ${plan.popular ? 'border-red-600/40' : 'hover:border-white/20'}`}
              style={plan.popular ? { boxShadow: '0 0 40px rgba(220,38,38,0.12)' } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)', color: '#fff' }}>
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
                  <plan.icon size={22} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-white/50">{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold gold-text">{plan.price}</span>
                <span className="text-white/40 text-sm ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f.text} className="flex items-start gap-3">
                    {f.included
                      ? <Check size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      : <X size={16} className="text-white/20 flex-shrink-0 mt-0.5" />}
                    <span className={`text-sm ${f.included ? 'text-white/70' : 'text-white/25'}`}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.id === 'enterprise' ? '/contact' : '/start'}
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${plan.popular ? 'gold-btn' : 'border border-white/15 text-white/70 hover:text-white hover:border-white/30'}`}
              >
                {plan.cta} <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-headline">Add-On Services</h2>
            <p className="section-sub">Enhance your plan with any of our additional services.</p>
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
