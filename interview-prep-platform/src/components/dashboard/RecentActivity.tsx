import Link from "next/link"
import {
  FileQuestion,
  MessageSquare,
  Bookmark,
  ThumbsUp,
  LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "@/types"
import { formatRelativeTime, cn } from "@/lib/utils"

interface RecentActivityProps {
  activities: Activity[]
  className?: string
}

const activityIcons: Record<Activity["type"], LucideIcon> = {
  question: FileQuestion,
  solution: MessageSquare,
  bookmark: Bookmark,
  upvote: ThumbsUp,
}

const activityColors: Record<Activity["type"], string> = {
  question: "bg-blue-100 text-blue-600",
  solution: "bg-green-100 text-green-600",
  bookmark: "bg-yellow-100 text-yellow-600",
  upvote: "bg-purple-100 text-purple-600",
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent activity
          </p>
        ) : (
          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              return (
                <div key={activity.id} className="flex gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      activityColors[activity.type]
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                  {activity.link && (
                    <Link
                      href={activity.link}
                      className="text-sm text-primary hover:underline shrink-0"
                    >
                      View
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
