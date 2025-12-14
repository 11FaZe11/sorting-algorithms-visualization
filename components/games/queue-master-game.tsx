"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Customer = { id: number; patience: number; maxPatience: number }

export function QueueMasterGame({ onClose }: { onClose: () => void }) {
  const [queue, setQueue] = useState<Customer[]>([])
  const [served, setServed] = useState(0)
  const [left, setLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(30)

  useEffect(() => {
    if (isPlaying && time > 0) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (time === 0) {
      setIsPlaying(false)
    }
  }, [isPlaying, time])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const patience = Math.floor(Math.random() * 5) + 3
        setQueue((prev) => [...prev, { id: Date.now(), patience, maxPatience: patience }])
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setQueue((prev) => {
          const updated = prev.map((c) => ({ ...c, patience: c.patience - 1 }))
          const angry = updated.filter((c) => c.patience <= 0)
          setLeft((l) => l + angry.length)
          return updated.filter((c) => c.patience > 0)
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const startGame = () => {
    setQueue([])
    setServed(0)
    setLeft(0)
    setScore(0)
    setTime(30)
    setIsPlaying(true)
  }

  const serveCustomer = () => {
    if (queue.length > 0) {
      setQueue((prev) => prev.slice(1))
      setServed((s) => s + 1)
      setScore((s) => s + 10)
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Served</div>
            <div className="text-2xl font-bold text-primary">{served}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Left</div>
            <div className="text-2xl font-bold text-destructive">{left}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Score</div>
            <div className="text-2xl font-bold text-accent">{score}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Time</div>
          <div className="text-3xl font-bold text-primary">{time}s</div>
        </div>
      </div>

      {!isPlaying && time === 30 && (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Serve customers before they lose patience!</p>
          <Button onClick={startGame} className="neon-border touch-manipulation">
            Start Game
          </Button>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-4">
          <Button
            onClick={serveCustomer}
            disabled={queue.length === 0}
            className="w-full neon-border touch-manipulation"
          >
            Serve Customer (FIFO)
          </Button>

          <div className="space-y-2">
            {queue.map((customer) => (
              <div key={customer.id} className="flex items-center gap-2 p-3 bg-card rounded-lg border-2 border-border">
                <div className="text-2xl">👤</div>
                <div className="flex-1">
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${(customer.patience / customer.maxPatience) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-semibold">{customer.patience}s</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isPlaying && time === 0 && (
        <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg neon-border animate-in fade-in slide-in-from-bottom-5">
          <div className="text-3xl font-bold text-primary mb-2">Game Over!</div>
          <div className="text-lg text-muted-foreground mb-4">
            Final Score: {score}
            <br />
            Served: {served} | Left: {left}
          </div>
          <Button onClick={startGame} className="neon-border touch-manipulation">
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
