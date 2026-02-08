# 📝 Tutorial Format Guide for Kalyxon

This guide explains how to write tutorials in Markdown format and add them to Kalyxon.

## Tutorial Structure

### Required Fields

Every tutorial in `src/data/tutorials.js` must have:

```javascript
{
  id: 'unique-identifier',           // Must be unique
  title: 'Tutorial Title',            // Displayed in sidebar
  category: 'CategoryName',           // DSA, C++, JavaScript, OOP, etc.
  difficulty: 'Beginner',             // Beginner, Intermediate, Advanced
  content: `# Markdown content here`  // Full tutorial in Markdown
}
```

## Markdown Guidelines

### Headings

```markdown
# Main Title (H1)         -> Page title
## Section Heading (H2)   -> Major sections
### Subsection (H3)       -> Sub-sections
#### Details (H4)         -> Minor headings
```

**Best Practice**: Use one H1 (tutorial title) at the start

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for definitions
~~Strikethrough~~ for deprecated info
```

### Code Blocks

```markdown
# For inline code
Use `variable_name` in text

# For code blocks with syntax highlighting
\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello";
    return 0;
}
\`\`\`

\`\`\`javascript
function greet(name) {
    return `Hello, ${name}!`;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`
```

**Supported Languages**: cpp, c, java, python, javascript, javascript, js, html, css, sql, json, bash, and more

### Lists

```markdown
# Unordered list
- Point 1
- Point 2
  - Nested point
- Point 3

# Ordered list
1. First step
2. Second step
   1. Sub-step
