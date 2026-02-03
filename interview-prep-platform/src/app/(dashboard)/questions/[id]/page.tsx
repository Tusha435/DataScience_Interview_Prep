import { getAllQuestionIds } from "@/lib/mockData"
import { QuestionPageClient } from "./QuestionPageClient"

// Generate static params for all questions at build time
export function generateStaticParams() {
  const ids = getAllQuestionIds()
  return ids.map((id) => ({ id }))
}

interface QuestionPageProps {
  params: {
    id: string
  }
}

export default function QuestionPage({ params }: QuestionPageProps) {
  return <QuestionPageClient id={params.id} />
}
