import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { affiliates, influencerDiscountCodes } from '@/lib/schema'
import { eq } from 'drizzle-orm'

// PATCH — update the custom discount code string
export async function PATCH(req: Request) {
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

  const { code } = await req.json()
  const cleaned = (code as string).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20)
  if (!cleaned) return NextResponse.json({ error: 'Invalid code' }, { status: 400 })

  // Check uniqueness
  const [existing] = await db
    .select()
    .from(influencerDiscountCodes)
    .where(eq(influencerDiscountCodes.code, cleaned))
    .limit(1)

  if (existing && existing.affiliateId !== affiliate.id) {
    return NextResponse.json({ error: 'Code already taken' }, { status: 409 })
  }

  const [updated] = await db
    .update(influencerDiscountCodes)
    .set({ code: cleaned, updatedAt: new Date() })
    .where(eq(influencerDiscountCodes.affiliateId, affiliate.id))
    .returning()

  return NextResponse.json({ discountCode: updated })
}
