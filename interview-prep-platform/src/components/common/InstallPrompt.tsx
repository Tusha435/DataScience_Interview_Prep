"use client"

import * as React from "react"
import { Download, X, Wifi, WifiOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { usePWA } from "@/hooks/usePWA"

export function InstallPrompt() {
  const { isInstallable, isOnline, installApp } = usePWA()
  const [isDismissed, setIsDismissed] = React.useState(false)
  const [showOfflineNotice, setShowOfflineNotice] = React.useState(false)

  React.useEffect(() => {
    // Check if user has previously dismissed the prompt
    const dismissed = localStorage.getItem("pwa-prompt-dismissed")
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  React.useEffect(() => {
    // Show offline notice briefly when going offline
    if (!isOnline) {
      setShowOfflineNotice(true)
      const timer = setTimeout(() => setShowOfflineNotice(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline])

  const handleInstall = async () => {
    const success = await installApp()
    if (success) {
      setIsDismissed(true)
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem("pwa-prompt-dismissed", "true")
  }

  return (
    <>
      {/* Install Prompt Banner */}
      <AnimatePresence>
        {isInstallable && !isDismissed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
          >
            <div className="bg-card border rounded-lg shadow-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">Install Interview Prep</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Install our app for quick access and offline support
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" onClick={handleInstall}>
                      Install
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleDismiss}>
                      Not now
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Notice */}
      <AnimatePresence>
        {showOfflineNotice && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto z-50"
          >
            <div className="bg-yellow-500 text-yellow-950 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">
                You&apos;re offline. Some features may be limited.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Online indicator (when coming back online) */}
      <AnimatePresence>
        {isOnline && showOfflineNotice === false && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto z-50 pointer-events-none"
          >
            {/* This will be shown briefly when coming back online */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
