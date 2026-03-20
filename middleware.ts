import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/affiliates/portal(.*)',
  '/settings(.*)',
  '/admin(.*)',
])

const isAuthRoute = createRouteMatcher(['/login(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const { pathname } = req.nextUrl

  // ── Route protection ──────────────────────────────────────────────────────
  if (isProtectedRoute(req) && !userId) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute(req) && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Admin-only guard — checked via env var, no DB query needed in middleware
  if (pathname.startsWith('/admin') && userId) {
    const adminIds = (process.env.ADMIN_USER_IDS ?? '')
      .split(',').map(s => s.trim()).filter(Boolean)
    if (!adminIds.includes(userId)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // ── New-user onboarding redirect ───────────────────────────────────────────
  // Once the user submits their first company, POST /api/companies sets the
  // atlas-onboarded cookie which stops this redirect permanently.
  if (userId && !req.cookies.has('atlas-onboarded') && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/start', req.url))
  }

  // ── Pass-through: add geo + referral helpers ───────────────────────────────
  const country =
    req.geo?.country ??
    req.headers.get('x-vercel-ip-country') ??
    'US'
  const isChinaUser = country === 'CN'

  const res = NextResponse.next()
  res.headers.set('x-user-country', country)
  res.headers.set('x-china-user', String(isChinaUser))

  // Persist ?ref=CODE as a 90-day cookie for affiliate attribution
  const refCode = req.nextUrl.searchParams.get('ref')
  if (refCode && /^[A-Z0-9-]{5,20}$/.test(refCode)) {
    res.cookies.set('atlas-ref', refCode, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
    })
  }

  return res
})

export const config = {
  matcher: [
    // All routes except Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
