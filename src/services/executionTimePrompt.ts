import * as vscode from "vscode";

export async function askExecutionTime(): Promise<string> {

  const input = await vscode.window.showInputBox({
    prompt: "Enter execution time (e.g., 52 minutes 51 seconds)",
    ignoreFocusOut: true
  });

  if (!input) {
    throw new Error("Execution time required");
  }

  return input.trim();
}
