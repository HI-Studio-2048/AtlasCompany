import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { affiliateApplications } from '@/lib/schema'
import { sendAffiliateWelcome } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, website, how } = body

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const [application] = await db.insert(affiliateApplications).values({
    name,
    email,
    website: website || null,
    how: how || null,
    status: 'pending',
  }).returning()

  sendAffiliateWelcome({ to: email, name }).catch(() => {})

  return NextResponse.json(application, { status: 201 })
}
