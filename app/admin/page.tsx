'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Globe, Users, Building2, Clock, CheckCircle2,
  AlertCircle, RefreshCw, ChevronDown, Search,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

interface AdminUser {
  user: {
    id: string
    email: string | null
    name: string | null
    provider: string | null
    country: string | null
    createdAt: string | null
  }
  companyCount: number
}

interface AdminCompany {
  company: {
    id: string
    companyName: string
    jurisdiction: string
    businessType: string
    industry: string | null
    directors: string | null
    contactEmail: string
    status: string | null
    progress: number | null
    registrationNumber: string | null
    createdAt: string | null
  }
  user: {
    id: string
    email: string | null
    name: string | null
  } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  active: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  complete: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
}

// ── Admin Page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [tab, setTab] = useState<'companies' | 'users'>('companies')
  const [users, setUsers] = useState<AdminUser[]>([])
  const [companies, setCompanies] = useState<AdminCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 20

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [u, c] = await Promise.all([
      fetch('/api/admin/users').then(r => r.ok ? r.json() : []),
      fetch('/api/admin/companies').then(r => r.ok ? r.json() : []),
    ])
    setUsers(u)
    setCompanies(c)
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const updateCompany = async (
    id: string,
    patch: { status?: string; progress?: number; registrationNumber?: string }
  ) => {
    setSaving(id)
    await fetch(`/api/admin/companies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    // Refresh companies list
    const updated = await fetch('/api/admin/companies').then(r => r.ok ? r.json() : companies)
    setCompanies(updated)
    setSaving(null)
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
  const newUsersThisWeek = users.filter(
    u => u.user.createdAt && new Date(u.user.createdAt).getTime() > sevenDaysAgo
  ).length
  const pending = companies.filter(c => c.company.status === 'pending').length
  const active = companies.filter(c => c.company.status === 'active').length
  const complete = companies.filter(c => c.company.status === 'complete').length

  // ── Filter ─────────────────────────────────────────────────────────────────
  const q = search.toLowerCase()
  const filteredCompanies = companies.filter(({ company, user }) =>
    !q ||
    company.companyName.toLowerCase().includes(q) ||
    company.jurisdiction.toLowerCase().includes(q) ||
    (user?.email ?? '').toLowerCase().includes(q) ||
    (user?.name ?? '').toLowerCase().includes(q)
  )
  const filteredUsers = users.filter(({ user }) =>
    !q ||
    (user.email ?? '').toLowerCase().includes(q) ||
    (user.name ?? '').toLowerCase().includes(q)
  )

  // Paginate
  const activeList = tab === 'companies' ? filteredCompanies : filteredUsers
  const totalPages = Math.max(1, Math.ceil(activeList.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pagedCompanies = filteredCompanies.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const pagedUsers = filteredUsers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Top bar */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-white/8 sticky top-0 z-40"
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
              <Globe className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white">Atlas</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">
            ← Dashboard
          </Link>
          <button onClick={fetchAll}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

        {/* ── Stats row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Users', value: users.length, icon: Users, color: '#60A5FA' },
            { label: 'New This Week', value: newUsersThisWeek, icon: Users, color: '#34D399' },
            { label: 'Pending', value: pending, icon: Clock, color: '#FBBF24' },
            { label: 'In Progress', value: active, icon: AlertCircle, color: '#60A5FA' },
            { label: 'Complete', value: complete, icon: CheckCircle2, color: '#34D399' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40 font-medium uppercase tracking-wider">{label}</span>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs + Search ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {(['companies', 'users'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setPage(1) }}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: tab === t ? 'linear-gradient(135deg, #DC2626, #F87171)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--text-3)',
                }}>
                {t === 'companies' ? `Company Requests (${companies.length})` : `Users (${users.length})`}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              className="atlas-input pl-9 text-sm w-64"
              placeholder="Search…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
        </div>

        {/* ── Company Requests Table ───────────────────────────────────────── */}
        {tab === 'companies' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-left">
                    {['Company', 'User', 'Jurisdiction', 'Type', 'Status', 'Progress', 'Reg #', 'Date', ''].map(h => (
                      <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9} className="px-5 py-16 text-center text-white/30">Loading…</td></tr>
                  ) : pagedCompanies.length === 0 ? (
                    <tr><td colSpan={9} className="px-5 py-16 text-center text-white/30">No companies found</td></tr>
                  ) : pagedCompanies.map(({ company, user }) => (
                    <tr key={company.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      {/* Company name */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{company.companyName}</div>
                        <div className="text-xs text-white/30 mt-0.5">{company.industry ?? '—'}</div>
                      </td>
                      {/* User */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-white/80">{user?.name ?? '—'}</div>
                        <div className="text-xs text-white/30 mt-0.5">{user?.email ?? '—'}</div>
                      </td>
                      {/* Jurisdiction */}
                      <td className="px-5 py-4 whitespace-nowrap text-white/70">{company.jurisdiction}</td>
                      {/* Business type */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="uppercase text-xs font-mono text-white/50">{company.businessType}</span>
                      </td>
                      {/* Status dropdown */}
                      <td className="px-5 py-4">
                        <div className="relative">
                          <select
                            value={company.status ?? 'pending'}
                            disabled={saving === company.id}
                            onChange={e => updateCompany(company.id, { status: e.target.value })}
                            className={`appearance-none text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer pr-7 transition-opacity ${STATUS_COLORS[company.status ?? 'pending']} ${saving === company.id ? 'opacity-50' : ''}`}
                            style={{ background: 'transparent' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="active">In Progress</option>
                            <option value="complete">Complete</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                        </div>
                      </td>
                      {/* Progress slider */}
                      <td className="px-5 py-4 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <input
                            type="range" min={0} max={100} step={5}
                            defaultValue={company.progress ?? 0}
                            disabled={saving === company.id}
                            onMouseUp={e => updateCompany(company.id, { progress: Number((e.target as HTMLInputElement).value) })}
                            onTouchEnd={e => updateCompany(company.id, { progress: Number((e.target as HTMLInputElement).value) })}
                            className="w-20 accent-red-500"
                          />
                          <span className="text-xs text-white/50 w-8 text-right">{company.progress ?? 0}%</span>
                        </div>
                      </td>
                      {/* Registration number */}
                      <td className="px-5 py-4">
                        <input
                          type="text"
                          placeholder="e.g. 202312345K"
                          defaultValue={company.registrationNumber ?? ''}
                          disabled={saving === company.id}
                          className="text-xs bg-transparent border-b border-white/10 focus:border-red-400 outline-none text-white/70 w-28 py-0.5 transition-colors placeholder:text-white/20"
                          onBlur={e => {
                            const val = e.target.value.trim()
                            if (val !== (company.registrationNumber ?? '')) {
                              updateCompany(company.id, { registrationNumber: val })
                            }
                          }}
                        />
                      </td>
                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-white/30">
                        {company.createdAt
                          ? new Date(company.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—'}
                      </td>
                      {/* Saving indicator */}
                      <td className="px-5 py-4">
                        {saving === company.id && (
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Users Table ──────────────────────────────────────────────────── */}
        {tab === 'users' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-left">
                    {['User', 'Email', 'Provider', 'Companies', 'Country', 'Joined'].map(h => (
                      <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="px-5 py-16 text-center text-white/30">Loading…</td></tr>
                  ) : pagedUsers.length === 0 ? (
                    <tr><td colSpan={6} className="px-5 py-16 text-center text-white/30">No users found</td></tr>
                  ) : pagedUsers.map(({ user, companyCount }) => {
                    const isNew = user.createdAt && new Date(user.createdAt).getTime() > sevenDaysAgo
                    return (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
                              {(user.name ?? user.email ?? 'U')[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-white">{user.name ?? '—'}</div>
                              {isNew && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">New</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-white/60">{user.email ?? '—'}</td>
                        <td className="px-5 py-4">
                          <span className="capitalize text-xs px-2 py-0.5 rounded-full border text-white/60"
                            style={{ borderColor: 'var(--border)' }}>
                            {user.provider ?? 'email'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-white/30" />
                            <span className="text-white/70">{companyCount}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-white/50">{user.country ?? '—'}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-xs text-white/30">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* ── Pagination ───────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/40">
              Showing {((safePage - 1) * PAGE_SIZE) + 1}–{Math.min(safePage * PAGE_SIZE, activeList.length)} of {activeList.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-3 py-1.5 rounded-lg border text-white/60 hover:text-white transition-colors disabled:opacity-30"
                style={{ borderColor: 'var(--border)' }}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .reduce<(number | '…')[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('…')
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) => p === '…'
                  ? <span key={`ellipsis-${i}`} className="text-white/30 px-1">…</span>
                  : <button key={p}
                      onClick={() => setPage(p as number)}
                      className="w-8 h-8 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: safePage === p ? 'rgba(220,38,38,0.2)' : 'transparent',
                        color: safePage === p ? '#EF4444' : 'rgba(255,255,255,0.5)',
                        border: safePage === p ? '1px solid rgba(220,38,38,0.3)' : '1px solid transparent',
                      }}>
                      {p}
                    </button>
                )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-3 py-1.5 rounded-lg border text-white/60 hover:text-white transition-colors disabled:opacity-30"
                style={{ borderColor: 'var(--border)' }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
