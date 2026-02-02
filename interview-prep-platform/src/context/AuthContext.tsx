"use client"

import * as React from "react"
import { User } from "@/types"

// Mock user for demo purposes
const MOCK_USER: User = {
  id: "1",
  email: "demo@example.com",
  full_name: "Demo User",
  avatar_url: null,
  bio: "A passionate developer preparing for interviews.",
  created_at: new Date().toISOString(),
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Check for existing session on mount
  React.useEffect(() => {
    const checkSession = async () => {
      // In a real app, check Supabase session here
      // For demo, check localStorage
      const savedUser = localStorage.getItem("demo_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, use Supabase auth
      // For demo, simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const demoUser = { ...MOCK_USER, email }
      setUser(demoUser)
      localStorage.setItem("demo_user", JSON.stringify(demoUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true)
    try {
      // In a real app, use Supabase auth
      // For demo, simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        ...MOCK_USER,
        email,
        full_name: fullName,
      }
      setUser(newUser)
      localStorage.setItem("demo_user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      // In a real app, use Supabase auth
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUser(null)
      localStorage.removeItem("demo_user")
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      // In a real app, use Supabase OAuth
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(MOCK_USER)
      localStorage.setItem("demo_user", JSON.stringify(MOCK_USER))
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGithub = async () => {
    setIsLoading(true)
    try {
      // In a real app, use Supabase OAuth
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(MOCK_USER)
      localStorage.setItem("demo_user", JSON.stringify(MOCK_USER))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
