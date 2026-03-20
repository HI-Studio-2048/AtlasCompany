'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTheme } from '@/context/ThemeContext'
import {
  DollarSign, Users, TrendingUp, Copy, Check, Clock,
  ChevronRight, ArrowUpRight, CheckCircle2, AlertCircle, Wallet,
  BarChart2, BookOpen
} from 'lucide-react'

// ─── Monthly Performance Data ─────────────────────────────────────────────────
const monthlyData = [
  { month: 'Sep',  direct: 480,   team: 0    },
  { month: 'Oct',  direct: 720,   team: 0    },
  { month: 'Nov',  direct: 990,   team: 36   },
  { month: 'Dec',  direct: 1320,  team: 89   },
  { month: 'Jan',  direct: 1540,  team: 142  },
  { month: 'Feb',  direct: 1980,  team: 390  },
  { month: 'Mar',  direct: 2062,  team: 687  },
]

function EarningsChart() {
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
          <h3 className="font-semibold text-white text-lg">Monthly Earnings</h3>
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
      <div className="relative overflow-x-auto">
        <svg
          width={(barW + gap) * monthlyData.length + gap}
          height={chartH + 48}
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

export default function AffiliatePortalPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'transactions' | 'team' | 'payouts' | 'performance'>('transactions')
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [payoutRequested, setPayoutRequested] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(affiliateData.refLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: 'transactions',  label: 'Transactions',   count: recentTransactions.length },
    { id: 'team',          label: 'Sales Team',      count: salesTeam.length },
    { id: 'payouts',       label: 'Payout History',  count: payoutHistory.length },
    { id: 'performance',   label: 'Performance',     count: null },
  ] as const

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── Header ─── */}
      <section className="relative pt-28 pb-10 px-6 overflow-hidden dot-grid">
        <div className="glow-orb w-[400px] h-[400px] opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35) 0%, transparent 70%)', top: '-10%', right: '5%' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div>
              <p className="text-sm text-white/40 mb-1">Welcome back,</p>
              <h1 className="text-3xl font-bold">{affiliateData.name}</h1>
              <p className="text-sm text-white/40 mt-1">Affiliate since {affiliateData.joinDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/affiliates/resources" className="px-4 py-2 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/affiliates" className="px-4 py-2 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">
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
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: DollarSign, label: 'Total Earned',     value: affiliateData.stats.totalEarned,    sub: 'All-time' },
            { icon: Clock,      label: 'Pending Payout',   value: affiliateData.stats.pendingPayout,  sub: 'Awaiting payment' },
            { icon: TrendingUp, label: 'This Month',       value: affiliateData.stats.thisMonth,      sub: 'Direct commissions' },
            { icon: Users,      label: 'Sales Team Bonus', value: affiliateData.stats.teamEarnings,   sub: 'This month' },
            { icon: ArrowUpRight, label: 'My Referrals',   value: affiliateData.stats.totalReferrals.toString(), sub: 'Total clients' },
            { icon: Users,      label: 'Sales Team',       value: affiliateData.stats.teamSize.toString(), sub: 'Active affiliates' },
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
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-white/40 mb-1">Your Referral Link</p>
              <code className="text-sm text-red-400">{affiliateData.refLink}</code>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-xs text-white/40">
                Code: <span className="font-mono text-white/70 font-semibold">{affiliateData.code}</span>
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
      <section className="px-6 pb-8">
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
              <div className="text-sm text-white/50">On every transaction from all {affiliateData.stats.teamSize} members of your sales team</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Tab bar */}
          <div className="flex gap-1 mb-6 border-b border-white/8 pb-0">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px"
                style={{
                  color: activeTab === tab.id ? '#DC2626' : 'rgba(255,255,255,0.4)',
                  borderColor: activeTab === tab.id ? '#DC2626' : 'transparent',
                }}>
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: activeTab === tab.id ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.05)', color: activeTab === tab.id ? '#EF4444' : 'rgba(255,255,255,0.3)' }}>
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
                    {recentTransactions.map((txn, i) => (
                      <tr key={txn.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === recentTransactions.length - 1 ? 'border-0' : ''}`}>
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
                              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }}>
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
              <div className="glass-card p-5 flex items-start gap-4">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed">
                  Your sales team members use their own referral links. You earn <strong className="text-white">5%</strong> of every transaction their clients make — automatically credited to your account.
                  To invite someone, share the affiliate program page: <code className="text-red-400 text-xs">atlas.co/affiliates</code>
                </p>
              </div>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        {['Team Member', 'Joined', 'Referrals', 'Their Earnings', 'Your 5% Cut', 'Status'].map(h => (
                          <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {salesTeam.map((m, i) => (
                        <tr key={m.name} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === salesTeam.length - 1 ? 'border-0' : ''}`}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                style={{ background: 'linear-gradient(135deg,#DC2626,#F87171)', color: '#000' }}>
                                {m.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-white">{m.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-white/45">{m.joined}</td>
                          <td className="px-5 py-4 text-white">{m.referrals}</td>
                          <td className="px-5 py-4 text-white/70">{m.earned}</td>
                          <td className="px-5 py-4 font-semibold text-red-400">{m.yourCut}</td>
                          <td className="px-5 py-4"><StatusBadge status={m.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center pt-4">
                <p className="text-sm text-white/40 mb-3">Want to grow your sales team?</p>
                <a href="mailto:?subject=Join Atlas Affiliate Program&body=I thought you'd be interested in the Atlas affiliate program. Use my link to join: https://atlas.co/affiliates?ref=ATLAS-DS7K2"
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
                  <div className="text-2xl font-bold gold-text">{affiliateData.stats.pendingPayout}</div>
                </div>
                <button onClick={() => setShowPayoutModal(true)}
                  className="gold-btn inline-flex items-center gap-2 text-sm">
                  <Wallet size={16} /> Request Payout
                </button>
              </div>
              <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Date', 'Amount', 'Method', 'Status'].map(h => (
                        <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {payoutHistory.map((p, i) => (
                      <tr key={p.date} className={`border-b border-white/5 hover:bg-white/2 ${i === payoutHistory.length-1 ? 'border-0' : ''}`}>
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
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <EarningsChart />
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
          <div className="glass-card p-8 max-w-md w-full relative">
            <button onClick={() => setShowPayoutModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xl leading-none">×</button>
            {payoutRequested ? (
              <div className="text-center py-4">
                <CheckCircle2 size={42} className="text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Payout Requested!</h3>
                <p className="text-sm text-white/55">Your payout of {affiliateData.stats.pendingPayout} will be processed within 2 business days.</p>
                <button onClick={() => { setShowPayoutModal(false); setPayoutRequested(false) }}
                  className="mt-6 gold-btn text-sm px-6">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1">Request Payout</h3>
                <p className="text-sm text-white/50 mb-6">Available balance: <span className="text-red-400 font-semibold">{affiliateData.stats.pendingPayout}</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Payout Method</label>
                    <select className="atlas-select">
                      <option>Wire Transfer (USD)</option>
                      <option>PayPal</option>
                      <option>USDC (Ethereum)</option>
                      <option>Bitcoin (BTC)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Account / Wallet Address</label>
                    <input type="text" className="atlas-input" placeholder="Bank account, PayPal email, or wallet address" />
                  </div>
                  <button onClick={() => setPayoutRequested(true)} className="gold-btn w-full flex items-center justify-center gap-2">
                    Confirm Payout Request <ChevronRight size={16} />
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
