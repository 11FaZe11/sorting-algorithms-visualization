"use client"

import { useState } from "react"
import { Gamepad2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SortRaceGame } from "./games/sort-race-game"
import { BinarySearchGame } from "./games/binary-search-game"
import { StackOverflowGame } from "./games/stack-overflow-game"
import { QueueMasterGame } from "./games/queue-master-game"
import { MazeSpeedrunGame } from "./games/maze-speedrun-game"
import { ComplexityMatchGame } from "./games/complexity-match-game"
import { RecursionTowerGame } from "./games/recursion-tower-game"
import { HashTableHuntGame } from "./games/hash-table-hunt-game"
import { TreeBuilderGame } from "./games/tree-builder-game"
import { GraphColoringGame } from "./games/graph-coloring-game"
import { GreedyCoinGame } from "./games/greedy-coin-game"
import { LinkedListRunnerGame } from "./games/linked-list-runner-game"

type GameType =
  | "sort-race"
  | "binary-search"
  | "stack-overflow"
  | "queue-master"
  | "maze-speedrun"
  | "complexity-match"
  | "recursion-tower"
  | "hash-table-hunt"
  | "tree-builder"
  | "graph-coloring"
  | "greedy-coin"
  | "linked-list-runner"

const games = [
  { id: "sort-race", name: "Sort Race", emoji: "🏁", description: "Drag and drop numbers to sort them!" },
  { id: "binary-search", name: "Guess Master", emoji: "🎯", description: "Find the number in minimum guesses" },
  { id: "stack-overflow", name: "Stack Tower", emoji: "🗼", description: "Solve the Tower of Hanoi puzzle" },
  { id: "queue-master", name: "Queue Master", emoji: "👥", description: "Manage customers efficiently" },
  { id: "maze-speedrun", name: "Maze Speedrun", emoji: "⚡", description: "Complete mazes as fast as you can" },
  { id: "complexity-match", name: "Complexity Match", emoji: "🧠", description: "Match algorithms to complexity" },
  {
    id: "recursion-tower",
    name: "Recursion Tower",
    emoji: "🔄",
    description: "Visualize recursion depth with Fibonacci",
  },
  { id: "hash-table-hunt", name: "Hash Table Hunt", emoji: "🔍", description: "Learn about hash collisions" },
  { id: "tree-builder", name: "Tree Builder", emoji: "🌳", description: "Build a Binary Search Tree" },
  { id: "graph-coloring", name: "Graph Coloring", emoji: "🎨", description: "Color graphs with minimum colors" },
  { id: "greedy-coin", name: "Greedy Coin", emoji: "💰", description: "Make change with minimum coins" },
  { id: "linked-list-runner", name: "List Runner", emoji: "🔗", description: "Navigate through linked lists" },
]

export function AlgorithmGamesFAB() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)

  const handleGameSelect = (gameId: GameType) => {
    setSelectedGame(gameId)
    setIsMenuOpen(false)
  }

  const renderGame = () => {
    switch (selectedGame) {
      case "sort-race":
        return <SortRaceGame onClose={() => setSelectedGame(null)} />
      case "binary-search":
        return <BinarySearchGame onClose={() => setSelectedGame(null)} />
      case "stack-overflow":
        return <StackOverflowGame onClose={() => setSelectedGame(null)} />
      case "queue-master":
        return <QueueMasterGame onClose={() => setSelectedGame(null)} />
      case "maze-speedrun":
        return <MazeSpeedrunGame onClose={() => setSelectedGame(null)} />
      case "complexity-match":
        return <ComplexityMatchGame onClose={() => setSelectedGame(null)} />
      case "recursion-tower":
        return <RecursionTowerGame onClose={() => setSelectedGame(null)} />
      case "hash-table-hunt":
        return <HashTableHuntGame onClose={() => setSelectedGame(null)} />
      case "tree-builder":
        return <TreeBuilderGame onClose={() => setSelectedGame(null)} />
      case "graph-coloring":
        return <GraphColoringGame onClose={() => setSelectedGame(null)} />
      case "greedy-coin":
        return <GreedyCoinGame onClose={() => setSelectedGame(null)} />
      case "linked-list-runner":
        return <LinkedListRunnerGame onClose={() => setSelectedGame(null)} />
      default:
        return null
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isMenuOpen && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-5 fade-in max-h-[70vh] overflow-y-auto pr-2">
            {games.map((game, index) => (
              <button
                key={game.id}
                onClick={() => handleGameSelect(game.id as GameType)}
                className="group flex items-center gap-3 px-4 py-3 bg-card/95 backdrop-blur-md rounded-lg shadow-lg neon-border hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl">{game.emoji}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">{game.name}</div>
                  <div className="text-xs text-muted-foreground">{game.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group relative w-14 h-14 bg-gradient-to-br from-primary via-accent to-secondary rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 neon-border flex items-center justify-center touch-manipulation"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
          {isMenuOpen ? (
            <X className="w-6 h-6 text-primary-foreground relative z-10" />
          ) : (
            <Gamepad2 className="w-6 h-6 text-primary-foreground relative z-10 animate-pulse" />
          )}
        </button>
      </div>

      {/* Game Dialog */}
      <Dialog open={selectedGame !== null} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto neon-border">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {games.find((g) => g.id === selectedGame)?.name}
            </DialogTitle>
          </DialogHeader>
          {renderGame()}
        </DialogContent>
      </Dialog>
    </>
  )
}
