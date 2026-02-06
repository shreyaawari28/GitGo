import * as fs from "fs";

export function loadTemplate(
  customPath: string | undefined,
  fallbackTemplate: string
): string {

  if (customPath && fs.existsSync(customPath)) {
    return fs.readFileSync(customPath, "utf-8");
  }

  return fallbackTemplate;
}
