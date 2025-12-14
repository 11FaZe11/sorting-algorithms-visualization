"use client"

import { useState, useMemo } from "react"

export interface SearchableAlgorithm {
  id: string
  name: string
  category: "sorting" | "pathfinding"
  tags: string[]
}

interface SearchBarProps {
  algorithms: SearchableAlgorithm[]
  onSelect: (algorithmId: string) => void
  placeholder?: string
}

export function SearchBar({ algorithms, onSelect, placeholder = "Search algorithms..." }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query) return []

    const lowerQuery = query.toLowerCase()
    return algorithms.filter(
      (algo) =>
        algo.name.toLowerCase().includes(lowerQuery) || algo.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }, [query, algorithms])

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                onSelect(algo.id)
                setQuery("")
              }}
              className="w-full px-4 py-2 text-left hover:bg-primary/20 border-b border-border last:border-b-0 transition-colors"
            >
              <div className="font-semibold text-foreground">{algo.name}</div>
              <div className="text-sm text-muted-foreground capitalize">{algo.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
