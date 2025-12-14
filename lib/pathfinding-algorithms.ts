export interface MazeCell {
  row: number
  col: number
  isWall: boolean
  isPath: boolean
  isVisited: boolean
  isExplored: boolean
  isStart: boolean
  isEnd: boolean
  distance?: number
  heuristic?: number
}

export interface MazeState {
  grid: MazeCell[][]
  visited: Set<string>
  path: Set<string>
  current?: string
  exploring: Set<string>
  comparisons: number
  iterations: number
}

export type PathfindingAlgorithm = "bfs" | "dfs" | "astar" | "dijkstra"

const GRID_SIZE = 20

function heuristic(pos: [number, number], end: [number, number]): number {
  return Math.abs(pos[0] - end[0]) + Math.abs(pos[1] - end[1])
}

export function generateEmptyMaze(width: number, height: number): MazeCell[][] {
  const grid: MazeCell[][] = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => ({
      row,
      col,
      isWall: false,
      isPath: false,
      isVisited: false,
      isExplored: false,
      isStart: row === 0 && col === 0,
      isEnd: row === height - 1 && col === width - 1,
    })),
  )

  return grid
}

export function generateRecursiveDivisionMaze(width: number, height: number): MazeCell[][] {
  const grid: MazeCell[][] = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => ({
      row,
      col,
      isWall: false,
      isPath: false,
      isVisited: false,
      isExplored: false,
      isStart: row === 0 && col === 0,
      isEnd: row === height - 1 && col === width - 1,
    })),
  )

  // Add border walls
  for (let i = 0; i < height; i++) {
    grid[i][0].isWall = true
    grid[i][width - 1].isWall = true
  }
  for (let j = 0; j < width; j++) {
    grid[0][j].isWall = true
    grid[height - 1][j].isWall = true
  }

  // Clear start and end
  grid[0][0].isWall = false
  grid[height - 1][width - 1].isWall = false

  function divide(x: number, y: number, w: number, h: number) {
    if (w < 2 || h < 2) return

    const horizontal = w < h ? true : w > h ? false : Math.random() > 0.5

    if (horizontal) {
      const wallY = y + Math.floor(Math.random() * (h - 1)) + 1
      const gapX = x + Math.floor(Math.random() * w)

      for (let i = x; i < x + w; i++) {
        if (i !== gapX && wallY < height) {
          grid[wallY][i].isWall = true
        }
      }

      divide(x, y, w, wallY - y)
      divide(x, wallY + 1, w, h - (wallY - y) - 1)
    } else {
      const wallX = x + Math.floor(Math.random() * (w - 1)) + 1
      const gapY = y + Math.floor(Math.random() * h)

      for (let i = y; i < y + h; i++) {
        if (i !== gapY && wallX < width) {
          grid[i][wallX].isWall = true
        }
      }

      divide(x, y, wallX - x, h)
      divide(wallX + 1, y, w - (wallX - x) - 1, h)
    }
  }

  divide(1, 1, width - 2, height - 2)

  // Ensure start and end are not walls
  grid[0][0].isWall = false
  grid[0][0].isStart = true
  grid[height - 1][width - 1].isWall = false
  grid[height - 1][width - 1].isEnd = true

  return grid
}

export function generateRandomMaze(width: number, height: number): MazeCell[][] {
  const grid: MazeCell[][] = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => ({
      row,
      col,
      isWall: Math.random() > 0.7,
      isPath: false,
      isVisited: false,
      isExplored: false,
      isStart: row === 0 && col === 0,
      isEnd: row === height - 1 && col === width - 1,
    })),
  )

  grid[0][0].isWall = false
  grid[0][0].isStart = true
  grid[height - 1][width - 1].isWall = false
  grid[height - 1][width - 1].isEnd = true

  return grid
}

function* generateMaze(width: number, height: number): Generator<MazeCell[][], void> {
  const grid: MazeCell[][] = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => ({
      row,
      col,
      isWall: Math.random() > 0.7,
      isPath: false,
      isVisited: false,
      isExplored: false,
      isStart: row === 0 && col === 0,
      isEnd: row === height - 1 && col === width - 1,
    })),
  )

  grid[0][0].isWall = false
  grid[0][0].isStart = true
  grid[height - 1][width - 1].isWall = false
  grid[height - 1][width - 1].isEnd = true

  yield grid
}

