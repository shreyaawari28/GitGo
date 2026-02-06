export function getSolutionFileName(language: string): string {

  switch (language.toLowerCase()) {
    case "java":
      return "Solution.java";
    case "python":
      return "Solution.py";
    case "c++":
      return "Solution.cpp";
    case "javascript":
      return "Solution.js";
    case "typescript":
      return "Solution.ts";
    default:
      return "Solution.txt";
  }
}
