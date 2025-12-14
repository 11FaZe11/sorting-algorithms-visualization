"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play } from "lucide-react"

interface Node {
  value: number
  next: number | null
}

interface LinkedListRunnerGameProps {
  onClose: () => void
}

export function LinkedListRunnerGame({ onClose }: LinkedListRunnerGameProps) {
  const [list, setList] = useState<Node[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [target, setTarget] = useState(0)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    generateList()
  }, [])

  const generateList = () => {
    const length = 8
    const newList: Node[] = []

    for (let i = 0; i < length; i++) {
      newList.push({
        value: Math.floor(Math.random() * 90) + 10,
        next: i < length - 1 ? i + 1 : null,
      })
    }

    setList(newList)
    setCurrentIndex(0)
    setTarget(newList[Math.floor(Math.random() * length)].value)
    setMoves(0)
    setGameOver(false)
  }

  const moveNext = () => {
    if (currentIndex === null || gameOver) return

    const current = list[currentIndex]
    setMoves((prev) => prev + 1)

    if (current.value === target) {
      setScore((prev) => prev + Math.max(100 - moves * 5, 10))
      setGameOver(true)
      return
    }

    if (current.next !== null) {
      setCurrentIndex(current.next)
    } else {
      setGameOver(true)
    }
  }

  const jumpToIndex = (index: number) => {
    if (gameOver) return
    setCurrentIndex(index)
    setMoves((prev) => prev + 3)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Navigate the linked list to find the target value!</p>
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{target}</div>
            <div className="text-sm text-muted-foreground">Target Value</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-muted-foreground">{moves}</div>
            <div className="text-sm text-muted-foreground">Moves</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4">
        {list.map((node, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => jumpToIndex(index)}
              disabled={gameOver}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg border-4 font-bold text-lg transition-all hover:scale-110 ${
                currentIndex === index
                  ? "bg-primary text-primary-foreground border-primary scale-110"
                  : node.value === target
                    ? "bg-accent/20 text-accent border-accent"
                    : "bg-card text-foreground border-border"
              }`}
            >
              <span className="text-xs text-muted-foreground">#{index}</span>
              <span>{node.value}</span>
            </button>
            {node.next !== null && (
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 h-0.5 bg-primary"></div>
                <div className="text-xs text-muted-foreground">→</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={moveNext}
          disabled={gameOver || currentIndex === null}
          className="h-14 text-lg hover:scale-105 transition-transform"
        >
          <Play className="w-5 h-5 mr-2" />
          Move Next (1 move)
        </Button>
        <Button
          onClick={generateList}
          className="h-14 text-lg hover:scale-105 transition-transform bg-transparent"
          variant="outline"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          New List
        </Button>
      </div>

      {gameOver && (
        <div className="p-4 bg-primary/10 rounded-lg animate-in fade-in slide-in-from-bottom-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {list[currentIndex!]?.value === target ? "Found! 🎯" : "Not Found 😔"}
            </div>
            <div className="text-sm text-muted-foreground">Total moves: {moves}</div>
          </div>
        </div>
      )}
    </div>
  )
}
