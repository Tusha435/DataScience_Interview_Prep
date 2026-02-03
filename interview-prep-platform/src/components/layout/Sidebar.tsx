"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileQuestion,
  Bookmark,
  PlusCircle,
  GitPullRequest,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/questions",
    label: "Questions",
    icon: FileQuestion,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: Bookmark,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-col gap-2 p-4">
        <Button asChild className="w-full justify-start gap-2">
          <Link href="/questions/new">
            <PlusCircle className="h-4 w-4" />
            Submit Question
          </Link>
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t space-y-4">
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <a
            href="https://github.com/Tusha435/DataScience_Interview_Prep"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitPullRequest className="h-4 w-4" />
            Contribute
          </a>
        </Button>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="text-sm font-semibold mb-2">Want to contribute?</h4>
          <p className="text-xs text-muted-foreground">
            Use the Submit Question form to share interview questions. Your submission will be reviewed before being added.
          </p>
        </div>
      </div>
    </aside>
  )
}
