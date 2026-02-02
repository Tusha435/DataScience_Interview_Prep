"use client"

import { Question } from "@/types"
import { QuestionCard } from "./QuestionCard"
import { NoQuestionsFound } from "@/components/common/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"

interface QuestionListProps {
  questions: Question[]
  isLoading?: boolean
  onBookmark?: (id: string) => void
}

export function QuestionList({
  questions,
  isLoading,
  onBookmark,
}: QuestionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <QuestionCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (questions.length === 0) {
    return <NoQuestionsFound />
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  )
}

function QuestionCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
      <div className="border-t pt-4 flex justify-between">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}
