import { Metadata } from "next"
import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Interview Prep account and start preparing for interviews",
}

export default function RegisterPage() {
  return <RegisterForm />
}
