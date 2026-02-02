"use client"

import { Solution } from "@/types"
import { SolutionCard } from "./SolutionCard"
import { EmptyState } from "@/components/common/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare } from "lucide-react"

interface SolutionListProps {
  solutions: Solution[]
  isLoading?: boolean
  onUpvote?: (id: string) => void
  onDownvote?: (id: string) => void
}

export function SolutionList({
  solutions,
  isLoading,
  onUpvote,
  onDownvote,
}: SolutionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <SolutionCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (solutions.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No solutions yet"
        description="Be the first to share your solution for this problem."
      />
    )
  }

  return (
    <div className="space-y-6">
      {solutions.map((solution) => (
        <SolutionCard
          key={solution.id}
          solution={solution}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
      ))}
    </div>
  )
}

function SolutionCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  )
}
