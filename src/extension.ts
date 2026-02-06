import * as vscode from "vscode";
import { publishSolution } from "./commands/publishSolution";
import { changeRepository } from "./commands/changeRepository";

export function activate(context: vscode.ExtensionContext) {

  const publishCmd = vscode.commands.registerCommand(
    "gitgo.publishSolution",
    publishSolution
  );

  const changeRepoCmd = vscode.commands.registerCommand(
    "gitgo.changeRepository",
    changeRepository
  );

  context.subscriptions.push(publishCmd);
  context.subscriptions.push(changeRepoCmd);
}

export function deactivate() {}
