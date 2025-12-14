"use client"

import { algorithmDetails } from "@/lib/algorithm-details"
import { useState } from "react"
import { Check, Copy, Home, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AlgorithmsPage() {
  const [selectedAlgo, setSelectedAlgo] = useState("bubble-sort")
  const [expandedCode, setExpandedCode] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "sorting" | "pathfinding" | "search">("all")

  const algo = algorithmDetails[selectedAlgo]
  const allAlgorithms = Object.keys(algorithmDetails)

  const categories = {
    sorting: [
      "bubble-sort",
      "selection-sort",
      "insertion-sort",
      "merge-sort",
      "quick-sort",
      "heap-sort",
      "counting-sort",
      "radix-sort",
      "bucket-sort",
      "shell-sort",
    ],
    pathfinding: ["bfs", "dfs", "dijkstra", "astar"],
    search: [
      "linear-search",
      "binary-search",
      "jump-search",
      "interpolation-search",
      "exponential-search",
      "ternary-search",
    ],
  }

  const algorithms =
    selectedCategory === "all"
      ? allAlgorithms
      : allAlgorithms.filter((key) => categories[selectedCategory]?.includes(key))

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const highlightCode = (code: string, language: "python" | "javascript") => {
    const keywords =
      language === "python"
        ? [
            "def",
            "return",
            "if",
            "else",
            "elif",
            "for",
            "while",
            "in",
            "range",
            "len",
            "True",
            "False",
            "None",
            "and",
            "or",
            "not",
            "import",
            "from",
            "as",
            "class",
            "pass",
            "break",
            "continue",
          ]
        : [
            "function",
            "const",
            "let",
            "var",
            "return",
            "if",
            "else",
            "for",
            "while",
            "do",
            "break",
            "continue",
            "new",
            "class",
            "this",
            "super",
            "extends",
            "import",
            "export",
            "default",
            "async",
            "await",
            "try",
            "catch",
            "throw",
          ]

    const types = [
      "Array",
      "Map",
      "Set",
      "Object",
      "String",
      "Number",
      "Boolean",
      "Math",
      "floor",
      "ceil",
      "max",
      "min",
      "abs",
      "push",
      "pop",
      "shift",
      "unshift",
      "slice",
      "splice",
      "sort",
      "concat",
      "append",
      "extend",
      "insert",
      "remove",
      "clear",
      "get",
      "set",
      "add",
      "has",
      "delete",
    ]

    let highlighted = code

    // Highlight keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, "g")
      highlighted = highlighted.replace(regex, '<span class="text-purple-400 font-semibold">$1</span>')
    })

    // Highlight types and built-in functions
    types.forEach((type) => {
      const regex = new RegExp(`\\b(${type})\\b`, "g")
      highlighted = highlighted.replace(regex, '<span class="text-cyan-400">$1</span>')
    })

    // Highlight strings
    highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>')

    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')

    // Highlight comments
    if (language === "python") {
      highlighted = highlighted.replace(/(#.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
      highlighted = highlighted.replace(/("""[\s\S]*?""")/g, '<span class="text-gray-500 italic">$1</span>')
    } else {
      highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
      highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>')
    }

    return highlighted
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 fade-in">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent inline-flex items-center gap-3 float-animation">
                  <Sparkles className="w-8 h-8 text-primary" />
                  Algorithm Documentation
                </span>
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Full pseudocode, Python, and JavaScript implementations for all algorithms
              </p>
            </div>
            <Link href="/">
              <button className="group px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg neon-border flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Back to Visualizer</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card border neon-border rounded-lg p-4 space-y-2 sticky top-24 slide-in shadow-lg">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span>Algorithms</span>
              </h2>

              <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory("sorting")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    selectedCategory === "sorting"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  Sorting
                </button>
                <button
                  onClick={() => setSelectedCategory("pathfinding")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    selectedCategory === "pathfinding"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  Pathfinding
                </button>
                <button
                  onClick={() => setSelectedCategory("search")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    selectedCategory === "search"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  Search
                </button>
              </div>

              <div className="space-y-2">
                {algorithms.map((key, index) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAlgo(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                      selectedAlgo === key
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground neon-border shadow-lg scale-105"
                        : "bg-card hover:bg-secondary/50 text-foreground border border-border hover:border-primary/50"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "slideIn 0.5s ease-out forwards",
                    }}
                  >
                    <span className="mr-2 text-xl">{algorithmDetails[key].emoji}</span>
                    <span className="font-medium">{algorithmDetails[key].name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {algo && (
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-card border neon-border rounded-lg p-6 space-y-4 slide-in shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                    <span className="text-4xl">{algo.emoji}</span>
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {algo.name}
                    </span>
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">{algo.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                    <p className="text-xs text-muted-foreground mb-1">⏱️ Time Complexity</p>
                    <p className="text-lg font-bold text-primary">{algo.complexity.time}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300">
                    <p className="text-xs text-muted-foreground mb-1">💾 Space Complexity</p>
                    <p className="text-lg font-bold text-accent">{algo.complexity.space}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300">
                    <p className="text-xs text-muted-foreground mb-1">✨ Best Case</p>
                    <p className="text-sm font-bold text-green-400">{algo.complexity?.best || "N/A"}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300">
                    <p className="text-xs text-muted-foreground mb-1">⚠️ Worst Case</p>
                    <p className="text-sm font-bold text-red-400">{algo.complexity?.worst || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border neon-border rounded-lg p-6 slide-in hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Use Cases
                </h3>
                <p className="text-foreground leading-relaxed">{algo.useCase}</p>
              </div>

              <div className="bg-card border neon-border rounded-lg p-6 slide-in hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setExpandedCode(expandedCode === "pseudo" ? null : "pseudo")}
                    className="text-xl font-bold hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📄</span>
                    <span>Pseudocode</span>
                    <span className="text-sm">{expandedCode === "pseudo" ? "▼" : "▶"}</span>
                  </button>
                  {expandedCode === "pseudo" && (
                    <button
                      onClick={() => copyToClipboard(algo.pseudocode, "pseudo")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-all duration-300 hover:scale-105 neon-border"
                    >
                      {copiedCode === "pseudo" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                {expandedCode === "pseudo" && (
                  <div className="overflow-hidden">
                    <pre className="bg-background rounded-lg p-4 overflow-x-auto text-sm text-accent border border-border shadow-inner animate-in slide-in-from-top-2 duration-300">
                      <code>{algo.pseudocode}</code>
                    </pre>
                  </div>
                )}
              </div>

              <div className="bg-card border neon-border rounded-lg p-6 slide-in hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setExpandedCode(expandedCode === "python" ? null : "python")}
                    className="text-xl font-bold hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🐍</span>
                    <span>Python Implementation</span>
                    <span className="text-sm">{expandedCode === "python" ? "▼" : "▶"}</span>
                  </button>
                  {expandedCode === "python" && (
                    <button
                      onClick={() => copyToClipboard(algo.pythonImplementation, "python")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-all duration-300 hover:scale-105 neon-border"
                    >
                      {copiedCode === "python" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                {expandedCode === "python" && (
                  <div className="overflow-hidden">
                    <div className="bg-[#1e1e1e] rounded-lg border border-border shadow-inner animate-in slide-in-from-top-2 duration-300">
                      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-sm text-gray-400">Python</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm font-mono">
                        <code
                          className="text-[#d4d4d4]"
                          dangerouslySetInnerHTML={{ __html: highlightCode(algo.pythonImplementation, "python") }}
                        />
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-card border neon-border rounded-lg p-6 slide-in hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setExpandedCode(expandedCode === "code" ? null : "code")}
                    className="text-xl font-bold hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">💻</span>
                    <span>JavaScript Implementation</span>
                    <span className="text-sm">{expandedCode === "code" ? "▼" : "▶"}</span>
                  </button>
                  {expandedCode === "code" && (
                    <button
                      onClick={() => copyToClipboard(algo.codeImplementation, "code")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-all duration-300 hover:scale-105 neon-border"
                    >
                      {copiedCode === "code" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                {expandedCode === "code" && (
                  <div className="overflow-hidden">
                    <div className="bg-[#1e1e1e] rounded-lg border border-border shadow-inner animate-in slide-in-from-top-2 duration-300">
                      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-sm text-gray-400">JavaScript</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm font-mono">
                        <code
                          className="text-[#d4d4d4]"
                          dangerouslySetInnerHTML={{ __html: highlightCode(algo.codeImplementation, "javascript") }}
                        />
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
