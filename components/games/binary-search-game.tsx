"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BinarySearchGame({ onClose }: { onClose: () => void }) {
  const [target, setTarget] = useState(0)
  const [guess, setGuess] = useState("")
  const [guesses, setGuesses] = useState<{ value: number; hint: string }[]>([])
  const [isWon, setIsWon] = useState(false)
  const [range, setRange] = useState({ min: 1, max: 100 })

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setGuesses([])
    setIsWon(false)
    setRange({ min: 1, max: 100 })
  }

  const handleGuess = () => {
    const guessNum = Number.parseInt(guess)
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) return

    if (guessNum === target) {
      setGuesses([...guesses, { value: guessNum, hint: "Correct!" }])
      setIsWon(true)
    } else if (guessNum < target) {
      setGuesses([...guesses, { value: guessNum, hint: "Too Low" }])
      setRange({ ...range, min: Math.max(range.min, guessNum + 1) })
    } else {
      setGuesses([...guesses, { value: guessNum, hint: "Too High" }])
      setRange({ ...range, max: Math.min(range.max, guessNum - 1) })
    }
    setGuess("")
  }

  const optimalGuesses = Math.ceil(Math.log2(100))

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <div className="text-lg text-muted-foreground mb-4">Guess a number between 1 and 100</div>
        <div className="text-3xl font-bold text-primary mb-2">
          Current Range: {range.min} - {range.max}
        </div>
        <div className="text-sm text-muted-foreground">
          Optimal guesses: {optimalGuesses} | Your guesses: {guesses.length}
        </div>
      </div>

      {!isWon && (
        <div className="flex gap-2">
          <Input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            placeholder="Enter your guess"
            className="text-lg neon-border"
            min={1}
            max={100}
          />
          <Button onClick={handleGuess} className="neon-border touch-manipulation">
            Guess
          </Button>
        </div>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {guesses.map((g, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 rounded-lg ${
              g.hint === "Correct!"
                ? "bg-primary/20 border-2 border-primary"
                : g.hint === "Too Low"
                  ? "bg-accent/10 border border-accent"
                  : "bg-secondary/10 border border-secondary"
            }`}
          >
            <span className="text-lg font-semibold">
              Guess #{i + 1}: {g.value}
            </span>
            <span className="text-sm font-medium">{g.hint}</span>
          </div>
        ))}
      </div>

      {isWon && (
        <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg neon-border animate-in fade-in slide-in-from-bottom-5">
          <div className="text-3xl font-bold text-primary mb-2">You Won!</div>
          <div className="text-lg text-muted-foreground mb-4">
            You found {target} in {guesses.length} guesses!
            {guesses.length <= optimalGuesses && <div className="text-accent mt-2">Perfect binary search!</div>}
          </div>
          <Button onClick={resetGame} className="neon-border touch-manipulation">
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
