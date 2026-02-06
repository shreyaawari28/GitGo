export type ProblemType = "LEETCODE" | "NORMAL";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  name: string;
  type: ProblemType;
  language: string;
  difficulty?: Difficulty;
  executionTime?: string;
}
