"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaletteGenerator } from "./palette-generator"
import { GradientGenerator } from "./gradient-generator"
import { SplatterGenerator } from "./splatter-generator"
import { AbstractGenerator } from "./abstract-generator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Palette, GradientConfig, SplatterConfig, AbstractConfig } from "@/types/color-types"
import { useSearchParams, useRouter } from "next/navigation"

export function ColorGenerator() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialTab = searchParams.get("tab") || "palette"

  const [activeTab, setActiveTab] = useState(initialTab)
  const [savedPalettes, setSavedPalettes] = useLocalStorage<Palette[]>("saved-palettes", [])
  const [savedGradients, setSavedGradients] = useLocalStorage<GradientConfig[]>("saved-gradients", [])
  const [savedSplatters, setSavedSplatters] = useLocalStorage<SplatterConfig[]>("saved-splatters", [])
  const [savedAbstracts, setSavedAbstracts] = useLocalStorage<AbstractConfig[]>("saved-abstracts", [])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/tools?tab=${value}`, { scroll: false })
  }

  const savePalette = (palette: Palette) => {
    setSavedPalettes((prev) => [palette, ...prev.slice(0, 19)])
  }

  const saveGradient = (gradient: GradientConfig) => {
    setSavedGradients((prev) => [gradient, ...prev.slice(0, 19)])
  }

  const saveSplatter = (splatter: SplatterConfig) => {
    setSavedSplatters((prev) => [splatter, ...prev.slice(0, 19)])
  }

  const saveAbstract = (abstract: AbstractConfig) => {
    setSavedAbstracts((prev) => [abstract, ...prev.slice(0, 19)])
  }

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Color Generator</h2>
        <p className="text-muted-foreground mt-1">Create beautiful color palettes, gradients, and patterns</p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="palette">Palette</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="splatter">Splatter</TabsTrigger>
            <TabsTrigger value="abstract">Abstract</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="palette" className="mt-6">
          <PaletteGenerator onSave={savePalette} savedPalettes={savedPalettes} />
        </TabsContent>

        <TabsContent value="gradient" className="mt-6">
          <GradientGenerator onSave={saveGradient} />
        </TabsContent>

        <TabsContent value="splatter" className="mt-6">
          <SplatterGenerator onSave={saveSplatter} />
        </TabsContent>

        <TabsContent value="abstract" className="mt-6">
          <AbstractGenerator onSave={saveAbstract} savedAbstracts={savedAbstracts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

