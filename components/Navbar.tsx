'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, Menu, X } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/8' : ''
      }`}
      style={{
        background: scrolled
          ? 'rgba(10,15,30,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D77E)' }}>
            <Globe className="w-4 h-4 text-navy-900" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight">Atlas</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link">{t('nav.features')}</a>
          <a href="#jurisdictions" className="nav-link">{t('nav.jurisdictions')}</a>
          <a href="#pricing" className="nav-link">{t('nav.pricing')}</a>
          <Link href="/dashboard" className="nav-link">{t('nav.dashboard')}</Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-sm font-medium text-white/70 hover:text-white hover:border-gold-500/40 transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <Link
            href="/start"
            id="nav-get-started"
            className="gold-btn text-sm px-6 py-2.5"
          >
            {t('nav.getStarted')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          id="nav-mobile-menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4"
          style={{ background: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(20px)' }}
        >
          <a href="#features" className="text-sm font-medium text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('nav.features')}</a>
          <a href="#jurisdictions" className="text-sm font-medium text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('nav.jurisdictions')}</a>
          <a href="#pricing" className="text-sm font-medium text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('nav.pricing')}</a>
          <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white" onClick={() => setMenuOpen(false)}>{t('nav.dashboard')}</Link>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="px-3 py-2 rounded-lg border border-white/15 text-sm text-white/70"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
            <Link href="/start" className="gold-btn text-sm px-6 py-2.5 flex-1 text-center">
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
