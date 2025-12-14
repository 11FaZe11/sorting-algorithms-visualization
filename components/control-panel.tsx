"use client"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface ControlPanelProps {
  isRunning: boolean
  speed: number
  arraySize: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onShuffle: () => void
  onSpeedChange: (speed: number) => void
  onArraySizeChange: (size: number) => void
}

export function ControlPanel({
  isRunning,
  speed,
  arraySize,
  onPlay,
  onPause,
  onReset,
  onShuffle,
  onSpeedChange,
  onArraySizeChange,
}: ControlPanelProps) {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <div className="flex flex-col gap-2">
        <Button
          onClick={isRunning ? onPause : onPlay}
          className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/80 text-primary-foreground neon-glow-primary transition-all duration-300 active:scale-95 touch-manipulation"
        >
          <span className="text-sm sm:text-base">{isRunning ? "⏸️ Pause" : "▶️ Play"}</span>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onReset}
            variant="outline"
            className="h-11 sm:h-12 border-accent text-accent hover:bg-accent/10 neon-glow-accent bg-transparent transition-all duration-300 active:scale-95 touch-manipulation"
          >
            <span className="text-sm sm:text-base">🔄 Reset</span>
          </Button>
          <Button
            onClick={onShuffle}
            variant="outline"
            className="h-11 sm:h-12 border-secondary text-secondary hover:bg-secondary/10 bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
          >
            <span className="text-sm sm:text-base">🔀 Shuffle</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-medium text-foreground flex justify-between items-center">
          <span>⚡ Speed Control</span>
          <span className="text-primary font-mono text-sm sm:text-base">{speed.toFixed(2)}x</span>
        </label>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          min={0.25}
          max={4}
          step={0.25}
          className="w-full transition-all duration-300 h-8 sm:h-auto touch-manipulation"
        />
      </div>

      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-medium text-foreground flex justify-between items-center">
          <span>📊 Array Size</span>
          <span className="text-accent font-mono text-sm sm:text-base">{arraySize} elements</span>
        </label>
        <Slider
          value={[arraySize]}
          onValueChange={(value) => onArraySizeChange(value[0])}
          min={10}
          max={200}
          step={10}
          className="w-full transition-all duration-300 h-8 sm:h-auto touch-manipulation"
        />
      </div>
    </div>
  )
}
