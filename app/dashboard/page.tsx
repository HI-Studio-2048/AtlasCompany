'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, Building2, FileText, Settings, Plus, BarChart3, ChevronRight, Clock, CheckCircle2, Circle, Award, Loader2 } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import type { Company } from '@/lib/schema'

type Tab = 'companies' | 'documents' | 'tracker'

const formationStages = [
  'Application Received',
  'Document Verification',
  'Government Filing',
  'Certificate Issued',
  'Delivery Complete',
]

const jurisdictionFlag: Record<string, string> = {
  'United States': '🇺🇸', 'Singapore': '🇸🇬', 'Hong Kong': '🇭🇰',
  'United Kingdom': '🇬🇧', 'Cayman Islands': '🇰🇾', 'British Virgin Islands': '🇻🇬',
  'UAE': '🇦🇪', 'Germany': '🇩🇪', 'Netherlands': '🇳🇱',
  'Malaysia': '🇲🇾', 'Japan': '🇯🇵', 'Australia': '🇦🇺',
}

export default function DashboardPage() {
  const { t } = useLang()
  const { user, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('companies')
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/companies')
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        setCompanies(data)
        if (data.length > 0) setSelectedCompanyId(data[0].id)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) ?? companies[0]
  const getStageIndex = (progress: number) => Math.floor((progress / 100) * formationStages.length)

  const navItems = [
    { id: 'companies' as Tab, icon: Building2, label: t('dash.companies') },
    { id: 'documents' as Tab, icon: FileText, label: t('dash.documents') },
    { id: 'tracker' as Tab, icon: BarChart3, label: t('dash.formation') },
  ]

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/8 flex-col hidden md:flex"
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}>
        <div className="h-16 flex items-center px-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
              <Globe className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold">Atlas</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button key={id} id={`dash-nav-${id}`}
              onClick={() => setActiveTab(id)}
              className={`sidebar-link w-full ${activeTab === id ? 'active' : ''}`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
          <div className="border-t border-white/8 my-4" />
          <Link href="/trademarks" id="dash-nav-trademarks" className="sidebar-link w-full flex items-center gap-3">
            <Award className="w-4 h-4" />{t('dash.trademarks')}
          </Link>
          <Link href="/settings" id="dash-nav-settings" className="sidebar-link w-full flex items-center gap-3">
            <Settings className="w-4 h-4" />{t('dash.settings')}
          </Link>
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3">
            {user?.avatar
              ? <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              : <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>{initials}</div>
            }
            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.name ?? user?.email ?? 'Atlas User'}</div>
              <div className="text-xs text-white/40 capitalize">{user?.provider ?? 'Member'}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/8"
          style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}>
          <div>
            <div className="text-xs text-white/40 mb-0.5">{t('dash.welcome')}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</div>
            <h1 className="text-lg font-semibold text-white">
              {activeTab === 'companies' && t('dash.companies')}
              {activeTab === 'documents' && t('dash.documents')}
              {activeTab === 'tracker' && t('dash.formation')}
            </h1>
          </div>
          <Link href="/start" id="dashboard-new-company-btn"
            className="gold-btn text-sm px-5 py-2.5 flex items-center gap-1.5">
            <Plus className="w-4 h-4" />{t('dash.newCompany')}
          </Link>
        </header>

        <main className="flex-1 overflow-auto p-8 space-y-6">
          {/* COMPANIES TAB */}
          {activeTab === 'companies' && (
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-white/40" />
                </div>
              ) : companies.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <Building2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No companies yet</h3>
                  <p className="text-sm text-white/40 mb-6">Start your first company formation to see it here.</p>
                  <Link href="/start" className="gold-btn inline-flex items-center gap-2 text-sm px-6 py-2.5">
                    <Plus className="w-4 h-4" /> Form a Company
                  </Link>
                </div>
              ) : (
                companies.map((company) => (
                  <div key={company.id} id={`company-card-${company.id}`}
                    className="glass-card p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => { setSelectedCompanyId(company.id); setActiveTab('tracker') }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                          <Building2 className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-white">{company.companyName}</h3>
                            <span className={`badge-${company.status}`}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{
                                background: company.status === 'complete' ? '#34D399' : company.status === 'active' ? '#60A5FA' : '#FBBF24'
                              }} />
                              {company.status === 'complete' ? t('dash.status.complete') :
                               company.status === 'active' ? t('dash.status.active') : t('dash.status.pending')}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1.5 text-sm text-white/40">
                            <span>{jurisdictionFlag[company.jurisdiction] ?? '🌐'} {company.jurisdiction}</span>
                            <span>·</span>
                            <span className="uppercase text-xs">{company.businessType}</span>
                            {company.registrationNumber && <><span>·</span><span>{company.registrationNumber}</span></>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="min-w-[120px]">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-white/40">{t('dash.progress')}</span>
                            <span className="text-gold-400 font-medium">{company.progress ?? 0}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${company.progress ?? 0}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          {company.createdAt ? new Date(company.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">{t('dash.docs.title')}</h2>
                <p className="text-sm text-white/50 mt-1">{t('dash.docs.sub')}</p>
              </div>
              <div className="glass-card p-12 text-center">
                <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Documents will appear here</h3>
                <p className="text-sm text-white/40">Once your company formation is underway, your documents will be available for download.</p>
              </div>
            </div>
          )}

          {/* TRACKER TAB */}
          {activeTab === 'tracker' && (
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-white/40" />
                </div>
              ) : companies.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Nothing to track yet</h3>
                  <p className="text-sm text-white/40 mb-6">Form your first company to track its progress here.</p>
                  <Link href="/start" className="gold-btn inline-flex items-center gap-2 text-sm px-6 py-2.5">
                    <Plus className="w-4 h-4" /> Get Started
                  </Link>
                </div>
              ) : (
                <div>
                  {/* Company selector */}
                  <div className="flex gap-3 mb-8 flex-wrap">
                    {companies.map((c) => (
                      <button key={c.id} id={`tracker-company-${c.id}`}
                        onClick={() => setSelectedCompanyId(c.id)}
                        className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
                        style={{
                          border: selectedCompanyId === c.id ? '1px solid #DC2626' : '1px solid var(--border)',
                          background: selectedCompanyId === c.id ? 'rgba(220,38,38,0.1)' : 'var(--surface)',
                          color: selectedCompanyId === c.id ? '#DC2626' : 'var(--text-2)',
                        }}>
                        {c.companyName}
                      </button>
                    ))}
                  </div>

                  {selectedCompany && (
                    <div className="glass-card p-8">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <h2 className="text-xl font-semibold text-white">{selectedCompany.companyName}</h2>
                          <p className="text-sm text-white/40 mt-1">
                            {jurisdictionFlag[selectedCompany.jurisdiction] ?? '🌐'} {selectedCompany.jurisdiction}
                            {' · '}<span className="uppercase">{selectedCompany.businessType}</span>
                          </p>
                        </div>
                        <span className={`badge-${selectedCompany.status}`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{
                            background: selectedCompany.status === 'complete' ? '#34D399' : selectedCompany.status === 'active' ? '#60A5FA' : '#FBBF24'
                          }} />
                          {selectedCompany.status === 'complete' ? t('dash.status.complete') :
                           selectedCompany.status === 'active' ? t('dash.status.active') : t('dash.status.pending')}
                        </span>
                      </div>

                      <div className="mb-10">
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-white/60">{t('dash.progress')}</span>
                          <span className="font-semibold gold-text">{selectedCompany.progress ?? 0}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${selectedCompany.progress ?? 0}%`, background: 'linear-gradient(90deg, #DC2626, #F87171)' }} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {formationStages.map((stage, i) => {
                          const currentStage = getStageIndex(selectedCompany.progress ?? 0)
                          const isDone = i < currentStage
                          const isActive = i === currentStage
                          return (
                            <div key={stage} className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                                style={{
                                  background: isDone ? 'rgba(52,211,153,0.15)' : isActive ? 'rgba(220,38,38,0.15)' : 'var(--surface)',
                                  border: isDone ? '1px solid rgba(52,211,153,0.3)' : isActive ? '1px solid rgba(220,38,38,0.4)' : '1px solid var(--border)',
                                }}>
                                {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  : isActive ? <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                                  : <Circle className="w-4 h-4 text-white/20" />}
                              </div>
                              <div className="flex-1">
                                <div className={`text-sm font-medium ${isDone ? 'text-white' : isActive ? 'text-gold-400' : 'text-white/30'}`}>
                                  {stage}
                                </div>
                                {isActive && <div className="text-xs text-white/40 mt-0.5">In progress...</div>}
                              </div>
                              {isDone && <span className="text-xs text-emerald-400">Done</span>}
                              {isActive && <span className="text-xs text-gold-400">Active</span>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
