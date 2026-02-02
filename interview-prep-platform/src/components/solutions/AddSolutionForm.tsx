"use client"

import * as React from "react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/common/Loading"
import { PROGRAMMING_LANGUAGES } from "@/lib/constants"
import { Plus } from "lucide-react"

const solutionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  explanation: z
    .string()
    .min(20, "Explanation must be at least 20 characters"),
  code: z.string().min(10, "Code must be at least 10 characters"),
  language: z.string().min(1, "Please select a language"),
  timeComplexity: z.string().min(1, "Please specify time complexity"),
  spaceComplexity: z.string().min(1, "Please specify space complexity"),
})

type SolutionFormData = z.infer<typeof solutionSchema>

interface AddSolutionFormProps {
  questionId: string
  onSuccess?: () => void
}

export function AddSolutionForm({ questionId, onSuccess }: AddSolutionFormProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SolutionFormData>({
    resolver: zodResolver(solutionSchema),
    defaultValues: {
      language: "typescript",
    },
  })

  const onSubmit = async (data: SolutionFormData) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Solution submitted!",
        description: "Your solution has been added successfully.",
      })
      reset()
      setIsOpen(false)
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit solution. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Solution
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Your Solution</DialogTitle>
          <DialogDescription>
            Share your solution with the community. Include an explanation and
            complexity analysis.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Solution Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Hash Map Solution - O(n)"
              {...register("title")}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation *</Label>
            <Textarea
              id="explanation"
              placeholder="Explain your approach, intuition, and why it works..."
              className="min-h-[100px]"
              {...register("explanation")}
              aria-invalid={!!errors.explanation}
            />
            {errors.explanation && (
              <p className="text-sm text-red-500">
                {errors.explanation.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Programming Language *</Label>
            <Select
              defaultValue="typescript"
              onValueChange={(value) => setValue("language", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMMING_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.language && (
              <p className="text-sm text-red-500">{errors.language.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code *</Label>
            <Textarea
              id="code"
              placeholder="Paste your code here..."
              className="min-h-[200px] font-mono text-sm"
              {...register("code")}
              aria-invalid={!!errors.code}
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timeComplexity">Time Complexity *</Label>
              <Input
                id="timeComplexity"
                placeholder="e.g., O(n)"
                {...register("timeComplexity")}
                aria-invalid={!!errors.timeComplexity}
              />
              {errors.timeComplexity && (
                <p className="text-sm text-red-500">
                  {errors.timeComplexity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="spaceComplexity">Space Complexity *</Label>
              <Input
                id="spaceComplexity"
                placeholder="e.g., O(n)"
                {...register("spaceComplexity")}
                aria-invalid={!!errors.spaceComplexity}
              />
              {errors.spaceComplexity && (
                <p className="text-sm text-red-500">
                  {errors.spaceComplexity.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Solution"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
