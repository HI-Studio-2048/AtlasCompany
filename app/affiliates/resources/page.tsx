'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Copy, Check, Download, Mail, MessageSquare, Globe2,
  FileText, Image as ImageIcon, ChevronRight, Zap, Users, DollarSign
} from 'lucide-react'

type Lang = 'en' | 'zh'

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
const emailTemplates: Record<Lang, { id: string; label: string; subject: string; body: string }[]> = {
  en: [
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
  ],
  zh: [
    {
      id: 'email-cold-zh',
      label: '陌生开发',
      subject: '如何在全球范围内保护您的品牌',
      body: `您好，[姓名]，

如果您的业务涉及线上或国际市场，品牌保护比大多数人意识到的更为重要。

我一直在使用 Atlas 进行全球商标注册、公司注册和 DMCA 版权保护——效果非常出色。他们覆盖 180 多个国家，整个流程出奇地简单。

如果您感兴趣，可以在这里了解更多：https://atlas.co/ref/YOURCODE

如有任何问题，欢迎随时交流。

[您的姓名]`,
    },
    {
      id: 'email-warm-zh',
      label: '熟人推荐',
      subject: '这个可能对您有帮助',
      body: `您好，[姓名]，

您之前提到想要保护您的品牌/商业名称。我一直在用 Atlas 做这件事，强烈推荐。

他们提供全球商标注册、DMCA 下架，以及在特拉华州、新加坡、迪拜等地的公司注册服务——全程由真正的律师处理，没有传统代理机构的冗余流程。

我的推荐链接：https://atlas.co/ref/YOURCODE

期待听到您的想法！

[您的姓名]`,
    },
    {
      id: 'email-newsletter-zh',
      label: '邮件列表 / 通讯',
      subject: '我用来在全球保护品牌的工具',
      body: `我经常被问到一个问题：如何在国际上保护我的品牌不被仿冒或域名抢注？

简短的回答：Atlas。

他们提供 180 多个国家的商标注册、DMCA 下架，以及离岸公司注册服务——一站搞定。我用他们注册了自己的商标，流程快速、透明，费用只是传统律师事务所的一小部分。

→ 点击了解：https://atlas.co/ref/YOURCODE

（披露：这是我的推广链接，我只推荐我自己实际使用的产品。）`,
    },
  ],
}

// ─── Social Media Copy ───────────────────────────────────────────────────────
const socialPosts: Record<Lang, { id: string; platform: string; label: string; char: number; text: string }[]> = {
  en: [
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
  ],
  zh: [
    {
      id: 'tw-1-zh',
      platform: '微博 / Twitter',
      label: '痛点触达',
      char: 280,
      text: `有品牌就需要商标保护——不只是在国内，更要在全球范围内。

Atlas 提供国际商标注册、DMCA 下架和 180 多个国家的公司注册服务。

定价透明，专业靠谱：https://atlas.co/ref/YOURCODE`,
    },
    {
      id: 'tw-2-zh',
      platform: '微博 / Twitter',
      label: '社会认证',
      char: 280,
      text: `我通过 Atlas 完成了国际商标注册，整个过程出乎意料地顺畅。

覆盖 180 多个司法管辖区，全程代办法律文件，团队响应及时。

如果您一直在拖延品牌保护，现在就是时候了：https://atlas.co/ref/YOURCODE`,
    },
    {
      id: 'li-1-zh',
      platform: '领英 LinkedIn',
      label: '思想领导力',
      char: 700,
      text: `大多数创始人要等到品牌被抄袭了才开始考虑商标问题。

那时候往往已经太晚，或者代价高昂。

我的经验：国际品牌保护不一定复杂，也不一定昂贵。关键是找对合作伙伴。

我一直在用 Atlas 处理：
• 全球商标注册（180+ 国家）
• 内容侵权的 DMCA 下架
• 在特拉华、新加坡、迪拜等地的公司注册

如果您正在打造值得保护的品牌——您一定是——这值得您花时间了解。

→ https://atlas.co/ref/YOURCODE`,
    },
    {
      id: 'li-2-zh',
      platform: '领英 LinkedIn',
      label: '快速干货',
      char: 400,
      text: `给每一位创始人的小建议：

您的品牌名称是资产，未注册的商标是负债。

我一直在用 Atlas 处理全球商标申请和 DMCA 保护，覆盖 180 多个司法管辖区，流程简单直接。

主页链接——或者直接点这里：https://atlas.co/ref/YOURCODE`,
    },
    {
      id: 'ig-1-zh',
      platform: '小红书 / 抖音',
      label: '文案',
      char: 300,
      text: `在别人抢注之前，先保护好自己的品牌 🔒

Atlas 提供全球商标注册、公司注册和 DMCA 下架服务——一站搞定，覆盖 180 多个国家。

亲测好用，是获得正规国际品牌保护最简便的方式。

主页链接 👆（或：atlas.co/ref/YOURCODE）`,
    },
  ],
}

