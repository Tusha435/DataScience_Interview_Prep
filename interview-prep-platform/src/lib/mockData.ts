import { Company, Category, Question, Solution, Activity, Difficulty } from "@/types"

export const companies: Company[] = [
  { id: "1", name: "Google", logo: "G", description: "Leading search and cloud company", questionCount: 245 },
  { id: "2", name: "Amazon", logo: "A", description: "E-commerce and cloud computing giant", questionCount: 312 },
  { id: "3", name: "Microsoft", logo: "M", description: "Software and cloud services leader", questionCount: 198 },
  { id: "4", name: "Meta", logo: "F", description: "Social media and metaverse company", questionCount: 167 },
  { id: "5", name: "Apple", logo: "A", description: "Consumer electronics and software", questionCount: 134 },
  { id: "6", name: "Netflix", logo: "N", description: "Streaming entertainment service", questionCount: 89 },
  { id: "7", name: "Tesla", logo: "T", description: "Electric vehicles and clean energy", questionCount: 76 },
  { id: "8", name: "Uber", logo: "U", description: "Ride-sharing and delivery platform", questionCount: 112 },
  { id: "9", name: "Airbnb", logo: "A", description: "Online marketplace for lodging", questionCount: 87 },
  { id: "10", name: "LinkedIn", logo: "L", description: "Professional networking platform", questionCount: 95 },
  { id: "11", name: "Salesforce", logo: "S", description: "CRM and cloud platform", questionCount: 78 },
  { id: "12", name: "Adobe", logo: "A", description: "Creative software company", questionCount: 65 },
  { id: "13", name: "Oracle", logo: "O", description: "Database and enterprise software", questionCount: 82 },
  { id: "14", name: "IBM", logo: "I", description: "Enterprise technology company", questionCount: 71 },
  { id: "15", name: "Intel", logo: "I", description: "Semiconductor manufacturer", questionCount: 54 },
]

export const categories: Category[] = [
  { id: "1", name: "Arrays", icon: "array", description: "Array manipulation and algorithms", questionCount: 156 },
  { id: "2", name: "Strings", icon: "text", description: "String processing and manipulation", questionCount: 134 },
  { id: "3", name: "Trees", icon: "git-branch", description: "Binary trees, BST, and tree algorithms", questionCount: 112 },
  { id: "4", name: "Graphs", icon: "share-2", description: "Graph traversal and algorithms", questionCount: 89 },
  { id: "5", name: "Dynamic Programming", icon: "layers", description: "DP and memoization problems", questionCount: 145 },
  { id: "6", name: "System Design", icon: "server", description: "Large-scale system architecture", questionCount: 78 },
  { id: "7", name: "Object-Oriented Design", icon: "box", description: "OOP principles and patterns", questionCount: 56 },
  { id: "8", name: "Databases", icon: "database", description: "SQL and database design", questionCount: 67 },
  { id: "9", name: "Operating Systems", icon: "cpu", description: "OS concepts and problems", questionCount: 45 },
  { id: "10", name: "Networking", icon: "wifi", description: "Network protocols and systems", questionCount: 38 },
  { id: "11", name: "Behavioral", icon: "users", description: "Behavioral interview questions", questionCount: 92 },
  { id: "12", name: "Linked Lists", icon: "link", description: "Linked list operations", questionCount: 78 },
]

const authors = [
  { id: "a1", name: "Alex Chen", avatar: "" },
  { id: "a2", name: "Sarah Johnson", avatar: "" },
  { id: "a3", name: "Mike Williams", avatar: "" },
  { id: "a4", name: "Emily Davis", avatar: "" },
  { id: "a5", name: "James Wilson", avatar: "" },
  { id: "a6", name: "Lisa Anderson", avatar: "" },
  { id: "a7", name: "David Brown", avatar: "" },
  { id: "a8", name: "Jennifer Lee", avatar: "" },
]

