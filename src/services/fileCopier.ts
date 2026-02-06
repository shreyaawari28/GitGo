import * as fs from "fs";
import * as path from "path";
import { Result } from "../domain/Result";

export function copySolutionFile(
    sourcePath: string,
    destFolder: string,
    language: string
): Result<void> {

    try {
        const extensionMap: Record<string, string> = {
            "Java": ".java",
            "Python": ".py",
            "C++": ".cpp",
            "C": ".c",
            "JavaScript": ".js",
            "TypeScript": ".ts"
        };

        const ext = extensionMap[language] || ".txt";

        const destinationPath = path.join(destFolder, `Solution${ext}`);

        fs.copyFileSync(sourcePath, destinationPath);

        return { ok: true, data: undefined };

    } catch {
        return {
            ok: false,
            errorType: "ENV",
            message: "Failed to copy solution file"
        };
    }
}
