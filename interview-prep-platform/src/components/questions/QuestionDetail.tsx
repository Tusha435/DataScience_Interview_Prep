"use client"

import * as React from "react"
import Link from "next/link"
import { Bookmark, Share2, Eye, MessageSquare, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Question } from "@/types"
import { cn, formatDate, formatNumber } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface QuestionDetailProps {
  question: Question
  onBookmark?: (id: string) => void
}

export function QuestionDetail({ question, onBookmark }: QuestionDetailProps) {
  const { toast } = useToast()
  const [isBookmarked, setIsBookmarked] = React.useState(
    question.isBookmarked || false
  )

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(question.id)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Question bookmarked",
      description: isBookmarked
        ? "This question has been removed from your bookmarks."
        : "This question has been added to your bookmarks.",
    })
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "The question link has been copied to your clipboard.",
      })
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      })
    }
  }

  const difficultyVariant =
    question.difficulty === "Easy"
      ? "easy"
      : question.difficulty === "Medium"
      ? "medium"
      : "hard"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/questions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
                {question.company.logo}
              </div>
              <span className="text-muted-foreground">
                {question.company.name}
              </span>
              <Badge variant={difficultyVariant}>{question.difficulty}</Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold">{question.title}</h1>

            <div className="flex flex-wrap gap-2">
              {question.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="shrink-0"
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="icon"
              onClick={handleBookmark}
              className="shrink-0"
            >
              <Bookmark
                className={cn("h-4 w-4", isBookmarked && "fill-current")}
              />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{formatNumber(question.viewCount)} views</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{question.solutionCount} solutions</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark className="h-4 w-4" />
            <span>{formatNumber(question.bookmarkCount)} bookmarks</span>
          </div>
        </div>

        <Separator />

        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
          <p className="text-foreground whitespace-pre-wrap">
            {question.description}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{question.author.name}</p>
            <p className="text-muted-foreground">
              Posted on {formatDate(question.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
