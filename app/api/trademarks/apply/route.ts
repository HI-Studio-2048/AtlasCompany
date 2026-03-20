import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { trademarkApplications } from '@/lib/schema'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { brandName, niceClasses, countries, email } = body

  if (!brandName || !email) {
    return NextResponse.json({ error: 'Brand name and email are required' }, { status: 400 })
  }

  // Attach to user if logged in
  const session = await getSession()
  const userId = session.isLoggedIn ? session.userId : null

  const [application] = await db.insert(trademarkApplications).values({
    userId,
    brandName,
    niceClasses: Array.isArray(niceClasses) ? niceClasses.join(',') : niceClasses,
    countries: Array.isArray(countries) ? countries.join(',') : countries,
    email,
    status: 'pending',
  }).returning()

  return NextResponse.json(application, { status: 201 })
}
