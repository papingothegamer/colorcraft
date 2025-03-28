"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { categories, industries, type FilterCategory } from "@/components/templates/template-types"

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
  isHomePage,
}: TemplateFiltersProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base font-medium mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((category: FilterCategory) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-start px-2 h-9"
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-3">Industries</h3>
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 pr-4">
            {industries.map((industry: FilterCategory) => (
              <Button
                key={industry.id}
                variant={selectedIndustry === industry.id ? "default" : "ghost"}
                className="w-full justify-start px-2 h-9"
                onClick={() => onIndustryChange(industry.id)}
              >
                <span className="mr-2">{industry.icon}</span>
                {industry.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

