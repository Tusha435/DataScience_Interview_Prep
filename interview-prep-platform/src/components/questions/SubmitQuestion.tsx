"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getCompanies, getCategories } from "@/lib/data"

interface SubmitQuestionFormProps {
  trigger?: React.ReactNode
}

type SubmitStatus = "idle" | "submitting" | "success" | "error"

export function SubmitQuestionForm({ trigger }: SubmitQuestionFormProps) {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  const companies = getCompanies()
  const categories = getCategories()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      difficulty: formData.get("difficulty") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      solution: formData.get("solution") as string,
      timeComplexity: formData.get("timeComplexity") as string,
      spaceComplexity: formData.get("spaceComplexity") as string,
      submitterName: formData.get("submitterName") as string,
      submitterEmail: formData.get("submitterEmail") as string,
    }

    // Create GitHub Issue via API route or direct submission
    // For static site, we'll use a mailto link or external service
    try {
      // Option 1: Create a mailto link with the question details
      const issueBody = `
## New Question Submission

**Title:** ${data.title}
**Company:** ${data.company}
**Difficulty:** ${data.difficulty}
**Category:** ${data.category}

### Description
${data.description}

### Solution
\`\`\`
${data.solution}
\`\`\`

**Time Complexity:** ${data.timeComplexity}
**Space Complexity:** ${data.spaceComplexity}

---
**Submitted by:** ${data.submitterName} (${data.submitterEmail})
**Date:** ${new Date().toISOString()}
      `.trim()

      // For GitHub Issues, user needs to configure their repo
      // This creates a URL that opens GitHub Issue creation page
      const repoOwner = process.env.NEXT_PUBLIC_GITHUB_OWNER || "your-github-username"
      const repoName = process.env.NEXT_PUBLIC_GITHUB_REPO || "interview-prep-platform"

      const issueUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(`[Question] ${data.title}`)}&body=${encodeURIComponent(issueBody)}&labels=question-submission`

      // Open in new tab
      window.open(issueUrl, "_blank")

      setStatus("success")

      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus("idle")
        setOpen(false)
      }, 3000)
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to submit. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            Submit Question
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a New Question</DialogTitle>
          <DialogDescription>
            Submit an interview question for review. Once approved, it will appear on the platform.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Submission Received!</h3>
              <p className="text-muted-foreground">
                Your question has been submitted for review. You&apos;ll be redirected to GitHub to complete the submission.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Question Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Question Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Two Sum"
                  required
                  disabled={status === "submitting"}
                />
              </div>

              {/* Company and Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Select name="company" required disabled={status === "submitting"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select name="difficulty" required disabled={status === "submitting"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select name="category" required disabled={status === "submitting"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Question Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the problem in detail..."
                  rows={4}
                  required
                  disabled={status === "submitting"}
                />
              </div>

              {/* Solution */}
              <div className="space-y-2">
                <Label htmlFor="solution">Solution (Code) *</Label>
                <Textarea
                  id="solution"
                  name="solution"
                  placeholder="Paste your solution code here..."
                  rows={6}
                  className="font-mono text-sm"
                  required
                  disabled={status === "submitting"}
                />
              </div>

              {/* Complexity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeComplexity">Time Complexity</Label>
                  <Input
                    id="timeComplexity"
                    name="timeComplexity"
                    placeholder="e.g., O(n)"
                    disabled={status === "submitting"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spaceComplexity">Space Complexity</Label>
                  <Input
                    id="spaceComplexity"
                    name="spaceComplexity"
                    placeholder="e.g., O(1)"
                    disabled={status === "submitting"}
                  />
                </div>
              </div>

              {/* Submitter Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="submitterName">Your Name *</Label>
                  <Input
                    id="submitterName"
                    name="submitterName"
                    placeholder="John Doe"
                    required
                    disabled={status === "submitting"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submitterEmail">Your Email *</Label>
                  <Input
                    id="submitterEmail"
                    name="submitterEmail"
                    type="email"
                    placeholder="john@example.com"
                    required
                    disabled={status === "submitting"}
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={status === "submitting"}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={status === "submitting"} className="gap-2">
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit for Review
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree that this question may be published on the platform after review.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
