import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, getPaymentIntent } from '@/lib/airwallex'
import { db } from '@/lib/db'
import { companies, payments } from '@/lib/schema'
import { sendCompanyConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const timestamp = req.headers.get('x-timestamp') ?? ''
  const signature = req.headers.get('x-signature') ?? ''

  // Verify webhook signature
  const valid = await verifyWebhookSignature(body, timestamp, signature).catch(() => false)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body)

  // payment_intent.succeeded — payment fully captured
  if (event.name === 'payment_intent.succeeded') {
    const intent = event.data

    const { userId, jurisdiction, businessType, companyName } =
      (intent.metadata as Record<string, string>) ?? {}

    if (!userId || !jurisdiction || !businessType) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    // Fetch full intent to get customer email
    const fullIntent = await getPaymentIntent(intent.id).catch(() => intent)
    const customerEmail: string | undefined =
      fullIntent.customer_email ?? fullIntent.order?.customer?.email

    // Create company record
    const [company] = await db.insert(companies).values({
      userId,
      companyName: companyName ?? `${jurisdiction} ${businessType.toUpperCase()}`,
      jurisdiction,
      businessType,
      contactEmail: customerEmail ?? '',
      status: 'pending',
      progress: 5,
    }).returning()

    // Record payment
    await db.insert(payments).values({
      userId,
      companyId: company.id,
      airwallexIntentId: intent.id,
      airwallexPaymentId: intent.latest_payment_attempt?.id ?? null,
      amount: Math.round((intent.amount ?? 0) * 100), // store in cents to match schema
      currency: (intent.currency ?? 'usd').toLowerCase(),
      status: 'paid',
    })

    // Send confirmation email
    if (customerEmail) {
      await sendCompanyConfirmation({
        to: customerEmail,
        companyName: company.companyName,
        jurisdiction,
        businessType,
      }).catch(() => {}) // don't fail webhook on email error
    }
  }

  return NextResponse.json({ received: true })
}
