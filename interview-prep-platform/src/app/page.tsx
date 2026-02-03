"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Code2,
  Users,
  FileQuestion,
  ArrowRight,
  CheckCircle2,
  Target,
  PenSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { questions, companies, categories } from "@/lib/mockData"
import {
  FadeIn,
  AnimateInView,
  HoverCard,
} from "@/components/common/Animations"

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

export default function HomePage() {
  const featuredQuestions = questions.slice(0, 6)
  const topCompanies = companies.slice(0, 8)
  const topCategories = categories.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 gradient-hero overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
                  Ace Your Next{" "}
                  <motion.span
                    className="text-primary inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Technical Interview
                  </motion.span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  A free, open-source platform for interview preparation.
                  Practice with community-contributed questions and help others by sharing your knowledge.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" asChild>
                      <Link href="/questions">
                        Start Practicing
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/questions/new">
                        <PenSquare className="mr-2 h-4 w-4" />
                        Submit a Question
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <AnimateInView className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform provides comprehensive resources to help you prepare
                effectively for technical interviews.
              </p>
            </AnimateInView>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <AnimateInView key={feature.title} delay={index * 0.1}>
                    <HoverCard hoverEffect="lift" className="h-full">
                      <Card className="h-full border-0 shadow-sm">
                        <CardContent className="p-6">
                          <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <Icon className="h-6 w-6 text-primary" />
                          </motion.div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </HoverCard>
                  </AnimateInView>
                )
              })}
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <AnimateInView className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Questions from Top Companies
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Practice with questions actually asked at leading tech companies
                during their interview process.
              </p>
            </AnimateInView>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {topCompanies.map((company, index) => (
                <AnimateInView key={company.id} delay={index * 0.05}>
                  <Link href={`/questions?company=${company.id}`}>
                    <HoverCard hoverEffect="scale">
                      <div className="flex flex-col items-center p-4 rounded-lg border bg-card transition-colors">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg mb-2"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {company.logo}
                        </motion.div>
                        <span className="text-sm font-medium">{company.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {company.questionCount} questions
                        </span>
                      </div>
                    </HoverCard>
                  </Link>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <AnimateInView className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master key topics that are frequently tested in technical
                interviews.
              </p>
            </AnimateInView>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCategories.map((category, index) => (
                <AnimateInView key={category.id} delay={index * 0.1}>
                  <Link href={`/questions?category=${category.id}`}>
                    <HoverCard hoverEffect="lift" className="h-full">
                      <Card className="h-full">
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
                    </HoverCard>
                  </Link>
                </AnimateInView>
              ))}
            </div>

            <AnimateInView delay={0.3} className="text-center mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild>
                  <Link href="/questions">View All Categories</Link>
                </Button>
              </motion.div>
            </AnimateInView>
          </div>
        </section>

        {/* Recent Questions Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <AnimateInView className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Recent Questions</h2>
                <p className="text-muted-foreground">
                  Latest questions added by our community
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild>
                  <Link href="/questions">View All</Link>
                </Button>
              </motion.div>
            </AnimateInView>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredQuestions.map((question, index) => (
                <AnimateInView key={question.id} delay={index * 0.1}>
                  <Link href={`/questions/${question.id}`}>
                    <HoverCard hoverEffect="lift" className="h-full">
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <motion.div
                              className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-sm"
                              whileHover={{ scale: 1.2 }}
                            >
                              {question.company.logo}
                            </motion.div>
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
                    </HoverCard>
                  </Link>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-6">
              <AnimateInView>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Start Your Interview Prep?
                </h2>
              </AnimateInView>

              <AnimateInView delay={0.1}>
                <p className="text-lg opacity-90 max-w-2xl">
                  Help build the best free interview prep resource. Submit questions
                  and answers to help the community grow.
                </p>
              </AnimateInView>

              <AnimateInView delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/questions">
                        Browse Questions
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      asChild
                    >
                      <Link href="/questions/new">
                        Submit a Question
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </AnimateInView>

              <AnimateInView delay={0.3}>
                <div className="flex items-center gap-6 pt-4 text-sm opacity-80 flex-wrap justify-center">
                  {[
                    "Free to use",
                    "No credit card required",
                    "Community driven",
                  ].map((text, index) => (
                    <motion.div
                      key={text}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
