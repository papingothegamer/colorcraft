"use client"

import { Palette } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="mr-2 p-2 bg-primary rounded-lg text-primary-foreground">
        <Palette className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ColorCraft
        </h1>
        <p className="text-muted-foreground mt-1">Design templates & color palettes</p>
      </div>
    </Link>
  )
}