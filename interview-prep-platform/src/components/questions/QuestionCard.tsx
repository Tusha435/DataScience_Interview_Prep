"use client"

import Link from "next/link"
import { Bookmark, Eye, MessageSquare } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Question } from "@/types"
import { cn, formatRelativeTime, truncateText, formatNumber } from "@/lib/utils"

interface QuestionCardProps {
  question: Question
  onBookmark?: (id: string) => void
}

export function QuestionCard({ question, onBookmark }: QuestionCardProps) {
  const difficultyVariant =
    question.difficulty === "Easy"
      ? "easy"
      : question.difficulty === "Medium"
      ? "medium"
      : "hard"

  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary font-bold text-sm">
                {question.company.logo}
              </div>
              <span className="text-sm text-muted-foreground">
                {question.company.name}
              </span>
              <Badge variant={difficultyVariant}>{question.difficulty}</Badge>
            </div>

            <Link href={`/questions/${question.id}`} className="group">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {question.title}
              </h3>
            </Link>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {truncateText(question.description, 150)}
            </p>

            <div className="flex flex-wrap gap-2">
              {question.categories.slice(0, 3).map((category) => (
                <Badge key={category.id} variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              ))}
              {question.categories.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{question.categories.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0",
              question.isBookmarked && "text-primary"
            )}
            onClick={(e) => {
              e.preventDefault()
              onBookmark?.(question.id)
            }}
          >
            <Bookmark
              className={cn("h-5 w-5", question.isBookmarked && "fill-current")}
            />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t bg-muted/30">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(question.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{question.solutionCount} solutions</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {question.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">
              {formatRelativeTime(question.createdAt)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
