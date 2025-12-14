"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Copy, Check, Download } from "lucide-react"

interface CodeFile {
  name: string
  language: string
  code: string
}

const defaultFiles: CodeFile[] = [
  {
    name: "bubble-sort.js",
    language: "javascript",
    code: `// Bubble Sort Implementation
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Test it
const array = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", array);
console.log("Sorted:", bubbleSort([...array]));`,
  },
  {
    name: "binary-search.js",
    language: "javascript",
    code: `// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Test it
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("Array:", sortedArray);
console.log("Index of 7:", binarySearch(sortedArray, 7));
console.log("Index of 4:", binarySearch(sortedArray, 4));`,
  },
  {
    name: "playground.js",
    language: "javascript",
    code: `// Your Code Playground
// Write any JavaScript code here!

console.log("Hello from Code Editor!");

// Try some algorithms
const numbers = [5, 2, 8, 1, 9];
console.log("Numbers:", numbers);

// Sort them
numbers.sort((a, b) => a - b);
console.log("Sorted:", numbers);`,
  },
]

export function CodeEditor() {
  const [files, setFiles] = useState<CodeFile[]>(defaultFiles)
  const [activeFile, setActiveFile] = useState(0)
  const [code, setCode] = useState(files[activeFile].code)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleCodeChange = (value: string) => {
    setCode(value)
    const updatedFiles = [...files]
    updatedFiles[activeFile].code = value
    setFiles(updatedFiles)
  }

  const handleFileChange = (index: number) => {
    setActiveFile(index)
    setCode(files[index].code)
  }

  const runCode = () => {
    setIsRunning(true)
    setOutput([])

    // Create a custom console.log that captures output
    const logs: string[] = []
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map((arg) => JSON.stringify(arg, null, 2)).join(" "))
      },
      error: (...args: any[]) => {
        logs.push(`Error: ${args.join(" ")}`)
      },
    }

    try {
      // Create a function from the code and execute it
      const func = new Function("console", code)
      func(customConsole)
      setOutput(logs.length > 0 ? logs : ["Code executed successfully (no output)"])
    } catch (error) {
      setOutput([`Error: ${error instanceof Error ? error.message : String(error)}`])
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    const originalCode = defaultFiles[activeFile].code
    setCode(originalCode)
    const updatedFiles = [...files]
    updatedFiles[activeFile].code = originalCode
    setFiles(updatedFiles)
    setOutput([])
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = files[activeFile].name
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newCode = code.substring(0, start) + "  " + code.substring(end)
      setCode(newCode)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  return (
    <div className="h-full flex flex-col space-y-3 sm:space-y-4">
      {/* File Tabs */}
      <div className="flex flex-wrap gap-2">
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => handleFileChange(index)}
            className={`px-3 py-2 sm:px-4 rounded-lg font-mono text-xs sm:text-sm transition-all duration-300 touch-manipulation whitespace-nowrap ${
              activeFile === index
                ? "bg-primary text-primary-foreground neon-glow-primary"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80"
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Editor Controls */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={runCode}
          disabled={isRunning}
          className="bg-primary hover:bg-primary/90 neon-glow-primary touch-manipulation text-xs sm:text-sm"
          size="sm"
        >
          <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Run Code</span>
          <span className="xs:hidden">Run</span>
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="neon-border touch-manipulation bg-transparent text-xs sm:text-sm"
          size="sm"
        >
          <RotateCcw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Reset
        </Button>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="neon-border touch-manipulation bg-transparent text-xs sm:text-sm"
          size="sm"
        >
          {copied ? (
            <Check className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Copy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="neon-border touch-manipulation bg-transparent text-xs sm:text-sm"
          size="sm"
        >
          <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Download</span>
          <span className="sm:hidden">Save</span>
        </Button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4">
        {/* Editor Area */}
        <div className="flex-1 min-h-[250px] sm:min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden neon-border bg-card">
          <div className="h-full flex flex-col">
            <div className="bg-muted px-3 sm:px-4 py-2 border-b border-border flex-shrink-0">
              <span className="text-[10px] xs:text-xs font-mono text-muted-foreground truncate block">
                {files[activeFile].name} - {files[activeFile].language}
              </span>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full h-full bg-transparent text-foreground font-mono text-xs sm:text-sm p-3 sm:p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-auto"
                style={{
                  tabSize: 2,
                  lineHeight: "1.6",
                }}
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Output Console */}
        <div className="flex-1 min-h-[250px] sm:min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden neon-border bg-card">
          <div className="h-full flex flex-col">
            <div className="bg-muted px-3 sm:px-4 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
              <span className="text-[10px] xs:text-xs font-mono text-muted-foreground">Console Output</span>
              {output.length > 0 && (
                <button
                  onClick={() => setOutput([])}
                  className="text-[10px] xs:text-xs text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex-1 overflow-auto p-3 sm:p-4 font-mono text-xs sm:text-sm">
              {output.length === 0 ? (
                <div className="text-muted-foreground italic text-xs sm:text-sm">
                  Run your code to see output here...
                </div>
              ) : (
                <div className="space-y-2">
                  {output.map((line, index) => (
                    <div
                      key={index}
                      className={`${line.startsWith("Error") ? "text-destructive" : "text-accent"} whitespace-pre-wrap break-words text-xs sm:text-sm`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="p-3 sm:p-4 rounded-lg bg-card/50 border border-border flex-shrink-0">
        <div className="text-[10px] xs:text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground mb-2">💡 Quick Tips:</p>
          <p className="break-words">• Use Tab to indent your code</p>
          <p className="break-words">• Click "Run Code" to execute JavaScript</p>
          <p className="break-words">• Use console.log() to print output</p>
          <p className="break-words hidden sm:block">• Switch between files to try different algorithms</p>
        </div>
      </div>
    </div>
  )
}
