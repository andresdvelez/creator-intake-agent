import Anthropic, { APIError } from "@anthropic-ai/sdk";

import type { ServiceResult } from "@/types";
import { parseAndValidate } from "@/utils/parse-ai-response.utils";

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

export async function runAnthropicReview(
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
