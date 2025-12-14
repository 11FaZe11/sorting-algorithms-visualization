"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableItem({ id, value }: { id: string; value: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-center h-16 px-6 bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary rounded-lg cursor-grab active:cursor-grabbing hover:scale-105 transition-all touch-manipulation"
    >
      <span className="text-2xl font-bold text-primary">{value}</span>
    </div>
  )
}

export function SortRaceGame({ onClose }: { onClose: () => void }) {
  const [numbers, setNumbers] = useState<number[]>([])
  const [isSorted, setIsSorted] = useState(false)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !isSorted) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isSorted])

  useEffect(() => {
    if (numbers.length > 0) {
      const sorted = numbers.every((num, i) => i === 0 || num >= numbers[i - 1])
      setIsSorted(sorted)
      if (sorted && isPlaying) {
        setIsPlaying(false)
      }
    }
  }, [numbers, isPlaying])

  const resetGame = () => {
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1)
    setNumbers(newNumbers)
    setIsSorted(false)
    setMoves(0)
    setTime(0)
    setIsPlaying(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setNumbers((items) => {
        const oldIndex = items.findIndex((item) => item.toString() === active.id)
        const newIndex = items.findIndex((item) => item.toString() === over.id)
        setMoves((prev) => prev + 1)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Moves</div>
            <div className="text-2xl font-bold text-primary">{moves}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Time</div>
            <div className="text-2xl font-bold text-accent">{time}s</div>
          </div>
        </div>
        <Button onClick={resetGame} variant="outline" className="neon-border touch-manipulation bg-transparent">
          New Game
        </Button>
      </div>

      <div className="text-center text-muted-foreground">
        Drag and drop the numbers to sort them in ascending order!
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={numbers.map((n) => n.toString())} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {numbers.map((num) => (
              <SortableItem key={num} id={num.toString()} value={num} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isSorted && (
        <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg neon-border animate-in fade-in slide-in-from-bottom-5">
          <div className="text-3xl font-bold text-primary mb-2">Congratulations!</div>
          <div className="text-lg text-muted-foreground">
            You sorted the array in {moves} moves and {time} seconds!
          </div>
        </div>
      )}
    </div>
  )
}
