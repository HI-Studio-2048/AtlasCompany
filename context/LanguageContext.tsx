'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'en' | 'zh'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    'nav.features': 'Features',
    'nav.jurisdictions': 'Jurisdictions',
    'nav.pricing': 'Pricing',
    'nav.trademarks': 'Trademarks',
    'nav.dashboard': 'Dashboard',
    'nav.getStarted': 'Get Started',
    'nav.login': 'Sign In',

    // Hero
    'hero.badge': 'Global Business Formation Platform',
    'hero.headline1': 'Your Global Business,',
    'hero.headline2': 'Built in Days.',
    'hero.sub': 'Form companies in 50+ jurisdictions, expand internationally, and acquire overseas assets — all from one platform built for global entrepreneurs.',
    'hero.cta.primary': 'Start Your Company',
    'hero.cta.secondary': 'View Demo',
    'hero.stat1': '50+',
    'hero.stat1.label': 'Jurisdictions',
    'hero.stat2': '3-5',
    'hero.stat2.label': 'Day Formation',
    'hero.stat3': '$2B+',
    'hero.stat3.label': 'Assets Managed',
    'hero.stat4': '98%',
    'hero.stat4.label': 'Success Rate',

    // Features
    'features.badge': 'Why Atlas',
    'features.headline': 'Everything You Need to Go Global',
    'features.sub': 'A complete platform to form, manage, and scale your international business presence.',
    'feat1.title': 'Global Jurisdictions',
    'feat1.desc': 'Access 50+ countries including USA, Singapore, Hong Kong, UK, Caymans, BVI, and UAE.',
    'feat2.title': 'Fast Formation',
    'feat2.desc': 'Most companies are ready in 3-5 business days. Faster than any traditional method.',
    'feat3.title': 'Full Compliance',
    'feat3.desc': 'We handle all regulatory filings, annual returns, and compliance requirements for you.',
    'feat4.title': 'Asset Acquisition',
    'feat4.desc': 'Acquire overseas real estate, stocks, and businesses through your new foreign entity.',
    'feat5.title': 'Tax Efficiency',
    'feat5.desc': 'Structure your company to optimize tax exposure across multiple jurisdictions legally.',
    'feat6.title': 'Ongoing Support',
    'feat6.desc': 'Dedicated account managers and 24/7 support throughout your entire journey.',
    'feat7.title': 'Trademark Registration',
    'feat7.desc': 'File trademarks in 100+ countries. Madrid Protocol and national filings handled end-to-end.',

    // Trademark service
    'tm.badge': 'Global Trademark Service',
    'tm.headline': 'Protect Your Brand Worldwide',
    'tm.sub': 'File trademarks in 100+ countries through a single streamlined process. Madrid Protocol, national filings, and brand watch services — all managed for you.',
    'tm.cta': 'Start Trademark Application',
    'tm.stat1': '100+', 'tm.stat1.label': 'Countries',
    'tm.stat2': '6-18',  'tm.stat2.label': 'Month Process',
    'tm.stat3': '95%',   'tm.stat3.label': 'Success Rate',
    'tm.s1.title': 'Madrid Protocol Filing',
    'tm.s1.desc': 'One international application covering up to 130 countries through WIPO.',
    'tm.s2.title': 'National Trademark Filing',
    'tm.s2.desc': 'Direct national filings for territories outside the Madrid system.',
    'tm.s3.title': 'Trademark Watch',
    'tm.s3.desc': 'Ongoing monitoring to detect conflicting marks before they become problems.',
    'tm.s4.title': 'Opposition & Renewals',
    'tm.s4.desc': 'Expert handling of oppositions, responses, and 10-year renewal cycles.',
    'tm.form.title': 'Start Your Application',
    'tm.form.brand': 'Brand Name',
    'tm.form.brand.ph': 'e.g. Atlas',
    'tm.form.countries': 'Target Countries / Regions',
    'tm.form.class': 'Goods & Services Class (Nice Classification)',
    'tm.form.email': 'Email Address',
    'tm.form.submit': 'Submit Trademark Application',
    'tm.form.success': 'Application Received!',
    'tm.form.success.sub': 'Our trademark team will review your submission and contact you within 24 hours.',
    'tm.class.1': 'Class 9 — Technology & Software',
    'tm.class.2': 'Class 25 — Clothing & Apparel',
    'tm.class.3': 'Class 35 — Business & Advertising',
    'tm.class.4': 'Class 36 — Financial Services',
    'tm.class.5': 'Class 41 — Education & Entertainment',
    'tm.class.6': 'Class 42 — Scientific & Tech Services',
    'tm.s5.title': 'DMCA Takedown Service',
    'tm.s5.desc': 'Fast removal of infringing content from websites, marketplaces, and social media platforms worldwide.',
    'tm.s6.title': 'Infringement Monitoring',
    'tm.s6.desc': 'Active 24/7 scanning across all platforms — online and offline — to detect unauthorized use of your brand.',
    // DMCA
    'tm.dmca.badge': 'DMCA Takedown',
    'tm.dmca.headline': 'Remove Infringing Content Fast',
    'tm.dmca.sub': 'Our legal team files DMCA takedown notices on your behalf across major platforms — Google, Amazon, Alibaba, social media, and more. From counterfeit products to unauthorized brand use, we handle everything.',
    'tm.dmca.cta': 'Request DMCA Takedown',
    'tm.dmca.f1.title': 'Rapid Takedown Notices',
    'tm.dmca.f1.desc': 'Professionally drafted DMCA notices filed within 24-48 hours of detection.',
    'tm.dmca.f2.title': 'Multi-Platform Coverage',
    'tm.dmca.f2.desc': 'Google, Amazon, eBay, Shopify, Instagram, TikTok, YouTube, and 100+ more platforms.',
    'tm.dmca.f3.title': 'Legal Escalation',
    'tm.dmca.f3.desc': 'When takedowns aren\'t enough, our legal team escalates with cease & desist letters and litigation support.',
    // Monitoring
    'tm.monitor.badge': 'Brand Protection',
    'tm.monitor.headline': 'Always-On Infringement Detection',
    'tm.monitor.sub': 'Our AI-powered monitoring scans the entire internet and global marketplaces 24/7 to detect any unauthorized use of your trademark — online and offline.',
    'tm.monitor.cta': 'Activate Brand Monitoring',
    'tm.monitor.f1.title': 'Digital Platform Scanning',
    'tm.monitor.f1.desc': 'Continuous monitoring of e-commerce, social media, domain registrations, app stores, and the open web for unauthorized brand usage.',
    'tm.monitor.f2.title': 'Offline & Market Surveillance',
    'tm.monitor.f2.desc': 'Physical market investigations and global trade show monitoring to detect counterfeit goods and unauthorized brand use.',
    'tm.monitor.f3.title': 'Automated Enforcement',
    'tm.monitor.f3.desc': 'Instant alerts with one-click enforcement actions — automated DMCA filings, cease & desist, and platform reports.',

    // How It Works
    'how.badge': 'Simple Process',
    'how.headline': 'From Idea to Incorporated in 4 Steps',
    'how.sub': 'A streamlined process designed to get your global business up and running with minimal friction.',
    'how.step1': 'Choose Jurisdiction',
    'how.step1.desc': 'Select your target country from our 50+ supported jurisdictions based on your business goals.',
    'how.step2': 'Select Structure',
    'how.step2.desc': 'Choose the right entity type — LLC, Corp, Ltd, IBC — for your specific needs.',
    'how.step3': 'Submit Details',
    'how.step3.desc': 'Fill out your business information form. Our team reviews and prepares your documents.',
    'how.step4': 'Company is Live',
    'how.step4.desc': "Your company is incorporated and you receive your certificates, bank intro letters, and more.",

    // Jurisdictions
    'juris.badge': 'Where We Operate',
    'juris.headline': 'Top Global Jurisdictions',
    'juris.sub': 'Form in the world\'s most strategic business locations.',
    'juris.formation': 'Formation',
    'juris.days': 'days',
    'juris.from': 'from',

    // Pricing
    'pricing.badge': 'Simple Pricing',
    'pricing.headline': 'Transparent, No Surprises',
    'pricing.sub': 'One-time formation fee. No hidden costs. Everything included.',
    'pricing.most': 'Most Popular',
    'plan1.name': 'Starter',
    'plan1.price': '$299',
    'plan1.desc': 'Perfect for first-time global entrepreneurs.',
    'plan2.name': 'Growth',
    'plan2.price': '$699',
    'plan2.desc': 'For serious businesses expanding globally.',
    'plan3.name': 'Enterprise',
    'plan3.price': 'Custom',
    'plan3.desc': 'High-volume formations and white-glove service.',
    'pricing.cta': 'Get Started',
    'pricing.contact': 'Contact Us',

    // CTA
    'cta.headline': 'Ready to Build Your Global Empire?',
    'cta.sub': 'Join entrepreneurs from 80+ countries who have used Atlas to form global companies.',
    'cta.btn': 'Start Your Company Today',

    // Footer
    'footer.tagline': 'Global business formation, simplified.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.copyright': '© 2025 Atlas Company. All rights reserved.',

    // Onboarding
    'onboard.title': 'Start Your Global Business',
    'onboard.sub': 'Answer a few questions and we\'ll have your company ready in days.',
    'onboard.step1': 'Choose Jurisdiction',
    'onboard.step2': 'Business Type',
    'onboard.step3': 'Your Details',
    'onboard.step4': 'Review & Submit',
    'onboard.next': 'Continue',
    'onboard.back': 'Back',
    'onboard.submit': 'Submit Application',
    'onboard.success': 'Application Submitted!',
    'onboard.success.sub': 'Our team will review your application and reach out within 24 hours.',
    'onboard.select.country': 'Select a jurisdiction',
    'onboard.select.type': 'Select business type',
    'onboard.name': 'Company Name',
    'onboard.industry': 'Industry',
    'onboard.directors': 'Number of Directors',
    'onboard.email': 'Your Email',
    'onboard.phone': 'Phone Number',

    // Dashboard
    'dash.welcome': 'Welcome back',
    'dash.companies': 'My Companies',
    'dash.documents': 'Documents',
    'dash.formation': 'Formation Tracker',
    'dash.trademarks': 'Trademarks',
    'dash.settings': 'Settings',
    'dash.newCompany': '+ New Company',
    'dash.status.pending': 'Pending',
    'dash.status.active': 'Active',
    'dash.status.complete': 'Complete',
    'dash.progress': 'Formation Progress',
    'dash.docs.title': 'Company Documents',
    'dash.docs.sub': 'Your corporate documents, certificates, and filings.',
  },
  zh: {
    // Navbar
    'nav.features': '功能',
    'nav.jurisdictions': '司法管辖区',
    'nav.pricing': '定价',
    'nav.trademarks': '商标注册',
    'nav.dashboard': '控制台',
    'nav.getStarted': '立即开始',
    'nav.login': '登录',

    // Hero
    'hero.badge': '全球商业注册平台',
    'hero.headline1': '您的全球企业，',
    'hero.headline2': '数日即可建立。',
    'hero.sub': '在50多个司法管辖区注册公司，实现国际扩张，收购海外资产——一个平台满足全球企业家的所有需求。',
    'hero.cta.primary': '开始注册公司',
    'hero.cta.secondary': '查看演示',
    'hero.stat1': '50+',
    'hero.stat1.label': '个司法管辖区',
    'hero.stat2': '3-5',
    'hero.stat2.label': '天完成注册',
    'hero.stat3': '$20亿+',
    'hero.stat3.label': '管理资产',
    'hero.stat4': '98%',
    'hero.stat4.label': '成功率',

    // Features
    'features.badge': '为何选择环球',
    'features.headline': '一站式全球化解决方案',
    'features.sub': '注册、管理、扩展您的国际商业布局，一个平台全搞定。',
    'feat1.title': '全球司法管辖区',
    'feat1.desc': '覆盖50+国家，包括美国、新加坡、香港、英国、开曼群岛、英属维京群岛和阿联酋。',
    'feat2.title': '快速注册',
    'feat2.desc': '大多数公司3-5个工作日即可完成注册，比传统方式快得多。',
    'feat3.title': '合规保障',
    'feat3.desc': '我们代您处理所有监管申报、年度申报及合规要求。',
    'feat4.title': '资产收购',
    'feat4.desc': '通过新成立的海外实体收购房地产、股票和企业。',
    'feat5.title': '税务优化',
    'feat5.desc': '在多个司法管辖区合法优化税务结构，降低税务负担。',
    'feat6.title': '持续支持',
    'feat6.desc': '专属客户经理及7×24小时全程支持服务。',
    'feat7.title': '商标注册',
    'feat7.desc': '在100多个国家申请商标，马德里协议和国家注册全程代办。',

    // Trademark service
    'tm.badge': '全球商标服务',
    'tm.headline': '在全球范围内保护您的品牌',
    'tm.sub': '通过单一流程在100多个国家申请商标。马德里协议、国家商标注册和品牌监控服务，全程代您处理。',
    'tm.cta': '开始商标申请',
    'tm.stat1': '100+', 'tm.stat1.label': '个国家',
    'tm.stat2': '6-18',  'tm.stat2.label': '个月流程',
    'tm.stat3': '95%',   'tm.stat3.label': '成功率',
    'tm.s1.title': '马德里协议申请',
    'tm.s1.desc': '通过世界知识产权组织，一份国际申请覆盖最多130个国家。',
    'tm.s2.title': '国家商标申请',
    'tm.s2.desc': '在马德里体系以外的地区直接进行国家申请。',
    'tm.s3.title': '商标监控',
    'tm.s3.desc': '持续监控，在冲突商标成为问题之前及时发现和处理。',
    'tm.s4.title': '异议与续展',
    'tm.s4.desc': '专业处理异议、答复以及10年期商标续展。',
    'tm.form.title': '开始申请',
    'tm.form.brand': '品牌名称',
    'tm.form.brand.ph': '例如：环球',
    'tm.form.countries': '目标国家/地区',
    'tm.form.class': '商品与服务类别（尼斯分类）',
    'tm.form.email': '邮箱地址',
    'tm.form.submit': '提交商标申请',
    'tm.form.success': '申请已收到！',
    'tm.form.success.sub': '我们的商标团队将审核您的提交，并在24小时内与您联系。',
    'tm.class.1': '第9类 — 技术与软件',
    'tm.class.2': '第25类 — 服装',
    'tm.class.3': '第35类 — 商业与广告',
    'tm.class.4': '第36类 — 金融服务',
    'tm.class.5': '第41类 — 教育与娱乐',
    'tm.class.6': '第42类 — 科学与技术服务',
    'tm.s5.title': 'DMCA下架服务',
    'tm.s5.desc': '在全球网站、电商平台和社交媒体平台快速移除侵权内容。',
    'tm.s6.title': '侵权监控',
    'tm.s6.desc': '全天候24/7主动扫描所有平台（线上和线下），检测未经授权使用您品牌的行为。',
    // DMCA
    'tm.dmca.badge': 'DMCA下架',
    'tm.dmca.headline': '快速移除侵权内容',
    'tm.dmca.sub': '我们的法律团队代您在各大平台提交DMCA下架通知——覆盖Google、亚马逊、阿里巴巴、社交媒体等。从假冒产品到未经授权的品牌使用，我们全程处理。',
    'tm.dmca.cta': '申请DMCA下架',
    'tm.dmca.f1.title': '快速下架通知',
    'tm.dmca.f1.desc': '专业起草的DMCA通知，在发现侵权后24-48小时内提交。',
    'tm.dmca.f2.title': '多平台覆盖',
    'tm.dmca.f2.desc': 'Google、亚马逊、eBay、Shopify、Instagram、TikTok、YouTube以及100多个平台。',
    'tm.dmca.f3.title': '法律升级',
    'tm.dmca.f3.desc': '当下架不够时，我们的法律团队会发送停止侵权函并提供诉讼支持。',
    // Monitoring
    'tm.monitor.badge': '品牌保护',
    'tm.monitor.headline': '全天候侵权检测',
    'tm.monitor.sub': '我们的AI驱动监控系统全天候扫描整个互联网和全球市场，检测任何未经授权使用您商标的行为——线上和线下。',
    'tm.monitor.cta': '开启品牌监控',
    'tm.monitor.f1.title': '数字平台扫描',
    'tm.monitor.f1.desc': '持续监控电商、社交媒体、域名注册、应用商店和开放网络，检测未经授权的品牌使用。',
    'tm.monitor.f2.title': '线下市场监控',
    'tm.monitor.f2.desc': '实地市场调查和全球展会监控，检测假冒商品和未经授权的品牌使用。',
    'tm.monitor.f3.title': '自动化执法',
    'tm.monitor.f3.desc': '即时警报和一键执法操作——自动DMCA提交、停止侵权函和平台举报。',

    // How It Works
    'how.badge': '简单流程',
    'how.headline': '四步完成公司注册',
    'how.sub': '高效流程，助您以最少摩擦快速启动全球业务。',
    'how.step1': '选择司法管辖区',
    'how.step1.desc': '根据业务目标，从50+支持的司法管辖区中选择目标国家。',
    'how.step2': '选择结构',
    'how.step2.desc': '选择适合您需求的实体类型——有限责任公司、股份公司、有限公司或离岸公司。',
    'how.step3': '提交资料',
    'how.step3.desc': '填写企业信息表格，我们的团队将审核并准备您的文件。',
    'how.step4': '公司正式成立',
    'how.step4.desc': '公司完成注册，您将收到证书、银行介绍信等完整文件。',

    // Jurisdictions
    'juris.badge': '我们的布局',
    'juris.headline': '全球顶级司法管辖区',
    'juris.sub': '在全球最具战略价值的商业地点注册公司。',
    'juris.formation': '注册时间',
    'juris.days': '天',
    'juris.from': '起价',

    // Pricing
    'pricing.badge': '透明定价',
    'pricing.headline': '价格公开透明，无隐性费用',
    'pricing.sub': '一次性注册费用，无隐藏成本，一切尽在其中。',
    'pricing.most': '最受欢迎',
    'plan1.name': '入门版',
    'plan1.price': '$299',
    'plan1.desc': '适合首次全球创业的企业家。',
    'plan2.name': '成长版',
    'plan2.price': '$699',
    'plan2.desc': '适合认真开展全球扩张的企业。',
    'plan3.name': '企业版',
    'plan3.price': '定制报价',
    'plan3.desc': '大批量注册及尊享服务。',
    'pricing.cta': '立即开始',
    'pricing.contact': '联系我们',

    // CTA
    'cta.headline': '准备好打造您的全球商业版图了吗？',
    'cta.sub': '来自80+国家的企业家已使用环球公司完成全球注册。',
    'cta.btn': '立即开始注册',

    // Footer
    'footer.tagline': '全球商业注册，化繁为简。',
    'footer.product': '产品',
    'footer.company': '公司',
    'footer.support': '支持',
    'footer.copyright': '© 2025 环球公司。保留所有权利。',

    // Onboarding
    'onboard.title': '开始您的全球业务',
    'onboard.sub': '回答几个问题，我们将在数天内为您准备好公司。',
    'onboard.step1': '选择司法管辖区',
    'onboard.step2': '业务类型',
    'onboard.step3': '您的信息',
    'onboard.step4': '确认提交',
    'onboard.next': '继续',
    'onboard.back': '返回',
    'onboard.submit': '提交申请',
    'onboard.success': '申请已提交！',
    'onboard.success.sub': '我们的团队将审核您的申请并在24小时内与您联系。',
    'onboard.select.country': '请选择司法管辖区',
    'onboard.select.type': '请选择业务类型',
    'onboard.name': '公司名称',
    'onboard.industry': '行业',
    'onboard.directors': '董事人数',
    'onboard.email': '您的邮箱',
    'onboard.phone': '电话号码',

    // Dashboard
    'dash.welcome': '欢迎回来',
    'dash.companies': '我的公司',
    'dash.documents': '文件',
    'dash.formation': '注册进度',
    'dash.trademarks': '商标',
    'dash.settings': '设置',
    'dash.newCompany': '+ 新建公司',
    'dash.status.pending': '待处理',
    'dash.status.active': '进行中',
    'dash.status.complete': '已完成',
    'dash.progress': '注册进度',
    'dash.docs.title': '公司文件',
    'dash.docs.sub': '您的公司文件、证书和申报材料。',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  const t = (key: string): string => {
    return translations[lang][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
