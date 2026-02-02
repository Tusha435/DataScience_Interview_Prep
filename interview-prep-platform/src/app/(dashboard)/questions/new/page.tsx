import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddQuestionForm } from "@/components/questions/AddQuestionForm"

export const metadata: Metadata = {
  title: "Add New Question",
  description: "Share an interview question with the community",
}

export default function NewQuestionPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Question</CardTitle>
          <CardDescription>
            Share an interview question you&apos;ve encountered. Help the
            community by providing detailed descriptions and examples.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddQuestionForm />
        </CardContent>
      </Card>
    </div>
  )
}
