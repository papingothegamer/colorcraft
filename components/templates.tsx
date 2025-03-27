"use client"

import React, { useState } from "react"
import { TemplateFilters } from "@/components/templates/template-filters"
import { TemplateGrid } from "@/components/templates/template-grid"
import { sampleTemplates, Template } from "@/components/templates/template-types"
import { generateRandomColor } from "@/lib/color-utils"

interface TemplatesProps {
  isHomePage: boolean
}

export function Templates({ isHomePage }: TemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")

  // Filter templates based on selected category and industry
  const filteredTemplates = sampleTemplates.filter((template) => {
    const categoryMatch = selectedCategory === "all" || template.category === selectedCategory
    const industryMatch = selectedIndustry === "all" || template.industry === selectedIndustry
    return categoryMatch && industryMatch
  })

  // Randomize colors for a template
  const randomizeColors = (template: Template) => {
    const newTemplate = { ...template }
    newTemplate.colors = template.colors.map((color) => ({
      ...color,
      value: generateRandomColor(),
    }))
    return newTemplate
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedIndustry("all")
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold">Design Templates</h2>
            <p className="text-muted-foreground mt-1">
              Ready-to-use color templates for various industries and design needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <TemplateFilters
            selectedCategory={selectedCategory}
            selectedIndustry={selectedIndustry}
            onCategoryChange={setSelectedCategory}
            onIndustryChange={setSelectedIndustry}
            isHomePage={isHomePage}
          />

          <TemplateGrid 
            templates={filteredTemplates} 
            onRandomize={randomizeColors}
          />
        </div>
      </div>
    </div>
  )
}
