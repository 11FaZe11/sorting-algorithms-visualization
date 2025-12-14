"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface RecursionTowerGameProps {
  onClose: () => void
}

export function RecursionTowerGame({ onClose }: RecursionTowerGameProps) {
  const [depth, setDepth] = useState(0)
  const [maxDepth, setMaxDepth] = useState(8)
  const [score, setScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const fibonacci = (n: number, currentDepth = 0): number => {
    if (currentDepth > depth) {
      setDepth(currentDepth)
    }
    if (n <= 1) return n
    return fibonacci(n - 1, currentDepth + 1) + fibonacci(n - 2, currentDepth + 1)
  }

  const calculateFibonacci = (n: number) => {
    setIsAnimating(true)
    setDepth(0)
    setResult(null)

    setTimeout(() => {
      const res = fibonacci(n)
      setResult(res)
      setScore((prev) => prev + 10)
      setIsAnimating(false)
    }, 100)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Watch how recursion depth grows with Fibonacci numbers!</p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{depth}</div>
            <div className="text-sm text-muted-foreground">Recursion Depth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[...Array(maxDepth)].map((_, i) => (
          <Button
            key={i}
            onClick={() => calculateFibonacci(i)}
            disabled={isAnimating}
            className="h-16 text-lg font-bold hover:scale-105 transition-transform"
            variant={isAnimating ? "outline" : "default"}
          >
            F({i})
          </Button>
        ))}
      </div>

      {result !== null && (
        <div className="p-4 bg-primary/10 rounded-lg text-center animate-in fade-in slide-in-from-bottom-3">
          <div className="text-2xl font-bold text-primary mb-2">Result: {result}</div>
          <div className="text-sm text-muted-foreground">Max recursion depth reached: {depth}</div>
        </div>
      )}

      <div className="h-64 bg-card/50 rounded-lg p-4 overflow-hidden">
        <div className="flex items-end justify-center h-full gap-2">
          {[...Array(depth)].map((_, i) => (
            <div
              key={i}
              className="w-8 bg-gradient-to-t from-primary to-accent rounded-t transition-all duration-300 animate-in slide-in-from-bottom"
              style={{
                height: `${((i + 1) / depth) * 100}%`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={() => {
          setScore(0)
          setDepth(0)
          setResult(null)
        }}
        className="w-full"
        variant="outline"
      >
        <RotateCcw className="w-4 h-4 mr-2" /> Reset
      </Button>
    </div>
  )
}
