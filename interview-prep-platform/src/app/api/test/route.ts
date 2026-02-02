import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Interview Prep API is running",
    timestamp: new Date().toISOString(),
    status: "healthy",
  })
}
