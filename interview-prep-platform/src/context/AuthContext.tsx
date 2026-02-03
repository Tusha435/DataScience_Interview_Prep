"use client"

import * as React from "react"
import { User } from "@/types"

// Static visitor user
const VISITOR: User = {
  id: "visitor",
  name: "Visitor",
  avatar_url: null,
}

interface AuthContextType {
  user: User
  visitorCount: number
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [visitorCount, setVisitorCount] = React.useState(0)

  React.useEffect(() => {
    // Get visitor count from localStorage or initialize
    const storedCount = localStorage.getItem("visitor_count")
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0

    // Check if this session already counted
    const sessionCounted = sessionStorage.getItem("session_counted")

    if (!sessionCounted) {
      const newCount = currentCount + 1
      localStorage.setItem("visitor_count", String(newCount))
      sessionStorage.setItem("session_counted", "true")
      setVisitorCount(newCount)
    } else {
      setVisitorCount(currentCount)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user: VISITOR, visitorCount }}>
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
