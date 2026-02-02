"use client"

import * as React from "react"
import { X, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { companies, categories } from "@/lib/mockData"
import { DIFFICULTY_OPTIONS } from "@/lib/constants"
import { Difficulty } from "@/types"
import { cn } from "@/lib/utils"

interface QuestionFiltersProps {
  selectedCompanies: string[]
  selectedDifficulties: Difficulty[]
  selectedCategories: string[]
  onCompaniesChange: (companies: string[]) => void
  onDifficultiesChange: (difficulties: Difficulty[]) => void
  onCategoriesChange: (categories: string[]) => void
  onClearAll: () => void
  className?: string
}

export function QuestionFilters({
  selectedCompanies,
  selectedDifficulties,
  selectedCategories,
  onCompaniesChange,
  onDifficultiesChange,
  onCategoriesChange,
  onClearAll,
  className,
}: QuestionFiltersProps) {
  const hasFilters =
    selectedCompanies.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedCategories.length > 0

  const handleCompanyToggle = (companyId: string) => {
    if (selectedCompanies.includes(companyId)) {
      onCompaniesChange(selectedCompanies.filter((id) => id !== companyId))
    } else {
      onCompaniesChange([...selectedCompanies, companyId])
    }
  }

  const handleDifficultyToggle = (difficulty: Difficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      onDifficultiesChange(
        selectedDifficulties.filter((d) => d !== difficulty)
      )
    } else {
      onDifficultiesChange([...selectedDifficulties, difficulty])
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter((id) => id !== categoryId))
    } else {
      onCategoriesChange([...selectedCategories, categoryId])
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedDifficulties.map((difficulty) => (
            <Badge key={difficulty} variant="secondary" className="gap-1">
              {difficulty}
              <button
                onClick={() => handleDifficultyToggle(difficulty)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedCompanies.map((companyId) => {
            const company = companies.find((c) => c.id === companyId)
            return (
              <Badge key={companyId} variant="secondary" className="gap-1">
                {company?.name}
                <button
                  onClick={() => handleCompanyToggle(companyId)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
          {selectedCategories.map((categoryId) => {
            const category = categories.find((c) => c.id === categoryId)
            return (
              <Badge key={categoryId} variant="secondary" className="gap-1">
                {category?.name}
                <button
                  onClick={() => handleCategoryToggle(categoryId)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
        </div>
      )}

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-sm">Difficulty</h4>
        <div className="space-y-3">
          {DIFFICULTY_OPTIONS.map((difficulty) => (
            <div key={difficulty} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${difficulty}`}
                checked={selectedDifficulties.includes(difficulty as Difficulty)}
                onCheckedChange={() =>
                  handleDifficultyToggle(difficulty as Difficulty)
                }
              />
              <Label
                htmlFor={`difficulty-${difficulty}`}
                className="text-sm font-normal cursor-pointer"
              >
                <Badge
                  variant={
                    difficulty === "Easy"
                      ? "easy"
                      : difficulty === "Medium"
                      ? "medium"
                      : "hard"
                  }
                >
                  {difficulty}
                </Badge>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-sm">Company</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {companies.slice(0, 10).map((company) => (
            <div key={company.id} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${company.id}`}
                checked={selectedCompanies.includes(company.id)}
                onCheckedChange={() => handleCompanyToggle(company.id)}
              />
              <Label
                htmlFor={`company-${company.id}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {company.name}
              </Label>
              <span className="text-xs text-muted-foreground">
                {company.questionCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-sm">Category</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {category.name}
              </Label>
              <span className="text-xs text-muted-foreground">
                {category.questionCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
