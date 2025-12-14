export interface AlgorithmDetail {
  name: string
  emoji: string
  description: string
  pseudocode: string
  codeImplementation: string
  pythonImplementation: string // Added Python implementation field
  complexity: {
    time: string
    space: string
    best: string
    worst: string
  }
  useCase: string
}

export const algorithmDetails: Record<string, AlgorithmDetail> = {
  "bubble-sort": {
    name: "Bubble Sort",
    emoji: "🫧",
    description:
      "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.",
    pseudocode: `procedure bubbleSort(array)
  n = length(array)
  for i from 0 to n-1 do
    swapped = false
    for j from 0 to n-i-2 do
      if array[j] > array[j+1] then
        swap(array[j], array[j+1])
        swapped = true
      end if
    end for
    if not swapped then
      break
    end if
  end for
end procedure`,
    codeImplementation: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    pythonImplementation: `def bubble_sort(arr):
    """
    Sorts an array using the Bubble Sort algorithm.
    Time: O(n²), Space: O(1)
    """
    n = len(arr)
    
    for i in range(n):
        swapped = False
        
        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap if elements are in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps occurred, array is sorted
        if not swapped:
            break
    
    return arr`,
    complexity: {
      time: "O(n²)",
      space: "O(1)",
      best: "O(n) - when array is already sorted",
      worst: "O(n²) - when array is reverse sorted",
    },
    useCase: "Educational purposes, nearly sorted small datasets",
  },
  "selection-sort": {
    name: "Selection Sort",
    emoji: "🎯",
    description:
      "Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. It repeatedly selects the smallest element from the unsorted portion and moves it to the sorted portion.",
    pseudocode: `procedure selectionSort(array)
  n = length(array)
  for i from 0 to n-1 do
    minIndex = i
    for j from i+1 to n-1 do
      if array[j] < array[minIndex] then
        minIndex = j
      end if
    end for
    if minIndex != i then
      swap(array[i], array[minIndex])
    end if
  end for
end procedure`,
    codeImplementation: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,
    pythonImplementation: `def selection_sort(arr):
    """
    Sorts an array using the Selection Sort algorithm.
    Time: O(n²), Space: O(1)
    """
    n = len(arr)
    
    for i in range(n - 1):
        # Find the minimum element in unsorted portion
        min_index = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap the found minimum with first element
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr`,
    complexity: {
      time: "O(n²)",
      space: "O(1)",
      best: "O(n²) - always same complexity",
      worst: "O(n²) - always same complexity",
    },
    useCase: "Small datasets, when memory writes are costly",
  },
  "insertion-sort": {
    name: "Insertion Sort",
    emoji: "📥",
    description:
      "Insertion Sort builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    pseudocode: `procedure insertionSort(array)
  for i from 1 to length(array)-1 do
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key do
      array[j+1] = array[j]
      j = j - 1
    end while
    array[j+1] = key
  end for
end procedure`,
    codeImplementation: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    pythonImplementation: `def insertion_sort(arr):
    """
    Sorts an array using the Insertion Sort algorithm.
    Time: O(n²), Space: O(1)
    """
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Place key at its correct position
        arr[j + 1] = key
    
    return arr`,
    complexity: {
      time: "O(n²)",
      space: "O(1)",
      best: "O(n) - when array is already sorted",
      worst: "O(n²) - when array is reverse sorted",
    },
    useCase: "Small datasets, nearly sorted data, online algorithms",
  },
  "merge-sort": {
    name: "Merge Sort",
    emoji: "🔀",
    description:
      "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively recursively sorts them, and then merges the two sorted halves.",
    pseudocode: `procedure mergeSort(array)
  if length(array) <= 1 then
    return array
  end if
  
  mid = length(array) / 2
  left = mergeSort(array[0...mid])
  right = mergeSort(array[mid...end])
  
  return merge(left, right)
end procedure

procedure merge(left, right)
  result = []
  while left and right are not empty do
    if left[0] <= right[0] then
      append left[0] to result
      remove left[0] from left
    else
      append right[0] to result
      remove right[0] from right
    end if
  end while
  append remaining elements to result
  return result
end procedure`,
    codeImplementation: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    pythonImplementation: `def merge_sort(arr):
    """
    Sorts an array using the Merge Sort algorithm.
    Time: O(n log n), Space: O(n)
    """
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    """Merges two sorted arrays into one sorted array."""
    result = []
    i = j = 0
    
    # Compare elements from left and right arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result`,
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      best: "O(n log n) - always same complexity",
      worst: "O(n log n) - always same complexity",
    },
    useCase: "Large datasets, stable sorting required, external sorting",
  },
  "quick-sort": {
    name: "Quick Sort",
    emoji: "⚡",
    description:
      "Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the array around the pivot, placing smaller elements before it and larger elements after it.",
    pseudocode: `procedure quickSort(array, low, high)
  if low < high then
    pivotIndex = partition(array, low, high)
    quickSort(array, low, pivotIndex - 1)
    quickSort(array, pivotIndex + 1, high)
  end if
end procedure

procedure partition(array, low, high)
  pivot = array[high]
  i = low - 1
  
  for j from low to high-1 do
    if array[j] < pivot then
      i = i + 1
      swap(array[i], array[j])
    end if
  end for
  
  swap(array[i + 1], array[high])
  return i + 1
end procedure`,
    codeImplementation: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    pythonImplementation: `def quick_sort(arr, low=0, high=None):
    """
    Sorts an array using the Quick Sort algorithm.
    Time: O(n log n) average, O(n²) worst, Space: O(log n)
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """Partitions array around pivot element."""
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    complexity: {
      time: "O(n log n)",
      space: "O(log n)",
      best: "O(n log n) - balanced partitions",
      worst: "O(n²) - unbalanced partitions",
    },
    useCase: "General purpose, large datasets, in-memory sorting",
  },
  "heap-sort": {
    name: "Heap Sort",
    emoji: "🏔️",
    description:
      "Heap Sort uses a binary heap data structure to sort elements. It divides the input into a sorted and unsorted region and iteratively shrinks the unsorted region by extracting the largest element.",
    pseudocode: `procedure heapSort(array)
  buildMaxHeap(array)
  
  for i from length(array)-1 down to 1 do
    swap(array[0], array[i])
    heapify(array, 0, i)
  end for
end procedure

procedure buildMaxHeap(array)
  n = length(array)
  for i from n/2 - 1 down to 0 do
    heapify(array, i, n)
  end for
end procedure

procedure heapify(array, i, heapSize)
  largest = i
  left = 2 * i + 1
  right = 2 * i + 2
  
  if left < heapSize and array[left] > array[largest] then
    largest = left
  end if
  
  if right < heapSize and array[right] > array[largest] then
    largest = right
  end if
  
  if largest != i then
    swap(array[i], array[largest])
    heapify(array, largest, heapSize)
  end if
end procedure`,
    codeImplementation: `function heapSort(arr) {
  buildMaxHeap(arr);
  
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  
  return arr;
}

function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n);
  }
}

