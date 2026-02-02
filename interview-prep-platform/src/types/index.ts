export type Difficulty = "Easy" | "Medium" | "Hard"

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export interface Company {
  id: string
  name: string
  logo: string
  description: string
  questionCount: number
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  questionCount: number
}

export interface Tag {
  id: string
  name: string
}

export interface Author {
  id: string
  name: string
  avatar: string
}

export interface Question {
  id: string
  title: string
  description: string
  company: Company
  difficulty: Difficulty
  categories: Category[]
  tags: string[]
  viewCount: number
  solutionCount: number
  bookmarkCount: number
  isBookmarked?: boolean
  createdAt: string
  author: Author
}

export interface Solution {
  id: string
  questionId: string
  title: string
  explanation: string
  code: string
  language: string
  timeComplexity: string
  spaceComplexity: string
  upvotes: number
  downvotes: number
  createdAt: string
  author: Author
}

export interface Bookmark {
  id: string
  userId: string
  questionId: string
  createdAt: string
  question?: Question
}

export interface Activity {
  id: string
  type: "question" | "solution" | "bookmark" | "upvote"
  title: string
  description: string
  createdAt: string
  link?: string
}

export interface Stats {
  questionsSolved: number
  solutionsContributed: number
  bookmarks: number
  totalViews: number
}

export interface FilterOptions {
  companies: string[]
  difficulties: Difficulty[]
  categories: string[]
  sortBy: "recent" | "views" | "bookmarks" | "difficulty_asc" | "difficulty_desc"
  search: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}
