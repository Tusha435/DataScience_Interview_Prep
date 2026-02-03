"use client"

import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QuestionDetail } from "@/components/questions/QuestionDetail"
import { SolutionList } from "@/components/solutions/SolutionList"
import { AddSolutionForm } from "@/components/solutions/AddSolutionForm"
import { LoadingPage } from "@/components/common/Loading"
import { ErrorFallback } from "@/components/common/ErrorBoundary"
import { useQuestion, useRelatedQuestions } from "@/hooks/useQuestions"
import { useSolutions } from "@/hooks/useSolutions"
import { useBookmarks } from "@/hooks/useBookmarks"

interface QuestionPageClientProps {
  id: string
}

export function QuestionPageClient({ id }: QuestionPageClientProps) {
  const { question, isLoading: questionLoading, error } = useQuestion(id)
  const { solutions, isLoading: solutionsLoading, upvoteSolution, downvoteSolution } = useSolutions(id)
  const { questions: relatedQuestions, isLoading: relatedLoading } = useRelatedQuestions(id)
  const { toggleBookmark } = useBookmarks()

  if (questionLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorFallback error={error} />
  }

  if (!question) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Question Detail */}
      <QuestionDetail question={question} onBookmark={toggleBookmark} />

      <Separator />

      {/* Solutions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Solutions ({solutions.length})
          </h2>
          <AddSolutionForm questionId={question.id} />
        </div>

        <SolutionList
          solutions={solutions}
          isLoading={solutionsLoading}
          onUpvote={upvoteSolution}
          onDownvote={downvoteSolution}
        />
      </div>

      <Separator />

      {/* Related Questions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Related Questions</h2>

        {relatedLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : relatedQuestions.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedQuestions.map((q) => (
              <Link key={q.id} href={`/questions/${q.id}`}>
                <Card className="card-hover h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          q.difficulty === "Easy"
                            ? "easy"
                            : q.difficulty === "Medium"
                            ? "medium"
                            : "hard"
                        }
                      >
                        {q.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {q.company.name}
                      </span>
                    </div>
                    <h3 className="font-medium line-clamp-2">{q.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No related questions found.</p>
        )}
      </div>
    </div>
  )
}
