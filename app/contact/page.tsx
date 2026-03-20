'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, MessageSquare, ChevronRight, CheckCircle2, Clock, Globe2 } from 'lucide-react'

const offices = [
  { city: 'Singapore', flag: '🇸🇬', address: '1 Raffles Place, #20-61, Singapore 048616', email: 'apac@atlas.co' },
  { city: 'Hong Kong',  flag: '🇭🇰', address: '18/F, Two International Finance Centre, 8 Finance Street', email: 'hk@atlas.co' },
  { city: 'London',     flag: '🇬🇧', address: '1 Canada Square, Canary Wharf, London E14 5AB', email: 'uk@atlas.co' },
]

const inquiryTypes = [
  'Company Formation',
  'Trademark Filing',
  'DMCA & IP Enforcement',
  'Brand Monitoring',
  'Tax & Structuring',
  'Partnership / Referral',
  'Press & Media',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[500px] h-[500px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="section-badge"><MessageSquare size={14} /> Get In Touch</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Let&apos;s <span className="gold-text">Talk</span>
          </h1>
          <p className="text-xl text-white/55 max-w-xl mx-auto">
            Whether you&apos;re forming your first company or expanding a global portfolio — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          {[
            { icon: Clock, label: '< 2hr Response', sub: 'Average reply time' },
            { icon: Globe2, label: '80+ Countries', sub: 'Clients served' },
            { icon: Phone, label: '24/7 Support', sub: 'For active clients' },
          ].map(s => (
            <div key={s.label} className="glass-card p-5 text-center">
              <s.icon size={20} className="text-red-400 mx-auto mb-2" />
              <div className="font-semibold text-sm text-white">{s.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}>
                  <CheckCircle2 size={36} className="text-red-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Message Received!</h2>
                <p className="text-white/55 max-w-sm">Our team will review your inquiry and get back to you within 2 business hours.</p>
              </div>
            ) : (
              <div className="glass-card p-8">
                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                      <input id="contact-name" type="text" className="atlas-input" placeholder="John Smith"
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                      <input id="contact-email" type="email" className="atlas-input" placeholder="john@company.com"
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Company (Optional)</label>
                      <input id="contact-company" type="text" className="atlas-input" placeholder="Acme Corp"
                        value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Inquiry Type</label>
                      <select id="contact-type" className="atlas-select"
                        value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                        <option value="">— Select type —</option>
                        {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea id="contact-message" className="atlas-input min-h-[140px] resize-none" placeholder="Tell us about your needs..."
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                  </div>
                  <button id="contact-submit" type="submit" disabled={loading}
                    className="gold-btn w-full flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : <>Send Message <ChevronRight size={18} /></>}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}>
                  <Mail size={18} className="text-red-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">General Inquiries</div>
                  <div className="text-xs text-white/40">hello@atlas.co</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}>
                  <Phone size={18} className="text-red-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Direct Line</div>
                  <div className="text-xs text-white/40">+1 (555) 000-0100</div>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-red-400" />
                <h3 className="font-semibold text-sm text-white">Our Offices</h3>
              </div>
              <div className="space-y-4">
                {offices.map(o => (
                  <div key={o.city} className="border-t border-white/5 pt-4 first:border-0 first:pt-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{o.flag}</span>
                      <span className="text-sm font-medium text-white">{o.city}</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed mb-1">{o.address}</p>
                    <p className="text-xs text-red-400">{o.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
