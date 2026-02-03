"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Code2, Users, GitPullRequest } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

export function MobileNav() {
  const pathname = usePathname()
  const { visitorCount } = useAuth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold">Interview Prep</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 mt-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block py-3 px-4 rounded-lg text-base font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-6 right-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{visitorCount.toLocaleString()} visitors</span>
          </div>

          <Button asChild variant="outline" className="w-full">
            <a
              href="https://github.com/Tusha435/DataScience_Interview_Prep"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <GitPullRequest className="h-4 w-4" />
              Contribute on GitHub
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
