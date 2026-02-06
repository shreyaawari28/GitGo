import * as path from "path";
import { Result } from "../domain/Result";

export function detectLanguage(filePath: string): Result<string> {

    if (!filePath) {
        return { ok: false, errorType: "USER", message: "No active file" };
    }

    const ext = path.extname(filePath).toLowerCase();

    if (!ext) {
        return { ok: false, errorType: "LOGIC", message: "Unable to detect file extension" };
    }

    const map: Record<string, string> = {
        ".java": "Java",
        ".py": "Python",
        ".cpp": "C++",
        ".c": "C",
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".go": "Go",
        ".rs": "Rust"
    };

    const lang = map[ext];

    if (!lang) {
        return { ok: false, errorType: "LOGIC", message: `Unsupported file type: ${ext}` };
    }

    return { ok: true, data: lang };
}
