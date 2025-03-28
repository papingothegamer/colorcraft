"use client"

import { useState, useEffect } from "react"
import { SplatterGenerator } from "@/components/splatter-generator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { SplatterConfig } from "@/types/color-types"

export default function SplatterPage() {
  const [mounted, setMounted] = useState(false)
  const [savedSplatters, setSavedSplatters] = useLocalStorage<SplatterConfig[]>("saved-splatters", [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const saveSplatter = (splatter: SplatterConfig) => {
    setSavedSplatters((prev) => [splatter, ...prev.slice(0, 19)])
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
        <h2 className="text-3xl font-bold">Splatter Generator</h2>
        <p className="text-muted-foreground mt-1">Create vibrant splatter patterns for your designs</p>
      </div>
      <SplatterGenerator onSave={saveSplatter} />
    </div>
  )
}

