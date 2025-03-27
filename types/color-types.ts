export interface Palette {
  id: string
  colors: string[]
  timestamp: string
}

export type ColorScheme = "random" | "monochromatic" | "analogous" | "complementary" | "triadic" | "tetradic"

export type GradientType = "linear" | "radial" | "conic"

export interface GradientConfig {
  id: string
  colors: string[]
  stops: number[]
  angle: number
  type: GradientType
  timestamp: string
}

export interface SplatterConfig {
  id: string
  colors: string[]
  backgroundColor: string
  splatterCount: number
  minSize: number
  maxSize: number
  blur: number
  opacity: number
  useBlending: boolean
  timestamp: string
}

export type AbstractPatternType = "waves" | "voronoi" | "geometric" | "flow"

export interface AbstractConfig {
  id: string
  colors: string[]
  backgroundColor: string
  patternType: AbstractPatternType
  complexity: number
  scale: number
  noiseScale: number
  seed: number
  timestamp: string
}

