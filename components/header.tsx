"use client"

import { Github, Share2, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { Logo } from "./logo"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
        <Logo />
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
          <Link href="/templates">
            <Button variant="outline" size="icon">
              <Palette className="h-4 w-4" />
              <span className="sr-only">Templates</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}