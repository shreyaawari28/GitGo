import * as vscode from "vscode";
import { execSync } from "child_process";

export async function setupRepository(): Promise<string> {

    const choice = await vscode.window.showQuickPick(
        ["Clone repository", "Open existing repository"],
        { placeHolder: "Select repository setup option" }
    );

    if (!choice) {
        throw new Error("Setup cancelled");
    }

    // ---------- CLONE ----------
    if (choice === "Clone repository") {

        const repoUrl = await vscode.window.showInputBox({
            prompt: "Enter GitHub repository URL"
        });

        if (!repoUrl) {
            throw new Error("Repository URL required");
        }

        const folderUri = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            openLabel: "Select parent folder"
        });

        if (!folderUri) {
            throw new Error("Folder not selected");
        }

        const parentPath = folderUri[0].fsPath;

        execSync(`git clone ${repoUrl}`, {
            cwd: parentPath,
            stdio: "inherit"
        });

        // Repo name extracted from URL
        const repoName = repoUrl.split("/").pop()!.replace(".git", "");
        return `${parentPath}/${repoName}`;
    }

    // ---------- OPEN EXISTING ----------
    const folderUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: "Select existing repository folder"
    });

    if (!folderUri) {
        throw new Error("Folder not selected");
    }

    const repoPath = folderUri[0].fsPath;

    execSync("git pull origin main", {
        cwd: repoPath,
        stdio: "inherit"
    });

    return repoPath;
}
