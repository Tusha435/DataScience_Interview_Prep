"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { QuestionList } from "@/components/questions/QuestionList"
import { QuestionFilters } from "@/components/questions/QuestionFilters"
import { SearchBar } from "@/components/questions/SearchBar"
import { useQuestions } from "@/hooks/useQuestions"
import { useBookmarks } from "@/hooks/useBookmarks"
import { SORT_OPTIONS } from "@/lib/constants"
import { Difficulty } from "@/types"

export default function QuestionsPage() {
  const {
    questions,
    pagination,
    isLoading,
    filters,
    setFilters,
    setPage,
    resetFilters,
    toggleBookmark,
  } = useQuestions()

  const { toggleBookmark: toggleBookmarkPersist } = useBookmarks()

  const handleBookmark = (id: string) => {
    toggleBookmark(id)
    toggleBookmarkPersist(id)
  }

  const handleCompaniesChange = (companies: string[]) => {
    setFilters({ companies })
  }

  const handleDifficultiesChange = (difficulties: Difficulty[]) => {
    setFilters({ difficulties })
  }

  const handleCategoriesChange = (categories: string[]) => {
    setFilters({ categories })
  }

  const handleSearchChange = (search: string) => {
    setFilters({ search })
  }

  const handleSortChange = (sortBy: string) => {
    setFilters({ sortBy: sortBy as typeof filters.sortBy })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Interview Questions</h1>
        <p className="text-muted-foreground">
          Browse and practice interview questions from top companies
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <QuestionFilters
              selectedCompanies={filters.companies}
              selectedDifficulties={filters.difficulties}
              selectedCategories={filters.categories}
              onCompaniesChange={handleCompaniesChange}
              onDifficultiesChange={handleDifficultiesChange}
              onCategoriesChange={handleCategoriesChange}
              onClearAll={resetFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchBar
              value={filters.search}
              onChange={handleSearchChange}
              className="flex-1"
            />

            <div className="flex gap-2">
              {/* Mobile Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <QuestionFilters
                      selectedCompanies={filters.companies}
                      selectedDifficulties={filters.difficulties}
                      selectedCategories={filters.categories}
                      onCompaniesChange={handleCompaniesChange}
                      onDifficultiesChange={handleDifficultiesChange}
                      onCategoriesChange={handleCategoriesChange}
                      onClearAll={resetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <Select
                value={filters.sortBy}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {questions.length} of {pagination.totalItems} questions
          </p>

          {/* Questions List */}
          <QuestionList
            questions={questions}
            isLoading={isLoading}
            onBookmark={handleBookmark}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }).map(
                  (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pagination.currentPage === pageNum
                            ? "default"
                            : "outline"
                        }
                        size="icon"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
                  }
                )}
                {pagination.totalPages > 5 && (
                  <>
                    <span className="px-2">...</span>
                    <Button
                      variant={
                        pagination.currentPage === pagination.totalPages
                          ? "default"
                          : "outline"
                      }
                      size="icon"
                      onClick={() => setPage(pagination.totalPages)}
                    >
                      {pagination.totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
