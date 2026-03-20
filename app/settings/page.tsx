'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe, User, Shield, LogOut, Save, CheckCircle2, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const { user, isLoggedIn, isLoading, logout } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.replace('/login?redirect=/settings')
  }, [isLoading, isLoggedIn, router])

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <Loader2 className="w-6 h-6 animate-spin text-white/40" />
      </div>
    )
  }

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <div className="border-b h-16 flex items-center px-6 gap-4" style={{ borderColor: 'var(--border)', background: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>
            <Globe className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold" style={{ color: 'var(--text)' }}>Atlas</span>
        </Link>
        <span className="text-sm" style={{ color: 'var(--text-4)' }}>/</span>
        <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>Settings</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">

        {/* Profile section */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-4 h-4 text-red-400" />
            <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Profile</h2>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            {user?.avatar
              ? <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
              : <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}>{initials}</div>
            }
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{user?.name ?? 'No name set'}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>
                {user?.provider ? `Signed in with ${user.provider}` : 'Email login'}
              </p>
              {user?.avatar && (
                <p className="text-xs mt-1" style={{ color: 'var(--text-4)' }}>Avatar synced from your social account</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Display Name</label>
              <input
                type="text"
                className="atlas-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Email</label>
              <input
                type="email"
                className="atlas-input opacity-60 cursor-not-allowed"
                value={user?.email ?? ''}
                disabled
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-4)' }}>Email is managed by your login provider</p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={saving || !name.trim()}
              className="gold-btn flex items-center gap-2 text-sm px-6 py-2.5 disabled:opacity-60">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                : saved
                ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </form>
        </div>

        {/* Account section */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-4 h-4 text-red-400" />
            <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Account</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Login Method</p>
                <p className="text-xs mt-0.5 capitalize" style={{ color: 'var(--text-4)' }}>{user?.provider ?? 'email'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>User ID</p>
                <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--text-4)' }}>{user?.userId?.slice(0, 20)}…</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Sign Out</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>Sign out of all devices</p>
              </div>
              <button onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all hover:opacity-80"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--text-4)' }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
