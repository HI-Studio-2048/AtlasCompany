import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { companies } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { status, progress, registrationNumber } = await req.json()

  const allowed = ['pending', 'active', 'complete']
  if (status && !allowed.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }
  if (progress !== undefined && (progress < 0 || progress > 100)) {
    return NextResponse.json({ error: 'Progress must be 0–100' }, { status: 400 })
  }

  const updates: Record<string, unknown> = { updatedAt: new Date() }
  if (status !== undefined) updates.status = status
  if (progress !== undefined) updates.progress = progress
  if (registrationNumber !== undefined) updates.registrationNumber = registrationNumber

  const [updated] = await db
    .update(companies)
    .set(updates)
    .where(eq(companies.id, params.id))
    .returning()

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(updated)
}
