import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/schema'
import { sendContactConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, inquiryType, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
  }

  const [submission] = await db.insert(contactSubmissions).values({
    name,
    email,
    company: company || null,
    inquiryType: inquiryType || null,
    message,
  }).returning()

  // Send confirmation email (non-blocking)
  sendContactConfirmation({ to: email, name, inquiryType: inquiryType ?? undefined }).catch(() => {})

  return NextResponse.json(submission, { status: 201 })
}
