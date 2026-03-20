import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, companies } from '@/lib/schema'
import { eq, desc, count } from 'drizzle-orm'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Users with their company count
  const rows = await db
    .select({
      user: users,
      companyCount: count(companies.id),
    })
    .from(users)
    .leftJoin(companies, eq(companies.userId, users.id))
    .groupBy(users.id)
    .orderBy(desc(users.createdAt))

  return NextResponse.json(rows)
}
