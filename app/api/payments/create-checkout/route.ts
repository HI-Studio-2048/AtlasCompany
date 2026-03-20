import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createPaymentIntent, getPrice } from '@/lib/airwallex'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { jurisdiction, businessType, tier = 'basic', companyName, metadata = {} } = await req.json()

  if (!jurisdiction || !businessType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const amount = getPrice(jurisdiction, tier as 'basic' | 'pro')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const orderId = `atlas-${session.userId}-${Date.now()}`
  const descriptor = `${jurisdiction} Company Formation (${businessType.toUpperCase()})${companyName ? ` — ${companyName}` : ''}`

  const { intentId, clientSecret } = await createPaymentIntent({
    amount,
    currency: 'USD',
    orderId,
    descriptor,
    metadata: {
      userId: session.userId,
      jurisdiction,
      businessType,
      tier,
      companyName: companyName ?? '',
      ...metadata,
    },
  })

  // Airwallex hosted checkout URL
  const checkoutUrl = new URL('https://checkout.airwallex.com/checkout')
  checkoutUrl.searchParams.set('intent_id', intentId)
  checkoutUrl.searchParams.set('client_secret', clientSecret)
  checkoutUrl.searchParams.set('success_url', `${appUrl}/dashboard?payment=success`)
  checkoutUrl.searchParams.set('cancel_url', `${appUrl}/start?payment=cancelled`)

  return NextResponse.json({ url: checkoutUrl.toString(), intentId })
}
