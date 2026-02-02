export const ITEMS_PER_PAGE = 20

export const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"] as const

export const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "views", label: "Most Viewed" },
  { value: "bookmarks", label: "Most Bookmarked" },
  { value: "difficulty_asc", label: "Easiest First" },
  { value: "difficulty_desc", label: "Hardest First" },
] as const

export const PROGRAMMING_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
] as const

export const NAV_LINKS = [
  { href: "/questions", label: "Questions" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/bookmarks", label: "Bookmarks" },
] as const

export const SITE_CONFIG = {
  name: "Interview Prep",
  description: "Prepare for technical interviews with real questions from top companies",
  url: "https://interview-prep.vercel.app",
} as const
