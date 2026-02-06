    export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; errorType: "USER" | "ENV" | "LOGIC"; message: string };
