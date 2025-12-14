"use client"

import { useEffect, useRef } from "react"
import type { MazeState } from "@/lib/pathfinding-algorithms"

interface MazeVisualizerProps {
  state: MazeState | null
  cellSize?: number
}

export function MazeVisualizer({ state, cellSize = 20 }: MazeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!state || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const height = state.grid.length
    const width = state.grid[0].length
    canvas.width = width * cellSize
    canvas.height = height * cellSize

    state.grid.forEach((row) => {
      row.forEach((cell) => {
        const x = cell.col * cellSize
        const y = cell.row * cellSize

        if (cell.isWall) {
          ctx.fillStyle = "#1a1a2e"
          ctx.fillRect(x, y, cellSize, cellSize)
          ctx.strokeStyle = "#0f0f1e"
          ctx.lineWidth = 0.5
          ctx.strokeRect(x, y, cellSize, cellSize)
        } else if (cell.isStart) {
          ctx.fillStyle = "#00ff00"
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
          ctx.shadowColor = "rgba(0, 255, 0, 0.5)"
          ctx.shadowBlur = 10
        } else if (cell.isEnd) {
          ctx.fillStyle = "#ff0080"
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
          ctx.shadowColor = "rgba(255, 0, 128, 0.5)"
          ctx.shadowBlur = 10
        } else if (cell.isPath) {
          ctx.fillStyle = "#00ff88"
          ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4)
          ctx.shadowColor = "rgba(0, 255, 136, 0.8)"
          ctx.shadowBlur = 8
        } else if (state.exploring.has(`${cell.row},${cell.col}`)) {
          ctx.fillStyle = "#ff6600"
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
          ctx.shadowColor = "rgba(255, 102, 0, 0.5)"
          ctx.shadowBlur = 8
        } else if (cell.isVisited) {
          ctx.fillStyle = "#0099ff"
          ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4)
          ctx.shadowColor = "rgba(0, 153, 255, 0.3)"
          ctx.shadowBlur = 5
        } else {
          ctx.fillStyle = "#0a0a15"
          ctx.fillRect(x, y, cellSize, cellSize)
          ctx.strokeStyle = "#1a1a2e"
          ctx.lineWidth = 0.5
          ctx.strokeRect(x, y, cellSize, cellSize)
        }
      })
    })

    ctx.shadowColor = "transparent"
  }, [state, cellSize])

  return (
    <div className="w-full h-full flex items-center justify-center bg-background rounded-lg border neon-border overflow-auto">
      <canvas ref={canvasRef} className="pixel-perfect" style={{ imageRendering: "pixelated" }} />
    </div>
  )
}
