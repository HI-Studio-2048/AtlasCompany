import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

// Pricing in cents per jurisdiction + tier
// Matches the pricing page tiers
export const PRICES: Record<string, { basic: number; pro: number }> = {
  'United States':          { basic: 29900,  pro: 49900  },
  'Singapore':              { basic: 49900,  pro: 79900  },
  'Hong Kong':              { basic: 49900,  pro: 79900  },
  'United Kingdom':         { basic: 39900,  pro: 64900  },
  'Cayman Islands':         { basic: 149900, pro: 199900 },
  'British Virgin Islands': { basic: 149900, pro: 199900 },
  'UAE':                    { basic: 99900,  pro: 149900 },
  'Germany':                { basic: 59900,  pro: 99900  },
  'Netherlands':            { basic: 59900,  pro: 99900  },
  'Malaysia':               { basic: 39900,  pro: 64900  },
  'Japan':                  { basic: 79900,  pro: 124900 },
  'Australia':              { basic: 49900,  pro: 79900  },
}

export function getPrice(jurisdiction: string, tier: 'basic' | 'pro'): number {
  return PRICES[jurisdiction]?.[tier] ?? PRICES['United States'][tier]
}
