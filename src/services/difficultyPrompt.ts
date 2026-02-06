import * as vscode from "vscode";

export async function askDifficulty(): Promise<string> {

  const input = await vscode.window.showQuickPick(
    ["Easy", "Medium", "Hard"],
    {
      placeHolder: "Select problem difficulty",
      ignoreFocusOut: true
    }
  );

  if (!input) {
    throw new Error("Difficulty required");
  }

  return input;
}
