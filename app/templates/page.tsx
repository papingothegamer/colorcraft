"use client"

import { useState, useEffect } from "react"
import { Templates } from "@/components/templates"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Templates isHomePage={false} />
        <Footer />
      </div>
    </main>
  )
}
