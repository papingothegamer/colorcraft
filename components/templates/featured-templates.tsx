"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { sampleTemplates, type Template } from "@/components/templates/template-types"
import { Badge } from "@/components/ui/badge"

export function FeaturedTemplates() {
  const [randomTemplates, setRandomTemplates] = useState<Template[]>([])

  useEffect(() => {
    // Get 6 random templates
    const getRandomTemplates = () => {
      const shuffled = [...sampleTemplates].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 6)
    }

    setRandomTemplates(getRandomTemplates())
  }, [])

  if (randomTemplates.length === 0) {
    return null
  }

  return (
    <div className="mt-16 relative">
      {/* Background gradient for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 rounded-xl -z-10" />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Explore Design Templates</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover ready-to-use color templates for various industries and design needs. Find the perfect color scheme
          for your next project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {randomTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div
              className="h-40 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${template.previewUrl})` }}
            />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{template.name}</h3>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {template.category === "saas"
                    ? "SaaS"
                    : template.category === "ui"
                      ? "UI Design"
                      : template.category === "brand"
                        ? "Brand Design"
                        : "Graphic Design"}
                </Badge>
              </div>

              <div className="flex mt-4 gap-1">
                {template.colors.slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border transition-transform hover:scale-110"
                    style={{ backgroundColor: color.value }}
                    title={`${color.name}: ${color.value}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Frosted glass CTA */}
      <div className="relative mt-8 mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg -z-10" />
        <div className="frosted-glass rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Need more options?</h3>
          <p className="text-muted-foreground mb-4">
            Explore our full collection of design templates for every industry and use case.
          </p>
          <Link href="/templates">
            <Button size="lg" className="gap-2">
              Browse All Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

