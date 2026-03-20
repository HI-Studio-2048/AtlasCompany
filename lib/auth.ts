import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from './db'
import { users } from './schema'
import { eq } from 'drizzle-orm'

export interface SessionData {
  userId: string
  email?: string
  name?: string
  avatar?: string
  provider?: string
  isLoggedIn: boolean
}

// Lightweight auth check — used by every API route.
export async function getSession(): Promise<SessionData> {
  const { userId } = await auth()

  if (!userId) {
    return { userId: '', isLoggedIn: false }
  }

  return { userId, isLoggedIn: true }
}

// Check if the current Clerk user is in the ADMIN_USER_IDS env var
export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false
  const adminIds = (process.env.ADMIN_USER_IDS ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  return adminIds.includes(userId)
}

// Upsert the Clerk user into our own DB so FK references (companies.userId etc.)
// are always satisfied. Call this before any DB write that references a user row.
export async function syncUser(): Promise<void> {
  const { userId } = await auth()
  if (!userId) return

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (existing.length > 0) return

  const clerkUser = await currentUser()
  if (!clerkUser) return

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? undefined
  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
    undefined
  const provider = clerkUser.externalAccounts[0]?.provider ?? 'email'

  await db
    .insert(users)
    .values({ id: userId, email, name, avatar: clerkUser.imageUrl, provider })
    .onConflictDoNothing()
}
