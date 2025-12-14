"use client"

import { useEffect, useState } from "react"

interface TerminalOutputProps {
  algorithm: string
  arraySize: number
  comparingIndices: number[]
  swappedIndices: number[]
  sortedIndices: number[]
  isRunning: boolean
}

export function TerminalOutput({
  algorithm,
  arraySize,
  comparingIndices,
  swappedIndices,
  sortedIndices,
  isRunning,
}: TerminalOutputProps) {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const newLogs: string[] = []

    newLogs.push(`$ sorting-visualizer --algorithm ${algorithm} --size ${arraySize}`)
    newLogs.push(`> Initializing ${algorithm} sort...`)
    newLogs.push(`> Array size: ${arraySize} elements`)

    if (isRunning) {
      newLogs.push(`⏱️  Status: SORTING...`)
      newLogs.push(`🔄 Comparing indices: [${comparingIndices.join(", ")}]`)
      if (swappedIndices.length > 0) {
        newLogs.push(`⚡ Swapped indices: [${swappedIndices.join(", ")}]`)
      }
      newLogs.push(`✅ Sorted indices: [${sortedIndices.join(", ")}]`)
      newLogs.push(`📊 Progress: ${Math.round((sortedIndices.length / arraySize) * 100)}%`)
    } else {
      if (sortedIndices.length === arraySize) {
        newLogs.push(`✅ Status: COMPLETE`)
        newLogs.push(`🎉 Array successfully sorted!`)
        newLogs.push(`📊 Total elements sorted: ${sortedIndices.length}/${arraySize}`)
      } else {
        newLogs.push(`⏸️  Status: PAUSED`)
        newLogs.push(`📊 Elements sorted so far: ${sortedIndices.length}/${arraySize}`)
      }
    }

    newLogs.push(`> Ready for next operation...`)

    setLogs(newLogs)
  }, [algorithm, arraySize, comparingIndices, swappedIndices, sortedIndices, isRunning])

  return (
    <div className="bg-background border neon-border rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <span className="text-primary font-bold">Terminal</span>
        <div className="flex-1"></div>
        <span className="text-xs text-muted-foreground">v0.1.0</span>
      </div>

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="text-accent leading-relaxed">
            {log.startsWith("$") ? (
              <span className="text-primary">{log}</span>
            ) : log.startsWith(">") ? (
              <span className="text-secondary">{log}</span>
            ) : log.includes("Status: SORTING") ? (
              <span className="text-orange-400 animate-pulse">{log}</span>
            ) : log.includes("COMPLETE") ? (
              <span className="text-green-400">{log}</span>
            ) : log.includes("PAUSED") ? (
              <span className="text-yellow-400">{log}</span>
            ) : (
              <span>{log}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
        <span className="animate-pulse">▌</span> Waiting for input...
      </div>
    </div>
  )
}
