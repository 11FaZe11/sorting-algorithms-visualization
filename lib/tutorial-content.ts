export interface TutorialStep {
  title: string
  description: string
  explanation: string
  hint: string
}

export interface AlgorithmTutorial {
  name: string
  description: string
  steps: TutorialStep[]
  quizzes: QuizQuestion[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const tutorialContent: Record<string, AlgorithmTutorial> = {
  "bubble-sort": {
    name: "Bubble Sort",
    description:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    steps: [
      {
        title: "Initialize",
        description: "Start with the first element",
        explanation: "We begin comparing from the first pair of elements in the array.",
        hint: "Look at the first two elements",
      },
      {
        title: "Compare",
        description: "Compare adjacent elements",
        explanation: "We check if the first element is greater than the second element.",
        hint: "Is the left element larger than the right element?",
      },
      {
        title: "Swap if needed",
        description: "Swap if left > right",
        explanation: "If the left element is greater, we swap them to move larger values to the right.",
        hint: "Larger values bubble up to the right",
      },
      {
        title: "Move forward",
        description: "Move to the next pair",
        explanation: "We move one position forward and repeat the comparison.",
        hint: "Continue this process for each adjacent pair",
      },
    ],
    quizzes: [
      {
        question: "What is the main principle of Bubble Sort?",
        options: [
          "Divide and conquer",
          "Compare and swap adjacent elements",
          "Divide into buckets",
          "Partition around a pivot",
        ],
        correct: 1,
        explanation:
          "Bubble Sort works by repeatedly comparing and swapping adjacent elements until the array is sorted.",
      },
      {
        question: "What is the time complexity of Bubble Sort in the worst case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 2,
        explanation:
          "Bubble Sort has O(n²) time complexity in the worst case because it needs to make n passes through the array.",
      },
    ],
  },
  "selection-sort": {
    name: "Selection Sort",
    description:
      "Selection Sort divides the array into sorted and unsorted portions, repeatedly finding the minimum element.",
    steps: [
      {
        title: "Find minimum",
        description: "Find the smallest element",
        explanation: "We scan through the unsorted portion to find the minimum value.",
        hint: "Look for the smallest number in the remaining elements",
      },
      {
        title: "Mark position",
        description: "Remember the minimum position",
        explanation: "We keep track of where the minimum element is located.",
        hint: "Store the index of the minimum value",
      },
      {
        title: "Swap to sorted",
        description: "Swap with the first unsorted element",
        explanation: "We move the minimum to the end of the sorted portion by swapping.",
        hint: "Place the minimum at the correct position",
      },
      {
        title: "Move boundary",
        description: "Expand the sorted portion",
        explanation: "The sorted portion grows by one element each iteration.",
        hint: "The boundary between sorted and unsorted moves right",
      },
    ],
    quizzes: [
      {
        question: "How many swaps does Selection Sort make in the worst case?",
        options: ["n-1", "n²", "n log n", "2n"],
        correct: 0,
        explanation: "Selection Sort makes at most n-1 swaps, one for each element placed in its correct position.",
      },
    ],
  },
  "insertion-sort": {
    name: "Insertion Sort",
    description:
      "Insertion Sort builds the sorted array one item at a time by inserting elements into their correct position.",
    steps: [
      {
        title: "Start from second element",
        description: "Begin with the second element",
        explanation: "The first element is already considered sorted.",
        hint: "We treat the first element as our initial sorted portion",
      },
      {
        title: "Compare with sorted",
        description: "Compare with sorted elements",
        explanation: "We compare the current element with elements in the sorted portion.",
        hint: "Find where this element belongs",
      },
      {
        title: "Shift elements",
        description: "Shift larger elements right",
        explanation: "Elements larger than the current one are shifted right to make space.",
        hint: "Make room for insertion",
      },
      {
        title: "Insert element",
        description: "Insert in correct position",
        explanation: "The element is placed in its correct position in the sorted portion.",
        hint: "Insert the element and move to the next",
      },
    ],
    quizzes: [
      {
        question: "Insertion Sort is efficient for which type of arrays?",
        options: ["Nearly sorted arrays", "Large random arrays", "Reverse sorted arrays", "All arrays equally"],
        correct: 0,
        explanation:
          "Insertion Sort is very efficient for nearly sorted arrays because it requires fewer comparisons and shifts.",
      },
    ],
  },
}

export const getAlgorithmTutorial = (algorithmName: string): AlgorithmTutorial | undefined => {
  return tutorialContent[algorithmName]
}
