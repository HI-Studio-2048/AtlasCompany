import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { affiliates, affiliateReferrals, affiliatePayoutRequests } from '@/lib/schema'
import { eq, sum, count, and } from 'drizzle-orm'

export async function GET() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Find affiliate record for this user
  const [affiliate] = await db
    .select()
    .from(affiliates)
    .where(eq(affiliates.userId, session.userId))
    .limit(1)

  if (!affiliate) {
    return NextResponse.json({ isAffiliate: false })
  }

  // Aggregate stats
  const [directStats] = await db
    .select({
      totalCommission: sum(affiliateReferrals.commissionAmount),
      totalReferrals: count(affiliateReferrals.id),
    })
    .from(affiliateReferrals)
    .where(and(eq(affiliateReferrals.affiliateId, affiliate.id), eq(affiliateReferrals.type, 'direct')))

  const [teamStats] = await db
    .select({ teamBonus: sum(affiliateReferrals.commissionAmount) })
    .from(affiliateReferrals)
    .where(and(eq(affiliateReferrals.affiliateId, affiliate.id), eq(affiliateReferrals.type, 'team')))

  const [pendingPayout] = await db
    .select({ pending: sum(affiliateReferrals.commissionAmount) })
    .from(affiliateReferrals)
    .where(and(eq(affiliateReferrals.affiliateId, affiliate.id), eq(affiliateReferrals.status, 'pending')))

  // Team members (other affiliates with parentAffiliateId = this affiliate's id)
  const teamMembers = await db
    .select()
    .from(affiliates)
    .where(eq(affiliates.parentAffiliateId, affiliate.id))

  // Recent transactions
  const transactions = await db
    .select()
    .from(affiliateReferrals)
    .where(eq(affiliateReferrals.affiliateId, affiliate.id))
    .orderBy(affiliateReferrals.createdAt)
    .limit(20)

  // Payout history
  const payouts = await db
    .select()
    .from(affiliatePayoutRequests)
    .where(eq(affiliatePayoutRequests.affiliateId, affiliate.id))
    .orderBy(affiliatePayoutRequests.createdAt)

  return NextResponse.json({
    isAffiliate: true,
    affiliate,
    stats: {
      totalEarned: Number(directStats.totalCommission ?? 0) + Number(teamStats.teamBonus ?? 0),
      pendingPayout: Number(pendingPayout.pending ?? 0),
      totalReferrals: Number(directStats.totalReferrals ?? 0),
      teamSize: teamMembers.length,
      teamBonus: Number(teamStats.teamBonus ?? 0),
    },
    transactions,
    teamMembers,
    payouts,
    refLink: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://atlas.co'}/ref/${affiliate.referralCode}`,
  })
}
