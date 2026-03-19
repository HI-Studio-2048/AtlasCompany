'use client'
import Link from 'next/link'
import { Globe, Twitter, Linkedin, Mail } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const footerLinks = {
  product: [
    { label: 'Features',      labelZh: '功能',     href: '/#features' },
    { label: 'Jurisdictions', labelZh: '司法管辖区', href: '/#jurisdictions' },
    { label: 'Pricing',       labelZh: '定价',     href: '/pricing' },
    { label: 'Trademarks',    labelZh: '商标',     href: '/trademarks' },
    { label: 'Dashboard',     labelZh: '控制台',    href: '/dashboard' },
  ],
  company: [
    { label: 'About Us',   labelZh: '关于我们', href: '/about' },
    { label: 'Blog',       labelZh: '博客',    href: '/blog' },
    { label: 'Affiliates', labelZh: '联盟计划', href: '/affiliates' },
    { label: 'Contact',    labelZh: '联系我们', href: '/contact' },
  ],
  support: [
    { label: 'Help Center',      labelZh: '帮助中心',  href: '/contact' },
    { label: 'Contact',          labelZh: '联系我们',  href: '/contact' },
    { label: 'Privacy Policy',   labelZh: '隐私政策',  href: '/legal/privacy' },
    { label: 'Terms of Service', labelZh: '服务条款',  href: '/legal/terms' },
  ],
}

export default function Footer() {
  const { t, lang, setLang } = useLang()

  return (
    <footer className="border-t border-white/8 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
                <Globe className="w-4 h-4 text-navy-900" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg">Atlas</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/40 transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/40 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/40 transition-all duration-200">
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-sm text-white/60 hover:text-white hover:border-gold-500/40 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? '切换到中文' : 'Switch to English'}
            </button>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.product')}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {lang === 'en' ? link.label : link.labelZh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {lang === 'en' ? link.label : link.labelZh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {lang === 'en' ? link.label : link.labelZh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/40 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
