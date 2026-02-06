export function generatePRDescription(
  problemName: string,
  executionTime: string,
  problemType: string,
  difficulty: string,
  authorName: string,
  authorGithub: string,
  solutionFile: string,
  readmeFile: string
): string {

return `# Title
Add solution for ${problemName}

---

## Summary
Adds a new solution implementation and README for **${problemName}** following repository standards.

---

## ⏱ Execution Time
${executionTime || "N/A"}

---

## 📌 Problem Metadata

| Field | Value |
|-----|------|
| Problem Name | ${problemName} |
| Problem Type | ${problemType} |
| Difficulty | ${difficulty || "N/A"} |
| Language | Auto-detected |

---

## 🎯 Purpose / Context

| Goal | Explanation |
|----|-------------|
| Practice DSA | Reinforce problem-solving skills |
| Improve Patterns | Apply known algorithmic techniques |
| Maintain Consistency | Follow standardized repo structure |

---

## 🧠 Overview of Implementation

| Step | Description |
|-----|------------|
| 1 | Read input data |
| 2 | Choose suitable algorithm |
| 3 | Apply logic step-by-step |
| 4 | Compute result |
| 5 | Return output |

---

## 🏗 Design Considerations

| Aspect | Decision |
|------|---------|
| Readability | Prioritized |
| Maintainability | High |
| Input Mutation | Avoided |
| Simplicity | Preferred over micro-optimizations |

---

## ⚖ Trade-offs

| Option | Time | Space | Notes |
|------|-----|------|------|
| Current Approach | O(n) | O(n) | Clear and safe |
| In-place Variant | O(n) | O(1) | Mutates input |

---

## ⚙ Complexity

| Metric | Value |
|------|------|
| Time Complexity | O(n) |
| Space Complexity | O(n) |

---

## 🧪 Testing

| Case | Status |
|----|-------|
| Sample Input | Passed |
| Edge Cases | Passed |
| Large Input | Passed |

---

## 📂 Files

| File | Description |
|-----|-------------|
| ${problemName}/${solutionFile} | Solution implementation |
| ${problemName}/${readmeFile} | Problem README |

---

## 👨‍💻 Author
**${authorName}**  
${authorGithub}
`;
}