function heapify(arr, i, heapSize) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, heapSize);
  }
}`,
    pythonImplementation: `def heap_sort(arr):
    """
    Sorts an array using the Heap Sort algorithm.
    Time: O(n log n), Space: O(1)
    """
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, heap_size, i):
    """Maintains max heap property."""
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check if left child exists and is greater
    if left < heap_size and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child exists and is greater
    if right < heap_size and arr[right] > arr[largest]:
        largest = right
    
    # Swap and continue heapifying if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, heap_size, largest)`,
    complexity: {
      time: "O(n log n)",
      space: "O(1)",
      best: "O(n log n) - always same complexity",
      worst: "O(n log n) - always same complexity",
    },
    useCase: "Memory-constrained environments, guaranteed O(n log n)",
  },
  "radix-sort": {
    name: "Radix Sort",
    emoji: "📊",
    description:
      "Radix Sort is a non-comparative sorting algorithm that sorts integers by processing individual digits. It processes digits from least significant to most significant, using counting sort as a subroutine.",
    pseudocode: `procedure radixSort(array)
  max = findMax(array)
  exp = 1
  
  while max / exp > 0 do
    countingSort(array, exp)
    exp = exp * 10
  end while
end procedure

procedure countingSort(array, exp)
  output = array of size n
  count = array of size 10, initialized to 0
  
  for i from 0 to n-1 do
    digit = (array[i] / exp) % 10
    count[digit] = count[digit] + 1
  end for
  
  for i from 1 to 9 do
    count[i] = count[i] + count[i-1]
  end for
  
  for i from n-1 down to 0 do
    digit = (array[i] / exp) % 10
    output[count[digit] - 1] = array[i]
    count[digit] = count[digit] - 1
  end for
  
  copy output to array
end procedure`,
    codeImplementation: `function radixSort(arr) {
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
    pythonImplementation: `def radix_sort(arr):
    """
    Sorts an array using the Radix Sort algorithm.
    Time: O(d * (n + k)), Space: O(n + k)
    where d is number of digits, k is range of digits (10)
    """
    if not arr:
        return arr
    
    # Find the maximum number to determine digits
    max_num = max(arr)
    
    # Apply counting sort for each digit
    exp = 1
    while max_num // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    """Counting sort based on digit represented by exp."""
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    # Store count of occurrences
    for i in range(n):
        digit = (arr[i] // exp) % 10
        count[digit] += 1
    
    # Change count[i] to actual position
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    # Copy output to arr
    for i in range(n):
        arr[i] = output[i]`,
    complexity: {
      time: "O(d * (n + k))",
      space: "O(n + k)",
      best: "O(d * (n + k)) - always same complexity",
      worst: "O(d * (n + k)) - always same complexity",
    },
    useCase: "Integer sorting, fixed-length keys, linear time requirements",
  },
  "counting-sort": {
    name: "Counting Sort",
    emoji: "🔢",
    description:
      "Counting Sort is a non-comparative sorting algorithm that works by counting the number of objects having distinct key values, then doing arithmetic to calculate the position of each object in the output sequence.",
    pseudocode: `procedure countingSort(array)
  max = findMax(array)
  min = findMin(array)
  range = max - min + 1
  
  count = array of size range, initialized to 0
  output = array of size n
  
  for i from 0 to n-1 do
    count[array[i] - min] = count[array[i] - min] + 1
  end for
  
  for i from 1 to range-1 do
    count[i] = count[i] + count[i-1]
  end for
  
  for i from n-1 down to 0 do
    index = array[i] - min
    output[count[index] - 1] = array[i]
    count[index] = count[index] - 1
  end for
  
  copy output to array
end procedure`,
    codeImplementation: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = arr.length - 1; i >= 0; i--) {
    const index = arr[i] - min;
    output[count[index] - 1] = arr[i];
    count[index]--;
  }
  
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  
  return arr;
}`,
    pythonImplementation: `def counting_sort(arr):
    """
    Sorts an array using the Counting Sort algorithm.
    Time: O(n + k), Space: O(n + k)
    where k is the range of input values
    """
    if not arr:
        return arr
    
    # Find range of input
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    # Create count and output arrays
    count = [0] * range_size
    output = [0] * len(arr)
    
    # Store count of each element
    for num in arr:
        count[num - min_val] += 1
    
    # Change count[i] to actual position
    for i in range(1, range_size):
        count[i] += count[i - 1]
    
    # Build output array
    for i in range(len(arr) - 1, -1, -1):
        index = arr[i] - min_val
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    
    # Copy output to original array
    for i in range(len(arr)):
        arr[i] = output[i]
    
    return arr`,
    complexity: {
      time: "O(n + k)",
      space: "O(n + k)",
      best: "O(n + k) - always same complexity",
      worst: "O(n + k) - always same complexity",
    },
    useCase: "Small range of integers, when range is not much larger than n",
  },
  "shell-sort": {
    name: "Shell Sort",
    emoji: "🐚",
    description:
      "Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart. It starts by sorting pairs of elements far apart, then progressively reducing the gap between elements to be compared.",
    pseudocode: `procedure shellSort(array)
  n = length(array)
  gap = n / 2
  
  while gap > 0 do
    for i from gap to n-1 do
      temp = array[i]
      j = i
      
      while j >= gap and array[j - gap] > temp do
        array[j] = array[j - gap]
        j = j - gap
      end while
      
      array[j] = temp
    end for
    
    gap = gap / 2
  end while
end procedure`,
    codeImplementation: `function shellSort(arr) {
  const n = arr.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
  }
  
  return arr;
}`,
    pythonImplementation: `def shell_sort(arr):
    """
    Sorts an array using the Shell Sort algorithm.
    Time: O(n²) worst, O(n log n) average, Space: O(1)
    """
    n = len(arr)
    gap = n // 2
    
    # Start with large gap, then reduce
    while gap > 0:
        # Perform gapped insertion sort
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            # Shift earlier gap-sorted elements
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            
            arr[j] = temp
        
        # Reduce gap for next iteration
        gap //= 2
    
    return arr`,
    complexity: {
      time: "O(n²)",
      space: "O(1)",
      best: "O(n log n) - depends on gap sequence",
      worst: "O(n²) - worst gap sequence",
    },
    useCase: "Medium-sized arrays, when auxiliary space is limited",
  },
  "bucket-sort": {
    name: "Bucket Sort",
    emoji: "🪣",
    description:
      "Bucket Sort distributes elements into several buckets, sorts each bucket individually, and then concatenates all sorted buckets. It works well when input is uniformly distributed over a range.",
    pseudocode: `procedure bucketSort(array)
  n = length(array)
  buckets = create n empty buckets
  
  // Distribute elements into buckets
  for i from 0 to n-1 do
    bucketIndex = floor(n * array[i])
    append array[i] to buckets[bucketIndex]
  end for
  
  // Sort individual buckets
  for i from 0 to n-1 do
    sort(buckets[i])
  end for
  
  // Concatenate all buckets
  index = 0
  for i from 0 to n-1 do
    for j from 0 to size(buckets[i])-1 do
      array[index] = buckets[i][j]
      index = index + 1
    end for
  end for
end procedure`,
    codeImplementation: `function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;
  
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  
  // Distribute elements into buckets
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }
  
  // Sort individual buckets and concatenate
  arr.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
    arr.push(...buckets[i]);
  }
  
  return arr;
}`,
    pythonImplementation: `def bucket_sort(arr, bucket_size=5):
    """
    Sorts an array using the Bucket Sort algorithm.
    Time: O(n + k) average, O(n²) worst, Space: O(n + k)
    """
    if not arr:
        return arr
    
    # Find range
    min_val = min(arr)
    max_val = max(arr)
    
    # Calculate number of buckets
    bucket_count = (max_val - min_val) // bucket_size + 1
    buckets = [[] for _ in range(bucket_count)]
    
    # Distribute elements into buckets
    for num in arr:
        bucket_index = (num - min_val) // bucket_size
        buckets[bucket_index].append(num)
    
    # Sort individual buckets and concatenate
    arr.clear()
    for bucket in buckets:
        # Use insertion sort for individual buckets
        insertion_sort(bucket)
        arr.extend(bucket)
    
    return arr

def insertion_sort(arr):
    """Helper function for sorting individual buckets."""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    complexity: {
      time: "O(n + k)",
      space: "O(n + k)",
      best: "O(n + k) - uniformly distributed data",
      worst: "O(n²) - all elements in one bucket",
    },
    useCase: "Uniformly distributed floating-point numbers, external sorting",
  },
  bfs: {
    name: "Breadth-First Search",
    emoji: "🌊",
    description:
      "BFS explores all nodes at the current depth before moving to the next depth level. It guarantees the shortest path in unweighted graphs.",
    pseudocode: `procedure BFS(graph, start, end)
  queue = Queue()
  queue.enqueue(start)
  visited = Set()
  visited.add(start)
  parent = Map()
  
  while queue is not empty do
    current = queue.dequeue()
    
    if current == end then
      reconstruct and return path
    end if
    
    for each neighbor of current do
      if neighbor not in visited then
        visited.add(neighbor)
        parent[neighbor] = current
        queue.enqueue(neighbor)
      end if
    end for
  end while
end procedure`,
    codeImplementation: `function bfs(grid, start, end) {
  const queue = [[start, [start]]];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const [current, path] = queue.shift();
    
    if (current === end) return path;
    
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return [];
}`,
    pythonImplementation: `def bfs(graph, start, end):
    """
    Performs Breadth-First Search on a graph.
    Time: O(V + E), Space: O(V)
    """
    queue = [(start, [start])]
    visited = set([start])
    
    while queue:
        current, path = queue.pop(0)
        
        if current == end:
            return path
        
        for neighbor in get_neighbors(graph, current):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return []`,
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      best: "O(1) - when target is first neighbor",
      worst: "O(V + E) - must explore all vertices and edges",
    },
    useCase: "Shortest path in unweighted graphs, finding neighbors, level-order traversal",
  },
  dfs: {
    name: "Depth-First Search",
    emoji: "🔍",
    description:
      "DFS explores as far as possible along each branch before backtracking. Memory efficient but doesn't guarantee shortest path.",
    pseudocode: `procedure DFS(graph, start, end, visited)
  visited.add(start)
  
  if start == end then
    return [start]
  end if
  
  for each neighbor of start do
    if neighbor not in visited then
      path = DFS(graph, neighbor, end, visited)
      if path is not empty then
        return [start] + path
      end if
    end if
  end for
  
  return []
end procedure`,
    codeImplementation: `function dfs(grid, start, end, visited = new Set()) {
  visited.add(start);
  
  if (start === end) return [start];
  
  const neighbors = getNeighbors(grid, start);
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      const path = dfs(grid, neighbor, end, visited);
      if (path.length > 0) return [start, ...path];
    }
  }
  return [];
}`,
    pythonImplementation: `def dfs(graph, start, end, visited=None):
    """
    Performs Depth-First Search on a graph.
    Time: O(V + E), Space: O(V)
    """
    if visited is None:
        visited = set()
    
    visited.add(start)
    
    if start == end:
        return [start]
    
    for neighbor in get_neighbors(graph, start):
        if neighbor not in visited:
            path = dfs(graph, neighbor, end, visited)
            if path:
                return [start] + path
    
    return []`,
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      best: "O(1) - when target is first neighbor",
      worst: "O(V + E) - must explore all vertices and edges",
    },
    useCase: "Topological sorting, cycle detection, connected components, maze generation",
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    emoji: "📊",
    description:
      "Greedily selects the nearest unvisited node and explores outward. Guarantees shortest path in weighted graphs with non-negative weights.",
    pseudocode: `procedure Dijkstra(graph, start, end)
  distances = Map with all distances set to infinity
  distances[start] = 0
  unvisited = Set of all nodes
  previous = Map()
  
  while unvisited is not empty do
    current = node in unvisited with min distance
    unvisited.remove(current)
    
    if current == end then
      reconstruct and return path
    end if
    
    for each neighbor of current do
      newDist = distances[current] + weight(current, neighbor)
      if newDist < distances[neighbor] then
        distances[neighbor] = newDist
        previous[neighbor] = current
      end if
    end for
  end while