export function* bfsPathfinding(
  grid: MazeCell[][],
  startPos: [number, number],
  endPos: [number, number],
): Generator<MazeState> {
  const height = grid.length
  const width = grid[0].length
  const visited = new Set<string>()
  const queue: Array<{ pos: [number, number]; path: Set<string> }> = [{ pos: startPos, path: new Set() }]
  const exploring = new Set<string>()
  let iterations = 0
  let comparisons = 0

  while (queue.length > 0) {
    const { pos, path } = queue.shift()!
    const key = `${pos[0]},${pos[1]}`

    if (visited.has(key)) continue

    visited.add(key)
    exploring.add(key)
    iterations++

    yield {
      grid: grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isVisited: visited.has(`${cell.row},${cell.col}`),
          isExplored: exploring.has(`${cell.row},${cell.col}`),
          isPath: path.has(`${cell.row},${cell.col}`),
        })),
      ),
      visited,
      path,
      exploring,
      current: key,
      comparisons,
      iterations,
    }

    if (pos[0] === endPos[0] && pos[1] === endPos[1]) {
      const finalPath = new Set(path)
      finalPath.add(key)
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isPath: finalPath.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path: finalPath,
        exploring: new Set(),
        comparisons,
        iterations,
      }
      return
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    for (const [dr, dc] of directions) {
      const newR = pos[0] + dr
      const newC = pos[1] + dc
      const newKey = `${newR},${newC}`

      if (newR >= 0 && newR < height && newC >= 0 && newC < width && !grid[newR][newC].isWall && !visited.has(newKey)) {
        comparisons++
        const newPath = new Set(path)
        newPath.add(key)
        queue.push({ pos: [newR, newC], path: newPath })
      }
    }

    exploring.delete(key)

    if (iterations % 5 === 0) {
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isExplored: exploring.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path,
        exploring,
        comparisons,
        iterations,
      }
    }
  }
}

export function* dfsPathfinding(
  grid: MazeCell[][],
  startPos: [number, number],
  endPos: [number, number],
): Generator<MazeState> {
  const height = grid.length
  const width = grid[0].length
  const visited = new Set<string>()
  const stack: Array<{ pos: [number, number]; path: Set<string> }> = [{ pos: startPos, path: new Set() }]
  const exploring = new Set<string>()
  let iterations = 0
  let comparisons = 0

  while (stack.length > 0) {
    const { pos, path } = stack.pop()!
    const key = `${pos[0]},${pos[1]}`

    if (visited.has(key)) continue

    visited.add(key)
    exploring.add(key)
    iterations++

    yield {
      grid: grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isVisited: visited.has(`${cell.row},${cell.col}`),
          isExplored: exploring.has(`${cell.row},${cell.col}`),
          isPath: path.has(`${cell.row},${cell.col}`),
        })),
      ),
      visited,
      path,
      exploring,
      current: key,
      comparisons,
      iterations,
    }

    if (pos[0] === endPos[0] && pos[1] === endPos[1]) {
      const finalPath = new Set(path)
      finalPath.add(key)
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isPath: finalPath.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path: finalPath,
        exploring: new Set(),
        comparisons,
        iterations,
      }
      return
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    for (const [dr, dc] of directions) {
      const newR = pos[0] + dr
      const newC = pos[1] + dc
      const newKey = `${newR},${newC}`

      if (newR >= 0 && newR < height && newC >= 0 && newC < width && !grid[newR][newC].isWall && !visited.has(newKey)) {
        comparisons++
        const newPath = new Set(path)
        newPath.add(key)
        stack.push({ pos: [newR, newC], path: newPath })
      }
    }

    exploring.delete(key)

    if (iterations % 5 === 0) {
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isExplored: exploring.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path,
        exploring,
        comparisons,
        iterations,
      }
    }
  }
}

export function* dijkstraPathfinding(
  grid: MazeCell[][],
  startPos: [number, number],
  endPos: [number, number],
): Generator<MazeState> {
  const height = grid.length
  const width = grid[0].length
  const distances = Array.from({ length: height }, () => Array(width).fill(Number.POSITIVE_INFINITY))
  const visited = new Set<string>()
  const exploring = new Set<string>()
  const queue: Array<{ pos: [number, number]; dist: number; path: Set<string> }> = [
    { pos: startPos, dist: 0, path: new Set() },
  ]
  let iterations = 0
  let comparisons = 0

  distances[startPos[0]][startPos[1]] = 0

  while (queue.length > 0) {
    queue.sort((a, b) => a.dist - b.dist)
    const { pos, dist, path } = queue.shift()!
    const key = `${pos[0]},${pos[1]}`

    if (visited.has(key)) continue

    visited.add(key)
    exploring.add(key)
    iterations++

    yield {
      grid: grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isVisited: visited.has(`${cell.row},${cell.col}`),
          isExplored: exploring.has(`${cell.row},${cell.col}`),
          isPath: path.has(`${cell.row},${cell.col}`),
          distance: distances[cell.row][cell.col],
        })),
      ),
      visited,
      path,
      exploring,
      current: key,
      comparisons,
      iterations,
    }

    if (pos[0] === endPos[0] && pos[1] === endPos[1]) {
      const finalPath = new Set(path)
      finalPath.add(key)
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isPath: finalPath.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path: finalPath,
        exploring: new Set(),
        comparisons,
        iterations,
      }
      return
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    for (const [dr, dc] of directions) {
      const newR = pos[0] + dr
      const newC = pos[1] + dc
      const newKey = `${newR},${newC}`
      const newDist = dist + 1

      if (
        newR >= 0 &&
        newR < height &&
        newC >= 0 &&
        newC < width &&
        !grid[newR][newC].isWall &&
        newDist < distances[newR][newC]
      ) {
        comparisons++
        distances[newR][newC] = newDist
        const newPath = new Set(path)
        newPath.add(key)
        queue.push({ pos: [newR, newC], dist: newDist, path: newPath })
      }
    }

    exploring.delete(key)

    if (iterations % 5 === 0) {
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isExplored: exploring.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path,
        exploring,
        comparisons,
        iterations,
      }
    }
  }
}

