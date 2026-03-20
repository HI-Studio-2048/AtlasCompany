'use client'

import { createContext, useContext } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'

interface AuthContextType {
  user: {
    userId: string
    email?: string
    name?: string
    avatar?: string
    provider?: string
  } | null
  isLoading: boolean
  isLoggedIn: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk()

  const user =
    clerkUser && isSignedIn
      ? {
          userId: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress ?? undefined,
          name: clerkUser.fullName ?? undefined,
          avatar: clerkUser.imageUrl,
          provider: clerkUser.externalAccounts[0]?.provider ?? undefined,
        }
      : null

  const logout = async () => {
    await signOut({ redirectUrl: '/' })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: !isLoaded,
        isLoggedIn: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
