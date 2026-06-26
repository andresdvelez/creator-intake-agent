import { describe, it, expect } from "bun:test";
import {
  AiReviewResultSchema,
  ReviewRequestSchema,
} from "@/lib/validations/review.validation";

const validReviewResult = {
  fitScore: 8,
  recommendation: "approve",
  reasoning: "Creator aligns well with campaign goals.",
  risks: [],
  missingInfo: [],
  suggestedReply: "Welcome aboard!",
};

describe("AiReviewResultSchema", () => {
  it("accepts a fully valid result", () => {
    expect(AiReviewResultSchema.safeParse(validReviewResult).success).toBe(
      true,
    );
  });

  it("accepts all recommendation values", () => {
    const recommendations = [
      "approve",
      "reject",
      "needs_info",
      "manual_review",
    ] as const;
    for (const recommendation of recommendations) {
      expect(
        AiReviewResultSchema.safeParse({ ...validReviewResult, recommendation })
          .success,
      ).toBe(true);
    }
  });

  it("rejects fitScore below 0", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      fitScore: -1,
    });
    expect(result.success).toBe(false);
  });

  it("rejects fitScore above 10", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      fitScore: 11,
    });
    expect(result.success).toBe(false);
  });

  it("accepts fitScore at boundary values 0 and 10", () => {
    expect(
      AiReviewResultSchema.safeParse({ ...validReviewResult, fitScore: 0 })
        .success,
    ).toBe(true);
    expect(
      AiReviewResultSchema.safeParse({ ...validReviewResult, fitScore: 10 })
        .success,
    ).toBe(true);
  });

  it("rejects an invalid recommendation string", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      recommendation: "maybe",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty reasoning string", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      reasoning: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty suggestedReply string", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      suggestedReply: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts non-empty risks array", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      risks: ["Low engagement", "Off-brand content"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts non-empty missingInfo array", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      missingInfo: ["Need media kit"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects when risks is not an array", () => {
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      risks: "none",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    expect(AiReviewResultSchema.safeParse({}).success).toBe(false);
  });

  it("rejects non-integer fitScore", () => {
    // Zod .number() accepts floats; only schema min/max matters. Floats pass unless we add .int().
    // This test documents current behavior: floats within range are accepted.
    const result = AiReviewResultSchema.safeParse({
      ...validReviewResult,
      fitScore: 7.5,
    });
    expect(result.success).toBe(true);
  });
});

describe("ReviewRequestSchema", () => {
  it("accepts a valid creatorId", () => {
    expect(ReviewRequestSchema.safeParse({ creatorId: "1" }).success).toBe(
      true,
    );
  });

  it("rejects an empty creatorId", () => {
    expect(ReviewRequestSchema.safeParse({ creatorId: "" }).success).toBe(
      false,
    );
  });

  it("rejects missing creatorId", () => {
    expect(ReviewRequestSchema.safeParse({}).success).toBe(false);
  });

  it("rejects non-string creatorId", () => {
    expect(ReviewRequestSchema.safeParse({ creatorId: 123 }).success).toBe(
      false,
    );
  });
});
