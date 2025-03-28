"use client"

import { useState, useEffect } from "react"
import { TemplateFilters } from "@/components/templates/template-filters"
import { TemplateGrid } from "@/components/templates/template-grid"
import { sampleTemplates, type Template, categories, industries } from "@/components/templates/template-types"
import { generateRandomColor } from "@/lib/color-utils"
import { Button } from "@/components/ui/button"
import { XCircle, SlidersHorizontal, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TemplatesProps {
  isHomePage: boolean
}

export function Templates({ isHomePage }: TemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [isFilterBarOpen, setIsFilterBarOpen] = useState<boolean>(false)
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  // Check if we're in a mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobileView()
    window.addEventListener("resize", checkMobileView)

    return () => window.removeEventListener("resize", checkMobileView)
  }, [])

  // Filter templates based on selected category and industry
  const filteredTemplates = sampleTemplates
    .filter((template) => {
      const categoryMatch = selectedCategory === "all" || template.category === selectedCategory
      const industryMatch = selectedIndustry === "all" || template.industry === selectedIndustry
      return categoryMatch && industryMatch
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id.localeCompare(a.id)
      if (sortBy === "oldest") return a.id.localeCompare(b.id)
      if (sortBy === "name-asc") return a.name.localeCompare(b.name)
      if (sortBy === "name-desc") return b.name.localeCompare(a.name)
      return 0
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

  const hasActiveFilters = selectedCategory !== "all" || selectedIndustry !== "all"

  const categoryName = categories.find((c) => c.id === selectedCategory)?.name || "All Categories"
  const industryName = industries.find((i) => i.id === selectedIndustry)?.name || "All Industries"

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Sticky header section */}
      <div className="sticky top-[64px] z-40 bg-background pt-4 pb-2 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold">Design Templates</h2>
            <p className="text-muted-foreground mt-1">
              Ready-to-use color templates for various industries and design needs
            </p>
          </div>

          {isMobileView ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && <Badge className="ml-2 bg-primary">{filteredTemplates.length}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-6">
                  <h3 className="text-lg font-medium mb-4">Filters</h3>
                  <TemplateFilters
                    selectedCategory={selectedCategory}
                    selectedIndustry={selectedIndustry}
                    onCategoryChange={setSelectedCategory}
                    onIndustryChange={setSelectedIndustry}
                    isHomePage={isHomePage}
                  />

                  {hasActiveFilters && (
                    <Button variant="outline" className="mt-6 w-full" onClick={resetFilters}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reset Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant={isFilterBarOpen ? "default" : "outline"}
                onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {isFilterBarOpen ? "Hide Filters" : "Show Filters"}
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Horizontal filter bar for desktop */}
        {isFilterBarOpen && !isMobileView && (
          <div className="mt-4 pb-4 flex flex-wrap gap-2 items-center">
            <div className="flex-none mr-2">
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <div className="mr-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <span className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mr-4">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      <span className="flex items-center">
                        <span className="mr-2">{industry.icon}</span>
                        {industry.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9">
                <XCircle className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        )}

        {/* Active filter indicators */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2 pb-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {categoryName}
                <XCircle className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}

            {selectedIndustry !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Industry: {industryName}
                <XCircle className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedIndustry("all")} />
              </Badge>
            )}

            <Badge variant="outline">{filteredTemplates.length} templates found</Badge>
          </div>
        )}
      </div>

      {/* Main content with grid */}
      <div className="mt-6">
        <TemplateGrid templates={filteredTemplates} onRandomize={randomizeColors} />
      </div>
    </div>
  )
}

