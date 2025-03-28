"use client"

import { useState, useEffect } from "react"
import { TemplateCard } from "./template-card"
import type { Template } from "./template-types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, BadgeAlertIcon as Alert } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TemplateGridProps {
  templates: Template[]
  onRandomize: (template: Template) => Template
}

// Define a type for page numbers that can be either a number or the string "..."
type PageIndicator = number | "..."

export function TemplateGrid({ templates, onRandomize }: TemplateGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const templatesPerPage = 12 // Increased from 9 for better density

  // Reset to page 1 when templates change
  useEffect(() => {
    setCurrentPage(1)
  }, [templates.length])

  // Calculate total pages
  const totalPages = Math.ceil(templates.length / templatesPerPage)

  // Get current templates
  const indexOfLastTemplate = currentPage * templatesPerPage
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage
  const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate)

  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top with offset for sticky header
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Generate page numbers
  const pageNumbers: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  // Calculate visible page numbers (show 3 at a time for mobile, 5 for desktop)
  let visiblePageNumbers: PageIndicator[] = pageNumbers
  if (totalPages > 5) {
    if (currentPage <= 2) {
      visiblePageNumbers = [...pageNumbers.slice(0, 3), "...", totalPages]
    } else if (currentPage >= totalPages - 1) {
      visiblePageNumbers = [1, "...", ...pageNumbers.slice(totalPages - 3)]
    } else {
      visiblePageNumbers = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
    }
  }

  return (
    <div>
      {templates.length === 0 ? (
        <Card className="p-8 mt-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Alert className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No templates found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any templates matching your current filters. Try changing or resetting your filters.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div id="templates-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} onRandomize={onRandomize} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-12">
              <div className="flex items-center gap-1 shadow-sm rounded-lg border overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-none border-r h-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {visiblePageNumbers.map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-4 flex items-center justify-center h-10 border-r">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={`page-${page}`}
                      variant={currentPage === page ? "default" : "ghost"}
                      onClick={() => goToPage(page)}
                      className="rounded-none border-r h-10 min-w-[40px]"
                    >
                      {page}
                    </Button>
                  ),
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-none h-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Count indicator */}
          <div className="text-center text-sm text-muted-foreground mb-6">
            Showing {indexOfFirstTemplate + 1}-{Math.min(indexOfLastTemplate, templates.length)} of {templates.length}{" "}
            templates
          </div>
        </>
      )}
    </div>
  )
}