export const questions: Question[] = [
  {
    id: "q1",
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    company: companies[0],
    difficulty: "Easy",
    categories: [categories[0]],
    tags: ["hash-table", "array"],
    viewCount: 15234,
    solutionCount: 12,
    bookmarkCount: 2341,
    createdAt: "2024-01-15T10:30:00Z",
    author: authors[0],
  },
  {
    id: "q2",
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters. A substring is a contiguous non-empty sequence of characters within a string.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[1], categories[0]],
    tags: ["sliding-window", "hash-table", "string"],
    viewCount: 12456,
    solutionCount: 8,
    bookmarkCount: 1892,
    createdAt: "2024-01-14T14:20:00Z",
    author: authors[1],
  },
  {
    id: "q3",
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    company: companies[0],
    difficulty: "Hard",
    categories: [categories[0]],
    tags: ["binary-search", "divide-conquer"],
    viewCount: 8923,
    solutionCount: 5,
    bookmarkCount: 1234,
    createdAt: "2024-01-13T09:15:00Z",
    author: authors[2],
  },
  {
    id: "q4",
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    company: companies[3],
    difficulty: "Easy",
    categories: [categories[1]],
    tags: ["stack", "string"],
    viewCount: 18976,
    solutionCount: 15,
    bookmarkCount: 3421,
    createdAt: "2024-01-12T16:45:00Z",
    author: authors[3],
  },
  {
    id: "q5",
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
    company: companies[2],
    difficulty: "Easy",
    categories: [categories[11]],
    tags: ["linked-list", "recursion"],
    viewCount: 14567,
    solutionCount: 11,
    bookmarkCount: 2156,
    createdAt: "2024-01-11T11:30:00Z",
    author: authors[4],
  },
  {
    id: "q6",
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[0], categories[4]],
    tags: ["array", "divide-conquer", "dynamic-programming"],
    viewCount: 21345,
    solutionCount: 14,
    bookmarkCount: 4567,
    createdAt: "2024-01-10T08:00:00Z",
    author: authors[5],
  },
  {
    id: "q7",
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    company: companies[4],
    difficulty: "Easy",
    categories: [categories[4]],
    tags: ["dynamic-programming", "memoization"],
    viewCount: 16789,
    solutionCount: 10,
    bookmarkCount: 2890,
    createdAt: "2024-01-09T13:20:00Z",
    author: authors[6],
  },
  {
    id: "q8",
    title: "Binary Tree Level Order Traversal",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    company: companies[3],
    difficulty: "Medium",
    categories: [categories[2]],
    tags: ["tree", "bfs", "binary-tree"],
    viewCount: 11234,
    solutionCount: 7,
    bookmarkCount: 1567,
    createdAt: "2024-01-08T15:45:00Z",
    author: authors[7],
  },
  {
    id: "q9",
    title: "Design Twitter",
    description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.",
    company: companies[3],
    difficulty: "Medium",
    categories: [categories[5], categories[6]],
    tags: ["system-design", "oop", "heap"],
    viewCount: 9876,
    solutionCount: 6,
    bookmarkCount: 1890,
    createdAt: "2024-01-07T10:00:00Z",
    author: authors[0],
  },
  {
    id: "q10",
    title: "Course Schedule",
    description: "There are a total of numCourses courses you have to take. Some courses may have prerequisites. Return true if you can finish all courses, otherwise return false.",
    company: companies[0],
    difficulty: "Medium",
    categories: [categories[3]],
    tags: ["graph", "dfs", "bfs", "topological-sort"],
    viewCount: 8765,
    solutionCount: 5,
    bookmarkCount: 1234,
    createdAt: "2024-01-06T14:30:00Z",
    author: authors[1],
  },
  {
    id: "q11",
    title: "LRU Cache",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put operations in O(1) time complexity.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[6]],
    tags: ["design", "hash-table", "linked-list"],
    viewCount: 13456,
    solutionCount: 9,
    bookmarkCount: 2345,
    createdAt: "2024-01-05T09:15:00Z",
    author: authors[2],
  },
  {
    id: "q12",
    title: "Serialize and Deserialize Binary Tree",
    description: "Design an algorithm to serialize and deserialize a binary tree. Implement both serialize and deserialize methods.",
    company: companies[2],
    difficulty: "Hard",
    categories: [categories[2]],
    tags: ["tree", "design", "dfs", "bfs"],
    viewCount: 7654,
    solutionCount: 4,
    bookmarkCount: 987,
    createdAt: "2024-01-04T16:00:00Z",
    author: authors[3],
  },
  {
    id: "q13",
    title: "Word Break",
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    company: companies[0],
    difficulty: "Medium",
    categories: [categories[4], categories[1]],
    tags: ["dynamic-programming", "trie", "memoization"],
    viewCount: 10234,
    solutionCount: 6,
    bookmarkCount: 1567,
    createdAt: "2024-01-03T11:45:00Z",
    author: authors[4],
  },
  {
    id: "q14",
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[3], categories[0]],
    tags: ["dfs", "bfs", "union-find", "matrix"],
    viewCount: 15678,
    solutionCount: 11,
    bookmarkCount: 2890,
    createdAt: "2024-01-02T13:30:00Z",
    author: authors[5],
  },
  {
    id: "q15",
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    company: companies[4],
    difficulty: "Easy",
    categories: [categories[11]],
    tags: ["linked-list", "recursion"],
    viewCount: 19876,
    solutionCount: 13,
    bookmarkCount: 3456,
    createdAt: "2024-01-01T08:00:00Z",
    author: authors[6],
  },
  {
    id: "q16",
    title: "Design a URL Shortener",
    description: "Design a URL shortening service like TinyURL. The service should provide short aliases redirecting to long URLs. Consider scalability, analytics, and expiration.",
    company: companies[7],
    difficulty: "Medium",
    categories: [categories[5]],
    tags: ["system-design", "hash", "database"],
    viewCount: 12345,
    solutionCount: 8,
    bookmarkCount: 2100,
    createdAt: "2023-12-31T15:00:00Z",
    author: authors[7],
  },
  {
    id: "q17",
    title: "Implement Trie (Prefix Tree)",
    description: "A trie or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class.",
    company: companies[0],
    difficulty: "Medium",
    categories: [categories[2]],
    tags: ["trie", "design", "hash-table"],
    viewCount: 8765,
    solutionCount: 5,
    bookmarkCount: 1234,
    createdAt: "2023-12-30T10:30:00Z",
    author: authors[0],
  },
  {
    id: "q18",
    title: "Minimum Window Substring",
    description: "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window. If there is no such substring, return empty string.",
    company: companies[3],
    difficulty: "Hard",
    categories: [categories[1]],
    tags: ["sliding-window", "hash-table", "string"],
    viewCount: 9876,
    solutionCount: 6,
    bookmarkCount: 1567,
    createdAt: "2023-12-29T14:15:00Z",
    author: authors[1],
  },
  {
    id: "q19",
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve in O(n) without division.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[0]],
    tags: ["array", "prefix-sum"],
    viewCount: 14567,
    solutionCount: 10,
    bookmarkCount: 2345,
    createdAt: "2023-12-28T09:00:00Z",
    author: authors[2],
  },
  {
    id: "q20",
    title: "Validate Binary Search Tree",
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    company: companies[2],
    difficulty: "Medium",
    categories: [categories[2]],
    tags: ["tree", "dfs", "bst"],
    viewCount: 11234,
    solutionCount: 7,
    bookmarkCount: 1890,
    createdAt: "2023-12-27T16:45:00Z",
    author: authors[3],
  },
  {
    id: "q21",
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.",
    company: companies[0],
    difficulty: "Medium",
    categories: [categories[0]],
    tags: ["array", "sorting"],
    viewCount: 13456,
    solutionCount: 9,
    bookmarkCount: 2100,
    createdAt: "2023-12-26T11:30:00Z",
    author: authors[4],
  },
  {
    id: "q22",
    title: "Coin Change",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins needed to make up that amount.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[4]],
    tags: ["dynamic-programming", "bfs"],
    viewCount: 16789,
    solutionCount: 12,
    bookmarkCount: 3210,
    createdAt: "2023-12-25T08:15:00Z",
    author: authors[5],
  },
  {
    id: "q23",
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    company: companies[0],
    difficulty: "Hard",
    categories: [categories[0], categories[4]],
    tags: ["array", "two-pointers", "dynamic-programming", "stack"],
    viewCount: 10234,
    solutionCount: 6,
    bookmarkCount: 1789,
    createdAt: "2023-12-24T13:00:00Z",
    author: authors[6],
  },
  {
    id: "q24",
    title: "Design Rate Limiter",
    description: "Design a rate limiter that limits the number of requests a client can make to an API within a time window. Consider different algorithms like token bucket and sliding window.",
    company: companies[7],
    difficulty: "Medium",
    categories: [categories[5]],
    tags: ["system-design", "algorithm"],
    viewCount: 8765,
    solutionCount: 5,
    bookmarkCount: 1456,
    createdAt: "2023-12-23T15:45:00Z",
    author: authors[7],
  },
  {
    id: "q25",
    title: "Lowest Common Ancestor of a Binary Tree",
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    company: companies[3],
    difficulty: "Medium",
    categories: [categories[2]],
    tags: ["tree", "dfs", "binary-tree"],
    viewCount: 12345,
    solutionCount: 8,
    bookmarkCount: 2100,
    createdAt: "2023-12-22T10:00:00Z",
    author: authors[0],
  },
  {
    id: "q26",
    title: "Group Anagrams",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    company: companies[1],
    difficulty: "Medium",
    categories: [categories[1], categories[0]],
    tags: ["hash-table", "string", "sorting"],
    viewCount: 15678,
    solutionCount: 10,
    bookmarkCount: 2567,
    createdAt: "2023-12-21T14:30:00Z",
    author: authors[1],
  },
  {
    id: "q27",
    title: "Word Ladder",
    description: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord.",
    company: companies[0],
    difficulty: "Hard",
    categories: [categories[3]],
    tags: ["bfs", "hash-table", "string"],
    viewCount: 7654,
    solutionCount: 4,
    bookmarkCount: 987,
    createdAt: "2023-12-20T09:15:00Z",
    author: authors[2],
  },
  {
    id: "q28",
    title: "Container With Most Water",
    description: "Given n non-negative integers representing the height of vertical lines, find two lines that together with the x-axis forms a container that contains the most water.",
    company: companies[2],
    difficulty: "Medium",
    categories: [categories[0]],
    tags: ["array", "two-pointers", "greedy"],
    viewCount: 14567,
    solutionCount: 9,
    bookmarkCount: 2345,
    createdAt: "2023-12-19T16:00:00Z",
    author: authors[3],
  },
  {
    id: "q29",
    title: "3Sum",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    company: companies[3],
    difficulty: "Medium",
    categories: [categories[0]],
    tags: ["array", "two-pointers", "sorting"],
    viewCount: 18976,
    solutionCount: 13,
    bookmarkCount: 3890,
    createdAt: "2023-12-18T11:45:00Z",
    author: authors[4],
  },
  {
    id: "q30",
    title: "Design Consistent Hashing",
    description: "Design a consistent hashing algorithm for distributing data across a cluster of servers. Handle server additions and removals efficiently.",
    company: companies[0],
    difficulty: "Hard",
    categories: [categories[5]],
    tags: ["system-design", "distributed-systems", "hash"],
    viewCount: 6543,
    solutionCount: 3,
    bookmarkCount: 876,
    createdAt: "2023-12-17T08:30:00Z",
    author: authors[5],
  },
]

