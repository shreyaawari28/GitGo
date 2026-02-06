import * as vscode from "vscode";
import { ProblemType } from "../types/problemType";

export async function selectProblemType(): Promise<ProblemType> {

  const choice = await vscode.window.showQuickPick(
    [
      { label: "LeetCode Problem", value: ProblemType.LEETCODE },
      { label: "Normal Program", value: ProblemType.NORMAL }
    ],
    {
      placeHolder: "Select problem type",
      ignoreFocusOut: true
    }
  );

  if (!choice) {
    throw new Error("Problem type not selected");
  }

  return choice.value;
}
