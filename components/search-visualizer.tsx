"use client"

import { useEffect, useRef } from "react"
import type { SearchState } from "@/lib/search-algorithms"

interface SearchVisualizerProps {
  state: SearchState
  arraySize: number
}

export function SearchVisualizer({ state, arraySize }: SearchVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight

    const barWidth = canvas.width / state.array.length
    const maxValue = Math.max(...state.array)
    const padding = 40
    const drawHeight = canvas.height - padding * 2

    // Clear canvas
    ctx.fillStyle = "rgba(13, 13, 25, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw target indicator
    ctx.fillStyle = "rgba(255, 153, 102, 0.8)"
    ctx.font = "bold 16px Geist"
    ctx.textAlign = "left"
    ctx.fillText(`Target: ${state.target}`, 10, 25)
    ctx.fillText(`Comparisons: ${state.comparisons}`, 10, 45)

    // Draw result
    if (state.foundIndex !== null) {
      ctx.fillStyle = state.foundIndex === -1 ? "rgba(255, 102, 102, 0.8)" : "rgba(153, 255, 153, 0.8)"
      ctx.textAlign = "right"
      ctx.fillText(state.foundIndex === -1 ? "Not Found" : `Found at index ${state.foundIndex}`, canvas.width - 10, 25)
    }

    // Draw bars
    state.array.forEach((value, index) => {
      const x = index * barWidth
      const barHeight = (value / maxValue) * drawHeight
      const y = canvas.height - padding - barHeight

      // Determine bar color
      let fillColor = "rgba(167, 102, 255, 0.6)"
      let glowColor = "rgba(167, 102, 255, 0.2)"

      if (state.foundIndex === index) {
        fillColor = "rgba(153, 255, 153, 0.9)"
        glowColor = "rgba(153, 255, 153, 0.4)"
      } else if (state.currentIndex === index) {
        fillColor = "rgba(255, 153, 102, 0.9)"
        glowColor = "rgba(255, 153, 102, 0.5)"
      } else if (state.searchedIndices.includes(index)) {
        fillColor = "rgba(153, 204, 255, 0.7)"
        glowColor = "rgba(153, 204, 255, 0.3)"
      }

      // Draw glow
      ctx.fillStyle = glowColor
      ctx.fillRect(x - 1, y - 5, barWidth + 2, barHeight + 10)

      // Draw bar
      ctx.fillStyle = fillColor
      ctx.fillRect(x, y, barWidth - 1, barHeight)

      // Draw value text on bars
      if (barWidth > 20) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.font = `${Math.min(barWidth / 2, 12)}px Geist`
        ctx.textAlign = "center"
        ctx.fillText(value.toString(), x + barWidth / 2, y + 15)
      }
    })
  }, [state, arraySize])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-card border neon-border">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
