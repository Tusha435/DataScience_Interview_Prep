import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddQuestionForm } from "@/components/questions/AddQuestionForm"

export const metadata: Metadata = {
  title: "Submit a Question",
  description: "Submit an interview question for review",
}

export default function NewQuestionPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Submit a Question</CardTitle>
          <CardDescription>
            Share an interview question with the community. Both the question and
            answer are required. After submission, your question will be reviewed
            before being added to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddQuestionForm />
        </CardContent>
      </Card>
    </div>
  )
}