// ─── Talking Points / Objection Handlers ─────────────────────────────────────
const talkingPoints: Record<Lang, { objection: string; response: string }[]> = {
  en: [
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
  ],
  zh: [
    {
      objection: '"我觉得我不需要注册商标。"',
      response: '只要您有品牌名称、Logo 或产品名称，就需要商标保护。没有注册，任何人都可以抢先注册并迫使您更名。问题不是要不要注册，而是什么时候注册。',
    },
    {
      objection: '"我已经在国内注册了商标，应该够了吧。"',
      response: '国内注册只在国内有效。如果您在国际上销售或品牌在网络上可见（这几乎是必然的），其他国家的竞争者可以在当地抢注您的商标，进而阻碍您的扩张或索取许可费。',
    },
    {
      objection: '"这个太贵了。"',
      response: 'Atlas 的费用远低于传统知识产权律师事务所，而且全程由真正的律师处理，而非助理。想想看：一场商标维权官司可能花费 20 万至 100 万元人民币以上。相比之下，注册保护的费用几乎可以忽略不计。',
    },
    {
      objection: '"先放一放，以后再说。"',
      response: '大多数国家的商标权遵循"先申请先得"原则。每拖一个月，就多一个月被别人抢先注册的风险。早注册更便宜，还能获得优先权。',
    },
    {
      objection: '"我没听说过 Atlas 这家公司。"',
      response: 'Atlas 是一家新兴公司，由一群认为传统知识产权和公司注册流程需要革新的人创立。没有繁文缛节，没有隐性收费，定价透明，专注于国际知识产权的专业律师全程服务。',
    },
  ],
}

// ─── Banner Specs (same for both languages) ──────────────────────────────────
const bannerSpecs = [
  { size: '728 × 90', label: 'Leaderboard', use: 'Blog header / footer, forums' },
  { size: '300 × 250', label: 'Medium Rectangle', use: 'Sidebar, in-content placements' },
  { size: '160 × 600', label: 'Wide Skyscraper', use: 'Sidebar, right-rail' },
  { size: '320 × 50',  label: 'Mobile Banner',   use: 'Mobile web, apps' },
  { size: '1200 × 628', label: 'Social Share OG', use: 'Link preview, Facebook, LinkedIn' },
]

// ─── Platform badge color ────────────────────────────────────────────────────
function platformColor(p: string) {
  if (p.includes('Twitter') || p.includes('微博')) return { bg: 'rgba(29,161,242,0.1)', border: 'rgba(29,161,242,0.25)', text: '#1DA1F2' }
  if (p.includes('LinkedIn') || p.includes('领英')) return { bg: 'rgba(10,102,194,0.12)', border: 'rgba(10,102,194,0.25)', text: '#0A66C2' }
  return { bg: 'rgba(225,48,108,0.1)', border: 'rgba(225,48,108,0.25)', text: '#E1306C' }
}

