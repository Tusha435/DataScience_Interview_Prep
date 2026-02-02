import type { Metadata, Viewport } from "next"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { PWAProvider } from "@/components/common/PWAProvider"

export const metadata: Metadata = {
  metadataBase: new URL("https://interview-prep.vercel.app"),
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Interview Prep",
  },
  formatDetection: {
    telephone: false,
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
          <PWAProvider>
            {children}
          </PWAProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
