import { Campaign, Creator } from "@/types";

export function buildUserPrompt(campaign: Campaign, creator: Creator): string {
  return `Evaluate this creator application for the campaign below.
  
  CAMPAIGN:
  Brand: ${campaign.brandName}
  Campaign: ${campaign.campaignName}
  Goal: ${campaign.campaignGoal}
  Target Audience: ${campaign.targetAudience}
  Platforms: ${campaign.platforms.join(", ")}
  Budget: ${campaign.budgetRange}
  Requirements:
  ${campaign.requirements.map((r) => `• ${r}`).join("\n")}
  Brand Safety: ${campaign.brandSafetyNotes}
  
  CREATOR APPLICATION:
  Name: ${creator.creatorName}
  Handle: ${creator.handle}
  Platform: ${creator.platform}
  Followers: ${creator.followers.toLocaleString()}
  Engagement Rate: ${creator.engagementRate}%
  Audience: ${creator.audienceSummary}
  Content Style: ${creator.contentStyle}
  Application: "${creator.applicationMessage}"
  Past Brand Deals: ${creator.pastBrandDeals.join(", ")}
  
  Return this JSON object with all fields populated:
  {
    "fitScore": <integer 0-10>,
    "recommendation": <"approve" | "reject" | "needs_info" | "manual_review">,
    "reasoning": <2-3 sentence assessment grounded in the data above>,
    "risks": <array of specific risk strings, empty array if none>,
    "missingInfo": <array of specific missing items needed to decide, empty if none>,
    "suggestedReply": <personalized reply message to the creator>
  }`;
}
