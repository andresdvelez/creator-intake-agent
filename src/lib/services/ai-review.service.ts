import type { Campaign, Creator, ServiceResult } from "@/types";
import { buildSystemPrompt } from "@/utils/build-system-prompt";
import { buildUserPrompt } from "@/utils/build-user-prompt";
import { runAnthropicReview } from "./providers/anthropic.provider";
import { runGeminiReview } from "./providers/gemini.provider";

export type { ServiceResult };
export { parseAndValidate } from "@/utils/parse-ai-response.utils";

export const AI_PROVIDERS = {
  ANTHROPIC: "anthropic",
  GEMINI: "gemini",
} as const;

export type AiProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];

type ProviderRunner = (
  systemPrompt: string,
  userPrompt: string,
) => Promise<ServiceResult>;

const PROVIDER_RUNNERS: Record<AiProvider, ProviderRunner> = {
  [AI_PROVIDERS.ANTHROPIC]: runAnthropicReview,
  [AI_PROVIDERS.GEMINI]: runGeminiReview,
};

export async function runAiReview(
  campaign: Campaign,
  creator: Creator,
): Promise<ServiceResult> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(campaign, creator);
  const provider = (
    process.env.AI_PROVIDER ?? AI_PROVIDERS.ANTHROPIC
  ).toLowerCase() as AiProvider;

  const runner =
    PROVIDER_RUNNERS[provider] ?? PROVIDER_RUNNERS[AI_PROVIDERS.ANTHROPIC];
  return runner(systemPrompt, userPrompt);
}