// ─── UI strings ───────────────────────────────────────────────────────────────
const ui: Record<Lang, {
  badge: string
  title: string
  titleHighlight: string
  subtitle: string
  goPortal: string
  programOverview: string
  statEmail: string
  statSocial: string
  statScripts: string
  statBanners: string
  refNote: string
  refCode: string
  getMyCode: string
  emailTitle: string
  emailSub: string
  copySubject: string
  subjectCopied: string
  copyEmail: string
  copied: string
  socialTitle: string
  socialSub: string
  charLimit: string
  objTitle: string
  objSub: string
  bannerTitle: string
  bannerSub: string
  bannerColSize: string
  bannerColName: string
  bannerColUse: string
  bannerColRequest: string
  bannerCustom: string
  bannerEmail: string
  brandTitle: string
  brandSub: string
  coreValueProps: string
  doSay: string
  dontSay: string
  ctaTitle: string
  ctaSub: string
  goPortalCta: string
  programDetails: string
}> = {
  en: {
    badge: 'Marketing Resources',
    title: 'Your Affiliate',
    titleHighlight: 'Resource Kit',
    subtitle: 'Everything you need to promote Atlas — copy-ready email templates, social posts, talking points, and banner specs. Just swap in your referral link.',
    goPortal: 'Go to Your Portal',
    programOverview: 'Program Overview',
    statEmail: '3 Email Templates',
    statSocial: '5 Social Posts',
    statScripts: '5 Objection Scripts',
    statBanners: '5 Banner Specs',
    refNote: 'Replace YOURCODE in all templates with your actual referral code — find it in your portal.',
    refCode: 'https://atlas.co/ref/YOURCODE',
    getMyCode: 'Get My Code',
    emailTitle: 'Email Templates',
    emailSub: 'Ready-to-send — personalize then hit send.',
    copySubject: 'Copy subject',
    subjectCopied: 'Subject copied',
    copyEmail: 'Copy email',
    copied: 'Copied!',
    socialTitle: 'Social Media Copy',
    socialSub: 'Optimized for each platform — copy, paste, post.',
    charLimit: 'char limit',
    objTitle: 'Objection Handlers',
    objSub: 'Common pushbacks and how to respond. Great for DMs, calls, and comments.',
    bannerTitle: 'Banner Ad Specs',
    bannerSub: 'Standard IAB sizes — contact us if you need custom creatives.',
    bannerColSize: 'Size',
    bannerColName: 'Name',
    bannerColUse: 'Best Used For',
    bannerColRequest: 'Request Creative',
    bannerCustom: 'Need custom creatives, co-branded materials, or a specific format?',
    bannerEmail: 'Email us',
    brandTitle: 'Key Messages & Brand Guidelines',
    brandSub: 'Use these when describing Atlas. Accuracy builds trust.',
    coreValueProps: 'Core Value Props',
    doSay: 'Do say',
    dontSay: "Don't say",
    ctaTitle: 'Ready to Start Promoting?',
    ctaSub: 'Head to your portal to grab your referral link and start earning.',
    goPortalCta: 'Go to Portal',
    programDetails: 'Program Details',
  },
  zh: {
    badge: '营销资源',
    title: '您的联盟推广',
    titleHighlight: '资源包',
    subtitle: '推广 Atlas 所需的一切——可直接使用的邮件模板、社交媒体文案、话术要点和横幅规格。只需替换您的推荐链接即可。',
    goPortal: '前往我的后台',
    programOverview: '计划概览',
    statEmail: '3 个邮件模板',
    statSocial: '5 条社交媒体文案',
    statScripts: '5 个异议处理话术',
    statBanners: '5 种横幅规格',
    refNote: '将所有模板中的 YOURCODE 替换为您的实际推荐码——在您的后台中查找。',
    refCode: 'https://atlas.co/ref/YOURCODE',
    getMyCode: '获取我的推荐码',
    emailTitle: '邮件模板',
    emailSub: '可直接发送——个性化后即可发出。',
    copySubject: '复制主题',
    subjectCopied: '主题已复制',
    copyEmail: '复制邮件',
    copied: '已复制！',
    socialTitle: '社交媒体文案',
    socialSub: '针对各平台优化——复制、粘贴、发布。',
    charLimit: '字符限制',
    objTitle: '异议处理话术',
    objSub: '常见拒绝理由及应对方法，适用于私信、通话和评论回复。',
    bannerTitle: '横幅广告规格',
    bannerSub: '标准 IAB 尺寸——如需定制创意，请联系我们。',
    bannerColSize: '尺寸',
    bannerColName: '名称',
    bannerColUse: '最佳使用场景',
    bannerColRequest: '申请创意素材',
    bannerCustom: '需要定制创意、联名材料或特定格式？',
    bannerEmail: '联系我们',
    brandTitle: '核心信息与品牌指南',
    brandSub: '介绍 Atlas 时请使用以下内容，准确性是建立信任的基础。',
    coreValueProps: '核心价值主张',
    doSay: '可以说',
    dontSay: '不要说',
    ctaTitle: '准备好开始推广了吗？',
    ctaSub: '前往您的后台获取推荐链接，开始赚取佣金。',
    goPortalCta: '前往后台',
    programDetails: '计划详情',
  },
}

