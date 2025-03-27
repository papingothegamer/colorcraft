"use client"

import { Github, Share2, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
        <div className="flex items-center">
          <div className="mr-2 p-2 bg-primary rounded-lg text-primary-foreground">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ColorCraft
            </h1>
            <p className="text-muted-foreground mt-1">Design templates & color palettes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => window.open("https://github.com", "_blank")}>
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              navigator
                .share?.({
                  title: "ColorCraft - Design Templates & Color Palette Generator",
                  url: window.location.href,
                })
                .catch(() => {
                  navigator.clipboard.writeText(window.location.href)
                })
            }}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

