"use client"

import { Button } from "@/components/ui/button"

const graphAlgorithms = [
  { id: "bfs", name: "BFS", emoji: "🌊", description: "Breadth-First Search" },
  { id: "dfs", name: "DFS", emoji: "🏔️", description: "Depth-First Search" },
  { id: "dijkstra", name: "Dijkstra", emoji: "🎯", description: "Shortest Path" },
  { id: "bellman-ford", name: "Bellman-Ford", emoji: "⚡", description: "Negative Weights" },
  { id: "prims", name: "Prim's MST", emoji: "🌳", description: "Minimum Spanning Tree" },
  { id: "kruskals", name: "Kruskal's MST", emoji: "🌲", description: "Minimum Spanning Tree" },
]

interface GraphAlgorithmSelectorProps {
  selected: string
  onSelect: (algorithm: string) => void
}

export function GraphAlgorithmSelector({ selected, onSelect }: GraphAlgorithmSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {graphAlgorithms.map((algo) => (
        <Button
          key={algo.id}
          variant={selected === algo.id ? "default" : "outline"}
          className={`w-full justify-start transition-all duration-300 ${
            selected === algo.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-105"
              : "hover:scale-105 hover:shadow-md"
          }`}
          onClick={() => onSelect(algo.id)}
        >
          <span className="text-xl mr-2">{algo.emoji}</span>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm">{algo.name}</span>
            <span className="text-xs opacity-75">{algo.description}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}
