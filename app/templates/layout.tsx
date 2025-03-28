import type React from "react"
import { MainLayout } from "@/components/layout"

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}

