'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { blogPosts } from '@/data/blog'
import { ArrowLeft, Clock, User, ChevronRight } from 'lucide-react'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-navy-900 text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-white/50 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog" className="gold-btn inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Get related posts
  const related = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navbar />

      {/* Article Header */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden dot-grid">
        <div
          className="glow-orb w-[500px] h-[500px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-red-600/30 text-red-400 bg-red-500/5">
              {post.category}
            </span>
            <span className="text-sm text-white/40 flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 text-sm text-white/40 pb-8 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.25)' }}>
                <User size={14} className="text-red-400" />
              </div>
              <span>{post.author}</span>
            </div>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/65 prose-p:leading-relaxed prose-p:mb-5
              prose-li:text-white/60
              prose-strong:text-white prose-strong:font-semibold
              prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
              prose-table:border-collapse
              prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:text-white/70
              prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:text-white/55
              prose-code:text-red-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:border-l-red-500 prose-blockquote:text-white/50
              prose-ol:text-white/60 prose-ul:text-white/60
            "
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 text-center relative overflow-hidden">
            <div className="glow-orb w-[200px] h-[200px] opacity-10" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, transparent 70%)', top: '-30%', left: '50%', transform: 'translateX(-50%)' }} />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
              <p className="text-white/50 mb-5 text-sm">Join thousands of entrepreneurs building global businesses with Atlas.</p>
              <Link href="/start" className="gold-btn inline-flex items-center gap-2">
                Start Your Company <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-6 text-white/80">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <div className="glass-card p-5 hover:border-red-600/30 transition-all duration-300 group cursor-pointer">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">{r.category}</span>
                    <h4 className="font-semibold text-sm mt-2 mb-2 group-hover:text-red-400 transition-colors leading-snug">{r.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-white/30">
                      <span>{r.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{r.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

// Simple markdown to HTML converter for blog content
function markdownToHtml(md: string): string {
  let html = md.trim()

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    return match
  })
  const tableRegex = /((?:\|.+\|(?:\r?\n))+)/g
  html = html.replace(tableRegex, (table) => {
    const rows = table.trim().split('\n').filter(r => r.trim())
    if (rows.length < 2) return table
    const headerCells = rows[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('')
    const dataRows = rows.slice(2).map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cells}</tr>`
    }).join('')
    return `<table><thead><tr>${headerCells}</tr></thead><tbody>${dataRows}</tbody></table>`
  })

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.+<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Paragraphs
  html = html.replace(/^(?!<[hultdao])((?!<).+)$/gm, '<p>$1</p>')

  // Clean empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}
