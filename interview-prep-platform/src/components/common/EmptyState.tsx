import { LucideIcon, FileQuestion, Bookmark, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon = FileQuestion,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {description}
      </p>
      {action && (
        action.href ? (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      )}
    </div>
  )
}

export function NoQuestionsFound() {
  return (
    <EmptyState
      icon={Search}
      title="No questions found"
      description="Try adjusting your search or filters to find what you're looking for."
    />
  )
}

export function NoBookmarks() {
  return (
    <EmptyState
      icon={Bookmark}
      title="No bookmarks yet"
      description="Bookmark questions you want to revisit later. They'll appear here for easy access."
      action={{
        label: "Browse Questions",
        href: "/questions",
      }}
    />
  )
}
