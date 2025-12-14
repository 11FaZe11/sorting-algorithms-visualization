"use client"

import { useEffect, useRef, useState } from "react"
import type { SortState } from "@/lib/sorting-algorithms"

interface SortVisualizerProps {
  state: SortState
  arraySize: number
  speed: number
}

export function SortVisualizer({ state, arraySize, speed }: SortVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current?.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const barWidth = canvas.width / state.array.length
    const maxValue = Math.max(...state.array)
    const padding = 20
    const drawHeight = canvas.height - padding * 2

    // Clear canvas with dark background
    ctx.fillStyle = "rgba(13, 13, 25, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "rgba(167, 102, 255, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (drawHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw bars
    state.array.forEach((value, index) => {
      const x = index * barWidth
      const barHeight = (value / maxValue) * drawHeight
      const y = canvas.height - padding - barHeight

      // Determine bar color based on state
      let fillColor = "rgba(167, 102, 255, 0.7)" // Default - primary
      let glowColor = "rgba(167, 102, 255, 0.3)"

      if (state.sortedIndices.includes(index)) {
        fillColor = "rgba(153, 255, 153, 0.8)" // Green for sorted
        glowColor = "rgba(153, 255, 153, 0.4)"
      } else if (state.comparingIndices.includes(index)) {
        fillColor = "rgba(255, 153, 102, 0.9)" // Orange for comparing
        glowColor = "rgba(255, 153, 102, 0.5)"
      } else if (state.swappedIndices.includes(index)) {
        fillColor = "rgba(153, 204, 255, 0.9)" // Cyan for swapped
        glowColor = "rgba(153, 204, 255, 0.5)"
      }

      // Draw glow effect
      ctx.fillStyle = glowColor
      ctx.fillRect(x - 1, y - 5, barWidth + 2, barHeight + 10)

      // Draw bar
      ctx.fillStyle = fillColor
      ctx.fillRect(x, y, barWidth - 1, barHeight)

      // Draw border
      ctx.strokeStyle = fillColor
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, barWidth - 1, barHeight)
    })

    // Draw axis labels
    ctx.fillStyle = "rgba(153, 204, 204, 0.6)"
    ctx.font = "12px Geist"
    ctx.textAlign = "center"
    ctx.fillText("0", 0, canvas.height - 5)
    ctx.textAlign = "right"
    ctx.fillText(`Max: ${maxValue}`, canvas.width - 5, 20)
  }, [state, dimensions])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-card border neon-border">
      <canvas ref={canvasRef} className="w-full h-full block" style={{ display: "block" }} />
    </div>
  )
}
