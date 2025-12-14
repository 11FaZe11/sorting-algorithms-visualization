"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface GraphColoringGameProps {
  onClose: () => void
}

const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ec4899"]

export function GraphColoringGame({ onClose }: GraphColoringGameProps) {
  const [nodes, setNodes] = useState<{ x: number; y: number; color: string | null }[]>([])
  const [edges, setEdges] = useState<[number, number][]>([])
  const [selectedColor, setSelectedColor] = useState<string>(colors[0])
  const [score, setScore] = useState(0)
  const [violations, setViolations] = useState(0)

  useEffect(() => {
    generateGraph()
  }, [])

  const generateGraph = () => {
    const numNodes = 8
    const newNodes = []
    const centerX = 200
    const centerY = 200
    const radius = 150

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * 2 * Math.PI
      newNodes.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        color: null,
      })
    }

    const newEdges: [number, number][] = []
    for (let i = 0; i < numNodes; i++) {
      const numConnections = Math.floor(Math.random() * 2) + 2
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * numNodes)
        if (target !== i && !newEdges.some((e) => (e[0] === i && e[1] === target) || (e[0] === target && e[1] === i))) {
          newEdges.push([i, target])
        }
      }
    }

    setNodes(newNodes)
    setEdges(newEdges)
    setScore(0)
    setViolations(0)
  }

  const colorNode = (index: number) => {
    const newNodes = [...nodes]
    newNodes[index].color = selectedColor

    let violationCount = 0
    edges.forEach(([a, b]) => {
      if (newNodes[a].color && newNodes[b].color && newNodes[a].color === newNodes[b].color) {
        violationCount++
      }
    })

    setNodes(newNodes)
    setViolations(violationCount)

    if (violationCount === 0 && newNodes.every((n) => n.color !== null)) {
      setScore((prev) => prev + 100)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Color the graph so no adjacent nodes have the same color!</p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive">{violations}</div>
            <div className="text-sm text-muted-foreground">Violations</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
              selectedColor === color ? "border-white scale-110" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="bg-card/50 rounded-lg border-2 border-border" style={{ height: "400px" }}>
        <svg width="100%" height="400">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
            />
          ))}
          {nodes.map((node, i) => (
            <g key={i} onClick={() => colorNode(i)} className="cursor-pointer">
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={node.color || "#1f2937"}
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary hover:scale-110 transition-transform"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white font-bold pointer-events-none"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <Button onClick={generateGraph} className="w-full bg-transparent" variant="outline">
        <RotateCcw className="w-4 h-4 mr-2" /> New Graph
      </Button>
    </div>
  )
}
