import { z } from "zod";

export const AiReviewResultSchema = z.object({
  fitScore: z.number().min(0).max(10),
  recommendation: z.enum(["approve", "reject", "needs_info", "manual_review"]),
  reasoning: z.string().min(1),
  risks: z.array(z.string()),
  missingInfo: z.array(z.string()),
  suggestedReply: z.string().min(1),
});

export const ReviewRequestSchema = z.object({
  creatorId: z.string().min(1),
});
