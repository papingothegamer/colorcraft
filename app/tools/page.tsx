"use client"

import { useState, useEffect } from "react"
import { ColorGenerator } from "@/components/color-generator"

export default function ToolsPage() {
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ColorGenerator />
    </div>
  )
}

