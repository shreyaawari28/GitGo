import * as vscode from "vscode";
import { PushMode } from "../types/pushMode";

export async function selectPushMode(): Promise<PushMode> {

  const choice = await vscode.window.showQuickPick(
    [
      { label: "Normal Push", value: PushMode.NORMAL },
      { label: "Generate Pull Request", value: PushMode.PULL_REQUEST }
    ],
    {
      placeHolder: "Select push mode",
      ignoreFocusOut: true
    }
  );

  if (!choice) {
    throw new Error("Push mode not selected");
  }

  return choice.value;
}
