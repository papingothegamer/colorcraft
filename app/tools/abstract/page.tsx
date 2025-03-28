"use client"

import { useState, useEffect } from "react"
import { AbstractGenerator } from "@/components/abstract-generator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { AbstractConfig } from "@/types/color-types"

export default function AbstractPage() {
  const [mounted, setMounted] = useState(false)
  const [savedAbstracts, setSavedAbstracts] = useLocalStorage<AbstractConfig[]>("saved-abstracts", [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const saveAbstract = (abstract: AbstractConfig) => {
    setSavedAbstracts((prev) => [abstract, ...prev.slice(0, 19)])
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
        <h2 className="text-3xl font-bold">Abstract Pattern Generator</h2>
        <p className="text-muted-foreground mt-1">Create unique abstract patterns for your designs</p>
      </div>
      <AbstractGenerator onSave={saveAbstract} savedAbstracts={savedAbstracts} />
    </div>
  )
}

