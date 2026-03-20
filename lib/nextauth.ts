import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: 'jwt' },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!account) return true
      const userId = `${account.provider}:${account.providerAccountId}`
      try {
        const existing = await db.select().from(users).where(eq(users.id, userId)).limit(1)
        if (existing.length === 0) {
          await db.insert(users).values({
            id: userId,
            email: user.email,
            name: user.name,
            avatar: user.image,
            provider: account.provider,
          })
        }
      } catch {}
      return true
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        token.userId = `${account.provider}:${account.providerAccountId}`
        token.provider = account.provider
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.userId as string
      session.user.provider = token.provider as string
      return session
    },
  },
}
