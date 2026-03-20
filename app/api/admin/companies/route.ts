import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { companies, users } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const rows = await db
    .select({ company: companies, user: users })
    .from(companies)
    .leftJoin(users, eq(companies.userId, users.id))
    .orderBy(desc(companies.createdAt))

  return NextResponse.json(rows)
}
