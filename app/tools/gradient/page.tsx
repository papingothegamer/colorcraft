"use client"

import { useState, useEffect } from "react"
import { GradientGenerator } from "@/components/gradient-generator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { GradientConfig } from "@/types/color-types"

export default function GradientPage() {
  const [mounted, setMounted] = useState(false)
  const [savedGradients, setSavedGradients] = useLocalStorage<GradientConfig[]>("saved-gradients", [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const saveGradient = (gradient: GradientConfig) => {
    setSavedGradients((prev) => [gradient, ...prev.slice(0, 19)])
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Gradient Generator</h2>
        <p className="text-muted-foreground mt-1">Create beautiful gradient backgrounds for your projects</p>
      </div>
      <GradientGenerator onSave={saveGradient} />
    </div>
  )
}

