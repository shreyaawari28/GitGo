export interface LeetCodeTemplateInput {
  problemName: string;
  language: string;
  difficulty: string;
  executionTime: string;
  solutionFile: string;
  authorName: string;
  github: string;
  linkedin: string;
}

export function getLeetCodeReadme(
  data: LeetCodeTemplateInput
): string {

return `# ${data.problemName} – ${data.language} Solution

This repository contains a ${data.language} solution for the **LeetCode problem: ${data.problemName}**.

---

## 📌 Problem Overview

Given an input, the task is to compute the required result according to the problem constraints.

The problem focuses on applying basic algorithmic reasoning and efficient traversal to derive the solution.

---

## 🎯 Difficulty

${data.difficulty}

---

## 🧪 Code Functionality

- Reads the input values  
- Iterates through the data structure  
- Applies the required logic step by step  
- Computes and returns the final result  

---

## 🧠 Concepts Covered

- Loops  
- Conditional statements  
- Basic algorithmic logic  
- Problem-solving patterns  

---

## ⏱️ Execution Time

${data.executionTime}

---

## 🖥️ Screenshots

📸 **Test Case Result**

![Test Case Screenshot](testcases.png)

📸 **Submission Result**

![Submission Screenshot](submission.png)

---

## 📂 File Information

- \`${data.solutionFile}\`
- testcases.png
- submission.png
- README.md

---

## 👨‍💻 Author

${data.authorName}  
GitHub: ${data.github}  
LinkedIn: ${data.linkedin}
`;
}
