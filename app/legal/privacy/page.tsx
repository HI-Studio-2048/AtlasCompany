'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield } from 'lucide-react'

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, submit a company formation application, file a trademark application, or contact us for support.

**Information you provide:**
- Name, email address, phone number, and business information
- Identity documents required for company formation (passport, proof of address)
- Payment information (processed securely via Stripe — we do not store card details)
- Communications with our team

**Information collected automatically:**
- Usage data, IP addresses, browser type, pages visited
- Cookies and similar tracking technologies for session management and analytics`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
- Process and manage your company formation applications
- File trademark applications on your behalf
- Verify your identity as required by applicable law and regulations
- Communicate with you about your applications and services
- Send service-related emails and notifications
- Improve our platform and develop new services
- Comply with legal obligations including anti-money laundering (AML) and Know Your Customer (KYC) requirements`,
  },
  {
    title: '3. Legal Basis for Processing (GDPR)',
    content: `For users in the European Economic Area, we process personal data under the following legal bases:
- **Contract performance:** Processing necessary to provide our services
- **Legal obligation:** Processing required to comply with KYC, AML, and other regulatory requirements
- **Legitimate interests:** Processing for fraud prevention, security, and service improvement
- **Consent:** Where you have provided explicit consent (e.g., marketing communications)`,
  },
  {
    title: '4. Data Sharing and Disclosure',
    content: `We share your information only in the following circumstances:
- **Government authorities:** We submit your information to relevant government agencies and company registrars to complete your formation applications
- **Service providers:** We work with trusted third parties (Stripe for payments, AWS for hosting) under strict data processing agreements
- **Legal requirements:** We disclose information when required by law, court order, or government authority
- **Business transfer:** In connection with a merger, acquisition, or sale of assets (with prior notice)

We do not sell your personal information to third parties.`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
- Account data: For the duration of your account plus 7 years
- Company formation records: Minimum 10 years (as required by corporate law)
- Payment records: 7 years (tax and accounting requirements)
- Communications: 3 years

You may request deletion of your account and personal data, subject to our legal retention obligations.`,
  },
  {
    title: '6. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:
- **Access:** Request a copy of the personal data we hold about you
- **Rectification:** Request correction of inaccurate data
- **Erasure:** Request deletion of your data (subject to legal retention requirements)
- **Portability:** Request your data in a machine-readable format
- **Objection:** Object to certain types of processing
- **Restriction:** Request that we restrict processing of your data

To exercise these rights, contact us at privacy@atlas.co.`,
  },
  {
    title: '7. Security',
    content: `We implement industry-standard security measures to protect your information:
- AES-256 encryption for data at rest
- TLS 1.3 encryption for data in transit
- Multi-factor authentication for all internal systems
- Regular third-party security audits and penetration testing
- SOC 2 Type II certified infrastructure

Despite these measures, no system is completely secure. Please use strong, unique passwords and enable two-factor authentication on your Atlas account.`,
  },
  {
    title: '8. Cookies',
    content: `We use cookies and similar technologies for:
- **Essential cookies:** Required for the platform to function (session management, security)
- **Analytics cookies:** Help us understand how users interact with our platform (Google Analytics)
- **Preference cookies:** Remember your language and display preferences

You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality.`,
  },
  {
    title: '9. Contact Us',
    content: `For privacy-related inquiries, contact our Data Protection Officer:

**Email:** privacy@atlas.co
**Mail:** Atlas Company, 1 Raffles Place, #20-61, Singapore 048616

For EU residents, you also have the right to lodge a complaint with your local data protection authority.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navbar />
      <section className="relative pt-32 pb-12 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[400px] h-[400px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="section-badge mb-4"><Shield size={14} /> Legal</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: March 19, 2025</p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 mb-6">
            <p className="text-white/65 leading-relaxed">
              Atlas Company (&quot;Atlas&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
            </p>
          </div>
          <div className="space-y-4">
            {sections.map(s => (
              <div key={s.title} className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-3">{s.title}</h2>
                <div className="text-sm text-white/60 leading-relaxed space-y-2 whitespace-pre-line">
                  {s.content.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={i} className="font-semibold text-white/80">{line.replace(/\*\*/g, '')}</p>
                    }
                    if (line.match(/^\*\*(.+?):\*\*/)) {
                      const [bold, ...rest] = line.split(':**')
                      return <p key={i}><strong className="text-white/80">{bold.replace('**', '')}:</strong>{rest.join(':**')}</p>
                    }
                    if (line.startsWith('- ')) {
                      return <p key={i} className="pl-4 flex gap-2"><span className="text-red-400 flex-shrink-0">—</span>{line.slice(2)}</p>
                    }
                    return line.trim() ? <p key={i}>{line}</p> : null
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/contact" className="gold-btn inline-flex items-center gap-2">Privacy Questions? Contact Us</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
