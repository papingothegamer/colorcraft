"use client"

import { useState, useEffect } from "react"
import { ColorGenerator } from "@/components/color-generator"
import { Templates } from "@/components/templates"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ColorGenerator />
        <Templates isHomePage={true} />
        <Footer />
      </div>
    </main>
  )
}
