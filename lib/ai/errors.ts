export type GenerationErrorCode =
  | "provider_error"
  | "invalid_json"
  | "schema_mismatch"
  | "timeout"
  | "internal";

export class GenerationError extends Error {
  readonly code: GenerationErrorCode;

  constructor(code: GenerationErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = "GenerationError";
    this.code = code;
    if (cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = cause;
    }
  }
}
