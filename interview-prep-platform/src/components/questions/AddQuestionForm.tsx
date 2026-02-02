"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/common/Loading"
import { companies, categories } from "@/lib/mockData"
import { DIFFICULTY_OPTIONS } from "@/lib/constants"

const questionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  companyId: z.string().min(1, "Please select a company"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  categoryIds: z
    .array(z.string())
    .min(1, "Please select at least one category"),
  tags: z.string().optional(),
})

type QuestionFormData = z.infer<typeof questionSchema>

export function AddQuestionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
    setIsSubmitting(true)
    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Question submitted!",
        description: "Your question has been added successfully.",
      })
      router.push("/questions")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

      <div className="space-y-2">
        <Label htmlFor="description">Problem Description *</Label>
        <Textarea
          id="description"
          placeholder="Provide a detailed description of the problem, including examples and constraints..."
          className="min-h-[200px]"
          {...register("description")}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

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

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner className="mr-2" />
              Submitting...
            </>
          ) : (
            "Submit Question"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
