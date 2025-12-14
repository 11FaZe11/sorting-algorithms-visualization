"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Coins } from "lucide-react"

interface GreedyCoinGameProps {
  onClose: () => void
}

export function GreedyCoinGame({ onClose }: GreedyCoinGameProps) {
  const [target, setTarget] = useState(67)
  const [input, setInput] = useState("")
  const [selectedCoins, setSelectedCoins] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const coinValues = [25, 10, 5, 1]
  const coinNames = ["Quarter", "Dime", "Nickel", "Penny"]

  const calculateOptimal = (amount: number): number[] => {
    const result: number[] = []
    let remaining = amount

    for (const coin of coinValues) {
      while (remaining >= coin) {
        result.push(coin)
        remaining -= coin
      }
    }

    return result
  }

  const addCoin = (value: number) => {
    const currentSum = selectedCoins.reduce((a, b) => a + b, 0)

    if (currentSum + value > target) {
      return
    }

    const newCoins = [...selectedCoins, value]
    setSelectedCoins(newCoins)

    const newSum = newCoins.reduce((a, b) => a + b, 0)
    if (newSum === target) {
      const optimal = calculateOptimal(target)
      const bonus = newCoins.length === optimal.length ? 50 : 10
      setScore((prev) => prev + bonus)
      setIsComplete(true)
    }
  }

  const reset = () => {
    setTarget(Math.floor(Math.random() * 90) + 10)
    setSelectedCoins([])
    setIsComplete(false)
  }

  const currentSum = selectedCoins.reduce((a, b) => a + b, 0)
  const optimal = calculateOptimal(target)

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Make change for the target amount using minimum coins!</p>
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">${(target / 100).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Target Amount</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-card/50 rounded-lg border-2 border-border">
        <div className="text-sm text-muted-foreground mb-2">Your Selection: ${(currentSum / 100).toFixed(2)}</div>
        <div className="flex flex-wrap gap-2 min-h-[60px]">
          {selectedCoins.map((coin, i) => (
            <div key={i} className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-bold animate-in zoom-in">
              {coin}¢
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {coinValues.map((value, i) => (
          <Button
            key={value}
            onClick={() => addCoin(value)}
            disabled={isComplete}
            className="h-20 flex flex-col gap-1 hover:scale-105 transition-transform"
            variant={isComplete ? "outline" : "default"}
          >
            <Coins className="w-6 h-6" />
            <span className="text-lg font-bold">{value}¢</span>
            <span className="text-xs">{coinNames[i]}</span>
          </Button>
        ))}
      </div>

      {isComplete && (
        <div className="p-4 bg-primary/10 rounded-lg animate-in fade-in slide-in-from-bottom-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {selectedCoins.length === optimal.length ? "Perfect! 🎉" : "Complete!"}
            </div>
            <div className="text-sm text-muted-foreground">
              You used {selectedCoins.length} coins. Optimal: {optimal.length} coins
            </div>
          </div>
        </div>
      )}

      <Button onClick={reset} className="w-full bg-transparent" variant="outline">
        <RotateCcw className="w-4 h-4 mr-2" /> New Challenge
      </Button>
    </div>
  )
}
