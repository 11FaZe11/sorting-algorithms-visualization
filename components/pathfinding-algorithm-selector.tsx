"use client"

type PathfindingAlgorithm = "bfs" | "dfs" | "dijkstra" | "astar"

interface PathfindingAlgorithmSelectorProps {
  selected: PathfindingAlgorithm
  onSelect: (algorithm: PathfindingAlgorithm) => void
}

const pathfindingAlgorithms: Array<{ id: PathfindingAlgorithm; name: string; emoji: string }> = [
  { id: "bfs", name: "Breadth-First Search", emoji: "🌊" },
  { id: "dfs", name: "Depth-First Search", emoji: "🔍" },
  { id: "dijkstra", name: "Dijkstra's Algorithm", emoji: "📊" },
  { id: "astar", name: "A* Algorithm", emoji: "⭐" },
]

export function PathfindingAlgorithmSelector({ selected, onSelect }: PathfindingAlgorithmSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-muted-foreground">🧭 Algorithm</label>
      <div className="space-y-2">
        {pathfindingAlgorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => onSelect(algo.id)}
            className={`w-full p-3 rounded-lg border-2 transition-all text-left font-semibold touch-manipulation ${
              selected === algo.id
                ? "border-primary bg-primary/10 text-primary neon-glow-primary"
                : "border-border bg-card hover:bg-card/80 text-foreground"
            }`}
          >
            {algo.emoji} {algo.name}
          </button>
        ))}
      </div>
    </div>
  )
}
