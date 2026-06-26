import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
} from "@google/generative-ai";

import type { ServiceResult } from "@/types";
import { parseAndValidate } from "@/utils/parse-ai-response.utils";

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

export async function runGeminiReview(
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
