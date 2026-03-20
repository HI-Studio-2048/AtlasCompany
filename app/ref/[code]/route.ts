import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://atlas.co'

  // Validate referral code format (same as middleware)
  const isValid = /^[A-Z0-9-]{5,20}$/.test(code)

  const destination = new URL('/', appUrl)
  const res = NextResponse.redirect(destination)

  if (isValid) {
    res.cookies.set('atlas-ref', code, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: '/',
    })
  }

  return res
}
