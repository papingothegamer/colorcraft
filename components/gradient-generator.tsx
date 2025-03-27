"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Copy, Download, Plus, Minus, RotateCcw, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { generateRandomColor } from "@/lib/color-utils"
import type { GradientConfig, GradientType } from "@/types/color-types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GradientGeneratorProps {
  onSave: (gradient: GradientConfig) => void
}

export function GradientGenerator({ onSave }: GradientGeneratorProps) {
  const [colors, setColors] = useState<string[]>([generateRandomColor(), generateRandomColor()])
  const [stops, setStops] = useState<number[]>([0, 100])
  const [angle, setAngle] = useState<number>(90)
  const [gradientType, setGradientType] = useState<GradientType>("linear")
  const [resolution, setResolution] = useState<{ width: number; height: number }>({ width: 1920, height: 1080 })
  const [presetTab, setPresetTab] = useState<string>("custom")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addColor = () => {
    if (colors.length < 10) {
      const newColor = generateRandomColor()
      const newStop = Math.round((stops[stops.length - 1] + stops[stops.length - 2]) / 2) || 50

      setColors([...colors, newColor])
      setStops([...stops, newStop])
    }
  }

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
      setStops(stops.filter((_, i) => i !== index))
    }
  }

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const updateStop = (index: number, stop: number) => {
    const newStops = [...stops]
    newStops[index] = stop
    setStops(newStops)
  }

  const regenerateGradient = () => {
    setColors(colors.map(() => generateRandomColor()))
  }

  const getCssGradient = () => {
    const colorStops = colors.map((color, i) => `${color} ${stops[i]}%`).join(", ")

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${colorStops})`
    } else if (gradientType === "radial") {
      return `radial-gradient(circle, ${colorStops})`
    } else {
      return `conic-gradient(from ${angle}deg, ${colorStops})`
    }
  }

  const copyGradientCss = () => {
    const css = getCssGradient()
    navigator.clipboard.writeText(`background: ${css};`)
    toast({
      title: "CSS copied!",
      description: "Gradient CSS has been copied to your clipboard.",
      duration: 2000,
    })
  }

  const downloadGradient = () => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (canvas) {
      try {
        // Set canvas resolution
        canvas.width = resolution.width
        canvas.height = resolution.height

        renderGradientToCanvas()

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "gradient.png"
              a.click()
              URL.revokeObjectURL(url)

              toast({
                title: "Gradient downloaded!",
                description: `Downloaded at ${resolution.width}x${resolution.height} resolution.`,
                duration: 2000,
              })
            }
          },
          "image/png",
          1.0,
        )
      } catch (error) {
        console.error("Error downloading gradient:", error)
        toast({
          title: "Download failed",
          description: "There was an error downloading your gradient.",
          duration: 2000,
        })
      }
    }
  }

  const saveGradient = () => {
    const newGradient: GradientConfig = {
      id: Date.now().toString(),
      colors,
      stops,
      angle,
      type: gradientType,
      timestamp: new Date().toISOString(),
    }

    onSave(newGradient)

    toast({
      title: "Gradient saved!",
      description: "Your gradient has been saved to your collection.",
      duration: 2000,
    })
  }

  const shareGradient = () => {
    const css = getCssGradient()
    const shareText = `Check out this gradient on ColorCraft:\n\nCSS: background: ${css};`

    if (navigator.share) {
      navigator
        .share({
          title: "ColorCraft Gradient",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(shareText)
          toast({
            title: "Copied to clipboard!",
            description: "Gradient details copied to clipboard for sharing.",
            duration: 2000,
          })
        })
    } else {
      navigator.clipboard.writeText(shareText)
      toast({
        title: "Copied to clipboard!",
        description: "Gradient details copied to clipboard for sharing.",
        duration: 2000,
      })
    }
  }

  const renderGradientToCanvas = () => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    try {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      if (gradientType === "linear") {
        // Calculate start and end points based on angle
        const angleRad = (angle * Math.PI) / 180
        const startX = width / 2 - Math.cos(angleRad) * width
        const startY = height / 2 - Math.sin(angleRad) * height
        const endX = width / 2 + Math.cos(angleRad) * width
        const endY = height / 2 + Math.sin(angleRad) * height

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)

        // Add color stops
        colors.forEach((color, i) => {
          gradient.addColorStop(stops[i] / 100, color)
        })

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      } else if (gradientType === "radial") {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) / 2,
        )

        // Add color stops
        colors.forEach((color, i) => {
          gradient.addColorStop(stops[i] / 100, color)
        })

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      } else if (gradientType === "conic") {
        // Sort color stops
        const indices = [...Array(colors.length).keys()].sort((a, b) => stops[a] - stops[b])
        const sortedColors = indices.map((i) => colors[i])
        const sortedStops = indices.map((i) => stops[i])

        // Draw conic gradient
        const centerX = width / 2
        const centerY = height / 2
        const radius = Math.max(width, height)

        // Convert angle to radians and adjust
        const startAngle = (angle * Math.PI) / 180

        // Draw sectors for each color segment
        for (let i = 0; i < sortedStops.length - 1; i++) {
          const startPercent = sortedStops[i] / 100
          const endPercent = sortedStops[i + 1] / 100

          const startAngleRad = startAngle + startPercent * Math.PI * 2
          const endAngleRad = startAngle + endPercent * Math.PI * 2

          // Draw sector
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, radius, startAngleRad, endAngleRad)
          ctx.closePath()

          // Create gradient for this sector
          const gradientColor = ctx.createLinearGradient(
            centerX,
            centerY,
            centerX + Math.cos((startAngleRad + endAngleRad) / 2) * radius,
            centerY + Math.sin((startAngleRad + endAngleRad) / 2) * radius,
          )

          gradientColor.addColorStop(0, sortedColors[i])
          gradientColor.addColorStop(1, sortedColors[i + 1])

          ctx.fillStyle = gradientColor
          ctx.fill()
        }
      }
    } catch (error) {
      console.error("Error rendering gradient to canvas:", error)
    }
  }

  // Preset resolutions
  const resolutionPresets = [
    { name: "HD (1280x720)", width: 1280, height: 720 },
    { name: "Full HD (1920x1080)", width: 1920, height: 1080 },
    { name: "4K (3840x2160)", width: 3840, height: 2160 },
    { name: "Instagram Post (1080x1080)", width: 1080, height: 1080 },
    { name: "Instagram Story (1080x1920)", width: 1080, height: 1920 },
    { name: "Twitter Header (1500x500)", width: 1500, height: 500 },
    { name: "Facebook Cover (851x315)", width: 851, height: 315 },
    { name: "YouTube Thumbnail (1280x720)", width: 1280, height: 720 },
  ]

  // Preset gradients
  const gradientPresets = [
    {
      name: "Sunset",
      colors: ["#FF512F", "#F09819"],
      stops: [0, 100],
      type: "linear" as GradientType,
      angle: 45,
    },
    {
      name: "Ocean",
      colors: ["#2E3192", "#1BFFFF"],
      stops: [0, 100],
      type: "linear" as GradientType,
      angle: 90,
    },
    {
      name: "Purple Haze",
      colors: ["#8E2DE2", "#4A00E0"],
      stops: [0, 100],
      type: "linear" as GradientType,
      angle: 135,
    },
    {
      name: "Emerald",
      colors: ["#348F50", "#56B4D3"],
      stops: [0, 100],
      type: "linear" as GradientType,
      angle: 90,
    },
    {
      name: "Cosmic Fusion",
      colors: ["#ff00cc", "#333399"],
      stops: [0, 100],
      type: "linear" as GradientType,
      angle: 45,
    },
    {
      name: "Rainbow",
      colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"],
      stops: [0, 16, 33, 50, 67, 84, 100],
      type: "linear" as GradientType,
      angle: 90,
    },
    {
      name: "Radial Sunset",
      colors: ["#FFD200", "#F7971E", "#FF6B6B"],
      stops: [0, 50, 100],
      type: "radial" as GradientType,
      angle: 0,
    },
    {
      name: "Conic Spectrum",
      colors: ["#8A2387", "#E94057", "#F27121", "#FFDD00", "#00C9FF", "#8A2387"],
      stops: [0, 20, 40, 60, 80, 100],
      type: "conic" as GradientType,
      angle: 0,
    },
  ]

  const applyPreset = (preset: (typeof gradientPresets)[0]) => {
    setColors(preset.colors)
    setStops(preset.stops)
    setGradientType(preset.type)
    setAngle(preset.angle)
  }

  const applyResolutionPreset = (preset: (typeof resolutionPresets)[0]) => {
    setResolution({ width: preset.width, height: preset.height })
  }

  useEffect(() => {
    if (mounted) {
      renderGradientToCanvas()
    }
  }, [colors, stops, angle, gradientType, mounted])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="custom" value={presetTab} onValueChange={setPresetTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>

                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Gradient Type</Label>
                      <Button variant="ghost" size="sm" onClick={regenerateGradient} className="h-8 px-2">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Randomize
                      </Button>
                    </div>
                    <Select value={gradientType} onValueChange={(value) => setGradientType(value as GradientType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gradient type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                        <SelectItem value="conic">Conic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(gradientType === "linear" || gradientType === "conic") && (
                    <div className="space-y-2">
                      <Label>Angle: {angle}°</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          min={0}
                          max={360}
                          step={1}
                          value={[angle]}
                          onValueChange={(value) => setAngle(value[0])}
                        />
                        <Button variant="outline" size="icon" onClick={() => setAngle(90)} className="h-8 w-8">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Colors</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addColor}
                        disabled={colors.length >= 10}
                        className="h-8 px-2"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Color
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color }} />
                          <Input
                            type="color"
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            className="w-12 p-0 border-0 h-8"
                          />
                          <Input
                            type="text"
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            className="flex-1 h-8"
                          />
                          <div className="flex-1">
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={stops[index]}
                              onChange={(e) => updateStop(index, Number.parseInt(e.target.value))}
                              className="h-8"
                            />
                          </div>
                          {colors.length > 2 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeColor(index)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="presets" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {gradientPresets.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 relative overflow-hidden"
                        onClick={() => applyPreset(preset)}
                      >
                        <div
                          className="absolute inset-0 opacity-80"
                          style={{
                            background:
                              preset.type === "linear"
                                ? `linear-gradient(${preset.angle}deg, ${preset.colors.map((c, i) => `${c} ${preset.stops[i]}%`).join(", ")})`
                                : preset.type === "radial"
                                  ? `radial-gradient(circle, ${preset.colors.map((c, i) => `${c} ${preset.stops[i]}%`).join(", ")})`
                                  : `conic-gradient(from ${preset.angle}deg, ${preset.colors.map((c, i) => `${c} ${preset.stops[i]}%`).join(", ")})`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 dark:bg-background/80">
                          <span className="font-medium text-sm">{preset.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Resolution Presets</Label>
                    <Select
                      onValueChange={(value) => {
                        const preset = resolutionPresets.find((p) => p.name === value)
                        if (preset) applyResolutionPreset(preset)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        {resolutionPresets.map((preset, index) => (
                          <SelectItem key={index} value={preset.name}>
                            {preset.name} ({preset.width}x{preset.height})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Width (px)</Label>
                      <Input
                        type="number"
                        min={100}
                        max={7680}
                        value={resolution.width}
                        onChange={(e) =>
                          setResolution({ ...resolution, width: Number.parseInt(e.target.value) || 1920 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Height (px)</Label>
                      <Input
                        type="number"
                        min={100}
                        max={4320}
                        value={resolution.height}
                        onChange={(e) =>
                          setResolution({ ...resolution, height: Number.parseInt(e.target.value) || 1080 })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button onClick={downloadGradient} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download ({resolution.width}x{resolution.height})
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button onClick={copyGradientCss} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy CSS
                </Button>
                <Button onClick={shareGradient} variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col">
          <div className="text-lg font-medium mb-2">Preview</div>
          <div className="flex-1 rounded-lg overflow-hidden border relative" style={{ background: getCssGradient() }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full object-cover invisible absolute"
            />
            <div className="aspect-video w-full"></div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              CSS: <code className="bg-muted px-1 py-0.5 rounded">{`background: ${getCssGradient()};`}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

