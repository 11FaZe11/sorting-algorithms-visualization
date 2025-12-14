"use client"

import { useState, useEffect } from "react"
import { Palette, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type ThemeName = "neon" | "ocean" | "sunset" | "forest" | "cyberpunk" | "rose" | "purple-haze"

export interface Theme {
  name: ThemeName
  label: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
    ring: string
    destructive: string
    destructiveForeground: string
  }
}

export const themes: Theme[] = [
  {
    name: "neon",
    label: "Neon Purple (Default)",
    colors: {
      background: "oklch(0.08 0 0)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.12 0.02 260)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.65 0.25 280)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.55 0.28 20)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.6 0.25 180)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.3 0 0)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.2 0.01 260)",
      input: "oklch(0.12 0.02 260)",
      ring: "oklch(0.65 0.25 280)",
      destructive: "oklch(0.65 0.25 20)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
  {
    name: "ocean",
    label: "Ocean Blue",
    colors: {
      background: "oklch(0.08 0.02 240)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.12 0.03 230)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.60 0.20 220)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.55 0.18 200)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.65 0.22 180)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.25 0.02 230)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.20 0.03 220)",
      input: "oklch(0.15 0.03 230)",
      ring: "oklch(0.60 0.20 220)",
      destructive: "oklch(0.60 0.25 20)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
  {
    name: "sunset",
    label: "Sunset Orange",
    colors: {
      background: "oklch(0.09 0.02 40)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.13 0.03 35)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.65 0.22 30)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.60 0.20 50)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.70 0.18 60)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.28 0.02 35)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.22 0.03 30)",
      input: "oklch(0.15 0.03 35)",
      ring: "oklch(0.65 0.22 30)",
      destructive: "oklch(0.62 0.25 15)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
  {
    name: "forest",
    label: "Forest Green",
    colors: {
      background: "oklch(0.08 0.02 150)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.12 0.03 145)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.58 0.18 155)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.55 0.16 140)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.65 0.20 170)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.26 0.02 145)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.20 0.03 150)",
      input: "oklch(0.14 0.03 145)",
      ring: "oklch(0.58 0.18 155)",
      destructive: "oklch(0.63 0.24 20)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk Pink",
    colors: {
      background: "oklch(0.08 0.02 320)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.12 0.03 330)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.65 0.25 340)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.60 0.22 310)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.68 0.24 190)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.28 0.02 330)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.22 0.03 340)",
      input: "oklch(0.14 0.03 330)",
      ring: "oklch(0.65 0.25 340)",
      destructive: "oklch(0.64 0.26 15)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
  {
    name: "rose",
    label: "Rose Gold",
    colors: {
      background: "oklch(0.09 0.01 350)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.13 0.02 355)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.62 0.20 10)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.58 0.18 25)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.66 0.16 40)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.27 0.01 350)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.21 0.02 355)",
      input: "oklch(0.14 0.02 355)",
      ring: "oklch(0.62 0.20 10)",
      destructive: "oklch(0.63 0.24 18)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
  {
    name: "purple-haze",
    label: "Purple Haze",
    colors: {
      background: "oklch(0.08 0.02 290)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.12 0.03 285)",
      cardForeground: "oklch(0.95 0 0)",
      primary: "oklch(0.63 0.24 290)",
      primaryForeground: "oklch(0.95 0 0)",
      secondary: "oklch(0.58 0.22 270)",
      secondaryForeground: "oklch(0.95 0 0)",
      accent: "oklch(0.67 0.20 250)",
      accentForeground: "oklch(0.08 0 0)",
      muted: "oklch(0.27 0.02 285)",
      mutedForeground: "oklch(0.7 0 0)",
      border: "oklch(0.21 0.03 290)",
      input: "oklch(0.14 0.03 285)",
      ring: "oklch(0.63 0.24 290)",
      destructive: "oklch(0.64 0.25 20)",
      destructiveForeground: "oklch(0.95 0 0)",
    },
  },
]

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("neon")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as ThemeName
    if (savedTheme && themes.find((t) => t.name === savedTheme)) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("neon")
    }
  }, [])

  const applyTheme = (themeName: ThemeName) => {
    const theme = themes.find((t) => t.name === themeName)
    if (!theme) return

    const root = document.documentElement

    root.setAttribute("data-theme", themeName)

    // Apply all color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      root.style.setProperty(`--${cssVar}`, value)
    })

    // Force a repaint to ensure theme changes are visible
    root.style.display = "none"
    root.offsetHeight // Trigger reflow
    root.style.display = ""

    console.log("[v0] Theme applied:", themeName)
  }

  const handleThemeChange = (themeName: ThemeName) => {
    setCurrentTheme(themeName)
    applyTheme(themeName)
    localStorage.setItem("theme", themeName)
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative neon-border hover:scale-110 transition-all duration-300 touch-manipulation bg-card/50 backdrop-blur-sm min-h-[44px] min-w-[44px]"
        >
          <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 sm:w-56 neon-border bg-card/95 backdrop-blur-sm">
        <div className="px-2 py-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">Color Themes</div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className="flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-colors touch-manipulation min-h-[44px]"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-border flex-shrink-0"
                style={{ background: theme.colors.primary }}
              />
              <span className="text-xs sm:text-sm break-words">{theme.label}</span>
            </div>
            {currentTheme === theme.name && <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
