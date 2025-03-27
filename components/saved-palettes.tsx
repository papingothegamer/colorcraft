"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Trash2,
  Copy,
  Download,
  ChevronDown,
  ChevronUp,
  Palette,
  Layers,
  Droplets,
  GalleryHorizontalEnd,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getContrastColor } from "@/lib/color-utils"
import type { Palette as PaletteType, GradientConfig, SplatterConfig, AbstractConfig } from "@/types/color-types"

interface SavedPalettesProps {
  savedPalettes: PaletteType[]
  savedGradients: GradientConfig[]
  savedSplatters: SplatterConfig[]
  savedAbstracts: AbstractConfig[]
  activeTab: string
  onClearPalettes: () => void
  onClearGradients: () => void
  onClearSplatters: () => void
  onClearAbstracts: () => void
}

export function SavedPalettes({
  savedPalettes,
  savedGradients,
  savedSplatters,
  savedAbstracts,
  activeTab,
  onClearPalettes,
  onClearGradients,
  onClearSplatters,
  onClearAbstracts,
}: SavedPalettesProps) {
  const [isOpen, setIsOpen] = useState(true)

  const getIcon = () => {
    switch (activeTab) {
      case "palette":
        return <Palette className="h-4 w-4 mr-2" />
      case "gradient":
        return <GalleryHorizontalEnd className="h-4 w-4 mr-2" />
      case "splatter":
        return <Droplets className="h-4 w-4 mr-2" />
      case "abstract":
        return <Layers className="h-4 w-4 mr-2" />
      default:
        return <Palette className="h-4 w-4 mr-2" />
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case "palette":
        return "Saved Palettes"
      case "gradient":
        return "Saved Gradients"
      case "splatter":
        return "Saved Splatters"
      case "abstract":
        return "Saved Patterns"
      default:
        return "Saved Items"
    }
  }

  const getItemCount = () => {
    switch (activeTab) {
      case "palette":
        return savedPalettes.length
      case "gradient":
        return savedGradients.length
      case "splatter":
        return savedSplatters.length
      case "abstract":
        return savedAbstracts.length
      default:
        return 0
    }
  }

  const handleClear = () => {
    switch (activeTab) {
      case "palette":
        onClearPalettes()
        break
      case "gradient":
        onClearGradients()
        break
      case "splatter":
        onClearSplatters()
        break
      case "abstract":
        onClearAbstracts()
        break
    }
  }

  const renderPalettes = () => {
    if (savedPalettes.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No saved palettes yet. Create and save a palette to see it here.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedPalettes.map((palette) => (
          <Card key={palette.id} className="overflow-hidden">
            <div className="flex h-16">
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: color, color: getContrastColor(color) }}
                  onClick={() => {
                    navigator.clipboard.writeText(color)
                    toast({
                      title: "Color copied!",
                      description: `${color} has been copied to your clipboard.`,
                      duration: 2000,
                    })
                  }}
                >
                  <span className="text-xs font-mono">{color}</span>
                </div>
              ))}
            </div>
            <CardContent className="p-2 flex justify-end">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderGradients = () => {
    if (savedGradients.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No saved gradients yet. Create and save a gradient to see it here.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedGradients.map((gradient) => {
          const colorStops = gradient.colors.map((color, i) => `${color} ${gradient.stops[i]}%`).join(", ")
          const gradientStyle =
            gradient.type === "linear"
              ? `linear-gradient(${gradient.angle}deg, ${colorStops})`
              : gradient.type === "radial"
                ? `radial-gradient(circle, ${colorStops})`
                : `conic-gradient(from ${gradient.angle}deg, ${colorStops})`

          return (
            <Card key={gradient.id} className="overflow-hidden">
              <div
                className="h-32 w-full cursor-pointer"
                style={{ background: gradientStyle }}
                onClick={() => {
                  navigator.clipboard.writeText(`background: ${gradientStyle};`)
                  toast({
                    title: "CSS copied!",
                    description: "Gradient CSS has been copied to your clipboard.",
                    duration: 2000,
                  })
                }}
              />
              <CardContent className="p-2 flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  const renderSplatters = () => {
    if (savedSplatters.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No saved splatter patterns yet. Create and save a splatter to see it here.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedSplatters.map((splatter) => (
          <Card key={splatter.id} className="overflow-hidden">
            <div className="h-32 w-full bg-gray-100 flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Splatter Preview</div>
            </div>
            <CardContent className="p-2 flex justify-between items-center">
              <div className="flex">
                {splatter.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color, marginLeft: i > 0 ? "-8px" : "0" }}
                  />
                ))}
                {splatter.colors.length > 3 && (
                  <div className="w-6 h-6 rounded-full border bg-gray-200 flex items-center justify-center ml-[-8px]">
                    <span className="text-xs">+{splatter.colors.length - 3}</span>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderAbstracts = () => {
    if (savedAbstracts.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No saved abstract patterns yet. Create and save a pattern to see it here.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedAbstracts.map((abstract) => (
          <Card key={abstract.id} className="overflow-hidden">
            <div className="h-32 w-full bg-gray-100 flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Pattern Preview</div>
            </div>
            <CardContent className="p-2 flex justify-between items-center">
              <div className="text-sm">
                {abstract.patternType.charAt(0).toUpperCase() + abstract.patternType.slice(1)}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "palette":
        return renderPalettes()
      case "gradient":
        return renderGradients()
      case "splatter":
        return renderSplatters()
      case "abstract":
        return renderAbstracts()
      default:
        return null
    }
  }

  if (getItemCount() === 0 && !isOpen) {
    return null
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getIcon()}
          <h2 className="text-xl font-semibold">{getTitle()}</h2>
          <span className="ml-2 text-sm text-muted-foreground">({getItemCount()})</span>
        </div>
        <div className="flex gap-2">
          {getItemCount() > 0 && (
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isOpen && <div className="mt-4">{renderContent()}</div>}
    </div>
  )
}

