import * as vscode from "vscode";
import { Author } from "../domain/Author";

export async function getOrCreateAuthor(): Promise<Author> {

  const config = vscode.workspace.getConfiguration("gitgo");

  let name = config.get<string>("author.name");
  let github = config.get<string>("author.github");
  let linkedin = config.get<string>("author.linkedin");

  if (!name) {
    name = await vscode.window.showInputBox({
      prompt: "Enter your name",
      ignoreFocusOut: true
    });

    if (!name) {
      throw new Error("Name required");
    }

    await config.update(
      "author.name",
      name,
      vscode.ConfigurationTarget.Global
    );
  }

  if (!github) {
    github = await vscode.window.showInputBox({
      prompt: "Enter GitHub profile URL",
      ignoreFocusOut: true
    });

    if (!github) {
      throw new Error("GitHub link required");
    }

    await config.update(
      "author.github",
      github,
      vscode.ConfigurationTarget.Global
    );
  }

  if (!linkedin) {
    linkedin = await vscode.window.showInputBox({
      prompt: "Enter LinkedIn profile URL",
      ignoreFocusOut: true
    });

    if (!linkedin) {
      throw new Error("LinkedIn link required");
    }

    await config.update(
      "author.linkedin",
      linkedin,
      vscode.ConfigurationTarget.Global
    );
  }

  return { name, github, linkedin };
}
