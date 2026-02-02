"use client"

import { Metadata } from "next"
import { Bookmark } from "lucide-react"

import { QuestionList } from "@/components/questions/QuestionList"
import { NoBookmarks } from "@/components/common/EmptyState"
import { useBookmarks } from "@/hooks/useBookmarks"

export default function BookmarksPage() {
  const { bookmarks, isLoading, toggleBookmark } = useBookmarks()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Bookmark className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Bookmarks</h1>
          <p className="text-muted-foreground">
            {bookmarks.length} saved questions
          </p>
        </div>
      </div>

      {isLoading ? (
        <QuestionList questions={[]} isLoading={true} />
      ) : bookmarks.length === 0 ? (
        <NoBookmarks />
      ) : (
        <QuestionList
          questions={bookmarks}
          isLoading={false}
          onBookmark={toggleBookmark}
        />
      )}
    </div>
  )
}
