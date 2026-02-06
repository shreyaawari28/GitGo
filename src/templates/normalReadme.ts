export interface NormalProblemData {
  problemName: string;
  shortDescription: string;
  fileName: string;
  authorName: string;
  github: string;
  linkedin: string;
}

export function getNormalReadme(
  data: NormalProblemData
): string {

return `# ${data.problemName}

${data.shortDescription}

---

## 📌 Program Overview

This program demonstrates a basic implementation of the given problem using standard programming constructs.

It focuses on applying logical conditions and structured control flow to achieve the required functionality.

---

## 🧪 Code Functionality

- Accepts required input values  
- Processes the input using defined logic  
- Performs necessary validations or computations  
- Displays the final output  

---

## 🧠 Concepts Covered

- Input / Output handling  
- Conditional logic  
- Iteration / looping  
- Functions or procedures  
- Basic algorithmic reasoning  

---

## 🖥️ Output

![Program Output](Output.png)

---

## 📂 File Information

- \`${data.fileName}\`
- Output.png
- README.md

---

## 👨‍💻 Author

${data.authorName}  
GitHub: ${data.github}  
LinkedIn: ${data.linkedin}
`;
}
