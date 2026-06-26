import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import type { Campaign, Creator } from "@/types";
import {
  parseAndValidate,
  runAiReview,
} from "@/lib/services/ai-review.service";

const validReviewJson = JSON.stringify({
  fitScore: 8,
  recommendation: "approve",
  reasoning: "Strong alignment with campaign goals.",
  risks: [],
  missingInfo: [],
  suggestedReply: "Welcome aboard!",
});

const mockCampaign: Campaign = {
  brandName: "GlowPop",
  campaignName: "Summer",
  campaignGoal: "Awareness",
  targetAudience: "Gen Z",
  platforms: ["TikTok"],
  budgetRange: "$1,000",
  requirements: ["No medical claims"],
  brandSafetyNotes: "None",
};

const mockCreator: Creator = {
  id: "1",
  creatorName: "Jane Doe",
  handle: "@jane",
  platform: "TikTok",
  followers: 100000,
  engagementRate: 5,
  audienceSummary: "Gen Z",
  contentStyle: "Fun",
  applicationMessage: "I love this!",
  pastBrandDeals: [],
  status: "pending",
};

describe("parseAndValidate", () => {
  it("returns success with valid JSON", () => {
    const result = parseAndValidate(validReviewJson);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fitScore).toBe(8);
      expect(result.data.recommendation).toBe("approve");
    }
  });

  it("returns error for malformed JSON", () => {
    const result = parseAndValidate("not valid json {{{");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("malformed JSON");
    }
  });

  it("returns error when JSON does not match schema", () => {
    const result = parseAndValidate(
      JSON.stringify({ fitScore: "high", recommendation: "maybe" }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("schema");
    }
  });

  it("strips markdown code fences before parsing", () => {
    const fenced = "```json\n" + validReviewJson + "\n```";
    const result = parseAndValidate(fenced);
    expect(result.success).toBe(true);
  });

  it("extracts JSON from preamble text", () => {
    const withPreamble = "Here is the evaluation:\n" + validReviewJson;
    const result = parseAndValidate(withPreamble);
    expect(result.success).toBe(true);
  });

  it("returns all required fields on success", () => {
    const result = parseAndValidate(validReviewJson);
    if (!result.success) throw new Error("Expected success");
    const { data } = result;
    expect(typeof data.fitScore).toBe("number");
    expect(typeof data.recommendation).toBe("string");
    expect(typeof data.reasoning).toBe("string");
    expect(Array.isArray(data.risks)).toBe(true);
    expect(Array.isArray(data.missingInfo)).toBe(true);
    expect(typeof data.suggestedReply).toBe("string");
  });
});

describe("runAiReview — missing API key", () => {
  let savedAnthropicKey: string | undefined;
  let savedGeminiKey: string | undefined;
  let savedProvider: string | undefined;

  beforeEach(() => {
    savedAnthropicKey = process.env.ANTHROPIC_API_KEY;
    savedGeminiKey = process.env.GEMINI_API_KEY;
    savedProvider = process.env.AI_PROVIDER;
  });

  afterEach(() => {
    if (savedAnthropicKey !== undefined)
      process.env.ANTHROPIC_API_KEY = savedAnthropicKey;
    else delete process.env.ANTHROPIC_API_KEY;

    if (savedGeminiKey !== undefined)
      process.env.GEMINI_API_KEY = savedGeminiKey;
    else delete process.env.GEMINI_API_KEY;

    if (savedProvider !== undefined) process.env.AI_PROVIDER = savedProvider;
    else delete process.env.AI_PROVIDER;
  });

  it("returns error when ANTHROPIC_API_KEY is missing (default provider)", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.AI_PROVIDER;
    const result = await runAiReview(mockCampaign, mockCreator);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toContain("ANTHROPIC_API_KEY");
  });

  it("returns error when GEMINI_API_KEY is missing with AI_PROVIDER=gemini", async () => {
    process.env.AI_PROVIDER = "gemini";
    delete process.env.GEMINI_API_KEY;
    const result = await runAiReview(mockCampaign, mockCreator);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toContain("GEMINI_API_KEY");
  });

  it("uses anthropic provider when AI_PROVIDER is unset", async () => {
    delete process.env.AI_PROVIDER;
    delete process.env.ANTHROPIC_API_KEY;
    const result = await runAiReview(mockCampaign, mockCreator);
    // With no Anthropic key the error must mention ANTHROPIC_API_KEY, not GEMINI
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("ANTHROPIC_API_KEY");
      expect(result.error).not.toContain("GEMINI_API_KEY");
    }
  });

  it("uses anthropic when AI_PROVIDER=anthropic", async () => {
    process.env.AI_PROVIDER = "anthropic";
    delete process.env.ANTHROPIC_API_KEY;
    const result = await runAiReview(mockCampaign, mockCreator);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toContain("ANTHROPIC_API_KEY");
  });
});
