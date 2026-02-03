"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, ExternalLink, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { companies, categories } from "@/lib/mockData"
import { DIFFICULTY_OPTIONS } from "@/lib/constants"

const GITHUB_REPO = "Tusha435/DataScience_Interview_Prep"

const questionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  answer: z.string().min(50, "Answer must be at least 50 characters"),
  companyId: z.string().min(1, "Please select a company"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  categoryIds: z
    .array(z.string())
    .min(1, "Please select at least one category"),
  tags: z.string().optional(),
  submitterName: z.string().min(2, "Please enter your name"),
})

type QuestionFormData = z.infer<typeof questionSchema>

export function AddQuestionForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [issueUrl, setIssueUrl] = React.useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      categoryIds: [],
      difficulty: "Medium",
    },
  })

  const selectedCategories = watch("categoryIds")

  const handleCategoryToggle = (categoryId: string) => {
    const current = selectedCategories || []
    if (current.includes(categoryId)) {
      setValue(
        "categoryIds",
        current.filter((id) => id !== categoryId)
      )
    } else {
      setValue("categoryIds", [...current, categoryId])
    }
  }

  const onSubmit = async (data: QuestionFormData) => {
    // Find company and category names
    const companyName = companies.find(c => c.id === data.companyId)?.name || data.companyId
    const categoryNames = data.categoryIds
      .map(id => categories.find(c => c.id === id)?.name || id)
      .join(", ")

    // Create GitHub Issue body
    const issueBody = `## New Question Submission

### Question Details
- **Title:** ${data.title}
- **Company:** ${companyName}
- **Difficulty:** ${data.difficulty}
- **Categories:** ${categoryNames}
${data.tags ? `- **Tags:** ${data.tags}` : ""}

### Question Description
${data.description}

### Answer / Solution
${data.answer}

---
**Submitted by:** ${data.submitterName}
**Date:** ${new Date().toLocaleDateString()}

---
*Please review this submission. If approved, add the question to \`data/questions.json\`*`

    // Create GitHub Issue URL
    const issueTitle = `[New Question] ${data.title}`
    const url = `https://github.com/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=question-submission`

    setIssueUrl(url)
    setIsSubmitted(true)

    // Open GitHub in new tab
    window.open(url, "_blank")
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Almost Done!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            A new tab should have opened to create a GitHub Issue.
            Complete the submission there to send your question for review.
          </p>
        </div>
        <div className="space-y-3">
          <Button asChild>
            <a href={issueUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open GitHub Issue
            </a>
          </Button>
          <div>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Submit Another Question
            </Button>
          </div>
        </div>
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>What happens next?</strong><br />
              The repository owner will review your submission.
              If approved, your question will be added to the platform.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Info Banner */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <p className="text-sm">
            <strong>How it works:</strong> Fill out this form and click submit.
            You&apos;ll be redirected to GitHub to create an issue. Once reviewed and approved,
            your question will appear on the platform.
          </p>
        </CardContent>
      </Card>

      {/* Your Name */}
      <div className="space-y-2">
        <Label htmlFor="submitterName">Your Name *</Label>
        <Input
          id="submitterName"
          placeholder="Enter your name (will be credited)"
          {...register("submitterName")}
          aria-invalid={!!errors.submitterName}
        />
        {errors.submitterName && (
          <p className="text-sm text-red-500">{errors.submitterName.message}</p>
        )}
      </div>

      {/* Question Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Question Title *</Label>
        <Input
          id="title"
          placeholder="e.g., Two Sum - Find indices of two numbers that add up to target"
          {...register("title")}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Company and Difficulty */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Company *</Label>
          <Select onValueChange={(value) => setValue("companyId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.companyId && (
            <p className="text-sm text-red-500">{errors.companyId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Difficulty *</Label>
          <Select
            defaultValue="Medium"
            onValueChange={(value) =>
              setValue("difficulty", value as "Easy" | "Medium" | "Hard")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_OPTIONS.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.difficulty && (
            <p className="text-sm text-red-500">{errors.difficulty.message}</p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <Label>Categories *</Label>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories?.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <Label
                htmlFor={`cat-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
        {errors.categoryIds && (
          <p className="text-sm text-red-500">{errors.categoryIds.message}</p>
        )}
      </div>

      {/* Question Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Question Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe the problem in detail. Include examples, input/output format, and constraints..."
          className="min-h-[150px]"
          {...register("description")}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Answer (Mandatory) */}
      <div className="space-y-2">
        <Label htmlFor="answer">Answer / Solution *</Label>
        <Textarea
          id="answer"
          placeholder="Provide a detailed answer or solution. Include code, explanation, approach, time/space complexity..."
          className="min-h-[200px] font-mono text-sm"
          {...register("answer")}
          aria-invalid={!!errors.answer}
        />
        {errors.answer && (
          <p className="text-sm text-red-500">{errors.answer.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Include your solution code, explanation, and complexity analysis
        </p>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (optional)</Label>
        <Input
          id="tags"
          placeholder="e.g., hash-table, array, two-pointers (comma-separated)"
          {...register("tags")}
        />
        <p className="text-xs text-muted-foreground">
          Separate tags with commas
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="submit" className="gap-2">
          <Send className="h-4 w-4" />
          Submit for Review
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree that this question may be published on the platform after review.
        You&apos;ll need a GitHub account to complete the submission.
      </p>
    </form>
  )
}
