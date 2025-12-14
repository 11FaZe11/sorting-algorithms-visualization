"use client"
import { Button } from "@/components/ui/button"
import { type AlgorithmName, algorithmInfo } from "@/lib/sorting-algorithms"

interface AlgorithmSelectorProps {
  selected: AlgorithmName
  onSelect: (algorithm: AlgorithmName) => void
}

const algorithms: AlgorithmName[] = [
  "bubble-sort",
  "selection-sort",
  "insertion-sort",
  "merge-sort",
  "quick-sort",
  "heap-sort",
  "shell-sort",
  "cocktail-sort",
  "counting-sort",
  "radix-sort",
]

export function AlgorithmSelector({ selected, onSelect }: AlgorithmSelectorProps) {
  const info = algorithmInfo[selected]

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {algorithms.map((algo) => (
          <Button
            key={algo}
            onClick={() => onSelect(algo)}
            variant={selected === algo ? "default" : "outline"}
            className={`h-12 sm:h-auto text-lg sm:text-base font-medium transition-all touch-manipulation active:scale-95 ${
              selected === algo
                ? "bg-primary text-primary-foreground neon-glow-primary border-primary"
                : "border-muted-foreground/30 hover:border-primary/50 text-foreground/80"
            }`}
            title={algorithmInfo[algo].name}
          >
            {algorithmInfo[algo].emoji}
          </Button>
        ))}
      </div>

      <div className="bg-card border neon-border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-primary">{info.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{info.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">⏱️ Time Complexity</p>
            <p className="text-xs sm:text-sm font-mono text-accent mt-0.5">{info.complexity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">✨ Best Case</p>
            <p className="text-xs sm:text-sm font-mono text-secondary mt-0.5">{info.bestCase}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground">⚠️ Worst Case</p>
            <p className="text-xs sm:text-sm font-mono text-destructive mt-0.5">{info.worstCase}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
