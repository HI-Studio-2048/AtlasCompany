import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { companies, affiliates, affiliateReferrals } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, session.userId))
    .orderBy(desc(companies.createdAt))

  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { companyName, jurisdiction, businessType, industry, directors, contactEmail, contactPhone } = body

  if (!companyName || !jurisdiction || !businessType || !contactEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [company] = await db.insert(companies).values({
    userId: session.userId,
    companyName,
    jurisdiction,
    businessType,
    industry,
    directors,
    contactEmail,
    contactPhone,
    status: 'pending',
    progress: 5, // Application received
  }).returning()

  // Attribute referral if cookie present
  const refCode = req.cookies.get('atlas-ref')?.value
  if (refCode) {
    const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.referralCode, refCode)).limit(1)
    if (affiliate) {
      await db.insert(affiliateReferrals).values({
        affiliateId: affiliate.id,
        referredUserId: session.userId,
        companyId: company.id,
        commissionRate: '0.15',
        type: 'direct',
        status: 'pending',
      })
    }
  }

  return NextResponse.json(company, { status: 201 })
}
