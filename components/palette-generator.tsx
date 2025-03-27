"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Copy, Download, Save, Lock, Unlock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { generateRandomColor, generateColorPalette, getContrastColor } from "@/lib/color-utils"
import type { Palette, ColorScheme } from "@/types/color-types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PaletteGeneratorProps {
  onSave: (palette: Palette) => void
  savedPalettes: Palette[]
}

export function PaletteGenerator({ onSave, savedPalettes }: PaletteGeneratorProps) {
  const [colors, setColors] = useState<string[]>(
    Array(5)
      .fill("")
      .map(() => generateRandomColor()),
  )
  const [lockedColors, setLockedColors] = useState<boolean[]>(Array(5).fill(false))
  const [colorCount, setColorCount] = useState<number>(5)
  const [colorScheme, setColorScheme] = useState<ColorScheme>("random")

  const regeneratePalette = () => {
    if (colorScheme === "random") {
      setColors((prev) => prev.map((color, i) => (lockedColors[i] ? color : generateRandomColor())))
    } else {
      const newPalette = generateColorPalette(colorScheme, colorCount)
      setColors((prev) => prev.map((color, i) => (lockedColors[i] ? color : newPalette[i] || generateRandomColor())))
    }
  }

  const toggleLock = (index: number) => {
    setLockedColors((prev) => {
      const newLocked = [...prev]
      newLocked[index] = !newLocked[index]
      return newLocked
    })
  }

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
      duration: 2000,
    })
  }

  const downloadPalette = () => {
    // Create a canvas to draw the palette
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const width = 1000
    const height = 200

    canvas.width = width
    canvas.height = height

    if (ctx) {
      // Draw each color as a rectangle
      const colorWidth = width / colors.length
      colors.forEach((color, i) => {
        ctx.fillStyle = color
        ctx.fillRect(i * colorWidth, 0, colorWidth, height)

        // Add color code text
        ctx.fillStyle = getContrastColor(color)
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.fillText(color, i * colorWidth + colorWidth / 2, height / 2)
      })

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = "color-palette.png"
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    }
  }

  const savePalette = () => {
    const newPalette: Palette = {
      id: Date.now().toString(),
      colors,
      timestamp: new Date().toISOString(),
    }

    onSave(newPalette)

    toast({
      title: "Palette saved!",
      description: "Your palette has been saved to your collection.",
      duration: 2000,
    })
  }

  const handleColorCountChange = (value: number[]) => {
    const newCount = value[0]
    setColorCount(newCount)

    // Adjust colors array size
    if (newCount > colors.length) {
      // Add new colors
      setColors((prev) => [
        ...prev,
        ...Array(newCount - prev.length)
          .fill("")
          .map(() => generateRandomColor()),
      ])
      setLockedColors((prev) => [...prev, ...Array(newCount - prev.length).fill(false)])
    } else if (newCount < colors.length) {
      // Remove colors
      setColors((prev) => prev.slice(0, newCount))
      setLockedColors((prev) => prev.slice(0, newCount))
    }
  }

  useEffect(() => {
    regeneratePalette()
  }, [colorScheme, colorCount])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color-count">Number of Colors ({colorCount})</Label>
                <Slider
                  id="color-count"
                  min={3}
                  max={10}
                  step={1}
                  value={[colorCount]}
                  onValueChange={handleColorCountChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <Select value={colorScheme} onValueChange={(value) => setColorScheme(value as ColorScheme)}>
                  <SelectTrigger id="color-scheme">
                    <SelectValue placeholder="Select a color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="monochromatic">Monochromatic</SelectItem>
                    <SelectItem value="analogous">Analogous</SelectItem>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="triadic">Triadic</SelectItem>
                    <SelectItem value="tetradic">Tetradic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={regeneratePalette} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button onClick={savePalette} variant="outline" className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button onClick={downloadPalette} variant="outline">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col">
          <div className="text-lg font-medium mb-2">Preview</div>
          <div className="flex-1 flex flex-col rounded-lg overflow-hidden border">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 flex items-center justify-between p-4 transition-all"
                style={{
                  backgroundColor: color,
                  color: getContrastColor(color),
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleLock(index)}
                        style={{ color: getContrastColor(color) }}
                      >
                        {lockedColors[index] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{lockedColors[index] ? "Unlock color" : "Lock color"}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span className="font-mono">{color}</span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyColor(color)}
                        style={{ color: getContrastColor(color) }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to clipboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

