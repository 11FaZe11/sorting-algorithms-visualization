export interface SortState {
  array: number[]
  comparingIndices: number[]
  sortedIndices: number[]
  swappedIndices: number[]
}

export type AlgorithmName =
  | "bubble-sort"
  | "selection-sort"
  | "insertion-sort"
  | "merge-sort"
  | "quick-sort"
  | "heap-sort"
  | "shell-sort"
  | "cocktail-sort"
  | "counting-sort"
  | "radix-sort"
  | "bucket-sort"

export function* bubbleSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...array],
        comparingIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
        swappedIndices: [],
      }

      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        yield {
          array: [...array],
          comparingIndices: [],
          sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
          swappedIndices: [j, j + 1],
        }
      }
    }
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* selectionSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...array],
        comparingIndices: [minIdx, j],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        swappedIndices: [],
      }

      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      ;[array[i], array[minIdx]] = [array[minIdx], array[i]]
    }

    yield {
      array: [...array],
      comparingIndices: [],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      swappedIndices: [i, minIdx],
    }
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* insertionSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > key) {
      yield {
        array: [...array],
        comparingIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        swappedIndices: [],
      }

      array[j + 1] = array[j]
      j--
    }

    array[j + 1] = key

    yield {
      array: [...array],
      comparingIndices: [],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      swappedIndices: [],
    }
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* quickSort(arr: number[]) {
  const array = [...arr]
  const sorted = new Set<number>()

  function* partition(low: number, high: number) {
    const pivot = array[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      yield {
        array: [...array],
        comparingIndices: [j, high],
        sortedIndices: Array.from(sorted),
        swappedIndices: [],
      }

      if (array[j] < pivot) {
        i++
        ;[array[i], array[j]] = [array[j], array[i]]
        yield {
          array: [...array],
          comparingIndices: [],
          sortedIndices: Array.from(sorted),
          swappedIndices: [i, j],
        }
      }
    }
    ;[array[i + 1], array[high]] = [array[high], array[i + 1]]
    yield {
      array: [...array],
      comparingIndices: [],
      sortedIndices: Array.from(sorted),
      swappedIndices: [i + 1, high],
    }
    return i + 1
  }

  function* quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = yield* partition(low, high)
      sorted.add(pi)
      yield* quickSortHelper(low, pi - 1)
      yield* quickSortHelper(pi + 1, high)
    } else if (low === high) {
      sorted.add(low)
    }
  }

  yield* quickSortHelper(0, array.length - 1)

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* mergeSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  function* mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      yield* mergeSortHelper(left, mid)
      yield* mergeSortHelper(mid + 1, right)
      yield* merge(left, mid, right)
    }
  }

  function* merge(left: number, mid: number, right: number) {
    const leftArr = array.slice(left, mid + 1)
    const rightArr = array.slice(mid + 1, right + 1)
    let i = 0,
      j = 0,
      k = left

    while (i < leftArr.length && j < rightArr.length) {
      yield {
        array: [...array],
        comparingIndices: [left + i, mid + 1 + j],
        sortedIndices: [],
        swappedIndices: [],
      }

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i]
        i++
      } else {
        array[k] = rightArr[j]
        j++
      }
      k++

      yield {
        array: [...array],
        comparingIndices: [],
        sortedIndices: Array.from({ length: k - left }, (_, idx) => left + idx),
        swappedIndices: [],
      }
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i]
      i++
      k++
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j]
      j++
      k++
    }

    yield {
      array: [...array],
      comparingIndices: [],
      sortedIndices: Array.from({ length: k - left }, (_, idx) => left + idx),
      swappedIndices: [],
    }
  }

  yield* mergeSortHelper(0, n - 1)

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* heapSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  function* heapify(size: number, i: number) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < size && array[left] > array[largest]) {
      largest = left
    }
    if (right < size && array[right] > array[largest]) {
      largest = right
    }

    if (largest !== i) {
      yield {
        array: [...array],
        comparingIndices: [i, largest],
        sortedIndices: Array.from({ length: n - size }, (_, k) => n - 1 - k),
        swappedIndices: [],
      }
      ;[array[i], array[largest]] = [array[largest], array[i]]
      yield {
        array: [...array],
        comparingIndices: [],
        sortedIndices: Array.from({ length: n - size }, (_, k) => n - 1 - k),
        swappedIndices: [i, largest],
      }

      yield* heapify(size, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    yield {
      array: [...array],
      comparingIndices: [0, i],
      sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      swappedIndices: [],
    }
    ;[array[0], array[i]] = [array[i], array[0]]
    yield {
      array: [...array],
      comparingIndices: [],
      sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      swappedIndices: [0, i],
    }

    yield* heapify(i, 0)
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* shellSort(arr: number[]) {
  const array = [...arr]
  const n = array.length
  let gap = Math.floor(n / 2)

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = array[i]
      let j = i

      while (j >= gap && array[j - gap] > temp) {
        yield {
          array: [...array],
          comparingIndices: [j - gap, j],
          sortedIndices: [],
          swappedIndices: [],
        }

        array[j] = array[j - gap]
        j -= gap
      }

      array[j] = temp

      yield {
        array: [...array],
        comparingIndices: [],
        sortedIndices: [],
        swappedIndices: [j],
      }
    }

    gap = Math.floor(gap / 2)
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* cocktailSort(arr: number[]) {
  const array = [...arr]
  const n = array.length
  let start = 0
  let end = n - 1
  let swapped = true

  while (swapped && start < end) {
    swapped = false

    // Forward pass
    for (let i = start; i < end; i++) {
      yield {
        array: [...array],
        comparingIndices: [i, i + 1],
        sortedIndices: [],
        swappedIndices: [],
      }

      if (array[i] > array[i + 1]) {
        ;[array[i], array[i + 1]] = [array[i + 1], array[i]]
        swapped = true
        yield {
          array: [...array],
          comparingIndices: [],
          sortedIndices: [],
          swappedIndices: [i, i + 1],
        }
      }
    }

    if (!swapped) break
    end--
    swapped = false

    // Backward pass
    for (let i = end; i > start; i--) {
      yield {
        array: [...array],
        comparingIndices: [i - 1, i],
        sortedIndices: [],
        swappedIndices: [],
      }

      if (array[i - 1] > array[i]) {
        ;[array[i - 1], array[i]] = [array[i], array[i - 1]]
        swapped = true
        yield {
          array: [...array],
          comparingIndices: [],
          sortedIndices: [],
          swappedIndices: [i - 1, i],
        }
      }
    }

    start++
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* countingSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  if (n === 0) return

  const max = Math.max(...array)
  const min = Math.min(...array)
  const range = max - min + 1
  const count = new Array(range).fill(0)

  // Count occurrences
  for (let i = 0; i < n; i++) {
    yield {
      array: [...array],
      comparingIndices: [i],
      sortedIndices: [],
      swappedIndices: [],
    }
    count[array[i] - min]++
  }

  // Reconstruct sorted array
  let index = 0
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      array[index] = i + min
      yield {
        array: [...array],
        comparingIndices: [],
        sortedIndices: Array.from({ length: index + 1 }, (_, k) => k),
        swappedIndices: [],
      }
      count[i]--
      index++
    }
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* radixSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  if (n === 0) return

  const max = Math.max(...array)
  let exp = 1

  while (Math.floor(max / exp) > 0) {
    const buckets: number[][] = Array.from({ length: 10 }, () => [])

    // Distribute into buckets
    for (let i = 0; i < n; i++) {
      yield {
        array: [...array],
        comparingIndices: [i],
        sortedIndices: [],
        swappedIndices: [],
      }
      const digit = Math.floor((array[i] / exp) % 10)
      buckets[digit].push(array[i])
    }

    // Collect from buckets
    let index = 0
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        array[index] = buckets[i][j]
        yield {
          array: [...array],
          comparingIndices: [],
          sortedIndices: Array.from({ length: index + 1 }, (_, k) => k),
          swappedIndices: [],
        }
        index++
      }
    }

    exp *= 10
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function* bucketSort(arr: number[]) {
  const array = [...arr]
  const n = array.length

  if (n === 0) return

  const max = Math.max(...array)
  const min = Math.min(...array)
  const bucketCount = Math.floor(Math.sqrt(n))
  const buckets: number[][] = Array.from({ length: bucketCount }, () => [])
  const bucketSize = (max - min) / bucketCount

  // Distribute into buckets
  for (let i = 0; i < n; i++) {
    yield {
      array: [...array],
      comparingIndices: [i],
      sortedIndices: [],
      swappedIndices: [],
    }
    const bucketIndex = Math.min(Math.floor((array[i] - min) / bucketSize), bucketCount - 1)
    buckets[bucketIndex].push(array[i])
  }

  // Sort each bucket and collect
  let index = 0
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length === 0) continue

    // Simple insertion sort for each bucket
    buckets[i].sort((a, b) => a - b)

    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = buckets[i][j]
      yield {
        array: [...array],
        comparingIndices: [],
        sortedIndices: Array.from({ length: index + 1 }, (_, k) => k),
        swappedIndices: [],
      }
      index++
    }
  }

  yield {
    array: [...array],
    comparingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    swappedIndices: [],
  }
}

