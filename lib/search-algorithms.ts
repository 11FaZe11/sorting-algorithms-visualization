export interface SearchState {
  array: number[]
  target: number
  currentIndex: number
  searchedIndices: number[]
  foundIndex: number | null
  comparisons: number
}

export function* linearSearch(arr: number[], target: number) {
  const array = [...arr]
  let comparisons = 0

  for (let i = 0; i < array.length; i++) {
    comparisons++
    yield {
      array,
      target,
      currentIndex: i,
      searchedIndices: Array.from({ length: i }, (_, k) => k),
      foundIndex: null,
      comparisons,
    }

    if (array[i] === target) {
      yield {
        array,
        target,
        currentIndex: i,
        searchedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        foundIndex: i,
        comparisons,
      }
      return
    }
  }

  yield {
    array,
    target,
    currentIndex: -1,
    searchedIndices: Array.from({ length: array.length }, (_, k) => k),
    foundIndex: -1,
    comparisons,
  }
}

export function* binarySearch(arr: number[], target: number) {
  const array = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = array.length - 1
  let comparisons = 0
  const searchedIndices: number[] = []

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    comparisons++

    searchedIndices.push(mid)

    yield {
      array,
      target,
      currentIndex: mid,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    if (array[mid] === target) {
      yield {
        array,
        target,
        currentIndex: mid,
        searchedIndices: [...searchedIndices],
        foundIndex: mid,
        comparisons,
      }
      return
    } else if (array[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  yield {
    array,
    target,
    currentIndex: -1,
    searchedIndices,
    foundIndex: -1,
    comparisons,
  }
}

export function* jumpSearch(arr: number[], target: number) {
  const array = [...arr].sort((a, b) => a - b)
  const n = array.length
  const jumpSize = Math.floor(Math.sqrt(n))
  let prev = 0
  let comparisons = 0
  const searchedIndices: number[] = []

  // Jump through blocks
  while (array[Math.min(jumpSize, n) - 1] < target) {
    comparisons++
    searchedIndices.push(Math.min(jumpSize, n) - 1)

    yield {
      array,
      target,
      currentIndex: Math.min(jumpSize, n) - 1,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    prev = jumpSize
    if (prev >= n) {
      yield {
        array,
        target,
        currentIndex: -1,
        searchedIndices,
        foundIndex: -1,
        comparisons,
      }
      return
    }
  }

  // Linear search in the identified block
  for (let i = prev; i < Math.min(jumpSize, n); i++) {
    comparisons++
    searchedIndices.push(i)

    yield {
      array,
      target,
      currentIndex: i,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    if (array[i] === target) {
      yield {
        array,
        target,
        currentIndex: i,
        searchedIndices: [...searchedIndices],
        foundIndex: i,
        comparisons,
      }
      return
    }
  }

  yield {
    array,
    target,
    currentIndex: -1,
    searchedIndices,
    foundIndex: -1,
    comparisons,
  }
}

export function* interpolationSearch(arr: number[], target: number) {
  const array = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = array.length - 1
  let comparisons = 0
  const searchedIndices: number[] = []

  while (left <= right && target >= array[left] && target <= array[right]) {
    if (left === right) {
      comparisons++
      searchedIndices.push(left)

      yield {
        array,
        target,
        currentIndex: left,
        searchedIndices: [...searchedIndices],
        foundIndex: array[left] === target ? left : -1,
        comparisons,
      }
      return
    }

    // Interpolation formula
    const pos = left + Math.floor(((right - left) / (array[right] - array[left])) * (target - array[left]))

    comparisons++
    searchedIndices.push(pos)

    yield {
      array,
      target,
      currentIndex: pos,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    if (array[pos] === target) {
      yield {
        array,
        target,
        currentIndex: pos,
        searchedIndices: [...searchedIndices],
        foundIndex: pos,
        comparisons,
      }
      return
    }

    if (array[pos] < target) {
      left = pos + 1
    } else {
      right = pos - 1
    }
  }

  yield {
    array,
    target,
    currentIndex: -1,
    searchedIndices,
    foundIndex: -1,
    comparisons,
  }
}

export function* exponentialSearch(arr: number[], target: number) {
  const array = [...arr].sort((a, b) => a - b)
  const n = array.length
  let comparisons = 0
  const searchedIndices: number[] = []

  if (array[0] === target) {
    comparisons++
    yield {
      array,
      target,
      currentIndex: 0,
      searchedIndices: [0],
      foundIndex: 0,
      comparisons,
    }
    return
  }

  // Find range for binary search
  let i = 1
  while (i < n && array[i] <= target) {
    comparisons++
    searchedIndices.push(i)

    yield {
      array,
      target,
      currentIndex: i,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    i *= 2
  }

  // Binary search in the identified range
  let left = Math.floor(i / 2)
  let right = Math.min(i, n - 1)

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    comparisons++
    searchedIndices.push(mid)

    yield {
      array,
      target,
      currentIndex: mid,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    if (array[mid] === target) {
      yield {
        array,
        target,
        currentIndex: mid,
        searchedIndices: [...searchedIndices],
        foundIndex: mid,
        comparisons,
      }
      return
    } else if (array[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  yield {
    array,
    target,
    currentIndex: -1,
    searchedIndices,
    foundIndex: -1,
    comparisons,
  }
}

export function* ternarySearch(arr: number[], target: number) {
  const array = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = array.length - 1
  let comparisons = 0
  const searchedIndices: number[] = []

  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3)
    const mid2 = right - Math.floor((right - left) / 3)

    comparisons++
    searchedIndices.push(mid1, mid2)

    yield {
      array,
      target,
      currentIndex: mid1,
      searchedIndices: [...searchedIndices],
      foundIndex: null,
      comparisons,
    }

    if (array[mid1] === target) {
      yield {
        array,
        target,
        currentIndex: mid1,
        searchedIndices: [...searchedIndices],
        foundIndex: mid1,
        comparisons,
      }
      return
    }

    if (array[mid2] === target) {
      yield {
        array,
        target,
        currentIndex: mid2,
        searchedIndices: [...searchedIndices],
        foundIndex: mid2,
        comparisons,
      }
      return
    }

    if (target < array[mid1]) {
      right = mid1 - 1
    } else if (target > array[mid2]) {
      left = mid2 + 1
    } else {
      left = mid1 + 1
      right = mid2 - 1
    }
  }

  yield {
    array,
    target,
    currentIndex: -1,
    searchedIndices,
    foundIndex: -1,
    comparisons,
  }
}
