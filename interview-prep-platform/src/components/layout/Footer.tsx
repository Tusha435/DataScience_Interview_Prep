import Link from "next/link"
import { Code2, Github, Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Questions", href: "/questions" },
    { label: "Companies", href: "/questions" },
    { label: "Categories", href: "/questions" },
  ],
  resources: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Bookmarks", href: "/bookmarks" },
    { label: "Submit Question", href: "/questions/new" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/Tusha435/DataScience_Interview_Prep", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/tushar-sinha-914883246/", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold">Interview Prep</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Prepare for your next technical interview with real questions from
              top companies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Interview Prep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
