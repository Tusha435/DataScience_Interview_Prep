"use client"

import * as React from "react"
import { InstallPrompt } from "./InstallPrompt"

export function PWAProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <InstallPrompt />
    </>
  )
}
