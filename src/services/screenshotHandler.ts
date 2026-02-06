import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function pickAndCopyScreenshots(folderPath: string) {

    const files = await vscode.window.showOpenDialog({
        canSelectMany: true,
        openLabel: "Select screenshots",
        filters: {
            Images: ["png", "jpg", "jpeg"]
        }
    });

    if (!files || files.length === 0) {
        return; // optional feature
    }

    for (const file of files) {
        const fileName = path.basename(file.fsPath);
        const destPath = path.join(folderPath, fileName);
        fs.copyFileSync(file.fsPath, destPath);
    }
}
