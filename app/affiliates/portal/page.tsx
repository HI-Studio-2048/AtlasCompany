'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import {
  DollarSign, Users, TrendingUp, Copy, Check, Clock,
  ChevronRight, ArrowUpRight, CheckCircle2, AlertCircle, Wallet,
  BarChart2, BookOpen, Loader2, Instagram, Youtube, Twitter,
  Linkedin, Twitch, Tag, Edit2, X, Plus, Zap
} from 'lucide-react'

// ─── Monthly Performance Data ─────────────────────────────────────────────────
const MOCK_MONTHLY = [
  { month: 'Sep',  direct: 480,   team: 0    },
  { month: 'Oct',  direct: 720,   team: 0    },
  { month: 'Nov',  direct: 990,   team: 36   },
  { month: 'Dec',  direct: 1320,  team: 89   },
  { month: 'Jan',  direct: 1540,  team: 142  },
  { month: 'Feb',  direct: 1980,  team: 390  },
  { month: 'Mar',  direct: 2062,  team: 687  },
]

type MonthlyPoint = { month: string; direct: number; team: number }

function buildMonthlyData(transactions: { type: string; commissionAmount?: string | null; createdAt?: string | null }[]): MonthlyPoint[] {
  const map: Record<string, MonthlyPoint> = {}
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  transactions.forEach(tx => {
    const date = tx.createdAt ? new Date(tx.createdAt) : null
    if (!date) return
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const month = MONTHS[date.getMonth()]
    if (!map[key]) map[key] = { month, direct: 0, team: 0 }
    const amount = Number(tx.commissionAmount ?? 0)
    if (tx.type === 'team') map[key].team += amount
    else map[key].direct += amount
  })
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v)
    .slice(-7)
}

