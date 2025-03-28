import type React from "react"
import {
  Laptop,
  Smartphone,
  ShoppingBag,
  Briefcase,
  Film,
  Dumbbell,
  Stethoscope,
  Code,
  Palette,
  Share2,
  BookOpen,
  Utensils,
  Plane,
  Car,
  Building,
  Music,
  Heart,
  Landmark,
} from "lucide-react"

// Template data types
interface TemplateColor {
  name: string
  value: string
}

export interface Template {
  id: string
  name: string
  category: string
  industry: string
  colors: TemplateColor[]
  previewUrl: string
}

export interface FilterCategory {
  id: string
  name: string
  icon: React.ReactNode
}

// Sample template data
export const sampleTemplates: Template[] = [
  // SaaS Templates
  {
    id: "saas-1",
    name: "Modern SaaS Dashboard",
    category: "saas",
    industry: "tech",
    colors: [
      { name: "Primary", value: "#6366f1" },
      { name: "Secondary", value: "#10b981" },
      { name: "Accent", value: "#f97316" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1f2937" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "saas-2",
    name: "Analytics Platform",
    category: "saas",
    industry: "tech",
    colors: [
      { name: "Primary", value: "#3b82f6" },
      { name: "Secondary", value: "#8b5cf6" },
      { name: "Accent", value: "#ec4899" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "saas-3",
    name: "Project Management Tool",
    category: "saas",
    industry: "tech",
    colors: [
      { name: "Primary", value: "#0ea5e9" },
      { name: "Secondary", value: "#22c55e" },
      { name: "Accent", value: "#f43f5e" },
      { name: "Background", value: "#f9fafb" },
      { name: "Text", value: "#111827" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "saas-4",
    name: "Customer Support Portal",
    category: "saas",
    industry: "tech",
    colors: [
      { name: "Primary", value: "#0284c7" },
      { name: "Secondary", value: "#4f46e5" },
      { name: "Accent", value: "#f59e0b" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // UI Design Templates
  {
    id: "ui-1",
    name: "Minimalist Portfolio",
    category: "ui",
    industry: "creative",
    colors: [
      { name: "Primary", value: "#18181b" },
      { name: "Secondary", value: "#a1a1aa" },
      { name: "Accent", value: "#f43f5e" },
      { name: "Background", value: "#fafafa" },
      { name: "Text", value: "#27272a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "ui-2",
    name: "E-commerce Product Page",
    category: "ui",
    industry: "retail",
    colors: [
      { name: "Primary", value: "#4f46e5" },
      { name: "Secondary", value: "#f97316" },
      { name: "Accent", value: "#06b6d4" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "ui-3",
    name: "Mobile Banking App",
    category: "ui",
    industry: "finance",
    colors: [
      { name: "Primary", value: "#0f172a" },
      { name: "Secondary", value: "#3b82f6" },
      { name: "Accent", value: "#22c55e" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "ui-4",
    name: "Travel Booking Platform",
    category: "ui",
    industry: "travel",
    colors: [
      { name: "Primary", value: "#0369a1" },
      { name: "Secondary", value: "#f59e0b" },
      { name: "Accent", value: "#ef4444" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "ui-5",
    name: "Food Delivery App",
    category: "ui",
    industry: "food",
    colors: [
      { name: "Primary", value: "#ef4444" },
      { name: "Secondary", value: "#f97316" },
      { name: "Accent", value: "#84cc16" },
      { name: "Background", value: "#f9fafb" },
      { name: "Text", value: "#1f2937" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Brand Design Templates
  {
    id: "brand-1",
    name: "Tech Startup",
    category: "brand",
    industry: "tech",
    colors: [
      { name: "Primary", value: "#2563eb" },
      { name: "Secondary", value: "#7c3aed" },
      { name: "Accent", value: "#14b8a6" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "brand-2",
    name: "Fitness Brand",
    category: "brand",
    industry: "sports",
    colors: [
      { name: "Primary", value: "#16a34a" },
      { name: "Secondary", value: "#facc15" },
      { name: "Accent", value: "#0ea5e9" },
      { name: "Background", value: "#f9fafb" },
      { name: "Text", value: "#111827" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "brand-3",
    name: "Luxury Fashion",
    category: "brand",
    industry: "fashion",
    colors: [
      { name: "Primary", value: "#000000" },
      { name: "Secondary", value: "#a16207" },
      { name: "Accent", value: "#d1d5db" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1f2937" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "brand-4",
    name: "Organic Food",
    category: "brand",
    industry: "food",
    colors: [
      { name: "Primary", value: "#65a30d" },
      { name: "Secondary", value: "#ca8a04" },
      { name: "Accent", value: "#f97316" },
      { name: "Background", value: "#f9fafb" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "brand-5",
    name: "Educational Institution",
    category: "brand",
    industry: "education",
    colors: [
      { name: "Primary", value: "#1d4ed8" },
      { name: "Secondary", value: "#b91c1c" },
      { name: "Accent", value: "#ca8a04" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Graphic Design Templates
  {
    id: "graphic-1",
    name: "Social Media Kit",
    category: "graphic",
    industry: "marketing",
    colors: [
      { name: "Primary", value: "#ec4899" },
      { name: "Secondary", value: "#8b5cf6" },
      { name: "Accent", value: "#06b6d4" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "graphic-2",
    name: "Event Poster",
    category: "graphic",
    industry: "entertainment",
    colors: [
      { name: "Primary", value: "#f43f5e" },
      { name: "Secondary", value: "#8b5cf6" },
      { name: "Accent", value: "#fbbf24" },
      { name: "Background", value: "#0f172a" },
      { name: "Text", value: "#f8fafc" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "graphic-3",
    name: "Corporate Brochure",
    category: "graphic",
    industry: "business",
    colors: [
      { name: "Primary", value: "#0f172a" },
      { name: "Secondary", value: "#1e40af" },
      { name: "Accent", value: "#f59e0b" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1f2937" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "graphic-4",
    name: "Wedding Invitation",
    category: "graphic",
    industry: "events",
    colors: [
      { name: "Primary", value: "#be185d" },
      { name: "Secondary", value: "#a78bfa" },
      { name: "Accent", value: "#fcd34d" },
      { name: "Background", value: "#fdf2f8" },
      { name: "Text", value: "#831843" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "graphic-5",
    name: "Magazine Layout",
    category: "graphic",
    industry: "publishing",
    colors: [
      { name: "Primary", value: "#18181b" },
      { name: "Secondary", value: "#ef4444" },
      { name: "Accent", value: "#a3a3a3" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#27272a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Healthcare Templates
  {
    id: "health-1",
    name: "Medical Dashboard",
    category: "saas",
    industry: "healthcare",
    colors: [
      { name: "Primary", value: "#0ea5e9" },
      { name: "Secondary", value: "#14b8a6" },
      { name: "Accent", value: "#f43f5e" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "health-2",
    name: "Pharmacy Website",
    category: "ui",
    industry: "healthcare",
    colors: [
      { name: "Primary", value: "#059669" },
      { name: "Secondary", value: "#0284c7" },
      { name: "Accent", value: "#f97316" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "health-3",
    name: "Mental Health App",
    category: "ui",
    industry: "healthcare",
    colors: [
      { name: "Primary", value: "#8b5cf6" },
      { name: "Secondary", value: "#06b6d4" },
      { name: "Accent", value: "#f59e0b" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Sports Templates
  {
    id: "sports-1",
    name: "Team Website",
    category: "ui",
    industry: "sports",
    colors: [
      { name: "Primary", value: "#dc2626" },
      { name: "Secondary", value: "#1d4ed8" },
      { name: "Accent", value: "#fbbf24" },
      { name: "Background", value: "#f9fafb" },
      { name: "Text", value: "#111827" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "sports-2",
    name: "Fitness App",
    category: "ui",
    industry: "sports",
    colors: [
      { name: "Primary", value: "#16a34a" },
      { name: "Secondary", value: "#0ea5e9" },
      { name: "Accent", value: "#f97316" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Finance Templates
  {
    id: "finance-1",
    name: "Investment Platform",
    category: "saas",
    industry: "finance",
    colors: [
      { name: "Primary", value: "#0f172a" },
      { name: "Secondary", value: "#047857" },
      { name: "Accent", value: "#f59e0b" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "finance-2",
    name: "Banking Website",
    category: "ui",
    industry: "finance",
    colors: [
      { name: "Primary", value: "#1e40af" },
      { name: "Secondary", value: "#0f766e" },
      { name: "Accent", value: "#b91c1c" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Education Templates
  {
    id: "edu-1",
    name: "Online Learning Platform",
    category: "saas",
    industry: "education",
    colors: [
      { name: "Primary", value: "#4f46e5" },
      { name: "Secondary", value: "#0ea5e9" },
      { name: "Accent", value: "#f97316" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "edu-2",
    name: "University Website",
    category: "ui",
    industry: "education",
    colors: [
      { name: "Primary", value: "#7c3aed" },
      { name: "Secondary", value: "#b91c1c" },
      { name: "Accent", value: "#ca8a04" },
      { name: "Background", value: "#f9fafb" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Travel Templates
  {
    id: "travel-1",
    name: "Travel Blog",
    category: "ui",
    industry: "travel",
    colors: [
      { name: "Primary", value: "#0369a1" },
      { name: "Secondary", value: "#15803d" },
      { name: "Accent", value: "#f59e0b" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "travel-2",
    name: "Hotel Booking App",
    category: "ui",
    industry: "travel",
    colors: [
      { name: "Primary", value: "#0c4a6e" },
      { name: "Secondary", value: "#b45309" },
      { name: "Accent", value: "#be185d" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Automotive Templates
  {
    id: "auto-1",
    name: "Car Dealership",
    category: "ui",
    industry: "automotive",
    colors: [
      { name: "Primary", value: "#1e293b" },
      { name: "Secondary", value: "#b91c1c" },
      { name: "Accent", value: "#f59e0b" },
      { name: "Background", value: "#f8fafc" },
      { name: "Text", value: "#0f172a" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },

  // Real Estate Templates
  {
    id: "realestate-1",
    name: "Property Listing",
    category: "ui",
    industry: "realestate",
    colors: [
      { name: "Primary", value: "#0f766e" },
      { name: "Secondary", value: "#4f46e5" },
      { name: "Accent", value: "#f97316" },
      { name: "Background", value: "#ffffff" },
      { name: "Text", value: "#1e293b" },
    ],
    previewUrl: "/placeholder.svg?height=300&width=400",
  },
]

// Categories and industries for filtering
export const categories: FilterCategory[] = [
  { id: "all", name: "All Categories", icon: <Palette className="h-4 w-4" /> },
  { id: "saas", name: "SaaS", icon: <Laptop className="h-4 w-4" /> },
  { id: "ui", name: "UI Design", icon: <Smartphone className="h-4 w-4" /> },
  { id: "brand", name: "Brand Design", icon: <Briefcase className="h-4 w-4" /> },
  { id: "graphic", name: "Graphic Design", icon: <Palette className="h-4 w-4" /> },
]

export const industries: FilterCategory[] = [
  { id: "all", name: "All Industries", icon: <Briefcase className="h-4 w-4" /> },
  { id: "tech", name: "Technology", icon: <Code className="h-4 w-4" /> },
  { id: "retail", name: "Retail", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "healthcare", name: "Healthcare", icon: <Stethoscope className="h-4 w-4" /> },
  { id: "sports", name: "Sports", icon: <Dumbbell className="h-4 w-4" /> },
  { id: "entertainment", name: "Entertainment", icon: <Film className="h-4 w-4" /> },
  { id: "creative", name: "Creative", icon: <Palette className="h-4 w-4" /> },
  { id: "marketing", name: "Marketing", icon: <Share2 className="h-4 w-4" /> },
  { id: "finance", name: "Finance", icon: <Landmark className="h-4 w-4" /> },
  { id: "education", name: "Education", icon: <BookOpen className="h-4 w-4" /> },
  { id: "food", name: "Food & Beverage", icon: <Utensils className="h-4 w-4" /> },
  { id: "travel", name: "Travel", icon: <Plane className="h-4 w-4" /> },
  { id: "automotive", name: "Automotive", icon: <Car className="h-4 w-4" /> },
  { id: "realestate", name: "Real Estate", icon: <Building className="h-4 w-4" /> },
  { id: "fashion", name: "Fashion", icon: <Heart className="h-4 w-4" /> },
  { id: "publishing", name: "Publishing", icon: <BookOpen className="h-4 w-4" /> },
  { id: "events", name: "Events", icon: <Music className="h-4 w-4" /> },
  { id: "business", name: "Business", icon: <Briefcase className="h-4 w-4" /> },
]

