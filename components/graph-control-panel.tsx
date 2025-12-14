"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Shuffle, Network } from "lucide-react"

interface GraphControlPanelProps {
  isRunning: boolean
  speed: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  onGenerateRandom: () => void
  onGenerateComplete: () => void
  onGenerateTree: () => void
}

export function GraphControlPanel({
  isRunning,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  onGenerateRandom,
  onGenerateComplete,
  onGenerateTree,
}: GraphControlPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={isRunning ? onPause : onPlay}
          className="flex-1 transition-all duration-300 hover:scale-105"
          variant={isRunning ? "secondary" : "default"}
        >
          {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 transition-all duration-300 hover:scale-105 bg-transparent"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Speed: {speed}x</label>
        <Slider
          value={[speed]}
          onValueChange={(values) => onSpeedChange(values[0])}
          min={0.5}
          max={5}
          step={0.5}
          className="transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Generate Graph</label>
        <div className="space-y-2">
          <Button
            onClick={onGenerateRandom}
            variant="outline"
            className="w-full transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Random Graph
          </Button>
          <Button
            onClick={onGenerateComplete}
            variant="outline"
            className="w-full transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Network className="mr-2 h-4 w-4" />
            Complete Graph
          </Button>
          <Button
            onClick={onGenerateTree}
            variant="outline"
            className="w-full transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Network className="mr-2 h-4 w-4" />
            Tree Structure
          </Button>
        </div>
      </div>
    </div>
  )
}
