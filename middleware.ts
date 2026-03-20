import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const PROTECTED_ROUTES = ['/dashboard', '/affiliates/portal', '/settings']
const AUTH_ROUTES = ['/login']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Detect country via Vercel geo headers
  const country =
    req.geo?.country ??
    req.headers.get('x-vercel-ip-country') ??
    'US'
  const isChinaUser = country === 'CN'

  const res = NextResponse.next()
  res.headers.set('x-user-country', country)
  res.headers.set('x-china-user', String(isChinaUser))

  // Referral tracking: persist ?ref=CODE in a 90-day cookie
  const refCode = req.nextUrl.searchParams.get('ref')
  if (refCode && /^[A-Z0-9-]{5,20}$/.test(refCode)) {
    res.cookies.set('atlas-ref', refCode, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
    })
  }

  // Auth guard using NextAuth JWT
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isLoggedIn = !!token

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r))

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
