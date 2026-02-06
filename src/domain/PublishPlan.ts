import { Problem } from "./Problem";

export type PushMode = "NORMAL" | "PR";

export interface PublishPlan {
  problem: Problem;
  targetFolder: string;
  solutionFileName: string;
  pushMode: PushMode;
  branchName?: string;
}