3. Third step
```

### Links

```markdown
[Display text](https://example.com)
[Internal link](#section-heading)
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Blockquotes

```markdown
> This is a blockquote
> Perfect for notes and important information
```

### Images

```markdown
![Alt text](image-url)
```

**Note**: Use full URLs for images

## Complete Example

Here's a complete tutorial example:

```javascript
{
  id: 'sorting-algorithms',
  title: 'Sorting Algorithms Explained',
  category: 'DSA',
  difficulty: 'Intermediate',
  content: `# Sorting Algorithms Explained

## Introduction

Sorting is one of the most fundamental operations in computer science.

## Bubble Sort

### How It Works

Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.

### Time & Space Complexity

| Metric | Value |
|--------|-------|
| Best Case | O(n) |
| Average | O(n²) |
| Worst Case | O(n²) |
| Space | O(1) |

### Implementation

\`\`\`cpp
void bubbleSort(int arr[], int n) {
    for(int i = 0; i < n - 1; i++) {
        for(int j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
\`\`\`

### Code Explanation

- **Outer loop**: Iterates through each element
- **Inner loop**: Compares adjacent pairs
- **Swap**: If left > right, swap positions

## Quick Sort

### Algorithm Steps

1. Choose a pivot element
2. Partition array around pivot
3. Recursively sort left and right

### Implementation

\`\`\`cpp
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for(int j = low; j < high; j++) {
        if(arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if(low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
\`\`\`

## Comparison

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

## Key Takeaways

1. Choose sorting algorithm based on use case
2. Consider time and space complexity
3. Quick Sort is fastest for average cases
4. Merge Sort guarantees O(n log n) worst case
5. Bubble Sort is simple but inefficient

## Next Steps

Learn about **Searching Algorithms** and **Graph Algorithms**!
`
}
```

## Adding to Kalyxon

### Step 1: Write Tutorial

Write your tutorial in Markdown format:

```markdown
# Tutorial Title

## Section 1

Content here...

## Section 2

More content...

\`\`\`cpp
code examples
\`\`\`
```

### Step 2: Copy to tutorials.js

1. Open `src/data/tutorials.js`
2. Find the `tutorialData` array
3. Add new tutorial object at the end:

```javascript
export const tutorialData = [
  // ... existing tutorials ...
  
  {
    id: 'your-tutorial-id',
    title: 'Your Tutorial Title',
    category: 'Category',
    difficulty: 'Level',
    content: `Your markdown content here`
  }
];
```

### Step 3: Test Locally

```bash
npm run dev
```

- Sign in with any username
- Verify tutorial appears in sidebar
- Check formatting and code blocks
- Test on mobile view

### Step 4: Deploy

```bash
git add .
git commit -m "Add tutorial: Your Tutorial Title"
git push
npm run deploy
```

## Categories

Use one of these categories:

| Category | Description |
|----------|-------------|
| DSA | Data Structures & Algorithms |
| C++ | C++ Programming Language |
| JavaScript | JavaScript & Web |
| OOP | Object-Oriented Programming |
| Python | Python Programming |
| Java | Java Programming |
| Web | Web Development |
| System | System Design |

## Difficulty Levels

- **Beginner**: Basic concepts, fundamentals, no prior knowledge assumed
- **Intermediate**: Building on basics, requires understanding of fundamentals
- **Advanced**: Complex topics, requires significant background knowledge

## Best Practices

### ✅ Do

- Use clear, simple language
- Break content into small sections
- Include practical code examples
- Add time and space complexity analysis
- Include visual aids (diagrams, tables)
- Link to related tutorials
- Add practice problems
- Keep sentences short and clear

### ❌ Don't

- Make sections too long
- Assume too much background knowledge
- Skip explanations for code
- Use too many technical jargons
- Copy content without attribution
- Make huge code blocks (break them up)
- Skip headings and structure

## Code Examples

### Good Example

```markdown
### Sum of Array

To find the sum of all elements:

\`\`\`cpp
int sumArray(int arr[], int n) {
    int sum = 0;
    for(int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return sum;
}
\`\`\`

**Explanation**:
- Initialize \`sum\` to 0
- Loop through each element
- Add each element to sum
- Return the final sum

**Complexity**: O(n) time, O(1) space
\`\`\`

### Avoid

```markdown
\`\`\`cpp
int sumArray(int arr[], int n){int sum=0;for(int i=0;i<n;i++)sum+=arr[i];return sum;}
\`\`\`
```

## Spacing & Formatting

Good spacing makes tutorials more readable:

```markdown
# Main Topic

## Section 1
Content...

## Section 2
Content...

## Code Example
\`\`\`cpp
// code
\`\`\`

## Complexity Analysis
| Time | Space |
|------|-------|
| O(n) | O(1) |
```

## Emojis (Optional)

You can use emojis in titles and sections:

- 📚 Learning
- 💡 Tip
- ⚠️ Warning
- 🎯 Goal
- ✅ Correct
- ❌ Wrong
- 🔥 Important
- ⚡ Performance

Example:

```markdown
## 💡 Pro Tip

This is a helpful tip...

## ⚠️ Common Mistake

Avoid this...

## 🔥 Important

Remember this...
```

## Testing Your Content

Before deploying:

1. **Check markdown**: Renders correctly
2. **Verify code blocks**: All languages highlight properly
3. **Test links**: All links work
4. **Mobile view**: Looks good on phone
5. **Cross-browser**: Works in Chrome, Firefox, Safari

## Tutorial Length

- **Short**: 500-1000 words (basic concepts)
- **Medium**: 1000-2000 words (detailed topics)
- **Long**: 2000+ words (comprehensive guides)

Balance depth with readability. Break long tutorials into multiple parts if needed.

## Updates & Revisions

To update a tutorial:

```javascript
// Find the tutorial by id
{
  id: 'your-tutorial-id',
  // ... Update content field ...
}
```

Then redeploy:

```bash
git add .
git commit -m "Update tutorial: Description of changes"
git push
npm run deploy
```

## Examples in Repository

Check the tutorials in `src/data/tutorials.js` for more examples:

- `dsa-arrays` - Arrays tutorial
- `cpp-basics` - C++ fundamentals
- `js-intro` - JavaScript basics
- `oop-cpp` - OOP concepts
- `linked-list` - Linked lists
- `recursion` - Recursion explained
- `binary-search` - Binary search algorithm

## Need Help?

- Review existing tutorials
- Check Markdown syntax: [markdown-guide.org](https://www.markdown-guide.org/)
- Read the main README.md
- Create an issue on GitHub

---

**Happy Writing!** 📝

Your tutorials will help others learn. Make them great! 🚀
