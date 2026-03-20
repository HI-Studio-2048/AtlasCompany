import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { affiliates, affiliatePayoutRequests } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
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

  const { amount, method, accountDetails } = await req.json()

  if (!amount || !method || !accountDetails) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [request] = await db.insert(affiliatePayoutRequests).values({
    affiliateId: affiliate.id,
    amount: String(amount),
    method,
    accountDetails,
    status: 'pending',
  }).returning()

  return NextResponse.json(request, { status: 201 })
}
