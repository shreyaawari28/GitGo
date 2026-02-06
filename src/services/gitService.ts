import { execSync } from "child_process";
import * as vscode from "vscode";
import { getDefaultBranch } from "./defaultBranchDetector";
import { getRepoInfo } from "./repoInfoService";
import { generatePRDescription } from "./prDescriptionGenerator";

/* ============================= */
/* SAFE EXEC WRAPPER             */
/* ============================= */

function safeExec(command: string, cwd: string) {
  try {
    return execSync(command, { cwd, stdio: "inherit" });
  } catch {
    throw new Error(`Git command failed: ${command}`);
  }
}

/* ============================= */
/* NORMAL PUSH MODE              */
/* ============================= */

export function runGitCommands(
  repoPath: string,
  problemName: string
) {

  try {

    const branch = getDefaultBranch(repoPath);

    safeExec(`git checkout ${branch}`, repoPath);
    safeExec(`git pull origin ${branch}`, repoPath);

    // ✅ SAFE STAGING
    safeExec(`git add "${problemName}"`, repoPath);

    safeExec(
      `git commit -m "Add solution ${problemName}"`,
      repoPath
    );

    safeExec(`git push origin ${branch}`, repoPath);

  } catch (err: any) {
    vscode.window.showErrorMessage(
      err.message || "Git operation failed"
    );
  }
}

/* ============================= */
/* PR MODE COMMANDS              */
/* ============================= */

export function runGitCommandsWithPR(
  repoPath: string,
  problemName: string,
  branchName: string,
  executionTime: string,
  problemType: string,
  difficulty: string,
  authorName: string,
  authorGithub: string,
  solutionFileName: string
) {

  try {

    const baseBranch = getDefaultBranch(repoPath);

    safeExec(`git checkout ${baseBranch}`, repoPath);
    safeExec(`git pull origin ${baseBranch}`, repoPath);

    safeExec(`git checkout -b ${branchName}`, repoPath);

    // ✅ SAFE STAGING
    safeExec(`git add "${problemName}"`, repoPath);

    safeExec(
      `git commit -m "Add solution ${problemName}"`,
      repoPath
    );

    safeExec(
      `git push -u origin ${branchName}`,
      repoPath
    );

    /* ============================= */
    /* PR DESCRIPTION GENERATION     */
    /* ============================= */

    const prDescription = generatePRDescription(
      problemName,
      executionTime,
      problemType,
      difficulty,
      authorName,
      authorGithub,
      solutionFileName,
      "README.md"
    );

    vscode.env.clipboard.writeText(prDescription);

    /* ============================= */
    /* OPEN PR PAGE                  */
    /* ============================= */

    const repoInfoResult = getRepoInfo(repoPath);

    if (repoInfoResult.ok) {

      const prUrl =
        `https://github.com/${repoInfoResult.data.owner}/${repoInfoResult.data.repo}` +
        `/compare/${baseBranch}...${branchName}?expand=1`;

      vscode.env.openExternal(vscode.Uri.parse(prUrl));
    }

  } catch (err: any) {
    vscode.window.showErrorMessage(
      err.message || "Git operation failed"
    );
  }
}
