import { execSync } from "child_process";

export function getDefaultBranch(repoPath: string): string {

  try {
    const result = execSync(
      "git symbolic-ref refs/remotes/origin/HEAD",
      { cwd: repoPath }
    )
      .toString()
      .trim();

    // result => refs/remotes/origin/main
    return result.replace("refs/remotes/origin/", "");

  } catch {
    // Fallback if command fails
    return "main";
  }
}
