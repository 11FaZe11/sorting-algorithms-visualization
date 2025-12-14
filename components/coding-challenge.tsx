"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Play, RotateCcw, Lightbulb, CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react"
import { codingChallenges, type Challenge } from "@/lib/coding-challenges"

export function CodingChallenge() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(codingChallenges[0])
  const [language, setLanguage] = useState<"javascript" | "python">("javascript")
  const [code, setCode] = useState(selectedChallenge.starterCode.javascript)
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string; index: number }[]>([])
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set())
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCode(language === "javascript" ? selectedChallenge.starterCode.javascript : selectedChallenge.starterCode.python)
    setTestResults([])
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge, language])

  const handleChallengeChange = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
  }

  const runTests = () => {
    setIsRunning(true)
    const results: { passed: boolean; message: string; index: number }[] = []

    try {
      if (language === "javascript") {
        // Extract function name from starter code
        const funcMatch = selectedChallenge.starterCode.javascript.match(/function\s+(\w+)/)
        if (!funcMatch) throw new Error("Could not find function name")
        const funcName = funcMatch[1]

        // Create function from code
        const func = new Function(`return ${code.trim().replace(/^function\s+\w+/, "function")}`)()

        // Run test cases
        selectedChallenge.testCases.forEach((testCase, index) => {
          try {
            const result = func(...testCase.input)
            const passed = JSON.stringify(result) === JSON.stringify(testCase.expected)
            results.push({
              passed,
              message: passed
                ? `Test ${index + 1} passed!`
                : `Test ${index + 1} failed. Expected: ${JSON.stringify(testCase.expected)}, Got: ${JSON.stringify(result)}`,
              index,
            })
          } catch (error) {
            results.push({
              passed: false,
              message: `Test ${index + 1} error: ${error instanceof Error ? error.message : String(error)}`,
              index,
            })
          }
        })
      } else {
        // Python evaluation would require a backend or WASM Python interpreter
        results.push({
          passed: false,
          message: "Python execution is not yet supported in the browser. Please use JavaScript.",
          index: -1,
        })
      }

      setTestResults(results)

      // Check if all tests passed
      if (results.every((r) => r.passed)) {
        setSolvedChallenges((prev) => new Set(prev).add(selectedChallenge.id))
      }
    } catch (error) {
      setTestResults([
        {
          passed: false,
          message: `Error: ${error instanceof Error ? error.message : String(error)}`,
          index: -1,
        },
      ])
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setCode(language === "javascript" ? selectedChallenge.starterCode.javascript : selectedChallenge.starterCode.python)
    setTestResults([])
  }

  const toggleSolution = () => {
    if (!showSolution) {
      setCode(
        language === "javascript" ? selectedChallenge.solutionCode.javascript : selectedChallenge.solutionCode.python,
      )
    } else {
      setCode(
        language === "javascript" ? selectedChallenge.starterCode.javascript : selectedChallenge.starterCode.python,
      )
    }
    setShowSolution(!showSolution)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="h-full flex flex-col space-y-4 overflow-hidden">
      {/* Challenge Selector */}
      <div className="flex-shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Coding Challenges</h3>
          <div className="text-xs sm:text-sm text-muted-foreground">
            Solved: {solvedChallenges.size}/{codingChallenges.length}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {codingChallenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => handleChallengeChange(challenge)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 touch-manipulation whitespace-nowrap ${
                selectedChallenge.id === challenge.id
                  ? "bg-primary text-primary-foreground neon-glow-primary"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80"
              }`}
            >
              {solvedChallenges.has(challenge.id) && (
                <CheckCircle2 className="inline-block mr-1 h-3 w-3 text-green-400" />
              )}
              {challenge.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
        {/* Problem Description */}
        <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
          <Card className="p-4 neon-border bg-card/50">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{selectedChallenge.title}</h2>
                <Badge className={`${getDifficultyColor(selectedChallenge.difficulty)} text-xs`}>
                  {selectedChallenge.difficulty}
                </Badge>
              </div>
              <Badge variant="outline" className="text-xs">
                {selectedChallenge.category}
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedChallenge.description}</p>

              {/* Examples */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-foreground">Examples:</h4>
                {selectedChallenge.examples.map((example, index) => (
                  <div key={index} className="bg-muted/50 p-3 rounded-lg space-y-1">
                    <p className="text-xs font-mono">
                      <span className="text-muted-foreground">Input:</span>{" "}
                      <span className="text-accent">{example.input}</span>
                    </p>
                    <p className="text-xs font-mono">
                      <span className="text-muted-foreground">Output:</span>{" "}
                      <span className="text-accent">{example.output}</span>
                    </p>
                    {example.explanation && <p className="text-xs text-muted-foreground">{example.explanation}</p>}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-foreground">Constraints:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedChallenge.constraints.map((constraint, index) => (
                    <li key={index} className="text-xs text-muted-foreground">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hints */}
              <div>
                <Button onClick={() => setShowHints(!showHints)} variant="outline" size="sm" className="mb-2 text-xs">
                  <Lightbulb className="mr-2 h-3 w-3" />
                  {showHints ? "Hide" : "Show"} Hints
                </Button>
                {showHints && (
                  <div className="space-y-2 mt-2">
                    {selectedChallenge.hints.map((hint, index) => (
                      <div key={index} className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                        <p className="text-xs text-yellow-200">
                          💡 Hint {index + 1}: {hint}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Code Editor & Tests */}
        <div className="flex flex-col space-y-4 overflow-hidden">
          {/* Language Selector & Actions */}
          <div className="flex-shrink-0 flex flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                onClick={() => setLanguage("javascript")}
                variant={language === "javascript" ? "default" : "outline"}
                size="sm"
                className="text-xs"
              >
                JavaScript
              </Button>
              <Button
                onClick={() => setLanguage("python")}
                variant={language === "python" ? "default" : "outline"}
                size="sm"
                className="text-xs"
              >
                Python
              </Button>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button onClick={runTests} disabled={isRunning} className="bg-primary text-xs" size="sm">
                <Play className="mr-1 h-3 w-3" />
                Run Tests
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm" className="text-xs bg-transparent">
                <RotateCcw className="mr-1 h-3 w-3" />
                Reset
              </Button>
              <Button onClick={toggleSolution} variant="outline" size="sm" className="text-xs bg-transparent">
                {showSolution ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
                Solution
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 min-h-[200px] rounded-lg overflow-hidden neon-border bg-card">
            <div className="h-full flex flex-col">
              <div className="bg-muted px-4 py-2 border-b border-border flex-shrink-0">
                <span className="text-xs font-mono text-muted-foreground">
                  {selectedChallenge.id}.{language === "javascript" ? "js" : "py"}
                </span>
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-transparent text-foreground font-mono text-xs sm:text-sm p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ tabSize: 2, lineHeight: "1.6" }}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Test Results */}
          <div className="flex-shrink-0 rounded-lg overflow-hidden neon-border bg-card max-h-[200px]">
            <div className="bg-muted px-4 py-2 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground">Test Results</span>
            </div>
            <div className="p-4 overflow-y-auto max-h-[150px]">
              {testResults.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">Run tests to see results...</p>
              ) : (
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 p-2 rounded-lg ${
                        result.passed
                          ? "bg-green-500/10 border border-green-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}
                    >
                      {result.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-xs break-words">{result.message}</p>
                    </div>
                  ))}
                  {testResults.every((r) => r.passed) && (
                    <div className="mt-4 p-3 bg-primary/20 border border-primary rounded-lg text-center">
                      <p className="text-sm font-semibold text-primary">🎉 All tests passed! Challenge completed!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
