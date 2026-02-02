"use client"

import * as React from "react"
import { Question } from "@/types"
import { questions as allQuestions } from "@/lib/mockData"

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = React.useState<Question[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Load bookmarks from localStorage on mount
  React.useEffect(() => {
    const loadBookmarks = async () => {
      setIsLoading(true)
      try {
        const saved = localStorage.getItem("bookmarked_questions")
        if (saved) {
          const ids = new Set<string>(JSON.parse(saved))
          setBookmarkedIds(ids)

          // Get questions that match the bookmarked IDs
          const bookmarkedQuestions = allQuestions.filter((q) => ids.has(q.id))
          setBookmarks(bookmarkedQuestions.map((q) => ({ ...q, isBookmarked: true })))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadBookmarks()
  }, [])

  // Save to localStorage when bookmarks change
  React.useEffect(() => {
    localStorage.setItem(
      "bookmarked_questions",
      JSON.stringify(Array.from(bookmarkedIds))
    )
  }, [bookmarkedIds])

  const addBookmark = React.useCallback((questionId: string) => {
    setBookmarkedIds((prev) => new Set(Array.from(prev).concat(questionId)))
    const question = allQuestions.find((q) => q.id === questionId)
    if (question) {
      setBookmarks((prev) => [...prev, { ...question, isBookmarked: true }])
    }
  }, [])

  const removeBookmark = React.useCallback((questionId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      next.delete(questionId)
      return next
    })
    setBookmarks((prev) => prev.filter((q) => q.id !== questionId))
  }, [])

  const toggleBookmark = React.useCallback((questionId: string) => {
    if (bookmarkedIds.has(questionId)) {
      removeBookmark(questionId)
    } else {
      addBookmark(questionId)
    }
  }, [bookmarkedIds, addBookmark, removeBookmark])

  const isBookmarked = React.useCallback(
    (questionId: string) => bookmarkedIds.has(questionId),
    [bookmarkedIds]
  )

  return {
    bookmarks,
    isLoading,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    count: bookmarkedIds.size,
  }
}
