"use client"

interface PathfindingControlPanelProps {
  isRunning: boolean
  speed: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  isEditing: boolean
  editMode: "wall" | "start" | "end"
  onEditModeChange: (mode: "wall" | "start" | "end") => void
  onClearMaze: () => void
  onGenerateRandomMaze: () => void
  onGenerateRecursiveMaze: () => void
}

export function PathfindingControlPanel({
  isRunning,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  isEditing,
  editMode,
  onEditModeChange,
  onClearMaze,
  onGenerateRandomMaze,
  onGenerateRecursiveMaze,
}: PathfindingControlPanelProps) {
  return (
    <div className="space-y-4">
      {/* Playback Controls */}
      <div className="flex flex-wrap gap-2 md:gap-4">
        <button
          onClick={isRunning ? onPause : onPlay}
          disabled={isEditing}
          className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? "⏸️ Pause" : "▶️ Play"}
        </button>
        <button
          onClick={onReset}
          disabled={isEditing}
          className="px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 Reset
        </button>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-muted-foreground">⏱️ Speed: {speed.toFixed(2)}x</label>
        <input
          type="range"
          min="0.25"
          max="4"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(Number.parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">🎨 Maze Editor</h3>

        {/* Edit Mode Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onEditModeChange("wall")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
              isEditing && editMode === "wall"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            }`}
          >
            🧱 Wall
          </button>
          <button
            onClick={() => onEditModeChange("start")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
              isEditing && editMode === "start"
                ? "bg-green-600 text-white"
                : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            }`}
          >
            🟢 Start
          </button>
          <button
            onClick={() => onEditModeChange("end")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
              isEditing && editMode === "end"
                ? "bg-pink-600 text-white"
                : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            }`}
          >
            🔴 End
          </button>
        </div>

        {/* Maze Generation Options */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Generate Maze:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onGenerateRandomMaze}
              disabled={isRunning}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎲 Random
            </button>
            <button
              onClick={onGenerateRecursiveMaze}
              disabled={isRunning}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🌀 Recursive
            </button>
            <button
              onClick={onClearMaze}
              disabled={isRunning}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✨ Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
