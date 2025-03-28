"use client"

import { useState, useEffect } from "react"
import { PaletteGenerator } from "@/components/palette-generator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Palette } from "@/types/color-types"

export default function PalettePage() {
  const [mounted, setMounted] = useState(false)
  const [savedPalettes, setSavedPalettes] = useLocalStorage<Palette[]>("saved-palettes", [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const savePalette = (palette: Palette) => {
    setSavedPalettes((prev) => [palette, ...prev.slice(0, 19)])
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
        <h2 className="text-3xl font-bold">Color Palette Generator</h2>
        <p className="text-muted-foreground mt-1">Create beautiful color palettes for your projects</p>
      </div>
      <PaletteGenerator onSave={savePalette} savedPalettes={savedPalettes} />
    </div>
  )
}

