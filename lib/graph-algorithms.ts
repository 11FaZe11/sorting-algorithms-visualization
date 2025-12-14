export interface Node {
  id: number
  x: number
  y: number
  visited: boolean
  isPath: boolean
  exploring: boolean
  distance: number
}

export interface Edge {
  from: number
  to: number
  weight: number
  active: boolean
}

export interface GraphState {
  nodes: Node[]
  edges: Edge[]
}

// BFS Graph Search
export function* bfsGraph(nodes: Node[], edges: Edge[], startNode: number, endNode: number): Generator<GraphState> {
  const queue: number[] = [startNode]
  const visited = new Set<number>()
  const parent = new Map<number, number>()

  visited.add(startNode)

  while (queue.length > 0) {
    const currentId = queue.shift()!

    // Update current node as exploring
    yield {
      nodes: nodes.map((n) => ({
        ...n,
        exploring: n.id === currentId,
        visited: visited.has(n.id),
      })),
      edges: edges.map((e) => ({ ...e, active: false })),
    }

    if (currentId === endNode) {
      // Reconstruct path
      const path: number[] = []
      let node: number | undefined = endNode
      while (node !== undefined) {
        path.unshift(node)
        node = parent.get(node)
      }

      yield {
        nodes: nodes.map((n) => ({
          ...n,
          isPath: path.includes(n.id),
          exploring: false,
          visited: visited.has(n.id),
        })),
        edges: edges.map((e) => ({
          ...e,
          active: path.some(
            (p, i) =>
              i < path.length - 1 &&
              ((path[i] === e.from && path[i + 1] === e.to) || (path[i] === e.to && path[i + 1] === e.from)),
          ),
        })),
      }
      return
    }

    // Get neighbors
    const neighbors = edges
      .filter((e) => e.from === currentId || e.to === currentId)
      .map((e) => (e.from === currentId ? e.to : e.from))
      .filter((id) => !visited.has(id))

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId)
        parent.set(neighborId, currentId)
        queue.push(neighborId)
      }
    }

    yield {
      nodes: nodes.map((n) => ({
        ...n,
        exploring: false,
        visited: visited.has(n.id),
      })),
      edges,
    }
  }

  // No path found
  yield {
    nodes: nodes.map((n) => ({
      ...n,
      exploring: false,
      visited: visited.has(n.id),
    })),
    edges,
  }
}

// DFS Graph Search
export function* dfsGraph(nodes: Node[], edges: Edge[], startNode: number, endNode: number): Generator<GraphState> {
  const stack: number[] = [startNode]
  const visited = new Set<number>()
  const parent = new Map<number, number>()

  while (stack.length > 0) {
    const currentId = stack.pop()!

    if (visited.has(currentId)) continue
    visited.add(currentId)

    yield {
      nodes: nodes.map((n) => ({
        ...n,
        exploring: n.id === currentId,
        visited: visited.has(n.id),
      })),
      edges: edges.map((e) => ({ ...e, active: false })),
    }

    if (currentId === endNode) {
      // Reconstruct path
      const path: number[] = []
      let node: number | undefined = endNode
      while (node !== undefined) {
        path.unshift(node)
        node = parent.get(node)
      }

      yield {
        nodes: nodes.map((n) => ({
          ...n,
          isPath: path.includes(n.id),
          exploring: false,
          visited: visited.has(n.id),
        })),
        edges: edges.map((e) => ({
          ...e,
          active: path.some(
            (p, i) =>
              i < path.length - 1 &&
              ((path[i] === e.from && path[i + 1] === e.to) || (path[i] === e.to && path[i + 1] === e.from)),
          ),
        })),
      }
      return
    }

    const neighbors = edges
      .filter((e) => e.from === currentId || e.to === currentId)
      .map((e) => (e.from === currentId ? e.to : e.from))
      .filter((id) => !visited.has(id))

    for (const neighborId of neighbors.reverse()) {
      if (!visited.has(neighborId)) {
        parent.set(neighborId, currentId)
        stack.push(neighborId)
      }
    }
  }

  yield {
    nodes: nodes.map((n) => ({
      ...n,
      exploring: false,
      visited: visited.has(n.id),
    })),
    edges,
  }
}