export function getSortingGenerator(name: AlgorithmName, arr: number[]) {
  switch (name) {
    case "bubble-sort":
      return bubbleSort(arr)
    case "selection-sort":
      return selectionSort(arr)
    case "insertion-sort":
      return insertionSort(arr)
    case "merge-sort":
      return mergeSort(arr)
    case "quick-sort":
      return quickSort(arr)
    case "heap-sort":
      return heapSort(arr)
    case "shell-sort":
      return shellSort(arr)
    case "cocktail-sort":
      return cocktailSort(arr)
    case "counting-sort":
      return countingSort(arr)
    case "radix-sort":
      return radixSort(arr)
    case "bucket-sort":
      return bucketSort(arr)
    default:
      return bubbleSort(arr)
  }
}

export const algorithmInfo: Record<
  AlgorithmName,
  {
    name: string
    emoji: string
    description: string
    complexity: string
    bestCase: string
    worstCase: string
  }
> = {
  "bubble-sort": {
    name: "Bubble Sort 🫧",
    emoji: "🫧",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    complexity: "O(n²)",
    bestCase: "O(n) - when already sorted",
    worstCase: "O(n²) - when reverse sorted",
  },
  "selection-sort": {
    name: "Selection Sort 🎯",
    emoji: "🎯",
    description:
      "Divides the list into sorted and unsorted portions, repeatedly selecting the minimum from the unsorted portion.",
    complexity: "O(n²)",
    bestCase: "O(n²)",
    worstCase: "O(n²)",
  },
  "insertion-sort": {
    name: "Insertion Sort 📌",
    emoji: "📌",
    description:
      "Builds the final sorted array one item at a time by inserting each element into its correct position.",
    complexity: "O(n²)",
    bestCase: "O(n) - when already sorted",
    worstCase: "O(n²) - when reverse sorted",
  },
  "merge-sort": {
    name: "Merge Sort 🔀",
    emoji: "🔀",
    description: "Divides the list in half recursively, then merges the sorted halves back together.",
    complexity: "O(n log n)",
    bestCase: "O(n log n)",
    worstCase: "O(n log n)",
  },
  "quick-sort": {
    name: "Quick Sort ⚡",
    emoji: "⚡",
    description: "Selects a pivot element and partitions the list around it, then recursively sorts the partitions.",
    complexity: "O(n log n)",
    bestCase: "O(n log n) - balanced partitions",
    worstCase: "O(n²) - poor pivot selection",
  },
  "heap-sort": {
    name: "Heap Sort 📚",
    emoji: "📚",
    description: "Builds a max heap and repeatedly extracts the maximum element to create the sorted array.",
    complexity: "O(n log n)",
    bestCase: "O(n log n)",
    worstCase: "O(n log n)",
  },
  "shell-sort": {
    name: "Shell Sort 🐚",
    emoji: "🐚",
    description: "Generalizes insertion sort by allowing the comparison and exchange of elements that are far apart.",
    complexity: "O(n log n)",
    bestCase: "O(n log n)",
    worstCase: "O(n²) - worst case depends on gap sequence",
  },
  "cocktail-sort": {
    name: "Cocktail Sort 🍹",
    emoji: "🍹",
    description:
      "A variation of bubble sort that sorts in both directions on each pass, making it slightly more efficient.",
    complexity: "O(n²)",
    bestCase: "O(n) - when already sorted",
    worstCase: "O(n²)",
  },
  "counting-sort": {
    name: "Counting Sort 🔢",
    emoji: "🔢",
    description: "Non-comparative sort that counts occurrences of each value to reconstruct the sorted array.",
    complexity: "O(n + k)",
    bestCase: "O(n + k) - linear time",
    worstCase: "O(n + k) - linear time, where k is range",
  },
  "radix-sort": {
    name: "Radix Sort 🎛️",
    emoji: "🎛️",
    description: "Sorts numbers by processing digits individually, working from least to most significant digit.",
    complexity: "O(nk)",
    bestCase: "O(nk) - linear for digit length",
    worstCase: "O(nk) - linear for digit length",
  },
  "bucket-sort": {
    name: "Bucket Sort 🗑️",
    emoji: "🗑️",
    description: "Divides the array into a number of buckets, sorts each bucket, and then merges them.",
    complexity: "O(n + k)",
    bestCase: "O(n + k) - when input is uniformly distributed",
    worstCase: "O(n²) - when all elements are in the same bucket",
  },
}
