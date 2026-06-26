"use server";

import { CAMPAIGN } from "@/lib/data/campaign";
import { CREATORS } from "@/lib/data/creators";
import {
  runAiReview,
  type ServiceResult,
} from "@/lib/services/ai-review.service";
import { ReviewRequestSchema } from "@/lib/validations/review.validation";

export async function runCreatorReview(
  creatorId: string,
): Promise<ServiceResult> {
  const parsed = ReviewRequestSchema.safeParse({ creatorId });
  if (!parsed.success) {
    return { success: false, error: "Invalid creator ID" };
  }

  const creator = CREATORS.find((c) => c.id === parsed.data.creatorId);
  if (!creator) {
    return { success: false, error: "Creator not found" };
  }

  return runAiReview(CAMPAIGN, creator);
}