export const solutions: Solution[] = [
  {
    id: "s1",
    questionId: "q1",
    title: "Hash Map Solution - O(n)",
    explanation: "We can solve this problem in one pass using a hash map. As we iterate through the array, for each element we check if the complement (target - current) exists in our hash map. If it does, we found our answer. Otherwise, we add the current element and its index to the hash map.",
    code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
    language: "typescript",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    upvotes: 234,
    downvotes: 12,
    createdAt: "2024-01-15T12:00:00Z",
    author: authors[1],
  },
  {
    id: "s2",
    questionId: "q1",
    title: "Brute Force Solution - O(n^2)",
    explanation: "The simplest approach is to check every pair of numbers. While not optimal, this solution is easy to understand and implement. We use two nested loops to check all possible pairs.",
    code: `function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
    language: "typescript",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    upvotes: 89,
    downvotes: 34,
    createdAt: "2024-01-15T14:30:00Z",
    author: authors[2],
  },
  {
    id: "s3",
    questionId: "q2",
    title: "Sliding Window with Set",
    explanation: "We use a sliding window approach with a Set to track characters in the current window. When we encounter a duplicate, we shrink the window from the left until the duplicate is removed.",
    code: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
    language: "typescript",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    upvotes: 187,
    downvotes: 8,
    createdAt: "2024-01-14T16:00:00Z",
    author: authors[0],
  },
  {
    id: "s4",
    questionId: "q4",
    title: "Stack-based Solution",
    explanation: "We use a stack to match opening and closing brackets. For each opening bracket, we push it onto the stack. For each closing bracket, we check if it matches the top of the stack.",
    code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (char in pairs) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
    language: "typescript",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    upvotes: 312,
    downvotes: 5,
    createdAt: "2024-01-12T18:00:00Z",
    author: authors[3],
  },
  {
    id: "s5",
    questionId: "q6",
    title: "Kadane's Algorithm",
    explanation: "Kadane's algorithm maintains the maximum sum ending at each position. At each step, we decide whether to extend the previous subarray or start a new one.",
    code: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
    language: "typescript",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    upvotes: 456,
    downvotes: 12,
    createdAt: "2024-01-10T10:00:00Z",
    author: authors[5],
  },
  {
    id: "s6",
    questionId: "q7",
    title: "Dynamic Programming Solution",
    explanation: "The number of ways to reach step n is the sum of ways to reach step n-1 and n-2. This is essentially the Fibonacci sequence.",
    code: `function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}`,
    language: "typescript",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    upvotes: 278,
    downvotes: 7,
    createdAt: "2024-01-09T15:00:00Z",
    author: authors[6],
  },
  {
    id: "s7",
    questionId: "q15",
    title: "Iterative Solution",
    explanation: "We iterate through the list, reversing the direction of each node's next pointer. We keep track of the previous, current, and next nodes.",
    code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}`,
    language: "typescript",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    upvotes: 345,
    downvotes: 9,
    createdAt: "2024-01-01T10:00:00Z",
    author: authors[6],
  },
  {
    id: "s8",
    questionId: "q14",
    title: "DFS Solution",
    explanation: "We use depth-first search to explore each island. When we find a '1', we mark the entire island as visited by changing all connected '1's to '0's, then increment our count.",
    code: `function numIslands(grid: string[][]): number {
  if (!grid.length) return 0;

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
      return;
    }
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,
    language: "typescript",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    upvotes: 234,
    downvotes: 11,
    createdAt: "2024-01-02T15:00:00Z",
    author: authors[5],
  },
]

export const recentActivity: Activity[] = [
  {
    id: "act1",
    type: "question",
    title: "Asked a new question",
    description: "Two Sum - Find indices of two numbers that add up to target",
    createdAt: "2024-01-15T10:30:00Z",
    link: "/questions/q1",
  },
  {
    id: "act2",
    type: "solution",
    title: "Submitted a solution",
    description: "Hash Map solution for Two Sum problem",
    createdAt: "2024-01-15T12:00:00Z",
    link: "/questions/q1",
  },
  {
    id: "act3",
    type: "bookmark",
    title: "Bookmarked a question",
    description: "Longest Substring Without Repeating Characters",
    createdAt: "2024-01-14T16:30:00Z",
    link: "/questions/q2",
  },
  {
    id: "act4",
    type: "upvote",
    title: "Upvoted a solution",
    description: "Kadane's Algorithm for Maximum Subarray",
    createdAt: "2024-01-10T11:00:00Z",
    link: "/questions/q6",
  },
]

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id)
}

export function getSolutionsByQuestionId(questionId: string): Solution[] {
  return solutions.filter((s) => s.questionId === questionId)
}

export function getRelatedQuestions(questionId: string, limit: number = 4): Question[] {
  const question = getQuestionById(questionId)
  if (!question) return []

  return questions
    .filter((q) => q.id !== questionId)
    .filter((q) =>
      q.categories.some((c) =>
        question.categories.some((qc) => qc.id === c.id)
      ) || q.company.id === question.company.id
    )
    .slice(0, limit)
}

// Get all question IDs for static generation
export function getAllQuestionIds(): string[] {
  return questions.map((q) => q.id)
}

export function filterQuestions(
  filters: {
    search?: string
    companies?: string[]
    difficulties?: Difficulty[]
    categories?: string[]
    sortBy?: string
  },
  page: number = 1,
  perPage: number = 20
): { questions: Question[]; total: number } {
  let filtered = [...questions]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (q) =>
        q.title.toLowerCase().includes(searchLower) ||
        q.description.toLowerCase().includes(searchLower)
    )
  }

  if (filters.companies?.length) {
    filtered = filtered.filter((q) =>
      filters.companies!.includes(q.company.id)
    )
  }

  if (filters.difficulties?.length) {
    filtered = filtered.filter((q) =>
      filters.difficulties!.includes(q.difficulty)
    )
  }

  if (filters.categories?.length) {
    filtered = filtered.filter((q) =>
      q.categories.some((c) => filters.categories!.includes(c.id))
    )
  }

  switch (filters.sortBy) {
    case "views":
      filtered.sort((a, b) => b.viewCount - a.viewCount)
      break
    case "bookmarks":
      filtered.sort((a, b) => b.bookmarkCount - a.bookmarkCount)
      break
    case "difficulty_asc":
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 }
      filtered.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty])
      break
    case "difficulty_desc":
      const diffOrderDesc = { Easy: 3, Medium: 2, Hard: 1 }
      filtered.sort((a, b) => diffOrderDesc[a.difficulty] - diffOrderDesc[b.difficulty])
      break
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }

  const total = filtered.length
  const start = (page - 1) * perPage
  const paginatedQuestions = filtered.slice(start, start + perPage)

  return { questions: paginatedQuestions, total }
}
