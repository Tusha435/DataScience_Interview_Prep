"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown, Clock, Database } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Solution } from "@/types"
import { formatRelativeTime, cn } from "@/lib/utils"
import { CodeBlock } from "./CodeBlock"

interface SolutionCardProps {
  solution: Solution
  onUpvote?: (id: string) => void
  onDownvote?: (id: string) => void
}

export function SolutionCard({
  solution,
  onUpvote,
  onDownvote,
}: SolutionCardProps) {
  const [votes, setVotes] = React.useState({
    upvotes: solution.upvotes,
    downvotes: solution.downvotes,
  })
  const [userVote, setUserVote] = React.useState<"up" | "down" | null>(null)

  const handleUpvote = () => {
    if (userVote === "up") {
      setVotes((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }))
      setUserVote(null)
    } else {
      setVotes((prev) => ({
        upvotes: prev.upvotes + 1,
        downvotes: userVote === "down" ? prev.downvotes - 1 : prev.downvotes,
      }))
      setUserVote("up")
    }
    onUpvote?.(solution.id)
  }

  const handleDownvote = () => {
    if (userVote === "down") {
      setVotes((prev) => ({ ...prev, downvotes: prev.downvotes - 1 }))
      setUserVote(null)
    } else {
      setVotes((prev) => ({
        downvotes: prev.downvotes + 1,
        upvotes: userVote === "up" ? prev.upvotes - 1 : prev.upvotes,
      }))
      setUserVote("down")
    }
    onDownvote?.(solution.id)
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{solution.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{solution.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatRelativeTime(solution.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(userVote === "up" && "text-green-600")}
              onClick={handleUpvote}
            >
              <ThumbsUp
                className={cn("h-4 w-4 mr-1", userVote === "up" && "fill-current")}
              />
              {votes.upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(userVote === "down" && "text-red-600")}
              onClick={handleDownvote}
            >
              <ThumbsDown
                className={cn(
                  "h-4 w-4 mr-1",
                  userVote === "down" && "fill-current"
                )}
              />
              {votes.downvotes}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              Time: {solution.timeComplexity}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Database className="h-3 w-3" />
              Space: {solution.spaceComplexity}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground">{solution.explanation}</p>
        </div>

        <CodeBlock code={solution.code} language={solution.language} />
      </CardContent>
    </Card>
  )
}
