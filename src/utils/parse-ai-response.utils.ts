import type { ServiceResult } from "@/types";
import { AiReviewResultSchema } from "@/lib/validations/review.validation";
import { extractJson } from "@/utils/extract-json";

export function parseAndValidate(rawText: string): ServiceResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJson(rawText));
  } catch {
    return {
      success: false,
      error: "AI returned malformed JSON — please try again",
    };
  }
  const result = AiReviewResultSchema.safeParse(parsed);
  if (!result.success) {
    return {
      success: false,
      error: "AI response did not match the expected schema",
    };
  }
  return { success: true, data: result.data };
}
