"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface PathfindingVisualizerProps {
  state: any
  speed?: number
  onCellClick?: (row: number, col: number) => void
  onCellDrag?: (row: number, col: number) => void
  isEditing?: boolean
  editMode?: "wall" | "start" | "end"
}

export function PathfindingVisualizer({
  state,
  speed = 1,
  onCellClick,
  onCellDrag,
  isEditing = false,
  editMode = "wall",
}: PathfindingVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    if (!state || !state.grid || state.grid.length === 0 || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const height = state.grid.length
    const width = state.grid[0].length
    const cellSize = Math.min(600 / width, 300 / height)

    canvas.width = width * cellSize
    canvas.height = height * cellSize
    ctx.imageSmoothingEnabled = false

    state.grid.forEach((row: any[]) => {
      row.forEach((cell: any) => {
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
          ctx.shadowColor = "rgba(0, 255, 0, 0.8)"
          ctx.shadowBlur = 15
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
        } else if (cell.isEnd) {
          ctx.fillStyle = "#ff0080"
          ctx.shadowColor = "rgba(255, 0, 128, 0.8)"
          ctx.shadowBlur = 15
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
        } else if (cell.isPath) {
          ctx.fillStyle = "#00ff88"
          ctx.shadowColor = "rgba(0, 255, 136, 0.8)"
          ctx.shadowBlur = 10
          ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4)
        } else if (state.exploring && state.exploring.has(`${cell.row},${cell.col}`)) {
          ctx.fillStyle = "#ff6600"
          ctx.shadowColor = "rgba(255, 102, 0, 0.6)"
          ctx.shadowBlur = 8
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
        } else if (cell.isVisited) {
          ctx.fillStyle = "#0099ff"
          ctx.shadowColor = "rgba(0, 153, 255, 0.4)"
          ctx.shadowBlur = 5
          ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4)
        } else {
          ctx.fillStyle = "#0a0a15"
          ctx.fillRect(x, y, cellSize, cellSize)
          ctx.strokeStyle = "#1a1a2e"
          ctx.lineWidth = 0.5
          ctx.strokeRect(x, y, cellSize, cellSize)
        }

        ctx.shadowColor = "transparent"
      })
    })
  }, [state])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEditing || !onCellClick || !canvasRef.current || !state?.grid) return

    isDraggingRef.current = true
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const cellSize = Math.min(600 / state.grid[0].length, 300 / state.grid.length)
    const col = Math.floor(x / cellSize)
    const row = Math.floor(y / cellSize)

    if (row >= 0 && row < state.grid.length && col >= 0 && col < state.grid[0].length) {
      onCellClick(row, col)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !isEditing || !onCellDrag || !canvasRef.current || !state?.grid) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const cellSize = Math.min(600 / state.grid[0].length, 300 / state.grid.length)
    const col = Math.floor(x / cellSize)
    const row = Math.floor(y / cellSize)

    if (row >= 0 && row < state.grid.length && col >= 0 && col < state.grid[0].length) {
      onCellDrag(row, col)
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-background rounded-lg border neon-border overflow-auto">
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: "pixelated",
          cursor: isEditing ? "pointer" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}
