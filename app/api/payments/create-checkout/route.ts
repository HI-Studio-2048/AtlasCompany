import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { stripe, getPrice } from '@/lib/stripe'

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

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: `${jurisdiction} Company Formation (${businessType.toUpperCase()})`,
            description: companyName ? `For: ${companyName}` : undefined,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.userId,
      jurisdiction,
      businessType,
      tier,
      companyName: companyName ?? '',
      ...metadata,
    },
    customer_email: session.email ?? undefined,
    success_url: `${appUrl}/dashboard?payment=success`,
    cancel_url: `${appUrl}/start?payment=cancelled`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
