"use client"

import * as React from "react"
import { Solution } from "@/types"
import { getSolutionsByQuestionId } from "@/lib/mockData"

export function useSolutions(questionId: string) {
  const [solutions, setSolutions] = React.useState<Solution[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchSolutions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const results = getSolutionsByQuestionId(questionId)
        setSolutions(results)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch solutions"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSolutions()
  }, [questionId])

  const upvoteSolution = React.useCallback((id: string) => {
    setSolutions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s
      )
    )
  }, [])

  const downvoteSolution = React.useCallback((id: string) => {
    setSolutions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, downvotes: s.downvotes + 1 } : s
      )
    )
  }, [])

  return {
    solutions,
    isLoading,
    error,
    upvoteSolution,
    downvoteSolution,
  }
}
