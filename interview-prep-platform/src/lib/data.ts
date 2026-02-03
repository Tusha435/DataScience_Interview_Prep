// Load data from JSON file (for static site generation)
import questionsData from "@/../data/questions.json"

export interface Question {
  id: string
  title: string
  description: string
  company: string
  difficulty: "Easy" | "Medium" | "Hard"
  categories: string[]
  tags: string[]
  solution: {
    explanation: string
    code: string
    language: string
    timeComplexity: string
    spaceComplexity: string
  }
  author: string
  createdAt: string
}

export interface QuestionsData {
  questions: Question[]
  companies: string[]
  categories: string[]
}

// Get all questions
export function getAllQuestions(): Question[] {
  return questionsData.questions as Question[]
}

// Get question by ID
export function getQuestionById(id: string): Question | undefined {
  return (questionsData.questions as Question[]).find((q) => q.id === id)
}

// Get all companies
export function getCompanies(): string[] {
  return questionsData.companies
}

// Get all categories
export function getCategories(): string[] {
  return questionsData.categories
}

// Filter questions
export function filterQuestions(
  filters: {
    search?: string
    companies?: string[]
    difficulties?: ("Easy" | "Medium" | "Hard")[]
    categories?: string[]
    sortBy?: string
  },
  page: number = 1,
  perPage: number = 20
): { questions: Question[]; total: number } {
  let filtered = [...(questionsData.questions as Question[])]

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (q) =>
        q.title.toLowerCase().includes(searchLower) ||
        q.description.toLowerCase().includes(searchLower) ||
        q.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  }

  // Company filter
  if (filters.companies?.length) {
    filtered = filtered.filter((q) => filters.companies!.includes(q.company))
  }

  // Difficulty filter
  if (filters.difficulties?.length) {
    filtered = filtered.filter((q) => filters.difficulties!.includes(q.difficulty))
  }

  // Category filter
  if (filters.categories?.length) {
    filtered = filtered.filter((q) =>
      q.categories.some((c) => filters.categories!.includes(c))
    )
  }

  // Sorting
  switch (filters.sortBy) {
    case "difficulty_asc":
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 }
      filtered.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty])
      break
    case "difficulty_desc":
      const diffOrderDesc = { Easy: 3, Medium: 2, Hard: 1 }
      filtered.sort((a, b) => diffOrderDesc[a.difficulty] - diffOrderDesc[b.difficulty])
      break
    case "title":
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    default:
      // Sort by date (newest first)
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }

  const total = filtered.length
  const start = (page - 1) * perPage
  const paginatedQuestions = filtered.slice(start, start + perPage)

  return { questions: paginatedQuestions, total }
}

// Get related questions (same category or company)
export function getRelatedQuestions(questionId: string, limit: number = 4): Question[] {
  const question = getQuestionById(questionId)
  if (!question) return []

  return (questionsData.questions as Question[])
    .filter((q) => q.id !== questionId)
    .filter(
      (q) =>
        q.categories.some((c) => question.categories.includes(c)) ||
        q.company === question.company
    )
    .slice(0, limit)
}

// Get stats
export function getStats() {
  const questions = questionsData.questions as Question[]
  return {
    totalQuestions: questions.length,
    totalCompanies: questionsData.companies.length,
    totalCategories: questionsData.categories.length,
    byDifficulty: {
      Easy: questions.filter((q) => q.difficulty === "Easy").length,
      Medium: questions.filter((q) => q.difficulty === "Medium").length,
      Hard: questions.filter((q) => q.difficulty === "Hard").length,
    },
  }
}
