"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Download, Save, Shuffle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { generateRandomColor } from "@/lib/color-utils"
import type { AbstractConfig, AbstractPatternType } from "@/types/color-types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AbstractGeneratorProps {
  onSave: (abstract: AbstractConfig) => void
  savedAbstracts: AbstractConfig[]
}

export function AbstractGenerator({ onSave, savedAbstracts }: AbstractGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [colors, setColors] = useState<string[]>([generateRandomColor(), generateRandomColor(), generateRandomColor()])
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
  const [patternType, setPatternType] = useState<AbstractPatternType>("waves")
  const [complexity, setComplexity] = useState<number>(5)
  const [scale, setScale] = useState<number>(20)
  const [noiseScale, setNoiseScale] = useState<number>(0.01)
  const [seed, setSeed] = useState<number>(Math.floor(Math.random() * 1000))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const addColor = () => {
    if (colors.length < 8) {
      setColors([...colors, generateRandomColor()])
    }
  }

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }

  const regeneratePattern = () => {
    setColors(colors.map(() => generateRandomColor()))
    setSeed(Math.floor(Math.random() * 1000))
    if (mounted) {
      renderPattern()
    }
  }

  // Simplex noise implementation (simplified for this example)
  const noise2D = (x: number, y: number, seed: number) => {
    // This is a very simplified noise function
    return Math.sin(x * noiseScale * seed) * Math.cos(y * noiseScale * seed)
  }

  const renderPattern = () => {
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

      // Set background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      if (patternType === "waves") {
        renderWaves(ctx, width, height)
      } else if (patternType === "voronoi") {
        renderVoronoi(ctx, width, height)
      } else if (patternType === "geometric") {
        renderGeometric(ctx, width, height)
      } else if (patternType === "flow") {
        renderFlow(ctx, width, height)
      }
    } catch (error) {
      console.error("Error rendering pattern:", error)
    }
  }

  const renderWaves = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const waveCount = complexity

    for (let w = 0; w < waveCount; w++) {
      const color = colors[w % colors.length]
      const amplitude = height / (4 + w)
      const frequency = ((w + 1) / width) * scale
      const phase = seed * (w + 1) * 0.1

      ctx.beginPath()
      ctx.moveTo(0, height / 2)

      for (let x = 0; x < width; x += 2) {
        const y =
          height / 2 +
          amplitude * Math.sin(x * frequency + phase) +
          (amplitude / 2) * Math.sin(x * frequency * 2 + phase * 2)

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      ctx.fillStyle = color
      ctx.globalAlpha = 0.7
      ctx.fill()
    }

    ctx.globalAlpha = 1
  }

  const renderVoronoi = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Generate random points
    const points = []
    const pointCount = complexity * 5

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        color: colors[i % colors.length],
      })
    }

    // Render Voronoi cells (simplified)
    const cellSize = scale

    for (let y = 0; y < height; y += cellSize) {
      for (let x = 0; x < width; x += cellSize) {
        // Find closest point
        let minDist = Number.POSITIVE_INFINITY
        let closestPoint = null

        for (const point of points) {
          const dx = x - point.x
          const dy = y - point.y
          const dist = dx * dx + dy * dy

          if (dist < minDist) {
            minDist = dist
            closestPoint = point
          }
        }

        if (closestPoint) {
          ctx.fillStyle = closestPoint.color
          ctx.fillRect(x, y, cellSize, cellSize)
        }
      }
    }
  }

  const renderGeometric = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const shapeCount = complexity * 10

    for (let i = 0; i < shapeCount; i++) {
      const color = colors[i % colors.length]
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * scale * 3 + scale

      ctx.fillStyle = color
      ctx.globalAlpha = 0.7

      const shapeType = Math.floor(Math.random() * 3)

      if (shapeType === 0) {
        // Triangle
        ctx.beginPath()
        ctx.moveTo(x, y - size / 2)
        ctx.lineTo(x + size / 2, y + size / 2)
        ctx.lineTo(x - size / 2, y + size / 2)
        ctx.closePath()
        ctx.fill()
      } else if (shapeType === 1) {
        // Rectangle
        ctx.fillRect(x - size / 2, y - size / 2, size, size)
      } else {
        // Circle
        ctx.beginPath()
        ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.globalAlpha = 1
  }

  const renderFlow = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const particleCount = complexity * 100
    const particleSize = scale / 10
    const flowScale = noiseScale

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const color = colors[i % colors.length]

      // Get flow direction from noise
      const angle = noise2D(x * flowScale, y * flowScale, seed) * Math.PI * 2
      const length = scale / 2

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)

      ctx.strokeStyle = color
      ctx.lineWidth = particleSize
      ctx.globalAlpha = 0.7
      ctx.stroke()
    }

    ctx.globalAlpha = 1
  }

  const downloadPattern = () => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (canvas) {
      try {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "abstract-pattern.png"
            a.click()
            URL.revokeObjectURL(url)
          }
        })
      } catch (error) {
        console.error("Error downloading pattern:", error)
        toast({
          title: "Download failed",
          description: "There was an error downloading your pattern.",
          duration: 2000,
        })
      }
    }
  }

  const savePattern = () => {
    const newAbstract: AbstractConfig = {
      id: Date.now().toString(),
      colors,
      backgroundColor,
      patternType,
      complexity,
      scale,
      noiseScale,
      seed,
      timestamp: new Date().toISOString(),
    }

    onSave(newAbstract)

    toast({
      title: "Pattern saved!",
      description: "Your abstract pattern has been saved to your collection.",
      duration: 2000,
    })
  }

  useEffect(() => {
    if (mounted) {
      renderPattern()
    }
  }, [colors, backgroundColor, patternType, complexity, scale, noiseScale, seed, mounted])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Pattern Type</Label>
                  <Button variant="ghost" size="sm" onClick={regeneratePattern} className="h-8 px-2">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Randomize
                  </Button>
                </div>
                <Select value={patternType} onValueChange={(value) => setPatternType(value as AbstractPatternType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waves">Waves</SelectItem>
                    <SelectItem value="voronoi">Voronoi</SelectItem>
                    <SelectItem value="geometric">Geometric</SelectItem>
                    <SelectItem value="flow">Flow Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 p-0 border-0 h-8"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 h-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Colors</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addColor}
                      disabled={colors.length >= 8}
                      className="h-8 px-2"
                    >
                      Add Color
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <div key={index} className="relative group">
                      <div
                        className="w-10 h-10 rounded-full cursor-pointer border-2 border-muted-foreground/20"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const colorInput = document.getElementById(`color-input-${index}`) as HTMLInputElement
                          colorInput.click()
                        }}
                      >
                        <Input
                          id={`color-input-${index}`}
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="absolute opacity-0 w-0 h-0"
                        />
                      </div>
                      {colors.length > 1 && (
                        <button
                          onClick={() => removeColor(index)}
                          className="absolute -top-2 -right-2 bg-background rounded-full w-5 h-5 flex items-center justify-center border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Complexity: {complexity}</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[complexity]}
                  onValueChange={(value) => setComplexity(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Scale: {scale}</Label>
                <Slider min={5} max={50} step={1} value={[scale]} onValueChange={(value) => setScale(value[0])} />
              </div>

              <div className="space-y-2">
                <Label>Detail: {noiseScale.toFixed(3)}</Label>
                <Slider
                  min={0.001}
                  max={0.05}
                  step={0.001}
                  value={[noiseScale]}
                  onValueChange={(value) => setNoiseScale(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Seed: {seed}</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSeed(Math.floor(Math.random() * 1000))}
                    className="h-8 px-2"
                  >
                    <Shuffle className="h-4 w-4 mr-1" />
                    New Seed
                  </Button>
                </div>
                <Input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(Number.parseInt(e.target.value))}
                  className="h-8"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={savePattern} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button onClick={downloadPattern} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col">
          <div className="text-lg font-medium mb-2">Preview</div>
          <div className="flex-1 rounded-lg overflow-hidden border">
            {mounted ? (
              <canvas ref={canvasRef} width={800} height={600} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
                <div className="text-muted-foreground">Loading preview...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

