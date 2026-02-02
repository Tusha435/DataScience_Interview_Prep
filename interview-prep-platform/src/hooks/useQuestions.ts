"use client"

import * as React from "react"
import { Question, FilterOptions, PaginationInfo, Difficulty } from "@/types"
import { filterQuestions, getQuestionById, getRelatedQuestions } from "@/lib/mockData"
import { ITEMS_PER_PAGE } from "@/lib/constants"

interface UseQuestionsOptions {
  initialPage?: number
  perPage?: number
}

interface UseQuestionsReturn {
  questions: Question[]
  pagination: PaginationInfo
  isLoading: boolean
  error: Error | null
  filters: FilterOptions
  setFilters: (filters: Partial<FilterOptions>) => void
  setPage: (page: number) => void
  resetFilters: () => void
  toggleBookmark: (id: string) => void
}

const defaultFilters: FilterOptions = {
  companies: [],
  difficulties: [],
  categories: [],
  sortBy: "recent",
  search: "",
}

export function useQuestions(options: UseQuestionsOptions = {}): UseQuestionsReturn {
  const { initialPage = 1, perPage = ITEMS_PER_PAGE } = options

  const [questions, setQuestions] = React.useState<Question[]>([])
  const [pagination, setPagination] = React.useState<PaginationInfo>({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: perPage,
  })
  const [filters, setFiltersState] = React.useState<FilterOptions>(defaultFilters)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const fetchQuestions = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const result = filterQuestions(
        {
          search: filters.search,
          companies: filters.companies,
          difficulties: filters.difficulties,
          categories: filters.categories,
          sortBy: filters.sortBy,
        },
        pagination.currentPage,
        perPage
      )

      setQuestions(result.questions)
      setPagination((prev) => ({
        ...prev,
        totalItems: result.total,
        totalPages: Math.ceil(result.total / perPage),
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch questions"))
    } finally {
      setIsLoading(false)
    }
  }, [filters, pagination.currentPage, perPage])

  React.useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const setFilters = React.useCallback((newFilters: Partial<FilterOptions>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }, [])

  const setPage = React.useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }, [])

  const resetFilters = React.useCallback(() => {
    setFiltersState(defaultFilters)
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }, [])

  const toggleBookmark = React.useCallback((id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
      )
    )
  }, [])

  return {
    questions,
    pagination,
    isLoading,
    error,
    filters,
    setFilters,
    setPage,
    resetFilters,
    toggleBookmark,
  }
}

export function useQuestion(id: string) {
  const [question, setQuestion] = React.useState<Question | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true)
      setError(null)

      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const found = getQuestionById(id)
        if (!found) {
          throw new Error("Question not found")
        }
        setQuestion(found)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch question"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestion()
  }, [id])

  return { question, isLoading, error }
}

export function useRelatedQuestions(questionId: string, limit: number = 4) {
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const related = getRelatedQuestions(questionId, limit)
        setQuestions(related)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelated()
  }, [questionId, limit])

  return { questions, isLoading }
}
