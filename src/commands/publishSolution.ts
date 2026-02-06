import * as vscode from "vscode";

import { detectLanguage } from "../services/languageDetector";
import { createProblemFolder } from "../services/folderCreator";
import { copySolutionFile } from "../services/fileCopier";
import { generateReadme } from "../services/readmeGenerator";
import { pickAndCopyScreenshots } from "../services/screenshotHandler";
import { runGitCommands, runGitCommandsWithPR } from "../services/gitService";
import { setupRepository } from "../services/repoSetupService";
import { selectParentFolder } from "../services/parentFolderSelector";
import { selectPushMode } from "../services/pushModeSelector";

import { askBranchName } from "../services/branchNamePrompt";
import { selectProblemType } from "../services/problemTypeSelector";
import { askExecutionTime } from "../services/executionTimePrompt";
import { askDifficulty } from "../services/difficultyPrompt";
import { getSolutionFileName } from "../services/solutionFileNameResolver";
import { getOrCreateAuthor } from "../services/authorService";

import { PushMode } from "../types/pushMode";
import { ProblemType } from "../types/problemType";

export async function publishSolution() {

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active file open");
    return;
  }

  /* ============================= */
  /* AUTHOR                        */
  /* ============================= */

  const author = await getOrCreateAuthor();

  const filePath = editor.document.fileName;
  const code = editor.document.getText();

  /* ============================= */
  /* LANGUAGE                      */
  /* ============================= */

  const languageResult = detectLanguage(filePath);

  if (!languageResult.ok) {
    vscode.window.showErrorMessage(languageResult.message);
    return;
  }

  const language = languageResult.data;

  /* ============================= */
  /* STANDARD FILE NAME            */
  /* ============================= */

  const solutionFileName = getSolutionFileName(language);

  /* ============================= */
  /* PROBLEM TYPE                  */
  /* ============================= */

  const problemType = await selectProblemType();

  /* ============================= */
  /* DIFFICULTY + EXEC TIME        */
  /* ============================= */

  let difficulty = "";
  let executionTime = "";

  if (problemType === ProblemType.LEETCODE) {

    try {
      difficulty = await askDifficulty();
    } catch (err: any) {
      vscode.window.showErrorMessage(err.message || "Difficulty required");
      return;
    }

    try {
      executionTime = await askExecutionTime();
    } catch (err: any) {
      vscode.window.showErrorMessage(err.message || "Execution time required");
      return;
    }
  }

  /* ============================= */
  /* REPOSITORY SETUP              */
  /* ============================= */

  const config = vscode.workspace.getConfiguration("gitgo");
  let basePath = config.get<string>("repoPath");

  if (basePath && basePath.trim() === "") {
    basePath = undefined;
  }

  if (!basePath) {
    try {
      basePath = await setupRepository();

      await config.update(
        "repoPath",
        basePath,
        vscode.ConfigurationTarget.Global
      );
    } catch (err: any) {
      vscode.window.showErrorMessage(err.message || "Repository setup failed");
      return;
    }
  }

  /* ============================= */
  /* PARENT FOLDER                 */
  /* ============================= */

  let parentFolder: string | null;
  let problemFolderFromParent: string | null = null;

  try {
    parentFolder = await selectParentFolder(basePath);
  } catch (err: any) {
    vscode.window.showErrorMessage(err.message || "Parent folder selection failed");
    return;
  }

  if (parentFolder && parentFolder.startsWith("__SELF__/")) {
    problemFolderFromParent =
      parentFolder.replace("__SELF__/", "");
    parentFolder = null;
  }

  /* ============================= */
  /* PROBLEM FOLDER NAME           */
  /* ============================= */

  let folderName = "";

  if (problemFolderFromParent) {

    folderName = problemFolderFromParent;

  } else {

    while (!folderName) {

      const folderNameInput = await vscode.window.showInputBox({
        prompt: "Enter problem folder name (e.g., 231-Power-of-Two)",
        ignoreFocusOut: true
      });

      if (!folderNameInput) {
        continue;
      }

      folderName = folderNameInput.trim();
    }

  }

  /* ============================= */
  /* CREATE FOLDER                 */
  /* ============================= */

  const folderResult = createProblemFolder(
    basePath,
    folderName,
    parentFolder
  );

  if (!folderResult.ok) {
    vscode.window.showErrorMessage(folderResult.message);
    return;
  }

  const folderPath = folderResult.data;

  /* ============================= */
  /* COPY SOLUTION                 */
  /* ============================= */

  const copyResult = copySolutionFile(
    filePath,
    folderPath,
    solutionFileName
  );

  if (!copyResult.ok) {
    vscode.window.showErrorMessage(copyResult.message);
    return;
  }

  /* ============================= */
  /* GENERATE README               */
  /* ============================= */

  const readmeResult = generateReadme(
    folderPath,
    problemType,
    folderName,
    language,
    code,
    executionTime,
    difficulty,
    solutionFileName,
    author
  );

  if (!readmeResult.ok) {
    vscode.window.showErrorMessage(readmeResult.message);
    return;
  }

  /* ============================= */
  /* SCREENSHOTS                   */
  /* ============================= */

  await pickAndCopyScreenshots(folderPath);

  /* ============================= */
  /* GIT AUTOMATION                */
  /* ============================= */

  try {

    const pushMode = await selectPushMode();

    if (pushMode === PushMode.NORMAL) {

      runGitCommands(basePath, folderName);

    } else {

      const branchName = await askBranchName();

      runGitCommandsWithPR(
        basePath,
        folderName,
        branchName,
        executionTime,
        problemType,
        difficulty,
        author.name,
        author.github,
        solutionFileName
      );
    }

  } catch (err: any) {
    vscode.window.showErrorMessage(err.message || "Git operation failed");
    return;
  }

  /* ============================= */
  /* SUCCESS                       */
  /* ============================= */

  vscode.window.showInformationMessage(
    `Published Successfully 
${folderName}
`
  );
}