end procedure`,
    codeImplementation: `function dijkstra(grid, start, end) {
  const distances = new Map();
  const visited = new Set();
  const queue = [[start, 0]];
  
  distances.set(start, 0);
  
  while (queue.length > 0) {
    queue.sort((a, b) => a[1] - b[1]);
    const [current, dist] = queue.shift();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    if (current === end) break;
    
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const newDist = dist + 1;
      if (!visited.has(neighbor) && newDist < (distances.get(neighbor) || Infinity)) {
        distances.set(neighbor, newDist);
        queue.push([neighbor, newDist]);
      }
    }
  }
  return [];
}`,
    pythonImplementation: `def dijkstra(graph, start, end):
    """
    Finds the shortest path using Dijkstra's algorithm.
    Time: O((V + E) log V), Space: O(V)
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    visited = set()
    queue = [(start, 0)]
    
    while queue:
        queue.sort(key=lambda x: x[1])
        current, dist = queue.pop(0)
        
        if current in visited:
            continue
        visited.add(current)
        
        if current == end:
            break
        
        for neighbor, weight in graph[current].items():
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                queue.append((neighbor, new_dist))
    
    return []`,
    complexity: {
      time: "O((V + E) log V)",
      space: "O(V)",
      best: "O(V log V) - with binary heap",
      worst: "O((V + E) log V) - with binary heap",
    },
    useCase: "GPS navigation, network routing, flight connections, weighted shortest paths",
  },
  astar: {
    name: "A* Pathfinding",
    emoji: "⭐",
    description:
      "A* uses a heuristic function to intelligently guide its search towards the goal, combining the benefits of Dijkstra's algorithm with informed search.",
    pseudocode: `function AStar(grid, start, end):
    openSet = priority queue containing start
    cameFrom = empty map
    gScore = map with default value Infinity
    gScore[start] = 0
    fScore = map with default value Infinity
    fScore[start] = heuristic(start, end)
    
    while openSet is not empty:
        current = node in openSet with lowest fScore
        
        if current equals end:
            return reconstruct_path(cameFrom, current)
        
        remove current from openSet
        
        for each neighbor of current:
            tentative_gScore = gScore[current] + distance(current, neighbor)
            
            if tentative_gScore < gScore[neighbor]:
                cameFrom[neighbor] = current
                gScore[neighbor] = tentative_gScore
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end)
                
                if neighbor not in openSet:
                    add neighbor to openSet
    
    return failure`,
    codeImplementation: `function aStar(grid, start, end) {
  const openSet = new PriorityQueue();
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();
  
  const key = (node) => \`\${node[0]},\${node[1]}\`;
  
  gScore.set(key(start), 0);
  fScore.set(key(start), heuristic(start, end));
  openSet.enqueue(start, fScore.get(key(start)));
  
  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();
    
    if (current[0] === end[0] && current[1] === end[1]) {
      return reconstructPath(cameFrom, current);
    }
    
    for (const neighbor of getNeighbors(grid, current)) {
      const tentativeGScore = gScore.get(key(current)) + 1;
      
      if (tentativeGScore < (gScore.get(key(neighbor)) || Infinity)) {
        cameFrom.set(key(neighbor), current);
        gScore.set(key(neighbor), tentativeGScore);
        fScore.set(key(neighbor), tentativeGScore + heuristic(neighbor, end));
        
        if (!openSet.contains(neighbor)) {
          openSet.enqueue(neighbor, fScore.get(key(neighbor)));
        }
      }
    }
  }
  
  return null;
}

function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}`,
    pythonImplementation: `from queue import PriorityQueue

def astar(grid, start, end):
    """
    A* pathfinding algorithm with heuristic.
    Time: O(b^d) where b is branching factor, d is depth
    Space: O(b^d)
    """
    open_set = PriorityQueue()
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, end)}
    
    open_set.put((f_score[start], start))
    
    while not open_set.empty():
        _, current = open_set.get()
        
        if current == end:
            return reconstruct_path(came_from, current)
        
        for neighbor in get_neighbors(grid, current):
            tentative_g_score = g_score[current] + 1
            
            if tentative_g_score < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + heuristic(neighbor, end)
                open_set.put((f_score[neighbor], neighbor))
    
    return None

def heuristic(a, end):
    """Manhattan distance heuristic."""
    return abs(a[0] - end[0]) + abs(a[1] - end[1])`,
    complexity: {
      time: "O(b^d)",
      space: "O(b^d)",
      best: "O(b^d) - depends on heuristic quality",
      worst: "O(b^d) - poor heuristic makes it like Dijkstra",
    },
    useCase: "Game AI pathfinding, robotics navigation, puzzle solving, optimal routing with heuristics",
  },

  "linear-search": {
    name: "Linear Search",
    emoji: "🔍",
    description:
      "Linear search sequentially checks each element in a list until the target is found or all elements have been checked. Simple but can be slow for large datasets.",
    pseudocode: `function LinearSearch(array, target):
    for i from 0 to length(array) - 1:
        if array[i] equals target:
            return i
    return -1`,
    codeImplementation: `function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    pythonImplementation: `def linear_search(array, target):
    """
    Linear search algorithm.
    Time: O(n)
    Space: O(1)
    """
    for i in range(len(array)):
        if array[i] == target:
            return i
    return -1`,
    complexity: {
      time: "O(n)",
      space: "O(1)",
      best: "O(1) - target is first element",
      worst: "O(n) - target is last or not present",
    },
    useCase: "Small datasets, unsorted data, simple implementation needed",
  },

  "binary-search": {
    name: "Binary Search",
    emoji: "🎯",
    description:
      "Binary search efficiently finds an element in a sorted array by repeatedly dividing the search interval in half. Much faster than linear search for sorted data.",
    pseudocode: `function BinarySearch(sorted_array, target):
    left = 0
    right = length(sorted_array) - 1
    
    while left <= right:
        mid = floor((left + right) / 2)
        
        if sorted_array[mid] equals target:
            return mid
        else if sorted_array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    codeImplementation: `function binarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (sortedArray[mid] === target) {
      return mid;
    } else if (sortedArray[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
    pythonImplementation: `def binary_search(sorted_array, target):
    """
    Binary search algorithm for sorted arrays.
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(sorted_array) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if sorted_array[mid] == target:
            return mid
        elif sorted_array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      best: "O(1) - target is at middle",
      worst: "O(log n) - target is at end or not present",
    },
    useCase: "Large sorted datasets, database queries, dictionary lookups, efficient searching",
  },

  "jump-search": {
    name: "Jump Search",
    emoji: "🦘",
    description:
      "Jump search works on sorted arrays by jumping ahead by fixed steps and then performing linear search in the identified block. Better than linear, worse than binary for large datasets.",
    pseudocode: `function JumpSearch(sorted_array, target):
    n = length(sorted_array)
    step = sqrt(n)
    prev = 0
    
    while sorted_array[min(step, n) - 1] < target:
        prev = step
        step = step + sqrt(n)
        if prev >= n:
            return -1
    
    while sorted_array[prev] < target:
        prev = prev + 1
        if prev equals min(step, n):
            return -1
    
    if sorted_array[prev] equals target:
        return prev
    
    return -1`,
    codeImplementation: `function jumpSearch(sortedArray, target) {
  const n = sortedArray.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  while (sortedArray[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  for (let i = prev; i < Math.min(step, n); i++) {
    if (sortedArray[i] === target) {
      return i;
    }
  }
  
  return -1;
}`,
    pythonImplementation: `import math

def jump_search(sorted_array, target):
    """
    Jump search algorithm for sorted arrays.
    Time: O(√n)
    Space: O(1)
    """
    n = len(sorted_array)
    step = int(math.sqrt(n))
    prev = 0
    
    while sorted_array[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    
    for i in range(prev, min(step, n)):
        if sorted_array[i] == target:
            return i
    
    return -1`,
    complexity: {
      time: "O(√n)",
      space: "O(1)",
      best: "O(1) - target at first jump",
      worst: "O(√n) - target at end or not present",
    },
    useCase: "Sorted arrays where jumping is cheaper than binary search, systems with expensive comparisons",
  },

  "interpolation-search": {
    name: "Interpolation Search",
    emoji: "📊",
    description:
      "Interpolation search improves upon binary search by calculating the probable position of the target using interpolation formula. Works best on uniformly distributed sorted data.",
    pseudocode: `function InterpolationSearch(sorted_array, target):
    left = 0
    right = length(sorted_array) - 1
    
    while left <= right and target >= sorted_array[left] and target <= sorted_array[right]:
        if left equals right:
            if sorted_array[left] equals target:
                return left
            return -1
        
        pos = left + ((target - sorted_array[left]) * (right - left)) / 
              (sorted_array[right] - sorted_array[left])
        
        if sorted_array[pos] equals target:
            return pos
        
        if sorted_array[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1`,
    codeImplementation: `function interpolationSearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  
  while (left <= right && target >= sortedArray[left] && target <= sortedArray[right]) {
    if (left === right) {
      return sortedArray[left] === target ? left : -1;
    }
    
    const pos = left + Math.floor(
      ((target - sortedArray[left]) * (right - left)) / 
      (sortedArray[right] - sortedArray[left])
    );
    
    if (sortedArray[pos] === target) {
      return pos;
    }
    
    if (sortedArray[pos] < target) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }
  
  return -1;
}`,
    pythonImplementation: `def interpolation_search(sorted_array, target):
    """
    Interpolation search for uniformly distributed sorted arrays.
    Time: O(log log n) average, O(n) worst
    Space: O(1)
    """
    left, right = 0, len(sorted_array) - 1
    
    while left <= right and sorted_array[left] <= target <= sorted_array[right]:
        if left == right:
            return left if sorted_array[left] == target else -1
        
        # Interpolation formula
        pos = left + int(
            ((target - sorted_array[left]) * (right - left)) /
            (sorted_array[right] - sorted_array[left])
        )
        
        if sorted_array[pos] == target:
            return pos
        
        if sorted_array[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1`,
    complexity: {
      time: "O(log log n)",
      space: "O(1)",
      best: "O(1) - target at calculated position",
      worst: "O(n) - non-uniform distribution",
    },
    useCase: "Uniformly distributed sorted data, phone books, dictionaries with evenly spread values",
  },

  "exponential-search": {
    name: "Exponential Search",
    emoji: "📈",
    description:
      "Exponential search finds the range where the target may exist by repeatedly doubling the index, then performs binary search in that range. Useful for unbounded or infinite lists.",
    pseudocode: `function ExponentialSearch(sorted_array, target):
    if sorted_array[0] equals target:
        return 0
    
    i = 1
    while i < length(sorted_array) and sorted_array[i] <= target:
        i = i * 2
    
    return BinarySearch(sorted_array, target, i/2, min(i, length(sorted_array) - 1))`,
    codeImplementation: `function exponentialSearch(sortedArray, target) {
  if (sortedArray[0] === target) {
    return 0;
  }
  
  let i = 1;
  while (i < sortedArray.length && sortedArray[i] <= target) {
    i *= 2;
  }
  
  // Binary search in identified range
  return binarySearchRange(
    sortedArray, 
    target, 
    Math.floor(i / 2), 
    Math.min(i, sortedArray.length - 1)
  );
}

function binarySearchRange(arr, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    pythonImplementation: `def exponential_search(sorted_array, target):
    """
    Exponential search for sorted arrays.
    Time: O(log n)
    Space: O(1)
    """
    if sorted_array[0] == target:
        return 0
    
    i = 1
    while i < len(sorted_array) and sorted_array[i] <= target:
        i *= 2
    
    # Binary search in the identified range
    return binary_search_range(
        sorted_array, 
        target, 
        i // 2, 
        min(i, len(sorted_array) - 1)
    )

def binary_search_range(arr, target, left, right):
    """Binary search in a specific range."""
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      best: "O(1) - target is first element",
      worst: "O(log n) - standard binary search performance",
    },
    useCase: "Unbounded or infinite lists, searching in large sorted datasets, when size is unknown",
  },

  "ternary-search": {
    name: "Ternary Search",
    emoji: "🔱",
    description:
      "Ternary search divides the array into three parts and determines which part contains the target. Similar to binary search but with three-way comparison.",
    pseudocode: `function TernarySearch(sorted_array, target):
    left = 0
    right = length(sorted_array) - 1
    
    while left <= right:
        mid1 = left + (right - left) / 3
        mid2 = right - (right - left) / 3
        
        if sorted_array[mid1] equals target:
            return mid1
        if sorted_array[mid2] equals target:
            return mid2
        
        if target < sorted_array[mid1]:
            right = mid1 - 1
        else if target > sorted_array[mid2]:
            left = mid2 + 1
        else:
            left = mid1 + 1
            right = mid2 - 1
    
    return -1`,
    codeImplementation: `function ternarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    if (sortedArray[mid1] === target) {
      return mid1;
    }
    if (sortedArray[mid2] === target) {
      return mid2;
    }
    
    if (target < sortedArray[mid1]) {
      right = mid1 - 1;
    } else if (target > sortedArray[mid2]) {
      left = mid2 + 1;
    } else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  
  return -1;
}`,
    pythonImplementation: `def ternary_search(sorted_array, target):
    """
    Ternary search algorithm for sorted arrays.
    Time: O(log₃ n)
    Space: O(1)
    """
    left, right = 0, len(sorted_array) - 1
    
    while left <= right:
        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3
        
        if sorted_array[mid1] == target:
            return mid1
        if sorted_array[mid2] == target:
            return mid2
        
        if target < sorted_array[mid1]:
            right = mid1 - 1
        elif target > sorted_array[mid2]:
            left = mid2 + 1
        else:
            left = mid1 + 1
            right = mid2 - 1
    
    return -1`,
    complexity: {
      time: "O(log₃ n)",
      space: "O(1)",
      best: "O(1) - target at mid1 or mid2",
      worst: "O(log₃ n) - similar to binary search",
    },
    useCase: "Sorted arrays, finding peaks or valleys in data, optimization problems",
  },
}

function getNeighbors(grid, current) {
  // Placeholder for getting neighbors logic
  return []
}

function get_neighbors(graph, node) {
  // Placeholder for getting neighbors logic
  return []
}