const coreProps: Record<Lang, string[]> = {
  en: [
    '180+ countries for trademark registration',
    '15% lifetime commission for you — no cap',
    'Avg. client transaction value: $550+',
    'Real lawyers, not paralegals',
    'Transparent, upfront pricing',
    'Services: trademark, company formation, DMCA',
    'Jurisdictions: US, UK, EU, Singapore, UAE, HK, and more',
  ],
  zh: [
    '180 多个国家商标注册覆盖',
    '15% 终身佣金，无上限',
    '客户平均交易额：$550+',
    '真正的律师，而非法律助理',
    '透明定价，无隐性费用',
    '服务：商标注册、公司注册、DMCA 版权保护',
    '司法管辖区：美国、英国、欧盟、新加坡、阿联酋、香港等',
  ],
}

const doSayList: Record<Lang, string[]> = {
  en: [
    '"Global trademark registration"',
    '"Real legal protection across 180+ countries"',
    '"Transparent, fixed pricing"',
    '"I use Atlas myself"',
  ],
  zh: [
    '"全球商标注册"',
    '"覆盖 180 多个国家的真实法律保护"',
    '"透明固定定价"',
    '"我自己也在用 Atlas"',
  ],
}

const dontSayList: Record<Lang, string[]> = {
  en: [
    'Guaranteed trademark approval',
    '"They\'re the cheapest option" (we\'re not; we\'re the best value)',
    'Any specific client names without permission',
    'Income claims beyond what Atlas publishes',
  ],
  zh: [
    '保证商标获批',
    '"他们是最便宜的"（我们不是；我们是性价比最高的）',
    '未经授权透露具体客户名称',
    '超出 Atlas 官方公布范围的收入声明',
  ],
}

