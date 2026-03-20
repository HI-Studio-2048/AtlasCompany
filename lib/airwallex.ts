// ─── Airwallex API Client ─────────────────────────────────────────────────────
// Uses Airwallex REST API directly — no SDK required.
// All functions are async and lazy — no module-level instantiation that
// would crash Next.js during static page collection at build time.

const BASE_URL = process.env.AIRWALLEX_ENV === 'demo'
  ? 'https://api-demo.airwallex.com'
  : 'https://api.airwallex.com'

// Get a short-lived bearer token (valid 30 min)
async function getToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'x-client-id': process.env.AIRWALLEX_CLIENT_ID!,
      'x-api-key': process.env.AIRWALLEX_API_KEY!,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airwallex auth failed: ${text}`)
  }
  const data = await res.json()
  return data.token as string
}

// Create a payment intent and return id + client_secret
export async function createPaymentIntent({
  amount,
  currency = 'USD',
  orderId,
  descriptor,
  metadata,
}: {
  amount: number          // in major units (e.g. 299.00 for $299)
  currency?: string
  orderId: string         // your unique order ID
  descriptor?: string     // shown on bank statement
  metadata?: Record<string, string>
}): Promise<{ intentId: string; clientSecret: string }> {
  const token = await getToken()

  const res = await fetch(`${BASE_URL}/api/v1/pa/payment_intents/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-idempotency-key': orderId,
    },
    body: JSON.stringify({
      request_id: orderId,
      amount,
      currency,
      merchant_order_id: orderId,
      order: {
        products: descriptor ? [{ name: descriptor, quantity: 1, unit_price: amount, desc: descriptor }] : undefined,
      },
      metadata,
      capture_method: 'AUTOMATIC',
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airwallex create intent failed: ${text}`)
  }

  const data = await res.json()
  return { intentId: data.id as string, clientSecret: data.client_secret as string }
}

// Retrieve a payment intent by ID (used in webhook verification fallback)
export async function getPaymentIntent(intentId: string) {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}/api/v1/pa/payment_intents/${intentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Airwallex get intent failed`)
  return res.json()
}

// Verify Airwallex webhook signature
// Airwallex signs with HMAC-SHA256: timestamp + "." + body
export async function verifyWebhookSignature(
  rawBody: string,
  timestamp: string,
  signature: string,
): Promise<boolean> {
  const secret = process.env.AIRWALLEX_WEBHOOK_SECRET!
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const data = encoder.encode(`${timestamp}.${rawBody}`)
  const signed = await crypto.subtle.sign('HMAC', key, data)
  const expected = Buffer.from(signed).toString('hex')
  return expected === signature
}

// ─── Pricing Table ────────────────────────────────────────────────────────────
// Prices in major USD units (not cents — Airwallex uses major units)
export const PRICES: Record<string, { basic: number; pro: number }> = {
  'United States':          { basic: 299,   pro: 499   },
  'Singapore':              { basic: 499,   pro: 799   },
  'Hong Kong':              { basic: 499,   pro: 799   },
  'United Kingdom':         { basic: 399,   pro: 649   },
  'Cayman Islands':         { basic: 1499,  pro: 1999  },
  'British Virgin Islands': { basic: 1499,  pro: 1999  },
  'UAE':                    { basic: 999,   pro: 1499  },
  'Germany':                { basic: 599,   pro: 999   },
  'Netherlands':            { basic: 599,   pro: 999   },
  'Malaysia':               { basic: 399,   pro: 649   },
  'Japan':                  { basic: 799,   pro: 1249  },
  'Australia':              { basic: 499,   pro: 799   },
}

export function getPrice(jurisdiction: string, tier: 'basic' | 'pro'): number {
  return PRICES[jurisdiction]?.[tier] ?? PRICES['United States'][tier]
}
