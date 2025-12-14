"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

type Cell = "empty" | "wall" | "start" | "end" | "path"

export function MazeSpeedrunGame({ onClose }: { onClose: () => void }) {
  const [maze, setMaze] = useState<Cell[][]>([])
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    generateMaze()
  }, [])

  useEffect(() => {
    if (isPlaying && !isWon) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 0.1)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, isWon])

  useEffect(() => {
    drawMaze()
  }, [maze, playerPos])

  const generateMaze = () => {
    const size = 15
    const newMaze: Cell[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill("wall"))

    // Generate simple maze using recursive backtracking
    const carve = (x: number, y: number) => {
      newMaze[y][x] = "empty"
      const dirs = [
        [0, -2],
        [2, 0],
        [0, 2],
        [-2, 0],
      ].sort(() => Math.random() - 0.5)

      for (const [dx, dy] of dirs) {
        const nx = x + dx
        const ny = y + dy
        if (ny >= 0 && ny < size && nx >= 0 && nx < size && newMaze[ny][nx] === "wall") {
          newMaze[y + dy / 2][x + dx / 2] = "empty"
          carve(nx, ny)
        }
      }
    }

    carve(1, 1)
    newMaze[1][1] = "start"
    newMaze[size - 2][size - 2] = "end"

    setMaze(newMaze)
    setPlayerPos({ x: 1, y: 1 })
    setIsPlaying(true)
    setTime(0)
    setIsWon(false)
  }

  const drawMaze = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = canvas.width / maze.length

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === "wall") ctx.fillStyle = "#333"
        else if (cell === "start") ctx.fillStyle = "#10b981"
        else if (cell === "end") ctx.fillStyle = "#ec4899"
        else if (cell === "path") ctx.fillStyle = "#3b82f6"
        else ctx.fillStyle = "#1a1a1a"

        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      })
    })

    // Draw player
    ctx.fillStyle = "#fbbf24"
    ctx.beginPath()
    ctx.arc((playerPos.x + 0.5) * cellSize, (playerPos.y + 0.5) * cellSize, cellSize / 3, 0, Math.PI * 2)
    ctx.fill()
  }

  const movePlayer = (dx: number, dy: number) => {
    if (!isPlaying || isWon) return

    const newX = playerPos.x + dx
    const newY = playerPos.y + dy

    if (newY >= 0 && newY < maze.length && newX >= 0 && newX < maze[0].length && maze[newY][newX] !== "wall") {
      setPlayerPos({ x: newX, y: newY })

      if (maze[newY][newX] === "end") {
        setIsWon(true)
        setIsPlaying(false)
      } else if (maze[newY][newX] === "empty") {
        const newMaze = [...maze]
        newMaze[newY][newX] = "path"
        setMaze(newMaze)
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePlayer(0, -1)
      else if (e.key === "ArrowDown") movePlayer(0, 1)
      else if (e.key === "ArrowLeft") movePlayer(-1, 0)
      else if (e.key === "ArrowRight") movePlayer(1, 0)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playerPos, isPlaying, isWon])

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Time</div>
          <div className="text-2xl font-bold text-primary">{time.toFixed(1)}s</div>
        </div>
        <Button onClick={generateMaze} className="neon-border touch-manipulation">
          New Maze
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Use arrow keys or buttons to reach the pink square!
      </div>

      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        className="w-full max-w-md mx-auto border-2 border-primary rounded-lg"
      />

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        <div></div>
        <Button onClick={() => movePlayer(0, -1)} variant="outline" className="touch-manipulation">
          ↑
        </Button>
        <div></div>
        <Button onClick={() => movePlayer(-1, 0)} variant="outline" className="touch-manipulation">
          ←
        </Button>
        <Button onClick={() => movePlayer(0, 1)} variant="outline" className="touch-manipulation">
          ↓
        </Button>
        <Button onClick={() => movePlayer(1, 0)} variant="outline" className="touch-manipulation">
          →
        </Button>
      </div>

      {isWon && (
        <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg neon-border animate-in fade-in slide-in-from-bottom-5">
          <div className="text-3xl font-bold text-primary mb-2">You Won!</div>
          <div className="text-lg text-muted-foreground">Completed in {time.toFixed(1)} seconds!</div>
        </div>
      )}
    </div>
  )
}
