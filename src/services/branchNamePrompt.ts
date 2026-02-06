import * as vscode from "vscode";

export async function askBranchName(): Promise<string> {
  const name = await vscode.window.showInputBox({
    prompt: "Enter branch name (e.g., add-231-power-of-two)",
    ignoreFocusOut: true
  });

  if (!name) {
    throw new Error("Branch name required");
  }

  return name.trim();
}
