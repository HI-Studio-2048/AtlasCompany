'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { blogPosts, categories } from '@/data/blog'
import { Clock, ArrowRight, BookOpen, User } from 'lucide-react'

export default function BlogPage() {
  const { t } = useLang()
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = blogPosts.find(p => p.featured)
  const filtered = activeCategory === 'All'
    ? blogPosts.filter(p => !p.featured)
    : blogPosts.filter(p => p.category === activeCategory && !p.featured)

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden dot-grid">
        <div
          className="glow-orb w-[600px] h-[600px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="section-badge">
            <BookOpen size={14} />
            {t('blog.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {t('blog.headline').split(' ').slice(0, 2).join(' ')}{' '}
            <span className="gold-text">{t('blog.headline').split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-xl text-white/55 max-w-2xl mx-auto">
            {t('blog.sub')}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
              style={{
                border: activeCategory === cat ? '1px solid #DC2626' : '1px solid rgba(255,255,255,0.1)',
                background: activeCategory === cat ? 'rgba(220,38,38,0.1)' : 'rgba(28,28,28,0.3)',
                color: activeCategory === cat ? '#DC2626' : 'rgba(255,255,255,0.6)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {featured && activeCategory === 'All' && (
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <Link href={`/blog/${featured.slug}`}>
              <div className="glass-card p-8 md:p-12 hover:border-red-600/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="glow-orb w-[250px] h-[250px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)', top: '-15%', right: '-3%' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-red-600/30 text-red-400 bg-red-500/5">
                      Featured
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/50">
                      {featured.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/55 mb-6 max-w-3xl leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-white/40">
                    <span className="flex items-center gap-1.5"><User size={14} /> {featured.author}</span>
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {featured.readTime}</span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-red-400 font-medium text-sm group-hover:gap-3 transition-all duration-200">
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass-card p-6 hover:border-red-600/30 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                  {/* Category tag */}
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/50">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-red-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-white/35 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <ArrowRight size={14} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/40">
              <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
              <p>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