export default function AffiliateResourcesPage() {
  const { copied, copy } = useCopy()
  const [lang, setLang] = useState<Lang>('en')
  const s = ui[lang]
  const emails = emailTemplates[lang]
  const posts = socialPosts[lang]
  const points = talkingPoints[lang]

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
              <div className="section-badge mb-4"><Zap size={14} /> {s.badge}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
                {s.title}<br /><span className="gold-text">{s.titleHighlight}</span>
              </h1>
              <p className="text-white/55 text-lg max-w-xl leading-relaxed">{s.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/affiliates/portal"
                className="gold-btn inline-flex items-center gap-2 text-sm justify-center">
                {s.goPortal} <ChevronRight size={16} />
              </Link>
              <Link href="/affiliates"
                className="px-5 py-3 rounded-xl border border-white/12 text-sm text-white/55 hover:text-white hover:border-white/25 transition-all duration-200 text-center">
                {s.programOverview}
              </Link>
              {/* Language toggle */}
              <div className="flex rounded-xl overflow-hidden border border-white/12 text-sm">
                {(['en', 'zh'] as Lang[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="flex-1 py-2.5 font-medium transition-all duration-200"
                    style={{
                      background: lang === l ? 'rgba(220,38,38,0.15)' : 'transparent',
                      color: lang === l ? '#DC2626' : 'rgba(255,255,255,0.45)',
                    }}>
                    {l === 'en' ? 'English' : '中文'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-10 text-sm">
            {[
              { icon: Mail, label: s.statEmail },
              { icon: MessageSquare, label: s.statSocial },
              { icon: FileText, label: s.statScripts },
              { icon: ImageIcon, label: s.statBanners },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2 text-white/45">
                <stat.icon size={14} className="text-red-400" />
                {stat.label}
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
              <p className="text-xs text-white/40 mb-1">
                {s.refNote.split('YOURCODE')[0]}
                <code className="text-red-400">YOURCODE</code>
                {s.refNote.split('YOURCODE')[1]}
              </p>
              <code className="text-sm text-red-400">{s.refCode}</code>
            </div>
            <Link href="/affiliates/portal"
              className="text-xs font-semibold px-4 py-2 rounded-lg flex-shrink-0 flex items-center gap-2 transition-all duration-200"
              style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: '#DC2626' }}>
              {s.getMyCode} <ChevronRight size={13} />
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
              <h2 className="text-2xl font-bold">{s.emailTitle}</h2>
              <p className="text-sm text-white/45">{s.emailSub}</p>
            </div>
          </div>
          <div className="space-y-6">
            {emails.map(t => (
              <div key={t.id} className="glass-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                  <div>
                    <span className="font-semibold text-white">{t.label}</span>
                    <p className="text-xs text-white/40 mt-0.5">{lang === 'en' ? 'Subject:' : '主题：'} <span className="text-white/60 italic">{t.subject}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copy(`${t.id}-subj`, t.subject)}
                      className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>
                      {copied === `${t.id}-subj` ? <><Check size={11} /> {s.subjectCopied}</> : <>{s.copySubject}</>}
                    </button>
                    <button
                      onClick={() => copy(t.id, t.body)}
                      className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200"
                      style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copied === t.id ? '#4ade80' : '#DC2626' }}>
                      {copied === t.id ? <><Check size={11} /> {s.copied}</> : <><Copy size={11} /> {s.copyEmail}</>}
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
              <h2 className="text-2xl font-bold">{s.socialTitle}</h2>
              <p className="text-sm text-white/45">{s.socialSub}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {posts.map(p => {
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
                      {copied === p.id ? <><Check size={11} /> {s.copied}</> : <><Copy size={11} /> {lang === 'en' ? 'Copy' : '复制'}</>}
                    </button>
                  </div>
                  <div className="px-5 py-4 flex-1">
                    <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{p.text}</p>
                  </div>
                  <div className="px-5 py-2.5 border-t border-white/5">
                    <span className="text-[11px] text-white/25">{p.char} {s.charLimit}</span>
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
              <h2 className="text-2xl font-bold">{s.objTitle}</h2>
              <p className="text-sm text-white/45">{s.objSub}</p>
            </div>
          </div>
          <div className="space-y-4">
            {points.map((t, i) => (
              <div key={i} className="glass-card p-6 group hover:border-red-600/25 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white/80 mb-3 italic">{t.objection}</p>
                    <p className="text-sm text-white/55 leading-relaxed">{t.response}</p>
                  </div>
                  <button
                    onClick={() => copy(`tp-${i}`, `${lang === 'en' ? 'Objection' : '异议'}：${t.objection}\n\n${lang === 'en' ? 'Response' : '回应'}：${t.response}`)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copied === `tp-${i}` ? '#4ade80' : '#DC2626' }}>
                    {copied === `tp-${i}` ? <><Check size={11} /> {s.copied}</> : <><Copy size={11} /> {lang === 'en' ? 'Copy' : '复制'}</>}
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
              <h2 className="text-2xl font-bold">{s.bannerTitle}</h2>
              <p className="text-sm text-white/45">{s.bannerSub}</p>
            </div>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {[s.bannerColSize, s.bannerColName, s.bannerColUse, s.bannerColRequest].map(h => (
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
                        <Download size={12} /> {lang === 'en' ? 'Request' : '申请'}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-white/30 mt-4 text-center">
            {s.bannerCustom}{' '}
            <a href="mailto:affiliates@atlas.co" className="text-red-400 hover:underline">{s.bannerEmail}</a>
            {lang === 'zh' ? '，我们来安排。' : " and we'll sort it."}
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
              <h2 className="text-2xl font-bold">{s.brandTitle}</h2>
              <p className="text-sm text-white/45">{s.brandSub}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Key messages */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign size={16} className="text-red-400" /> {s.coreValueProps}
              </h3>
              <ul className="space-y-3">
                {coreProps[lang].map(m => (
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
                  <span className="text-green-400">✓</span> {s.doSay}
                </h3>
                <ul className="space-y-2">
                  {doSayList[lang].map(str => (
                    <li key={str} className="text-sm text-white/55">{str}</li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                  <span className="text-red-400">✕</span> {s.dontSay}
                </h3>
                <ul className="space-y-2">
                  {dontSayList[lang].map(str => (
                    <li key={str} className="text-sm text-white/55">{str}</li>
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
          <h2 className="text-3xl font-bold mb-4">{s.ctaTitle}</h2>
          <p className="text-white/50 mb-8">{s.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/affiliates/portal" className="gold-btn inline-flex items-center gap-2">
              <Users size={16} /> {s.goPortalCta}
            </Link>
            <Link href="/affiliates" className="px-6 py-3 rounded-xl border border-white/12 text-white/60 hover:text-white hover:border-white/25 transition-all duration-200 text-sm font-medium inline-flex items-center gap-2">
              {s.programDetails} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
