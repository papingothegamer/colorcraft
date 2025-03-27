import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RefreshCw, Copy, Share2, Download } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Template, categories, industries } from "./template-types"

interface TemplateCardProps {
  template: Template
  onRandomize: (template: Template) => Template
}

export function TemplateCard({ template, onRandomize }: TemplateCardProps) {
  const [localTemplate, setLocalTemplate] = useState<Template>(template)

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
      duration: 2000,
    })
  }

  const copyAllColors = () => {
    const colorText = localTemplate.colors.map((c) => `${c.name}: ${c.value}`).join("\n")
    navigator.clipboard.writeText(colorText)
    toast({
      title: "Colors copied!",
      description: "All colors have been copied to your clipboard.",
      duration: 2000,
    })
  }

  const exportTemplate = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localTemplate, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `${localTemplate.name.toLowerCase().replace(/\s+/g, "-")}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    toast({
      title: "Template exported!",
      description: "Template has been exported as JSON.",
      duration: 2000,
    })
  }

  const shareTemplate = () => {
    const shareText = `Check out this ${localTemplate.name} color palette on ColorCraft:\n\n${localTemplate.colors.map((c) => `${c.name}: ${c.value}`).join("\n")}`

    if (navigator.share) {
      navigator
        .share({
          title: `ColorCraft - ${localTemplate.name}`,
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
    const randomizedTemplate = onRandomize(localTemplate)
    setLocalTemplate(randomizedTemplate)
  }

  return (
    <Card className="w-[350px] h-[420px] overflow-hidden flex flex-col">
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${localTemplate.previewUrl})` }}
      />
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{localTemplate.name}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {categories.find((c) => c.id === localTemplate.category)?.name}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {industries.find((i) => i.id === localTemplate.industry)?.name}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex mt-4 gap-1">
          {localTemplate.colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: color.value }}
              onClick={() => copyColor(color.value)}
              title={`${color.name}: ${color.value}`}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRandomize}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Randomize
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{localTemplate.name}</DialogTitle>
              <DialogDescription>
                A template for {industries.find((i) => i.id === localTemplate.industry)?.name} in the{" "}
                {categories.find((c) => c.id === localTemplate.category)?.name} category.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div
                className="h-48 w-full bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${localTemplate.previewUrl})` }}
              />

              <div className="grid grid-cols-2 gap-4">
                {localTemplate.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{color.name}</div>
                      <div className="text-sm text-muted-foreground font-mono">{color.value}</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyColor(color.value)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleRandomize}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Randomize Colors
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyAllColors}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                  <Button variant="outline" onClick={exportTemplate}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={shareTemplate}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
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