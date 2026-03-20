import { getServerSession } from 'next-auth'
import { authOptions } from './nextauth'

export interface SessionData {
  userId: string
  email?: string
  name?: string
  avatar?: string
  provider?: string
  isLoggedIn: boolean
}

// Drop-in replacement for the old iron-session getSession().
// All existing API routes call this and check session.isLoggedIn / session.userId.
export async function getSession(): Promise<SessionData> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { userId: '', isLoggedIn: false }
  }

  return {
    userId: session.user.id,
    email: session.user.email ?? undefined,
    name: session.user.name ?? undefined,
    avatar: session.user.image ?? undefined,
    provider: session.user.provider ?? undefined,
    isLoggedIn: true,
  }
}
