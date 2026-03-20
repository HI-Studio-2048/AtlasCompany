'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Copy, Check, Download, Mail, MessageSquare, Globe2,
  FileText, Image as ImageIcon, ChevronRight, Zap, Users, DollarSign
} from 'lucide-react'

// ─── Copy-to-clipboard hook ──────────────────────────────────────────────────
function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), timeout)
  }
  return { copied, copy }
}

// ─── Email Templates ─────────────────────────────────────────────────────────
const emailTemplates = [
  {
    id: 'email-cold',
    label: 'Cold Outreach',
    subject: "Protect your brand internationally — here's how",
    body: `Hi [Name],

If you run a business that operates online or internationally, protecting your brand matters more than most people realize.

I've been using Atlas for global trademark registration, company formation, and DMCA protection — and it's been genuinely excellent. They handle filings in 180+ countries and the whole process is surprisingly straightforward.

If it sounds relevant, you can learn more here: https://atlas.co/ref/YOURCODE

Happy to answer any questions if you want to chat about it.

[Your Name]`,
  },
  {
    id: 'email-warm',
    label: 'Warm Referral',
    subject: 'Thought this might help you',
    body: `Hey [Name],

Quick note — you mentioned wanting to protect your brand/business name. I've been using Atlas for exactly that and can't recommend it enough.

They do global trademark registrations, DMCA takedowns, company formation in places like Delaware, Singapore, Dubai — all handled by real lawyers without the usual agency overhead.

My referral link: https://atlas.co/ref/YOURCODE

Let me know what you think!

[Your Name]`,
  },
  {
    id: 'email-newsletter',
    label: 'Newsletter / List',
    subject: 'The tool I use to protect my brand globally',
    body: `One thing I get asked about constantly: how do I protect my brand from copycats and domain squatters internationally?

Short answer: Atlas.

They handle trademark registrations across 180+ countries, DMCA takedowns, and offshore company formation — all under one roof. I've used them for my own trademarks and the process is fast, transparent, and a fraction of what a traditional law firm charges.

→ Check them out here: https://atlas.co/ref/YOURCODE

(Full disclosure: that's my affiliate link. I only recommend things I actually use.)`,
  },
]

// ─── Social Media Copy ───────────────────────────────────────────────────────
const socialPosts = [
  {
    id: 'tw-1',
    platform: 'Twitter / X',
    label: 'Pain Point',
    char: 280,
    text: `If you have a brand worth protecting, you need a trademark — not just in the US, but globally.

Atlas handles international trademark registration, DMCA takedowns, and company formation in 180+ countries.

The pricing is transparent and they actually know what they're doing: https://atlas.co/ref/YOURCODE`,
  },
  {
    id: 'tw-2',
    platform: 'Twitter / X',
    label: 'Social Proof',
    char: 280,
    text: `I registered my trademark internationally through Atlas and it was shockingly painless.

They cover 180+ jurisdictions, handle all the legal paperwork, and the team actually responds to your questions.

If you've been putting off brand protection, this is the move: https://atlas.co/ref/YOURCODE`,
  },
  {
    id: 'li-1',
    platform: 'LinkedIn',
    label: 'Thought Leadership',
    char: 700,
    text: `Most founders wait until they're copied to start thinking about trademarks.

By then, it's often too late — or expensive to fix.

Here's what I've learned: international brand protection doesn't have to be complicated or absurdly expensive. You just need the right partner.

I've been using Atlas for:
• Global trademark registration (180+ countries)
• DMCA takedowns for content theft
• Company formation in Delaware, Singapore, Dubai, and more

If you're building something worth protecting — and you are — this is worth your time.

→ https://atlas.co/ref/YOURCODE`,
  },
  {
    id: 'li-2',
    platform: 'LinkedIn',
    label: 'Quick Win',
    char: 400,
    text: `Quick tip for any founder reading this:

Your brand name is an asset. An unregistered one is a liability.

I've been using Atlas to handle global trademark filings and DMCA protection. They cover 180+ jurisdictions and the process is actually straightforward.

Link in bio — or here: https://atlas.co/ref/YOURCODE`,
  },
  {
    id: 'ig-1',
    platform: 'Instagram / TikTok',
    label: 'Caption',
    char: 300,
    text: `Protect your brand before someone else steals it 🔒

Atlas handles global trademark registration, company formation, and DMCA takedowns — all in one place, across 180+ countries.

I've used them and it's genuinely the easiest way to get proper international protection.

Link in bio 👆 (or: atlas.co/ref/YOURCODE)`,
  },
]