// Dijkstra's Algorithm
export function* dijkstraGraph(
  nodes: Node[],
  edges: Edge[],
  startNode: number,
  endNode: number,
): Generator<GraphState> {
  const distances = new Map<number, number>()
  const parent = new Map<number, number>()
  const visited = new Set<number>()
  const pq: Array<{ id: number; distance: number }> = []

  nodes.forEach((n) => distances.set(n.id, Number.POSITIVE_INFINITY))
  distances.set(startNode, 0)
  pq.push({ id: startNode, distance: 0 })

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance)
    const current = pq.shift()!

    if (visited.has(current.id)) continue
    visited.add(current.id)

    yield {
      nodes: nodes.map((n) => ({
        ...n,
        exploring: n.id === current.id,
        visited: visited.has(n.id),
        distance: distances.get(n.id) || Number.POSITIVE_INFINITY,
      })),
      edges: edges.map((e) => ({ ...e, active: false })),
    }

    if (current.id === endNode) {
      const path: number[] = []
      let node: number | undefined = endNode
      while (node !== undefined) {
        path.unshift(node)
        node = parent.get(node)
      }

      yield {
        nodes: nodes.map((n) => ({
          ...n,
          isPath: path.includes(n.id),
          exploring: false,
          visited: visited.has(n.id),
          distance: distances.get(n.id) || Number.POSITIVE_INFINITY,
        })),
        edges: edges.map((e) => ({
          ...e,
          active: path.some(
            (p, i) =>
              i < path.length - 1 &&
              ((path[i] === e.from && path[i + 1] === e.to) || (path[i] === e.to && path[i + 1] === e.from)),
          ),
        })),
      }
      return
    }

    const neighbors = edges.filter((e) => e.from === current.id || e.to === current.id)

    for (const edge of neighbors) {
      const neighborId = edge.from === current.id ? edge.to : edge.from
      const newDistance = (distances.get(current.id) || 0) + edge.weight

      if (newDistance < (distances.get(neighborId) || Number.POSITIVE_INFINITY)) {
        distances.set(neighborId, newDistance)
        parent.set(neighborId, current.id)
        pq.push({ id: neighborId, distance: newDistance })
      }
    }
  }

  yield {
    nodes: nodes.map((n) => ({
      ...n,
      exploring: false,
      visited: visited.has(n.id),
      distance: distances.get(n.id) || Number.POSITIVE_INFINITY,
    })),
    edges,
  }
}

// Generate random graph
export function generateRandomGraph(nodeCount = 8): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // Create nodes in a circle
  const centerX = 400
  const centerY = 250
  const radius = 180

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2
    nodes.push({
      id: i,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      visited: false,
      isPath: false,
      exploring: false,
      distance: Number.POSITIVE_INFINITY,
    })
  }

  // Create random edges
  const edgeCount = Math.floor(nodeCount * 1.5)
  for (let i = 0; i < edgeCount; i++) {
    const from = Math.floor(Math.random() * nodeCount)
    let to = Math.floor(Math.random() * nodeCount)
    while (to === from || edges.some((e) => (e.from === from && e.to === to) || (e.from === to && e.to === from))) {
      to = Math.floor(Math.random() * nodeCount)
    }

    edges.push({
      from,
      to,
      weight: Math.floor(Math.random() * 10) + 1,
      active: false,
    })
  }

  return { nodes, edges }
}

// Generate complete graph
export function generateCompleteGraph(nodeCount = 6): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  const centerX = 400
  const centerY = 250
  const radius = 180

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2
    nodes.push({
      id: i,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      visited: false,
      isPath: false,
      exploring: false,
      distance: Number.POSITIVE_INFINITY,
    })
  }

  // Create edges between all nodes
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      edges.push({
        from: i,
        to: j,
        weight: Math.floor(Math.random() * 10) + 1,
        active: false,
      })
    }
  }

  return { nodes, edges }
}

// Generate tree structure
export function generateTreeGraph(nodeCount = 7): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // Create tree levels
  let currentId = 0
  const levels = 3
  const nodesPerLevel = [1, 2, 4]

  for (let level = 0; level < levels; level++) {
    const nodesInLevel = nodesPerLevel[level]
    const yPos = 100 + level * 150
    const spacing = 800 / (nodesInLevel + 1)

    for (let i = 0; i < nodesInLevel; i++) {
      if (currentId >= nodeCount) break

      nodes.push({
        id: currentId,
        x: spacing * (i + 1),
        y: yPos,
        visited: false,
        isPath: false,
        exploring: false,
        distance: Number.POSITIVE_INFINITY,
      })

      // Connect to parent
      if (level > 0) {
        const parentId = Math.floor((currentId - nodesPerLevel.slice(0, level).reduce((a, b) => a + b, 0)) / 2)
        edges.push({
          from: parentId,
          to: currentId,
          weight: Math.floor(Math.random() * 10) + 1,
          active: false,
        })
      }

      currentId++
    }
  }

  return { nodes, edges }
}
