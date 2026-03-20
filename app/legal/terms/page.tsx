'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FileText } from 'lucide-react'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Atlas Company platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you do not have permission to access the Service.

These Terms apply to all visitors, users, and others who access or use the Service.`,
  },
  {
    title: '2. Description of Services',
    content: `Atlas Company provides business formation services, trademark registration, DMCA takedown services, and brand monitoring services. Our services include:
- Company incorporation and registration in supported jurisdictions
- Preparation and filing of company formation documents
- Registered agent and nominee director services
- Trademark filing with national and international IP offices
- DMCA takedown notice preparation and filing
- Ongoing brand monitoring and enforcement

We act as a service facilitator. Legal and regulatory decisions are made by relevant government authorities, not by Atlas.`,
  },
  {
    title: '3. Client Obligations',
    content: `You agree to:
- Provide accurate, complete, and truthful information for all applications
- Comply with all applicable laws in your jurisdiction and target jurisdictions
- Promptly respond to requests for additional information or documentation
- Not use our services for illegal purposes, including fraud, money laundering, or tax evasion
- Maintain the confidentiality of your account credentials
- Notify us immediately of any unauthorized access to your account

Failure to comply with these obligations may result in suspension or termination of services.`,
  },
  {
    title: '4. Payment Terms',
    content: `**Formation Services:** Fees are due in full before we begin processing your application. All fees include our service fee plus estimated government filing fees.

**Additional Services:** Add-on services (trademark filing, DMCA, monitoring) are billed separately as ordered.

**Refund Policy:** 
- If a government authority rejects your application for reasons outside your control, we refund our service fee in full
- Government filing fees are non-refundable in all cases
- Refunds are processed within 10 business days

**Currency:** All prices are in US Dollars unless otherwise stated.`,
  },
  {
    title: '5. Intellectual Property',
    content: `The Service and its original content, features, and functionality are and will remain the exclusive property of Atlas Company and its licensors.

Documents, certificates, and company materials we produce for you become your property upon full payment. The Atlas name, logo, and trademarks may not be used without prior written consent.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `To the maximum extent permitted by law, Atlas Company shall not be liable for:
- Government rejection of formation applications or trademark filings
- Delays caused by government processing times
- Changes in law or regulation affecting your company or trademark
- Actions of government authorities, banks, or third parties
- Loss of business, profits, or data arising from use of our services
- Any indirect, incidental, special, or consequential damages

Our total liability to you for any claims under these Terms shall not exceed the fees you paid to us in the 12 months prior to the claim.`,
  },
  {
    title: '7. Governing Law and Disputes',
    content: `These Terms shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law provisions.

Any dispute arising from these Terms shall be first attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in Singapore under the Singapore International Arbitration Centre (SIAC) rules.`,
  },
  {
    title: '8. Modifications to Terms',
    content: `We reserve the right to modify these Terms at any time. We will notify you of material changes by email and by a prominent notice on the Service.

Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.`,
  },
  {
    title: '9. Contact',
    content: `For questions about these Terms, contact us at legal@atlas.co or visit our Contact page.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative pt-32 pb-12 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[400px] h-[400px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="section-badge mb-4"><FileText size={14} /> Legal</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: March 19, 2025</p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 mb-6">
            <p className="text-white/65 leading-relaxed">
              Please read these Terms of Service carefully before using the Atlas Company platform. These Terms constitute a legally binding agreement between you and Atlas Company regarding your use of our services.
            </p>
          </div>
          <div className="space-y-4">
            {sections.map(s => (
              <div key={s.title} className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-3">{s.title}</h2>
                <div className="text-sm text-white/60 leading-relaxed space-y-2">
                  {s.content.split('\n').map((line, i) => {
                    if (line.match(/^\*\*(.+?)\*\*$/)) return <p key={i} className="font-semibold text-white/80">{line.replace(/\*\*/g, '')}</p>
                    if (line.match(/^\*\*(.+?):\*\*/)) {
                      const parts = line.split(':**')
                      return <p key={i}><strong className="text-white/80">{parts[0].replace('**', '')}:</strong>{parts.slice(1).join(':**')}</p>
                    }
                    if (line.startsWith('- ')) return <p key={i} className="pl-4 flex gap-2"><span className="text-red-400 flex-shrink-0">—</span>{line.slice(2)}</p>
                    return line.trim() ? <p key={i}>{line}</p> : null
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/contact" className="gold-btn inline-flex items-center gap-2">Questions? Contact Us</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
