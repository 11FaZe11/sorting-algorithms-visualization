export interface TestCase {
  input: any[]
  expected: any
  description?: string
}

export interface Challenge {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  testCases: TestCase[]
  starterCode: {
    javascript: string
    python: string
  }
  solutionCode: {
    javascript: string
    python: string
  }
  visualizationType: "array" | "tree" | "graph" | "none"
  hints: string[]
}

export const codingChallenges: Challenge[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
      { input: [[1, 5, 3, 7, 9], 12], expected: [2, 4] },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
    },
    solutionCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
    },
    visualizationType: "array",
    hints: [
      "Think about using a hash map to store values you've seen",
      "For each element, calculate what number would sum with it to reach the target",
      "Check if that complement exists in your hash map",
    ],
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] },
      { input: [[]], expected: [] },
      { input: [[1]], expected: [1] },
    ],
    starterCode: {
      javascript: `function reverseList(head) {
  // Your code here
  
}`,
      python: `def reverse_list(head):
    # Your code here
    pass`,
    },
    solutionCode: {
      javascript: `function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
      python: `def reverse_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev`,
    },
    visualizationType: "none",
    hints: [
      "Use three pointers: previous, current, and next",
      "Reverse the direction of each link as you traverse",
      "The new head will be the last node (which becomes prev at the end)",
    ],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Your code here
  
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
    },
    solutionCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  
  for (let char of s) {
    if (char in pairs) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (pairs[top] !== char) return false;
    }
  }
  
  return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    pairs = {'(': ')', '{': '}', '[': ']'}
    
    for char in s:
        if char in pairs:
            stack.append(char)
        else:
            if not stack or pairs[stack.pop()] != char:
                return False
    
    return len(stack) == 0`,
    },
    visualizationType: "array",
    hints: [
      "Use a stack data structure to keep track of opening brackets",
      "When you see a closing bracket, check if it matches the most recent opening bracket",
      "At the end, the stack should be empty if all brackets are matched",
    ],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
      { input: [[-1, -2, -3, -4]], expected: -1 },
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Your code here
  
}`,
      python: `def max_sub_array(nums):
    # Your code here
    pass`,
    },
    solutionCode: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
      python: `def max_sub_array(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
    },
    visualizationType: "array",
    hints: [
      "Use Kadane's Algorithm for optimal O(n) solution",
      "At each position, decide: start a new subarray or extend the existing one?",
      "Keep track of both current sum and maximum sum seen so far",
    ],
  },
  {
    id: "merge-sorted-arrays",
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array and return the merged array.",
    examples: [
      {
        input: "nums1 = [1,2,3], nums2 = [2,5,6]",
        output: "[1,2,2,3,5,6]",
      },
      {
        input: "nums1 = [1], nums2 = []",
        output: "[1]",
      },
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9",
    ],
    testCases: [
      {
        input: [
          [1, 2, 3],
          [2, 5, 6],
        ],
        expected: [1, 2, 2, 3, 5, 6],
      },
      {
        input: [[1], []],
        expected: [1],
      },
      {
        input: [[], [1]],
        expected: [1],
      },
      {
        input: [
          [1, 3, 5],
          [2, 4, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
      },
    ],
    starterCode: {
      javascript: `function merge(nums1, nums2) {
  // Your code here
  
}`,
      python: `def merge(nums1, nums2):
    # Your code here
    pass`,
    },
    solutionCode: {
      javascript: `function merge(nums1, nums2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      result.push(nums1[i++]);
    } else {
      result.push(nums2[j++]);
    }
  }
  
  while (i < nums1.length) result.push(nums1[i++]);
  while (j < nums2.length) result.push(nums2[j++]);
  
  return result;
}`,
      python: `def merge(nums1, nums2):
    result = []
    i, j = 0, 0
    
    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            result.append(nums1[i])
            i += 1
        else:
            result.append(nums2[j])
            j += 1
    
    result.extend(nums1[i:])
    result.extend(nums2[j:])
    
    return result`,
    },
    visualizationType: "array",
    hints: [
      "Use two pointers, one for each array",
      "Compare elements and add the smaller one to the result",
      "Don't forget to add remaining elements from either array",
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All integers in nums are unique."],
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7], expected: 6 },
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Your code here
  
}`,
      python: `def search(nums, target):
    # Your code here
    pass`,
    },
    solutionCode: {
      javascript: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
      python: `def search(nums, target):
    left = 0
    right = len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    },
    visualizationType: "array",
    hints: [
      "Use the divide and conquer approach",
      "Compare the middle element with target and decide which half to search",
      "Time complexity should be O(log n)",
    ],
  },
]
