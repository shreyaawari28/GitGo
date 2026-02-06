import { execSync } from "child_process";
import { Result } from "../domain/Result";

export interface RepoInfo {
  owner: string;
  repo: string;
}

export function getRepoInfo(repoPath: string): Result<RepoInfo> {

  try {
    const remoteUrl = execSync(
      "git config --get remote.origin.url",
      { cwd: repoPath }
    ).toString().trim();

    // https://github.com/user/repo.git
    if (remoteUrl.startsWith("https://")) {
      const parts = remoteUrl.split("/");
      const owner = parts[parts.length - 2];
      const repo = parts[parts.length - 1].replace(".git", "");
      return { ok: true, data: { owner, repo } };
    }

    // git@github.com:user/repo.git
    if (remoteUrl.startsWith("git@")) {
      const afterColon = remoteUrl.split(":")[1];
      const [owner, repoWithGit] = afterColon.split("/");
      return {
        ok: true,
        data: { owner, repo: repoWithGit.replace(".git", "") }
      };
    }

    return {
      ok: false,
      errorType: "LOGIC",
      message: "Unsupported remote URL format"
    };

  } catch {
    return {
      ok: false,
      errorType: "ENV",
      message: "Failed to detect repository info"
    };
  }
}
