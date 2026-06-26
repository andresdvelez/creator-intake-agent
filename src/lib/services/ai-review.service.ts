import Anthropic, { APIError } from "@anthropic-ai/sdk";
import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
} from "@google/generative-ai";

import type { AiReviewResult, Campaign, Creator } from "@/types";
import { AiReviewResultSchema } from "@/lib/validations/review.validation";
import { buildSystemPrompt } from "@/utils/build-system-prompt";
import { buildUserPrompt } from "@/utils/build-user-prompt";
import { extractJson } from "@/utils/extract-json";

export type ServiceResult =
  | { success: true; data: AiReviewResult }
  | { success: false; error: string };

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

function anthropicStatusError(err: APIError): string {
  switch (err.status) {
    case 401:
      return "Invalid Anthropic API key — check ANTHROPIC_API_KEY in .env.local";
    case 429:
      return "Anthropic rate limit reached — try again in a moment";
    case 529:
      return "Anthropic is currently overloaded — try again shortly";
    default:
      return `Anthropic API error (${err.status}): ${err.message}`;
  }
}

async function runAnthropicReview(
  systemPrompt: string,
  userPrompt: string,
): Promise<ServiceResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "ANTHROPIC_API_KEY is not set — add it to .env.local",
    };
  }

  let rawText: string;
  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    const block = message.content[0];
    if (!block || block.type !== "text") {
      return {
        success: false,
        error: "Unexpected response format from Anthropic",
      };
    }
    rawText = block.text;
  } catch (err) {
    if (err instanceof APIError)
      return { success: false, error: anthropicStatusError(err) };
    return {
      success: false,
      error: "Could not reach Anthropic — check your network connection",
    };
  }

  return parseAndValidate(rawText);
}

const NETWORK_ERROR_PATTERNS = [
  "fetch failed",
  "ENOTFOUND",
  "ECONNREFUSED",
  "network",
] as const;

function isNetworkError(msg: string): boolean {
  return NETWORK_ERROR_PATTERNS.some((p) => msg.includes(p));
}

function geminiStatusError(
  err: GoogleGenerativeAIFetchError,
  modelName: string,
): string {
  switch (err.status) {
    case 400:
      return `Gemini rejected the request (400) — ${err.message}`;
    case 401:
    case 403:
      return "Invalid or unauthorized Gemini API key — check GEMINI_API_KEY in .env.local";
    case 429:
      return "Gemini rate limit hit — wait a moment and try again (or set AI_PROVIDER=anthropic)";
    case 404:
      return `Gemini model "${modelName}" not found or deprecated — set GEMINI_MODEL=gemini-2.5-flash in .env.local`;
    default:
      return `Gemini API error (${err.status ?? "unknown"}): ${err.message}`;
  }
}

async function runGeminiReview(
  systemPrompt: string,
  userPrompt: string,
): Promise<ServiceResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "GEMINI_API_KEY is not set — add it to .env.local",
    };
  }

  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  let rawText: string;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 2048,
      },
    });
    const response = await model.generateContent(userPrompt);
    rawText = response.response.text();
  } catch (err) {
    if (err instanceof GoogleGenerativeAIFetchError) {
      console.error(`[Gemini] HTTP ${err.status ?? "unknown"}: ${err.message}`);
      return { success: false, error: geminiStatusError(err, modelName) };
    }
    if (err instanceof Error && isNetworkError(err.message)) {
      console.error(`[Gemini] Network error: ${err.message}`);
      return {
        success: false,
        error:
          "Could not reach Gemini — check your network connection or switch to AI_PROVIDER=anthropic in .env.local",
      };
    }
    if (err instanceof Error) {
      console.error(`[Gemini] Unexpected error: ${err.message}`);
      return { success: false, error: `Gemini error: ${err.message}` };
    }
    return {
      success: false,
      error: "Could not reach Gemini — check your network connection",
    };
  }

  return parseAndValidate(rawText);
}

export async function runAiReview(
  campaign: Campaign,
  creator: Creator,
): Promise<ServiceResult> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(campaign, creator);
  const provider = (process.env.AI_PROVIDER ?? "anthropic").toLowerCase();

  if (provider === "gemini") return runGeminiReview(systemPrompt, userPrompt);
  return runAnthropicReview(systemPrompt, userPrompt);
}