// ─── Talking Points / Objection Handlers ─────────────────────────────────────
const talkingPoints = [
  {
    objection: '"I don\'t think I need a trademark."',
    response: 'If you have a brand name, logo, or product name — you need a trademark. Without one, anyone can register it first and force you to rebrand. The question isn\'t whether you need one, it\'s how quickly you should get one.',
  },
  {
    objection: '"I already registered in the US, I\'m covered."',
    response: 'US registration only protects you in the US. If you sell internationally or your brand is visible online (which it is), competitors in other countries can register your mark and either block your expansion or demand licensing fees.',
  },
  {
    objection: '"This is too expensive."',
    response: 'Atlas is significantly cheaper than a traditional IP law firm — and you get real attorneys handling your filings, not paralegals. Consider: one failed trademark fight can cost $20,000–$100,000. The cost of protection is a rounding error by comparison.',
  },
  {
    objection: '"I\'ll deal with it later."',
    response: 'Trademark rights are first-come, first-served in most countries. Every month you wait is a month someone else can file first. Getting in early is cheaper and gives you priority rights.',
  },
  {
    objection: '"I\'ve never heard of Atlas."',
    response: 'Atlas is a newer company built by people who thought the traditional IP and company formation process was broken. No stuffy firm, no surprise billing, transparent pricing, and real lawyers who specialize in international IP.',
  },
]

// ─── Banner Specs ─────────────────────────────────────────────────────────────
const bannerSpecs = [
  { size: '728 × 90', label: 'Leaderboard', use: 'Blog header / footer, forums' },
  { size: '300 × 250', label: 'Medium Rectangle', use: 'Sidebar, in-content placements' },
  { size: '160 × 600', label: 'Wide Skyscraper', use: 'Sidebar, right-rail' },
  { size: '320 × 50',  label: 'Mobile Banner',   use: 'Mobile web, apps' },
  { size: '1200 × 628', label: 'Social Share OG', use: 'Link preview, Facebook, LinkedIn' },
]

// ─── Platform badge color ────────────────────────────────────────────────────
function platformColor(p: string) {
  if (p.includes('Twitter')) return { bg: 'rgba(29,161,242,0.1)', border: 'rgba(29,161,242,0.25)', text: '#1DA1F2' }
  if (p.includes('LinkedIn')) return { bg: 'rgba(10,102,194,0.12)', border: 'rgba(10,102,194,0.25)', text: '#0A66C2' }
  return { bg: 'rgba(225,48,108,0.1)', border: 'rgba(225,48,108,0.25)', text: '#E1306C' }
}

