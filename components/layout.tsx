"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: LayoutProps) {
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
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}

