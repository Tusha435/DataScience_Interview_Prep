"use client"

import { FileQuestion, MessageSquare, Bookmark, Eye } from "lucide-react"

import { StatsCard } from "@/components/dashboard/StatsCard"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestionCard } from "@/components/questions/QuestionCard"
import { useAuth } from "@/hooks/useAuth"
import { useBookmarks } from "@/hooks/useBookmarks"
import { recentActivity, questions } from "@/lib/mockData"

const stats = {
  questionsSolved: 47,
  solutionsContributed: 12,
  bookmarks: 23,
  totalViews: 1234,
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { bookmarks } = useBookmarks()

  const recentQuestions = questions.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.name}!
        </h1>
        <p className="text-muted-foreground">
          Track your progress and continue your interview preparation journey.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Questions Solved"
          value={stats.questionsSolved}
          icon={FileQuestion}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Solutions Contributed"
          value={stats.solutionsContributed}
          icon={MessageSquare}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Bookmarks"
          value={bookmarks.length || stats.bookmarks}
          icon={Bookmark}
        />
        <StatsCard
          title="Profile Views"
          value={stats.totalViews}
          icon={Eye}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <RecentActivity activities={recentActivity} className="lg:col-span-2" />

        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Bookmarked Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Bookmarked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          {bookmarks.length > 0 ? (
            <div className="space-y-4">
              {bookmarks.slice(0, 3).map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
