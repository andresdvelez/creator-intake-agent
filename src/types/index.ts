export type CreatorStatus = 'pending' | 'approved' | 'rejected' | 'needs_info'

export type AiRecommendation = 'approve' | 'reject' | 'needs_info' | 'manual_review'

export interface AiReviewResult {
  fitScore: number
  recommendation: AiRecommendation
  reasoning: string
  risks: string[]
  missingInfo: string[]
  suggestedReply: string
}

export interface Creator {
  id: string
  creatorName: string
  handle: string
  platform: string
  followers: number
  engagementRate: number
  audienceSummary: string
  contentStyle: string
  applicationMessage: string
  pastBrandDeals: string[]
  status: CreatorStatus
  aiReview?: AiReviewResult
}

export interface Campaign {
  brandName: string
  campaignName: string
  campaignGoal: string
  targetAudience: string
  platforms: string[]
  budgetRange: string
  requirements: string[]
  brandSafetyNotes: string
}
