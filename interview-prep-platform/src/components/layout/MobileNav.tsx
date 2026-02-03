"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Code2, Users, GitPullRequest } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const { visitorCount } = useAuth()

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container grid gap-6 p-6">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold">Interview Prep</span>
            </Link>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4 border-t">
              {/* Visitor Counter */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{visitorCount.toLocaleString()} visitors</span>
              </div>

              {/* Contribute Button */}
              <Button asChild variant="outline">
                <a
                  href="https://github.com/Tusha435/DataScience_Interview_Prep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <GitPullRequest className="h-4 w-4" />
                  Contribute on GitHub
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
