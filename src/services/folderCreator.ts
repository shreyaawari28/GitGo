import * as fs from "fs";
import * as path from "path";
import { Result } from "../domain/Result";

export function createProblemFolder(
  basePath: string,
  folderName: string,
  parentFolder?: string | null
): Result<string> {

  if (!basePath) {
    return { ok: false, errorType: "USER", message: "Repository path missing" };
  }

  if (!folderName) {
    return { ok: false, errorType: "USER", message: "Folder name missing" };
  }

  try {
    const targetBase = parentFolder
      ? path.join(basePath, parentFolder)
      : basePath;

    if (!fs.existsSync(targetBase)) {
      fs.mkdirSync(targetBase, { recursive: true });
    }

    const fullPath = path.join(targetBase, folderName);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }

    return { ok: true, data: fullPath };

  } catch (err) {
    return {
      ok: false,
      errorType: "ENV",
      message: "Failed to create problem folder"
    };
  }
}
