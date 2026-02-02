import Link from "next/link"
import {
  Code2,
  Users,
  FileQuestion,
  Building2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  BookOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { questions, companies, categories } from "@/lib/mockData"

const features = [
  {
    icon: FileQuestion,
    title: "Real Interview Questions",
    description:
      "Access thousands of actual interview questions from top tech companies, curated by experienced engineers.",
  },
  {
    icon: Code2,
    title: "Multiple Solutions",
    description:
      "Learn different approaches to solve problems with detailed explanations and complexity analysis.",
  },
  {
    icon: Target,
    title: "Track Your Progress",
    description:
      "Monitor your preparation journey with personalized statistics and activity tracking.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Contribute questions and solutions, and learn from the community of job seekers and professionals.",
  },
]

const stats = [
  { label: "Interview Questions", value: "2,500+" },
  { label: "Solutions", value: "8,000+" },
  { label: "Companies", value: "50+" },
  { label: "Active Users", value: "100K+" },
]

export default function HomePage() {
  const featuredQuestions = questions.slice(0, 6)
  const topCompanies = companies.slice(0, 8)
  const topCategories = categories.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 gradient-hero">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-3 w-3 mr-1" />
                New: System Design Questions Added
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
                Ace Your Next{" "}
                <span className="text-primary">Technical Interview</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                Practice with real interview questions from Google, Amazon,
                Microsoft, and 50+ top companies. Join thousands of developers
                preparing for their dream jobs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/questions">
                    Start Practicing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">Create Free Account</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 w-full max-w-3xl">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform provides comprehensive resources to help you prepare
                effectively for technical interviews.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Questions from Top Companies
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Practice with questions actually asked at leading tech companies
                during their interview process.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {topCompanies.map((company) => (
                <Link
                  key={company.id}
                  href={`/questions?company=${company.id}`}
                  className="flex flex-col items-center p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg mb-2">
                    {company.logo}
                  </div>
                  <span className="text-sm font-medium">{company.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {company.questionCount} questions
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master key topics that are frequently tested in technical
                interviews.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/questions?category=${category.id}`}
                >
                  <Card className="card-hover h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">
                          {category.name}
                        </h3>
                        <Badge variant="secondary">
                          {category.questionCount} questions
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/questions">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Questions Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Recent Questions</h2>
                <p className="text-muted-foreground">
                  Latest questions added by our community
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/questions">View All</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredQuestions.map((question) => (
                <Link key={question.id} href={`/questions/${question.id}`}>
                  <Card className="card-hover h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-sm">
                          {question.company.logo}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {question.company.name}
                        </span>
                        <Badge
                          variant={
                            question.difficulty === "Easy"
                              ? "easy"
                              : question.difficulty === "Medium"
                              ? "medium"
                              : "hard"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {question.title}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {question.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat.id} variant="secondary" className="text-xs">
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Interview Prep?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl">
                Join thousands of developers who have successfully landed jobs at
                top tech companies using our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/questions">Browse Questions</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Free to use
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Community driven
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
