"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw } from "lucide-react"

interface HashTableHuntGameProps {
  onClose: () => void
}

export function HashTableHuntGame({ onClose }: HashTableHuntGameProps) {
  const [tableSize] = useState(10)
  const [hashTable, setHashTable] = useState<(number[] | null)[]>(Array(10).fill(null))
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [collisions, setCollisions] = useState(0)

  const hashFunction = (value: number) => value % tableSize

  const insertValue = () => {
    const num = Number.parseInt(input)
    if (isNaN(num)) return

    const index = hashFunction(num)
    const newTable = [...hashTable]

    if (newTable[index] === null) {
      newTable[index] = [num]
      setScore((prev) => prev + 10)
    } else {
      newTable[index] = [...(newTable[index] as number[]), num]
      setCollisions((prev) => prev + 1)
      setScore((prev) => prev + 5)
    }

    setHashTable(newTable)
    setInput("")
  }

  const reset = () => {
    setHashTable(Array(10).fill(null))
    setScore(0)
    setCollisions(0)
    setInput("")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Insert numbers and watch hash collisions happen!</p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive">{collisions}</div>
            <div className="text-sm text-muted-foreground">Collisions</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && insertValue()}
          placeholder="Enter a number..."
          className="text-lg"
        />
        <Button onClick={insertValue} className="px-8">
          Insert
        </Button>
      </div>

      <div className="grid gap-2">
        {hashTable.map((bucket, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border-2 border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              {index}
            </div>
            <div className="flex-1 flex gap-2 flex-wrap">
              {bucket === null ? (
                <span className="text-muted-foreground text-sm">Empty</span>
              ) : (
                bucket.map((value, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 bg-accent/20 text-accent rounded-md font-semibold animate-in zoom-in"
                  >
                    {value}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={reset} className="w-full bg-transparent" variant="outline">
        <RotateCcw className="w-4 h-4 mr-2" /> Reset Table
      </Button>
    </div>
  )
}
