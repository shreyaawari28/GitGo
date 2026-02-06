import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

const CONFIG_KEY = "lastParentFolder";

interface FolderOption {
  label: string;
  value: string;
}

/* ============================= */
/* DIRECTORY NAVIGATOR           */
/* ============================= */

async function navigateFolders(
  basePath: string
): Promise<string | null> {

  let currentRelativePath = "";

  while (true) {

    const currentAbsolutePath = path.join(basePath, currentRelativePath);

    const entries = fs.readdirSync(currentAbsolutePath, { withFileTypes: true });

    const folders = entries
      .filter(e => e.isDirectory())
      .map(e => e.name);

    const options: FolderOption[] = [];

    if (currentRelativePath !== "") {
      options.push({ label: "⬅ Back", value: "__back__" });
    }

    options.push({ label: "✔ Use This Folder", value: "__use__" });

    for (const f of folders) {
      options.push({ label: `📁 ${f}`, value: f });
    }

    options.push({ label: "+ Create New Folder Here", value: "__create__" });

    const choice = await vscode.window.showQuickPick(options, {
      placeHolder: currentRelativePath || "Repository Root",
      ignoreFocusOut: true
    });

    if (!choice) {
      return null;
    }

    if (choice.value === "__back__") {
      currentRelativePath = path.dirname(currentRelativePath);
      continue;
    }

    if (choice.value === "__use__") {
      return currentRelativePath || null;
    }

    if (choice.value === "__create__") {

      const name = await vscode.window.showInputBox({
        prompt: "Enter new folder name",
        ignoreFocusOut: true
      });

      if (!name) {
        continue;
      }

      const newRelative = path.join(currentRelativePath, name.trim());
      const newAbsolute = path.join(basePath, newRelative);

      fs.mkdirSync(newAbsolute, { recursive: true });

      // 🔥 MARK AS FINAL PROBLEM FOLDER
      return "__SELF__/" + newRelative;
    }

    // Enter selected folder
    currentRelativePath = path.join(
      currentRelativePath,
      choice.value
    );
  }
}

/* ============================= */
/* PUBLIC API                    */
/* ============================= */

export async function selectParentFolder(
  repoPath: string
): Promise<string | null> {

  const config = vscode.workspace.getConfiguration("gitgo");

  const selected = await navigateFolders(repoPath);

  await config.update(
    CONFIG_KEY,
    selected,
    vscode.ConfigurationTarget.Global
  );

  return selected;
}
