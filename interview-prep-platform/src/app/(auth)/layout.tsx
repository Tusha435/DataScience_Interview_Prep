import Link from "next/link"
import { Code2 } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground">
          <Code2 className="h-8 w-8" />
          <span className="text-2xl font-bold">Interview Prep</span>
        </Link>

        <div className="space-y-6 text-primary-foreground">
          <h1 className="text-4xl font-bold">
            Prepare for your dream job interview
          </h1>
          <p className="text-lg opacity-90">
            Access thousands of real interview questions from top tech companies.
            Practice, learn, and succeed.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-1">
              <p className="text-3xl font-bold">2,500+</p>
              <p className="text-sm opacity-80">Interview Questions</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">50+</p>
              <p className="text-sm opacity-80">Top Companies</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">8,000+</p>
              <p className="text-sm opacity-80">Solutions</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">100K+</p>
              <p className="text-sm opacity-80">Happy Users</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/70">
          &copy; {new Date().getFullYear()} Interview Prep. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Interview Prep</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
