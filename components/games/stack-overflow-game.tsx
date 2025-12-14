"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Tower = number[]

export function StackOverflowGame({ onClose }: { onClose: () => void }) {
  const [towers, setTowers] = useState<Tower[]>([[], [], []])
  const [selected, setSelected] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [disks, setDisks] = useState(3)

  useEffect(() => {
    resetGame()
  }, [disks])

  useEffect(() => {
    if (towers[2].length === disks && disks > 0) {
      setIsWon(true)
    }
  }, [towers, disks])

  const resetGame = () => {
    setTowers([[...Array(disks)].map((_, i) => disks - i), [], []])
    setSelected(null)
    setMoves(0)
    setIsWon(false)
  }

  const handleTowerClick = (towerIndex: number) => {
    if (isWon) return

    if (selected === null) {
      if (towers[towerIndex].length > 0) {
        setSelected(towerIndex)
      }
    } else {
      if (selected === towerIndex) {
        setSelected(null)
      } else {
        const disk = towers[selected][towers[selected].length - 1]
        const targetTop = towers[towerIndex][towers[towerIndex].length - 1]

        if (!targetTop || disk < targetTop) {
          const newTowers = towers.map((tower, i) => {
            if (i === selected) return tower.slice(0, -1)
            if (i === towerIndex) return [...tower, disk]
            return tower
          })
          setTowers(newTowers)
          setMoves(moves + 1)
        }
        setSelected(null)
      }
    }
  }

  const minMoves = Math.pow(2, disks) - 1

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Moves</div>
            <div className="text-2xl font-bold text-primary">{moves}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Optimal</div>
            <div className="text-2xl font-bold text-accent">{minMoves}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setDisks(Math.max(3, disks - 1))}
            variant="outline"
            size="sm"
            className="touch-manipulation"
          >
            -
          </Button>
          <div className="text-center px-3 py-1 bg-card border rounded">
            <div className="text-xs text-muted-foreground">Disks</div>
            <div className="text-lg font-bold">{disks}</div>
          </div>
          <Button
            onClick={() => setDisks(Math.min(6, disks + 1))}
            variant="outline"
            size="sm"
            className="touch-manipulation"
          >
            +
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Move all disks to the rightmost tower. Larger disks cannot go on smaller disks!
      </div>

      <div className="grid grid-cols-3 gap-4">
        {towers.map((tower, towerIndex) => (
          <div
            key={towerIndex}
            onClick={() => handleTowerClick(towerIndex)}
            className={`relative h-64 flex flex-col-reverse items-center justify-start p-2 bg-card/50 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 touch-manipulation ${
              selected === towerIndex ? "border-primary shadow-lg shadow-primary/50" : "border-border"
            }`}
          >
            <div className="absolute bottom-0 w-full h-2 bg-border rounded"></div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-full bg-border rounded"></div>
            {tower.map((disk, diskIndex) => (
              <div
                key={diskIndex}
                className="relative z-10 h-8 rounded transition-all"
                style={{
                  width: `${(disk / disks) * 80 + 20}%`,
                  backgroundColor: `hsl(${(disk / disks) * 360}, 70%, 50%)`,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {isWon && (
        <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg neon-border animate-in fade-in slide-in-from-bottom-5">
          <div className="text-3xl font-bold text-primary mb-2">Perfect!</div>
          <div className="text-lg text-muted-foreground">
            You solved it in {moves} moves!
            {moves === minMoves && <div className="text-accent mt-2">Optimal solution!</div>}
          </div>
          <Button onClick={resetGame} className="mt-4 neon-border touch-manipulation">
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
