"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Card = { id: number; text: string; type: "algorithm" | "complexity"; matched: boolean }

const pairs = [
  { algorithm: "Bubble Sort", complexity: "O(n²)" },
  { algorithm: "Merge Sort", complexity: "O(n log n)" },
  { algorithm: "Quick Sort", complexity: "O(n log n)" },
  { algorithm: "Binary Search", complexity: "O(log n)" },
  { algorithm: "Linear Search", complexity: "O(n)" },
  { algorithm: "Hash Table", complexity: "O(1)" },
]

export function ComplexityMatchGame({ onClose }: { onClose: () => void }) {
  const [cards, setCards] = useState<Card[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [isWon, setIsWon] = useState(false)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (matches === pairs.length) {
      setIsWon(true)
    }
  }, [matches])

  const resetGame = () => {
    const newCards: Card[] = []
    pairs.forEach((pair, index) => {
      newCards.push({
        id: index * 2,
        text: pair.algorithm,
        type: "algorithm",
        matched: false,
      })
      newCards.push({
        id: index * 2 + 1,
        text: pair.complexity,
        type: "complexity",
        matched: false,
      })
    })

    setCards(newCards.sort(() => Math.random() - 0.5))
    setSelected([])
    setMatches(0)
    setAttempts(0)
    setIsWon(false)
  }

  const handleCardClick = (id: number) => {
    if (selected.length >= 2 || selected.includes(id) || cards.find((c) => c.id === id)?.matched) return

    const newSelected = [...selected, id]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      setAttempts(attempts + 1)
      const card1 = cards.find((c) => c.id === newSelected[0])
      const card2 = cards.find((c) => c.id === newSelected[1])

      if (card1 && card2 && card1.type !== card2.type) {
        const pairIndex1 = Math.floor(card1.id / 2)
        const pairIndex2 = Math.floor(card2.id / 2)

        if (pairIndex1 === pairIndex2) {
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.id === card1.id || c.id === card2.id ? { ...c, matched: true } : c)))
            setMatches(matches + 1)
            setSelected([])
          }, 500)
          return
        }
      }

      setTimeout(() => {
        setSelected([])
      }, 1000)
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Matches</div>
            <div className="text-2xl font-bold text-primary">
              {matches}/{pairs.length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Attempts</div>
            <div className="text-2xl font-bold text-accent">{attempts}</div>
          </div>
        </div>
        <Button onClick={resetGame} className="neon-border touch-manipulation">
          New Game
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">Match algorithms with their time complexity!</div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched}
            className={`p-4 rounded-lg border-2 transition-all hover:scale-105 active:scale-95 touch-manipulation ${
              card.matched
                ? "bg-primary/20 border-primary opacity-50"
                : selected.includes(card.id)
                  ? "bg-accent/20 border-accent scale-105"
                  : card.type === "algorithm"
                    ? "bg-card border-border hover:border-primary"
                    : "bg-card border-border hover:border-accent"
            }`}
          >
            <div className={`text-sm font-semibold ${card.type === "algorithm" ? "text-primary" : "text-accent"}`}>
              {card.text}
            </div>
          </button>
        ))}
      </div>

      {isWon && (
        <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg neon-border animate-in fade-in slide-in-from-bottom-5">
          <div className="text-3xl font-bold text-primary mb-2">Perfect Match!</div>
          <div className="text-lg text-muted-foreground">You matched all pairs in {attempts} attempts!</div>
          <Button onClick={resetGame} className="mt-4 neon-border touch-manipulation">
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
