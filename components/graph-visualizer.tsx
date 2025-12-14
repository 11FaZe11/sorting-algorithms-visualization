"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface Node {
  id: number
  x: number
  y: number
  visited: boolean
  isPath: boolean
  exploring: boolean
  distance: number
}

interface Edge {
  from: number
  to: number
  weight: number
  active: boolean
}

interface GraphVisualizerProps {
  nodes: Node[]
  edges: Edge[]
  speed?: number
  startNode?: number
  endNode?: number
  onNodeClick?: (nodeId: number) => void
}

export function GraphVisualizer({ nodes, edges, speed = 1, startNode, endNode, onNodeClick }: GraphVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !nodes || nodes.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw edges first
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from)
      const toNode = nodes.find((n) => n.id === edge.to)
      if (!fromNode || !toNode) return

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)

      if (edge.active) {
        ctx.strokeStyle = "#00ff88"
        ctx.lineWidth = 3
        ctx.shadowColor = "rgba(0, 255, 136, 0.8)"
        ctx.shadowBlur = 10
      } else {
        ctx.strokeStyle = "#333366"
        ctx.lineWidth = 2
        ctx.shadowBlur = 0
      }

      ctx.stroke()

      // Draw weight
      const midX = (fromNode.x + toNode.x) / 2
      const midY = (fromNode.y + toNode.y) / 2
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(edge.weight.toString(), midX, midY - 10)
    })

    // Draw nodes
    nodes.forEach((node) => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2)

      // Determine node color
      if (node.id === startNode) {
        ctx.fillStyle = "#00ff00"
        ctx.shadowColor = "rgba(0, 255, 0, 0.8)"
        ctx.shadowBlur = 20
      } else if (node.id === endNode) {
        ctx.fillStyle = "#ff0080"
        ctx.shadowColor = "rgba(255, 0, 128, 0.8)"
        ctx.shadowBlur = 20
      } else if (node.isPath) {
        ctx.fillStyle = "#00ff88"
        ctx.shadowColor = "rgba(0, 255, 136, 0.8)"
        ctx.shadowBlur = 15
      } else if (node.exploring) {
        ctx.fillStyle = "#ff6600"
        ctx.shadowColor = "rgba(255, 102, 0, 0.6)"
        ctx.shadowBlur = 12
      } else if (node.visited) {
        ctx.fillStyle = "#0099ff"
        ctx.shadowColor = "rgba(0, 153, 255, 0.4)"
        ctx.shadowBlur = 8
      } else {
        ctx.fillStyle = "#1a1a2e"
        ctx.shadowBlur = 0
      }

      ctx.fill()

      // Draw node border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.shadowBlur = 0

      // Draw node ID
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.id.toString(), node.x, node.y)

      // Draw distance if available
      if (node.distance !== Number.POSITIVE_INFINITY && node.distance > 0) {
        ctx.font = "10px monospace"
        ctx.fillText(`d:${node.distance}`, node.x, node.y + 35)
      }
    })
  }, [nodes, edges, startNode, endNode])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onNodeClick || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find clicked node with larger touch area on mobile
    const touchRadius = window.innerWidth < 768 ? 35 : 25
    for (const node of nodes) {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      if (distance <= touchRadius) {
        onNodeClick(node.id)
        break
      }
    }
  }

  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!onNodeClick || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    const touchRadius = 35
    for (const node of nodes) {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      if (distance <= touchRadius) {
        onNodeClick(node.id)
        break
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-background rounded-lg border neon-border overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-manipulation"
        style={{ cursor: onNodeClick ? "pointer" : "default" }}
        onClick={handleClick}
        onTouchStart={handleTouch}
      />
    </div>
  )
}
