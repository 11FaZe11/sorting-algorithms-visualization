"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react"

interface SearchControlPanelProps {
  isRunning: boolean
  speed: number
  arraySize: number
  target: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onShuffle: () => void
  onSpeedChange: (speed: number) => void
  onArraySizeChange: (size: number) => void
  onTargetChange: (target: number) => void
}

export function SearchControlPanel({
  isRunning,
  speed,
  arraySize,
  target,
  onPlay,
  onPause,
  onReset,
  onShuffle,
  onSpeedChange,
  onArraySizeChange,
  onTargetChange,
}: SearchControlPanelProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={isRunning ? onPause : onPlay}
          className="flex-1 min-w-[120px] h-12 touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95"
          size="lg"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Search
            </>
          )}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 min-w-[100px] h-12 touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent"
          size="lg"
          disabled={isRunning}
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
        <Button
          onClick={onShuffle}
          variant="outline"
          className="flex-1 min-w-[100px] h-12 touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent"
          size="lg"
          disabled={isRunning}
        >
          <Shuffle className="mr-2 h-5 w-5" />
          New Array
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="target" className="text-xs sm:text-sm font-medium">
            Target Value: {target}
          </Label>
          <Input
            id="target"
            type="number"
            value={target}
            onChange={(e) => onTargetChange(Number.parseInt(e.target.value) || 0)}
            disabled={isRunning}
            className="h-10 sm:h-11 text-base touch-manipulation"
            min="1"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speed" className="text-xs sm:text-sm font-medium">
            Speed: {speed}x
          </Label>
          <Slider
            id="speed"
            min={0.5}
            max={5}
            step={0.5}
            value={[speed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            disabled={isRunning}
            className="touch-manipulation"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-xs sm:text-sm font-medium">
            Array Size: {arraySize}
          </Label>
          <Slider
            id="size"
            min={10}
            max={50}
            step={5}
            value={[arraySize]}
            onValueChange={(value) => onArraySizeChange(value[0])}
            disabled={isRunning}
            className="touch-manipulation"
          />
        </div>
      </div>
    </div>
  )
}
