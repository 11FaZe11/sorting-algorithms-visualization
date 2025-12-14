"use client"

import { Button } from "@/components/ui/button"

const searchAlgorithms = [
  { id: "linear", name: "Linear Search", emoji: "🔍" },
  { id: "binary", name: "Binary Search", emoji: "🎯" },
  { id: "jump", name: "Jump Search", emoji: "🦘" },
  { id: "interpolation", name: "Interpolation", emoji: "📊" },
  { id: "exponential", name: "Exponential", emoji: "📈" },
  { id: "ternary", name: "Ternary Search", emoji: "🔱" },
]

interface SearchAlgorithmSelectorProps {
  selected: string
  onSelect: (algorithm: string) => void
}

export function SearchAlgorithmSelector({ selected, onSelect }: SearchAlgorithmSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {searchAlgorithms.map((algo) => (
        <Button
          key={algo.id}
          variant={selected === algo.id ? "default" : "outline"}
          className={`h-auto py-3 px-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 touch-manipulation ${
            selected === algo.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-105"
              : "hover:scale-105 hover:shadow-md hover:shadow-primary/30"
          }`}
          onClick={() => onSelect(algo.id)}
        >
          <span className="text-2xl">{algo.emoji}</span>
          <span className="text-xs sm:text-sm font-medium text-center leading-tight">{algo.name}</span>
        </Button>
      ))}
    </div>
  )
}
