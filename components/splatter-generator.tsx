"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Download, Share2, Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { generateRandomColor } from "@/lib/color-utils"
import type { SplatterConfig } from "@/types/color-types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SplatterGeneratorProps {
  onSave: (splatter: SplatterConfig) => void
}

export function SplatterGenerator({ onSave }: SplatterGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [colors, setColors] = useState<string[]>([generateRandomColor(), generateRandomColor(), generateRandomColor()])
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
  const [splatterCount, setSplatterCount] = useState<number>(50)
  const [minSize, setMinSize] = useState<number>(10)
  const [maxSize, setMaxSize] = useState<number>(50)
  const [blur, setBlur] = useState<number>(0)
  const [opacity, setOpacity] = useState<number>(0.7)
  const [useBlending, setUseBlending] = useState<boolean>(true)
  const [resolution, setResolution] = useState<{ width: number; height: number }>({ width: 1920, height: 1080 })
  const [seed, setSeed] = useState<number>(Math.floor(Math.random() * 10000))
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("design")

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

  const regenerateSplatter = () => {
    setColors(colors.map(() => generateRandomColor()))
    setSeed(Math.floor(Math.random() * 10000))
    if (mounted) {
      renderSplatter()
    }
  }

  const renderSplatter = () => {
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

      // Set blending mode
      if (useBlending) {
        ctx.globalCompositeOperation = "multiply"
      } else {
        ctx.globalCompositeOperation = "source-over"
      }

      // Set blur
      ctx.filter = `blur(${blur}px)`

      // Use deterministic random with seed
      const random = (min: number, max: number, index: number) => {
        const x = Math.sin(seed * index) * 10000
        const rand = x - Math.floor(x)
        return min + rand * (max - min)
      }

      // Draw splatters
      for (let i = 0; i < splatterCount; i++) {
        const color = colors[Math.floor(random(0, colors.length, i * 0.1))]
        const size = random(minSize, maxSize, i * 0.2)
        const x = random(0, width, i * 0.3)
        const y = random(0, height, i * 0.4)

        ctx.globalAlpha = opacity
        ctx.fillStyle = color

        // Draw a splatter (irregular shape)
        ctx.beginPath()

        // Main blob
        ctx.ellipse(x, y, size, size * (0.5 + random(0, 0.5, i * 0.5)), random(0, Math.PI * 2, i * 0.6), 0, Math.PI * 2)

        // Add some random smaller blobs around the main one
        const smallBlobCount = Math.floor(random(3, 8, i * 0.7))
        for (let j = 0; j < smallBlobCount; j++) {
          const angle = random(0, Math.PI * 2, i * j * 0.01)
          const distance = size * (0.3 + random(0, 0.7, i * j * 0.02))
          const blobSize = size * (0.2 + random(0, 0.4, i * j * 0.03))

          ctx.ellipse(
            x + Math.cos(angle) * distance,
            y + Math.sin(angle) * distance,
            blobSize,
            blobSize * (0.5 + random(0, 0.5, i * j * 0.04)),
            random(0, Math.PI * 2, i * j * 0.05),
            0,
            Math.PI * 2,
          )
        }

        ctx.fill()
      }

      // Reset composite operation and filter
      ctx.globalCompositeOperation = "source-over"
      ctx.filter = "none"
      ctx.globalAlpha = 1
    } catch (error) {
      console.error("Error rendering splatter:", error)
    }
  }

  const downloadSplatter = () => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (canvas) {
      try {
        // Set canvas to the desired resolution
        canvas.width = resolution.width
        canvas.height = resolution.height

        // Render at the new resolution
        renderSplatter()

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "splatter-pattern.png"
              a.click()
              URL.revokeObjectURL(url)

              toast({
                title: "Splatter downloaded!",
                description: `Downloaded at ${resolution.width}x${resolution.height} resolution.`,
                duration: 2000,
              })
            }
          },
          "image/png",
          1.0,
        )
      } catch (error) {
        console.error("Error downloading splatter:", error)
        toast({
          title: "Download failed",
          description: "There was an error downloading your splatter pattern.",
          duration: 2000,
        })
      }
    }
  }

  const copySplatterConfig = () => {
    const config = {
      colors,
      backgroundColor,
      splatterCount,
      minSize,
      maxSize,
      blur,
      opacity,
      useBlending,
      seed,
    }

    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    toast({
      title: "Configuration copied!",
      description: "Splatter configuration has been copied to your clipboard.",
      duration: 2000,
    })
  }

  const shareSplatter = () => {
    const shareText = `Check out this splatter pattern on ColorCraft!\n\nColors: ${colors.join(", ")}\nBackground: ${backgroundColor}`

    if (navigator.share) {
      navigator
        .share({
          title: "ColorCraft Splatter Pattern",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(shareText)
          toast({
            title: "Copied to clipboard!",
            description: "Splatter details copied to clipboard for sharing.",
            duration: 2000,
          })
        })
    } else {
      navigator.clipboard.writeText(shareText)
      toast({
        title: "Copied to clipboard!",
        description: "Splatter details copied to clipboard for sharing.",
        duration: 2000,
      })
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

  // Splatter presets
  const splatterPresets = [
    {
      name: "Colorful Chaos",
      colors: ["#FF5252", "#FFEB3B", "#2196F3", "#4CAF50"],
      backgroundColor: "#FFFFFF",
      splatterCount: 80,
      minSize: 15,
      maxSize: 60,
      blur: 2,
      opacity: 0.7,
      useBlending: true,
    },
    {
      name: "Monochrome Splash",
      colors: ["#000000", "#333333", "#666666", "#999999"],
      backgroundColor: "#FFFFFF",
      splatterCount: 60,
      minSize: 10,
      maxSize: 50,
      blur: 0,
      opacity: 0.8,
      useBlending: false,
    },
    {
      name: "Pastel Dream",
      colors: ["#FFD3E8", "#D3F8FF", "#FFF9D3", "#D3FFD8"],
      backgroundColor: "#FFFFFF",
      splatterCount: 100,
      minSize: 20,
      maxSize: 70,
      blur: 5,
      opacity: 0.6,
      useBlending: true,
    },
    {
      name: "Bold Contrast",
      colors: ["#FF0000", "#00FF00", "#0000FF"],
      backgroundColor: "#000000",
      splatterCount: 40,
      minSize: 30,
      maxSize: 80,
      blur: 0,
      opacity: 0.9,
      useBlending: false,
    },
    {
      name: "Watercolor",
      colors: ["#88D8C0", "#8E78FF", "#FF78A8"],
      backgroundColor: "#F5F5F5",
      splatterCount: 30,
      minSize: 40,
      maxSize: 120,
      blur: 8,
      opacity: 0.4,
      useBlending: true,
    },
    {
      name: "Neon Explosion",
      colors: ["#FF00FF", "#00FFFF", "#FFFF00"],
      backgroundColor: "#000000",
      splatterCount: 70,
      minSize: 5,
      maxSize: 40,
      blur: 3,
      opacity: 1.0,
      useBlending: false,
    },
  ]

  const applyPreset = (preset: (typeof splatterPresets)[0]) => {
    setColors(preset.colors)
    setBackgroundColor(preset.backgroundColor)
    setSplatterCount(preset.splatterCount)
    setMinSize(preset.minSize)
    setMaxSize(preset.maxSize)
    setBlur(preset.blur)
    setOpacity(preset.opacity)
    setUseBlending(preset.useBlending)
    setSeed(Math.floor(Math.random() * 10000)) // New seed for fresh look
  }

  const applyResolutionPreset = (preset: (typeof resolutionPresets)[0]) => {
    setResolution({ width: preset.width, height: preset.height })
  }

  useEffect(() => {
    if (mounted) {
      renderSplatter()
    }
  }, [colors, backgroundColor, splatterCount, minSize, maxSize, blur, opacity, useBlending, seed, mounted])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="design" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>

                <TabsContent value="design" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Background Color</Label>
                      <Button variant="ghost" size="sm" onClick={regenerateSplatter} className="h-8 px-2">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Randomize
                      </Button>
                    </div>
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
                      <Label>Splatter Colors</Label>
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
                    <Label>Splatter Count: {splatterCount}</Label>
                    <Slider
                      min={10}
                      max={200}
                      step={1}
                      value={[splatterCount]}
                      onValueChange={(value) => setSplatterCount(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Size Range: {minSize} - {maxSize}px
                    </Label>
                    <Slider
                      min={5}
                      max={100}
                      step={1}
                      value={[minSize, maxSize]}
                      onValueChange={(value) => {
                        setMinSize(value[0])
                        setMaxSize(value[1])
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Blur: {blur}px</Label>
                    <Slider min={0} max={20} step={1} value={[blur]} onValueChange={(value) => setBlur(value[0])} />
                  </div>

                  <div className="space-y-2">
                    <Label>Opacity: {opacity.toFixed(2)}</Label>
                    <Slider
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0])}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="blending-mode" checked={useBlending} onCheckedChange={setUseBlending} />
                    <Label htmlFor="blending-mode">Use Blending Mode</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Seed: {seed}</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(Number.parseInt(e.target.value) || 0)}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={() => setSeed(Math.floor(Math.random() * 10000))}>
                        Randomize
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="presets" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {splatterPresets.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 relative overflow-hidden"
                        onClick={() => applyPreset(preset)}
                      >
                        <div className="absolute inset-0 opacity-80 flex">
                          {preset.colors.map((color, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                          ))}
                        </div>
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
                    <Button onClick={downloadSplatter} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download ({resolution.width}x{resolution.height})
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button onClick={copySplatterConfig} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Config
                </Button>
                <Button onClick={shareSplatter} variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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

