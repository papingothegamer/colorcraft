import React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { categories, industries, FilterCategory } from "@/components/templates/template-types"
import Link from "next/link"
import { ArrowUpRight, Palette } from "lucide-react"

interface TemplateFiltersProps {
  selectedCategory: string
  selectedIndustry: string
  onCategoryChange: (category: string) => void
  onIndustryChange: (industry: string) => void
  isHomePage: boolean
}

export function TemplateFilters({
  selectedCategory,
  selectedIndustry,
  onCategoryChange,
  onIndustryChange,
  isHomePage
}: TemplateFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category: FilterCategory) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
          {!isHomePage && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onCategoryChange("all")}
            >
              <span className="mr-2">
                <Palette className="h-4 w-4" /></span>
              All Categories
            </Button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Industries</h3>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {industries.map((industry: FilterCategory) => (
              <Button
                key={industry.id}
                variant={selectedIndustry === industry.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => onIndustryChange(industry.id)}
              >
                <span className="mr-2">{industry.icon}</span>
                {industry.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {isHomePage && (
        <Link href="/templates">
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2"><ArrowUpRight className="h-4 w-4" /></span>
            All Categories
          </Button>
        </Link>
      )}
    </div>
  )
}
