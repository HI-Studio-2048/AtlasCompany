import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { companies, payments } from '@/lib/schema'
import { sendCompanyConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { userId, jurisdiction, businessType, companyName } = session.metadata ?? {}

    if (!userId || !jurisdiction || !businessType) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    // Create company record
    const [company] = await db.insert(companies).values({
      userId,
      companyName: companyName ?? `${jurisdiction} ${businessType.toUpperCase()}`,
      jurisdiction,
      businessType,
      contactEmail: session.customer_email ?? '',
      status: 'pending',
      progress: 5,
    }).returning()

    // Record payment
    await db.insert(payments).values({
      userId,
      companyId: company.id,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string ?? null,
      amount: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
      status: 'paid',
    })

    // Send confirmation email
    if (session.customer_email) {
      await sendCompanyConfirmation({
        to: session.customer_email,
        companyName: company.companyName,
        jurisdiction,
        businessType,
      }).catch(() => {}) // don't fail the webhook on email error
    }
  }

  return NextResponse.json({ received: true })
}
