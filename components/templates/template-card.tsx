"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Copy, Download, Share2, Info } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Template } from "./template-types"
import { categories, industries } from "./template-types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TemplateCardProps {
  template: Template
  onRandomize: (template: Template) => Template
}

export function TemplateCard({ template, onRandomize }: TemplateCardProps) {
  const [currentTemplate, setCurrentTemplate] = useState<Template>(template)

  // Copy color to clipboard
  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
      duration: 2000,
    })
  }

  // Copy all colors to clipboard
  const copyAllColors = (template: Template) => {
    const colorText = template.colors.map((c) => `${c.name}: ${c.value}`).join("\n")
    navigator.clipboard.writeText(colorText)
    toast({
      title: "Colors copied!",
      description: "All colors have been copied to your clipboard.",
      duration: 2000,
    })
  }

  // Export template as JSON
  const exportTemplate = (template: Template) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `${template.name.toLowerCase().replace(/\s+/g, "-")}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    toast({
      title: "Template exported!",
      description: "Template has been exported as JSON.",
      duration: 2000,
    })
  }

  // Share template
  const shareTemplate = (template: Template) => {
    const shareText = `Check out this ${template.name} color palette on ColorCraft:\n\n${template.colors
      .map((c) => `${c.name}: ${c.value}`)
      .join("\n")}`

    if (navigator.share) {
      navigator
        .share({
          title: `ColorCraft - ${template.name}`,
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(shareText)
          toast({
            title: "Copied to clipboard!",
            description: "Template details copied to clipboard for sharing.",
            duration: 2000,
          })
        })
    } else {
      navigator.clipboard.writeText(shareText)
      toast({
        title: "Copied to clipboard!",
        description: "Template details copied to clipboard for sharing.",
        duration: 2000,
      })
    }
  }

  const handleRandomize = () => {
    const randomized = onRandomize(currentTemplate)
    setCurrentTemplate(randomized)
  }

  const categoryName = categories.find((c) => c.id === currentTemplate.category)?.name || "Unknown"
  const industryName = industries.find((i) => i.id === currentTemplate.industry)?.name || "Unknown"

  return (
    <Card className="overflow-hidden flex flex-col w-full h-full group hover:shadow-md transition-shadow">
      <div
        className="h-48 w-full bg-cover bg-center group-hover:opacity-95 transition-opacity"
        style={{ backgroundImage: `url(${currentTemplate.previewUrl})` }}
      >
        <div className="relative w-full h-full p-2">
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge className="bg-primary/90 hover:bg-primary">{categoryName}</Badge>
            <Badge variant="outline" className="bg-background/60">
              {industryName}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
            {currentTemplate.name}
          </h3>
        </div>

        <div className="flex mt-3 gap-1 flex-wrap">
          {currentTemplate.colors.map((color, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="w-8 h-8 rounded-full border cursor-pointer transition-transform hover:scale-110 hover:shadow-sm"
                    style={{ backgroundColor: color.value }}
                    onClick={() => copyColor(color.value)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {color.name}: {color.value}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between border-t mt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={handleRandomize}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Randomize Colors</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="gap-1">
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{currentTemplate.name}</DialogTitle>
              <DialogDescription>
                A template for {industries.find((i) => i.id === currentTemplate.industry)?.name} in the{" "}
                {categories.find((c) => c.id === currentTemplate.category)?.name} category.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div
                className="h-48 w-full bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${currentTemplate.previewUrl})` }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentTemplate.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color.value }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{color.name}</div>
                      <div className="text-sm text-muted-foreground font-mono truncate">{color.value}</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyColor(color.value)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <Button variant="outline" onClick={handleRandomize} className="w-full sm:w-auto">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Randomize Colors
                </Button>
                <div className="flex flex-wrap gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => copyAllColors(currentTemplate)}
                    className="flex-1 sm:flex-none"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Copy All</span>
                    <span className="sm:hidden">Copy</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => exportTemplate(currentTemplate)}
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Export</span>
                    <span className="sm:hidden">Export</span>
                  </Button>
                  <Button onClick={() => shareTemplate(currentTemplate)} className="flex-1 sm:flex-none">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Share</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

