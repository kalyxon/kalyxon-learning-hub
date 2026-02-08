export const tutorialData = [
  {
    id: 'dsa-arrays',
    title: 'Arrays in DSA',
    category: 'DSA',
    difficulty: 'Beginner',
    content: `# Arrays in Data Structures & Algorithms

## What is an Array?

An array is a collection of elements stored in contiguous memory locations. It's one of the most fundamental data structures in computer science.

### Key Characteristics:
- **Fixed Size**: Arrays have a fixed size determined at creation
- **Contiguous Memory**: Elements are stored in adjacent memory locations
- **Zero-Indexed**: First element is at index 0
- **Same Data Type**: All elements must be of the same type

## Basic Operations

### 1. Declaration and Initialization

\`\`\`cpp
// Declaration
int arr[5]; // Array of 5 integers

// Initialization
int arr[5] = {1, 2, 3, 4, 5};

// Dynamic array
int* arr = new int[n];
\`\`\`

### 2. Access Elements

\`\`\`cpp
arr[0] = 10;  // Access first element
int x = arr[2]; // Get value at index 2
\`\`\`

### 3. Traversal

\`\`\`cpp
// Using for loop
for(int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}

// Using range-based for loop (C++11)
for(int element : arr) {
    cout << element << " ";
}
\`\`\`

## Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Access | O(1) | O(1) |
| Search | O(n) | O(1) |
| Insertion | O(n) | O(1) |
| Deletion | O(n) | O(1) |

## Practice Problem

Find the maximum element in an array:

\`\`\`cpp
int findMax(int arr[], int n) {
    int max = arr[0];
    for(int i = 1; i < n; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Usage
int arr[] = {3, 7, 2, 9, 1};
cout << findMax(arr, 5); // Output: 9
\`\`\`

## Common Array Algorithms

### Linear Search
\`\`\`cpp
int linearSearch(int arr[], int n, int target) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) return i;
    }
    return -1;
}
\`\`\`

### Reverse Array
\`\`\`cpp
void reverseArray(int arr[], int n) {
    int left = 0, right = n - 1;
    while(left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}
\`\`\`

## Key Takeaways

1. Arrays provide O(1) access to elements by index
2. Arrays are cache-friendly due to contiguous memory
3. Insertion and deletion require shifting elements
4. Arrays have fixed size in most languages
5. Perfect for storing homogeneous data

## Next Steps

Learn about **Linked Lists** to understand dynamic data structures!`
  }
];
