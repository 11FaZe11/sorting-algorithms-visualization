"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
  x?: number
  y?: number
}

interface TreeBuilderGameProps {
  onClose: () => void
}

export function TreeBuilderGame({ onClose }: TreeBuilderGameProps) {
  const [root, setRoot] = useState<TreeNode | null>(null)
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (node === null) {
      setScore((prev) => prev + 10)
      return { value, left: null, right: null }
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value)
    } else if (value > node.value) {
      node.right = insertNode(node.right, value)
    }

    return node
  }

  const handleInsert = () => {
    const num = Number.parseInt(input)
    if (isNaN(num)) return

    setRoot((prev) => insertNode(prev, num))
    setInput("")
  }

  const renderTree = (node: TreeNode | null, x: number, y: number, offset: number): JSX.Element[] => {
    if (!node) return []

    const elements: JSX.Element[] = []

    if (node.left) {
      const leftX = x - offset
      const leftY = y + 60
      elements.push(
        <line
          key={`line-left-${node.value}`}
          x1={x}
          y1={y}
          x2={leftX}
          y2={leftY}
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/30"
        />,
      )
      elements.push(...renderTree(node.left, leftX, leftY, offset / 2))
    }

    if (node.right) {
      const rightX = x + offset
      const rightY = y + 60
      elements.push(
        <line
          key={`line-right-${node.value}`}
          x1={x}
          y1={y}
          x2={rightX}
          y2={rightY}
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/30"
        />,
      )
      elements.push(...renderTree(node.right, rightX, rightY, offset / 2))
    }

    elements.push(
      <g key={`node-${node.value}-${x}-${y}`} className="animate-in zoom-in">
        <circle cx={x} cy={y} r="20" fill="currentColor" className="text-primary" />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-primary-foreground font-bold text-sm"
        >
          {node.value}
        </text>
      </g>,
    )

    return elements
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Build a Binary Search Tree by inserting numbers!</p>
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary">{score}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleInsert()}
          placeholder="Enter a number..."
          className="text-lg"
        />
        <Button onClick={handleInsert} className="px-8">
          Insert
        </Button>
      </div>

      <div className="bg-card/50 rounded-lg border-2 border-border overflow-auto" style={{ height: "400px" }}>
        {root ? (
          <svg width="100%" height="400" className="min-w-[600px]">
            {renderTree(root, 300, 30, 100)}
          </svg>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Insert numbers to build the tree
          </div>
        )}
      </div>

      <Button
        onClick={() => {
          setRoot(null)
          setScore(0)
          setInput("")
        }}
        className="w-full"
        variant="outline"
      >
        <RotateCcw className="w-4 h-4 mr-2" /> Clear Tree
      </Button>
    </div>
  )
}
