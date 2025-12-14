"use client"

import { useState } from "react"

interface CodeDisplayProps {
  pseudocode: string
  code: string
  language?: string
}

export function CodeDisplay({ pseudocode, code, language = "javascript" }: CodeDisplayProps) {
  const [activeTab, setActiveTab] = useState<"pseudo" | "code">("pseudo")

  return (
    <div className="bg-card border neon-border rounded-lg overflow-hidden">
      <div className="flex border-b border-border bg-background">
        <button
          onClick={() => setActiveTab("pseudo")}
          className={`flex-1 px-4 py-3 font-semibold transition-colors ${
            activeTab === "pseudo"
              ? "bg-primary text-primary-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📄 Pseudocode
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`flex-1 px-4 py-3 font-semibold transition-colors ${
            activeTab === "code"
              ? "bg-primary text-primary-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          💻 Code
        </button>
      </div>

      <div className="p-4 bg-background overflow-x-auto">
        <pre className="text-sm font-mono text-accent leading-relaxed">
          <code>{activeTab === "pseudo" ? pseudocode : code}</code>
        </pre>
      </div>
    </div>
  )
}
