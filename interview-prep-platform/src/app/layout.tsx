import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: "Interview Prep - Ace Your Technical Interviews",
    template: "%s | Interview Prep",
  },
  description:
    "Prepare for technical interviews with real questions from top companies like Google, Amazon, Microsoft, and more. Practice coding problems, system design, and behavioral questions.",
  keywords: [
    "interview preparation",
    "coding interview",
    "technical interview",
    "leetcode",
    "algorithm",
    "data structures",
    "system design",
    "software engineering",
  ],
  authors: [{ name: "Interview Prep Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://interview-prep.vercel.app",
    siteName: "Interview Prep",
    title: "Interview Prep - Ace Your Technical Interviews",
    description:
      "Prepare for technical interviews with real questions from top companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Prep - Ace Your Technical Interviews",
    description:
      "Prepare for technical interviews with real questions from top companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
