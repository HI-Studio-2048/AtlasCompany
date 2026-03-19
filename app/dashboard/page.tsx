'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Globe, Building2, FileText, Settings, Plus, BarChart3, ChevronRight, Clock, CheckCircle2, Circle } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

type Tab = 'companies' | 'documents' | 'tracker'

const mockCompanies = [
  {
    id: 1,
    name: 'Atlas Global LLC',
    jurisdiction: '🇺🇸 United States',
    type: 'LLC',
    status: 'complete' as const,
    progress: 100,
    date: 'Mar 12, 2025',
    number: 'US-4821903',
  },
  {
    id: 2,
    name: 'Pacific Ventures Pte Ltd',
    jurisdiction: '🇸🇬 Singapore',
    type: 'Pte Ltd',
    status: 'active' as const,
    progress: 65,
    date: 'Mar 18, 2025',
    number: '202512345K',
  },
  {
    id: 3,
    name: 'HK Holdings Limited',
    jurisdiction: '🇭🇰 Hong Kong',
    type: 'Limited Co.',
    status: 'pending' as const,
    progress: 20,
    date: 'Mar 19, 2025',
    number: '—',
  },
]

const mockDocuments = [
  { id: 1, name: 'Certificate of Incorporation', company: 'Atlas Global LLC', type: 'PDF', size: '1.2 MB', date: 'Mar 12' },
  { id: 2, name: 'Articles of Organization', company: 'Atlas Global LLC', type: 'PDF', size: '0.8 MB', date: 'Mar 12' },
  { id: 3, name: 'EIN Confirmation Letter', company: 'Atlas Global LLC', type: 'PDF', size: '0.3 MB', date: 'Mar 14' },
  { id: 4, name: 'Incorporation Draft', company: 'Pacific Ventures Pte Ltd', type: 'DOCX', size: '0.6 MB', date: 'Mar 18' },
]

const formationStages = [
  'Application Received',
  'Document Verification',
  'Government Filing',
  'Certificate Issued',
  'Delivery Complete',
]

