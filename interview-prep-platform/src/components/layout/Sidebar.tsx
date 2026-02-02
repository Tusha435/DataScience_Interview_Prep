"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileQuestion,
  Bookmark,
  User,
  PlusCircle,
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
  {
    href: "/profile",
    label: "Profile",
    icon: User,
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
            Add Question
          </Link>
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
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

      <div className="p-4 border-t">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="text-sm font-semibold mb-2">Pro Tip</h4>
          <p className="text-xs text-muted-foreground">
            Practice at least 2-3 questions daily to build consistent interview
            preparation habits.
          </p>
        </div>
      </div>
    </aside>
  )
}
