"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlgorithmSelector } from "@/components/algorithm-selector"
import { ControlPanel } from "@/components/control-panel"
import { SortVisualizer } from "@/components/sort-visualizer"
import { PathfindingAlgorithmSelector } from "@/components/pathfinding-algorithm-selector"
import { PathfindingControlPanel } from "@/components/pathfinding-control-panel"
import { PathfindingVisualizer } from "@/components/pathfinding-visualizer"
import { AIChat } from "@/components/ai-chat"
import { GraphVisualizer } from "@/components/graph-visualizer"
import { GraphAlgorithmSelector } from "@/components/graph-algorithm-selector"
import { GraphControlPanel } from "@/components/graph-control-panel"
import { CodeEditor } from "@/components/code-editor"
import { SearchVisualizer } from "@/components/search-visualizer"
import { SearchAlgorithmSelector } from "@/components/search-algorithm-selector"
import { SearchControlPanel } from "@/components/search-control-panel"
import { CodingChallenge } from "@/components/coding-challenge"
import { AlgorithmComparison } from "@/components/algorithm-comparison"
import { algorithmDetails } from "@/lib/algorithm-details"
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  countingSort,
  radixSort,
  bucketSort,
  shellSort,
} from "@/lib/sorting-algorithms"
import {
  bfs,
  dfs,
  dijkstra,
  aStar,
  generateRandomMaze,
  generateRecursiveDivisionMaze,
  createEmptyGrid,
} from "@/lib/pathfinding-algorithms"
import {
  generateRandomGraph,
  generateCompleteGraph,
  generateTreeGraph,
  bfsGraph,
  dfsGraph,
  dijkstraGraph,
  type GraphState,
} from "@/lib/graph-algorithms"
import {
  linearSearch,
  binarySearch,
  jumpSearch,
  interpolationSearch,
  exponentialSearch,
  ternarySearch,
  type SearchState,
} from "@/lib/search-algorithms"
import { AnimatedBackground } from "@/components/animated-background"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { AlgorithmGamesFAB } from "@/components/algorithm-games-fab"
import { Logo } from "@/components/logo"
import { ThemeSelector } from "@/components/theme-selector"
import { StepByStepMode } from "@/components/step-by-step-mode"