export default function DashboardPage() {
  const { t } = useLang()
  const [activeTab, setActiveTab] = useState<Tab>('companies')
  const [selectedCompany, setSelectedCompany] = useState(mockCompanies[0])

  const navItems = [
    { id: 'companies' as Tab, icon: Building2, label: t('dash.companies') },
    { id: 'documents' as Tab, icon: FileText, label: t('dash.documents') },
    { id: 'tracker' as Tab, icon: BarChart3, label: t('dash.formation') },
  ]

  const getStageIndex = (progress: number) => Math.floor((progress / 100) * formationStages.length)

  return (
    <div className="min-h-screen flex" style={{ background: '#020817' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/8 flex flex-col hidden md:flex"
        style={{ background: 'rgba(10,15,30,0.95)' }}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D77E)' }}>
              <Globe className="w-3.5 h-3.5 text-navy-900" strokeWidth={2.5} />
            </div>
            <span className="font-bold">Atlas</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              id={`dash-nav-${id}`}
              onClick={() => setActiveTab(id)}
              className={`sidebar-link w-full ${activeTab === id ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}

          <div className="border-t border-white/8 my-4" />

          <button
            id="dash-nav-settings"
            className="sidebar-link w-full"
          >
            <Settings className="w-4 h-4" />
            {t('dash.settings')}
          </button>
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-navy-900"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D77E)' }}>
              AC
            </div>
            <div>
              <div className="text-sm font-medium text-white">Atlas User</div>
              <div className="text-xs text-white/40">Growth Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/8"
          style={{ background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <div className="text-xs text-white/40 mb-0.5">{t('dash.welcome')}</div>
            <h1 className="text-lg font-semibold text-white">
              {activeTab === 'companies' && t('dash.companies')}
              {activeTab === 'documents' && t('dash.documents')}
              {activeTab === 'tracker' && t('dash.formation')}
            </h1>
          </div>
          <Link
            href="/start"
            id="dashboard-new-company-btn"
            className="gold-btn text-sm px-5 py-2.5 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            {t('dash.newCompany')}
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8 space-y-6">
          {/* COMPANIES TAB */}
          {activeTab === 'companies' && (
            <div className="space-y-4">
              {mockCompanies.map((company) => (
                <div
                  key={company.id}
                  id={`company-card-${company.id}`}
                  className="glass-card p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => { setSelectedCompany(company); setActiveTab('tracker') }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(30,45,79,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Building2 className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-white">{company.name}</h3>
                          <span className={`badge-${company.status}`}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{
                              background: company.status === 'complete' ? '#34D399' : company.status === 'active' ? '#60A5FA' : '#FBBF24'
                            }} />
                            {company.status === 'complete' ? t('dash.status.complete') :
                             company.status === 'active' ? t('dash.status.active') : t('dash.status.pending')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 text-sm text-white/40">
                          <span>{company.jurisdiction}</span>
                          <span>·</span>
                          <span>{company.type}</span>
                          {company.number !== '—' && <><span>·</span><span>{company.number}</span></>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Progress */}
                      <div className="min-w-[120px]">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/40">{t('dash.progress')}</span>
                          <span className="text-gold-400 font-medium">{company.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${company.progress}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {company.date}
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">{t('dash.docs.title')}</h2>
                <p className="text-sm text-white/50 mt-1">{t('dash.docs.sub')}</p>
              </div>
              <div className="space-y-3">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} id={`doc-item-${doc.id}`}
                    className="glass-card p-5 flex items-center gap-4 hover:border-white/20 transition-all duration-300 cursor-pointer">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                      <FileText className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm">{doc.name}</div>
                      <div className="text-xs text-white/40 mt-0.5">{doc.company}</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="px-2 py-0.5 rounded border border-white/10 bg-navy-700/50">{doc.type}</span>
                      <span>{doc.size}</span>
                      <span>{doc.date}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg border border-white/15 text-xs text-white/60 hover:text-white hover:border-gold-500/40 transition-all duration-200">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRACKER TAB */}
          {activeTab === 'tracker' && (
            <div>
              {/* Company selector */}
              <div className="flex gap-3 mb-8 flex-wrap">
                {mockCompanies.map((c) => (
                  <button
                    key={c.id}
                    id={`tracker-company-${c.id}`}
                    onClick={() => setSelectedCompany(c)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
                    style={{
                      border: selectedCompany.id === c.id ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                      background: selectedCompany.id === c.id ? 'rgba(212,175,55,0.1)' : 'rgba(30,45,79,0.3)',
                      color: selectedCompany.id === c.id ? '#D4AF37' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Tracker card */}
              <div className="glass-card p-8">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedCompany.name}</h2>
                    <p className="text-sm text-white/40 mt-1">{selectedCompany.jurisdiction} · {selectedCompany.type}</p>
                  </div>
                  <span className={`badge-${selectedCompany.status}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{
                      background: selectedCompany.status === 'complete' ? '#34D399' : selectedCompany.status === 'active' ? '#60A5FA' : '#FBBF24'
                    }} />
                    {selectedCompany.status === 'complete' ? t('dash.status.complete') :
                     selectedCompany.status === 'active' ? t('dash.status.active') : t('dash.status.pending')}
                  </span>
                </div>

                {/* Overall progress bar */}
                <div className="mb-10">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-white/60">{t('dash.progress')}</span>
                    <span className="font-semibold gold-text">{selectedCompany.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${selectedCompany.progress}%`, background: 'linear-gradient(90deg, #D4AF37, #F5D77E)' }}
                    />
                  </div>
                </div>

                {/* Stage steps */}
                <div className="space-y-4">
                  {formationStages.map((stage, i) => {
                    const currentStage = getStageIndex(selectedCompany.progress)
                    const isDone = i < currentStage
                    const isActive = i === currentStage
                    return (
                      <div key={stage} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isDone ? 'rgba(52,211,153,0.15)' : isActive ? 'rgba(212,175,55,0.15)' : 'rgba(30,45,79,0.4)',
                            border: isDone ? '1px solid rgba(52,211,153,0.3)' : isActive ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.08)',
                          }}>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isActive ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                          ) : (
                            <Circle className="w-4 h-4 text-white/20" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${isDone ? 'text-white' : isActive ? 'text-gold-400' : 'text-white/30'}`}>
                            {stage}
                          </div>
                          {isActive && (
                            <div className="text-xs text-white/40 mt-0.5">In progress...</div>
                          )}
                        </div>
                        {isDone && <span className="text-xs text-emerald-400">Done</span>}
                        {isActive && <span className="text-xs text-gold-400">Active</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
