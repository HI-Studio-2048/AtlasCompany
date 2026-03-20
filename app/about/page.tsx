'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Globe2, Shield, Zap, Users, Award, Target, ChevronRight, Building2 } from 'lucide-react'

const values = [
  { icon: Globe2,    title: 'Global by Default',   desc: 'We believe every entrepreneur deserves access to the best jurisdictions, structures, and protections in the world — regardless of where they were born.' },
  { icon: Shield,   title: 'Compliance First',     desc: 'We never cut corners. Every company we form is fully compliant, properly documented, and built to last.' },
  { icon: Zap,      title: 'Speed Matters',        desc: 'Traditional formation takes weeks. We do it in days. We\'ve re-engineered every step of the process to move at the speed of business.' },
  { icon: Users,    title: 'Client-Centric',       desc: 'You get a dedicated account manager from day one. We\'re not a form-submission service — we\'re a long-term business partner.' },
]

const team = [
  { name: 'Daniel S.',   role: 'Founder & CEO',        initials: 'DS', bio: 'Serial entrepreneur. Previously built and exited two fintech companies across three jurisdictions.' },
  { name: 'Sarah Chen',  role: 'Head of Legal',         initials: 'SC', bio: 'Former corporate attorney at Clifford Chance. Expert in cross-border structuring and IP law.' },
  { name: 'Marcus K.',   role: 'Head of Operations',    initials: 'MK', bio: 'Previously ran global operations at a Big Four accounting firm across 20+ countries.' },
  { name: 'Aiko T.',     role: 'Asia Pacific Director', initials: 'AT', bio: 'Based in Singapore. Expert in APAC market entry, MAS regulations, and HKEX listings.' },
  { name: 'Luca R.',     role: 'Head of IP & DMCA',     initials: 'LR', bio: 'Trademark attorney with 100+ international registrations and DMCA enforcement experience.' },
  { name: 'Priya M.',    role: 'Head of Technology',    initials: 'PM', bio: 'Ex-Google engineer. Leads our platform development and AI-powered monitoring systems.' },
]

const milestones = [
  { year: '2022', event: 'Atlas founded with a mission to democratize global business formation.' },
  { year: '2023', event: 'Expanded to 30 jurisdictions. First 500 companies formed on the platform.' },
  { year: '2024', event: 'Launched trademark filing & DMCA services. Crossed $500M in assets managed.' },
  { year: '2025', event: 'Now serving entrepreneurs from 80+ countries across 50+ jurisdictions.' },
]

const stats = [
  { val: '50+',  label: 'Jurisdictions' },
  { val: '5,000+', label: 'Companies Formed' },
  { val: '$2B+', label: 'Assets Managed' },
  { val: '80+',  label: 'Countries Served' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[600px] h-[600px] opacity-15" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="section-badge"><Target size={14} /> Our Mission</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Building the{' '}
            <span className="gold-text">Global Business</span>{' '}
            Infrastructure
          </h1>
          <p className="text-xl text-white/55 max-w-3xl mx-auto leading-relaxed">
            Atlas was founded on a simple belief: the best business structures, jurisdictions, and IP protections shouldn&apos;t be reserved for the Fortune 500. We&apos;re making them accessible to every entrepreneur on earth.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="glass-card p-6 text-center">
              <div className="text-4xl font-bold gold-text mb-1">{s.val}</div>
              <div className="text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-badge mb-4"><Building2 size={14} /> Who We Are</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              More Than a Formation Service
            </h2>
            <p className="text-white/60 mb-5 leading-relaxed">
              Atlas is a full-service global business platform. We help entrepreneurs form companies in 50+ jurisdictions, protect their brands with international trademark registration, enforce their IP with DMCA takedowns, and monitor for infringement 24/7.
            </p>
            <p className="text-white/60 leading-relaxed">
              Our team combines legal expertise, technology, and deep local knowledge across every major business hub — from Delaware to Singapore, from the British Virgin Islands to the UAE.
            </p>
          </div>
          <div className="space-y-4">
            {milestones.map(m => (
              <div key={m.year} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-14 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#DC2626' }}>
                  {m.year}
                </div>
                <p className="text-sm text-white/60 leading-relaxed pt-1">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-badge"><Award size={14} /> Our Values</div>
            <h2 className="section-headline">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="glass-card p-6 hover:border-red-600/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
                  <v.icon size={22} className="text-red-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-badge"><Users size={14} /> Our Team</div>
            <h2 className="section-headline">The People Behind Atlas</h2>
            <p className="section-sub">Legal experts, technologists, and operators with deep experience across global markets.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <div key={member.name} className="glass-card p-6 hover:border-red-600/30 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)', color: '#000' }}>
                    {member.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-xs text-red-400">{member.role}</div>
                  </div>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Global?</h2>
          <p className="text-white/55 mb-8 text-lg">Join thousands of entrepreneurs who trust Atlas to power their international business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="gold-btn inline-flex items-center gap-2">
              Start Your Company <ChevronRight size={18} />
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-xl border border-white/15 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all duration-200">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
