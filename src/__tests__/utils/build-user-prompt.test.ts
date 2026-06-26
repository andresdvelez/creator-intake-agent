import { describe, it, expect } from "bun:test";
import type { Campaign, Creator } from "@/types";
import { buildUserPrompt } from "@/utils/build-user-prompt";

const mockCampaign: Campaign = {
  brandName: "TestBrand",
  campaignName: "Summer Campaign",
  campaignGoal: "Increase awareness",
  targetAudience: "Gen Z women",
  platforms: ["TikTok", "Instagram"],
  budgetRange: "$1,000 - $5,000",
  requirements: ["Must mention SPF", "No medical claims"],
  brandSafetyNotes: "Avoid controversial content",
};

const mockCreator: Creator = {
  id: "1",
  creatorName: "Jane Doe",
  handle: "@janedoe",
  platform: "TikTok",
  followers: 1500000,
  engagementRate: 4.5,
  audienceSummary: "Gen Z beauty fans",
  contentStyle: "Fun, fast-paced videos",
  applicationMessage: "I love your brand!",
  pastBrandDeals: ["e.l.f.", "NYX"],
  status: "pending",
};

describe("buildUserPrompt", () => {
  it("includes brand name", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain("TestBrand");
  });

  it("includes campaign name", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain(
      "Summer Campaign",
    );
  });

  it("includes creator name", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain("Jane Doe");
  });

  it("includes creator handle", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain("@janedoe");
  });

  it("includes followers formatted with locale separators", () => {
    const prompt = buildUserPrompt(mockCampaign, mockCreator);
    // toLocaleString on 1500000 produces "1,500,000" in en-US environments
    expect(prompt).toMatch(/1[,.]?500[,.]?000/);
  });

  it("includes all platform requirements", () => {
    const prompt = buildUserPrompt(mockCampaign, mockCreator);
    expect(prompt).toContain("Must mention SPF");
    expect(prompt).toContain("No medical claims");
  });

  it("includes both platforms", () => {
    const prompt = buildUserPrompt(mockCampaign, mockCreator);
    expect(prompt).toContain("TikTok");
    expect(prompt).toContain("Instagram");
  });

  it("includes application message", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain(
      "I love your brand!",
    );
  });

  it("includes engagement rate", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain("4.5");
  });

  it("includes past brand deals", () => {
    const prompt = buildUserPrompt(mockCampaign, mockCreator);
    expect(prompt).toContain("e.l.f.");
    expect(prompt).toContain("NYX");
  });

  it("requests a fitScore field in the JSON schema", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain("fitScore");
  });

  it("requests a recommendation field in the JSON schema", () => {
    expect(buildUserPrompt(mockCampaign, mockCreator)).toContain(
      "recommendation",
    );
  });
});
