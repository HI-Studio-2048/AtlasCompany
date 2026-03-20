'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, Menu, X, Sun, Moon } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b' : ''
      }`}
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderColor: scrolled ? 'var(--nav-border)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
            <Globe className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text)' }}>Atlas</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link">{t('nav.features')}</a>
          <a href="#jurisdictions" className="nav-link">{t('nav.jurisdictions')}</a>
          <Link href="/trademarks" className="nav-link">{t('nav.trademarks')}</Link>
          <Link href="/blog" className="nav-link">{t('nav.blog')}</Link>
          <a href="#pricing" className="nav-link">{t('nav.pricing')}</a>
          <Link href="/dashboard" className="nav-link">{t('nav.dashboard')}</Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ border: '1px solid var(--border-strong)', color: 'var(--text-2)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ border: '1px solid var(--border-strong)', color: 'var(--text-2)' }}
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
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg"
            style={{ color: 'var(--text-2)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 rounded-lg"
            style={{ color: 'var(--text-2)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            id="nav-mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{
            background: 'var(--nav-bg)',
            borderColor: 'var(--nav-border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <a href="#features" className="text-sm font-medium nav-link" onClick={() => setMenuOpen(false)}>{t('nav.features')}</a>
          <a href="#jurisdictions" className="text-sm font-medium nav-link" onClick={() => setMenuOpen(false)}>{t('nav.jurisdictions')}</a>
          <Link href="/trademarks" className="text-sm font-medium nav-link" onClick={() => setMenuOpen(false)}>{t('nav.trademarks')}</Link>
          <Link href="/blog" className="text-sm font-medium nav-link" onClick={() => setMenuOpen(false)}>{t('nav.blog')}</Link>
          <a href="#pricing" className="text-sm font-medium nav-link" onClick={() => setMenuOpen(false)}>{t('nav.pricing')}</a>
          <Link href="/dashboard" className="text-sm font-medium nav-link" onClick={() => setMenuOpen(false)}>{t('nav.dashboard')}</Link>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text-2)' }}
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
