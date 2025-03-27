import type { ColorScheme } from "@/types/color-types"

// Generate a random hex color
export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`
}

// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

// Get a contrasting color (black or white) based on the background color
export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor)
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128 ? "#000000" : "#ffffff"
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return { h, s, l }
}

// Generate a color palette based on a color scheme
export function generateColorPalette(scheme: ColorScheme, count: number): string[] {
  const baseColor = generateRandomColor()
  const baseRgb = hexToRgb(baseColor)
  const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)

  switch (scheme) {
    case "monochromatic":
      return generateMonochromaticPalette(baseHsl.h, count)
    case "analogous":
      return generateAnalogousPalette(baseHsl.h, count)
    case "complementary":
      return generateComplementaryPalette(baseHsl.h, count)
    case "triadic":
      return generateTriadicPalette(baseHsl.h, count)
    case "tetradic":
      return generateTetradicPalette(baseHsl.h, count)
    default:
      return Array(count)
        .fill("")
        .map(() => generateRandomColor())
  }
}

// Generate a monochromatic color palette
function generateMonochromaticPalette(baseHue: number, count: number): string[] {
  const palette: string[] = []

  for (let i = 0; i < count; i++) {
    const lightness = 0.1 + (0.8 * i) / (count - 1)
    const rgb = hslToRgb(baseHue, 0.65, lightness)
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
  }

  return palette
}

// Generate an analogous color palette
function generateAnalogousPalette(baseHue: number, count: number): string[] {
  const palette: string[] = []
  const hueStep = 0.05

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + hueStep * (i - Math.floor(count / 2)) + 1) % 1
    const rgb = hslToRgb(hue, 0.65, 0.5)
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
  }

  return palette
}

// Generate a complementary color palette
function generateComplementaryPalette(baseHue: number, count: number): string[] {
  const palette: string[] = []
  const complementaryHue = (baseHue + 0.5) % 1

  if (count === 2) {
    const rgb1 = hslToRgb(baseHue, 0.65, 0.5)
    const rgb2 = hslToRgb(complementaryHue, 0.65, 0.5)
    palette.push(rgbToHex(rgb1.r, rgb1.g, rgb1.b))
    palette.push(rgbToHex(rgb2.r, rgb2.g, rgb2.b))
  } else {
    const primaryCount = Math.ceil(count / 2)
    const secondaryCount = count - primaryCount

    for (let i = 0; i < primaryCount; i++) {
      const lightness = 0.3 + (0.4 * i) / (primaryCount - 1)
      const rgb = hslToRgb(baseHue, 0.65, lightness)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    for (let i = 0; i < secondaryCount; i++) {
      const lightness = 0.3 + (0.4 * i) / (secondaryCount - 1)
      const rgb = hslToRgb(complementaryHue, 0.65, lightness)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }
  }

  return palette
}

// Generate a triadic color palette
function generateTriadicPalette(baseHue: number, count: number): string[] {
  const palette: string[] = []
  const hue1 = baseHue
  const hue2 = (baseHue + 1 / 3) % 1
  const hue3 = (baseHue + 2 / 3) % 1

  if (count <= 3) {
    const rgb1 = hslToRgb(hue1, 0.65, 0.5)
    palette.push(rgbToHex(rgb1.r, rgb1.g, rgb1.b))

    if (count >= 2) {
      const rgb2 = hslToRgb(hue2, 0.65, 0.5)
      palette.push(rgbToHex(rgb2.r, rgb2.g, rgb2.b))
    }

    if (count >= 3) {
      const rgb3 = hslToRgb(hue3, 0.65, 0.5)
      palette.push(rgbToHex(rgb3.r, rgb3.g, rgb3.b))
    }
  } else {
    const perGroup = Math.floor(count / 3)
    const remainder = count % 3

    for (let i = 0; i < perGroup; i++) {
      const saturation = 0.4 + (0.3 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue1, saturation, 0.5)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    for (let i = 0; i < perGroup + (remainder > 0 ? 1 : 0); i++) {
      const saturation = 0.4 + (0.3 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue2, saturation, 0.5)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    for (let i = 0; i < perGroup + (remainder > 1 ? 1 : 0); i++) {
      const saturation = 0.4 + (0.3 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue3, saturation, 0.5)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }
  }

  return palette
}

// Generate a tetradic color palette
function generateTetradicPalette(baseHue: number, count: number): string[] {
  const palette: string[] = []
  const hue1 = baseHue
  const hue2 = (baseHue + 0.25) % 1
  const hue3 = (baseHue + 0.5) % 1
  const hue4 = (baseHue + 0.75) % 1

  if (count <= 4) {
    const rgb1 = hslToRgb(hue1, 0.65, 0.5)
    palette.push(rgbToHex(rgb1.r, rgb1.g, rgb1.b))

    if (count >= 2) {
      const rgb2 = hslToRgb(hue2, 0.65, 0.5)
      palette.push(rgbToHex(rgb2.r, rgb2.g, rgb2.b))
    }

    if (count >= 3) {
      const rgb3 = hslToRgb(hue3, 0.65, 0.5)
      palette.push(rgbToHex(rgb3.r, rgb3.g, rgb3.b))
    }

    if (count >= 4) {
      const rgb4 = hslToRgb(hue4, 0.65, 0.5)
      palette.push(rgbToHex(rgb4.r, rgb4.g, rgb4.b))
    }
  } else {
    const perGroup = Math.floor(count / 4)
    const remainder = count % 4

    for (let i = 0; i < perGroup; i++) {
      const lightness = 0.4 + (0.2 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue1, 0.65, lightness)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    for (let i = 0; i < perGroup + (remainder > 0 ? 1 : 0); i++) {
      const lightness = 0.4 + (0.2 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue2, 0.65, lightness)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    for (let i = 0; i < perGroup + (remainder > 1 ? 1 : 0); i++) {
      const lightness = 0.4 + (0.2 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue3, 0.65, lightness)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    for (let i = 0; i < perGroup + (remainder > 2 ? 1 : 0); i++) {
      const lightness = 0.4 + (0.2 * i) / (perGroup - 1)
      const rgb = hslToRgb(hue4, 0.65, lightness)
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }
  }

  return palette
}

