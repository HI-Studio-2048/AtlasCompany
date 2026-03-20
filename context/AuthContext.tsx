'use client'

import { createContext, useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'

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
  const { data: session, status } = useSession()

  const user = session?.user?.id
    ? {
        userId: session.user.id,
        email: session.user.email ?? undefined,
        name: session.user.name ?? undefined,
        avatar: session.user.image ?? undefined,
        provider: session.user.provider ?? undefined,
      }
    : null

  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status === 'loading',
        isLoggedIn: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
