"use client"

import { useState, useEffect } from "react"
import { FeaturedTemplates } from "@/components/templates/featured-templates"
import { Button } from "@/components/ui/button"
import { Palette, GalleryHorizontalEnd, Droplets, Layers, ArrowRight } from "lucide-react"
import Link from "next/link"
import { MainLayout } from "@/components/layout"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </main>
    )
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Create stunning{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  color palettes
                </span>{" "}
                for your designs
              </h1>
              <p className="text-xl text-muted-foreground">
                ColorCraft helps you generate beautiful color schemes, gradients, and patterns for your projects.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/tools/palette">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-6 w-full max-w-md">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-md shadow-sm animate-pulse-slow"
                        style={{
                          backgroundColor: [
                            "#8b5cf6",
                            "#ec4899",
                            "#f43f5e",
                            "#3b82f6",
                            "#06b6d4",
                            "#10b981",
                            "#f59e0b",
                            "#8b5cf6",
                            "#ec4899",
                          ][i],
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Color Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/tools/palette" className="block group">
              <div className="bg-background rounded-lg p-6 shadow-sm h-full border transition-all hover:shadow-md hover:border-primary/50">
                <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Color Palettes
                </h3>
                <p className="text-muted-foreground">
                  Generate harmonious color combinations for your projects with various color schemes.
                </p>
              </div>
            </Link>
            <Link href="/tools/gradient" className="block group">
              <div className="bg-background rounded-lg p-6 shadow-sm h-full border transition-all hover:shadow-md hover:border-primary/50">
                <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <GalleryHorizontalEnd className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Gradients</h3>
                <p className="text-muted-foreground">
                  Create beautiful linear, radial, and conic gradients with customizable color stops.
                </p>
              </div>
            </Link>
            <Link href="/tools/splatter" className="block group">
              <div className="bg-background rounded-lg p-6 shadow-sm h-full border transition-all hover:shadow-md hover:border-primary/50">
                <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Splatters</h3>
                <p className="text-muted-foreground">
                  Generate vibrant splatter patterns with customizable colors and settings.
                </p>
              </div>
            </Link>
            <Link href="/tools/abstract" className="block group">
              <div className="bg-background rounded-lg p-6 shadow-sm h-full border transition-all hover:shadow-md hover:border-primary/50">
                <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Abstract Patterns
                </h3>
                <p className="text-muted-foreground">
                  Create unique abstract patterns with waves, geometric shapes, and more.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <FeaturedTemplates />
        </div>
      </section>
    </MainLayout>
  )
}