export default function AffiliateResourcesPage() {
  const { copied, copy } = useCopy()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[600px] h-[600px] opacity-12"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', right: '-5%' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="section-badge mb-4"><Zap size={14} /> Marketing Resources</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
                Your Affiliate<br /><span className="gold-text">Resource Kit</span>
              </h1>
              <p className="text-white/55 text-lg max-w-xl leading-relaxed">
                Everything you need to promote Atlas — copy-ready email templates, social posts, talking points, and banner specs. Just swap in your referral link.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/affiliates/portal"
                className="gold-btn inline-flex items-center gap-2 text-sm justify-center">
                Go to Your Portal <ChevronRight size={16} />
              </Link>
              <Link href="/affiliates"
                className="px-5 py-3 rounded-xl border border-white/12 text-sm text-white/55 hover:text-white hover:border-white/25 transition-all duration-200 text-center">
                Program Overview
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-10 text-sm">
            {[
              { icon: Mail, label: '3 Email Templates' },
              { icon: MessageSquare, label: '5 Social Posts' },
              { icon: FileText, label: '5 Objection Scripts' },
              { icon: ImageIcon, label: '5 Banner Specs' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-white/45">
                <s.icon size={14} className="text-red-400" />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Referral Link Reminder ─── */}
      <section className="px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-white/40 mb-1">Replace <code className="text-red-400">YOURCODE</code> in all templates with your actual referral code — find it in your portal.</p>
              <code className="text-sm text-red-400">https://atlas.co/ref/YOURCODE</code>
            </div>
            <Link href="/affiliates/portal"
              className="text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0 flex items-center gap-2 transition-all duration-200"
              style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: '#DC2626' }}>
              Get My Code <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Email Templates ─── */}
      <section className="py-16 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <Mail size={18} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Email Templates</h2>
              <p className="text-sm text-white/45">Ready-to-send — personalize then hit send.</p>
            </div>
          </div>
          <div className="space-y-6">
            {emailTemplates.map(t => (
              <div key={t.id} className="glass-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                  <div>
                    <span className="font-semibold text-white">{t.label}</span>
                    <p className="text-xs text-white/40 mt-0.5">Subject: <span className="text-white/60 italic">{t.subject}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copy(`${t.id}-subj`, t.subject)}
                      className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>
                      {copied === `${t.id}-subj` ? <><Check size={11} /> Subject copied</> : <>Copy subject</>}
                    </button>
                    <button
                      onClick={() => copy(t.id, t.body)}
                      className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200"
                      style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copied === t.id ? '#4ade80' : '#DC2626' }}>
                      {copied === t.id ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy email</>}
                    </button>
                  </div>
                </div>
                <pre className="px-6 py-5 text-sm text-white/60 leading-relaxed whitespace-pre-wrap font-sans">{t.body}</pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Media Copy ─── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <MessageSquare size={18} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Social Media Copy</h2>
              <p className="text-sm text-white/45">Optimized for each platform — copy, paste, post.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {socialPosts.map(p => {
              const colors = platformColor(p.platform)
              return (
                <div key={p.id} className="glass-card overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}>
                        {p.platform}
                      </span>
                      <span className="text-xs text-white/40">{p.label}</span>
                    </div>
                    <button
                      onClick={() => copy(p.id, p.text)}
                      className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200"
                      style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copied === p.id ? '#4ade80' : '#DC2626' }}>
                      {copied === p.id ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                    </button>
                  </div>
                  <div className="px-5 py-4 flex-1">
                    <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{p.text}</p>
                  </div>
                  <div className="px-5 py-2.5 border-t border-white/5">
                    <span className="text-[11px] text-white/25">{p.char} char limit</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Talking Points / Objection Handlers ─── */}
      <section className="py-16 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <FileText size={18} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Objection Handlers</h2>
              <p className="text-sm text-white/45">Common pushbacks and how to respond. Great for DMs, calls, and comments.</p>
            </div>
          </div>
          <div className="space-y-4">
            {talkingPoints.map((t, i) => (
              <div key={i} className="glass-card p-6 group hover:border-red-600/25 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white/80 mb-3 italic">{t.objection}</p>
                    <p className="text-sm text-white/55 leading-relaxed">{t.response}</p>
                  </div>
                  <button
                    onClick={() => copy(`tp-${i}`, `Objection: ${t.objection}\n\nResponse: ${t.response}`)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copied === `tp-${i}` ? '#4ade80' : '#DC2626' }}>
                    {copied === `tp-${i}` ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Banner Specs ─── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <ImageIcon size={18} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Banner Ad Specs</h2>
              <p className="text-sm text-white/45">Standard IAB sizes — contact us if you need custom creatives.</p>
            </div>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Size', 'Name', 'Best Used For', 'Request Creative'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bannerSpecs.map((b, i) => (
                  <tr key={b.size} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === bannerSpecs.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-6 py-4">
                      <code className="text-xs text-red-400 font-mono">{b.size}</code>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{b.label}</td>
                    <td className="px-6 py-4 text-white/50">{b.use}</td>
                    <td className="px-6 py-4">
                      <a href="mailto:affiliates@atlas.co?subject=Banner Creative Request"
                        className="text-xs flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors">
                        <Download size={12} /> Request
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-white/30 mt-4 text-center">
            Need custom creatives, co-branded materials, or a specific format?{' '}
            <a href="mailto:affiliates@atlas.co" className="text-red-400 hover:underline">Email us</a> and we&apos;ll sort it.
          </p>
        </div>
      </section>

      {/* ─── Key Messaging / Brand Guidelines ─── */}
      <section className="py-16 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <Globe2 size={18} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Key Messages & Brand Guidelines</h2>
              <p className="text-sm text-white/45">Use these when describing Atlas. Accuracy builds trust.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Key messages */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign size={16} className="text-red-400" /> Core Value Props
              </h3>
              <ul className="space-y-3">
                {[
                  '180+ countries for trademark registration',
                  '15% lifetime commission for you — no cap',
                  'Avg. client transaction value: $550+',
                  'Real lawyers, not paralegals',
                  'Transparent, upfront pricing',
                  'Services: trademark, company formation, DMCA',
                  'Jurisdictions: US, UK, EU, Singapore, UAE, HK, and more',
                ].map(m => (
                  <li key={m} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            {/* Do / Don't */}
            <div className="space-y-4">
              <div className="glass-card p-5">
                <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                  <span className="text-green-400">✓</span> Do say
                </h3>
                <ul className="space-y-2">
                  {[
                    '"Global trademark registration"',
                    '"Real legal protection across 180+ countries"',
                    '"Transparent, fixed pricing"',
                    '"I use Atlas myself"',
                  ].map(s => (
                    <li key={s} className="text-sm text-white/55">{s}</li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                  <span className="text-red-400">✕</span> Don&apos;t say
                </h3>
                <ul className="space-y-2">
                  {[
                    'Guaranteed trademark approval',
                    '"They\'re the cheapest option" (we\'re not; we\'re the best value)',
                    'Any specific client names without permission',
                    'Income claims beyond what Atlas publishes',
                  ].map(s => (
                    <li key={s} className="text-sm text-white/55">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Promoting?</h2>
          <p className="text-white/50 mb-8">Head to your portal to grab your referral link and start earning.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/affiliates/portal" className="gold-btn inline-flex items-center gap-2">
              <Users size={16} /> Go to Portal
            </Link>
            <Link href="/affiliates" className="px-6 py-3 rounded-xl border border-white/12 text-white/60 hover:text-white hover:border-white/25 transition-all duration-200 text-sm font-medium inline-flex items-center gap-2">
              Program Details <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