export default function Home() {
  // Sorting state
  const [algorithm, setAlgorithm] = useState("bubble-sort")
  const [arraySize, setArraySize] = useState(50)
  const [speed, setSpeed] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [sortState, setSortState] = useState<any>({
    array: Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 1),
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
  })

  const sortingControlRef = useRef({ shouldStop: false })

  // Pathfinding state
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState("bfs")
  const [isPathfinding, setIsPathfinding] = useState(false)
  const [pathfindingState, setPathfindingState] = useState<any>(null)
  const gridRef = useRef<any>(null)
  const pathfindingGeneratorRef = useRef<Generator<any> | null>(null)

  const pathfindingControlRef = useRef({ shouldStop: false })

  // Maze editing state
  const [isEditingMaze, setIsEditingMaze] = useState(false)
  const [editMode, setEditMode] = useState<"wall" | "start" | "end">("wall")

  // Graph algorithm state
  const [graphAlgorithm, setGraphAlgorithm] = useState("bfs")
  const [graphState, setGraphState] = useState<GraphState>({ nodes: [], edges: [] })
  const [isGraphRunning, setIsGraphRunning] = useState(false)
  const [graphStartNode, setGraphStartNode] = useState<number>(0)
  const [graphEndNode, setGraphEndNode] = useState<number>(7)
  const graphControlRef = useRef({ shouldStop: false })

  // Search algorithm state
  const [searchAlgorithm, setSearchAlgorithm] = useState("linear")
  const [searchArraySize, setSearchArraySize] = useState(20)
  const [searchSpeed, setSearchSpeed] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [searchTarget, setSearchTarget] = useState(50)
  const [searchState, setSearchState] = useState<SearchState>({
    array: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1),
    target: 50,
    currentIndex: -1,
    searchedIndices: [],
    foundIndex: null,
    comparisons: 0,
  })

  const searchControlRef = useRef({ shouldStop: false })

  const [stepByStepMode, setStepByStepMode] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)

  // Initialize grid on mount
  useEffect(() => {
    const initialGrid = generateRandomMaze(20, 20)
    gridRef.current = initialGrid
    setPathfindingState({ grid: initialGrid })
  }, [])

  // Initialize graph on mount
  useEffect(() => {
    const { nodes, edges } = generateRandomGraph(8)
    setGraphState({ nodes, edges })
  }, [])

  const handleStart = () => {
    console.log("[v0] Starting sorting visualization with algorithm:", algorithm)
    sortingControlRef.current.shouldStop = false
    setIsRunning(true)

    const generator = getSortingAlgorithm()
    console.log("[v0] Generator created:", generator)

    try {
      const runAnimation = async () => {
        for (const state of generator) {
          console.log("[v0] Animation step, comparisons:", state.comparisons)
          if (sortingControlRef.current.shouldStop) break
          setSortState(state)
          await new Promise((resolve) => setTimeout(resolve, 500 / speed))
        }
        console.log("[v0] Animation complete")
        setIsRunning(false)
      }
      runAnimation()
    } catch (error) {
      console.error("[v0] Sorting error:", error)
      setIsRunning(false)
    }
  }

  const handlePause = () => {
    sortingControlRef.current.shouldStop = true
    setIsRunning(false)
  }

  const getSortingAlgorithm = () => {
    const array = [...sortState.array]
    switch (algorithm) {
      case "bubble-sort":
        return bubbleSort(array)
      case "selection-sort":
        return selectionSort(array)
      case "insertion-sort":
        return insertionSort(array)
      case "merge-sort":
        return mergeSort(array)
      case "quick-sort":
        return quickSort(array)
      case "heap-sort":
        return heapSort(array)
      case "counting-sort":
        return countingSort(array)
      case "radix-sort":
        return radixSort(array)
      case "bucket-sort":
        return bucketSort(array)
      case "shell-sort":
        return shellSort(array)
      default:
        return bubbleSort(array)
    }
  }

  const handleReset = () => {
    sortingControlRef.current.shouldStop = true
    setIsRunning(false)
    setSortState({
      array: Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1),
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: [],
    })
  }

  const handleShuffle = () => {
    setSortState({
      array: Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1),
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: [],
    })
  }

  const handlePathfindingPlay = async () => {
    console.log("[v0] Starting pathfinding with algorithm:", pathfindingAlgorithm)

    if (!gridRef.current) {
      console.error("[v0] No grid available")
      return
    }

    pathfindingControlRef.current.shouldStop = false
    setIsPathfinding(true)

    const grid = gridRef.current
    console.log("[v0] Grid size:", grid.length, "x", grid[0]?.length)

    let startPos: [number, number] | null = null
    let endPos: [number, number] | null = null

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isStart) {
          startPos = [row, col]
          console.log("[v0] Found start position:", startPos)
        }
        if (grid[row][col].isEnd) {
          endPos = [row, col]
          console.log("[v0] Found end position:", endPos)
        }
      }
    }

    if (!startPos || !endPos) {
      console.error("[v0] Start or end position not found in grid")
      setIsPathfinding(false)
      return
    }

    console.log("[v0] Starting pathfinding from", startPos, "to", endPos, "using", pathfindingAlgorithm)

    let generator
    switch (pathfindingAlgorithm) {
      case "bfs":
        console.log("[v0] Using BFS algorithm")
        generator = bfs(grid, startPos, endPos)
        break
      case "dfs":
        console.log("[v0] Using DFS algorithm")
        generator = dfs(grid, startPos, endPos)
        break
      case "dijkstra":
        console.log("[v0] Using Dijkstra's algorithm")
        generator = dijkstra(grid, startPos, endPos)
        break
      case "astar":
        console.log("[v0] Using A* algorithm")
        generator = aStar(grid, startPos, endPos)
        break
      default:
        console.log("[v0] Unknown algorithm, defaulting to BFS")
        generator = bfs(grid, startPos, endPos)
    }

    pathfindingGeneratorRef.current = generator

    try {
      let stepCount = 0
      for (const state of generator) {
        stepCount++
        console.log("[v0] Pathfinding step", stepCount, "iterations:", state.iterations, "visited:", state.visited.size)
        if (pathfindingControlRef.current.shouldStop) {
          console.log("[v0] Pathfinding stopped by user")
          break
        }
        setPathfindingState(state)
        await new Promise((resolve) => setTimeout(resolve, 100 / speed))
      }
      console.log("[v0] Pathfinding complete after", stepCount, "steps")
    } catch (error) {
      console.error("[v0] Pathfinding error:", error)
    }

    setIsPathfinding(false)
    pathfindingGeneratorRef.current = null
  }

  const handlePathfindingPause = () => {
    pathfindingControlRef.current.shouldStop = true
    setIsPathfinding(false)
  }

  const handlePathfindingReset = () => {
    pathfindingControlRef.current.shouldStop = true
    setIsPathfinding(false)
    pathfindingGeneratorRef.current = null
    const newGrid = generateRandomMaze(20, 20)
    gridRef.current = newGrid
    setPathfindingState({ grid: newGrid })
  }

  const handleCellClick = (row: number, col: number) => {
    if (!gridRef.current || isPathfinding) return

    const newGrid = gridRef.current.map((r: any[]) => r.map((cell: any) => ({ ...cell })))
    const cell = newGrid[row][col]

    if (editMode === "wall") {
      if (!cell.isStart && !cell.isEnd) {
        cell.isWall = !cell.isWall
      }
    } else if (editMode === "start") {
      // Clear previous start
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[0].length; c++) {
          newGrid[r][c].isStart = false
        }
      }
      cell.isStart = true
      cell.isWall = false
    } else if (editMode === "end") {
      // Clear previous end
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[0].length; c++) {
          newGrid[r][c].isEnd = false
        }
      }
      cell.isEnd = true
      cell.isWall = false
    }

    gridRef.current = newGrid
    setPathfindingState({ grid: newGrid })
  }

  const handleCellDrag = (row: number, col: number) => {
    if (!gridRef.current || isPathfinding || editMode !== "wall") return

    const newGrid = gridRef.current.map((r: any[]) => r.map((cell: any) => ({ ...cell })))
    const cell = newGrid[row][col]

    if (!cell.isStart && !cell.isEnd) {
      cell.isWall = true
    }

    gridRef.current = newGrid
    setPathfindingState({ grid: newGrid })
  }

  const handleEditModeChange = (mode: "wall" | "start" | "end") => {
    setEditMode(mode)
    setIsEditingMaze(true)
  }

  const handleClearMaze = () => {
    const newGrid = createEmptyGrid(20, 20)
    gridRef.current = newGrid
    setPathfindingState({ grid: newGrid })
  }

  const handleGenerateRandomMaze = () => {
    const newGrid = generateRandomMaze(20, 20)
    gridRef.current = newGrid
    setPathfindingState({ grid: newGrid })
  }

  const handleGenerateRecursiveMaze = () => {
    const newGrid = generateRecursiveDivisionMaze(20, 20)
    gridRef.current = newGrid
    setPathfindingState({ grid: newGrid })
  }

  const algoDetails = algorithmDetails[algorithm]

  if (!algoDetails) {
    return <div>Error: Algorithm details not found for {algorithm}</div>
  }

  // Graph algorithm handlers
  const handleGraphStart = async () => {
    if (!graphState.nodes.length) return

    setIsGraphRunning(true)
    graphControlRef.current.shouldStop = false

    console.log("[v0] Starting graph algorithm:", graphAlgorithm)

    let generator: Generator<GraphState> | null = null

    switch (graphAlgorithm) {
      case "bfs":
        generator = bfsGraph(graphState.nodes, graphState.edges, graphStartNode, graphEndNode)
        break
      case "dfs":
        generator = dfsGraph(graphState.nodes, graphState.edges, graphStartNode, graphEndNode)
        break
      case "dijkstra":
        generator = dijkstraGraph(graphState.nodes, graphState.edges, graphStartNode, graphEndNode)
        break
      default:
        console.warn("[v0] Algorithm not implemented yet:", graphAlgorithm)
        setIsGraphRunning(false)
        return
    }

    if (generator) {
      for (const state of generator) {
        if (graphControlRef.current.shouldStop) {
          console.log("[v0] Graph visualization stopped by user")
          break
        }
        setGraphState(state)
        await new Promise((resolve) => setTimeout(resolve, 1000 / speed))
      }
    }

    setIsGraphRunning(false)
  }

  const handleGraphPause = () => {
    graphControlRef.current.shouldStop = true
    setIsGraphRunning(false)
  }

  const handleGraphReset = () => {
    graphControlRef.current.shouldStop = true
    setIsGraphRunning(false)
    setGraphState({
      nodes: graphState.nodes.map((n) => ({
        ...n,
        visited: false,
        isPath: false,
        exploring: false,
        distance: Number.POSITIVE_INFINITY,
      })),
      edges: graphState.edges.map((e) => ({ ...e, active: false })),
    })
  }

  const handleGenerateRandomGraph = () => {
    const { nodes, edges } = generateRandomGraph(8)
    setGraphState({ nodes, edges })
    setGraphStartNode(0)
    setGraphEndNode(7)
  }

  const handleGenerateCompleteGraph = () => {
    const { nodes, edges } = generateCompleteGraph(6)
    setGraphState({ nodes, edges })
    setGraphStartNode(0)
    setGraphEndNode(5)
  }

  const handleGenerateTreeGraph = () => {
    const { nodes, edges } = generateTreeGraph(7)
    setGraphState({ nodes, edges })
    setGraphStartNode(0)
    setGraphEndNode(6)
  }

  const handleNodeClick = (nodeId: number) => {
    if (isGraphRunning) return

    // Toggle between setting start and end nodes
    if (graphStartNode === null || (graphStartNode !== null && graphEndNode !== null)) {
      setGraphStartNode(nodeId)
      setGraphEndNode(null)
    } else {
      setGraphEndNode(nodeId)
    }
  }

  // Search handlers
  const handleSearchStart = () => {
    searchControlRef.current.shouldStop = false
    setIsSearching(true)

    const generator = getSearchAlgorithm()

    try {
      const runSearch = async () => {
        for (const state of generator) {
          if (searchControlRef.current.shouldStop) break
          setSearchState(state)
          await new Promise((resolve) => setTimeout(resolve, 500 / searchSpeed))
        }
        setIsSearching(false)
      }
      runSearch()
    } catch (error) {
      console.error("[v0] Search error:", error)
      setIsSearching(false)
    }
  }

  const handleSearchPause = () => {
    searchControlRef.current.shouldStop = true
    setIsSearching(false)
  }

  const handleSearchReset = () => {
    setSearchState({
      array: searchState.array,
      target: searchTarget,
      currentIndex: -1,
      searchedIndices: [],
      foundIndex: null,
      comparisons: 0,
    })
  }

  const handleSearchShuffle = () => {
    const newArray = Array.from({ length: searchArraySize }, () => Math.floor(Math.random() * 100) + 1)
    setSearchState({
      array: newArray,
      target: searchTarget,
      currentIndex: -1,
      searchedIndices: [],
      foundIndex: null,
      comparisons: 0,
    })
  }

  const getSearchAlgorithm = () => {
    const array = [...searchState.array]
    switch (searchAlgorithm) {
      case "linear":
        return linearSearch(array, searchTarget)
      case "binary":
        return binarySearch(array, searchTarget)
      case "jump":
        return jumpSearch(array, searchTarget)
      case "interpolation":
        return interpolationSearch(array, searchTarget)
      case "exponential":
        return exponentialSearch(array, searchTarget)
      case "ternary":
        return ternarySearch(array, searchTarget)
      default:
        return linearSearch(array, searchTarget)
    }
  }

  return (
    <>
      <AnimatedBackground />
      <AlgorithmGamesFAB />
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Header with logo */}
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Logo className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent break-words">
                    Algorithm Visualizer
                  </h1>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 break-words">
                    Interactive learning platform for algorithms
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <ThemeSelector />
                <Link
                  href="/algorithms"
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50 touch-manipulation text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="hidden xs:inline">View Full Documentation</span>
                  <span className="xs:hidden">Docs</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12">
          <Tabs defaultValue="sorting" className="w-full slide-in">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-8 gap-1 sm:gap-0 mb-4 sm:mb-6 md:mb-8 bg-card neon-border p-1 sm:p-1.5 h-auto">
              <TabsTrigger
                value="sorting"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Sorting</span>
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Compare</span>
              </TabsTrigger>
              <TabsTrigger
                value="pathfinding"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Pathfinding</span>
              </TabsTrigger>
              <TabsTrigger
                value="ai-chat"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">AI Chat</span>
              </TabsTrigger>
              <TabsTrigger
                value="graph-search"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Graph</span>
              </TabsTrigger>
              <TabsTrigger
                value="code-editor"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Editor</span>
              </TabsTrigger>
              <TabsTrigger
                value="search"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Search</span>
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 py-2 sm:py-2.5 px-2 touch-manipulation"
              >
                <span className="text-xs sm:text-sm md:text-base">Challenges</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sorting" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-1">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-2">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Select Algorithm</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Choose a sorting algorithm</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <AlgorithmSelector selected={algorithm} onSelect={setAlgorithm} />
                    </CardContent>
                  </Card>

                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-accent">Controls</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Adjust speed and array size</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <ControlPanel
                        isRunning={isRunning}
                        speed={speed}
                        arraySize={arraySize}
                        onPlay={handleStart}
                        onPause={handlePause}
                        onReset={handleReset}
                        onShuffle={handleShuffle}
                        onSpeedChange={setSpeed}
                        onArraySizeChange={(size) => {
                          setArraySize(size)
                          handleReset()
                        }}
                      />
                    </CardContent>
                  </Card>

                  <StepByStepMode
                    algorithm={algorithm}
                    onStepModeChange={setStepByStepMode}
                    onStepChange={setTutorialStep}
                    currentStep={tutorialStep}
                    isRunning={isRunning}
                  />
                </div>

                <div className="lg:col-span-3 space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-3">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Visualization</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Watch the algorithm in action</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <div className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] transition-all duration-500">
                        <SortVisualizer state={sortState} arraySize={arraySize} speed={speed} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95 responsive-card">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground break-words">
                          Time Complexity
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary font-mono break-words">
                          {algoDetails?.complexity?.time || "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95 responsive-card">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground break-words">
                          Space Complexity
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-accent font-mono break-words">
                          {algoDetails?.complexity?.space || "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95 responsive-card">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground break-words">Best For</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-xs sm:text-sm text-secondary responsive-text line-clamp-3 leading-relaxed">
                          {algoDetails?.useCases?.best || "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95 responsive-card">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground break-words">
                          Avoid For
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-xs sm:text-sm text-chart-3 responsive-text line-clamp-3 leading-relaxed">
                          {algoDetails?.useCases?.avoid || "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-2">
              <AlgorithmComparison />
            </TabsContent>

            <TabsContent value="pathfinding" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-2">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Select Algorithm</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Choose a pathfinding algorithm</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <PathfindingAlgorithmSelector
                        selected={pathfindingAlgorithm}
                        onSelect={setPathfindingAlgorithm}
                      />
                    </CardContent>
                  </Card>

                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-accent">Controls</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Adjust speed and maze editing</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <PathfindingControlPanel
                        isRunning={isPathfinding}
                        speed={speed}
                        isEditing={isEditingMaze}
                        editMode={editMode}
                        onPlay={handlePathfindingPlay}
                        onPause={handlePathfindingPause}
                        onReset={handlePathfindingReset}
                        onSpeedChange={setSpeed}
                        onEditModeChange={handleEditModeChange}
                        onClearMaze={handleClearMaze}
                        onGenerateRandomMaze={handleGenerateRandomMaze}
                        onGenerateRecursiveMaze={handleGenerateRecursiveMaze}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-3">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Visualization</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Watch the algorithm in action</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <div className="h-[250px] sm:h-[300px] md:h-[400px] transition-all duration-500">
                        <PathfindingVisualizer
                          state={pathfindingState}
                          speed={speed}
                          onCellClick={handleCellClick}
                          onCellDrag={handleCellDrag}
                          isEditing={isEditingMaze}
                          editMode={editMode}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-chat" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-1">
              <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">AI Assistant</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Ask me anything about algorithms and coding
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <AIChat />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graph-search" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-2">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Select Algorithm</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Choose a graph search algorithm</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <GraphAlgorithmSelector selected={graphAlgorithm} onSelect={setGraphAlgorithm} />
                    </CardContent>
                  </Card>

                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-accent">Controls</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Adjust speed and generate graphs</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <GraphControlPanel
                        isRunning={isGraphRunning}
                        speed={speed}
                        onPlay={handleGraphStart}
                        onPause={handleGraphPause}
                        onReset={handleGraphReset}
                        onSpeedChange={setSpeed}
                        onGenerateRandom={handleGenerateRandomGraph}
                        onGenerateComplete={handleGenerateCompleteGraph}
                        onGenerateTree={handleGenerateTreeGraph}
                      />
                    </CardContent>
                  </Card>

                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Click on nodes to set start (green) and end (pink) points. Generate different graph structures
                        and watch how algorithms explore them.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-3">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Visualization</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Watch the algorithm explore the graph
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <div className="h-[250px] sm:h-[300px] md:h-[500px] transition-all duration-500">
                        <GraphVisualizer
                          nodes={graphState.nodes}
                          edges={graphState.edges}
                          speed={speed}
                          startNode={graphStartNode}
                          endNode={graphEndNode}
                          onNodeClick={handleNodeClick}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          Start Node
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary font-mono">
                          {graphStartNode !== null ? graphStartNode : "None"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          End Node
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-accent font-mono">
                          {graphEndNode !== null ? graphEndNode : "None"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          Graph Type
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-xs sm:text-sm text-secondary">
                          {graphState.nodes.length} nodes, {graphState.edges.length} edges
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code-editor" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-1">
              <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Code Editor</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Write and execute JavaScript code to practice algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="h-[500px] sm:h-[600px] md:h-[700px]">
                    <CodeEditor />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-3 sm:space-y-4 md:space-y-8 mt-0 slide-in-delay-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-2">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Select Algorithm</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Choose a search algorithm</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <SearchAlgorithmSelector selected={searchAlgorithm} onSelect={setSearchAlgorithm} />
                    </CardContent>
                  </Card>

                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-accent">Controls</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Adjust search parameters</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <SearchControlPanel
                        isRunning={isSearching}
                        speed={searchSpeed}
                        arraySize={searchArraySize}
                        target={searchTarget}
                        onPlay={handleSearchStart}
                        onPause={handleSearchPause}
                        onReset={handleSearchReset}
                        onShuffle={handleSearchShuffle}
                        onSpeedChange={setSearchSpeed}
                        onArraySizeChange={(size) => {
                          setSearchArraySize(size)
                          handleSearchShuffle()
                        }}
                        onTargetChange={(target) => {
                          setSearchTarget(target)
                          setSearchState({ ...searchState, target })
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 slide-in-delay-3">
                  <Card className="neon-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">Visualization</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Watch the search algorithm in action
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                      <div className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] transition-all duration-500">
                        <SearchVisualizer state={searchState} arraySize={searchArraySize} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground">Comparisons</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary font-mono">
                          {searchState.comparisons}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground">Array Size</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-accent font-mono">
                          {searchState.array.length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="neon-border bg-card transition-all duration-300 hover:scale-105 active:scale-95">
                      <CardHeader className="pb-2 px-3 pt-3 sm:pb-3 sm:px-6 sm:pt-6">
                        <CardTitle className="text-xs sm:text-sm text-muted-foreground">Status</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
                        <p className="text-xs sm:text-sm text-secondary">
                          {searchState.foundIndex === null
                            ? "Searching..."
                            : searchState.foundIndex === -1
                              ? "Not Found"
                              : `Found!`}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="flex-1 min-h-0 mt-0">
              <CodingChallenge />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
