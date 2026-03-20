import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { affiliates, influencerLinks } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

// DELETE — unlink a social account by id (passed in body)
export async function DELETE(req: Request) {
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

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await db
    .delete(influencerLinks)
    .where(and(eq(influencerLinks.id, id), eq(influencerLinks.affiliateId, affiliate.id)))

  return NextResponse.json({ ok: true })
}