function EarningsChart({ data, isMock }: { data: MonthlyPoint[]; isMock: boolean }) {
  const monthlyData = data.length > 0 ? data : MOCK_MONTHLY
  const [hovered, setHovered] = useState<number | null>(null)
  const { theme } = useTheme()
  const gridStroke = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)'
  const labelFill  = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.35)'
  const monthFill  = theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.45)'
  const tooltipBg  = theme === 'dark' ? '#1a1a1a' : '#FFFFFF'
  const tooltipText = theme === 'dark' ? 'white' : '#0D0D0D'
  const tooltipSub  = theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)'
  const maxVal = Math.max(...monthlyData.map(d => d.direct + d.team))
  const chartH = 180
  const barW = 36
  const gap = 20

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-lg">Monthly Earnings</h3>
            {isMock && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(220,38,38,0.12)', color: '#F87171', border: '1px solid rgba(220,38,38,0.25)' }}>
                Sample
              </span>
            )}
          </div>
          <p className="text-xs text-white/40 mt-0.5">Direct commissions + sales team bonuses</p>
        </div>
        <div className="flex items-center gap-5 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> Direct (15%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'rgba(220,38,38,0.3)' }} /> Team (5%)
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${(barW + gap) * monthlyData.length + gap} ${chartH + 48}`}
          width="100%"
          height="auto"
          className="mx-auto"
        >
          {/* Horizontal guide lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => {
            const y = chartH - frac * chartH
            const val = Math.round(maxVal * frac)
            return (
              <g key={frac}>
                <line x1={0} y1={y} x2={(barW + gap) * monthlyData.length + gap} y2={y}
                  stroke={gridStroke} strokeWidth={1} strokeDasharray="4 4" />
                <text x={0} y={y - 4} fill={labelFill} fontSize={9} textAnchor="start">
                  ${val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                </text>
              </g>
            )
          })}

          {/* Bars */}
          {monthlyData.map((d, i) => {
            const x = gap + i * (barW + gap)
            const totalH = (d.direct + d.team) / maxVal * chartH
            const directH = d.direct / maxVal * chartH
            const teamH = d.team / maxVal * chartH
            const isHov = hovered === i
            const total = d.direct + d.team

            return (
              <g key={d.month}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}>
                {/* Team portion (bottom) */}
                {teamH > 0 && (
                  <rect
                    x={x} y={chartH - teamH} width={barW} height={teamH}
                    rx={4} ry={4}
                    fill={isHov ? 'rgba(220,38,38,0.5)' : 'rgba(220,38,38,0.25)'}
                    style={{ transition: 'fill 0.15s' }}
                  />
                )}
                {/* Direct portion (top) */}
                <rect
                  x={x} y={chartH - totalH} width={barW} height={directH + (teamH > 0 ? 4 : 0)}
                  rx={4} ry={4}
                  fill={isHov ? '#EF4444' : '#DC2626'}
                  style={{ transition: 'fill 0.15s' }}
                />

                {/* Month label */}
                <text x={x + barW / 2} y={chartH + 18} fill={monthFill}
                  fontSize={10} textAnchor="middle" fontWeight={isHov ? '600' : '400'}>
                  {d.month}
                </text>

                {/* Hover tooltip */}
                {isHov && (
                  <g>
                    <rect x={x - 10} y={chartH - totalH - 44} width={barW + 20} height={36}
                      rx={6} fill={tooltipBg} stroke="rgba(220,38,38,0.3)" strokeWidth={1} />
                    <text x={x + barW / 2} y={chartH - totalH - 27} fill={tooltipText}
                      fontSize={11} textAnchor="middle" fontWeight="700">
                      ${total.toLocaleString()}
                    </text>
                    <text x={x + barW / 2} y={chartH - totalH - 13} fill={tooltipSub}
                      fontSize={9} textAnchor="middle">
                      {d.month} 2025
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Growth callout */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[120px] glass-card p-4 text-center">
          <div className="text-xs text-white/40 mb-1">MoM Growth</div>
          <div className="text-xl font-bold text-green-400">+37%</div>
          <div className="text-[11px] text-white/30">Feb → Mar</div>
        </div>
        <div className="flex-1 min-w-[120px] glass-card p-4 text-center">
          <div className="text-xs text-white/40 mb-1">Best Month</div>
          <div className="text-xl font-bold text-white">$2,750</div>
          <div className="text-[11px] text-white/30">March 2025</div>
        </div>
        <div className="flex-1 min-w-[120px] glass-card p-4 text-center">
          <div className="text-xs text-white/40 mb-1">Avg / Month</div>
          <div className="text-xl font-bold text-white">$1,177</div>
          <div className="text-[11px] text-white/30">Last 7 months</div>
        </div>
        <div className="flex-1 min-w-[120px] glass-card p-4 text-center">
          <div className="text-xs text-white/40 mb-1">Team Contribution</div>
          <div className="text-xl font-bold gold-text">25%</div>
          <div className="text-[11px] text-white/30">Of total this month</div>
        </div>
      </div>
    </div>
  )
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const affiliateData = {
  name: 'Daniel S.',
  code: 'ATLAS-DS7K2',
  refLink: 'https://atlas.co/ref/ATLAS-DS7K2',
  joinDate: 'Jan 10, 2025',
  stats: {
    totalEarned:   '$8,242.50',
    pendingPayout: '$1,375.00',
    totalReferrals: 38,
    teamSize:       5,
    thisMonth:     '$2,062.50',
    teamEarnings:  '$687.50',
  },
}

const recentTransactions = [
  { id: 'TXN-001', client: 'Sarah M.',   service: 'Delaware LLC Formation', amount: '$699', commission: '$104.85', type: 'direct', date: 'Mar 18, 2025', status: 'paid' },
  { id: 'TXN-002', client: 'James L.',   service: 'Madrid Protocol Filing',  amount: '$899', commission: '$134.85', type: 'direct', date: 'Mar 16, 2025', status: 'paid' },
  { id: 'TXN-003', client: 'Amy T.',     service: 'Singapore Company',       amount: '$599', commission: '$44.93',  type: 'team',   date: 'Mar 15, 2025', status: 'paid', teamMember: 'Chris R.' },
  { id: 'TXN-004', client: 'Kevin D.',   service: 'DMCA Takedown x3',        amount: '$447', commission: '$67.05', type: 'direct', date: 'Mar 14, 2025', status: 'pending' },
  { id: 'TXN-005', client: 'Lena W.',    service: 'Brand Monitoring (12mo)', amount: '$1,188', commission: '$178.20', type: 'direct', date: 'Mar 12, 2025', status: 'paid' },
  { id: 'TXN-006', client: 'Marco P.',   service: 'HK Company Formation',    amount: '$799', commission: '$39.95',  type: 'team',   date: 'Mar 10, 2025', status: 'pending', teamMember: 'Lisa K.' },
  { id: 'TXN-007', client: 'Priya S.',   service: 'Trademark + Monitoring',  amount: '$1,287', commission: '$193.05', type: 'direct', date: 'Mar 8, 2025', status: 'paid' },
  { id: 'TXN-008', client: 'Ravi N.',    service: 'Dubai Freezone Setup',    amount: '$1,499', commission: '$74.95', type: 'team',   date: 'Mar 5, 2025', status: 'paid', teamMember: 'Mark T.' },
]

const salesTeam = [
  { name: 'Chris R.',  joined: 'Feb 3, 2025',  referrals: 12, earned: '$3,240', status: 'active',   yourCut: '$162.00' },
  { name: 'Lisa K.',   joined: 'Feb 15, 2025', referrals: 9,  earned: '$2,187', status: 'active',   yourCut: '$109.35' },
  { name: 'Mark T.',   joined: 'Mar 1, 2025',  referrals: 7,  earned: '$1,799', status: 'active',   yourCut: '$89.95' },
  { name: 'Anita L.',  joined: 'Mar 8, 2025',  referrals: 4,  earned: '$987',   status: 'active',   yourCut: '$49.35' },
  { name: 'Ben S.',    joined: 'Mar 14, 2025', referrals: 1,  earned: '$299',   status: 'pending',  yourCut: '$14.95' },
]

const payoutHistory = [
  { date: 'Mar 1, 2025',  amount: '$1,840.00', method: 'Wire Transfer', status: 'paid' },
  { date: 'Feb 15, 2025', amount: '$2,105.50', method: 'USDC',          status: 'paid' },
  { date: 'Feb 1, 2025',  amount: '$965.00',   method: 'Wire Transfer', status: 'paid' },
]

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    paid:    { bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.3)',  text: '#4ade80', label: 'Paid' },
    pending: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24', label: 'Pending' },
    active:  { bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.3)',  text: '#4ade80', label: 'Active' },
  }[status] ?? { bg: 'var(--surface)', border: 'var(--border)', text: 'var(--text-2)', label: status }

  return (
    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
      style={{ background: styles.bg, border: `1px solid ${styles.border}`, color: styles.text }}>
      {styles.label}
    </span>
  )
}

// ─── Platform Config ─────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: 'instagram', label: 'Instagram',  Icon: Instagram, color: '#E1306C', prefix: 'instagram.com/' },
  { id: 'youtube',   label: 'YouTube',    Icon: Youtube,   color: '#FF0000', prefix: 'youtube.com/@' },
  { id: 'tiktok',    label: 'TikTok',     Icon: Zap,       color: '#69C9D0', prefix: 'tiktok.com/@' },
  { id: 'twitter',   label: 'Twitter / X', Icon: Twitter,  color: '#1DA1F2', prefix: 'x.com/' },
  { id: 'linkedin',  label: 'LinkedIn',   Icon: Linkedin,  color: '#0A66C2', prefix: 'linkedin.com/in/' },
  { id: 'twitch',    label: 'Twitch',     Icon: Twitch,    color: '#9146FF', prefix: 'twitch.tv/' },
] as const

type Platform = typeof PLATFORMS[number]['id']

interface SocialLink {
  id: string
  platform: Platform
  handle: string
  url?: string
  followersCount?: number
  status: string
}

interface DiscountCode {
  id: string
  code: string
  discountPct: number
  timesUsed: number
  totalDiscounted: string
}

// ─── Influencers Tab ─────────────────────────────────────────────────────────
function InfluencersTab({ affiliateCode }: { affiliateCode: string }) {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [discountCode, setDiscountCode] = useState<DiscountCode | null>(null)
  const [loading, setLoading] = useState(true)

  // Link form
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [handle, setHandle] = useState('')
  const [followers, setFollowers] = useState('')
  const [linking, setLinking] = useState(false)

  // Code editing
  const [editingCode, setEditingCode] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeSaving, setCodeSaving] = useState(false)
  const [codeError, setCodeError] = useState('')

  // Copy states
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    fetch('/api/affiliates/influencer')
      .then(r => r.json())
      .then(data => {
        if (data.links) setLinks(data.links)
        if (data.discountCode) {
          setDiscountCode(data.discountCode)
          setCodeInput(data.discountCode.code)
        }
      })
      .catch(() => {
        // Fallback mock data
        const mockCode = affiliateCode.replace('ATLAS-', '').replace('-', '') + '10'
        setDiscountCode({ id: 'mock', code: mockCode, discountPct: 10, timesUsed: 7, totalDiscounted: '2340.00' })
        setCodeInput(mockCode)
      })
      .finally(() => setLoading(false))
  }, [affiliateCode])

  const handleLink = async () => {
    if (!handle.trim()) return
    setLinking(true)
    const cfg = PLATFORMS.find(p => p.id === platform)!
    const url = `https://${cfg.prefix}${handle.replace('@', '')}`
    try {
      const res = await fetch('/api/affiliates/influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, handle: handle.replace('@', ''), url, followersCount: followers ? parseInt(followers) : null }),
      })
      const data = await res.json()
      if (data.link) {
        setLinks(prev => [...prev, data.link])
        setHandle('')
        setFollowers('')
        setShowLinkForm(false)
      }
    } catch {
      // optimistic fallback
      const newLink: SocialLink = { id: Date.now().toString(), platform, handle: handle.replace('@', ''), url, followersCount: followers ? parseInt(followers) : undefined, status: 'active' }
      setLinks(prev => [...prev, newLink])
      setHandle('')
      setFollowers('')
      setShowLinkForm(false)
    } finally {
      setLinking(false)
    }
  }

  const handleUnlink = async (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id))
    await fetch('/api/affiliates/influencer/link', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {})
  }

  const handleSaveCode = async () => {
    setCodeError('')
    setCodeSaving(true)
    try {
      const res = await fetch('/api/affiliates/influencer/discount-code', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput }),
      })
      const data = await res.json()
      if (res.status === 409) { setCodeError('Code already taken — try another'); return }
      if (data.discountCode) setDiscountCode(data.discountCode)
      setEditingCode(false)
    } catch {
      setDiscountCode(prev => prev ? { ...prev, code: codeInput.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20) } : prev)
      setEditingCode(false)
    } finally {
      setCodeSaving(false)
    }
  }

  const copyCode = () => {
    if (!discountCode) return
    navigator.clipboard.writeText(discountCode.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-white/30" /></div>
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="glass-card p-5 flex items-start gap-4">
        <Zap size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/60 leading-relaxed">
          Link your social accounts below, then share your exclusive{' '}
          <strong className="text-white">10% discount code</strong> with your audience.
          When someone uses your code, they save 10% and you still earn your referral commission — win/win.
        </p>
      </div>

      {/* ── Discount Code ── */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Tag size={16} className="text-red-400" /> Your Discount Code
          </h3>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', color: '#EF4444' }}>
            10% OFF for customers
          </span>
        </div>

        {editingCode ? (
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                className="atlas-input flex-1 font-mono uppercase"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20))}
                placeholder="e.g. YOURNAME10"
                maxLength={20}
              />
              <button onClick={handleSaveCode} disabled={codeSaving || !codeInput.trim()}
                className="gold-btn text-sm px-5 disabled:opacity-60">
                {codeSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Save'}
              </button>
              <button onClick={() => { setEditingCode(false); setCodeError(''); setCodeInput(discountCode?.code ?? '') }}
                className="p-2.5 rounded-lg text-white/40 hover:text-white border border-white/10 transition-colors">
                <X size={15} />
              </button>
            </div>
            {codeError && <p className="text-xs text-red-400">{codeError}</p>}
            <p className="text-xs text-white/35">Letters and numbers only, max 20 characters.</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="text-3xl font-bold tracking-widest font-mono"
                style={{ background: 'linear-gradient(135deg,#f87171,#DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {discountCode?.code ?? '—'}
              </div>
              {discountCode && (
                <p className="text-xs text-white/40 mt-1">
                  Used {discountCode.timesUsed} times · ${Number(discountCode.totalDiscounted).toLocaleString()} saved for customers
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setEditingCode(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border border-white/10 text-white/50 hover:text-white transition-colors">
                <Edit2 size={12} /> Customize
              </button>
              <button onClick={copyCode}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
                style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copiedCode ? '#4ade80' : '#DC2626' }}>
                {copiedCode ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Code</>}
              </button>
            </div>
          </div>
        )}

        {/* Usage stats */}
        {discountCode && (
          <div className="mt-5 pt-5 border-t border-white/8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{discountCode.timesUsed}</div>
              <div className="text-[11px] text-white/35 mt-0.5">Times Used</div>
            </div>
            <div className="text-center border-x border-white/8">
              <div className="text-xl font-bold text-white">{discountCode.discountPct}%</div>
              <div className="text-[11px] text-white/35 mt-0.5">Discount Given</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">${Number(discountCode.totalDiscounted).toLocaleString()}</div>
              <div className="text-[11px] text-white/35 mt-0.5">Customer Savings</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Linked Accounts ── */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Connected Accounts</h3>
          {!showLinkForm && (
            <button onClick={() => setShowLinkForm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border border-white/10 text-white/50 hover:text-white transition-colors">
              <Plus size={13} /> Link Account
            </button>
          )}
        </div>

        {/* Add form */}
        {showLinkForm && (
          <div className="mb-5 p-4 rounded-xl border border-white/10 bg-white/2 space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <select className="atlas-select" value={platform} onChange={e => setPlatform(e.target.value as Platform)}>
                {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
              <input className="atlas-input" placeholder="@handle" value={handle} onChange={e => setHandle(e.target.value)} />
              <input className="atlas-input" placeholder="Followers (optional)" type="number" value={followers} onChange={e => setFollowers(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleLink} disabled={linking || !handle.trim()}
                className="gold-btn text-sm px-5 disabled:opacity-60 flex items-center gap-2">
                {linking ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Linking…</> : 'Link Account'}
              </button>
              <button onClick={() => { setShowLinkForm(false); setHandle(''); setFollowers('') }}
                className="px-4 py-2 rounded-lg text-sm border border-white/10 text-white/50 hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {links.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)' }}>
              <Users size={20} className="text-red-400" />
            </div>
            <p className="text-sm text-white/40">No accounts linked yet.</p>
            <p className="text-xs text-white/25 mt-1">Connect your social profiles to track reach.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map(link => {
              const cfg = PLATFORMS.find(p => p.id === link.platform)
              const Icon = cfg?.Icon ?? Users
              return (
                <div key={link.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-white/8 hover:border-white/15 transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cfg?.color ?? '#DC2626'}20`, border: `1px solid ${cfg?.color ?? '#DC2626'}30` }}>
                    <Icon size={17} style={{ color: cfg?.color ?? '#DC2626' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">{cfg?.label ?? link.platform}</div>
                    <div className="text-xs text-white/40 truncate">@{link.handle}</div>
                  </div>
                  {link.followersCount != null && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-semibold text-white">{link.followersCount.toLocaleString()}</div>
                      <div className="text-[10px] text-white/30">followers</div>
                    </div>
                  )}
                  <button onClick={() => handleUnlink(link.id)}
                    className="ml-2 p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0">
                    <X size={14} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Promo tip */}
      <div className="glass-card p-5">
        <h4 className="text-sm font-semibold text-white mb-3">How to promote</h4>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-white/50">
          <div className="flex gap-2.5">
            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
              style={{ background: 'rgba(220,38,38,0.15)', color: '#EF4444' }}>1</span>
            <span>Share your referral link or discount code in your bio, stories, or videos.</span>
          </div>
          <div className="flex gap-2.5">
            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
              style={{ background: 'rgba(220,38,38,0.15)', color: '#EF4444' }}>2</span>
            <span>Followers use your code at checkout for 10% off their service.</span>
          </div>
          <div className="flex gap-2.5">
            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
              style={{ background: 'rgba(220,38,38,0.15)', color: '#EF4444' }}>3</span>
            <span>You earn your 15% lifetime commission on every converted customer.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AffiliatePortalPage() {
  const { user, isLoggedIn } = useAuth()
  const [portalData, setPortalData] = useState<{
    isAffiliate: boolean
    affiliate?: { name: string; referralCode: string; joinedAt: string }
    stats?: { totalEarned: number; pendingPayout: number; totalReferrals: number; teamSize: number; teamBonus: number }
    refLink?: string
    transactions?: typeof recentTransactions
    teamMembers?: typeof salesTeam
    payouts?: typeof payoutHistory
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return }
    fetch('/api/affiliates/portal')
      .then(r => r.json())
      .then(setPortalData)
      .catch(() => setPortalData({ isAffiliate: false }))
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'transactions' | 'team' | 'payouts' | 'performance' | 'influencers'>('transactions')
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState('Wire Transfer (USD)')
  const [payoutAccount, setPayoutAccount] = useState('')
  const [payoutRequested, setPayoutRequested] = useState(false)
  const [payoutLoading, setPayoutLoading] = useState(false)

  // Use real data where available, fall back to mock for demo
  const name = portalData?.affiliate?.name ?? user?.name ?? affiliateData.name
  const code = portalData?.affiliate?.referralCode ?? affiliateData.code
  const refLink = portalData?.refLink ?? affiliateData.refLink
  const joinDate = portalData?.affiliate?.joinedAt
    ? new Date(portalData.affiliate.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : affiliateData.joinDate
  const stats = portalData?.stats
    ? {
        totalEarned: `$${portalData.stats.totalEarned.toFixed(2)}`,
        pendingPayout: `$${portalData.stats.pendingPayout.toFixed(2)}`,
        totalReferrals: portalData.stats.totalReferrals,
        teamSize: portalData.stats.teamSize,
        thisMonth: `$${(portalData.stats.totalEarned * 0.25).toFixed(2)}`, // approx
        teamEarnings: `$${portalData.stats.teamBonus.toFixed(2)}`,
      }
    : affiliateData.stats
  const txns = (portalData?.transactions?.length ?? 0) > 0 ? portalData!.transactions! : recentTransactions
  const team = (portalData?.teamMembers?.length ?? 0) > 0 ? portalData!.teamMembers! : salesTeam
  const history = (portalData?.payouts?.length ?? 0) > 0 ? portalData!.payouts! : payoutHistory
  const isMockData = !portalData?.isAffiliate || (portalData?.transactions?.length ?? 0) === 0
  const chartData = portalData?.transactions ? buildMonthlyData(portalData.transactions) : []

  const copy = () => {
    navigator.clipboard.writeText(refLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePayoutRequest = async () => {
    if (!payoutAccount.trim()) return
    setPayoutLoading(true)
    try {
      await fetch('/api/affiliates/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: portalData?.stats?.pendingPayout ?? 0,
          method: payoutMethod,
          accountDetails: payoutAccount,
        }),
      })
      setPayoutRequested(true)
    } finally {
      setPayoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Sign in to view your portal</h2>
          <Link href="/login?redirect=/affiliates/portal" className="gold-btn inline-flex items-center gap-2">
            Sign In <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  if (portalData && !portalData.isAffiliate) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <Users size={32} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">You&apos;re not an affiliate yet</h2>
            <p className="text-white/55 mb-6">Apply to the program to get your referral link and start earning 15% lifetime commissions.</p>
            <Link href="/affiliates#join" className="gold-btn inline-flex items-center gap-2">
              Apply Now <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const tabs = [
    { id: 'transactions',  label: 'Transactions',   count: txns.length },
    { id: 'team',          label: 'Sales Team',      count: team.length },
    { id: 'payouts',       label: 'Payout History',  count: history.length },
    { id: 'performance',   label: 'Performance',     count: null },
    { id: 'influencers',   label: 'Influencers',     count: null },
  ] as const

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── Header ─── */}
      <section className="relative pt-28 pb-10 px-4 sm:px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[400px] h-[400px] opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', right: '5%' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div>
              <p className="text-sm text-white/40 mb-1">Welcome back,</p>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-sm text-white/40 mt-1">Affiliate since {joinDate}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link href="/affiliates/resources" className="px-3 sm:px-4 py-2 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/affiliates" className="px-3 sm:px-4 py-2 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">
                Program Details
              </Link>
              <button
                onClick={() => setShowPayoutModal(true)}
                className="gold-btn inline-flex items-center gap-2 text-sm"
              >
                <Wallet size={16} /> Request Payout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { icon: DollarSign, label: 'Total Earned',     value: stats.totalEarned,    sub: 'All-time' },
            { icon: Clock,      label: 'Pending Payout',   value: stats.pendingPayout,  sub: 'Awaiting payment' },
            { icon: TrendingUp, label: 'This Month',       value: stats.thisMonth,      sub: 'Direct commissions' },
            { icon: Users,      label: 'Sales Team Bonus', value: stats.teamEarnings,   sub: 'This month' },
            { icon: ArrowUpRight, label: 'My Referrals',   value: stats.totalReferrals.toString(), sub: 'Total clients' },
            { icon: Users,      label: 'Sales Team',       value: stats.teamSize.toString(), sub: 'Active affiliates' },
          ].map(s => (
            <div key={s.label} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={14} className="text-red-400" />
                <span className="text-xs text-white/40">{s.label}</span>
              </div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-[11px] text-white/30 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Referral Link ─── */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-white/40 mb-1">Your Referral Link</p>
              <code className="text-sm text-red-400">{refLink}</code>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-xs text-white/40">
                Code: <span className="font-mono text-white/70 font-semibold">{code}</span>
              </div>
              <button onClick={copy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
                style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.08)', color: copied ? '#4ade80' : '#DC2626' }}>
                {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Link</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Commission Info Banner ─── */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5 flex items-center gap-4 border-red-600/20">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <DollarSign size={22} className="text-red-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">15% Lifetime Commission</div>
              <div className="text-sm text-white/50">On every transaction from your direct referrals — forever</div>
            </div>
          </div>
          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <Users size={22} className="text-red-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">+5% Sales Team Bonus</div>
              <div className="text-sm text-white/50">On every transaction from all {stats.teamSize} members of your sales team</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Tab bar */}
          <div className="flex gap-1 mb-6 border-b border-white/8 pb-0 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-4 sm:px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px whitespace-nowrap flex-shrink-0"
                style={{
                  color: activeTab === tab.id ? '#DC2626' : 'var(--text-3)',
                  borderColor: activeTab === tab.id ? '#DC2626' : 'transparent',
                }}>
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: activeTab === tab.id ? 'rgba(220,38,38,0.12)' : 'var(--border)', color: activeTab === tab.id ? '#EF4444' : 'var(--text-3)' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Transaction', 'Service', 'Amount', 'Your Commission', 'Type', 'Date', 'Status'].map(h => (
                        <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {txns.map((txn, i) => (
                      <tr key={txn.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === txns.length - 1 ? 'border-0' : ''}`}>
                        <td className="px-5 py-4">
                          <div className="font-medium text-white">{txn.client}</div>
                          <div className="text-xs text-white/35">{txn.id}</div>
                        </td>
                        <td className="px-5 py-4 text-white/60">{txn.service}</td>
                        <td className="px-5 py-4 font-medium text-white">{txn.amount}</td>
                        <td className="px-5 py-4">
                          <span className="font-semibold text-red-400">{txn.commission}</span>
                          <div className="text-[10px] text-white/30">{txn.type === 'direct' ? '15%' : '5% via team'}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
                            style={txn.type === 'direct'
                              ? { background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#EF4444' }
                              : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                            {txn.type === 'direct' ? 'Direct' : `Team · ${txn.teamMember}`}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-white/45">{txn.date}</td>
                        <td className="px-5 py-4"><StatusBadge status={txn.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sales Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <style>{`
                @keyframes dashFlow { to { stroke-dashoffset: -26; } }
                @keyframes pulseRing { 0%,100% { opacity:.1; transform:scale(1); } 50% { opacity:.28; transform:scale(1.07); } }
                @keyframes centerPulse { 0%,100% { filter:drop-shadow(0 0 10px rgba(220,38,38,.55)); } 50% { filter:drop-shadow(0 0 26px rgba(220,38,38,.95)); } }
                @keyframes nodeFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
              `}</style>

              <div className="glass-card p-5 flex items-start gap-4">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed">
                  Your sales team members use their own referral links. You earn <strong className="text-white">5%</strong> of every transaction their clients make — automatically credited to your account.
                  To invite someone, share the affiliate program page: <code className="text-red-400 text-xs">atlas.co/affiliates</code>
                </p>
              </div>

              {/* ── Network Web Visualization ── */}
              <div className="glass-card pt-5 pb-2">
                <div className="px-6 mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/35 uppercase tracking-widest">Network Map</span>
                  <span className="text-xs text-white/30">{team.length} members · 5% override on each</span>
                </div>
                <svg viewBox="0 0 800 480" width="100%" style={{ display: 'block', overflow: 'visible' }}>
                  <defs>
                    <radialGradient id="cgTeam" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F87171" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </radialGradient>
                    <radialGradient id="agTeam" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#7f1d1d" />
                    </radialGradient>
                    <radialGradient id="pgTeam" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#78350f" />
                    </radialGradient>
                    <filter id="gf" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="4" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="cf" x="-120%" y="-120%" width="340%" height="340%">
                      <feGaussianBlur stdDeviation="9" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {/* ── glow base lines ── */}
                  {team.map((m, i) => {
                    const a = (2 * Math.PI / team.length) * i - Math.PI / 2
                    const R = 152, cx = 400, cy = 248
                    const mx = cx + R * Math.cos(a), my = cy + R * Math.sin(a)
                    const alpha = (0.12 + (m.referrals / 12) * 0.22).toFixed(2)
                    return <line key={`gl-${i}`} x1={cx} y1={cy} x2={mx} y2={my} stroke={`rgba(220,38,38,${alpha})`} strokeWidth="5" strokeLinecap="round" />
                  })}

                  {/* ── animated dash lines ── */}
                  {team.map((m, i) => {
                    const a = (2 * Math.PI / team.length) * i - Math.PI / 2
                    const R = 152, cx = 400, cy = 248
                    const mx = cx + R * Math.cos(a), my = cy + R * Math.sin(a)
                    const speed = (1.2 + (1 - m.referrals / 12) * 1.4).toFixed(1)
                    return (
                      <line key={`dl-${i}`} x1={cx} y1={cy} x2={mx} y2={my}
                        stroke="rgba(239,68,68,0.6)" strokeWidth="1.5" strokeLinecap="round"
                        strokeDasharray="5 9"
                        style={{ animation: `dashFlow ${speed}s linear infinite` }} />
                    )
                  })}

                  {/* ── orbit rings around center ── */}
                  {[55, 80, 110].map((r, k) => (
                    <circle key={k} cx={400} cy={248} r={r}
                      fill="none" stroke="rgba(220,38,38,0.06)" strokeWidth="1"
                      style={{ animation: `pulseRing ${2.2 + k * 0.7}s ease-in-out infinite`, transformOrigin: '400px 248px' }} />
                  ))}

                  {/* ── YOU – center node ── */}
                  <g style={{ animation: 'centerPulse 3s ease-in-out infinite' }}>
                    <circle cx={400} cy={248} r={44} fill="url(#cgTeam)" filter="url(#cf)" />
                    <circle cx={400} cy={248} r={44} fill="none" stroke="rgba(248,113,113,0.4)" strokeWidth="1.5" />
                    <text x={400} y={244} textAnchor="middle" dominantBaseline="middle" fill="white"
                      fontSize="15" fontWeight="bold" style={{ userSelect: 'none' }}>
                      {name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </text>
                    <text x={400} y={262} textAnchor="middle" fill="rgba(255,255,255,0.5)"
                      fontSize="9" fontWeight="700" letterSpacing="2" style={{ userSelect: 'none' }}>YOU</text>
                  </g>

                  {/* ── member nodes ── */}
                  {team.map((m, i) => {
                    const a = (2 * Math.PI / team.length) * i - Math.PI / 2
                    const R = 152, cx = 400, cy = 248
                    const mx = cx + R * Math.cos(a), my = cy + R * Math.sin(a)
                    const nodeR = Math.round(22 + Math.sqrt(Math.max(m.referrals, 0) / 12) * 14)
                    const initials = m.name.split(' ').map((n: string) => n[0]).join('')
                    const isActive = m.status === 'active'
                    const gradId = isActive ? 'agTeam' : 'pgTeam'
                    const ringColor = isActive ? 'rgba(74,222,128,0.4)' : 'rgba(251,191,36,0.4)'
                    const labelY = my + nodeR + 15
                    const floatDelay = `${i * 0.5}s`

                    return (
                      <g key={m.name} filter="url(#gf)"
                        style={{ animation: `nodeFloat ${2.8 + i * 0.3}s ease-in-out infinite`, animationDelay: floatDelay, transformOrigin: `${mx}px ${my}px` }}>
                        {/* pulse ring */}
                        <circle cx={mx} cy={my} r={nodeR + 9}
                          fill="none" stroke={ringColor} strokeWidth="1"
                          style={{ animation: `pulseRing ${1.8 + i * 0.38}s ease-in-out infinite`, transformOrigin: `${mx}px ${my}px` }} />
                        {/* node body */}
                        <circle cx={mx} cy={my} r={nodeR} fill={`url(#${gradId})`} />
                        <circle cx={mx} cy={my} r={nodeR} fill="none" stroke={ringColor} strokeWidth="1.5" />
                        {/* highlight */}
                        <circle cx={mx - nodeR * 0.28} cy={my - nodeR * 0.28} r={nodeR * 0.22}
                          fill="rgba(255,255,255,0.12)" />
                        {/* initials */}
                        <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle"
                          fill="white" fontSize={Math.max(9, Math.round(nodeR * 0.4))} fontWeight="bold"
                          style={{ userSelect: 'none' }}>{initials}</text>
                        {/* name */}
                        <text x={mx} y={labelY} textAnchor="middle"
                          fill="rgba(255,255,255,0.88)" fontSize="11" fontWeight="600"
                          style={{ userSelect: 'none' }}>{m.name}</text>
                        {/* your cut */}
                        <text x={mx} y={labelY + 14} textAnchor="middle"
                          fill="rgba(239,68,68,0.9)" fontSize="10"
                          style={{ userSelect: 'none' }}>+{m.yourCut}</text>
                        {/* refs */}
                        <text x={mx} y={labelY + 27} textAnchor="middle"
                          fill="rgba(255,255,255,0.3)" fontSize="9"
                          style={{ userSelect: 'none' }}>{m.referrals} refs</text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* ── summary cards ── */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {team.map(m => (
                  <div key={m.name} className="glass-card p-3 transition-colors hover:border-red-600/25"
                    style={{ borderColor: m.status === 'pending' ? 'rgba(251,191,36,0.15)' : undefined }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                        style={{ background: m.status === 'active' ? 'linear-gradient(135deg,#DC2626,#991b1b)' : 'linear-gradient(135deg,#d97706,#78350f)', color: 'white' }}>
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-medium text-white truncate">{m.name}</span>
                    </div>
                    <div className="text-red-400 font-semibold text-sm">{m.yourCut}</div>
                    <div className="text-[10px] text-white/35 mt-0.5">{m.earned} · {m.referrals} refs</div>
                    <div className="mt-1.5"><StatusBadge status={m.status} /></div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-white/40 mb-3">Want to grow your sales team?</p>
                <a href={`mailto:?subject=Join Atlas Affiliate Program&body=I thought you'd be interested in the Atlas affiliate program. Use my link to join: ${refLink}`}
                  className="gold-btn inline-flex items-center gap-2 text-sm">
                  Invite Someone <ChevronRight size={16} />
                </a>
              </div>
            </div>
          )}

          {/* Payouts Tab */}
          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <div className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-white/40 mb-0.5">Available for payout</div>
                  <div className="text-2xl font-bold gold-text">{stats.pendingPayout}</div>
                </div>
                <button onClick={() => setShowPayoutModal(true)}
                  className="gold-btn inline-flex items-center gap-2 text-sm">
                  <Wallet size={16} /> Request Payout
                </button>
              </div>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Date', 'Amount', 'Method', 'Status'].map(h => (
                        <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((p, i) => (
                      <tr key={p.date} className={`border-b border-white/5 hover:bg-white/2 ${i === history.length-1 ? 'border-0' : ''}`}>
                        <td className="px-5 py-4 text-white/60">{p.date}</td>
                        <td className="px-5 py-4 font-semibold text-white">{p.amount}</td>
                        <td className="px-5 py-4 text-white/50">{p.method}</td>
                        <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}

          {/* Influencers Tab */}
          {activeTab === 'influencers' && (
            <InfluencersTab affiliateCode={code} />
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <EarningsChart data={chartData} isMock={isMockData} />
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart2 size={16} className="text-red-400" /> Referral Breakdown
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Company Formation', txns: 14, earnings: '$2,940', pct: 36 },
                    { label: 'Trademark Services', txns: 12, earnings: '$2,538', pct: 31 },
                    { label: 'DMCA & Monitoring',  txns: 8,  earnings: '$1,680', pct: 20 },
                    { label: 'Brand Monitoring',   txns: 3,  earnings: '$756',   pct: 9  },
                    { label: 'Other Services',     txns: 1,  earnings: '$328',   pct: 4  },
                  ].map(s => (
                    <div key={s.label} className="glass-card p-4">
                      <div className="text-xs text-white/40 mb-1">{s.label}</div>
                      <div className="text-lg font-bold text-white">{s.earnings}</div>
                      <div className="text-xs text-white/35 mb-3">{s.txns} transactions</div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div className="h-full rounded-full bg-red-600" style={{ width: `${s.pct}%` }} />
                      </div>
                      <div className="text-[10px] text-white/30 mt-1">{s.pct}% of earnings</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center pt-2">
                <p className="text-sm text-white/40 mb-3">Want more promotional resources?</p>
                <Link href="/affiliates/resources" className="gold-btn inline-flex items-center gap-2 text-sm">
                  <BookOpen size={15} /> Marketing Resources
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Payout Modal ─── */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
          <div className="glass-card p-5 sm:p-8 max-w-md w-full relative">
            <button onClick={() => setShowPayoutModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xl leading-none">×</button>
            {payoutRequested ? (
              <div className="text-center py-4">
                <CheckCircle2 size={42} className="text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Payout Requested!</h3>
                <p className="text-sm text-white/55">Your payout of {stats.pendingPayout} will be processed within 2 business days.</p>
                <button onClick={() => { setShowPayoutModal(false); setPayoutRequested(false) }}
                  className="mt-6 gold-btn text-sm px-6">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1">Request Payout</h3>
                <p className="text-sm text-white/50 mb-6">Available balance: <span className="text-red-400 font-semibold">{stats.pendingPayout}</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Payout Method</label>
                    <select className="atlas-select" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
                      <option>Wire Transfer (USD)</option>
                      <option>PayPal</option>
                      <option>USDC (Ethereum)</option>
                      <option>Bitcoin (BTC)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Account / Wallet Address</label>
                    <input type="text" className="atlas-input" placeholder="Bank account, PayPal email, or wallet address"
                      value={payoutAccount} onChange={e => setPayoutAccount(e.target.value)} />
                  </div>
                  <button onClick={handlePayoutRequest} disabled={payoutLoading || !payoutAccount.trim()}
                    className="gold-btn w-full flex items-center justify-center gap-2 disabled:opacity-60">
                    {payoutLoading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                      : <>Confirm Payout Request <ChevronRight size={16} /></>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
