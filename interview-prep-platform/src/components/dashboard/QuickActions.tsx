import Link from "next/link"
import {
  PlusCircle,
  Search,
  BookOpen,
  Target,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const actions = [
  {
    title: "Add Question",
    description: "Share a new interview question",
    icon: PlusCircle,
    href: "/questions/new",
    color: "bg-blue-100 text-blue-600 hover:bg-blue-200",
  },
  {
    title: "Browse Questions",
    description: "Explore interview questions",
    icon: Search,
    href: "/questions",
    color: "bg-green-100 text-green-600 hover:bg-green-200",
  },
  {
    title: "My Bookmarks",
    description: "Review saved questions",
    icon: BookOpen,
    href: "/bookmarks",
    color: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
  },
  {
    title: "Random Question",
    description: "Practice with a random question",
    icon: Target,
    href: "/questions?random=true",
    color: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  },
]

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                href={action.href}
                className={cn(
                  "flex items-center gap-4 rounded-lg p-4 transition-colors",
                  action.color
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/50">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm opacity-80">{action.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
