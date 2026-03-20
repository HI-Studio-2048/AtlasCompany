import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { affiliates, influencerLinks, influencerDiscountCodes } from '@/lib/schema'
import { eq } from 'drizzle-orm'

// GET — fetch linked social accounts + discount code for the logged-in affiliate
export async function GET() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [affiliate] = await db
    .select()
    .from(affiliates)
    .where(eq(affiliates.userId, session.userId))
    .limit(1)

  if (!affiliate) {
    return NextResponse.json({ error: 'Not an affiliate' }, { status: 403 })
  }

  const links = await db
    .select()
    .from(influencerLinks)
    .where(eq(influencerLinks.affiliateId, affiliate.id))

  const [discountCode] = await db
    .select()
    .from(influencerDiscountCodes)
    .where(eq(influencerDiscountCodes.affiliateId, affiliate.id))
    .limit(1)

  // Auto-create a default discount code if none exists yet
  let code = discountCode
  if (!code) {
    const defaultCode = affiliate.referralCode.replace('ATLAS-', '').replace('-', '') + '10'
    const [created] = await db
      .insert(influencerDiscountCodes)
      .values({ affiliateId: affiliate.id, code: defaultCode })
      .returning()
    code = created
  }

  return NextResponse.json({ links, discountCode: code })
}

// POST — link a new social account
export async function POST(req: Request) {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [affiliate] = await db
    .select()
    .from(affiliates)
    .where(eq(affiliates.userId, session.userId))
    .limit(1)

  if (!affiliate) {
    return NextResponse.json({ error: 'Not an affiliate' }, { status: 403 })
  }

  const body = await req.json()
  const { platform, handle, url, followersCount } = body

  if (!platform || !handle) {
    return NextResponse.json({ error: 'platform and handle are required' }, { status: 400 })
  }

  const [link] = await db
    .insert(influencerLinks)
    .values({ affiliateId: affiliate.id, platform, handle, url, followersCount })
    .returning()

  return NextResponse.json({ link })
}
