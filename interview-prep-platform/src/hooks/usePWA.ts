"use client"

import * as React from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function usePWA() {
  const [isInstallable, setIsInstallable] = React.useState(false)
  const [isInstalled, setIsInstalled] = React.useState(false)
  const [isOnline, setIsOnline] = React.useState(true)
  const deferredPromptRef = React.useRef<BeforeInstallPromptEvent | null>(null)

  React.useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      deferredPromptRef.current = e as BeforeInstallPromptEvent
      setIsInstallable(true)
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      deferredPromptRef.current = null
    }

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Set initial online status
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const installApp = React.useCallback(async () => {
    if (!deferredPromptRef.current) {
      return false
    }

    try {
      await deferredPromptRef.current.prompt()
      const { outcome } = await deferredPromptRef.current.userChoice

      if (outcome === "accepted") {
        setIsInstallable(false)
        deferredPromptRef.current = null
        return true
      }
      return false
    } catch (error) {
      console.error("Install prompt error:", error)
      return false
    }
  }, [])

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
  }
}
