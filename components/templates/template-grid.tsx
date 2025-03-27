import React from "react"
import { TemplateCard } from "./template-card"
import { Template } from "./template-types"

interface TemplateGridProps {
  templates: Template[]
  onRandomize: (template: Template) => Template
}

export function TemplateGrid({ templates, onRandomize }: TemplateGridProps) {
  return (
    <>
      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">No templates found for the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="flex">
              <TemplateCard 
                template={template} 
                onRandomize={onRandomize} 
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}