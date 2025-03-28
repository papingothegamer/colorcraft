"use client"

import { useState, useEffect } from "react"
import { Templates } from "@/components/templates"

export default function TemplatesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <Templates isHomePage={false} />
    </div>
  )
}

