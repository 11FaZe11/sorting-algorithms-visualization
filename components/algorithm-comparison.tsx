"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Plus, X } from "lucide-react"
import { getSortingGenerator, algorithmInfo, type AlgorithmName, type SortState } from "@/lib/sorting-algorithms"

interface AlgorithmInstance {
  id: string
  algorithm: AlgorithmName
  state: SortState
  generator: Generator<SortState> | null
  metrics: {
    comparisons: number
    swaps: number
    time: number
    completed: boolean
  }
}

export function AlgorithmComparison() {
  const [arraySize, setArraySize] = useState(30)
  const [speed, setSpeed] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [instances, setInstances] = useState<AlgorithmInstance[]>([
    {
      id: "1",
      algorithm: "bubble-sort",
      state: { array: [], comparingIndices: [], swappedIndices: [], sortedIndices: [] },
      generator: null,
      metrics: { comparisons: 0, swaps: 0, time: 0, completed: false },
    },
    {
      id: "2",
      algorithm: "quick-sort",
      state: { array: [], comparingIndices: [], swappedIndices: [], sortedIndices: [] },
      generator: null,
      metrics: { comparisons: 0, swaps: 0, time: 0, completed: false },
    },
  ])

  const controlRef = useRef({ shouldStop: false })
  const startTimeRef = useRef<{ [key: string]: number }>({})

  // Initialize arrays
  useEffect(() => {
    resetAll()
  }, [arraySize])

  const resetAll = () => {
    controlRef.current.shouldStop = true
    setIsRunning(false)

    const baseArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)

    setInstances((prev) =>
      prev.map((instance) => ({
        ...instance,
        state: {
          array: [...baseArray],
          comparingIndices: [],
          swappedIndices: [],
          sortedIndices: [],
        },
        generator: null,
        metrics: { comparisons: 0, swaps: 0, time: 0, completed: false },
      })),
    )
    startTimeRef.current = {}
  }

  const handleStart = async () => {
    if (isRunning) {
      controlRef.current.shouldStop = true
      setIsRunning(false)
      return
    }

    controlRef.current.shouldStop = false
    setIsRunning(true)

    // Initialize generators and start times
    const updatedInstances = instances.map((instance) => {
      startTimeRef.current[instance.id] = Date.now()
      return {
        ...instance,
        generator: getSortingGenerator(instance.algorithm, instance.state.array),
        metrics: { ...instance.metrics, completed: false },
      }
    })

    setInstances(updatedInstances)

    // Run all algorithms simultaneously
    const runAlgorithm = async (instanceId: string, generator: Generator<SortState>) => {
      let lastState: SortState | null = null

      for (const state of generator) {
        if (controlRef.current.shouldStop) break

        lastState = state

        setInstances((prev) =>
          prev.map((inst) => {
            if (inst.id === instanceId) {
              const comparisons = inst.metrics.comparisons + (state.comparingIndices.length > 0 ? 1 : 0)
              const swaps = inst.metrics.swaps + (state.swappedIndices.length > 0 ? 1 : 0)
              const time = Date.now() - startTimeRef.current[instanceId]

              return {
                ...inst,
                state,
                metrics: { ...inst.metrics, comparisons, swaps, time },
              }
            }
            return inst
          }),
        )

        await new Promise((resolve) => setTimeout(resolve, 1000 / speed))
      }

      // Mark as completed
      if (lastState && !controlRef.current.shouldStop) {
        setInstances((prev) =>
          prev.map((inst) => {
            if (inst.id === instanceId) {
              return {
                ...inst,
                metrics: { ...inst.metrics, completed: true, time: Date.now() - startTimeRef.current[instanceId] },
              }
            }
            return inst
          }),
        )
      }
    }

    // Start all algorithms
    await Promise.all(
      updatedInstances.map((instance) =>
        instance.generator ? runAlgorithm(instance.id, instance.generator) : Promise.resolve(),
      ),
    )

    setIsRunning(false)
  }

  const addAlgorithm = () => {
    if (instances.length >= 3) return

    const baseArray =
      instances[0]?.state.array || Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)

    setInstances((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        algorithm: "merge-sort",
        state: {
          array: [...baseArray],
          comparingIndices: [],
          swappedIndices: [],
          sortedIndices: [],
        },
        generator: null,
        metrics: { comparisons: 0, swaps: 0, time: 0, completed: false },
      },
    ])
  }

  const removeAlgorithm = (id: string) => {
    if (instances.length <= 1) return
    setInstances((prev) => prev.filter((inst) => inst.id !== id))
  }

  const updateAlgorithm = (id: string, algorithm: AlgorithmName) => {
    setInstances((prev) => prev.map((inst) => (inst.id === id ? { ...inst, algorithm } : inst)))
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Controls */}
      <Card className="p-4 md:p-6 neon-border bg-card/50 backdrop-blur-sm">
        <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-between">
          <div className="flex gap-2 md:gap-3">
            <Button onClick={handleStart} className="neon-button touch-manipulation min-h-[44px] px-4 md:px-6">
              {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isRunning ? "Pause" : "Run All"}
            </Button>
            <Button
              onClick={resetAll}
              variant="outline"
              className="neon-border touch-manipulation min-h-[44px] bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            {instances.length < 3 && (
              <Button
                onClick={addAlgorithm}
                variant="outline"
                className="neon-border touch-manipulation min-h-[44px] bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            )}
          </div>

          <div className="flex gap-4 items-center w-full sm:w-auto">
            <div className="flex-1 sm:w-32">
              <label className="text-xs text-muted-foreground mb-1 block">Size: {arraySize}</label>
              <Slider value={[arraySize]} onValueChange={([v]) => setArraySize(v)} min={10} max={50} step={5} />
            </div>
            <div className="flex-1 sm:w-32">
              <label className="text-xs text-muted-foreground mb-1 block">Speed: {speed}x</label>
              <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={0.5} max={5} step={0.5} />
            </div>
          </div>
        </div>
      </Card>

      {/* Algorithm Instances */}
      <div
        className={`grid gap-4 md:gap-6 ${instances.length === 1 ? "grid-cols-1" : instances.length === 2 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
      >
        {instances.map((instance) => (
          <AlgorithmCard
            key={instance.id}
            instance={instance}
            onRemove={() => removeAlgorithm(instance.id)}
            onAlgorithmChange={(algo) => updateAlgorithm(instance.id, algo)}
            canRemove={instances.length > 1}
          />
        ))}
      </div>

      {/* Comparison Summary */}
      <Card className="p-4 md:p-6 neon-border bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 md:px-4">Algorithm</th>
                <th className="text-center py-2 px-2 md:px-4">Comparisons</th>
                <th className="text-center py-2 px-2 md:px-4">Swaps</th>
                <th className="text-center py-2 px-2 md:px-4">Time (ms)</th>
                <th className="text-center py-2 px-2 md:px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance) => (
                <tr key={instance.id} className="border-b border-border/50">
                  <td className="py-2 px-2 md:px-4 font-medium break-words">
                    {algorithmInfo[instance.algorithm].name}
                  </td>
                  <td className="text-center py-2 px-2 md:px-4">{instance.metrics.comparisons}</td>
                  <td className="text-center py-2 px-2 md:px-4">{instance.metrics.swaps}</td>
                  <td className="text-center py-2 px-2 md:px-4">{instance.metrics.time}</td>
                  <td className="text-center py-2 px-2 md:px-4">
                    {instance.metrics.completed ? (
                      <span className="text-green-500">✓ Complete</span>
                    ) : isRunning ? (
                      <span className="text-yellow-500">Running...</span>
                    ) : (
                      <span className="text-muted-foreground">Ready</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function AlgorithmCard({
  instance,
  onRemove,
  onAlgorithmChange,
  canRemove,
}: {
  instance: AlgorithmInstance
  onRemove: () => void
  onAlgorithmChange: (algo: AlgorithmName) => void
  canRemove: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width
      canvas.height = 300
    }

    const barWidth = canvas.width / instance.state.array.length
    const maxValue = Math.max(...instance.state.array, 1)
    const padding = 20
    const drawHeight = canvas.height - padding * 2

    // Clear canvas
    ctx.fillStyle = "rgba(13, 13, 25, 0.8)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw bars
    instance.state.array.forEach((value, index) => {
      const x = index * barWidth
      const barHeight = (value / maxValue) * drawHeight
      const y = canvas.height - padding - barHeight

      let fillColor = "rgba(167, 102, 255, 0.7)"

      if (instance.state.sortedIndices.includes(index)) {
        fillColor = "rgba(153, 255, 153, 0.8)"
      } else if (instance.state.comparingIndices.includes(index)) {
        fillColor = "rgba(255, 153, 102, 0.9)"
      } else if (instance.state.swappedIndices.includes(index)) {
        fillColor = "rgba(153, 204, 255, 0.9)"
      }

      ctx.fillStyle = fillColor
      ctx.fillRect(x, y, barWidth - 1, barHeight)
    })
  }, [instance.state])

  const algoInfo = algorithmInfo[instance.algorithm]

  return (
    <Card className="p-3 md:p-4 neon-border bg-card/50 backdrop-blur-sm space-y-3 md:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Select value={instance.algorithm} onValueChange={(v) => onAlgorithmChange(v as AlgorithmName)}>
          <SelectTrigger className="w-full neon-border text-sm md:text-base min-h-[44px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(algorithmInfo).map(([key, info]) => (
              <SelectItem key={key} value={key}>
                {info.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="neon-border min-h-[44px] min-w-[44px] flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Visualization */}
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[300px] rounded-lg border neon-border" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 text-center">
        <div className="bg-background/50 rounded-lg p-2 neon-border">
          <div className="text-xs text-muted-foreground">Comparisons</div>
          <div className="text-base md:text-lg font-bold text-primary">{instance.metrics.comparisons}</div>
        </div>
        <div className="bg-background/50 rounded-lg p-2 neon-border">
          <div className="text-xs text-muted-foreground">Swaps</div>
          <div className="text-base md:text-lg font-bold text-primary">{instance.metrics.swaps}</div>
        </div>
        <div className="bg-background/50 rounded-lg p-2 neon-border">
          <div className="text-xs text-muted-foreground">Time (ms)</div>
          <div className="text-base md:text-lg font-bold text-primary">{instance.metrics.time}</div>
        </div>
        <div className="bg-background/50 rounded-lg p-2 neon-border">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="text-xs md:text-sm font-bold">{instance.metrics.completed ? "✓ Done" : "Pending"}</div>
        </div>
      </div>

      {/* Complexity Info */}
      <div className="text-xs text-muted-foreground space-y-1 bg-background/30 rounded-lg p-2 md:p-3">
        <div className="break-words">
          <strong>Best:</strong> {algoInfo.bestCase}
        </div>
        <div className="break-words">
          <strong>Worst:</strong> {algoInfo.worstCase}
        </div>
      </div>
    </Card>
  )
}
