"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2, Search, Users, GitPullRequest } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { MobileNav } from "./MobileNav"

export function Header() {
  const pathname = usePathname()
  const { visitorCount } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Interview Prep
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-8 h-9"
            />
          </div>

          {/* Visitor Counter */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{visitorCount.toLocaleString()} visitors</span>
          </div>

          {/* Contribute Button */}
          <Button asChild variant="outline" size="sm">
            <a
              href="https://github.com/Tusha435/DataScience_Interview_Prep"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2"
            >
              <GitPullRequest className="h-4 w-4" />
              Contribute
            </a>
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
