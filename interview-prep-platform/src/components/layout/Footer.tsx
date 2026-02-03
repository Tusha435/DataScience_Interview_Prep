"use client"

import Link from "next/link"
import { Code2, Github, Linkedin, GitPullRequest } from "lucide-react"

const footerLinks = {
  explore: [
    { label: "Questions", href: "/questions" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Bookmarks", href: "/bookmarks" },
  ],
  contribute: [
    { label: "GitHub Repo", href: "https://github.com/Tusha435/DataScience_Interview_Prep", external: true },
    { label: "Submit Question", href: "/questions/new" },
    { label: "Report Issue", href: "https://github.com/Tusha435/DataScience_Interview_Prep/issues", external: true },
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold">Interview Prep</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Free and open-source interview preparation platform. Contribute questions via GitHub!
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
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

          {/* Contribute Links */}
          <div>
            <h3 className="font-semibold mb-4">Contribute</h3>
            <ul className="space-y-3">
              {footerLinks.contribute.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* How to Contribute */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" />
              How to Contribute
            </h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Fork the repository</li>
              <li>Edit data/questions.json</li>
              <li>Add your question</li>
              <li>Submit a Pull Request</li>
            </ol>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Interview Prep. Open source and free for everyone.
          </p>
        </div>
      </div>
    </footer>
  )
}