export function* astarPathfinding(
  grid: MazeCell[][],
  startPos: [number, number],
  endPos: [number, number],
): Generator<MazeState> {
  const height = grid.length
  const width = grid[0].length
  const gScore = Array.from({ length: height }, () => Array(width).fill(Number.POSITIVE_INFINITY))
  const fScore = Array.from({ length: height }, () => Array(width).fill(Number.POSITIVE_INFINITY))
  const visited = new Set<string>()
  const exploring = new Set<string>()
  const openSet: Array<{ pos: [number, number]; f: number; path: Set<string> }> = [
    { pos: startPos, f: heuristic(startPos, endPos), path: new Set() },
  ]
  let iterations = 0
  let comparisons = 0

  gScore[startPos[0]][startPos[1]] = 0
  fScore[startPos[0]][startPos[1]] = heuristic(startPos, endPos)

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f)
    const { pos, path } = openSet.shift()!
    const key = `${pos[0]},${pos[1]}`

    if (visited.has(key)) continue

    visited.add(key)
    exploring.add(key)
    iterations++

    yield {
      grid: grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isVisited: visited.has(`${cell.row},${cell.col}`),
          isExplored: exploring.has(`${cell.row},${cell.col}`),
          isPath: path.has(`${cell.row},${cell.col}`),
          heuristic: fScore[cell.row][cell.col],
        })),
      ),
      visited,
      path,
      exploring,
      current: key,
      comparisons,
      iterations,
    }

    if (pos[0] === endPos[0] && pos[1] === endPos[1]) {
      const finalPath = new Set(path)
      finalPath.add(key)
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isPath: finalPath.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path: finalPath,
        exploring: new Set(),
        comparisons,
        iterations,
      }
      return
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    for (const [dr, dc] of directions) {
      const newR = pos[0] + dr
      const newC = pos[1] + dc
      const newKey = `${newR},${newC}`
      const tenativeGScore = gScore[pos[0]][pos[1]] + 1

      if (newR >= 0 && newR < height && newC >= 0 && newC < width && !grid[newR][newC].isWall) {
        comparisons++

        if (tenativeGScore < gScore[newR][newC]) {
          gScore[newR][newC] = tenativeGScore
          fScore[newR][newC] = tenativeGScore + heuristic([newR, newC], endPos)

          if (!visited.has(newKey)) {
            const newPath = new Set(path)
            newPath.add(key)
            openSet.push({
              pos: [newR, newC],
              f: fScore[newR][newC],
              path: newPath,
            })
          }
        }
      }
    }

    exploring.delete(key)

    if (iterations % 5 === 0) {
      yield {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: visited.has(`${cell.row},${cell.col}`),
            isExplored: exploring.has(`${cell.row},${cell.col}`),
          })),
        ),
        visited,
        path,
        exploring,
        comparisons,
        iterations,
      }
    }
  }
}

export function getPathfindingGenerator(algorithm: string, grid: MazeCell[][] | null) {
  if (!grid || grid.length === 0) {
    return (function* () {
      yield {
        grid: [],
        visited: new Set(),
        path: new Set(),
        exploring: new Set(),
        comparisons: 0,
        iterations: 0,
      }
    })()
  }

  const height = grid.length
  const width = grid[0].length
  const startPos: [number, number] = [0, 0]
  const endPos: [number, number] = [height - 1, width - 1]

  if (algorithm === "bfs") {
    return bfsPathfinding(grid, startPos, endPos)
  } else if (algorithm === "dfs") {
    return dfsPathfinding(grid, startPos, endPos)
  } else if (algorithm === "dijkstra") {
    return dijkstraPathfinding(grid, startPos, endPos)
  } else if (algorithm === "astar" || algorithm === "a-star") {
    return astarPathfinding(grid, startPos, endPos)
  }

  return (function* () {
    yield {
      grid,
      visited: new Set(),
      path: new Set(),
      exploring: new Set(),
      comparisons: 0,
      iterations: 0,
    }
  })()
}

export const createEmptyGrid = generateEmptyMaze

export { GRID_SIZE, generateMaze }

export const bfs = bfsPathfinding
export const dfs = dfsPathfinding
export const dijkstra = dijkstraPathfinding
export const aStar = astarPathfinding
